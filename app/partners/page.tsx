'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Package, CheckCircle, Clock, Upload } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const ORDERS = [
    { id: 'ORD-001', client: 'রাহেলা বেগম', type: 'রক্ত পরীক্ষা', items: ['CBC', 'Blood Sugar', 'HbA1c'], date: '৯ মার্চ', status: 'pending' },
    { id: 'ORD-002', client: 'আহমেদ রেজা', type: 'ঔষধ', items: ['Metformin 500mg x 30', 'Amlodipine 5mg x 30'], date: '৮ মার্চ', status: 'fulfilled' },
    { id: 'ORD-003', client: 'বেগম সালেহা', type: 'আল্ট্রাসাউন্ড', items: ['Abdomen USG'], date: '৮ মার্চ', status: 'pending' },
];

export default function PartnersPage() {
    const { t } = useLang();
    const [orders, setOrders] = useState(ORDERS);
    const [fulfilling, setFulfilling] = useState<string | null>(null);

    const fulfill = (id: string) => {
        setOrders(os => os.map(o => o.id === id ? { ...o, status: 'fulfilled' } : o));
        setFulfilling(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-primary-dark">{t('পার্টনার ড্যাশবোর্ড', 'Partner Dashboard')}</h1>
                    <p className="text-sm text-gray-500 mt-1">{t('ABC ফার্মেসি & ডায়াগনস্টিক', 'ABC Pharmacy & Diagnostic')}</p>
                </div>
                <Link href="/partners/upload" className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors">
                    <Upload className="w-4 h-4" /> {t('রিপোর্ট আপলোড', 'Upload Report')}
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[{ v: '৩', l: 'অপেক্ষায়', c: 'bg-amber-50 text-amber-600' }, { v: '১২', l: 'এই মাসে', c: 'bg-green-50 text-success' }, { v: '৪.৭⭐', l: 'রেটিং', c: 'bg-blue-50 text-primary' }].map(s => (
                    <div key={s.l} className={`rounded-2xl p-4 ${s.c}`}>
                        <div className="text-2xl font-black">{s.v}</div>
                        <div className="text-xs opacity-70">{s.l}</div>
                    </div>
                ))}
            </div>

            {/* Fulfillment modal */}
            {fulfilling && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="text-3xl text-center mb-3">📤</div>
                        <h3 className="font-bold text-center text-primary-dark mb-2">{t('অর্ডার পূরণ নিশ্চিত করুন', 'Confirm Order Fulfillment')}</h3>
                        <p className="text-sm text-gray-500 text-center mb-5">{t('অর্ডারটি সম্পন্ন হিসেবে চিহ্নিত করবেন?', 'Mark this order as complete?')}</p>
                        <div className="flex gap-2">
                            <button onClick={() => setFulfilling(null)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm">{t('না', 'No')}</button>
                            <button onClick={() => fulfill(fulfilling)} className="flex-1 bg-success text-white py-2.5 rounded-xl text-sm font-bold">{t('হ্যাঁ, সম্পন্ন', 'Yes, Complete')}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Orders */}
            <h2 className="font-bold text-gray-800 mb-3">{t('অর্ডার তালিকা', 'Order List')}</h2>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className={`bg-white rounded-2xl border-2 p-5 ${order.status === 'pending' ? 'border-primary/30' : 'border-gray-100'}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <span className="text-xs bg-primary/10 text-primary font-mono font-bold px-2 py-0.5 rounded">{order.id}</span>
                                <h3 className="font-bold text-gray-800 mt-1">{order.client}</h3>
                                <div className="text-sm text-primary font-medium">{order.type}</div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1"><Clock className="w-3 h-3" />{order.date}</div>
                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${order.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-success'}`}>
                                    {order.status === 'pending' ? t('অপেক্ষায়', 'Pending') : t('✓ সম্পন্ন', '✓ Done')}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 mb-3">
                            <div className="text-xs text-gray-400 mb-1">{t('আইটেমসমূহ', 'Items')}</div>
                            {order.items.map(item => (
                                <div key={item} className="flex items-center gap-1.5 text-sm text-gray-700"><Package className="w-3 h-3 text-primary flex-shrink-0" />{item}</div>
                            ))}
                        </div>

                        {order.status === 'pending' && (
                            <div className="flex gap-2">
                                <Link href="/partners/upload" className="flex-1 flex items-center justify-center gap-1.5 border border-primary text-primary py-2.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-colors">
                                    <Upload className="w-4 h-4" /> {t('রিপোর্ট আপলোড', 'Upload Report')}
                                </Link>
                                <button onClick={() => setFulfilling(order.id)} className="flex-1 flex items-center justify-center gap-1.5 bg-success text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">
                                    <CheckCircle className="w-4 h-4" /> {t('সম্পন্ন করুন', 'Mark Fulfilled')}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
