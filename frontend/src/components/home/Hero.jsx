export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0">
                <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div>
            </div>

            <div className="relative container py-16 md:py-24">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/images/logo.svg" alt="Avukado" className="h-12" />
                        <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight">AVUKADO</h1>
                    </div>
                    <p className="text-xl md:text-2xl font-semibold text-ink/90">
                        “Hak Aramanın En Doğal Yolu”
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                        Hukukun En Doğal Hali veya Adaletin Meyvesi
                    </p>

                    <a
                        href="/avukatlar"
                        className="mt-8 inline-flex rounded-full bg-mango-500 px-6 py-3 text-white font-semibold shadow-soft hover:bg-mango-400 transition"
                    >
                        avukado.com.tr
                    </a>
                </div>
            </div>
        </section>
    );
}
