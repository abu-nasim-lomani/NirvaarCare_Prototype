'use client';
import { Download, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const PAYMENTS = [
    { id: 'INV-2024-031', service: 'ডায়াগনস্টিক সেবা', date: '৮ মার্চ ২০২৬', amount: '৳৮০০', method: 'bKash', status: 'paid' },
    { id: 'INV-2024-030', service: 'চিকিৎসক সেবা', date: '৫ মার্চ ২০২৬', amount: '৳৬০০', method: 'Card', status: 'paid' },
    { id: 'INV-2024-029', service: 'বেসিক মাসিক (ফেব.)', date: '১ মার্চ ২০২৬', amount: '৳৩,৫০০', method: 'নগদ', status: 'paid' },
    { id: 'INV-2024-028', service: 'ঔষধ সেবা', date: '২৫ ফেব্রুয়ারি', amount: '৳৩০০', method: 'Cash', status: 'paid' },
    { id: 'INV-2024-027', service: 'মানসিক সঙ্গ', date: '২০ ফেব্রুয়ারি', amount: '৳৪০০', method: 'bKash', status: 'refunded' },
];

export default function PaymentsPage() {
    const { t } = useLang();
    const total = PAYMENTS.filter(p => p.status === 'paid').reduce((s, p) => s + parseInt(p.amount.replace(/[৳,]/g, '')), 0);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black text-primary-dark mb-2">{t('পেমেন্ট হিস্ট্রি', 'Payment History')}</h1>
            <p className="text-gray-500 text-sm mb-6">{t('সব ইনভয়েস ও লেনদেনের রেকর্ড', 'All invoices and transaction records')}</p>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { icon: ArrowDown, label: 'মোট খরচ', en: 'Total Spent', val: `৳${total.toLocaleString('bn')}`, color: 'bg-blue-50 text-primary' },
                    { icon: ArrowDown, label: 'এই মাসে', en: 'This Month', val: '৳৪,৯০০', color: 'bg-green-50 text-success' },
                    { icon: Download, label: 'ইনভয়েস', en: 'Invoices', val: `${PAYMENTS.length}টি`, color: 'bg-amber-50 text-accent' },
                ].map(s => (
                    <div key={s.label} className={`rounded-2xl p-4 ${s.color}`}>
                        <s.icon className="w-5 h-5 mb-1 opacity-70" />
                        <div className="font-black text-lg">{s.val}</div>
                        <div className="text-xs opacity-70">{t(s.label, s.en)}</div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-800">{t('লেনদেনের তালিকা', 'Transactions')}</span>
                    <button className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-primary">
                        <Filter className="w-3 h-3" /> {t('ফিল্টার', 'Filter')}
                    </button>
                </div>
                <div className="divide-y divide-gray-50">
                    {PAYMENTS.map(p => (
                        <div key={p.id} className="px-4 py-3 flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${p.status === 'paid' ? 'bg-green-100 text-success' : 'bg-red-100 text-emergency'}`}>
                                {p.status === 'paid' ? '✅' : '↩️'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-gray-800">{p.service}</div>
                                <div className="text-xs text-gray-400">{p.id} • {p.date} • {p.method}</div>
                            </div>
                            <div className="text-right">
                                <div className={`font-bold ${p.status === 'refunded' ? 'text-emergency line-through' : ''}`}>{p.amount}</div>
                                {p.status === 'refunded' && <div className="text-xs text-emergency">{t('ফেরত দেওয়া হয়েছে', 'Refunded')}</div>}
                            </div>
                            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-primary transition-colors">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
