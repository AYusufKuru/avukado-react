// src/pages/site/Hakkimizda.jsx
import { Lightbulb, Cpu, Globe2, Target, Rocket, ShieldCheck, RotateCcw, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hakkimizda() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

            {/* Başlık */}
            <section className="text-center">
                <h1 className="text-4xl font-extrabold text-emerald-700">Avukado Hakkında</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    Hukuk ve teknoloji dünyasını bir araya getiren yenilikçi bir girişim.
                    Sarfea ve AGB Yazılım ortaklığında, 2006 yılından bu yana gelen tecrübe ile
                    Türkiye’de hukuk teknolojilerinde bir ilki hedefliyoruz.
                </p>
            </section>

            {/* Kuruluş Amacı */}
            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Kuruluş Amacı</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        "Müvekkillerin ihtiyaçlarına en hızlı şekilde ulaşmasını sağlamak",
                        "Avukatların yeni iş fırsatları elde etmesini desteklemek",
                        "Adalet sisteminde dijitalleşmenin önünü açmak",
                    ].map((item, i) => (
                        <div key={i} className="bg-white shadow-md rounded-2xl p-6 text-center border border-slate-200">
                            <Lightbulb className="mx-auto h-10 w-10 text-emerald-600 mb-3" />
                            <p className="text-slate-600">{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Teknolojik Altyapı */}
            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Teknolojik Altyapı</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { icon: Cpu, text: "Akıllı Eşleştirme: İlan ile en uygun avukat yapay zekâ ile önerilir." },
                        { icon: Cpu, text: "YZ Asistan: Dilekçe, araştırma ve dosya yönetiminde destek olur." },
                        { icon: Cpu, text: "Chatbot: WhatsApp ve web üzerinden 7/24 iletişim." },
                        { icon: Cpu, text: "SEO Liderliği: Organik aramalarda geniş erişim." },
                    ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                            <Icon className="h-8 w-8 text-emerald-600 shrink-0" />
                            <p className="text-slate-600">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vizyon & Misyon */}
            <section className="grid md:grid-cols-2 gap-10">
                <div className="bg-gradient-to-r from-emerald-50 to-white p-8 rounded-2xl border">
                    <Target className="h-10 w-10 text-emerald-700 mb-3" />
                    <h2 className="text-xl font-bold text-emerald-700 mb-2">Vizyon</h2>
                    <ul className="space-y-2 text-slate-600">
                        <li>Türkiye’nin en güvenilir ve yenilikçi LegalTech platformu olmak</li>
                        <li>Avukat ve müvekkillerin işlerini kolaylaştıran çözümleri artırmak</li>
                        <li>YZ teknolojileriyle geleceğin hukuk ekosistemini inşa etmek</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-r from-white to-emerald-50 p-8 rounded-2xl border">
                    <Globe2 className="h-10 w-10 text-emerald-700 mb-3" />
                    <h2 className="text-xl font-bold text-emerald-700 mb-2">Misyon</h2>
                    <ul className="space-y-2 text-slate-600">
                        <li>Adalete erişimi demokratikleştirmek</li>
                        <li>Avukatlara dijital çağın tüm avantajlarını sunmak</li>
                        <li>Güvenli ödeme ve şeffaf süreçlerle güveni güçlendirmek</li>
                    </ul>
                </div>
            </section>

            {/* Gelecek Hedefleri */}
            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Gelecek Hedefleri</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        "Avukado’yu global ölçekte bir hukuk teknolojileri markası yapmak",
                        "YZ desteğini sürekli geliştirerek en akıllı hukuki asistanı kurmak",
                        "Üniversiteler, barolar ve kurumlarla iş birlikleri geliştirmek",
                    ].map((item, i) => (
                        <div key={i} className="bg-white shadow-md rounded-2xl p-6 text-center border border-slate-200">
                            <Rocket className="mx-auto h-10 w-10 text-emerald-600 mb-3" />
                            <p className="text-slate-600">{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ——— YASAL SAYFALAR: Alt alta ——— */}
            <section id="gizlilik" className="space-y-8">
                <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-6">
                    <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800">Gizlilik Politikası</h3>
                        <p className="mt-2 text-slate-600">
                            Kişisel verileriniz KVKK kapsamında güvenli şekilde işlenir ve saklanır.
                            Erişim, düzeltme ve silme haklarınıza saygı duyuyoruz. Çerezler ve
                            veri paylaşımı hakkında tüm detaylar bu metinde açıklanır.
                        </p>
                        <Link
                            to="/yasal/gizlilik"
                            className="inline-flex mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            Detayı Gör
                        </Link>
                    </div>
                </div>

                <div id="iade" className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-6">
                    <RotateCcw className="h-8 w-8 text-emerald-600 shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800">İade Şartları</h3>
                        <p className="mt-2 text-slate-600">
                            Dijital hizmetlerde iade koşulları, cayma hakları ve istisnalar
                            açıkça belirtilir. Ücret iadesi süreçleri ve başvuru adımlarını
                            burada özetliyoruz.
                        </p>
                        <Link
                            to="/yasal/iade-sozlesmesi"
                            className="inline-flex mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            Detayı Gör
                        </Link>
                    </div>
                </div>

                <div id="mesafeli" className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-6">
                    <FileText className="h-8 w-8 text-emerald-600 shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800">Mesafeli Satış Sözleşmesi</h3>
                        <p className="mt-2 text-slate-600">
                            Platform üzerinden sunulan dijital hizmetlerin sözleşme koşulları,
                            tarafların yükümlülükleri, fesih ve cayma hükümleri ayrıntılı
                            şekilde yer alır.
                        </p>
                        <Link
                            to="/yasal/mesafeli-satis"
                            className="inline-flex mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            Detayı Gör
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
