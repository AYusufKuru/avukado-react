import { useState } from "react";
import { useGetLawyersQuery } from "../store/api/lawyersApi";

export default function Lawyers() {
    const [q, setQ] = useState("");
    const [city, setCity] = useState("");
    const [tag, setTag] = useState("");
    
    const { data, isLoading, error, refetch } = useGetLawyersQuery({ q, city, tag });
    const list = data?.data || data || [];

    return (
        <div className="space-y-6">
            <div className="bg-white border rounded-xl p-4 grid md:grid-cols-4 gap-3">
                <input className="border rounded-lg p-3" placeholder="Avukat veya büro ara..." value={q} onChange={e => setQ(e.target.value)} />
                <select className="border rounded-lg p-3" value={city} onChange={e => setCity(e.target.value)}>
                    <option value="">Şehir</option>
                    {["İstanbul", "Ankara", "İzmir", "Bursa", "Gaziantep"].map(c => <option key={c}>{c}</option>)}
                </select>
                <input className="border rounded-lg p-3" placeholder="Uzmanlık (örn: Aile Hukuku)" value={tag} onChange={e => setTag(e.target.value)} />
                <button onClick={() => refetch()} className="rounded-lg bg-teal-700 text-white p-3">Filtrele</button>
            </div>

            {isLoading && <div className="text-center py-8">Yükleniyor...</div>}
            {error && <div className="text-center py-8 text-red-600">Hata: {error?.data?.error || error?.error || "Avukatlar yüklenemedi"}</div>}
            {!isLoading && !error && list.length === 0 && <div className="text-center py-8">Avukat bulunamadı.</div>}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {list.map(l => (
                    <div key={l.id} className="bg-white border rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                            <img src={l.avatar} className="w-14 h-14 rounded-full" />
                            <div>
                                <div className="font-semibold">{l.name}</div>
                                <div className="text-sm text-slate-600">{l.office} • {l.city}</div>
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-slate-600 flex flex-wrap gap-2">
                            {l.tags?.map(t => <span key={t} className="px-2 py-1 rounded bg-slate-100">{t}</span>)}
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="px-3 py-2 rounded-lg border">Fiyat Teklifi Al</button>
                            <button className="px-3 py-2 rounded-lg bg-slate-900 text-white">Canlı Danışmanlık</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
