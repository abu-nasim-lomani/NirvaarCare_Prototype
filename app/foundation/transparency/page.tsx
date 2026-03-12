'use client';
import Link from 'next/link';
import { ShieldCheck, FileText, ExternalLink, Download, AlertCircle } from 'lucide-react';

const MONTHLY_SUMMARY = [
    { month: 'March 2026', raised: 145000, spent: 95000, idle: 50000, campaigns: 4, patients: 6 },
    { month: 'February 2026', raised: 88000, spent: 76000, idle: 12000, campaigns: 3, patients: 4 },
    { month: 'January 2026', raised: 120000, spent: 102000, idle: 18000, campaigns: 5, patients: 8 },
];

const PUBLIC_LEDGER = [
    { date: 'Mar 12', type: 'IN', desc: 'Donation — Nasim Ahmed', campaign: 'General Fund', amount: 10000, verified: true },
    { date: 'Mar 12', type: 'OUT', desc: 'Payment to Evercare Hospital', campaign: 'কাসেমের হার্ট সার্জারি', amount: 80000, verified: true },
    { date: 'Mar 10', type: 'OUT', desc: 'Payment to Lazz Pharma', campaign: 'হাসানের ক্যান্সার', amount: 35000, verified: true },
    { date: 'Mar 8', type: 'IN', desc: 'Donation — Jannatul Ferdous', campaign: 'জামিলার ওষুধ', amount: 5000, verified: true },
    { date: 'Mar 5', type: 'OUT', desc: 'Payment to Dietitian BD', campaign: 'কাসেমের হার্ট সার্জারি', amount: 12000, verified: true },
];

export default function TransparencyPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 pb-20">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-5 py-2 rounded-full text-sm font-bold mb-4">
                        <ShieldCheck className="w-4 h-4" /> সম্পূর্ণ স্বচ্ছতার গ্যারান্টি
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">নির্ভার কেয়ার ফাউন্ডেশন<br/>পাবলিক অডিট রিপোর্ট</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">আমাদের প্রতিটি আয়-ব্যয়ের হিসাব এখানে সর্বসাধারণের জন্য উন্মুক্ত। লগইন ছাড়াই যেকেউ এটি দেখতে পারবেন।</p>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { v: '৳12.5 লাখ', l: 'মোট সংগ্রহ' },
                        { v: '৳11.2 লাখ', l: 'মোট ব্যয় (রোগী)' },
                        { v: '৳1.3 লাখ', l: 'আনঅ্যালোকেটেড' },
                        { v: '0%', l: 'অ্যাডমিন চার্জ' },
                    ].map(s => (
                        <div key={s.l} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                            <p className="text-2xl font-black text-gray-900">{s.v}</p>
                            <p className="text-xs text-gray-500 font-bold mt-1">{s.l}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700"><strong>নীতি:</strong> আমরা কোনো অ্যাডমিন বা অপারেশন ফি চার্জ করি না। আপনার প্রতিটি টাকা সরাসরি রোগীর চিকিৎসায় যায়।</p>
                </div>

                {/* Monthly Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="font-black text-gray-800">মাসিক সারসংক্ষেপ</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Month</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Raised (IN)</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Spent (OUT)</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Idle</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Campaigns</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Report</th>
                            </tr></thead>
                            <tbody>
                                {MONTHLY_SUMMARY.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">{row.month}</td>
                                        <td className="px-6 py-4 font-bold text-success">৳{row.raised.toLocaleString()}</td>
                                        <td className="px-6 py-4 font-bold text-emergency">৳{row.spent.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-amber-600 font-bold">৳{row.idle.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-600">{row.campaigns} active</td>
                                        <td className="px-6 py-4">
                                            <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"><Download className="w-3.5 h-3.5" /> PDF</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Public Ledger */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="font-black text-gray-800">লাইভ ট্রানজেকশন লেজার</h2>
                            <p className="text-xs text-gray-400 mt-0.5">প্রতিটি লেনদেন ব্লকচেইনের মতো লগ করা আছে</p>
                        </div>
                        <button className="flex items-center gap-2 text-xs font-bold text-primary border border-primary/20 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors">
                            <FileText className="w-3.5 h-3.5" /> Full Report
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Date</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Type</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Description</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Campaign</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Amount</th>
                                <th className="text-left px-6 py-3 font-bold text-gray-500 text-xs uppercase">Verified</th>
                            </tr></thead>
                            <tbody>
                                {PUBLIC_LEDGER.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                        <td className="px-6 py-4 text-xs text-gray-500 font-medium">{row.date}</td>
                                        <td className="px-6 py-4"><span className={`text-xs font-black px-2 py-0.5 rounded-full ${row.type === 'IN' ? 'bg-success/10 text-success' : 'bg-emergency/10 text-emergency'}`}>{row.type}</span></td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{row.desc}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500 max-w-36 truncate">{row.campaign}</td>
                                        <td className="px-6 py-4 font-black text-gray-800">৳{row.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4"><ShieldCheck className="w-4 h-4 text-success" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p className="text-xs text-gray-400">এই ডেটা রিয়েল-টাইমে আপডেট হয় এবং তৃতীয় পক্ষের অডিটর দ্বারা যাচাইযোগ্য।</p>
                    <Link href="/foundation" className="inline-flex items-center gap-1 text-primary font-bold text-sm hover:underline">ফাউন্ডেশনে ফিরুন <ExternalLink className="w-3.5 h-3.5" /></Link>
                </div>
            </div>
        </div>
    );
}
