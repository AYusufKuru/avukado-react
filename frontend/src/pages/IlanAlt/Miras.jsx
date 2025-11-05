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
    FileText,
    Users,
    Landmark,
    FileMinus
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

export default function Miras() {
    // girişli ise “Dava Başlat” doğrudan /ilan/ac; değilse /giris
    const token = useMemo(() => localStorage.getItem("avukado_token"), []);
    const clientCta = token ? "/ilan/ac" : "/giris";
    const location = useLocation();

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            {/* ----------------- HERO: Miras Hukuku ----------------- */}
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
                            Miras Hukuku: Haklarınızı <br className="hidden md:block" />
                            Güvence Altına Alın
                        </h1>

                        <p className="mt-4 text-neutral-700 max-w-2xl">
                            Miras süreçlerinizin her aşamasında gizlilik ve şeffaflıkla size eşlik ediyoruz. Vasiyetname, veraset ilamı,
                            TMK (Türk Medeni Kanunu) kapsamındaki haklarınızı ve durumunuza göre
                            oluşabilecek maliyetleri burada özetliyoruz.
                        </p>

                        {/* Kısa bilgi butonları (Miras'a uyarlandı) */}
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Pill icon={<Gavel className="w-4 h-4" />} label="Süreç" />
                            <Pill icon={<Coins className="w-4 h-4" />} label="Maliyetler" />
                            <Pill icon={<FileText className="w-4 h-4" />} label="Vasiyetname" />
                            <Pill icon={<Lock className="w-4 h-4" />} label="Gizlilik" />
                        </div>

                        {/* CTA’lar (Miras'a uyarlandı) */}
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

                    {/* Sağ kutu (Miras'a uyarlandı) */}
                    <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                        <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-slate-900 text-white p-2 shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold" style={{ color: NAVY }}>
                                    Miras Süreci Nasıl İşler?
                                </h3>
                                <p className="text-sm text-neutral-600 mt-1">
                                    Veraset ilamı alınması, terekenin tespiti, mirasçıların belirlenmesi, paylaşım veya dava aşamaları.
                                </p>

                                <ul className="mt-3 space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Veraset ilamı ve tereke tespiti
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Mirasçıların haklarının korunması
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                                        Paylaşım, vasiyetname açılması ve dava süreçleri
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
                                        <p className="text-xs text-neutral-600 mt-1">Veraset ilamı, tapu ve vasiyetnameleri güvenle paylaşın.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ----- Türler (Miras Hukuku Alanları) ----- */}
            <section id="turler" className="mx-auto max-w-7xl px-4 pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-center" style={{ color: NAVY }}>
                    Başlıca Miras Hukuku Alanları
                </h2>
                <p className="mt-2 text-center text-neutral-600">
                    Mirasçıların haklarını korumaya yönelik hukuki destek ve danışmanlık hizmetleri.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <TypeCard
                        icon={<FileText className="w-6 h-6" />}
                        title="Vasiyetname ve Miras Sözleşmeleri"
                        text="Vasiyetname hazırlanması, vasiyetnamenin iptali davaları ve miras taksim sözleşmelerinin düzenlenmesi."
                    />
                    <TypeCard
                        icon={<Landmark className="w-6 h-6" />}
                        title="Tereke Tespiti ve Paylaşımı"
                        text="Veraset ilamı alınması, terekenin (miras kalan mal varlığı) tespiti ve mirasçılar arası adil paylaşım."
                    />
                    <TypeCard
                        icon={<ShieldCheck className="w-6 h-6" />}
                        title="Tenkis ve Muvazaa Davaları"
                        text="Saklı pay ihlallerine karşı tenkis davası ve mirastan mal kaçırmaya (muvazaa) yönelik tapu iptal davaları."
                    />
                    <TypeCard
                        icon={<FileMinus className="w-6 h-6" />}
                        title="Reddi Miras (Mirası Red)"
                        text="Murisin borçları nedeniyle mirası reddetme süreci (3 aylık yasal süre) ve hukuki sonuçları."
                    />
                </div>
            </section>

            {/* ----------------- BAŞLARKEN BLOĞU ----------------- */}
            <section className="mx-auto max-w-7xl px-4 py-10">
                <Baslarken clientCtaTo={clientCta} lawyerCtaTo="/giris" />
            </section>

            {/* ----------------- POPÜLER MİRAS HUKUKU İLANLARI ----------------- */}
            <section className="bg-neutral-50 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: NAVY }}>
                            Popüler Miras Hukuku İlanları
                        </h2>
                        <p className="mt-2 text-neutral-600">
                            Öne çıkan ilanları keşfedin ve tahmini fiyatları hızlıca görüntüleyin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {POPULAR.map((card, idx) => ( // POPULAR verisi artık Miras odaklı
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
