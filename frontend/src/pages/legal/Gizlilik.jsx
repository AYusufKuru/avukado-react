// src/pages/legal/Gizlilik.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Gizlilik() {
    useEffect(() => {
        document.title = "Gizlilik, Kullanım ve Ödeme Sözleşmesi | Avukado";
    }, []);

    const updatedAt = "25 Ağustos 2025";

    return (
        <div className="min-h-[70vh]">
            {/* HERO */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-white" />
                <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-14">
                    {/* breadcrumb */}
                    <nav className="text-sm text-slate-500 mb-4">
                        <Link to="/" className="hover:text-teal-700">Ana Sayfa</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-700 font-medium">Gizlilik &amp; Kullanım</span>
                    </nav>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900">
                        Gizlilik, Kullanım ve Ödeme Sözleşmesi
                    </h1>
                    <p className="mt-3 text-slate-600 max-w-3xl">
                        Avukado’yu güvenle kullanabilmeniz için kişisel verilerinizi nasıl işlediğimizi,
                        tarafların yükümlülüklerini ve ödeme esaslarını açıkça paylaşıyoruz.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-2 text-xs md:text-sm text-slate-600 bg-white/70 border rounded-full px-3 py-1">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                            Son güncelleme: {updatedAt}
                        </div>
                        <button
                            onClick={() => window.print()}
                            className="text-xs md:text-sm px-3 py-1 rounded-full bg-slate-900 text-white hover:bg-slate-800"
                        >
                            Yazdır / PDF
                        </button>
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <section className="max-w-5xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                {/* MAKALE */}
                <article className="bg-white border rounded-2xl p-6 md:p-10 shadow-sm">
                    <div className="prose prose-slate max-w-none">
                        <h2 id="taraflar" className="scroll-mt-28">1. Taraflar</h2>
                        <p>
                            “Avukado” platformunu işleten şirket (<strong>“Platform”</strong>) ile siteye üye olan
                            avukatlar ve müvekkiller (<strong>“Kullanıcı”</strong>).
                        </p>

                        <h2 id="tanimlar" className="scroll-mt-28">2. Tanımlar</h2>
                        <ul>
                            <li><strong>Avukat:</strong> Baro kaydı mevcut ve sisteme kayıt olan kullanıcı.</li>
                            <li><strong>Müvekkil:</strong> İlan açan kullanıcı.</li>
                            <li><strong>Platform:</strong> Avukado markası altında faaliyet gösteren sistem.</li>
                        </ul>

                        <h2 id="gizlilik" className="scroll-mt-28">3. Gizlilik ve Veri Koruma</h2>
                        <ul className="leading-relaxed">
                            <li>KVKK (6698) kapsamında kişisel verileriniz hukuka uygun şekilde işlenir ve korunur.</li>
                            <li>Yüklenen evraklar şifreli ortamda saklanır; yalnızca yetkili taraflar erişebilir.</li>
                            <li>Hesap, oturum ve işlem güvenliği için teknik/idari tedbirler düzenli olarak gözden geçirilir.</li>
                        </ul>

                        <div className="not-prose mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-900">
                            <strong>Bilgi:</strong> Kişisel verilerinizle ilgili başvuru ve taleplerinizi
                            <a href="mailto:kvkk@avukado.com" className="font-semibold text-emerald-700 hover:underline"> kvkk@avukado.com</a>
                            &nbsp;adresine iletebilirsiniz.
                        </div>

                        <h2 id="rol" className="scroll-mt-28">4. Platformun Rolü</h2>
                        <p>
                            Platform, <em>aracı hizmet sağlayıcı</em>dır; avukat ile müvekkil arasındaki hizmet
                            ifası ve bedelden doğan sorumluluk esasen taraflara aittir.
                        </p>

                        <h2 id="avukat-yukumluluk" className="scroll-mt-28">5. Avukatın Yükümlülükleri</h2>
                        <ul>
                            <li>Baro kaydını doğru ve güncel beyan etmek; mevzuata ve meslek kurallarına uygun davranmak,</li>
                            <li>
                                Platform dışında müvekkille yönlendirilmiş anlaşma yapmamak
                                <span className="text-slate-500"> (ihlalde hesap askıya alınabilir/kapatılabilir)</span>.
                            </li>
                        </ul>

                        <h2 id="muvekkil-yukumluluk" className="scroll-mt-28">6. Müvekkilin Yükümlülükleri</h2>
                        <p>
                            İlanlarda doğru ve güncel bilgi vermek; yasa dışı içeriklerden ve üçüncü kişilerin hak ihlallerinden
                            bizzat sorumludur.
                        </p>

                        <h2 id="ucret" className="scroll-mt-28">7. Ücretlendirme ve Ödeme</h2>
                        <ul>
                            <li>Avukatlar ilan detaylarına erişim için ödeme yapabilir.</li>
                            <li>Yapılan ödemeler iade edilmez; ilgili hizmet kapsamında kullanılır.</li>
                            <li>Müvekkilin platform üzerinden gerçekleştirdiği ödemelerde <strong>Avukado Güvencesi</strong> geçerlidir.</li>
                        </ul>

                        <h2 id="guvenlik" className="scroll-mt-28">8. Güvenlik ve Garanti</h2>
                        <ul>
                            <li>Platform içi ödemeler ve mesajlaşmalar kayıt altındadır.</li>
                            <li>Platform dışındaki iletişim/ödemelerden platform sorumlu değildir.</li>
                        </ul>

                        <h2 id="gizlilik-yukumlulugu" className="scroll-mt-28">9. Gizlilik Yükümlülüğü</h2>
                        <p>
                            Avukatlık Kanunu ve meslek kuralları uyarınca gizlilik esastır; mesleki sırların korunması
                            avukatın sorumluluğundadır.
                        </p>

                        <h2 id="hesap" className="scroll-mt-28">10. Hesap Güvenliği</h2>
                        <p>
                            Hesabın yetkisiz kullanımını önlemek için güçlü parola, iki aşamalı doğrulama ve cihaz güvenliği önerilir.
                            Hesaptaki işlemlerden kullanıcı sorumludur.
                        </p>

                        <h2 id="fesih" className="scroll-mt-28">11. Fesih</h2>
                        <p>
                            Yanlış/yanıltıcı bilgi, yasa dışı ilan veya sistem dışı anlaşma tespitinde hesap
                            geçici olarak askıya alınabilir veya kalıcı olarak kapatılabilir.
                        </p>

                        <h2 id="hukuk-yetki" className="scroll-mt-28">12. Uygulanacak Hukuk ve Yetki</h2>
                        <p>Türk Hukuku uygulanır; İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir.</p>

                        <h2 id="yururluk" className="scroll-mt-28">13. Yürürlük</h2>
                        <p>Kullanıcılar, üye olarak bu sözleşmeyi okumuş ve kabul etmiş sayılır.</p>
                    </div>

                    {/* alt CTA bar */}
                    <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="text-sm text-slate-500">
                            Sorularınız mı var?{" "}
                            <Link to="/hakkimizda" className="text-teal-700 hover:underline">Hakkımızda</Link>{" "}
                            sayfasını ziyaret edin veya{" "}
                            <a href="mailto:destek@avukado.com" className="text-teal-700 hover:underline">
                                destek@avukado.com
                            </a>{" "}
                            adresine yazın.
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to="/yasal/mesafeli-satis"
                                className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Mesafeli Satış Sözleşmesi →
                            </Link>
                            <Link
                                to="/yasal/iade-sozlesmesi"
                                className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                İade Şartları →
                            </Link>
                        </div>
                    </div>
                </article>

                {/* STICKY TOC */}
                <aside className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-white border rounded-2xl p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-slate-900">İçindekiler</h3>
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                            <li><a className="hover:text-teal-700" href="#taraflar">1. Taraflar</a></li>
                            <li><a className="hover:text-teal-700" href="#tanimlar">2. Tanımlar</a></li>
                            <li><a className="hover:text-teal-700" href="#gizlilik">3. Gizlilik ve Veri Koruma</a></li>
                            <li><a className="hover:text-teal-700" href="#rol">4. Platformun Rolü</a></li>
                            <li><a className="hover:text-teal-700" href="#avukat-yukumluluk">5. Avukatın Yükümlülükleri</a></li>
                            <li><a className="hover:text-teal-700" href="#muvekkil-yukumluluk">6. Müvekkilin Yükümlülükleri</a></li>
                            <li><a className="hover:text-teal-700" href="#ucret">7. Ücretlendirme ve Ödeme</a></li>
                            <li><a className="hover:text-teal-700" href="#guvenlik">8. Güvenlik ve Garanti</a></li>
                            <li><a className="hover:text-teal-700" href="#gizlilik-yukumlulugu">9. Gizlilik Yükümlülüğü</a></li>
                            <li><a className="hover:text-teal-700" href="#hesap">10. Hesap Güvenliği</a></li>
                            <li><a className="hover:text-teal-700" href="#fesih">11. Fesih</a></li>
                            <li><a className="hover:text-teal-700" href="#hukuk-yetki">12. Hukuk ve Yetki</a></li>
                            <li><a className="hover:text-teal-700" href="#yururluk">13. Yürürlük</a></li>
                        </ul>
                    </div>

                    <div className="mt-4 text-xs text-slate-500">© 2025 Avukado Bilgi Teknolojileri A.Ş.</div>
                </aside>
            </section>
        </div>
    );
}
