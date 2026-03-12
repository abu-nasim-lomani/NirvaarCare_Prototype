'use client';
import Link from 'next/link';
import { Heart, Medal, TrendingUp, ShieldCheck, Download, PlayCircle, RefreshCw } from 'lucide-react';

const IMPACT_STATS = [
    { label: 'মোট দান', value: '৳45,000', sub: '7টি ডোনেশন', icon: <TrendingUp className="w-6 h-6" />, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'সুস্থ হওয়া রোগী', value: '3 জন', sub: '৪ টি ক্যাম্পেইনে সাহায্য', icon: <Heart className="w-6 h-6" />, color: 'text-emergency', bg: 'bg-emergency/10' },
    { label: 'আপনার ব্যাজ', value: 'Life Saver', sub: 'টানা ৭ মাস দান', icon: <Medal className="w-6 h-6" />, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const TIMELINE = [
    { date: 'Mar 12, 2026', type: 'allocation', title: 'আপনার ৳5,000 খরচ হয়েছে', desc: 'সার্জারি — Evercare Hospital', patient: 'কাসেম মিয়া', receipt: true, video: false, verified: true },
    { date: 'Mar 12, 2026', type: 'donation', title: 'আপনি ৳5,000 দান করেছেন', desc: 'কাসেমের হার্ট সার্জারি', patient: null, receipt: false, video: false, verified: false },
    { date: 'Feb 5, 2026', type: 'recovery', title: 'রফিক সাহেব সুস্থ হয়েছেন!', desc: 'আপনার দান সফলভাবে ব্যবহৃত হয়েছে', patient: 'রফিক সাহেব', receipt: false, video: true, verified: false },
    { date: 'Jan 20, 2026', type: 'allocation', title: 'আপনার ৳8,000 খরচ হয়েছে', desc: 'ওষুধ — Lazz Pharma (Verified)', patient: 'রাহেলা বেগম', receipt: true, video: false, verified: true },
    { date: 'Jan 18, 2026', type: 'donation', title: 'আপনি ৳10,000 দান করেছেন', desc: 'General Fund', patient: null, receipt: false, video: false, verified: false },
];

const TYPE_COLORS: Record<string, string> = {
    donation: 'bg-primary border-primary/20',
    allocation: 'bg-emerald-500 border-emerald-200',
    recovery: 'bg-amber-400 border-amber-200',
};

export default function ImpactPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 pb-20">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 border border-amber-200 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                        <Medal className="w-4 h-4" /> Life Saver Badge
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">আপনার প্রভাব</h1>
                    <p className="text-gray-500">আপনার দানে কতজন মানুষের জীবন পরিবর্তন হয়েছে তার সম্পূর্ণ চিত্র।</p>
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-3 gap-4">
                    {IMPACT_STATS.map(s => (
                        <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                            <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>{s.icon}</div>
                            <p className="text-xl font-black text-gray-900">{s.value}</p>
                            <p className="text-xs text-gray-400 font-bold mt-1">{s.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Auto-Subscription Status */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><RefreshCw className="w-6 h-6 text-primary" /></div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-800">মাসিক সাবস্ক্রিপশন চলছে</p>
                        <p className="text-sm text-gray-500 mt-0.5">প্রতি মাসে ৳500 — পরবর্তী পেমেন্ট: April 1, 2026</p>
                    </div>
                    <button className="text-xs font-bold text-gray-500 hover:text-emergency border border-gray-200 px-3 py-2 rounded-lg hover:border-emergency/40 transition-colors">পজ করুন</button>
                </div>

                {/* Tax Certificate */}
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><Download className="w-6 h-6 text-primary" /></div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-800">২০২৫-২৬ ট্যাক্স রিবেট সার্টিফিকেট</p>
                        <p className="text-sm text-gray-500">মোট দান: ৳45,000 — সার্টিফিকেট প্রস্তুত</p>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-black text-gray-800 mb-6">আপনার ইমপ্যাক্ট টাইমলাইন</h2>
                    <div className="space-y-0">
                        {TIMELINE.map((e, i) => (
                            <div key={i} className="flex gap-5 relative">
                                {/* Timeline Line */}
                                {i < TIMELINE.length - 1 && <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-100 z-0" />}
                                {/* Dot */}
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white shadow-sm ${TYPE_COLORS[e.type]}`}>
                                    {e.type === 'donation' ? <Heart className="w-4 h-4 text-white" /> : e.type === 'recovery' ? <Medal className="w-4 h-4 text-white" /> : <ShieldCheck className="w-4 h-4 text-white" />}
                                </div>
                                <div className="flex-1 pb-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{e.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{e.desc}</p>
                                            {e.patient && <p className="text-xs font-bold text-primary mt-1">রোগী: {e.patient}</p>}
                                        </div>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">{e.date}</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        {e.receipt && (
                                            <button className="text-xs font-bold text-success bg-success/5 hover:bg-success/10 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors">
                                                <ShieldCheck className="w-3 h-3" /> রসিদ দেখুন
                                            </button>
                                        )}
                                        {e.video && (
                                            <button className="text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors">
                                                <PlayCircle className="w-3 h-3" /> ভিডিও দেখুন
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/foundation" className="text-primary font-bold hover:underline text-sm">← আরো ক্যাম্পেইনে দান করুন</Link>
                </div>
            </div>
        </div>
    );
}
