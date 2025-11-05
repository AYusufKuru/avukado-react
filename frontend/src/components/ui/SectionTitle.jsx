export default function SectionTitle({ title, subtitle, center = false, className = "" }) {
    return (
        <div className={`${center ? "text-center" : ""} ${className}`}>
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
        </div>
    );
}
