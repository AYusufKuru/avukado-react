// src/pages/legal/MesafeliSatis.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MesafeliSatis() {
    useEffect(() => {
        document.title = "Mesafeli Satış Sözleşmesi | Avukado";
    }, []);

    const updatedAt = "25 Ağustos 2025";

    return (
        <div className="min-h-[70vh]">
            {/* HERO */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-white" />
                <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-14">
                    <nav className="text-sm text-slate-500 mb-4">
                        <Link to="/" className="hover:text-teal-700">Ana Sayfa</Link>
                        <span className="mx-2">/</span>
                        <Link to="/yasal/gizlilik" className="hover:text-teal-700">Yasal</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-700 font-medium">Mesafeli Satış</span>
                    </nav>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900">
                        Avukado Platformu Mesafeli Satış Sözleşmesi
                    </h1>
                    <p className="mt-3 text-slate-600 max-w-3xl">
                        Dijital hizmet paketlerinin satış ve ifa koşulları.
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-xs md:text-sm text-slate-500 bg-white/70 border rounded-full px-3 py-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                        Son güncelleme: {updatedAt}
                    </div>
                </div>
            </header>

            <section className="max-w-5xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                {/* CONTENT */}
                <article className="bg-white border rounded-2xl p-6 md:p-10 shadow-sm">
                    <div className="prose prose-slate max-w-none">
                        <h2 id="taraflar">1. Taraflar</h2>
                        <ul>
                            <li><strong>Satıcı/Hizmet Sağlayıcı:</strong> Avukado Platformu (“Platform”)</li>
                            <li><strong>Alıcı/Kullanıcı:</strong> Platforma üye olan avukat veya müvekkil</li>
                        </ul>

                        <h2 id="konu">2. Sözleşmenin Konusu</h2>
                        <p>
                            Dijital hizmet paketleri (ilan görüntüleme kredisi, danışmanlık erişimi vb.) satış ve ifa koşulları.
                        </p>

                        <h2 id="bedel-odeme">3. Hizmet Bedeli ve Ödeme</h2>
                        <ul>
                            <li>Güncel fiyatlar sistemde belirtilir.</li>
                            <li>Ödeme kredi kartı / havale-EFT / çevrimiçi yöntemlerle yapılır.</li>
                            <li>Ödeme tamamlanınca hizmet anında açılır.</li>
                        </ul>

                        <h2 id="ifa">4. Hizmetin İfası</h2>
                        <ul>
                            <li>Krediler platform üzerinden kullanılır.</li>
                            <li>Anında sunulan elektronik hizmetler iade edilemez.</li>
                            <li>Platform teknik aksaklıklar dışında kesintisiz hizmeti taahhüt eder.</li>
                        </ul>

                        <h2 id="cayma-hakki">5. Cayma Hakkı</h2>
                        <p>
                            6502 sayılı Kanun uyarınca anında ifa edilen dijital içeriklerde cayma hakkı yoktur; ödeme onayında kabul edilmiş sayılır.
                        </p>

                        <h2 id="sorumluluk-reddi">6. Sorumluluk Reddi</h2>
                        <p>Platform aracı hizmet sağlayıcıdır; hukuki hizmetten doğan sorumluluk taraflara aittir.</p>

                        <h2 id="guvenlik-garanti">7. Güvenlik ve Ödeme Garantisi</h2>
                        <ul>
                            <li>Platform içi ödemelerde hizmetin teslimi garanti altındadır.</li>
                            <li>Dışarıda yapılan ödemelerden platform sorumlu değildir.</li>
                            <li>Sistem dışı anlaşma yapan avukatın hesabı askıya alınır/kapatılır.</li>
                        </ul>

                        <h2 id="mucbir-sebepler">8. Mücbir Sebepler</h2>
                        <p>
                            Doğal afet, savaş, internet kesintisi vb. durumlarda geçici aksamalardan platform sorumlu tutulamaz.
                        </p>

                        <h2 id="hukuk-yetki">9. Hukuk ve Yetki</h2>
                        <p>Türk Hukuku uygulanır; İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir.</p>

                        <h2 id="yururluk">10. Yürürlük</h2>
                        <p>Ödeme ile sözleşme koşulları kabul edilmiş sayılır.</p>
                    </div>

                    {/* CTA BAR */}
                    <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="text-sm text-slate-500">
                            İade koşullarını merak ediyorsanız{" "}
                            <Link to="/yasal/iade-sozlesmesi" className="text-teal-700 hover:underline">
                                İade Sözleşmesi
                            </Link>{" "}
                            sayfasına göz atın.
                        </div>
                        <Link
                            to="/yasal/gizlilik"
                            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Gizlilik & Kullanım →
                        </Link>
                    </div>
                </article>

                {/* STICKY TOC */}
                <aside className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-white border rounded-2xl p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-slate-900">İçindekiler</h3>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                            <li><a className="hover:text-teal-700" href="#taraflar">1. Taraflar</a></li>
                            <li><a className="hover:text-teal-700" href="#konu">2. Konu</a></li>
                            <li><a className="hover:text-teal-700" href="#bedel-odeme">3. Hizmet Bedeli ve Ödeme</a></li>
                            <li><a className="hover:text-teal-700" href="#ifa">4. Hizmetin İfası</a></li>
                            <li><a className="hover:text-teal-700" href="#cayma-hakki">5. Cayma Hakkı</a></li>
                            <li><a className="hover:text-teal-700" href="#sorumluluk-reddi">6. Sorumluluk Reddi</a></li>
                            <li><a className="hover:text-teal-700" href="#guvenlik-garanti">7. Güvenlik ve Ödeme Garantisi</a></li>
                            <li><a className="hover:text-teal-700" href="#mucbir-sebepler">8. Mücbir Sebepler</a></li>
                            <li><a className="hover:text-teal-700" href="#hukuk-yetki">9. Hukuk ve Yetki</a></li>
                            <li><a className="hover:text-teal-700" href="#yururluk">10. Yürürlük</a></li>
                        </ul>
                    </div>

                    <div className="mt-4 text-xs text-slate-500">© 2025 Avukado Bilgi Teknolojileri A.Ş.</div>
                </aside>
            </section>
        </div>
    );
}
