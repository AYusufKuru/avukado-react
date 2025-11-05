// src/pages/LawyerDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const PREMIUM_PRICE = 300; // "İlanı Gör – ₺300 (Premium)" buradan değişir.

// Örnek müvekkil ilanları (gerçekte API'den gelecek)
const ILANLAR = [
    {
        id: 1,
        unvan: "Müvekkil",
        sehir: "İstanbul",
        tarih: "2025-08-24",
        teklif: 0,
        belgeler: false,
        butce: 0,
        ozet: "Hukuki destek talep edilmektedir. Detaylar premium ile açılır.",
    },
    {
        id: 2,
        unvan: "Müvekkil",
        sehir: "Ankara",
        tarih: "2025-08-22",
        teklif: 1,
        belgeler: true,
        butce: 5000,
        ozet: "Ticari alacak uyuşmazlığı.",
    },
];

export default function LawyerDashboard() {
    const nav = useNavigate();

    useEffect(() => {
        document.title = "Avukat Paneli | Avukado";
    }, []);

    // ---- Sol kart: Avukat Profilim ----
    const [profil, setProfil] = useState({
        ad: "Av.",
        baroNo: "123456",        // BARO NO buradan
        sehir: "Gaziantep",      // ŞEHİR buradan
        uzmanlik: "",            // Uzmanlık kısa etiket
    });

    // Profil görseli/kimlik yükleme sadece önizleme amaçlı
    const [profilImg, setProfilImg] = useState(null);
    const [kimlikOn, setKimlikOn] = useState(null);
    const [kimlikArka, setKimlikArka] = useState(null);

    const profilPreview = useMemo(() => (profilImg ? URL.createObjectURL(profilImg) : null), [profilImg]);

    const kaydet = () => {
        // TODO: API'ye gönder
        console.log("Profil:", profil, { profilImg, kimlikOn, kimlikArka });
        alert("Profiliniz kaydedildi.");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
            {/* SOL: Avukat Profilim */}
            <aside className="bg-white border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 font-bold grid place-items-center">
                        AV
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Avukat Profilim</div>
                        <div className="text-xs text-slate-500">Baro doğrulaması, çalışma alanları ve görseller</div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-slate-700">
                    <div className="font-medium">{profil.ad}</div>
                    <div className="text-right">{profil.baroNo}</div>
                    <div>{profil.sehir}</div>
                    <div className="text-right text-slate-400">
                        {profil.uzmanlik || "Uzmanlık (örn. Miras, Ticaret)"}
                    </div>
                </div>

                {/* Profil Görseli */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-slate-700">Profil Görseli</label>
                    <div className="mt-2 flex items-center gap-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilImg(e.target.files?.[0] || null)}
                            className="text-sm"
                        />
                        <div className="w-14 h-14 rounded-full ring-1 ring-slate-200 grid place-items-center text-xs text-slate-500 overflow-hidden">
                            {profilPreview ? (
                                <img src={profilPreview} alt="Önizleme" className="w-full h-full object-cover" />
                            ) : (
                                "Önizleme"
                            )}
                        </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Kare görsel önerilir. JPG/PNG.</div>
                </div>

                <button
                    onClick={kaydet}
                    className="mt-4 w-full rounded-xl bg-slate-900 text-white py-2 font-semibold hover:bg-slate-800"
                >
                    Kaydet
                </button>

                <div className="my-4 border-t" />

                {/* Kimlik Fotoğrafları */}
                <div className="space-y-3">
                    <div>
                        <div className="text-sm font-medium text-slate-700">Kimlik Fotoğrafı (Ön/Arka)</div>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-2 block text-sm"
                            onChange={(e) => setKimlikOn(e.target.files?.[0] || null)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-2 block text-sm"
                            onChange={(e) => setKimlikArka(e.target.files?.[0] || null)}
                        />
                        <div className="text-xs text-slate-500 mt-1">
                            KVKK uyumlu depolama: yalnızca doğrulama amaçlı saklanır.
                        </div>
                    </div>
                </div>

                {/* Premium kutusu */}
                <div className="mt-6 rounded-2xl border p-4 bg-emerald-50/40">
                    <div className="font-semibold text-slate-900">Premium’a Geç</div>
                    <p className="text-sm text-slate-600 mt-1">
                        Açık ilanları filtrele, detayı gör ve teklif gönder. Canlı mesajlaşma & belge paylaşımı.
                    </p>
                    <button className="mt-3 inline-flex items-center rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700">
                        Yükselt
                    </button>
                </div>
            </aside>

            {/* SAĞ: Müvekkil İlanları */}
            <main>
                <div className="mb-3">
                    <h1 className="text-2xl font-extrabold text-slate-900">Müvekkil İlanları</h1>
                    <p className="text-slate-600 text-sm">
                        Reklam yasağına uyumlu; bilgilendirme odaklı kartlar.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {ILANLAR.map((i) => (
                        <article key={i.id} className="bg-white border rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-slate-100 grid place-items-center text-slate-700 text-sm font-bold">
                                    M
                                </div>
                                <div>
                                    <div className="font-semibold">{i.unvan}</div>
                                    <div className="text-xs text-slate-400">.</div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Müvekkil:</span>
                                    <span className="font-medium">Müvekkil</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Şehir:</span>
                                    <span className="font-medium">{i.sehir}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Tarih:</span>
                                    <span className="font-medium">{i.tarih}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Teklif:</span>
                                    <span className="font-medium">{i.teklif} teklif</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Belgeler:</span>
                                    <span className="font-medium">{i.belgeler ? "Var" : "Yok"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Bütçe:</span>
                                    <span className="font-medium">{i.butce} ₺</span>
                                </div>
                            </div>

                            <p className="mt-3 text-xs text-slate-500">{i.ozet}</p>

                            <button
                                className="mt-4 w-full rounded-xl bg-emerald-600 text-white py-2 font-semibold hover:bg-emerald-700"
                                onClick={() => alert("Premium gerekli.")}
                            >
                                İlanı Gör – ₺{PREMIUM_PRICE} (Premium)
                            </button>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}
