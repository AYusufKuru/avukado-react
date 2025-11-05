import React from "react";
import { Star } from "lucide-react";
export default function Rating({ value }) {
    const full = Math.round(value || 0);
    return (
        <div className="flex items-center gap-1" title={`${value?.toFixed?.(1) ?? value}/5`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < full ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
            <span className="ml-1 text-xs text-gray-600">{Number(value || 0).toFixed(1)}</span>
        </div>
    );
}