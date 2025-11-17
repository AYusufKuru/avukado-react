import React, { useMemo, useState } from "react";
import { Upload, Trash2, Info, FileText, CheckCircle2, XCircle, Building2, Gavel } from "lucide-react";
import { useCreateAdMutation } from "../store/api/adsApi";
import { useNavigate } from "react-router-dom";



/* 1) ELLE VERİLEN (override) ARALIKLAR */
const feeConfig = {
    "Türkiye (Genel)": {
        "Aile Hukuku": {
            "Boşanma davaları": { mahkemeGiderleri: "₺4.500–₺12.000", avukatlikUcreti: "₺30.000–₺120.000" },
            "Vesayet": { mahkemeGiderleri: "₺3.000–₺8.000", avukatlikUcreti: "₺25.000–₺90.000" },
            "Nafaka": { mahkemeGiderleri: "₺2.500–₺6.500", avukatlikUcreti: "₺20.000–₺70.000" },
        },
        "Ceza Hukuku": {
            "Basit yaralama": { mahkemeGiderleri: "₺2.000–₺6.000", avukatlikUcreti: "₺25.000–₺90.000" },
            "Hakaret (TCK 125)": { mahkemeGiderleri: "₺2.000–₺5.000", avukatlikUcreti: "₺20.000–₺80.000" },
        },
        "Ticaret Hukuku": {
            "Alacak davası": { mahkemeGiderleri: "₺4.000–₺10.000", avukatlikUcreti: "₺35.000–₺140.000" },
        },
        "Vergi Hukuku": {
            "Vergi uyuşmazlığı": { mahkemeGiderleri: "₺5.000–₺15.000", avukatlikUcreti: "₺40.000–₺160.000" },
        },
    },
    "İstanbul": {
        "Aile Hukuku": {
            "Boşanma davaları": { mahkemeGiderleri: "₺5.500–₺14.000", avukatlikUcreti: "₺40.000–₺150.000" },
        },
        "Vergi Hukuku": {
            "Vergi uyuşmazlığı": { mahkemeGiderleri: "₺6.000–₺18.000", avukatlikUcreti: "₺50.000–₺180.000" },
        },
    },
    "Ankara": {
        "Aile Hukuku": {
            "Boşanma davaları": { mahkemeGiderleri: "₺5.000–₺13.000", avukatlikUcreti: "₺35.000–₺130.000" },
        },
    },
};

/* 2) 2025 ASGARİ ÜCRET TARİFESİ (TABAN) */
const TARIFF_TRY = {
    // Aile/Medeni
    AILE_BOSANMA: 30000,
    AILE_DIGER: 30000, // velayet/nafaka/vesayet
    MEDENI_SULH: 18000,
    MEDENI_ASLIYE: 30000,

    // Ceza
    CEZA_SORUSTURMA: 8000,
    CEZA_SULH_INF: 13500,
    CEZA_ASLIYE: 30000,
    CEZA_AGIR: 48000,
    CEZA_COCUK: 30000,
    CEZA_COCUK_AGIR: 48000,
    CEZA_ASKERI_DISIPLIN: 18000,

    // Tüketici
    TUKETICI: 15000,

    // Fikri Mülkiyet
    FIKRI_SINAI: 40000,

    // İcra-İflas
    ICRA_DAIRE: 6000,
    ICRA_MHK_IS: 7000,
    ICRA_MHK_DAVA: 12000,
    ICRA_TAHLİYE_TAKIP: 13500,
    ICRA_MHK_CEZA: 10000,

    // Vergi/İdare (özet)
    VERGI_DURUSMASIZ: 18000,
    VERGI_DURUSMALI: 36000,
};

/* 3) ŞEHİR ÇARPANLARI (özet) */
const CITY_MULT = {
    "İstanbul": 1.15,
    "Ankara": 1.1,
    "İzmir": 1.1,
};

