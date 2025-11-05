// src/components/Layout/Navbar.jsx
import { useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const cx = (...a) => a.filter(Boolean).join(" ");

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const nav = useNavigate();
    const { pathname } = useLocation();

    const token = useMemo(() => localStorage.getItem("avukado_token"), [pathname]);
    const authed = Boolean(token);
    const ilanAcPath = authed ? "/ilan/ac" : "/giris";

    const logout = () => {
        localStorage.removeItem("avukado_token");
        localStorage.removeItem("avukado_user");
        localStorage.removeItem("avukado_role");
        setOpen(false);
        nav("/giris");
    };

    const TopLinks = ({ onClick }) => (
        <div className="flex items-center gap-1 md:gap-2 text-sm">
            <NavLink
                to="/"
                onClick={onClick}
                className={({ isActive }) =>
                    cx(
                        "px-3 py-2 rounded-lg font-medium hover:bg-slate-100 transition",
                        isActive && "text-teal-700 bg-teal-50 ring-1 ring-inset ring-teal-200 hover:bg-teal-50"
                    )
                }
            >
                Ana sayfa
            </NavLink>
            <NavLink
                to="/hakkimizda"
                onClick={onClick}
                className={({ isActive }) =>
                    cx(
                        "px-3 py-2 rounded-lg font-medium hover:bg-slate-100 transition",
                        isActive && "text-teal-700 bg-teal-50 ring-1 ring-inset ring-teal-200 hover:bg-teal-50"
                    )
                }
            >
                Hakkımızda
            </NavLink>
            <NavLink
                to="/ilanlar"
                onClick={onClick}
                className={({ isActive }) =>
                    cx(
                        "px-3 py-2 rounded-lg font-medium hover:bg-slate-100 transition",
                        isActive && "text-teal-700 bg-teal-50 ring-1 ring-inset ring-teal-200 hover:bg-teal-50"
                    )
                }
            >
                İlanlar
            </NavLink>

            {authed && (
                <NavLink
                    to="/panel/avukat"
                    onClick={onClick}
                    className={({ isActive }) =>
                        cx(
                            "px-3 py-2 rounded-lg font-medium hover:bg-slate-100 transition",
                            isActive && "text-teal-700 bg-teal-50 ring-1 ring-inset ring-teal-200 hover:bg-teal-50"
                        )
                    }
                >
                    Avukat Paneli
                </NavLink>
            )}
        </div>
    );

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-slate-200">
            <div className="h-1 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600" />

            <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/img/logo.png" alt="Avukado" className="h-8 w-8" />
                    <div className="leading-tight text-left">
                        <div className="text-lg font-extrabold tracking-tight">AVUKADO</div>
                        <div className="text-[11px] text-emerald-700 -mt-0.5">Hukukun En Doğal Hali</div>
                    </div>
                </Link>

                {/* Orta linkler (desktop) */}
                <div className="hidden md:flex ml-2">
                    <TopLinks />
                </div>

                {/* Sağ aksiyonlar */}
                <div className="ml-auto hidden sm:flex items-center gap-2">
                    {!authed ? (
                        <>
                            <Link
                                to="/giris"
                                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50"
                            >
                                Avukat Girişi
                            </Link>
                            <Link
                                to={ilanAcPath}
                                className="px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800"
                            >
                                İlan Aç (Ücretsiz)
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/panel/avukat"
                                className="px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800"
                            >
                                Avukat Paneli
                            </Link>
                            <button
                                onClick={logout}
                                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50"
                            >
                                Çıkış
                            </button>
                        </>
                    )}
                </div>

                {/* Hamburger (mobile) */}
                <button
                    className="md:hidden inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-slate-300 ml-auto"
                    onClick={() => setOpen((s) => !s)}
                    aria-label="Menüyü Aç/Kapat"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </nav>

            {/* Mobile drawer */}
            {open && (
                <div className="md:hidden border-t border-slate-200 bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
                        <TopLinks onClick={() => setOpen(false)} />
                        <div className="h-px bg-slate-200 my-2" />
                        {!authed ? (
                            <>
                                <Link
                                    to="/giris"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50"
                                >
                                    Avukat Girişi
                                </Link>
                                <Link
                                    to={ilanAcPath}
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800"
                                >
                                    İlan Aç (Ücretsiz)
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/panel/avukat"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800"
                                >
                                    Avukat Paneli
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50"
                                >
                                    Çıkış
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
