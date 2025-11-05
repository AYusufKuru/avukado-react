import { Link } from "react-router-dom";

function Feature({ icon, title, text }) {
    return (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-sm">
            <div className="mb-2 text-2xl">{icon}</div>
            <div className="mb-1 font-semibold">{title}</div>
            <p className="text-sm text-slate-600">{text}</p>
        </div>
    );
}

export default function Landing() {
    return (
        <div>
            {/* Hero */}
            <section className="relative bg-gradient-to-b from-slate-50 to-slate-100">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:px-8 md:grid-cols-2">
                    <div>
                        <div className="inline-flex items-center gap-2 font-semibold text-emerald-700">
                            <span className="text-2xl">🥑</span> AVUKADO
                        </div>
                        <h1 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">
                            “Hak Aramanın En Doğal Yolu”
                        </h1>
                        <p className="mt-4 text-slate-600">
                            Avukado; müvekkiller ile avukatları kolayca bir araya getiren, filtreleme,
                            canlı danışmanlık, randevu ve teklif toplama özelliklerine sahip modern bir
                            hukuk platformudur.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <Link
                                to="/giris"
                                className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                to="/kayit"
                                className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-emerald-700 hover:bg-emerald-100"
                            >
                                Kayıt Ol
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl ring-1 ring-black/5 shadow">
                        <img
                            alt="Avukado"
                            className="h-[320px] w-full object-cover"
                            src="/img/avukatresim.jpg"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Avantajlar */}
            <section className="bg-white py-14">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <h2 className="text-3xl font-bold">Avukado’nun Avantajları</h2>
                    <p className="mt-2 text-slate-600">
                        Müvekkiller uygun avukatı saniyeler içinde bulur; avukatlar için de profesyonel iş
                        fırsatları doğar.
                    </p>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Feature icon="⚖️" title="Kolay Ulaşım" text="Şehir/uzmanlık/puan ile filtreleyip doğru avukatı bul." />
                        <Feature icon="🛡️" title="Güvenli Sistem" text="Baro numarası doğrulanmış profillerle için rahat eder." />
                        <Feature icon="💬" title="Canlı Danışmanlık" text="Hızlı çevrimiçi görüşme ve teklif alma." />
                        <Feature icon="💳" title="Ödeme & Fatura" text="Güvenli ödeme (paketler) ve faturalandırma." />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-50 py-14">
                <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
                    <h3 className="text-2xl font-bold">Hemen Başla</h3>
                    <p className="mt-2 text-slate-600">
                        Hesabın varsa giriş yap, yoksa dakikalar içinde kayıt ol.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <Link
                            to="/giris"
                            className="rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
                        >
                            Giriş Yap
                        </Link>
                        <Link
                            to="/kayit"
                            className="rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-50"
                        >
                            Kayıt Ol
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
