export default function LawyerCard({ title, area, sub, city, details, fileCount, fee, showPlaceholder }) {
    const safeTitle = (title || "").trim() || "(Başlık girilmedi)";
    const chip = [area, sub].filter(Boolean).join(" / ");
    const excerpt =
        (details || "Dava detay önizlemesi – müvekkilin paylaştığı açıklama burada özetlenecek.").slice(0, 200) +
        ((details && details.length > 200) ? "…" : "");

    return (
        <div className="bg-white rounded-2xl shadow-md border border-neutral-200 p-5">
            <div className="flex items-start justify-between">
                <div className="pr-2">
                    <h4 className="font-semibold text-neutral-900 leading-snug">{safeTitle}</h4>
                    <div className="mt-1 text-xs text-neutral-600 flex items-center gap-2">
                        <span className="uppercase tracking-wide">{city?.toUpperCase() || "ŞEHİR"}</span>
                        <span>•</span>
                        <span>Belge: {fileCount}</span>
                    </div>
                </div>
                {chip && (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-xs">
                        {chip}
                    </span>
                )}
            </div>

            <p className="mt-3 text-sm text-neutral-800 leading-6">{excerpt}</p>

            <div className="mt-4 grid grid-cols-[1fr_auto_auto] items-center gap-3">
                <div className="text-sm text-neutral-700">
                    <div><span className="text-neutral-500">Mahkeme:</span> <span className="font-medium">{fee?.mahkemeGiderleri || "—"}</span></div>
                    <div><span className="text-neutral-500">Avukatlık:</span> <span className="font-medium">{fee?.avukatlikUcreti || "—"}</span></div>
                </div>

                <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm shadow">
                    Müvekkille İletişime Geç
                </button>
                <button className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-sm">
                    Kaydet / Teklif Ver
                </button>
            </div>

            {showPlaceholder && (
                <p className="mt-3 text-xs text-neutral-500">
                    * Bu kart, müvekkil ilanı kaydedince avukatlara böyle görünecektir.
                </p>
            )}
        </div>
    );
}
