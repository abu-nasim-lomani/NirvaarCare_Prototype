'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AlertTriangle, Users, Calendar, TrendingUp, Activity } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const SOS_ALERTS = [
    { id: 'SOS-001', client: 'মোঃ শফিকুল ইসলাম', type: 'হার্ট অ্যাটাক', address: 'মিরপুর-১০, ঢাকা', time: '৩ মিনিট আগে', status: 'live' },
    { id: 'SOS-002', client: 'বেগম হামিদা', type: 'পড়ে গেছেন', address: 'বনানী, ঢাকা', time: '১২ মিনিট আগে', status: 'responding' },
];

export default function AdminDashboard() {
    const { t } = useLang();
    const [alerts, setAlerts] = useState(SOS_ALERTS);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('অ্যাডমিন ড্যাশবোর্ড', 'Admin Dashboard')}</h1>

            {/* Live SOS Alert */}
            {alerts.filter(a => a.status === 'live').map(a => (
                <div key={a.id} className="bg-emergency text-white rounded-2xl p-4 mb-5 animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-black">{t('🚨 জীবিত SOS অ্যালার্ট!', '🚨 LIVE SOS ALERT!')}</div>
                            <div className="text-sm opacity-90">{a.client} — {a.type} — {a.address}</div>
                        </div>
                        <Link href="/admin/emergency" className="bg-white text-emergency font-bold text-sm px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                            {t('সাড়া দিন', 'Respond')} →
                        </Link>
                    </div>
                </div>
            ))}

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { icon: Activity, val: '৪৮', label: "আজকের বুকিং", en: "Today's Bookings", color: 'bg-blue-50 text-primary', delta: '+৫%' },
                    { icon: Users, val: '৫২', label: 'সক্রিয় কেয়ারগিভার', en: 'Active Caregivers', color: 'bg-green-50 text-success', delta: '+২' },
                    { icon: TrendingUp, val: '৳১.২ লাখ', label: "এই মাসের আয়", en: "Month Revenue", color: 'bg-amber-50 text-accent', delta: '+১২%' },
                    { icon: AlertTriangle, val: '২', label: 'SOS অ্যালার্ট', en: 'SOS Alerts', color: 'bg-red-50 text-emergency', delta: 'লাইভ' },
                ].map(kpi => (
                    <div key={kpi.label} className={`rounded-2xl p-4 ${kpi.color}`}>
                        <kpi.icon className="w-5 h-5 mb-1 opacity-70" />
                        <div className="text-2xl font-black">{kpi.val}</div>
                        <div className="text-xs opacity-70">{t(kpi.label, kpi.en)}</div>
                        <div className="text-xs font-bold mt-1 opacity-80">{kpi.delta}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                    { href: '/admin/emergency', emoji: '🚨', title: 'জরুরি সেন্টার', en: 'Emergency Center', desc: 'SOS অ্যালার্ট ম্যানেজ করুন', urgent: true },
                    { href: '/admin/dispatch', emoji: '🗺️', title: 'ডিসপ্যাচ', en: 'Dispatch', desc: 'কেয়ারগিভার অ্যাসাইন করুন', urgent: false },
                    { href: '/admin/verification', emoji: '✅', title: 'KYC যাচাই', en: 'KYC Verification', desc: '৫টি নতুন আবেদন অপেক্ষায়', urgent: false },
                ].map(a => (
                    <Link key={a.href} href={a.href} className={`bg-white rounded-2xl border-2 p-5 card-hover ${a.urgent ? 'border-emergency/30' : 'border-gray-100'}`}>
                        <div className="text-3xl mb-2">{a.emoji}</div>
                        <h3 className="font-bold text-primary-dark">{t(a.title, a.en)}</h3>
                        <p className="text-xs text-gray-500 mt-1">{a.desc}</p>
                    </Link>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-3">{t('সাম্প্রতিক কার্যক্রম', 'Recent Activity')}</h3>
                <div className="space-y-2">
                    {[
                        { time: '৫ মি.', action: 'নতুন বুকিং', detail: 'BK-2024-048 — ডায়াগনস্টিক সেবা', color: 'bg-blue-100 text-primary' },
                        { time: '১৫ মি.', action: 'KYC অনুমোদিত', detail: 'আরিফ হোসেন (কেয়ারগিভার)', color: 'bg-green-100 text-success' },
                        { time: '৩২ মি.', action: 'SOS সমাধান', detail: 'SOS-001 — রেসপন্ড করা হয়েছে', color: 'bg-red-100 text-emergency' },
                        { time: '১ ঘ.', action: 'পেমেন্ট', detail: 'Monthly subscription — ৳৩,৫০০', color: 'bg-amber-100 text-amber-600' },
                    ].map((act, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${act.color}`}>{act.action}</span>
                            <span className="text-sm text-gray-600 flex-1">{act.detail}</span>
                            <span className="text-xs text-gray-400">{act.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
