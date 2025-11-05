// src/pages/HukukKatalogu.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TABS = [
    { key: "bosanma", title: "Boşanma" },
    { key: "ceza", title: "Ceza" },
    { key: "ticaret", title: "Ticaret" },
    { key: "miras", title: "Miras" },
    { key: "is", title: "İş" },
    { key: "icra", title: "İcra" },
];

export default function HukukKatalogu() {
    const [tab, setTab] = useState("ceza"); // varsayılan: Ceza dolu
    useEffect(() => {
        document.title = "Hukuk Kategorileri | Avukado";
    }, []);

    return (
        <div className="min-h-[70vh]">
            {/* HERO + aksiyonlar */}
            <section className="relative isolate overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-white" />
                <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900">Hukuk Kategorileri</h1>
                        <p className="mt-2 text-slate-600 max-w-2xl">
                            İhtiyacın olan alanı seç; Ceza, Boşanma, Ticaret, Miras ve daha fazlası. Bu ekrana özel alt menü ile
                            hızlıca gezinebilirsin.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/giris"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
                        >
                            Avukat Girişi
                        </Link>
                        <Link
                            to="/kayit"
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            İlan Aç (Ücretsiz)
                        </Link>
                    </div>
                </div>
            </section>

            {/* SAYFAYA ÖZEL ALT MENÜ / SEKME ÇUBUĞU */}
            <div className="sticky top-14 z-10 bg-white/90 backdrop-blur border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
                        {TABS.map((t) => {
                            const active = tab === t.key;
                            return (
                                <button
                                    key={t.key}
                                    onClick={() => setTab(t.key)}
                                    className={
                                        "whitespace-nowrap rounded-full px-4 py-2 text-sm border transition " +
                                        (active
                                            ? "bg-emerald-600 text-white border-emerald-600"
                                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")
                                    }
                                >
                                    {t.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* İÇERİK */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {tab === "ceza" ? <CezaIcerik /> : <YerTutucuBasit baslik={TABS.find((x) => x.key === tab)?.title} />}
            </div>
        </div>
    );
}

/* --- Ceza sekmesi: DOLU İÇERİK --- */
function CezaIcerik() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
            {/* Sol: Bilgilendirme makalesi (3. görsele benzer) */}
            <article className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="prose prose-slate max-w-none">
                    <h2>Ceza Avukatlığı Nedir?</h2>

                    <h3>Ceza davası hangi aşamalardan oluşur?</h3>
                    <p>
                        Soruşturma, kovuşturma (duruşma) ve kanun yolu aşamalarından oluşur. Her aşamada deliller toplanır ve
                        savunma hakları korunur.
                    </p>

                    <h3>Bir kişi gözaltına alındığında neler yapmalı?</h3>
                    <p>
                        Yakınlarına haber verme, müdafi (avukat) talep etme ve susma hakları vardır. İfade öncesi avukatla görüşmek
                        temel haktır.
                    </p>

                    <h3>Hangi hallerde tutuklama uygulanabilir?</h3>
                    <p>
                        Kuvvetli suç şüphesi, kaçma şüphesi veya delilleri karartma ihtimali gibi nedenlerle; ölçülülük ilkesi
                        gözetilir ve alternatif tedbirler değerlendirilir.
                    </p>

                    <h3>Avantajları ve riskler nelerdir?</h3>
                    <p>
                        Deneyimli ceza avukatının sürece erken katılımı, delil stratejisi ve hak ihlallerinin önlenmesi açısından
                        kritiktir; aksi halde telafisi güç sonuçlar doğabilir.
                    </p>
                </div>

                {/* CTA BAR */}
                <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="text-sm text-slate-600">
                        Uygun ceza avukatlarıyla eşleşmek için ücretsiz ilan oluşturun.
                    </div>
                    <div className="flex gap-3">
                        <Link
                            to="/kayit"
                            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                        >
                            İlan Oluştur
                        </Link>
                        <Link
                            to="/giris"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
                        >
                            Avukat Girişi
                        </Link>
                    </div>
                </div>
            </article>

            {/* Sağ: Örnek ilan kartları (1. görsele benzer, kısa versiyon) */}
            <aside className="space-y-4">
                <h3 className="font-semibold text-slate-900">Popüler Ceza İlanları</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {[
                        {
                            title: "Dolandırıcılık Davası",
                            city: "İstanbul",
                            offers: 3,
                            docs: ["Savcılık İddianamesi", "Tanık Listesi"],
                            price: 450,
                        },
                        {
                            title: "Hakaret Suçu (TCK 125)",
                            city: "Ankara",
                            offers: 2,
                            docs: ["Şikâyet Dilekçesi"],
                            price: 300,
                        },
                        {
                            title: "Basit Yaralama (TCK 86)",
                            city: "İzmir",
                            offers: 4,
                            docs: ["Olay Tutanakları", "Hastane Raporu"],
                            price: 600,
                        },
                    ].map((c, i) => (
                        <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h4 className="font-semibold text-slate-900">{c.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">📍 {c.city} • {c.offers} teklif</p>
                                </div>
                                <span className="text-xs rounded-full px-2 py-1 border border-amber-200 bg-amber-50 text-amber-700">
                                    Premium
                                </span>
                            </div>
                            <div className="mt-3">
                                <p className="text-xs font-medium text-slate-500">Belgeler</p>
                                <ul className="mt-1 text-sm text-slate-700 list-disc ml-4">
                                    {c.docs.map((d, j) => <li key={j}>{d}</li>)}
                                </ul>
                            </div>
                            <button className="mt-4 w-full rounded-lg bg-blue-600 text-white text-sm font-semibold py-2 hover:bg-blue-700">
                                Görüntüle • ₺{c.price}
                            </button>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}

/* --- Diğer sekmeler: tıklanabilir ama içerik boş/yer tutucu --- */
function YerTutucuBasit({ baslik }) {
    return (
        <div className="bg-white border rounded-2xl p-8 md:p-12 shadow-sm text-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">{baslik} Davası</h2>
            <p className="mt-2 text-slate-600">Bu kategori içeriği yakında eklenecek.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
                <Link
                    to="/kayit"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                    İlan Aç (Ücretsiz)
                </Link>
                <Link
                    to="/giris"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
                >
                    Avukat Girişi
                </Link>
            </div>
        </div>
    );
}
