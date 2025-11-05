import React from "react";
export const Input = (props) => (
    <input {...props} className={`w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 ${props.className || ""}`} />
);
export const Textarea = (props) => (
    <textarea {...props} className={`w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 ${props.className || ""}`} />
);
export const Select = ({ children, ...rest }) => (
    <select {...rest} className="w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500" >
        {children}
    </select>
);