/* 4) Uzmanlık → alt başlıklar */
const AREA_TO_SUBS = {
    "Aile Hukuku": ["Boşanma davaları", "Vesayet", "Nafaka"],
    "Ceza Hukuku": ["Basit yaralama", "Hakaret (TCK 125)"],
    "Ticaret Hukuku": ["Alacak davası"],
    "Miras Hukuku": ["Mirasın paylaşımı"],
    "İş Hukuku": ["Kıdem/ihbar tazminatı"],
    "İcra-İflas Hukuku": ["İcra takibi"],
    "Gayrimenkul Hukuku": ["Kira uyuşmazlığı"],
    "Bilişim Hukuku": ["İnternet içerik çıkarmaya ilişkin talepler"],
    "Tüketici Hukuku": ["Ayıplı mal/bedel iadesi"],
    "Vergi Hukuku": ["Vergi uyuşmazlığı"],
};

const allAreas = Object.keys(AREA_TO_SUBS);

/* Alan adından backend category'ye mapping */
const AREA_TO_CATEGORY = {
    "Aile Hukuku": "aile",
    "Ceza Hukuku": "ceza",
    "Ticaret Hukuku": "ticaret",
    "Miras Hukuku": "miras",
    "İş Hukuku": "is-hukuku",
    "İcra-İflas Hukuku": "icra-iflas",
    "Gayrimenkul Hukuku": "gayrimenkul",
    "Bilişim Hukuku": "bilisim",
    "Tüketici Hukuku": "tuketici",
    "Vergi Hukuku": "vergi",
};

/* 5) Alan/Alt başlıktan "kategori" seçimi (tarife anahtarları) */
function pickTariffKey(area, sub) {
    const a = (area || "").toLowerCase();
    const s = (sub || "").toLowerCase();

    if (a.includes("aile")) {
        if (s.includes("boşanma")) return "AILE_BOSANMA";
        return "AILE_DIGER";
    }
    if (a.includes("ceza")) {
        if (s.includes("ağır")) return "CEZA_AGIR";
        if (s.includes("basit yaralama")) return "CEZA_ASLIYE";
        if (s.includes("hakaret")) return "CEZA_ASLIYE";
        return "CEZA_ASLIYE";
    }
    if (a.includes("tüketici")) return "TUKETICI";
    if (a.includes("miras")) return "MEDENI_SULH";
    if (a.includes("gayrimenkul")) {
        if (s.includes("kira")) return "MEDENI_SULH";
        return "MEDENI_ASLIYE";
    }
    if (a.includes("ticaret")) return "MEDENI_ASLIYE";
    if (a.includes("iş ")) return "MEDENI_ASLIYE";
    if (a.includes("icra")) return "ICRA_MHK_DAVA";
    if (a.includes("vergi")) return "VERGI_DURUSMALI";
    if (a.includes("bilişim")) return "MEDENI_ASLIYE";
    return null;
}

/* 6) Mahkeme gideri tahmini (alan bazlı kaba aralık) */
function guessCourtCostRange(area) {
    const a = (area || "").toLowerCase();
    if (a.includes("aile")) return [4500, 12000];
    if (a.includes("ceza")) return [2000, 6000];
    if (a.includes("icra")) return [1500, 5000];
    if (a.includes("tüketici")) return [1000, 3500];
    if (a.includes("vergi")) return [5000, 15000];
    return [3000, 10000]; // genel
}

/* 7) Formatlayıcı */
const fmt = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });
const moneyRange = (lo, hi) => `${fmt.format(lo)}–${fmt.format(hi)}`;

/* 8) ÜCRET SEÇİMİ: önce override, yoksa tarife + şehir çarpanı */
function getFeeForSelection(city, area, sub) {
    const cityBlock = (city && feeConfig[city?.trim()]) || null;
    const general = feeConfig["Türkiye (Genel)"];

    // 8.1 – doğrudan verilen tablo
    const direct =
        (cityBlock && cityBlock[area] && cityBlock[area][sub]) ||
        (general && general[area] && general[area][sub]);
    if (direct) return direct;

    // 8.2 – tarife + şehir çarpanı ile tahmin
    const key = pickTariffKey(area, sub);
    const base = key ? TARIFF_TRY[key] : null;
    if (!base) return null;

    const mult = CITY_MULT[city?.trim()] || 1;
    const taban = Math.round(base * mult);
    const tavan = Math.round(taban * 2.5); // pratik aralık

    const [gLo, gHi] = guessCourtCostRange(area);
    return {
        mahkemeGiderleri: moneyRange(gLo, gHi),
        avukatlikUcreti: moneyRange(taban, tavan),
    };
}

