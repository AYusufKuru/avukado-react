import React from "react";
export default function Badge({ children, tone = "gray" }) {
    const map = {
        green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        amber: "bg-amber-50 text-amber-700 ring-amber-200",
        gray: "bg-gray-50 text-gray-700 ring-gray-200",
    };
    return (<span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${map[tone]}`}>{children}</span>);
}