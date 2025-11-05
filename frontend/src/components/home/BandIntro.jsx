export default function BandIntro() {
    return (
        <section className="relative">
            <div className="container py-12 grid md:grid-cols-2 gap-10 items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-soft">
                    <img src="/images/gavel.jpg" alt="" className="w-full h-72 md:h-96 object-cover" />
                    <div className="absolute -bottom-12 -left-12 w-[60%] h-40 bg-teal-900 rotate-[-10deg]"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <div className="flex items-center gap-2">
                            <img src="/images/logo.svg" className="h-6" />
                            <span className="font-semibold">Avukado — Hukukun En Doğal Hali</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="section-title mb-4">Avukado — Hukukun En Doğal Hali</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Avukado, avukatlar ile müvekkilleri kolayca bir araya getiren, Türkiye’nin en yenilikçi hukuk teknolojisi platformudur.
                        Armut benzeri işleyişiyle, hem kullanıcıya hızlı çözüm sunar hem de avukatlara profesyonel iş fırsatları yaratır.
                    </p>
                </div>
            </div>
        </section>
    );
}
