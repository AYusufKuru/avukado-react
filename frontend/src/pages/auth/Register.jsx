import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../store/api/authApi";

export default function Register() {
    const nav = useNavigate();
    const [role, setRole] = useState("client"); // "client" | "lawyer" (lawyer şu anda kapalı)
    const [err, setErr] = useState("");
    const [register, { isLoading }] = useRegisterMutation();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        // avukat alanları
        tckn: "",
        baroNo: "",
        idFront: null,
        idBack: null,
    });

    const onChange = (e) => {
        const { name, value, files } = e.target;
        setForm((s) => ({ ...s, [name]: files ? files[0] : value }));
    };

    // basit istemci doğrulama
    const validate = () => {
        if (!form.name || !form.email || !form.password)
            return "Ad, e-posta ve şifre zorunludur.";
        if (role === "lawyer") {
            if (!/^\d{11}$/.test(form.tckn)) return "T.C. Kimlik No 11 haneli olmalı.";
            if (!/^\d{4,8}$/.test(form.baroNo)) return "Baro numarası hatalı görünüyor.";
            if (!form.idFront || !form.idBack) return "Kimliğin ön ve arka yüzünü yükleyin.";
        }
        return null;
    };

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        const v = validate();
        if (v) return setErr(v);

        try {
            let payload;
            if (role === "lawyer") {
                // Avukat için dosyalı kayıt
                const fd = new FormData();
                fd.append("role", role);
                fd.append("name", form.name);
                fd.append("email", form.email);
                fd.append("password", form.password);
                fd.append("tckn", form.tckn);
                fd.append("baroNo", form.baroNo);
                fd.append("idFront", form.idFront);
                fd.append("idBack", form.idBack);
                payload = fd;
            } else {
                // Müvekkil için düz JSON
                payload = {
                    role,
                    name: form.name,
                    email: form.email,
                    password: form.password,
                };
            }

            const result = await register(payload).unwrap();

            if (result.token) {
                localStorage.setItem("avukado_role", role);
                nav(role === "lawyer" ? "/panel/avukat" : "/panel/muvekkil");
            } else {
                throw new Error("Kayıt başarısız: Token alınamadı.");
            }
        } catch (e2) {
            setErr(e2?.data?.error || e2?.error || e2?.message || "Kayıt başarısız");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>

            {err && <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2">{err}</div>}

            {/* Rol seçimi */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                    type="button"
                    onClick={() => setRole("client")}
                    className={`h-10 rounded-xl border ${role === "client" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-slate-200"
                        }`}
                >
                    Müvekkil
                </button>
                <button
                    type="button"
                    onClick={() => setRole("lawyer")}
                    disabled
                    className="h-10 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                    title="Avukat kaydı şu anda kapalıdır"
                >
                    Avukat (Kapalı)
                </button>
            </div>

            <form onSubmit={submit} className="space-y-3">
                <input
                    className="w-full rounded-lg border p-3"
                    placeholder="Ad Soyad"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                />
                <input
                    className="w-full rounded-lg border p-3"
                    placeholder="E-posta"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                />
                <input
                    className="w-full rounded-lg border p-3"
                    placeholder="Şifre"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                />

                {/* Avukat özel alanları */}
                {role === "lawyer" && (
                    <>
                        <input
                            className="w-full rounded-lg border p-3"
                            placeholder="T.C. Kimlik No (11 hane)"
                            name="tckn"
                            inputMode="numeric"
                            maxLength={11}
                            value={form.tckn}
                            onChange={onChange}
                        />
                        <input
                            className="w-full rounded-lg border p-3"
                            placeholder="Baro Numarası"
                            name="baroNo"
                            inputMode="numeric"
                            value={form.baroNo}
                            onChange={onChange}
                        />

                        <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Kimlik Ön Yüz</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="idFront"
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-lg border p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Kimlik Arka Yüz</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="idBack"
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-lg border p-2"
                                />
                            </div>
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-teal-700 text-white p-3 disabled:opacity-70"
                >
                    {isLoading ? "Gönderiliyor..." : "Kayıt Ol"}
                </button>
            </form>

            <p className="text-sm mt-3">
                Zaten hesabın var mı?{" "}
                <Link className="text-teal-700" to="/giris">
                    Giriş Yap
                </Link>
            </p>
        </div>
    );
}