/* yardımcılar */
const wordCount = (t) => (t || "").trim().split(/\s+/).filter(Boolean).length;

export default function IlanOlustur() {
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [sub, setSub] = useState("");
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [files, setFiles] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState(null);
    const [createAd, { isLoading: isCreating }] = useCreateAdMutation();
    const navigate = useNavigate();

    const titleWords = useMemo(() => wordCount(title), [title]);
    const titleTooLong = titleWords > 15;

    const subOptions = useMemo(() => (area ? AREA_TO_SUBS[area] || [] : []), [area]);
    const fee = useMemo(() => (area && sub ? getFeeForSelection(city, area, sub) : null), [city, area, sub]);

    const valid = city.trim() && area && sub && details.trim().length >= 30 && !titleTooLong;

    function onFileSelect(e) {
        const selected = Array.from(e.target.files || []);
        const accepted = selected.filter((f) => /pdf|png|jpg|jpeg/i.test(f.type) && f.size <= 10 * 1024 * 1024);
        const rejected = selected.length - accepted.length;
        setFiles((prev) => [...prev, ...accepted]);
        if (rejected > 0) setToast({ type: "err", text: `${rejected} dosya tip/limit nedeniyle eklenmedi.` });
    }

    function removeFile(idx) {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    }

    async function submitForm(e) {
        e.preventDefault();
        if (!valid) return setToast({ type: "err", text: "Zorunlu alanları kontrol edin." });
        
        try {
            const category = AREA_TO_CATEGORY[area] || "aile";
            const adData = {
                title: title.trim(),
                description: details.trim(),
                category,
                city: city.trim(),
                documents: files.map(f => ({ name: f.name })),
            };

            await createAd(adData).unwrap();
            setSubmitted(true);
            setToast({ type: "ok", text: "İlan başarıyla kaydedildi." });
            setTimeout(() => {
                setToast(null);
                navigate("/ilanlar");
            }, 2000);
        } catch (error) {
            setToast({ type: "err", text: error?.error || "İlan kaydedilirken bir hata oluştu." });
        }
    }

    return (
        <div className="min-h-[100vh] bg-neutral-50 text-neutral-900">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-neutral-200">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
                    <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <Gavel className="w-5 h-5" />
                        <span>AVUKADO</span>
                    </div>
                    <span className="ml-auto text-sm text-neutral-500">İlan Oluştur</span>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8">
                {/* Toast */}
                {toast && (
                    <div
                        className={`mb-6 rounded-xl border px-4 py-3 flex items-center gap-2 shadow-sm ${toast.type === "ok"
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-red-50 border-red-200 text-red-800"
                            }`}
                    >
                        {toast.type === "ok" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="text-sm">{toast.text}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <section className="lg:col-span-2">
                        <form onSubmit={submitForm} className="bg-white rounded-2xl shadow-md border border-neutral-200 p-5">
                            <h2 className="text-xl font-semibold mb-4">İlan Oluştur</h2>
                            <p className="text-sm text-neutral-600 mb-6">
                                Uzmanlık alanı ve alt başlığı seçin; başlığı (en fazla 15 kelime) ve detayları girin.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="city">
                                        Şehir
                                    </label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                                        <input
                                            id="city"
                                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-white"
                                            placeholder="Örn: İstanbul"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="area">
                                        Uzmanlık Alanı
                                    </label>
                                    <select
                                        id="area"
                                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-white"
                                        value={area}
                                        onChange={(e) => {
                                            setArea(e.target.value);
                                            setSub("");
                                        }}
                                        required
                                    >
                                        <option value="">Seçin…</option>
                                        {allAreas.map((a) => (
                                            <option key={a} value={a}>
                                                {a}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="sub">
                                        Alt Başlık
                                    </label>
                                    <select
                                        id="sub"
                                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-white"
                                        value={sub}
                                        onChange={(e) => setSub(e.target.value)}
                                        required
                                        disabled={!area}
                                    >
                                        <option value="">{area ? "Seçin…" : "Önce uzmanlık alanını seçin"}</option>
                                        {subOptions.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="title">
                                        Dosya Başlığı
                                    </label>
                                    <input
                                        id="title"
                                        className={`w-full px-3 py-2 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-green-600 ${titleTooLong ? "border-red-500" : "border-neutral-300 focus:border-green-600"
                                            }`}
                                        placeholder="15 kelimede kısaca özetleyin"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <div className="mt-1 text-xs text-neutral-500 flex items-center gap-1">
                                        <Info className="w-3 h-3" />
                                        <span>
                                            {titleWords}/15 kelime {titleTooLong && <span className="text-red-600">(limit aşıldı)</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1" htmlFor="details">
                                        Dava Detayları
                                    </label>
                                    <textarea
                                        id="details"
                                        className="w-full min-h-[160px] px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-white"
                                        placeholder="Olayı, belgeleri ve beklentinizi ayrıntılı şekilde yazın… (en az 30 karakter)"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        required
                                    />
                                    <p className="mt-1 text-xs text-neutral-500">* Kişisel verileri paylaşırken dikkatli olun.</p>
                                </div>

                                {/* Files */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2">Belgeler (opsiyonel)</label>
                                    <div className="flex items-center gap-3">
                                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 cursor-pointer">
                                            <Upload className="w-4 h-4" />
                                            <span>Dosyaları Seç</span>
                                            <input type="file" className="hidden" multiple accept=".pdf,.png,.jpg,.jpeg" onChange={onFileSelect} />
                                        </label>
                                        <span className="text-sm text-neutral-500">PDF / JPG / PNG • max 10MB/dosya</span>
                                    </div>

                                    {files.length > 0 && (
                                        <ul className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 overflow-hidden">
                                            {files.map((f, i) => (
                                                <li key={i} className="flex items-center justify-between px-3 py-2 bg-white">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <FileText className="w-4 h-4 text-neutral-500" />
                                                        <span className="text-sm truncate" title={f.name}>
                                                            {f.name}
                                                        </span>
                                                    </div>
                                                    <button type="button" onClick={() => removeFile(i)} className="p-1 rounded-lg hover:bg-red-50">
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={!valid || isCreating}
                                    className={`px-5 py-2 rounded-xl text-white shadow-md transition ${valid && !isCreating ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"
                                        }`}
                                >
                                    {isCreating ? "Kaydediliyor..." : "İlanı Kaydet"}
                                </button>
                                <span className="text-sm text-neutral-500">
                                    Gerekli alanlar: Şehir, Uzmanlık, Alt Başlık, Detaylar.
                                </span>
                            </div>
                        </form>
                    </section>

                    {/* Fee Panel */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-5 sticky top-20">
                            <h3 className="text-lg font-semibold mb-1">Ücret Bilgileri (Tahmini)</h3>
                            <p className="text-sm text-neutral-600 mb-4">
                                Seçimlerinize göre ortalama mahkeme giderleri ve avukatlık ücreti.
                            </p>

                            <div className="space-y-3">
                                <Row label="Şehir" value={city || "—"} />
                                <Row label="Uzmanlık Alanı" value={area || "—"} />
                                <Row label="Alt Başlık" value={sub || "—"} />
                            </div>

                            <div className="my-4 h-px bg-neutral-200" />

                            {area && sub ? (
                                fee ? (
                                    <div className="space-y-2">
                                        <Row label="Mahkeme Giderleri (ortalama)" value={fee.mahkemeGiderleri} bold />
                                        <Row label="Avukatlık Ücreti (ortalama)" value={fee.avukatlikUcreti} bold />
                                    </div>
                                ) : (
                                    <p className="text-sm text-neutral-600">Veri bulunamadı; genel aralık gösterilemiyor.</p>
                                )
                            ) : (
                                <p className="text-sm text-neutral-500">Bilgiler seçim yapıldıkça görünecek.</p>
                            )}

                            <p className="mt-4 text-xs text-neutral-500">
                                * Tutarlar bilgilendirme amaçlıdır; il, dosya kapsamı ve avukat tercihine göre değişebilir.
                            </p>
                        </div>
                    </aside>
                </div>

                {/* Lawyer Card Preview */}
                <section className="mt-10">
                    <h3 className="text-lg font-semibold mb-3">Avukat Görünümü (Örnek Kart)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <LawyerCard
                            title={title || "(Başlık girilmedi)"}
                            area={area}
                            sub={sub}
                            city={city}
                            details={details}
                            fileCount={files.length}
                            fee={fee}
                            showPlaceholder={!submitted}
                        />
                    </div>
                </section>
            </main>

            <footer className="mt-16 py-10 border-t border-neutral-200 bg-white/60">
                <div className="mx-auto max-w-6xl px-4 text-sm text-neutral-500">
                    © {new Date().getFullYear()} Avukado – Hukukun En Doğal Hali
                </div>
            </footer>
        </div>
    );
}

function Row({ label, value, bold = false }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-neutral-600">{label}</span>
            <span className={`text-sm ${bold ? "font-semibold text-neutral-900" : "text-neutral-800"}`}>{value}</span>
        </div>
    );
}

function LawyerCard({ title, area, sub, city, details, fileCount, fee, showPlaceholder }) {
    const safeTitle = (title || "").trim() || "İlan Başlığı";
    const chip = [area, sub].filter(Boolean).join(" / ");
    const fullDetails = details || "Dava detay önizlemesi – müvekkilin paylaştığı açıklama burada özetlenecek.";

    return (
        <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-5 flex flex-col h-full">
            {/* Başlık - Tam genişlik */}
            <h4 className="font-semibold text-neutral-900 break-words mb-2">{safeTitle}</h4>
            
            {/* Chip - Başlığın altında, wrap olabilir */}
            {chip && (
                <div className="mb-2">
                    <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 text-xs break-words">
                        {chip}
                    </span>
                </div>
            )}

            <div className="mt-1 text-sm text-neutral-600 flex items-center gap-2 flex-wrap">
                <span>{city || "Şehir belirtilmedi"}</span>
                <span>•</span>
                <span>Belge: {fileCount}</span>
            </div>

            {/* Açıklama - Tüm metin gösteriliyor, alt satıra geçiyor */}
            <p className="mt-3 text-sm text-neutral-800 leading-relaxed break-words whitespace-pre-wrap">{fullDetails}</p>

            {/* Ücret Bilgileri - Daha kompakt düzen */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-xs">
                        <span className="text-neutral-500 block mb-0.5">Mahkeme:</span>
                        <span className="font-semibold text-neutral-900 text-sm">{fee?.mahkemeGiderleri || "—"}</span>
                    </div>
                    <div className="text-xs">
                        <span className="text-neutral-500 block mb-0.5">Avukatlık:</span>
                        <span className="font-semibold text-neutral-900 text-sm">{fee?.avukatlikUcreti || "—"}</span>
                    </div>
                </div>

                {/* Butonlar - Daha yatay ve kompakt */}
                <div className="flex flex-wrap gap-2">
                    <button className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium shadow-sm transition-colors">
                        İletişime Geç
                    </button>
                    <button className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-medium transition-colors">
                        Teklif Ver
                    </button>
                </div>
            </div>

            {showPlaceholder && (
                <p className="mt-3 text-xs text-neutral-500 italic">
                    * Bu kart, müvekkil ilanı kaydedince avukatlara böyle görünecektir.
                </p>
            )}
        </div>
    );
}
