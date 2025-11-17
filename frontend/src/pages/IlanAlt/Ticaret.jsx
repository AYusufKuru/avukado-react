import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Gavel,
    Scale,
    ShieldCheck,
    CheckCircle2,
    Lock,
    FileUp,
    Coins,
    // Ticaret Hukuku için eklenen yeni ikonlar
    FileText,    // Sözleşmeler
    Briefcase,   // Şirketler, Ticari Süreç
    Building2,   // Şirketler Hukuku
    Lightbulb,   // Fikri Mülkiyet
    Banknote     // Alacak Yönetimi / Maliyet
} from "lucide-react";
import Baslarken from "../../components/home/Baslarken";
import { useGetAdsQuery } from "../../store/api/adsApi";
import LawyerCard from "../../components/lawyers/LawyerCard";

const NAVY = "#0a2342";

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
const kategoriler = [
    { ad: "Boşanma", link: "/ilanlar" },
    { ad: "Ceza", link: "/ilanlar/ceza" },
    { ad: "Ticaret", link: "/ilanlar/ticaret" },
    { ad: "Miras", link: "/ilanlar/miras" },
    { ad: "İş Hukuku", link: "/ilanlar/is-hukuku" },
    { ad: "İcra-İflas", link: "/ilanlar/icra-iflas" },
    { ad: "Gayrimenkul", link: "/ilanlar/gayrimenkul" },
    { ad: "Bilişim", link: "/ilanlar/bilisim" },
    { ad: "Tüketici", link: "/ilanlar/tuketici" },
    { ad: "Vergi", link: "/ilanlar/vergi" },
];

