// src/pages/ClientDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/slices/authSlice";
import { useGetAdsQuery, useCreateAdMutation } from "../store/api/adsApi";
import { useGetProfileQuery, useUpdateProfileMutation } from "../store/api/authApi";
import LawyerCard from "../components/lawyers/LawyerCard";
import { Building2, Upload, Trash2, FileText, CheckCircle2, XCircle } from "lucide-react";

/* Uzmanlık → alt başlıklar (IlanOlustur'dan) */
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

/* Backend category'den frontend area'ya mapping */
const CATEGORY_TO_AREA = {
    "aile": "Aile Hukuku",
    "ceza": "Ceza Hukuku",
    "ticaret": "Ticaret Hukuku",
    "miras": "Miras Hukuku",
    "is-hukuku": "İş Hukuku",
    "icra-iflas": "İcra-İflas Hukuku",
    "gayrimenkul": "Gayrimenkul Hukuku",
    "bilisim": "Bilişim Hukuku",
    "tuketici": "Tüketici Hukuku",
    "vergi": "Vergi Hukuku",
};

// Yardımcı: kelime say
const wordCount = (t) => (t || "").trim().split(/\s+/).filter(Boolean).length;

export default function ClientDashboard() {
    const nav = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    
    // Profil bilgilerini backend'den çek
    const { data: profileResponse, isLoading: isLoadingProfile } = useGetProfileQuery(undefined, {
        skip: !currentUser,
    });
    const profileUser = profileResponse?.user;
    
    // Müvekkilin ilanlarını çek
    const { data: adsResponse, isLoading: isLoadingAds } = useGetAdsQuery(
        { client: currentUser?._id || currentUser?.id },
        { skip: !currentUser }
    );
    const userAds = adsResponse?.data || [];
    
    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();

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
    
    // Profil bilgileri yüklendiğinde state'i güncelle
    useEffect(() => {
        if (profileUser) {
            setProfil(prev => {
                const newProfil = {
                    adSoyad: profileUser.name || currentUser?.name || "",
                    sehir: profileUser.sehir || "",
                    telefon: profileUser.telefon || "",
                    email: profileUser.email || currentUser?.email || "",
                };
                // Sadece değerler değiştiyse güncelle
                if (
                    prev.adSoyad !== newProfil.adSoyad ||
                    prev.sehir !== newProfil.sehir ||
                    prev.telefon !== newProfil.telefon ||
                    prev.email !== newProfil.email
                ) {
                    return newProfil;
                }
                return prev;
            });
        } else if (currentUser && !profileUser) {
            // Fallback olarak currentUser'dan al (sadece profileUser yoksa)
            setProfil(prev => {
                const newProfil = {
                    adSoyad: currentUser.name || "",
                    sehir: "",
                    telefon: "",
                    email: currentUser.email || "",
                };
                // Sadece değerler değiştiyse güncelle
                if (
                    prev.adSoyad !== newProfil.adSoyad ||
                    prev.sehir !== newProfil.sehir ||
                    prev.telefon !== newProfil.telefon ||
                    prev.email !== newProfil.email
                ) {
                    return newProfil;
                }
                return prev;
            });
        }
    }, [profileUser?.name, profileUser?.sehir, profileUser?.telefon, profileUser?.email, currentUser?.name, currentUser?.email]);

    const profilKaydet = async () => {
        try {
            await updateProfile({
                name: profil.adSoyad.trim(),
                sehir: profil.sehir.trim(),
                telefon: profil.telefon.trim(),
            }).unwrap();
            
            alert("Bilgileriniz başarıyla kaydedildi.");
        } catch (error) {
            alert(error?.error || "Bilgiler kaydedilirken bir hata oluştu.");
        }
    };

    // -------- Dava Detayları (ilan formu) --------
    const [city, setCity] = useState(profil.sehir || "");
    const [area, setArea] = useState("");
    const [sub, setSub] = useState("");
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [files, setFiles] = useState([]);
    const [toast, setToast] = useState(null);
    const [createAd, { isLoading: isCreating }] = useCreateAdMutation();

    const titleWords = useMemo(() => wordCount(title), [title]);
    const titleTooLong = titleWords > 15;
    const detailsTooShort = details.trim().length > 0 && details.trim().length < 30;

    const subOptions = useMemo(() => (area ? AREA_TO_SUBS[area] || [] : []), [area]);

    const valid = city.trim() && area && sub && details.trim().length >= 30 && !titleTooLong;

    // Şehir değiştiğinde profil'den al
    useEffect(() => {
        if (profil.sehir && !city) {
            setCity(profil.sehir);
        }
    }, [profil.sehir, city]);

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

    async function ilanKaydet(e) {
        e.preventDefault();
        if (!valid) {
            if (details.trim().length < 30) {
                setToast({ type: "err", text: "Dava detayları en az 30 karakter olmalıdır." });
            } else {
                setToast({ type: "err", text: "Zorunlu alanları kontrol edin." });
            }
            return;
        }
        
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
            setToast({ type: "ok", text: "İlan başarıyla kaydedildi." });
            
            // Formu temizle
            setTitle("");
            setDetails("");
            setArea("");
            setSub("");
            setFiles([]);
            
            setTimeout(() => {
                setToast(null);
            }, 3000);
        } catch (error) {
            setToast({ type: "err", text: error?.error || "İlan kaydedilirken bir hata oluştu." });
        }
    }

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

                        {isLoadingProfile ? (
                            <p className="text-sm text-slate-600 mt-6">Profil bilgileri yükleniyor...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                        value={profil.adSoyad}
                                        onChange={(e) => setProfil({ ...profil, adSoyad: e.target.value })}
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Şehir</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                        value={profil.sehir}
                                        onChange={(e) => setProfil({ ...profil, sehir: e.target.value })}
                                        placeholder="Örn: İstanbul"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                                        value={profil.telefon}
                                        onChange={(e) => setProfil({ ...profil, telefon: e.target.value })}
                                        placeholder="05xx xxx xx xx"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
                                    <input
                                        type="email"
                                        disabled
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 cursor-not-allowed"
                                        value={profil.email}
                                        placeholder="ornek@eposta.com"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">E-posta adresi değiştirilemez</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-6">
                            <button
                                onClick={profilKaydet}
                                disabled={isUpdatingProfile || isLoadingProfile}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isUpdatingProfile ? "Kaydediliyor..." : "Bilgileri Kaydet"}
                            </button>
                        </div>
                    </section>

                    {/* Dava Detayları (İlan Formu) */}
                    <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">Dava Detayları</h2>
                        <p className="text-slate-600 text-sm mt-1">
                            Uzmanlık alanı ve alt başlığı seçin; başlığı (en fazla 15 kelime) ve detayları girin.
                        </p>

                        {/* Toast */}
                        {toast && (
                            <div
                                className={`mt-4 rounded-xl border px-4 py-3 flex items-center gap-2 shadow-sm ${
                                    toast.type === "ok"
                                        ? "bg-green-50 border-green-200 text-green-800"
                                        : "bg-red-50 border-red-200 text-red-800"
                                }`}
                            >
                                {toast.type === "ok" ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                    <XCircle className="w-5 h-5" />
                                )}
                                <span className="text-sm">{toast.text}</span>
                            </div>
                        )}

                        <form onSubmit={ilanKaydet} className="mt-6 grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="city">
                                        Şehir
                                    </label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                                        <input
                                            id="city"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                                            placeholder="Örn: İstanbul"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Uzmanlık Alanı</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
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
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Alt Başlık</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
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
                                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="title">
                                        Dosya Başlığı
                                    </label>
                                    <input
                                        id="title"
                                        className={`w-full px-4 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                                            titleTooLong ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-emerald-500"
                                        }`}
                                        placeholder="15 kelimede kısaca özetleyin"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <div className="mt-1 text-xs text-slate-500">
                                        {titleWords}/15 kelime {titleTooLong && <span className="text-red-600 font-medium">(limit aşıldı)</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Dava Detayları */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="details">
                                    Dava Detayları <span className="text-slate-400 font-normal">(en az 30 karakter)</span>
                                </label>
                                <textarea
                                    id="details"
                                    rows={6}
                                    className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-y bg-white ${
                                        detailsTooShort
                                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                            : "border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
                                    }`}
                                    placeholder="Olayı, belgeleri ve beklentinizi ayrıntılı şekilde yazın… (en az 30 karakter)"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    required
                                />
                                <div className={`mt-1 text-xs ${detailsTooShort ? "text-red-600 font-medium" : "text-slate-500"}`}>
                                    {details.trim().length} / 30 karakter {detailsTooShort && "(minimum 30 karakter gerekli)"}
                                </div>
                            </div>

                            {/* Files */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Belgeler (opsiyonel)</label>
                                <div className="flex items-center gap-3">
                                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 cursor-pointer transition-all">
                                        <Upload className="w-4 h-4" />
                                        <span>Dosyaları Seç</span>
                                        <input type="file" className="hidden" multiple accept=".pdf,.png,.jpg,.jpeg" onChange={onFileSelect} />
                                    </label>
                                    <span className="text-sm text-slate-500">PDF / JPG / PNG • max 10MB/dosya</span>
                                </div>

                                {files.length > 0 && (
                                    <ul className="mt-3 divide-y divide-slate-200 rounded-lg border border-slate-200 overflow-hidden">
                                        {files.map((f, i) => (
                                            <li key={i} className="flex items-center justify-between px-3 py-2 bg-white">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <FileText className="w-4 h-4 text-slate-500" />
                                                    <span className="text-sm truncate" title={f.name}>
                                                        {f.name}
                                                    </span>
                                                </div>
                                                <button type="button" onClick={() => removeFile(i)} className="p-1 rounded-lg hover:bg-red-50 transition-all">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={!valid || isCreating}
                                    className={`rounded-xl px-5 py-2.5 text-white font-semibold transition-all ${
                                        valid && !isCreating
                                            ? "bg-emerald-600 hover:bg-emerald-700"
                                            : "bg-emerald-300 cursor-not-allowed"
                                    }`}
                                >
                                    {isCreating ? "Kaydediliyor..." : "İlanı Kaydet"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>

                {/* SAĞ SÜTUN */}
                <div className="space-y-8">
                    {/* Müvekkilin İlanları */}
                    <section className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Oluşturduğum İlanlar</h3>
                        
                        {isLoadingAds ? (
                            <p className="text-sm text-slate-600">İlanlar yükleniyor...</p>
                        ) : userAds.length === 0 ? (
                            <p className="text-sm text-slate-600">
                                Henüz ilan oluşturmadınız. Sol taraftaki formdan yeni ilan oluşturabilirsiniz.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {userAds.map((ad) => {
                                    const area = CATEGORY_TO_AREA[ad.category] || ad.category;
                                    const fileCount = ad.documents?.length || 0;
                                    
                                    return (
                                        <LawyerCard
                                            key={ad._id}
                                            title={ad.title}
                                            area={area}
                                            sub=""
                                            city={ad.city}
                                            details={ad.description}
                                            fileCount={fileCount}
                                            fee={null}
                                            showPlaceholder={false}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
