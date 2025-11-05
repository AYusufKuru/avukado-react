// src/components/home/Baslarken.jsx
import { Link } from "react-router-dom";

export default function Baslarken({
    clientCtaTo = "/ilan/ac",
    lawyerCtaTo = "/giris",
}) {
    return (
        <section className="max-w-7xl mx-auto px-4 mt-12">
            <h2 className="text-3xl font-bold text-center">Başlarken</h2>
            <p className="text-slate-600 text-center mt-2">
                Müvekkiller için net, yönlendirici adımlar ve avukatlar için kolaylaştırılmış süreç.
                İki farklı yol, tek güvenli platform.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
                {/* Müvekkiller için */}
                <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-emerald-700/15 flex items-center justify-center">
                            <span className="text-emerald-700 text-lg">👤</span>
                        </div>
                        <h3 className="text-lg font-semibold">Müvekkiller İçin</h3>
                    </div>

                    <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                            Boşanma türünü seç
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                            Belgeleri yükle
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                            Avukatla iletişim kur
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                            Tahmini maliyeti gör
                        </li>
                    </ul>

                    <Link
                        to={clientCtaTo}
                        className="mt-6 block w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white py-3 text-center font-semibold"
                    >
                        Dava Başlat
                    </Link>
                </div>

                {/* Avukatlar için */}
                <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-green-700/15 flex items-center justify-center">
                            <span className="text-green-700 text-lg">🛡️</span>
                        </div>
                        <h3 className="text-lg font-semibold">Avukatlar İçin</h3>
                    </div>

                    <ul className="space-y-3 text-slate-700">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                            Profil doğrula
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                            Uygun davaları filtrele
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                            Teklif gönder
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                            Danışmanlık sağla
                        </li>
                    </ul>

                    <Link
                        to={lawyerCtaTo}
                        className="mt-6 block w-full rounded-lg bg-green-700 hover:bg-green-800 text-white py-3 text-center font-semibold"
                    >
                        Avukat Girişi
                    </Link>
                </div>
            </div>
        </section>
    );
}
