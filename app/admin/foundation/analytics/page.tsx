'use client';
import Link from 'next/link';
import { TrendingUp, Users, Heart, Calendar, ArrowUpRight } from 'lucide-react';

const MONTHLY_DATA = [
    { month: 'Oct', amount: 45000, donors: 28 },
    { month: 'Nov', amount: 72000, donors: 45 },
    { month: 'Dec', amount: 95000, donors: 62 },
    { month: 'Jan', amount: 120000, donors: 78 },
    { month: 'Feb', amount: 88000, donors: 55 },
    { month: 'Mar', amount: 145000, donors: 92 },
];
const MAX_AMOUNT = Math.max(...MONTHLY_DATA.map(d => d.amount));

const CAMPAIGN_PERF = [
    { name: 'কাসেমের হার্ট সার্জারি', raised: 120000, target: 150000, donors: 342, category: 'Surgery' },
    { name: 'হাসানের ক্যান্সার চিকিৎসা', raised: 250000, target: 500000, donors: 214, category: 'Surgery' },
    { name: 'জামিলার ৩ মাসের ওষুধ', raised: 4500, target: 12000, donors: 18, category: 'Medicine' },
    { name: 'জরুরি অক্সিজেন সিলিন্ডার', raised: 10000, target: 45000, donors: 41, category: 'Equipment' },
];

const TOP_DONORS = [
    { name: 'Jannatul Ferdous', amount: 78000, count: 12 },
    { name: 'আরিফুর রহমান', amount: 45000, count: 7 },
    { name: 'সুমাইয়া বেগম', amount: 32000, count: 5 },
    { name: 'Nasim Ahmed', amount: 10000, count: 1 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Campaign Analytics</h1>
                    <p className="text-gray-500 mt-1">Revenue trends, donor stats, and campaign performance.</p>
                </div>
                <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-primary bg-white">
                    <option>Last 6 Months</option>
                    <option>Last 12 Months</option>
                    <option>This Year</option>
                </select>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Total Raised', value: '৳12.5L', sub: '+32% vs last period', icon: <TrendingUp className="w-5 h-5" />, color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Unique Donors', value: '3,420', sub: '+48 this month', icon: <Users className="w-5 h-5" />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Avg. Donation', value: '৳3,654', sub: '↑ ৳412 vs last period', icon: <ArrowUpRight className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'Patients Helped', value: '145', sub: '8 active campaigns', icon: <Heart className="w-5 h-5" />, color: 'text-pink-500', bg: 'bg-pink-50' },
                ].map(c => (
                    <div key={c.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className={`w-10 h-10 ${c.bg} ${c.color} rounded-xl flex items-center justify-center mb-4`}>{c.icon}</div>
                        <p className="text-2xl font-black text-gray-900">{c.value}</p>
                        <p className="text-xs font-bold text-gray-500 mt-0.5">{c.label}</p>
                        <p className="text-xs text-success font-bold mt-1">{c.sub}</p>
                    </div>
                ))}
            </div>

            {/* Monthly Chart (CSS bar chart) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-black text-gray-800">Monthly Fundraising Trend</h2>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary inline-block"></span>Amount Raised</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>Donors</span>
                    </div>
                </div>
                <div className="flex items-end gap-3 h-52 px-2">
                    {MONTHLY_DATA.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full flex items-end gap-1 h-40">
                                <div className="flex-1 bg-primary/10 hover:bg-primary/20 rounded-t-lg transition-colors relative group" style={{ height: `${(d.amount / MAX_AMOUNT) * 100}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">৳{(d.amount/1000).toFixed(0)}K</div>
                                    <div className="w-full h-full bg-primary rounded-t-lg opacity-70"></div>
                                </div>
                                <div className="flex-1 bg-emerald-100 rounded-t-lg" style={{ height: `${(d.donors / 92) * 60}%` }}>
                                    <div className="w-full h-full bg-emerald-400 rounded-t-lg opacity-60"></div>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400">{d.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Campaign Performance + Top Donors */}
            <div className="grid xl:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-black text-gray-800 mb-6">Campaign Performance</h2>
                    <div className="space-y-5">
                        {CAMPAIGN_PERF.map((c, i) => {
                            const pct = Math.round((c.raised / c.target) * 100);
                            return (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <p className="text-sm font-bold text-gray-700 truncate max-w-48">{c.name}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{c.donors} donors</span>
                                            <span className="text-xs font-black text-gray-800">{pct}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${pct >= 100 ? 'bg-success' : pct >= 50 ? 'bg-primary' : 'bg-emergency'}`} style={{ width: `${Math.min(100, pct)}%` }} />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">৳{c.raised.toLocaleString()} of ৳{c.target.toLocaleString()}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-black text-gray-800 mb-6">Top Donors</h2>
                    <div className="space-y-4">
                        {TOP_DONORS.map((d, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-gray-200 text-gray-600' : i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>#{i + 1}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-800 text-sm">{d.name}</p>
                                    <p className="text-xs text-gray-400">{d.count} donations</p>
                                </div>
                                <span className="font-black text-gray-800">৳{d.amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                        <p className="text-xs font-bold text-gray-500 mb-1">Best Fundraising Month</p>
                        <p className="font-black text-gray-800">March 2026 — ৳1,45,000 <span className="text-success text-sm">↑ Best ever</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
