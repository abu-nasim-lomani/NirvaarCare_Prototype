'use client';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const SERVICE_DATA: Record<string, { emoji: string; title: string; en: string; color: string; features: string[]; howItWorks: string[]; price: string }> = {
    diagnostic: {
        emoji: '🔬', title: 'ডায়াগনস্টিক ও মেডিকেল পরীক্ষা সেবা', en: 'Diagnostic & Medical Test Service',
        color: 'from-blue-600 to-blue-800', price: '৳৮০০ থেকে',
        features: ['ডায়াগনস্টিক সেন্টারে যাতায়াত সহায়তা', 'সার্বিক তত্ত্বাবধান ও সমন্বয়', 'ঘরে বসে নমুনা সংগ্রহের ব্যবস্থা', 'পার্টনার সেন্টারে অগ্রাধিকার সময়', 'রিপোর্ট সংগ্রহ ও ভল্টে আপলোড', 'ডাক্তারের সাথে ফলাফল আলোচনায় সহায়তা'],
        howItWorks: ['সেবা বুক করুন ও তারিখ নির্ধারণ করুন', 'কেয়ারগিভার বাসায় এসে নিয়ে যাবেন', 'পরীক্ষার সময় পাশে থাকবেন', 'রিপোর্ট সংগ্রহ করে ভল্টে আপলোড করবেন'],
    },
    doctor: {
        emoji: '👨‍⚕️', title: 'চিকিৎসক সম্পর্কিত সেবা', en: 'Doctor Related Service',
        color: 'from-red-600 to-red-800', price: '৳৬০০ থেকে',
        features: ['সরাসরি সাক্ষাতের সময় নির্ধারণ', 'হাসপাতালে যাতায়াত ও সহায়তা', 'অনলাইন টেলিমেডিসিন পরামর্শ', 'স্পেশালিস্ট ডাক্তার রেফারেল', 'প্রেসক্রিপশন ভল্টে সংরক্ষণ', 'ফলো-আপ মনে করিয়ে দেওয়া'],
        howItWorks: ['ডাক্তারের ধরন ও সময় নির্বাচন করুন', 'In-person বা Telemedicine বেছে নিন', 'কেয়ারগিভার সব সমন্বয় করবেন', 'ভিজিট শেষে রিপোর্ট আপলোড হবে'],
    },
    medicine: {
        emoji: '💊', title: 'ঔষধ সম্পর্কিত সেবা', en: 'Medicine Service',
        color: 'from-green-600 to-green-800', price: '৳৩০০ থেকে',
        features: ['প্রেসক্রিপশন আপলোড করে অর্ডার', 'নির্ভরযোগ্য ফার্মেসি থেকে সংগ্রহ', 'বাসায় সময়মতো পৌঁছে দেওয়া', 'সেবনের সময়সূচি মনে করিয়ে দেওয়া', 'স্টক শেষ হলে স্বয়ংক্রিয় রিঅর্ডার', 'ডাক্তারের পরামর্শ সমন্বয়'],
        howItWorks: ['প্রেসক্রিপশন আপলোড করুন বা ওষুধ লিস্ট দিন', 'যাচাইকৃত ফার্মেসি থেকে সংগ্রহ হবে', 'নির্ধারিত সময়ে বাসায় পৌঁছাবে', 'সেবন ট্র্যাক করা হবে'],
    },
    emergency: {
        emoji: '🚑', title: 'জরুরি পরিস্থিতি সেবা', en: 'Emergency Service',
        color: 'from-red-700 to-rose-900', price: 'বিনামূল্যে (SOS)',
        features: ['SOS বাটন চাপলে তাৎক্ষণিক সাড়া', 'অ্যাম্বুলেন্স ডিসপ্যাচ ব্যবস্থা', 'নিকটতম হাসপাতালে ভর্তি সহায়তা', 'হাসপাতালে অ্যাটেনডেন্ট প্রদান', 'পরিবারকে তাৎক্ষণিক বিজ্ঞপ্তি', 'সার্বক্ষণিক সমন্বয় ও তত্ত্বাবধান'],
        howItWorks: ['SOS বাটন চাপুন বা কল করুন', 'অ্যাডমিন টিম তাৎক্ষণিক সাড়া দেবেন', 'অ্যাম্বুলেন্স ও কেয়ারগিভার পাঠানো হবে', 'পরিবারকে আপডেট দেওয়া হবে'],
    },
    daily: {
        emoji: '🛒', title: 'দৈনন্দিন প্রয়োজন সেবা', en: 'Daily Needs Service',
        color: 'from-orange-600 to-orange-800', price: '৳৫০০ থেকে',
        features: ['বাজার করা ও বহন সহায়তা', 'ব্যাংক, পোস্ট অফিস, সরকারি দপ্তরে যাতায়াত', 'আত্মীয়ের বাড়ি ও সামাজিক অনুষ্ঠানে সহায়তা', 'মার্কেটে কেনাকাটায় সহকারী', 'পরিবহন ব্যবস্থা ও সহকারী একসাথে', 'নিরাপদ ও ভরসাযোগ্য সঙ্গী'],
        howItWorks: ['গন্তব্য ও সময় নির্ধারণ করুন', 'সহকারী বাসায় এসে নিয়ে যাবেন', 'পুরো যাত্রায় সাথে থাকবেন', 'নিরাপদে বাসায় ফিরিয়ে দেবেন'],
    },
    companion: {
        emoji: '🤝', title: 'মানসিক সঙ্গ ও সুস্থতা সেবা', en: 'Mental Companion & Wellness',
        color: 'from-purple-600 to-purple-800', price: '৳৪০০ থেকে',
        features: ['ব্যক্তিত্ব মিলিয়ে সঙ্গী নির্বাচন', 'প্রতিদিন সঙ্গ দেওয়া ও গল্প করা', 'বই বা পত্রিকা পড়ে শোনানো', 'প্রশিক্ষিত কাউন্সেলিং সেশন', 'শখের কাজে উৎসাহ দেওয়া', 'মানসিক স্বাস্থ্য মনিটরিং'],
        howItWorks: ['শখ, ভাষা, ব্যক্তিত্ব মিলিয়ে সঙ্গী বাছুন', 'সাপ্তাহিক সেশন শিডিউল করুন', 'প্রতিটি সেশনের পর রিপোর্ট পাবেন', 'নিয়মিত প্রগ্রেস ট্র্যাক হবে'],
    },
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    const { t } = useLang();
    const svc = SERVICE_DATA[params.slug];
    if (!svc) return <div className="p-16 text-center text-gray-400">Service not found.</div>;

    return (
        <div>
            {/* Hero */}
            <div className={`bg-gradient-to-br ${svc.color} text-white py-16`}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="text-6xl mb-4">{svc.emoji}</div>
                    <h1 className="text-4xl font-black mb-3">{t(svc.title, svc.en)}</h1>
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                        💰 {svc.price}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Features */}
                    <div>
                        <h2 className="text-2xl font-black text-primary-dark mb-5">{t('এই সেবায় কী পাবেন?', "What's included?")}</h2>
                        <ul className="space-y-3">
                            {svc.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700 text-sm">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* How it works */}
                    <div>
                        <h2 className="text-2xl font-black text-primary-dark mb-5">{t('কীভাবে কাজ করে?', 'How does it work?')}</h2>
                        <div className="space-y-4">
                            {svc.howItWorks.map((step, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                                    <div className="bg-white rounded-xl p-3 border border-gray-100 flex-1 text-sm text-gray-700 shadow-sm">{step}</div>
                                </div>
                            ))}
                        </div>

                        {/* CTA card */}
                        <div className="mt-8 bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 text-center">
                            <h3 className="font-black text-primary-dark text-lg mb-2">{t('এই সেবা বুক করুন', 'Book this service')}</h3>
                            <p className="text-gray-500 text-sm mb-4">{t('আজই বুক করুন, ৬০ মিনিটের মধ্যে কেয়ারগিভার পাঠানো হবে।', 'Book today, caregiver within 60 minutes.')}</p>
                            <Link href="/dashboard/book" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors hover:scale-105">
                                {t('এখনই বুক করুন', 'Book Now')} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Other services */}
                <div className="mt-16">
                    <h2 className="text-xl font-black text-primary-dark mb-5">{t('আমাদের অন্যান্য সেবা', 'Our other services')}</h2>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(SERVICE_DATA).filter(([slug]) => slug !== params.slug).map(([slug, s]) => (
                            <Link key={slug} href={`/services/${slug}`} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors">
                                {s.emoji} {t(s.title.split(' ')[0], s.en.split(' ')[0])}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
