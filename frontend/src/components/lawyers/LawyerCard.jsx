export default function LawyerCard({ title, area, sub, city, details, fileCount, fee, showPlaceholder }) {
    const safeTitle = (title || "").trim() || "(Başlık girilmedi)";
    const chip = [area, sub].filter(Boolean).join(" / ");
    const fullDetails = details || "Dava detay önizlemesi – müvekkilin paylaştığı açıklama burada özetlenecek.";

    return (
        <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-5 flex flex-col h-full">
            {/* Başlık - Tam genişlik */}
            <h4 className="font-semibold text-neutral-900 break-words mb-2">{safeTitle}</h4>
            
            {/* Chip - Başlığın altında, wrap olabilir */}
            {chip && (
                <div className="mb-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-xs break-words">
                        {chip}
                    </span>
                </div>
            )}

            <div className="mt-1 text-sm text-neutral-600 flex items-center gap-2 flex-wrap">
                <span>{city || "Şehir belirtilmedi"}</span>
                <span>•</span>
                <span>Belge: {fileCount}</span>
            </div>

            {/* Açıklama - Tüm metin gösteriliyor, alt satıra geçiyor */}
            <p className="mt-3 text-sm text-neutral-800 leading-relaxed break-words whitespace-pre-wrap">{fullDetails}</p>

            {/* Ücret Bilgileri - Daha kompakt düzen */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-xs">
                        <span className="text-neutral-500 block mb-0.5">Mahkeme:</span>
                        <span className="font-semibold text-neutral-900 text-sm">{fee?.mahkemeGiderleri || "—"}</span>
                    </div>
                    <div className="text-xs">
                        <span className="text-neutral-500 block mb-0.5">Avukatlık:</span>
                        <span className="font-semibold text-neutral-900 text-sm">{fee?.avukatlikUcreti || "—"}</span>
                    </div>
                </div>

                {/* Butonlar - Daha yatay ve kompakt */}
                <div className="flex flex-wrap gap-2">
                    <button className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-sm transition-colors">
                        İletişime Geç
                    </button>
                    <button className="flex-1 min-w-[140px] px-3 py-2 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-50 text-xs font-medium transition-colors">
                        Teklif Ver
                    </button>
                </div>
            </div>

            {showPlaceholder && (
                <p className="mt-3 text-xs text-neutral-500 italic">
                    * Bu kart, müvekkil ilanı kaydedince avukatlara böyle görünecektir.
                </p>
            )}
        </div>
    );
}
