'use client';
import { useState } from 'react';
import { TrendingUp, DollarSign, Download, CreditCard } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const MONTHLY = [
    { month: 'অক্টোবর', amount: 3200, tasks: 8 }, { month: 'নভেম্বর', amount: 4100, tasks: 11 },
    { month: 'ডিসেম্বর', amount: 3600, tasks: 9 }, { month: 'জানুয়ারি', amount: 5200, tasks: 13 },
    { month: 'ফেব্রুয়ারি', amount: 4800, tasks: 12 }, { month: 'মার্চ(চলতি)', amount: 2400, tasks: 6 },
];
const maxAmount = Math.max(...MONTHLY.map(m => m.amount));
const PAY_METHODS = [{ id: 'bkash', name: 'bKash', emoji: '🟣' }, { id: 'nagad', name: 'নগদ', emoji: '🟠' }, { id: 'bank', name: 'Bank', emoji: '🏦' }];

export default function EarningsPage() {
    const { t } = useLang();
    const [payMethod, setPayMethod] = useState('');
    const [withdrawDone, setWithdrawDone] = useState(false);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('আর্নিং ও পেমেন্ট', 'Earnings & Payment')}</h1>

            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { icon: DollarSign, val: '৳২৩,৩০০', label: 'মোট আয়', en: 'Total Earned', color: 'bg-primary text-white' },
                    { icon: TrendingUp, val: '৳২,৪০০', label: 'এই মাসে', en: 'This Month', color: 'bg-success text-white' },
                    { icon: CreditCard, val: '৳১,৬০০', label: 'উত্তোলনযোগ্য', en: 'Withdrawable', color: 'bg-accent text-white' },
                ].map(s => (
                    <div key={s.label} className={`rounded-2xl p-4 ${s.color}`}>
                        <s.icon className="w-5 h-5 mb-1 opacity-80" />
                        <div className="text-2xl font-black">{s.val}</div>
                        <div className="text-xs opacity-80">{t(s.label, s.en)}</div>
                    </div>
                ))}
            </div>

            {/* Bar chart */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
                <h3 className="font-bold text-gray-800 mb-4">{t('মাসওয়ারি আয়', 'Monthly Earnings')}</h3>
                <div className="flex items-end gap-2 h-32">
                    {MONTHLY.map(m => (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                            <div className="text-xs font-bold text-primary">{m.amount > 0 ? `৳${(m.amount / 1000).toFixed(1)}k` : ''}</div>
                            <div className="w-full bg-primary/10 rounded-t-lg relative" style={{ height: `${(m.amount / maxAmount) * 100}%`, minHeight: '8px' }}>
                                <div className="absolute inset-0 bg-primary rounded-t-lg" style={{ background: `linear-gradient(to top, #1A5C8C, #3B82F6)` }} />
                            </div>
                            <div className="text-[9px] text-gray-400 text-center">{m.month}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Withdraw */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-3">{t('পেমেন্ট তোলার অনুরোধ', 'Request Withdrawal')}</h3>
                {withdrawDone ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                        <div className="text-3xl mb-2">✅</div>
                        <div className="font-bold text-success">{t('অনুরোধ পাঠানো হয়েছে!', 'Request submitted!')}</div>
                        <div className="text-xs text-gray-500 mt-1">{t('৩-৫ কার্যদিবসে আপনার একাউন্টে পৌঁছাবে', 'Will arrive in 3-5 business days')}</div>
                    </div>
                ) : (
                    <div>
                        <p className="text-sm text-gray-500 mb-3">{t('উত্তোলনযোগ্য ব্যালেন্স:', 'Available balance:')} <span className="font-bold text-primary">৳১,৬০০</span></p>
                        <div className="flex gap-2 mb-3">
                            {PAY_METHODS.map(m => (
                                <button key={m.id} onClick={() => setPayMethod(m.id)}
                                    className={`flex-1 flex flex-col items-center gap-1 py-2.5 border-2 rounded-xl text-xs font-medium transition-all ${payMethod === m.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40'}`}>
                                    <span>{m.emoji}</span>{m.name}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => payMethod && setWithdrawDone(true)} disabled={!payMethod}
                            className="w-full bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors">
                            {t('টাকা তুলুন', 'Withdraw')} ৳১,৬০০
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
