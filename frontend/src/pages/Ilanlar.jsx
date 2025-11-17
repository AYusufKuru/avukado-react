import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import { Gavel, Scale, Baby, ShieldCheck, CheckCircle2, Lock, FileUp, Coins } from "lucide-react";
import Baslarken from "../components/home/Baslarken";
import { useGetAdsQuery } from "../store/api/adsApi";
import LawyerCard from "../components/lawyers/LawyerCard";

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



export default function Ilanlar() {
    // girişli ise "Dava Başlat" doğrudan /ilan/ac; değilse /giris
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const clientCta = isAuthenticated ? "/ilan/ac" : "/giris";
    const location = useLocation();
    
    // Aile Hukuku (Boşanma) kategorisindeki ilanları API'den çek
    const { data: adsResponse, isLoading: isLoadingAds, error: adsError } = useGetAdsQuery({ 
        category: "aile", 
        status: "open" 
    });
    const ads = adsResponse?.data || [];

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            {/* ----------------- HERO: Boşanma Davaları ----------------- */}
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
                            Boşanma Davaları: Net Süreç, <br className="hidden md:block" />
                            Güvenilir Danışmanlık
                        </h1>

                        <p className="mt-4 text-neutral-700 max-w-2xl">
                            Boşanma sürecinin her aşamasında gizlilik ve şeffaflıkla size eşlik ediyoruz. Anlaşmalı ve çekişmeli
                            davaların farklarını, mal paylaşımı ve velayet süreçlerini ve durumunuza göre oluşabilecek maliyetleri
                            burada özetliyoruz.
                        </p>

                        {/* Kısa bilgi butonları */}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Pill icon={<Gavel className="w-4 h-4" />} label="Süreç" />
                            <Pill icon={<Coins className="w-4 h-4" />} label="Maliyetler" />
                            <Pill icon={<ShieldCheck className="w-4 h-4" />} label="Dava" />
                            <Pill icon={<Lock className="w-4 h-4" />} label="Gizlilik" />
                        </div>

                        {/* CTA’lar */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="#turler"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-5 py-3 hover:bg-slate-800"
                            >
                                Dava Türlerini Keşfet
                            </a>
                            <Link
                                to="/giris"
                                className="inline-flex items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 px-5 py-3 hover:bg-slate-50"
                            >
                                Ücretsiz Danışmanlık
                            </Link>
                        </div>
                    </div>

                    {/* Sağ kutu */}
                    <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-slate-900 text-white p-2 shrink-0">
                                <Gavel className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold" style={{ color: NAVY }}>
                                    Boşanma Süreci Nasıl İşler?
                                </h3>
                                <p className="text-sm text-neutral-600 mt-1">
                                    Hukuki değerlendirme, dilekçe, tebligat, müzakere/arabuluculuk, duruşmalar ve nihai karar.
                                </p>

                                <ul className="mt-3 space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        İlk danışma ve strateji
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Anlaşmalı yollar için arabuluculuk
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Gerektiğinde mahkeme temsili
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
                                        <p className="text-xs text-neutral-600 mt-1">Dilekçeleri, delilleri ve anlaşmaları güvenle paylaşın.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ----- Türler (alt bölüm başlığı, görseldeki ilk satırın devamı) ----- */}
            <section id="turler" className="mx-auto max-w-7xl px-4 pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-center" style={{ color: NAVY }}>
                    Boşanma Davası Türleri
                </h2>
                <p className="mt-2 text-center text-neutral-600">
                    Dört yaygın yol. Durumunuza en uygun seçeneği bulmanız için yardımcı oluyoruz.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <TypeCard
                        icon={<ShieldCheck className="w-6 h-6" />}
                        title="Anlaşmalı Boşanma"
                        text="Eşler velayet, mal paylaşımı ve nafaka gibi temel konularda anlaşır. Genellikle daha hızlı ve düşük maliyetlidir."
                    />
                    <TypeCard
                        icon={<Gavel className="w-6 h-6" />}
                        title="Çekişmeli Boşanma"
                        text="Uyuşmazlıklar nedeniyle müzakere, arabuluculuk veya mahkeme süreci gerekir."
                    />
                    <TypeCard
                        icon={<Scale className="w-6 h-6" />}
                        title="Mal Paylaşımı"
                        text="Varlıkların, borçların ve evlilik mallarının adil paylaşımı; değerlemeler dahil."
                    />
                    <TypeCard
                        icon={<Baby className="w-6 h-6" />}
                        title="Çocuk Velayeti"
                        text="Çocuğun üstün yararı; ebeveyn planları, velayet ve ziyaret hakları."
                    />
                </div>
            </section>

            {/* ----------------- BAŞLARKEN BLOĞU ----------------- */}
            <section className="mx-auto max-w-7xl px-4 py-10">
                <Baslarken clientCtaTo={clientCta} lawyerCtaTo="/giris" />
            </section>

            {/* ----------------- İLANLAR LİSTESİ ----------------- */}
            <section className="bg-neutral-50 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: NAVY }}>
                            Açık İlanlar
                        </h2>
                        <p className="mt-2 text-neutral-600">
                            Müvekkillerin oluşturduğu ilanları keşfedin ve teklif verin.
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
                            <p className="text-neutral-600">Henüz açık ilan bulunmamaktadır.</p>
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
