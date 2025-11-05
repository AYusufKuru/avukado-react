import React from "react";
import {
    Handshake,
    Gavel,
    Scale,
    Baby,
    Check,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Boşanma Davaları – özet/türler/maliyet + sağ altta iki CTA kutusu
 * Kullanım:
 *   <DivorceSummary onClientStartTo="/ilan/ac?kategori=Boşanma" onLawyerLoginTo="/giris" />
 */
export default function DivorceSummary({
    onClientStartTo = "/ilan/ac?kategori=Boşanma",
    onLawyerLoginTo = "/giris",
}) {
    return (
        <section className="py-12">
            <div className="mx-auto max-w-7xl px-4">
                {/* Üst başlık bloğu */}
                <header className="rounded-2xl bg-[#0b1f3d] px-6 py-10 text-white">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight">
                        BOŞANMA DAVALARI
                    </h1>
                    <p className="mx-auto mt-4 max-w-3xl text-center text-white/80">
                        Boşanma süreci, eşlerin mahkemede evliliklerini hukuken sona
                        erdirmek için başvuruda bulunmaları ile başlar. Anlaşmalı ve
                        çekişmeli boşanma olmak üzere iki tür dava vardır. Ayrıca mal
                        paylaşımı ve velayet davaları da söz konusu olabilir. Boşanma
                        davaları; avukatlık ücretleri ve mahkeme masrafları gibi çeşitli
                        maliyetler içerebilir.
                    </p>
                </header>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Sol: 2x2 tür kartları */}
                    <div className="lg:col-span-6">
                        <h3 className="mb-4 text-2xl font-bold text-slate-900">
                            Hangi Tür Boşanma Davaları Vardır?
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {[
                                {
                                    icon: <Handshake className="h-7 w-7" />,
                                    title: "ANLAŞMALI BOŞANMA",
                                    desc:
                                        "Eşlerin anlaşmaya vardığı, daha hızlı ve düşük maliyetli süreç.",
                                },
                                {
                                    icon: <Gavel className="h-7 w-7" />,
                                    title: "ÇEKİŞMELİ BOŞANMA",
                                    desc:
                                        "Uyuşmazlıkların delillendirildiği, müzakere/temsil içeren süreç.",
                                },
                                {
                                    icon: <Scale className="h-7 w-7" />,
                                    title: "MAL PAYLAŞIMI",
                                    desc:
                                        "Varlıkların/borçların adil paylaşımı ve değerleme süreçleri.",
                                },
                                {
                                    icon: <Baby className="h-7 w-7" />,
                                    title: "VELAYET",
                                    desc:
                                        "Çocuğun üstün yararı gözetilerek velayet ve kişisel ilişki düzeni.",
                                },
                            ].map((c) => (
                                <article
                                    key={c.title}
                                    className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-xl bg-[#0b1f3d] p-2 text-white">
                                            {c.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-extrabold tracking-wide text-slate-900">
                                                {c.title}
                                            </h4>
                                            <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Orta: Maliyet kartı (statik değerler) */}
                    <div className="lg:col-span-3">
                        <h3 className="mb-4 text-2xl font-bold text-slate-900">
                            Boşanma Maliyetleri
                        </h3>
                        <div className="rounded-2xl bg-gradient-to-b from-white to-slate-50 p-5 ring-1 ring-slate-200">
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between">
                                    <span className="text-slate-700">Mahkeme Giderleri</span>
                                    <span className="font-semibold text-slate-900">
                                        ₺4.500–₺12.000
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-slate-700">Avukatlık Ücreti</span>
                                    <span className="font-semibold text-slate-900">
                                        ₺30.000–₺120.000
                                    </span>
                                </li>
                            </ul>

                            <div className="mt-5 rounded-xl bg-[#0b1f3d]/5 p-3 text-xs text-slate-600">
                                * Tutarlar bilgilendirme amaçlıdır. İl, dosya kapsamı ve avukat
                                tercihine göre değişebilir.
                            </div>
                        </div>
                    </div>

                    {/* Sağ: Müvekkil / Avukat kutuları */}
                    <div className="flex flex-col gap-4 lg:col-span-3">
                        {/* Müvekkil */}
                        <article className="rounded-2xl bg-gradient-to-b from-[#0b1f3d] to-[#083065] p-5 text-white shadow-md">
                            <h4 className="text-lg font-bold">Müvekkil için</h4>
                            <ul className="mt-3 space-y-2 text-white/90">
                                {[
                                    "Profilini doğrula",
                                    "Uygun davaları filtrele",
                                    "Teklif ver",
                                    "Danışmanlık sun",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4" />
                                        <span className="text-sm">{t}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to={onClientStartTo}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                            >
                                Dava Başlat <ArrowRight className="h-4 w-4" />
                            </Link>
                        </article>

                        {/* Avukat */}
                        <article className="rounded-2xl bg-[#0b1f3d] p-5 text-white shadow-md">
                            <h4 className="text-lg font-bold">Avukat için</h4>
                            <ul className="mt-3 space-y-2 text-white/90">
                                {[
                                    "Profilini doğrula",
                                    "Uygun davaları filtrele",
                                    "Teklif ver",
                                    "Danışmanlık sun",
                                ].map((t) => (
                                    <li key={t} className="flex items-center gap-2">
                                        <Check className="h-4 w-4" />
                                        <span className="text-sm">{t}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to={onLawyerLoginTo}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0b1f3d] hover:bg-slate-100"
                            >
                                Avukat Girişi <ArrowRight className="h-4 w-4" />
                            </Link>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
