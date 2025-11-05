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
    FileText,    // Sözleşme, Belge
    Users,       // Taraflar
    // Bilişim Hukuku için eklenen/kullanılan ikonlar
    Server,              // Veri, Sunucu
    Shield,              // KVKK, Güvenlik
    MousePointerClick,   // E-Ticaret
    Copyright            // Fikri Mülkiyet, Yazılım
} from "lucide-react";
import Baslarken from "../../components/home/Baslarken"; // dosya yapınıza göre doğru

const NAVY = "#0a2342";

/** Popüler karma ilanlar (örnekler) */
const POPULAR = [
    {
        city: "Ankara",
        offers: 7,
        title: "Dolandırıcılık Dosyası",
        docs: ["Müvekkil beyanı (imzalı)", "Banka hareket dökümü (son 6 ay)", "Yazışma ekran görüntüleri"],
        price: 450,
    },
    {
        city: "İstanbul",
        offers: 12,
        title: "Hakaret Suçu (TCK 125)",
        docs: ["Dilekçe taslağı", "Tanık listesi (isim & telefon)", "Video/ses delili özeti"],
        price: 300,
    },
    {
        city: "İzmir",
        offers: 5,
        title: "Basit Yaralama (TCK 86)",
        docs: ["Hastane raporu (Acil özet)", "Olay fotoğrafları", "Polis ifade tutanağı"],
        price: 600,
    },
    {
        city: "Bursa",
        offers: 4,
        title: "Tehdit Suçu (TCK 106)",
        docs: ["Olay anlatımı", "Mesaj/kayıt dökümleri", "Şikayet dilekçesi"],
        price: 350,
    },
    {
        city: "Antalya",
        offers: 3,
        title: "Yağma (TCK 148)",
        docs: ["Olay yeri fotoğrafları", "Kamera kayıtları özeti", "Mağdur beyanı"],
        price: 900,
    },
    {
        city: "Adana",
        offers: 6,
        title: "Hırsızlık (TCK 141)",
        docs: ["Müşteki beyanı", "Eşya listesi ve faturalar", "Asayiş tutanakları"],
        price: 500,
    },
];
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

