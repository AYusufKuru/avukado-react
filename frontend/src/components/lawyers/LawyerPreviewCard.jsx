// src/components/lawyers/LawyerPreviewCard.jsx
import Chip from "@/components/ui/Chip";

/**
 * Avukat tarafında görünecek örnek kart
 * Görsel referansı: “Avukat Görünümü (Örnek Kart)”
 */
export default function LawyerPreviewCard({
    className = "",
    // üst başlık
    heading = "Avukat Görünümü (Örnek Kart)",
    // rozet/breadcrumb
    breadcrumb = "Aile Hukuku / Boşanma davaları",
    // başlık
    title = "(Başlık girilmedi)",
    // konum ve belge sayısı
    city = "ANKARA",
    docCount = 0,
    // özet
    summary = "Dava detay önizlemesi – müvekkilin paylaştığı açıklama burada özetlenecek.",
    // ücretler
    courtMin = 4500,
    courtMax = 12000,
    feeMin = 30000,
    feeMax = 120000,
    // aksiyonlar
    onContact = () => { },
    onSaveOrBid = () => { },
}) {
    const tl = (n) => new Intl.NumberFormat("tr-TR").format(n);

    return (
        <div className={className}>
            <h3 className="text-slate-900 font-semibold mb-2">{heading}</h3>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 max-w-md">
                {/* Title + breadcrumb */}
                <div className="flex items-start justify-between gap-2">
                    <div className="text-[15px] font-semibold text-slate-800">
                        {title}
                    </div>
                    <Chip tone="emerald">{breadcrumb}</Chip>
                </div>

                {/* meta */}
                <div className="mt-2 text-sm text-slate-500 flex items-center gap-4">
                    <span className="font-medium">{city}</span>
                    <span>Belge: {docCount}</span>
                </div>

                {/* summary */}
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {summary}
                </p>

                {/* ücretler */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-emerald-50/40 border border-emerald-200 p-3">
                        <div className="text-slate-500">Mahkeme:</div>
                        <div className="font-semibold text-emerald-700">
                            ₺{tl(courtMin)}–₺{tl(courtMax)}
                        </div>
                    </div>
                    <div className="rounded-xl bg-emerald-50/40 border border-emerald-200 p-3">
                        <div className="text-slate-500">Avukatlık:</div>
                        <div className="font-semibold text-emerald-700">
                            ₺{tl(feeMin)}–₺{tl(feeMax)}
                        </div>
                    </div>
                </div>

                {/* actions */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                        onClick={onContact}
                        className="rounded-xl bg-emerald-600 text-white px-4 py-2.5 font-semibold hover:bg-emerald-700 transition"
                    >
                        Müvekkille<br />İletişime<br />Geç
                    </button>

                    <button
                        onClick={onSaveOrBid}
                        className="rounded-xl bg-white px-4 py-2.5 font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition"
                    >
                        Kaydet /<br />Teklif<br />Ver
                    </button>
                </div>

                {/* footnote */}
                <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
                    * Bu kart, müvekkil ilanı kaydedince avukatlara böyle görünecektir.
                </p>
            </div>
        </div>
    );
}
