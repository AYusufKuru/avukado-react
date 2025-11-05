// src/pages/Home.jsx
import { useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Chip from "../components/ui/Chip";
import SectionTitle from "../components/ui/SectionTitle";
import Blurry from "../components/ui/Blurry";

export default function Home() {
    const { pathname, hash } = useLocation();

    // giriş kontrolü → ilan aç butonunun hedefi
    const token = useMemo(() => localStorage.getItem("avukado_token"), [pathname]);
    const ilanAcPath = token ? "/ilan/ac" : "/giris";

    // navbar #hash ile smooth scroll
    useEffect(() => {
        if (!hash) return;
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [hash]);

    return (
        <div className="pb-20">
            {/* HERO */}
            <section className="max-w-7xl mx-auto px-4 mt-6">
                <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 items-start">
                    {/* Sol metin */}
                    <div>
                        <p className="text-[11px] font-semibold tracking-widest text-emerald-700">
                            BİLGİLENDİRME • EŞLEŞTİRME • GÜVEN
                        </p>
                        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                            Müvekkil ile avukatı <span className="text-emerald-700">reklamsız</span> ve{" "}
                            <span className="text-emerald-700">şeffaf</span> şekilde buluşturuyoruz.
                        </h1>

                        <p className="mt-3 text-slate-600 max-w-xl">
                            Müvekkiller dava türünü seçip ilan açar, belgelerini yükler. Avukatlar
                            <b> premium</b> ile detayını görür, <b>teklif</b> verir. Tüm süreç KVKK ve reklam
                            yasağına uyumludur.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <Link
                                to={ilanAcPath}
                                className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                İlan Aç
                            </Link>
                            <Link
                                to="/giris"
                                className="px-5 py-3 rounded-xl bg-white ring-1 ring-slate-200 hover:bg-slate-50"
                            >
                                Avukat Olarak Katıl
                            </Link>
                        </div>

                        {/* küçük etiketler */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Chip>Baro no doğrulaması</Chip>
                            <Chip tone="slate">KVKK & güvenli depolama</Chip>
                            <Chip tone="amber">Güvenli ödeme (escrow)</Chip>
                        </div>
                    </div>

                    {/* Sağ blok – görsel (adalet) */}
                    <div className="space-y-4">
                        <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-3">
                            <img
                                src="/img/hero/adalet.png"
                                alt="Adalet – Themis illüstrasyonu"
                                loading="lazy"
                                className="w-full h-[260px] md:h-[300px]  object-center select-none pointer-events-none"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="rounded-xl p-4 ring-1 ring-slate-200 bg-white">
                                <Chip tone="emerald">MÜVEKKİL</Chip>
                                <div className="mt-2 font-semibold">Ücretsiz ilan • 3 dk</div>
                                <div className="text-xs text-slate-500 mt-1">
                                    Dava türü, şehir, açıklama, belgeler.
                                </div>
                            </div>
                            <div className="rounded-xl p-4 ring-1 ring-slate-200 bg-white">
                                <Chip tone="sky">AVUKAT</Chip>
                                <div className="mt-2 font-semibold">Premium ile detay</div>
                                <div className="text-xs text-slate-500 mt-1">
                                    İlan başına ücrete detay & teklif.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SİTENİN AMACI */}
            <section
                id="amacimiz"
                className="max-w-7xl mx-auto px-4 mt-12 grid md:grid-cols-[1.15fr_1fr] gap-6 items-start"
            >
                <div>
                    <SectionTitle
                        title="Sitenin Amacı"
                        subtitle="Avukado, Türkiye’deki reklam yasağına uyumlu kalarak kullanıcıyı bilgilendirmeyi ve doğru eşleştirmeyi kolaylaştırır."
                    />
                    <p className="text-slate-600 mt-3">
                        Müvekkil ihtiyacını anonim planlayan ilanı paylaşır; avukatlar açık ilanlar için teklif verir.
                        Sonuç: hızlı, güvenli, şeffaf süreç.
                    </p>

                    <div className="mt-5 grid sm:grid-cols-3 gap-3">
                        <div className="rounded-xl p-4 ring-1 ring-slate-200 bg-white">
                            <Chip>Şeffaf Süreç</Chip>
                            <p className="text-sm text-slate-600 mt-2">
                                Teklifler anonim, süreçler kayıtlı ve kıyaslanabilir.
                            </p>
                        </div>
                        <div className="rounded-xl p-4 ring-1 ring-slate-200 bg-white">
                            <Chip tone="slate">Veri Güvenliği</Chip>
                            <p className="text-sm text-slate-600 mt-2">
                                KVKK uyumlu depolama; ödeme planı ve escrow.
                            </p>
                        </div>
                        <div className="rounded-xl p-4 ring-1 ring-slate-200 bg-white">
                            <Chip tone="amber">Organik Erişim</Chip>
                            <p className="text-sm text-slate-600 mt-2">
                                Reklamsız, rehber nitelikli görünürlük.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SAĞ SÜTUN – görseller */}
                <div className="space-y-4">
                    <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-3">
                        <img
                            src="/img/amac/amac-1.png"
                            alt="Avukat–müvekkil ve adalet simgesi"
                            loading="lazy"
                            className="w-full h-[240px] md:h-[260px]  object-center select-none pointer-events-none"
                        />
                    </div>
                    <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-3">
                        <img
                            src="/img/amac/amac-2.png"
                            alt="AI asistan ile etkileşim"
                            loading="lazy"
                            className="w-full h-[180px] md:h-[200px] object-center select-none pointer-events-none"
                        />
                    </div>
                </div>
            </section>

            {/* ÖNE ÇIKAN ÖZELLİKLER */}
            <section id="ozellikler" className="max-w-7xl mx-auto px-4 mt-12">
                <SectionTitle
                    title="Öne Çıkan Özellikler"
                    subtitle="Güven, hız ve mevzuata uyum bir arada."
                    center
                />
                <div className="mt-6 grid md:grid-cols-3 gap-5">
                    {/* Güvenli Ödeme (Escrow) */}
                    <div className="rounded-2xl p-5 ring-1 ring-slate-200 bg-white">
                        <Chip tone="amber">Güvenli Ödeme (Escrow)</Chip>
                        <img
                            src="/img/ozellikler/guvenli-odeme.png"
                            alt="Güvenli Ödeme (Escrow)"
                            loading="lazy"
                            className=" w-full h-[140px] object-contain object-center select-none pointer-events-none"
                        />
                    </div>
                    {/* Baro Doğrulama */}
                    <div className="rounded-2xl p-5 ring-1 ring-slate-200 bg-white">
                        <Chip tone="slate">Baro Doğrulama</Chip>
                        <img
                            src="/img/ozellikler/baro-dogrulama.png"
                            alt="Baro Doğrulama"
                            loading="lazy"
                            className="w-full h-[140px] object-contain object-center select-none pointer-events-none"
                        />
                    </div>
                    {/* AI Yardımcısı */}
                    <div className="rounded-2xl p-5 ring-1 ring-slate-200 bg-white">
                        <Chip tone="sky">AI Yardımcısı</Chip>
                        <img
                            src="/img/ozellikler/ai.png"
                            alt="AI Yardımcısı"
                            loading="lazy"
                            className="w-full h-[140px] object-contain object-center select-none pointer-events-none"
                        />
                    </div>
                </div>
            </section>

            {/* UZMANLIK ALANLARI */}
            <section id="uzmanliklar" className="max-w-7xl mx-auto px-4 mt-12">
                <SectionTitle
                    title="Uzmanlık Alanları"
                    subtitle="İhtiyacını seç, ilanını 3 dakikada oluştur."
                    center
                />
                <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Ceza Hukuku (ikon yoksa placeholder) */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/ceza hukuku.png" alt="Boşanma/Aile" className="w-full object-contain" />
                        <div className="mt-3 font-semibold">Ceza Hukuku</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* Boşanma / Aile */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/aile.png" alt="Boşanma/Aile" className="w-full object-contain" />
                        <div className="mt-3 font-semibold">Boşanma/Aile</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* Ticaret */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/ticaret.png" alt="Ticaret" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">Ticaret</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* Miras */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/miras.png" alt="Miras" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">Miras</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* İş Hukuku */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/is-hukuku.png" alt="İş Hukuku" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">İş Hukuku</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* İcra-İflas */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/icra-iflas.png" alt="İcra-İflas" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">İcra-İflas</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* Gayrimenkul */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/gayrimenkul.png" alt="Gayrimenkul" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">Gayrimenkul</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* Bilişim */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/bilisim.png" alt="Bilişim" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">Bilişim</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* Tüketici */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/tuketici.png" alt="Tüketici" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">Tüketici</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>

                    {/* Vergi */}
                    <div className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <img src="/img/uzmanliklar/vergi.png" alt="Vergi" className="w-full h-[90px] object-contain" />
                        <div className="mt-3 font-semibold">Vergi</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>
                </div>
            </section>

            {/* ÜCRET + UYUM */}
            <section id="ucretlendirme" className="max-w-7xl mx-auto px-4 mt-12">
                <h3 className="text-2xl font-bold text-center">Ücretlendirme</h3>
                <p className="text-slate-600 text-center mt-1">
                    Müvekkil için ücretsiz. Avukatlar için ilan başına premium erişim.
                </p>
                <div className="mt-6 grid md:grid-cols-3 gap-5">
                    <div className="rounded-2xl p-6 ring-1 ring-slate-200 bg-white">
                        <Chip tone="emerald">MÜVEKKİL</Chip>
                        <div className="mt-2 text-2xl font-bold">Ücretsiz</div>
                        <ul className="mt-3 text-slate-700 space-y-2">
                            <li>☑ İlan açma & belge yükleme</li>
                            <li>☑ Teklifleri anonim karşılaştırma</li>
                            <li>☑ Escrow ile güvenli ödeme</li>
                        </ul>
                        <Link
                            to={ilanAcPath}
                            className="mt-5 inline-flex px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            Hemen İlan Aç
                        </Link>
                    </div>

                    <div className="rounded-2xl p-6 ring-1 ring-slate-200 bg-white">
                        <Chip tone="sky">AVUKAT • STANDART</Chip>
                        <div className="mt-2 text-2xl font-bold">₺300 / ilan açma</div>
                        <ul className="mt-3 text-slate-700 space-y-2">
                            <li>☑ Detay görüntüleme</li>
                            <li>☑ Teklif gönderme</li>
                            <li>☑ Mesaj & belge paylaşımı</li>
                        </ul>
                        <Link
                            to="/giris"
                            className="mt-5 inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
                        >
                            Giriş Yap
                        </Link>
                    </div>

                    <div className="rounded-2xl p-6 ring-1 ring-slate-200 bg-white">
                        <Chip tone="amber">AVUKAT • PREMİUM</Chip>
                        <div className="mt-2 text-2xl font-bold">₺600 / ilan açma</div>
                        <ul className="mt-3 text-slate-700 space-y-2">
                            <li>☑ Öncelikli sıralama</li>
                            <li>☑ Hızlı teklif şablonları</li>
                            <li>☑ AI asistan (beta)</li>
                        </ul>
                        <Link
                            to="/giris"
                            className="mt-5 inline-flex px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700"
                        >
                            Premium’a Geç
                        </Link>
                    </div>
                </div>

                {/* uyum bandı */}
                <div id="uyum" className="mt-8 rounded-2xl p-5 ring-1 ring-slate-200 bg-white">
                    <div className="flex flex-wrap items-center gap-2">
                        <img src="/img/logo.png" className="w-7 h-7" alt="" />
                        <div className="font-semibold">Reklam Yasağına Uyum</div>
                        <div className="flex flex-wrap gap-2 ml-auto">
                            <Chip tone="slate">Bilgilendirme Metni</Chip>
                            <Chip tone="slate">Baro No Doğrulama</Chip>
                            <Chip tone="amber">KVKK Aydınlatma</Chip>
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm mt-2">
                        Platform, Avukatlık Kanunu m.55 ve TBB Reklam Yasağı Yönetmeliği’ne uyumlu şekilde
                        bilgilendirme ve eşleştirme esasına göre çalışır. “En iyi” vb. iddialı ifadeler kullanılmaz.
                    </p>
                </div>
            </section>

            {/* Alt iki büyük kart (CTA) */}
            <section className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-2 gap-6">
                {/* Sol kart — İlan Aç */}
                <div className="rounded-2xl ring-1 ring-slate-200 p-6 bg-white">
                    <Chip tone="emerald">MÜVEKKİL</Chip>
                    <h4 className="mt-2 text-xl font-bold">İlan Aç • 3 Dakika</h4>
                    <p className="text-slate-600 mt-1">
                        Dava türünü seç, açıklama yaz, belgelerini ekle. Teklifler otomatik gelsin.
                    </p>
                    <div className="mt-4 rounded-xl ring-1 ring-slate-100 bg-slate-50">
                        <img
                            src="/img/cta/ilan-ac.png"
                            alt="İlan Aç • 3 Dakika"
                            loading="lazy"
                            className="w-full h-[220px] md:h-[240px] object-contain object-center select-none pointer-events-none"
                        />
                    </div>
                    <Link
                        to={ilanAcPath}
                        className="mt-4 inline-flex px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                        İlan Aç
                    </Link>
                </div>

                {/* Sağ kart — Açık İlanlara Eriş / Premium */}
                <div className="rounded-2xl ring-1 ring-slate-200 p-6 bg-white">
                    <Chip tone="sky">AVUKAT</Chip>
                    <h4 className="mt-2 text-xl font-bold">Açık İlanlara Eriş • Premium</h4>
                    <p className="text-slate-600 mt-1">
                        Baro no ile doğrula, uygun ilanları filtrele, detay için ilanı açıp teklif ver.
                    </p>
                    <div className="mt-4 rounded-xl ring-1 ring-slate-100 bg-slate-50">
                        <img
                            src="/img/cta/acik-ilanlar.png"
                            alt="Açık İlanlara Eriş • Premium"
                            loading="lazy"
                            className="w-full h-[220px] md:h-[240px] object-contain object-center select-none pointer-events-none"
                        />
                    </div>
                    <div className="mt-4 flex gap-2">
                        <Link to="/giris" className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
                            Giriş Yap
                        </Link>
                        <Link to="/giris" className="px-4 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700">
                            Premium’a Geç
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