export default function Bilisim() {
    // girişli ise “Dava Başlat” doğrudan /ilan/ac; değilse /giris
    const token = useMemo(() => localStorage.getItem("avukado_token"), []);
    const clientCta = token ? "/ilan/ac" : "/giris";
    const location = useLocation();

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            {/* ----------------- HERO: Bilişim Hukuku ----------------- */}
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
                            Bilişim Hukuku: Veri, <br className="hidden md:block" />
                            Teknoloji ve Dijital Güvenlik
                        </h1>

                        <p className="mt-4 text-neutral-700 max-w-2xl">
                            Dijital dünyadaki varlığınızın her aşamasında size eşlik ediyoruz. E-ticaret,
                            KVKK (Kişisel Verilerin Korunması Kanunu), TCK kapsamındaki siber suçlar ve
                            durumunuza göre oluşabilecek maliyetleri burada özetliyoruz.
                        </p>

                        {/* Kısa bilgi butonları (Bilişim'e uyarlandı) */}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Pill icon={<Gavel className="w-4 h-4" />} label="Süreç" />
                            <Pill icon={<Shield className="w-4 h-4" />} label="KVKK Uyum" />
                            <Pill icon={<Lock className="w-4 h-4" />} label="Siber Suçlar" />
                            <Pill icon={<FileText className="w-4 h-4" />} label="Sözleşmeler" />
                        </div>

                        {/* CTA’lar (Bilişim'e uyarlandı) */}
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

                    {/* Sağ kutu (Bilişim'e uyarlandı) */}
                    <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-slate-900 text-white p-2 shrink-0">
                                <Server className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold" style={{ color: NAVY }}>
                                    Bilişim Süreci Nasıl İşler?
                                </h3>
                                <p className="text-sm text-neutral-600 mt-1">
                                    KVKK denetimi, e-ticaret sözleşmelerinin hazırlanması ve siber suçlara karşı hukuki başvuru.
                                </p>

                                <ul className="mt-3 space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        KVKK uyum denetimi ve VERBİS kaydı
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Sözleşme (SaaS, E-ticaret) hazırlama
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Bilişim suçları şikayet süreci
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
                                        <p className="text-xs text-neutral-600 mt-1">Sözleşme, log kayıtları ve ekran görüntülerini güvenle paylaşın.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ----- Türler (Bilişim Hizmetleri) ----- */}
            <section id="turler" className="mx-auto max-w-7xl px-4 pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-center" style={{ color: NAVY }}>
                    Başlıca Bilişim Hizmetleri
                </h2>
                <p className="mt-2 text-center text-neutral-600">
                    Girişimler, teknoloji şirketleri ve dijital kullanıcılar için hukuki çözümler.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <TypeCard
                        icon={<Shield className="w-6 h-6" />}
                        title="KVKK ve Veri Koruma"
                        text="KVKK uyum süreçleri, VERBİS kaydı, aydınlatma metinleri ve veri ihlali yönetimi."
                    />
                    <TypeCard
                        icon={<MousePointerClick className="w-6 h-6" />}
                        title="E-Ticaret Hukuku"
                        text="Mesafeli satış, üyelik ve gizlilik sözleşmeleri. ETBİS kaydı ve tüketici uyuşmazlıkları."
                    />
                    <TypeCard
                        icon={<Lock className="w-6 h-6" />}
                        title="Bilişim Suçları"
                        text="Yasadışı erişim, banka dolandırıcılığı, hakaret, tehdit ve içerik kaldırma süreçleri."
                    />
                    <TypeCard
                        icon={<Copyright className="w-6 h-6" />}
                        title="Yazılım ve Fikri Mülkiyet"
                        text="Yazılım lisans (SaaS) sözleşmeleri, marka-patent tescili ve dijital telif hakkı ihlalleri."
                    />
                </div>
            </section>

            {/* ----------------- BAŞLARKEN BLOĞU ----------------- */}
            <section className="mx-auto max-w-7xl px-4 py-10">
                <Baslarken clientCtaTo={clientCta} lawyerCtaTo="/giris" />
            </section>

            {/* ----------------- POPÜLER BİLİŞİM İLANLARI ----------------- */}
            <section className="bg-neutral-50 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: NAVY }}>
                            Popüler Bilişim İlanları
                        </h2>
                        <p className="mt-2 text-neutral-600">
                            Öne çıkan ilanları keşfedin ve tahmini fiyatları hızlıca görüntüleyin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {POPULAR.map((card, idx) => ( // POPULAR verisi artık Bilişim odaklı
                            <article
                                key={`${card.title}-${idx}`}
                                className="flex min-h-[320px] flex-col justify-between rounded-2xl border bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                                style={{ borderColor: `${NAVY}22` }}
                            >
                                <div className="flex items-start justify-between text-sm text-neutral-600">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            viewBox="0 0 24 24"
                                            width={18}
                                            height={18}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        <span>
                                            {card.city} • {card.offers} teklif
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
                                        {card.title}
                                    </h3>
                                    <div className="my-3 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
                                    <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
                                        {card.docs.map((d, i) => (
                                            <li key={`${card.title}-doc-${i}`}>{d}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <span
                                        className="rounded-full border px-3 py-1 text-xs font-bold"
                                        style={{ borderColor: `${NAVY}22`, color: NAVY }}
                                    >
                                        ₺{card.price}
                                    </span>
                                    <a // <Link> etiketi <a> olarak değiştirildi
                                        href={token ? `/ilan/${encodeURIComponent(card.title)}` : "/giris"} // 'to' prop'u 'href' olarak değiştirildi
                                        className="rounded-xl px-4 py-2 text-sm font-bold text-white shadow"
                                        style={{ backgroundColor: NAVY }}
                                        aria-label={`${card.title} ilanını görüntüle`}
                                    >
                                        Görüntüle
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
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
