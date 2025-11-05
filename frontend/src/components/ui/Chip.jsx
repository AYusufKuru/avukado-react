export default function Chip({ children, tone = "emerald" }) {
    const map = {
        emerald: "text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100",
        slate: "text-slate-700 bg-slate-50 ring-1 ring-slate-200",
        amber: "text-amber-800 bg-amber-50 ring-1 ring-amber-100",
        sky: "text-sky-700 bg-sky-50 ring-1 ring-sky-100",
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${map[tone]}`}>
            {children}
        </span>
    );
}