export default function Ticaret() {
    // girişli ise "Dava Başlat" doğrudan /ilan/ac; değilse /giris
    const token = useMemo(() => localStorage.getItem("avukado_token"), []);
    const clientCta = token ? "/ilan/ac" : "/giris";
    const location = useLocation();
    
    // Ticaret kategorisindeki ilanları API'den çek
    const { data: adsResponse, isLoading: isLoadingAds, error: adsError } = useGetAdsQuery({ 
        category: "ticaret", 
        status: "open" 
    });
    const ads = adsResponse?.data || [];

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            {/* ----------------- HERO: Ticaret Hukuku ----------------- */}
            <section className="relative">
                <div className="flex gap-2 overflow-x-auto pt-4 w-full justify-center">
                    {kategoriler.map((kategori, index) => {
                        const aktifMi = location.pathname === kategori.link;
                        return (
                            <Link
                                to={kategori.link}
                                key={index}
                                className={`px-3 py-1 border rounded-full text-sm whitespace-nowrap cursor-pointer shadow-sm 
                                                                                   ${aktifMi ? "bg-teal-100" : "bg-white hover:bg-gray-100"}`}
                            >
                                {kategori.ad}
                            </Link>
                        );
                    })}
                </div>
                <div className="mx-auto max-w-7xl px-4 py-12 lg:py-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
                    {/* Sol */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: NAVY }}>
                            Ticaret Hukuku: Şirketiniz için <br className="hidden md:block" />
                            Güvenilir Çözümler
                        </h1>

                        <p className="mt-4 text-neutral-700 max-w-2xl">
                            Ticari faaliyetlerinizin her aşamasında gizlilik ve şeffaflıkla size eşlik ediyoruz. Sözleşme hazırlama,
                            TTK (Türk Ticaret Kanunu) uyumluluğu, şirket işlemleri ve
                            oluşabilecek maliyetleri burada özetliyoruz.
                        </p>

                        {/* Kısa bilgi butonları (Ticaret'e uyarlandı) */}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Pill icon={<Gavel className="w-4 h-4" />} label="Süreç" />
                            <Pill icon={<Coins className="w-4 h-4" />} label="Maliyetler" />
                            <Pill icon={<FileText className="w-4 h-4" />} label="Sözleşmeler" />
                            <Pill icon={<Lock className="w-4 h-4" />} label="Gizlilik" />
                        </div>

                        {/* CTA’lar (Ticaret'e uyarlandı) */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="#turler"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
                            >
                                Hizmet Alanlarını Keşfet
                            </a>
                            <Link
                                to="/giris"
                                className="inline-flex items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 px-5 py-3 hover:bg-slate-50"
                            >
                                Ücretsiz Danışmanlık
                            </Link>
                        </div>
                    </div>

                    {/* Sağ kutu (Ticaret'e uyarlandı) */}
                    <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-slate-900 text-white p-2 shrink-0">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold" style={{ color: NAVY }}>
                                    Ticari Süreç Nasıl İşler?
                                </h3>
                                <p className="text-sm text-neutral-600 mt-1">
                                    Danışmanlık, sözleşme hazırlama, arabuluculuk, dava açılışı ve icra takibi aşamaları.
                                </p>

                                <ul className="mt-3 space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        İhtiyaç analizi ve hukuki danışmanlık
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Sözleşme/belge hazırlama ve inceleme
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Dava/icra takibi ve temsil
                                    </li>
                                </ul>

                                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="flex items-center gap-2 font-medium">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            Tahmini Maliyet
                                        </div>
                                        <p className="text-xs text-neutral-600 mt-1">
                                            Belgeler incelendikten sonra şeffaf ücret aralıkları.
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="flex items-center gap-2 font-medium">
                                            <FileUp className="w-4 h-4 text-sky-600" />
                                            Güvenli Yükleme
                                        </div>
                                        <p className="text-xs text-neutral-600 mt-1">Sözleşme, fatura ve belgeleri güvenle paylaşın.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ----- Türler (Ticaret Hukuku Alanları) ----- */}
            <section id="turler" className="mx-auto max-w-7xl px-4 pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-center" style={{ color: NAVY }}>
                    Başlıca Ticaret Hukuku Alanları
                </h2>
                <p className="mt-2 text-center text-neutral-600">
                    Şirketinizin ihtiyaçlarına yönelik hukuki destek ve danışmanlık hizmetleri.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <TypeCard
                        icon={<Building2 className="w-6 h-6" />}
                        title="Şirketler Hukuku"
                        text="Şirket kuruluşu, birleşme, devralma, ana sözleşme değişiklikleri ve genel kurul işlemleri."
                    />
                    <TypeCard
                        icon={<FileText className="w-6 h-6" />}
                        title="Sözleşmeler Hukuku"
                        text="Bayilik, distribütörlük, hizmet alımı, kira ve satış sözleşmelerinin hazırlanması ve incelenmesi."
                    />
                    <TypeCard
                        icon={<Lightbulb className="w-6 h-6" />}
                        title="Fikri Mülkiyet"
                        text="Marka, patent ve tasarım tescili. Telif hakları, lisanslama ve haksız rekabet davaları."
                    />
                    <TypeCard
                        icon={<Banknote className="w-6 h-6" />}
                        title="Alacak Yönetimi"
                        text="Ticari alacakların tahsili, icra takibi, iflas ve konkordato süreçlerinin yönetimi."
                    />
                </div>
            </section>

            {/* ----------------- BAŞLARKEN BLOĞU ----------------- */}
            <section className="mx-auto max-w-7xl px-4 py-10">
                <Baslarken clientCtaTo={clientCta} lawyerCtaTo="/giris" />
            </section>

            {/* ----------------- TİCARET HUKUKU İLANLARI ----------------- */}
            <section className="bg-neutral-50 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: NAVY }}>
                            Ticaret Hukuku İlanları
                        </h2>
                        <p className="mt-2 text-neutral-600">
                            Müvekkillerin oluşturduğu ticaret hukuku ilanlarını keşfedin ve teklif verin.
                        </p>
                    </div>

                    {isLoadingAds ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-600">İlanlar yükleniyor...</p>
                        </div>
                    ) : adsError ? (
                        <div className="text-center py-12">
                            <p className="text-red-600">İlanlar yüklenirken bir hata oluştu.</p>
                        </div>
                    ) : ads.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-neutral-600">Henüz ticaret hukuku kategorisinde açık ilan bulunmamaktadır.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {ads.map((ad) => {
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
                </div>
            </section>
        </div>
    );
}

/* ---------- küçük yardımcı bileşenler ---------- */

function Pill({ icon, label }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
            {icon}
            {label}
        </span>
    );
}

function TypeCard({ icon, title, text }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 text-white" style={{ backgroundColor: NAVY }}>
                    {icon}
                </div>
                <h3 className="font-semibold" style={{ color: NAVY }}>
                    {title}
                </h3>
            </div>
            <p className="mt-3 text-sm text-neutral-600">{text}</p>
        </div>
    );
}
