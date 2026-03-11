'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Check, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const PLANS = [
    {
        id: 'onetime', name: 'এককালীন সেবা', nameEn: 'One-time Service', price: '৳৮০০',
        period: 'প্রতি সেবায়', periodEn: 'per service', color: 'border-gray-200',
        highlight: false, badge: '',
        features: [
            { label: 'যেকোনো সার্ভিস বুক', have: true },
            { label: 'লাইভ ট্র্যাকিং', have: true },
            { label: 'বুকিং কনফার্মেশন', have: true },
            { label: 'মেডিকেল ভল্ট', have: false },
            { label: 'ডেডিকেটেড কেয়ারগিভার', have: false },
            { label: 'অগ্রাধিকার সহায়তা', have: false },
            { label: 'ফ্যামিলি শেয়ারিং', have: false },
            { label: '২৪/৭ মনিটরিং', have: false },
        ]
    },
    {
        id: 'basic', name: 'বেসিক মাসিক', nameEn: 'Basic Monthly', price: '৳৩,৫০০',
        period: 'প্রতি মাসে', periodEn: 'per month', color: 'border-primary',
        highlight: true, badge: '🔥 জনপ্রিয়',
        features: [
            { label: 'যেকোনো সার্ভিস বুক', have: true },
            { label: 'লাইভ ট্র্যাকিং', have: true },
            { label: 'বুকিং কনফার্মেশন', have: true },
            { label: 'মেডিকেল ভল্ট', have: true },
            { label: 'ডেডিকেটেড কেয়ারগিভার', have: false },
            { label: 'অগ্রাধিকার সহায়তা', have: true },
            { label: 'ফ্যামিলি শেয়ারিং', have: false },
            { label: '২৪/৭ মনিটরিং', have: false },
        ]
    },
    {
        id: 'premium', name: 'প্রিমিয়াম কেয়ার', nameEn: 'Premium Care', price: '৳৮,৫০০',
        period: 'প্রতি মাসে', periodEn: 'per month', color: 'border-accent',
        highlight: false, badge: '⭐ সেরা',
        features: [
            { label: 'যেকোনো সার্ভিস বুক', have: true },
            { label: 'লাইভ ট্র্যাকিং', have: true },
            { label: 'বুকিং কনফার্মেশন', have: true },
            { label: 'মেডিকেল ভল্ট', have: true },
            { label: 'ডেডিকেটেড কেয়ারগিভার', have: true },
            { label: 'অগ্রাধিকার সহায়তা', have: true },
            { label: 'ফ্যামিলি শেয়ারিং', have: true },
            { label: '২৪/৭ মনিটরিং', have: true },
        ]
    },
];

const FAQS = [
    { q: 'আমি কি যেকোনো সময় প্যাকেজ পরিবর্তন করতে পারব?', a: 'হ্যাঁ, আপনি যেকোনো সময় আপগ্রেড, ডাউনগ্রেড বা প্যাকেজ বাতিল করতে পারবেন।' },
    { q: 'পেমেন্ট কোন পদ্ধতিতে করতে পারব?', a: 'bKash, নগদ, রকেট, Visa/Mastercard কার্ড — সব পদ্ধতিতে পেমেন্ট করা যাবে।' },
    { q: 'কেয়ারগিভার কি সত্যিই যাচাইকৃত?', a: 'হ্যাঁ, প্রতিটি কেয়ারগিভার NID যাচাই, পুলিশ ভেরিফিকেশন এবং ট্রেনিং সম্পন্ন করে থাকেন।' },
    { q: 'বিদেশ থেকে কি পেমেন্ট করা যাবে?', a: 'হ্যাঁ, NRB ক্লায়েন্টদের জন্য আন্তর্জাতিক কার্ড পেমেন্টের সুবিধা আছে।' },
];

export default function PricingPage() {
    const { t } = useLang();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div>
            <div className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 text-center">
                <h1 className="text-4xl font-black mb-3">{t('প্যাকেজ ও মূল্য', 'Pricing & Packages')}</h1>
                <p className="text-blue-100">{t('আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজটি বেছে নিন', 'Choose the right package for your needs')}</p>
            </div>

            {/* Plans */}
            <section className="py-16 max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6">
                    {PLANS.map(plan => (
                        <div key={plan.id} className={`relative bg-white rounded-3xl border-2 p-6 ${plan.color} ${plan.highlight ? 'shadow-2xl shadow-primary/20 scale-[1.02]' : 'shadow-sm'}`}>
                            {plan.badge && <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.highlight ? 'bg-primary' : 'bg-accent'} text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap`}>{plan.badge}</div>}
                            <h3 className="font-black text-xl text-primary-dark mb-1">{t(plan.name, plan.nameEn)}</h3>
                            <div className="flex items-end gap-1 mb-1">
                                <span className="text-4xl font-black text-primary">{plan.price}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-6">{t(plan.period, plan.periodEn)}</p>
                            <ul className="space-y-2.5 mb-6">
                                {plan.features.map(f => (
                                    <li key={f.label} className="flex items-center gap-2 text-sm">
                                        {f.have ? <Check className="w-4 h-4 text-success flex-shrink-0" /> : <X className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                                        <span className={f.have ? 'text-gray-700' : 'text-gray-300'}>{f.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/login" className={`block text-center py-3 rounded-xl font-bold transition-all hover:scale-105 ${plan.highlight ? 'bg-primary text-white hover:bg-primary-dark' : plan.id === 'premium' ? 'bg-accent text-white hover:bg-yellow-500' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}>
                                {t('এই প্যাকেজ নিন', 'Get this plan')} <ArrowRight className="inline w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 bg-bg max-w-3xl mx-auto px-4 pb-16">
                <h2 className="text-2xl font-black text-center text-primary-dark mb-8">{t('সাধারণ প্রশ্ন', 'Frequently Asked Questions')}</h2>
                <div className="space-y-3">
                    {FAQS.map((faq, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                                <span className="font-medium text-gray-800 text-sm">{faq.q}</span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                            </button>
                            {openFaq === i && <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
