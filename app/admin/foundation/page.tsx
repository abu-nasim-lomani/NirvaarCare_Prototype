'use client';
import Link from 'next/link';
import { TrendingUp, Users, Target, AlertCircle, ArrowRight, ShieldCheck, CheckCircle, Clock, BadgeCheck } from 'lucide-react';

const STAT_CARDS = [
    { label: 'Total Funds Raised', value: '৳ 12,50,000', change: '+৳84,000 this month', icon: <TrendingUp className="w-6 h-6" />, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Idle / Unallocated', value: '৳ 48,200', change: '12 donors with idle funds', icon: <AlertCircle className="w-6 h-6" />, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Active Campaigns', value: '6', change: '2 critically urgent', icon: <Target className="w-6 h-6" />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Donors', value: '3,420', change: '+48 new this week', icon: <Users className="w-6 h-6" />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const CAMPAIGNS = [
    { id: 'c1', name: 'কাসেমের হার্ট সার্জারি', amount: 150000, raised: 120000, daysLeft: 5, isUrgent: true },
    { id: 'c2', name: 'জামিলার ৩ মাসের ওষুধ', amount: 12000, raised: 4500, daysLeft: 12, isUrgent: false },
    { id: 'c3', name: 'রহিম চাচার হুইলচেয়ার', amount: 8500, raised: 8500, daysLeft: 0, isUrgent: false },
    { id: 'c4', name: 'হাসানের ক্যান্সার চিকিৎসা', amount: 500000, raised: 250000, daysLeft: 20, isUrgent: true },
    { id: 'c5', name: 'অরফানেজ ফুড প্রোগ্রাম', amount: 50000, raised: 50000, daysLeft: 0, isUrgent: false },
    { id: 'c6', name: 'জরুরি অক্সিজেন সিলিন্ডার', amount: 45000, raised: 10000, daysLeft: 3, isUrgent: true },
];

const RECENT_DONATIONS = [
    { donor: 'আরিফুর রহমান', amount: 5000, campaign: 'কাসেমের হার্ট সার্জারি', time: '2m ago', status: 'allocated' },
    { donor: 'Nasim Ahmed', amount: 10000, campaign: 'General Fund', time: '15m ago', status: 'idle' },
    { donor: 'সুমাইয়া বেগম', amount: 2500, campaign: 'হাসানের ক্যান্সার', time: '1h ago', status: 'allocated' },
    { donor: 'Rahim Mia', amount: 1000, campaign: 'General Fund', time: '3h ago', status: 'idle' },
];

export default function AdminFoundationDashboard() {
    return (
        <div className="space-y-8">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Foundation Overview</h1>
                    <p className="text-gray-500 mt-1">Live snapshot of all campaigns and fund activity.</p>
                </div>
                <Link href="/admin/foundation/campaigns" className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                    + New Campaign
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {STAT_CARDS.map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-4`}>{s.icon}</div>
                        <p className="text-2xl font-black text-gray-900">{s.value}</p>
                        <p className="text-sm font-semibold text-gray-500 mt-1">{s.label}</p>
                        <p className="text-xs text-gray-400 mt-1">{s.change}</p>
                    </div>
                ))}
            </div>

            {/* Campaign Progress + Recent Donations */}
            <div className="grid xl:grid-cols-2 gap-6">
                {/* Campaign List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-black text-gray-800">All Campaigns</h2>
                        <Link href="/admin/foundation/campaigns" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">Manage <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                    <div className="space-y-4">
                        {CAMPAIGNS.map(c => {
                            const pc = Math.min(100, Math.round((c.raised / c.amount) * 100));
                            const done = c.raised >= c.amount;
                            return (
                                <div key={c.id} className="flex items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-sm font-bold text-gray-800 truncate">{c.name}</p>
                                            {c.isUrgent && <span className="text-xs bg-emergency/10 text-emergency px-2 py-0.5 rounded font-bold shrink-0">URGENT</span>}
                                            {done && <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded font-bold flex items-center gap-1 shrink-0"><CheckCircle className="w-3 h-3" />Done</span>}
                                        </div>
                                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${done ? 'bg-success' : c.isUrgent ? 'bg-emergency' : 'bg-primary'}`} style={{ width: `${pc}%` }} />
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-black text-gray-800">{pc}%</p>
                                        <p className="text-xs text-gray-400">{c.daysLeft > 0 ? `${c.daysLeft}d left` : 'Ended'}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Recent Donations */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-black text-gray-800">Recent Donations</h2>
                        <Link href="/admin/foundation/donors" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                    <div className="space-y-4">
                        {RECENT_DONATIONS.map((d, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary shrink-0">
                                    {d.donor.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 truncate">{d.donor}</p>
                                    <p className="text-xs text-gray-400 truncate">{d.campaign}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-sm font-black text-gray-800">৳{d.amount.toLocaleString()}</p>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.status === 'idle' ? 'bg-amber-100 text-amber-600' : 'bg-success/10 text-success'}`}>
                                        {d.status === 'idle' ? '⏳ Idle' : '✓ Allocated'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick alert */}
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                        <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-amber-700">2 donors have idle funds for 25+ days</p>
                            <Link href="/admin/foundation/allocation" className="text-xs font-bold text-amber-600 hover:underline mt-1 block">Review Idle Funds →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
