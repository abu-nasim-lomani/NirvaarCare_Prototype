'use client';
import { useState } from 'react';
import { Bell, CheckCheck, Clock, Heart, AlertTriangle, Info, Users } from 'lucide-react';

const NOTIFICATIONS = [
    { id: 1, type: 'donation', icon: <Heart className="w-4 h-4 text-primary" />, bg: 'bg-primary/10', title: 'নতুন ডোনেশন পাওয়া গেছে', desc: 'Nasim Ahmed — ৳10,000 General Fund-এ জমা দিয়েছেন', time: '2 min ago', read: false },
    { id: 2, type: 'alert', icon: <AlertTriangle className="w-4 h-4 text-emergency" />, bg: 'bg-emergency/10', title: 'URGENT: Campaign ending in 3 days', desc: '"জরুরি অক্সিজেন সিলিন্ডার" ক্যাম্পেইনে এখনো ৳৩৫,০০০ বাকি', time: '15 min ago', read: false },
    { id: 3, type: 'idle', icon: <Clock className="w-4 h-4 text-amber-500" />, bg: 'bg-amber-50', title: 'Idle Funds Alert', desc: '2 জন ডোনারের মোট ৳12,000 টাকা 25+ দিন ধরে অব্যবহৃত', time: '1 hour ago', read: false },
    { id: 4, type: 'application', icon: <Users className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50', title: 'নতুন আবেদন জমা পড়েছে', desc: 'Patient: আব্দুল করিম (হার্টের সমস্যা) — ৳1,20,000 প্রয়োজন', time: '3 hours ago', read: true },
    { id: 5, type: 'info', icon: <Info className="w-4 h-4 text-gray-500" />, bg: 'bg-gray-100', title: 'Campaign Funded 100%!', desc: '"রহিম চাচার হুইলচেয়ার" ক্যাম্পেইন সম্পূর্ণ ফান্ডেড হয়েছে! 🎉', time: '1 day ago', read: true },
    { id: 6, type: 'donation', icon: <Heart className="w-4 h-4 text-primary" />, bg: 'bg-primary/10', title: 'Monthly Subscriber Renewed', desc: 'Jannatul Ferdous-এর মাসিক ৳500 এই মাসেও কেটে নেওয়া হয়েছে', time: '2 days ago', read: true },
];

const SETTINGS_ROWS = [
    { label: 'New Donation Received', email: true, sms: true, inApp: true },
    { label: 'New Patient Application', email: true, sms: false, inApp: true },
    { label: 'Idle Fund Alert (25+ days)', email: true, sms: true, inApp: true },
    { label: 'Campaign Fully Funded', email: true, sms: true, inApp: true },
    { label: 'Urgent Campaign (<3 days)', email: true, sms: true, inApp: true },
    { label: 'Monthly Subscription Renewed', email: false, sms: false, inApp: true },
    { label: 'Receipt Uploaded by Vendor', email: true, sms: false, inApp: true },
];

export default function NotificationsPage() {
    const [notifs, setNotifs] = useState(NOTIFICATIONS);
    const [tab, setTab] = useState<'inbox' | 'settings'>('inbox');
    const unread = notifs.filter(n => !n.read).length;

    const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        Notification Center
                        {unread > 0 && <span className="bg-emergency text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{unread} New</span>}
                    </h1>
                    <p className="text-gray-500 mt-1">Manage and customize all notification alerts.</p>
                </div>
                {tab === 'inbox' && unread > 0 && (
                    <button onClick={markAllRead} className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                        <CheckCheck className="w-4 h-4" /> Mark all read
                    </button>
                )}
            </div>

            <div className="flex gap-2 border-b border-gray-200">
                {(['inbox', 'settings'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)} className={`px-5 py-2.5 text-sm font-bold rounded-t-xl capitalize transition-colors ${tab === t ? 'bg-white border border-b-white border-gray-200 -mb-px text-primary' : 'text-gray-500 hover:text-gray-700'}`}>
                        {t === 'inbox' ? 'Inbox' : 'Alert Settings'}
                    </button>
                ))}
            </div>

            {tab === 'inbox' && (
                <div className="space-y-3">
                    {notifs.map(n => (
                        <div key={n.id} onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                            className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${n.read ? 'bg-white border-gray-100 opacity-70' : 'bg-white border-primary/20 shadow-sm shadow-primary/5'}`}>
                            <div className={`w-10 h-10 ${n.bg} rounded-xl flex items-center justify-center shrink-0`}>{n.icon}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className={`font-bold text-sm ${n.read ? 'text-gray-600' : 'text-gray-800'}`}>{n.title}</p>
                                    {!n.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0"></span>}
                                </div>
                                <p className="text-sm text-gray-500 mt-0.5">{n.desc}</p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{n.time}</span>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'settings' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Alert Type</th>
                                    <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider text-center">Email</th>
                                    <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider text-center">SMS</th>
                                    <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider text-center">In-App</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SETTINGS_ROWS.map((row, i) => (
                                    <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                                        <td className="px-6 py-4 font-medium text-gray-700">{row.label}</td>
                                        {[row.email, row.sms, row.inApp].map((v, j) => (
                                            <td key={j} className="px-6 py-4 text-center">
                                                <input type="checkbox" defaultChecked={v} className="w-4 h-4 accent-primary cursor-pointer" />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 border-t border-gray-100">
                        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">Save Notification Preferences</button>
                    </div>
                </div>
            )}
        </div>
    );
}
