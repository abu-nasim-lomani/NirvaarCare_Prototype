'use client';
import { useState } from 'react';
import { Bell, CheckCircle, Clock, Shield, FileText } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const ALL_NOTIFS = [
    { id: 1, type: 'booking', title: 'বুকিং নিশ্চিত হয়েছে', body: 'আপনার ডায়াগনস্টিক বুকিং নিশ্চিত হয়েছে।', time: '১০ মিনিট আগে', unread: true, icon: Clock, c: 'text-primary bg-blue-50' },
    { id: 2, type: 'report', title: 'নতুন রিপোর্ট আপলোড হয়েছে', body: 'ডা. আরিফ একটি প্রেসক্রিপশন ভল্টে সেভ করেছেন।', time: '১ ঘন্টা আগে', unread: true, icon: FileText, c: 'text-success bg-green-50' },
    { id: 3, type: 'payment', title: 'পেমেন্ট সফল', body: 'মাসিক সাবস্ক্রিপশন পেমেন্ট ৩,৫০০৳ সফলভাবে কেটে নেওয়া হয়েছে।', time: 'গতকাল', unread: false, icon: CheckCircle, c: 'text-amber-600 bg-amber-50' },
    { id: 4, type: 'booking', title: 'কেয়ারগিভার রওনা দিয়েছেন', body: 'ফারিদা নার্স আপনার ঠিকানার উদ্দেশ্যে রওনা হয়েছেন।', time: '২ দিন আগে', unread: false, icon: Clock, c: 'text-primary bg-blue-50' },
];

export default function NotificationsPage() {
    const { t } = useLang();
    const [notifs, setNotifs] = useState(ALL_NOTIFS);
    const [tab, setTab] = useState('all');

    const filtered = notifs.filter(n => tab === 'all' || n.type === tab);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-primary-dark">{t('নোটিফিকেশন', 'Notifications')}</h1>
                <button onClick={() => setNotifs(ns => ns.map(n => ({ ...n, unread: false })))} className="text-sm font-bold text-primary hover:underline">
                    {t('সব রিড মার্ক করুন', 'Mark all read')}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 overflow-x-auto">
                {[{ id: 'all', l: 'সব', en: 'All' }, { id: 'booking', l: 'বুকিং', en: 'Booking' }, { id: 'report', l: 'রিপোর্ট', en: 'Reports' }, { id: 'payment', l: 'পেমেন্ট', en: 'Payments' }].map(tb => (
                    <button key={tb.id} onClick={() => setTab(tb.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${tab === tb.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                        {t(tb.l, tb.en)}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                    <Bell className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">{t('নতুন কোনো আপডেট নেই', 'No new notifications')}</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    {filtered.map(n => (
                        <button key={n.id} onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, unread: false } : x))} className={`w-full text-left p-5 transition-colors hover:bg-gray-50 flex items-start gap-4 ${n.unread ? 'bg-white' : 'bg-gray-50/50'}`}>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${n.c}`}>
                                <n.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className={`font-bold ${n.unread ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</h3>
                                    <span className="text-xs text-gray-400 font-medium">{n.time}</span>
                                </div>
                                <p className={`text-sm ${n.unread ? 'text-gray-600' : 'text-gray-400'}`}>{n.body}</p>
                            </div>
                            {n.unread && <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
