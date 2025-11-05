const items = [
    { icon: "/images/ico-scale.svg", title: "Kolay Ulaşım", text: "Müvekkiller şehir ve uzmanlığa göre uygun avukatı hızla bulur." },
    { icon: "/images/ico-shield.svg", title: "Güvenli Sistem", text: "Avukat profilleri baro no ve referansla doğrulanır." },
    { icon: "/images/ico-laptop.svg", title: "Online Danışmanlık", text: "Tek tıkla ücretli/ücretsiz danışma ve randevu." },
    { icon: "/images/ico-bill.svg", title: "Kolay Ödeme", text: "Güvenli ödeme ve teklif yönetimi, makbuz/fatura." }
];

export default function Advantages() {
    return (
        <section className="container -mt-10 mb-12">
            <div className="grid md:grid-cols-4 gap-4">
                {items.map((it, i) => (
                    <div key={i} className="rounded-2xl bg-mango-500 text-white p-6 shadow-soft">
                        <img src={it.icon} alt="" className="h-8 mb-4 opacity-95" />
                        <div className="font-semibold mb-2">{it.title}</div>
                        <p className="text-white/90 text-sm leading-snug">{it.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
