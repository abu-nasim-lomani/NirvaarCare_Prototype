'use client';
import { TrendingUp, Users, Activity, Star } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const REVENUE_DATA = [{ m: 'Oct', v: 45000 }, { m: 'Nov', v: 62000 }, { m: 'Dec', v: 58000 }, { m: 'Jan', v: 78000 }, { m: 'Feb', v: 95000 }, { m: 'Mar', v: 120000 }];
const maxRev = Math.max(...REVENUE_DATA.map(r => r.v));

const PERFORMANCE = [
    { name: 'ফারিদা নার্স', id: 'CG-012', rating: 4.9, active: true, completed: 48, rate: '৳২০০/hr' },
    { name: 'ডা. আরিফ', id: 'CG-045', rating: 5.0, active: true, completed: 15, rate: '৳৮০০/visit' },
    { name: 'করিম হো.', id: 'CG-028', rating: 4.2, active: false, completed: 34, rate: '৳১৫০/hr' },
];

export default function AnalyticsPage() {
    const { t } = useLang();
    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('অ্যানালিটিক্স ড্যাশবোর্ড', 'Analytics Dashboard')}</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[{ v: '৬৪৮', l: 'মোট বুকিং', delta: '+১৫%', c: 'text-primary bg-blue-50' }, { v: '৳৪.৫৮ লাখ', l: 'মোট আয়', delta: '+২২%', c: 'text-success bg-green-50' }, { v: '৪৮', l: 'NRB ক্লায়েন্ট', delta: '৭৪%', c: 'text-purple-600 bg-purple-50' }, { v: '৪.৮★', l: 'গড় রেটিং', delta: '৯৮% সন্তুষ্টি', c: 'text-amber-600 bg-amber-50' }].map(k => (
                    <div key={k.l} className={`rounded-2xl p-4 ${k.c}`}><div className="text-2xl font-black">{k.v}</div><div className="text-xs opacity-70">{t(k.l, k.l)}</div></div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />{t('মাসওয়ারি রাজস্ব', 'Monthly Revenue')}</h3>
                    <div className="flex items-end gap-2 h-36 border-b border-gray-100 pb-2">
                        {REVENUE_DATA.map(d => (
                            <div key={d.m} className="flex-1 flex flex-col items-center gap-1 group relative">
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-6 text-[10px] bg-gray-800 text-white px-2 py-0.5 rounded font-bold transition-opacity">{(d.v / 1000).toFixed(0)}k</div>
                                <div className="w-full rounded-t-sm" style={{ height: `${(d.v / maxRev) * 100}%`, minHeight: '4px', background: 'linear-gradient(to top, #1A5C8C, #3B82F6)' }} />
                                <div className="text-[9px] text-gray-400">{d.m}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{t('NRB বনাম স্থানীয় ক্লায়েন্ট', 'NRB vs Local Clients')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[{ f: '🇬🇧', l: 'UK', p: 28 }, { f: '🇦🇪', l: 'UAE', p: 22 }, { f: '🇨🇦', l: 'CA', p: 15 }, { f: '🇧🇩', l: 'BD', p: 35 }].map(c => (
                            <div key={c.l} className="text-center bg-gray-50 rounded-xl p-3"><div className="text-2xl mb-1">{c.f}</div><div className="text-primary font-black">{c.p}%</div></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Caregiver Performance Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Star className="w-4 h-4 text-primary" />{t('কেয়ারগিভার পারফরম্যান্স', 'Caregiver Performance')}</h3>
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium"><tr><th className="px-5 py-3 capitalize">{t('নাম', 'Name')}</th><th className="px-5 py-3 capitalize">{t('রেটিং', 'Rating')}</th><th className="px-5 py-3 capitalize">{t('টাস্ক সম্পন্ন', 'Tasks Completed')}</th><th className="px-5 py-3 text-right capitalize">{t('স্ট্যাটাস', 'Status')}</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">
                        {PERFORMANCE.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                                <td className="px-5 py-3"><div className="font-bold text-gray-800">{p.name}</div><div className="text-xs text-gray-400">{p.id} • {p.rate}</div></td>
                                <td className="px-5 py-3"><div className="flex items-center gap-1 font-bold text-gray-700"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {p.rating.toFixed(1)}</div></td>
                                <td className="px-5 py-3"><div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[100px] mb-1"><div className="bg-success h-1.5 rounded-full" style={{ width: `${Math.min(100, p.completed * 2)}%` }} /></div><div className="text-xs text-gray-400">{p.completed} tasks</div></td>
                                <td className="px-5 py-3 text-right"><span className={`text-xs px-2 py-1 rounded-lg font-bold ${p.active ? 'bg-green-100 text-success' : 'bg-gray-100 text-gray-400'}`}>{p.active ? t('সক্রিয়', 'Active') : t('নিষ্ক্রিয়', 'Inactive')}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
