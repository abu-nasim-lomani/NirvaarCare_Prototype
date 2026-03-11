'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Pause, X, ArrowUp, CheckCircle, Package } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const PLAN = { name: 'বেসিক মাসিক', nameEn: 'Basic Monthly', price: '৳৩,৫০০', renewDate: '১ এপ্রিল ২০২৬', status: 'active' };

export default function SubscriptionPage() {
    const { t } = useLang();
    const [action, setAction] = useState<'pause' | 'cancel' | null>(null);
    const [done, setDone] = useState('');

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('সাবস্ক্রিপশন ম্যানেজমেন্ট', 'Subscription Management')}</h1>

            {/* Current Plan */}
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-6 text-white mb-5">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="text-xs opacity-70">{t('বর্তমান প্ল্যান', 'Current Plan')}</div>
                        <div className="text-2xl font-black mt-1">{t(PLAN.name, PLAN.nameEn)}</div>
                        <div className="text-3xl font-black text-accent mt-2">{PLAN.price}<span className="text-sm font-normal opacity-70">/{t('মাস', 'month')}</span></div>
                    </div>
                    <div className="bg-success/20 border border-success/40 rounded-full px-3 py-1 text-xs font-bold">{t('সক্রিয় ✓', 'Active ✓')}</div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="flex justify-between">
                        <span className="opacity-70">{t('পরবর্তী বিল', 'Next billing')}</span>
                        <span className="font-medium">{PLAN.renewDate}</span>
                    </div>
                </div>
            </div>

            {done && <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-2 mb-4 text-sm text-success font-medium"><CheckCircle className="w-4 h-4" />{done}</div>}

            {/* Actions */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { icon: Pause, label: 'পজ করুন', en: 'Pause Plan', color: 'text-amber-600 border-amber-200', action: () => setAction('pause') },
                    { icon: X, label: 'বাতিল করুন', en: 'Cancel Plan', color: 'text-emergency border-red-200', action: () => setAction('cancel') },
                    { icon: ArrowUp, label: 'আপগ্রেড করুন', en: 'Upgrade', color: 'text-primary border-primary/30', href: '/pricing' },
                ].map(({ icon: Icon, label, en, color, action: a, href }) => (
                    href ? (
                        <Link key={label} href={href} className={`flex flex-col items-center gap-1.5 p-4 border-2 rounded-2xl text-center card-hover ${color}`}>
                            <Icon className="w-5 h-5" /><span className="text-xs font-semibold">{t(label, en)}</span>
                        </Link>
                    ) : (
                        <button key={label} onClick={a} className={`flex flex-col items-center gap-1.5 p-4 border-2 rounded-2xl text-center card-hover ${color}`}>
                            <Icon className="w-5 h-5" /><span className="text-xs font-semibold">{t(label, en)}</span>
                        </button>
                    )
                ))}
            </div>

            {/* Confirm modal */}
            {action && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="text-3xl text-center mb-3">{action === 'pause' ? '⏸️' : '❌'}</div>
                        <h3 className="font-black text-center text-primary-dark mb-2">
                            {action === 'pause' ? t('প্ল্যান পজ করবেন?', 'Pause your plan?') : t('প্ল্যান বাতিল করবেন?', 'Cancel your plan?')}
                        </h3>
                        <p className="text-sm text-gray-500 text-center mb-5">
                            {action === 'pause' ? t('আপনার পরবর্তী বিল এড়ানো হবে।', 'Your next billing will be skipped.') : t('সব সুবিধা বন্ধ হয়ে যাবে।', 'All benefits will be removed.')}
                        </p>
                        <div className="flex gap-2">
                            <button onClick={() => setAction(null)} className="flex-1 border-2 border-gray-200 py-2.5 rounded-xl text-sm">{t('না, থাকুক', 'No, keep it')}</button>
                            <button onClick={() => { setDone(action === 'pause' ? t('প্ল্যান পজ করা হয়েছে।', 'Plan paused successfully.') : t('প্ল্যান বাতিল করা হয়েছে।', 'Plan cancelled.')); setAction(null); }}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white ${action === 'pause' ? 'bg-amber-500' : 'bg-emergency'}`}>
                                {t('হ্যাঁ, নিশ্চিত করুন', 'Yes, confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Plan comparison */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <h3 className="font-bold text-gray-800 mb-3">{t('অন্যান্য প্ল্যান', 'Other plans')}</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[{ n: 'এককালীন সেবা', en: 'One-time', p: '৳৮০০', desc: 'প্রতিটি সেবায়' },
                    { n: 'প্রিমিয়াম কেয়ার', en: 'Premium', p: '৳৮,৫০০', desc: 'প্রতি মাসে, সব ফিচার' }].map(p => (
                        <div key={p.n} className="border border-gray-200 rounded-xl p-3">
                            <div className="font-semibold text-sm text-gray-800">{t(p.n, p.en)}</div>
                            <div className="text-primary font-bold">{p.p}</div>
                            <div className="text-xs text-gray-400">{p.desc}</div>
                            <Link href="/pricing" className="mt-2 text-xs text-primary font-bold hover:underline">{t('পরিবর্তন করুন', 'Switch')}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
