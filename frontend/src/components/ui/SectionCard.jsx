import React from "react";
export default function SectionCard({ title, right, children }) {
    return (
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                {right}
            </div>
            <div className="p-5 pt-3">{children}</div>
        </div>
    );
}