export default function AltMenu() {
    // başlıklar “dosya isimleri” mantığıyla gelsin dedin; burada isimleri başlık olarak kullanıyoruz
    const menu = [
        "Ceza Hukuku",
        "Boşanma/Aile",
        "Ticaret",
        "Miras",
        "İş Hukuku",
        "İcra-İflas",
        "Gayrimenkul",
        "Bilişim",
        "Tüketici",
        "Vergi",
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 mt-10">
            <h2 className="text-3xl font-bold text-slate-900 text-center">Uzmanlık Alanları</h2>
            <p className="text-slate-600 text-center mt-1">İhtiyacını seç; ilanını 3 dakikada oluştur.</p>

            <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {menu.map((name, i) => (
                    <div key={i} className="rounded-2xl ring-1 ring-slate-200 p-4 bg-white hover:shadow-md transition">
                        <div className="h-24 w-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-50" />
                        <div className="mt-3 font-semibold">{name}</div>
                        <div className="text-slate-500 text-sm">—</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
