// src/pages/legal/IadeSozlesmesi.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function IadeSozlesmesi() {
    useEffect(() => {
        document.title = "İade Sözleşmesi | Avukado";
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
                        <span className="text-slate-700 font-medium">İade Sözleşmesi</span>
                    </nav>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900">
                        Avukado İade Sözleşmesi
                    </h1>
                    <p className="mt-3 text-slate-600 max-w-3xl">
                        Dijital hizmetlerin iade koşullarını şeffaf biçimde paylaşıyoruz.
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
                        <p>
                            Platform ile platform üzerinden hizmet satın alan kullanıcı (<strong>“Kullanıcı”</strong>) arasında.
                        </p>

                        <h2 id="konu">2. Konu</h2>
                        <p>
                            İlan görüntüleme, teklif kredisi, danışmanlık erişimi vb. dijital hizmetlerin iade koşulları.
                        </p>

                        <h2 id="hizmet-niteligi">3. Hizmetin Niteliği</h2>
                        <ul>
                            <li>Hizmetler dijital içerik ve <em>anında ifa</em> kapsamında değerlendirilir.</li>
                            <li>Satın alma tamamlandığında hizmet anında aktif olur.</li>
                        </ul>

                        <h2 id="cayma-hakki">4. Cayma Hakkı</h2>
                        <ul>
                            <li>6502 sayılı Kanun gereği anında ifa edilen dijital hizmetlerde cayma hakkı yoktur.</li>
                            <li>Ödeme onayı ile bu durum kabul edilmiş sayılır.</li>
                        </ul>

                        <h2 id="iade-kosullari">5. İade Koşulları</h2>
                        <ul>
                            <li>Kullanılmış veya kullanımı başlamış hizmetler için iade yapılmaz.</li>
                            <li>Hizmet hiç aktif olmamışsa ve teknik hatadan kaynaklıysa talep incelenir.</li>
                            <li>İade yalnız teknik arıza veya hizmetin hiç sunulamaması halinde yapılır.</li>
                        </ul>

                        <h2 id="odeme-guvencesi">6. Ödeme Güvencesi</h2>
                        <ul>
                            <li>Platform içi ödemeler kayıt altındadır.</li>
                            <li>Avukatla platform dışı ödemelerden platform sorumlu değildir.</li>
                        </ul>

                        <h2 id="avukat-yukumlulugu">7. Avukatın Yükümlülüğü</h2>
                        <p>
                            Sistem dışında anlaşma yapılamaz; tespit halinde hesap askıya alınır veya kapatılır.
                        </p>

                        <h2 id="iade-sureci">8. İade Süreci</h2>
                        <p>
                            Yazılı başvuru üzerine uygun görülürse iade, aynı yöntemle en geç 14 iş gününde yapılır.
                        </p>

                        <h2 id="hukuk-yetki">9. Hukuk ve Yetki</h2>
                        <p>Türk Hukuku uygulanır; İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir.</p>

                        <h2 id="yururluk">10. Yürürlük</h2>
                        <p>Ödeme ile bu iade sözleşmesi okunmuş ve kabul edilmiştir.</p>
                    </div>

                    {/* CTA BAR */}
                    <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="text-sm text-slate-500">
                            Daha fazla bilgi için{" "}
                            <Link to="/yasal/gizlilik" className="text-teal-700 hover:underline">
                                Gizlilik & Kullanım
                            </Link>{" "}
                            sayfasını ziyaret edebilirsiniz.
                        </div>
                        <Link
                            to="/yasal/mesafeli-satis"
                            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Mesafeli Satış Sözleşmesi →
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
                            <li><a className="hover:text-teal-700" href="#hizmet-niteligi">3. Hizmetin Niteliği</a></li>
                            <li><a className="hover:text-teal-700" href="#cayma-hakki">4. Cayma Hakkı</a></li>
                            <li><a className="hover:text-teal-700" href="#iade-kosullari">5. İade Koşulları</a></li>
                            <li><a className="hover:text-teal-700" href="#odeme-guvencesi">6. Ödeme Güvencesi</a></li>
                            <li><a className="hover:text-teal-700" href="#avukat-yukumlulugu">7. Avukatın Yükümlülüğü</a></li>
                            <li><a className="hover:text-teal-700" href="#iade-sureci">8. İade Süreci</a></li>
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
