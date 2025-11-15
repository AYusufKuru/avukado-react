// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../store/api/authApi";

export default function Login() {
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState("");
    const [login, { isLoading }] = useLoginMutation();

    const submit = async (e) => {
        e.preventDefault();
        setErr("");

        try {
            const result = await login({
                email: form.email,
                password: form.password,
            }).unwrap();

            if (!result.token) {
                throw new Error("Token alınamadı.");
            }

            // Role kontrolü - müvekkil her zaman müvekkil paneline yönlendirilir
            const role = result.user?.role || localStorage.getItem("avukado_role") || "client";
            nav(role === "lawyer" ? "/panel/avukat" : "/panel/muvekkil");
        } catch (ex) {
            setErr(ex?.data?.error || ex?.error || ex?.message || "Giriş yapılamadı");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Giriş Yap</h2>
            {err && (
                <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2">
                    {err}
                </div>
            )}
            <form onSubmit={submit} className="space-y-3">
                <input
                    className="w-full rounded-lg border p-3"
                    placeholder="E-posta"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="w-full rounded-lg border p-3"
                    placeholder="Şifre"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-teal-700 text-white p-3 disabled:opacity-70"
                >
                    {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
            <p className="text-sm mt-3">
                Hesabın yok mu?{" "}
                <Link className="text-teal-700" to="/kayit">
                    Kayıt Ol
                </Link>
            </p>
        </div>
    );
}
