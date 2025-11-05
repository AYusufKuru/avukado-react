// src/pages/ClientDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UZMANLIK_ALANLARI } from "../data/uzmanliklar";

// Basit örnek veri: kazanma oranları grafiği
const ORANLAR = [
    { ad: "Ceza", oran: 72 },
    { ad: "Boşanma", oran: 64 },
    { ad: "Ticaret", oran: 58 },
    { ad: "Miras", oran: 61 },
    { ad: "İş", oran: 69 },
    { ad: "İcra", oran: 55 },
];

// Yardımcı: kelime say
const kelimeSay = (t) =>
    (t || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

export default function ClientDashboard() {
    const nav = useNavigate();

    useEffect(() => {
        document.title = "Müvekkil Paneli | Avukado";
    }, []);

    // -------- Müvekkil bilgilerim --------
    const [profil, setProfil] = useState({
        adSoyad: "",
        sehir: "",
        telefon: "",
        email: "",
    });

    const profilKaydet = () => {
        // TODO: backend'e gönder
        console.log("Müvekkil profili:", profil);
        alert("Bilgileriniz kaydedildi.");
    };

    // -------- Dava Detayları (ilan formu) --------
    const uzmanlikListesi = Object.keys(UZMANLIK_ALANLARI);
    const [uzmanlik, setUzmanlik] = useState(uzmanlikListesi[0] || "");
    const altBasliklar = useMemo(() => UZMANLIK_ALANLARI[uzmanlik] || [], [uzmanlik]);
    const [altBaslik, setAltBaslik] = useState("");
    useEffect(() => {
        setAltBaslik(altBasliklar[0] || "");
    }, [altBasliklar]);

    const [dosyaBasligi, setDosyaBasligi] = useState("");
    const [detay, setDetay] = useState("");
    const baslikKelime = kelimeSay(dosyaBasligi);
    const baslikLimit = 15;

    const ilanKaydet = (e) => {
        e.preventDefault();
        if (!dosyaBasligi.trim()) {
            alert("Lütfen dosya başlığı yazın (en fazla 15 kelime).");
            return;
        }
        if (baslikKelime > baslikLimit) {
            alert(`Dosya başlığı en fazla ${baslikLimit} kelime olmalı.`);
            return;
        }
        if (!detay.trim()) {
            alert("Lütfen dava detaylarını girin.");
            return;
        }

        const payload = {
            uzmanlik,
            altBaslik,
            dosyaBasligi,
            detay,
        };
        // TODO: backend'e POST
        console.log("İlan/Dava detayları:", payload);
        alert("İlanınız alındı! İnceleme sonrası yayınlanacaktır.");
        nav("/ilanlar");
    };

    return (
        <div className="min-h-[70vh]">
            {/* HERO */}
            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-white" />
                <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-10">
                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900">
                        Müvekkil Paneli
                    </h1>
                    <p className="mt-2 text-slate-600 max-w-2xl">
                        Bilgilerinizi güncelleyin, davalarınızı yönetin ve ilan oluşturun.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
                {/* SOL SÜTUN */}
                <div className="space-y-8">
                    {/* Müvekkil Bilgilerim */}
                    <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Müvekkil Bilgilerim</h2>
                        <p className="text-slate-600 text-sm mt-1">
                            İsim-soyisim, şehir, telefon ve e-posta bilgilerinizi güncelleyin.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Ad Soyad</label>
                                <input
                                    className="mt-1 w-full rounded-lg border-slate-300"
                                    value={profil.adSoyad}
                                    onChange={(e) => setProfil({ ...profil, adSoyad: e.target.value })}
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Şehir</label>
                                <input
                                    className="mt-1 w-full rounded-lg border-slate-300"
                                    value={profil.sehir}
                                    onChange={(e) => setProfil({ ...profil, sehir: e.target.value })}
                                    placeholder="Örn: İstanbul"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Telefon</label>
                                <input
                                    className="mt-1 w-full rounded-lg border-slate-300"
                                    value={profil.telefon}
                                    onChange={(e) => setProfil({ ...profil, telefon: e.target.value })}
                                    placeholder="05xx xxx xx xx"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">E-posta</label>
                                <input
                                    type="email"
                                    className="mt-1 w-full rounded-lg border-slate-300"
                                    value={profil.email}
                                    onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                                    placeholder="ornek@eposta.com"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={profilKaydet}
                                className="rounded-xl bg-emerald-600 px-5 py-2 text-white font-semibold hover:bg-emerald-700"
                            >
                                Bilgileri Kaydet
                            </button>
                        </div>
                    </section>

                    {/* Dava Detayları (İlan Formu) */}
                    <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Dava Detayları</h2>
                        <p className="text-slate-600 text-sm mt-1">
                            Uzmanlık alanı ve alt başlığı seçin; dosya başlığını (en fazla 15 kelime) ve detayları girin.
                        </p>

                        <form onSubmit={ilanKaydet} className="mt-6 grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Uzmanlık Alanı</label>
                                    <select
                                        className="mt-1 w-full rounded-lg border-slate-300"
                                        value={uzmanlik}
                                        onChange={(e) => setUzmanlik(e.target.value)}
                                    >
                                        {uzmanlikListesi.map((u) => (
                                            <option key={u} value={u}>
                                                {u}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Alt Başlık</label>
                                    <select
                                        className="mt-1 w-full rounded-lg border-slate-300"
                                        value={altBaslik}
                                        onChange={(e) => setAltBaslik(e.target.value)}
                                    >
                                        {altBasliklar.map((a) => (
                                            <option key={a} value={a}>
                                                {a}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Dosya Başlığı */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Dosya Başlığı <span className="text-slate-400">(en fazla {baslikLimit} kelime)</span>
                                </label>
                                <input
                                    className="mt-1 w-full rounded-lg border-slate-300"
                                    value={dosyaBasligi}
                                    onChange={(e) => setDosyaBasligi(e.target.value)}
                                    placeholder="15 kelimede kısaca özetleyin"
                                />
                                <div
                                    className={
                                        "mt-1 text-xs " + (baslikKelime > baslikLimit ? "text-red-600" : "text-slate-500")
                                    }
                                >
                                    {baslikKelime} / {baslikLimit} kelime
                                </div>
                            </div>

                            {/* Dava Detayları */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Dava Detayları</label>
                                <textarea
                                    rows={6}
                                    className="mt-1 w-full rounded-lg border-slate-300"
                                    value={detay}
                                    onChange={(e) => setDetay(e.target.value)}
                                    placeholder="Olayı, belgeleri ve beklentinizi ayrıntılı şekilde yazın..."
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-emerald-600 px-5 py-2 text-white font-semibold hover:bg-emerald-700"
                                >
                                    İlanı Kaydet
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

                {/* SAĞ SÜTUN */}
                <div className="space-y-8">
                    {/* Örnek Grafik */}
                    <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {uzmanlik} davalarının kazanma oranları (örnek)
                            </h3>
                            <span className="text-xs text-slate-500">Örnek görselleştirme</span>
                        </div>

                        {/* Basit bar chart (CSS ile) */}
                        <div className="mt-5 space-y-3">
                            {ORANLAR.map((r) => (
                                <div key={r.ad}>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-700">{r.ad}</span>
                                        <span className="text-slate-600">{r.oran}%</span>
                                    </div>
                                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-600 rounded-full"
                                            style={{ width: `${r.oran}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Kısa bilgi kartı */}
                    <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900">İpucu</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Ne kadar ayrıntı verirseniz, uygun uzmanlıktaki avukatlardan alacağınız
                            teklifler o kadar isabetli olur.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
