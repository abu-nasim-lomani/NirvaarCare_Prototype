'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, HeartPulse, Pill, Activity, Stethoscope, Car, HandHeart } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const SERVICES = [
    { slug: 'diagnostic', titleEn: 'Diagnostic Service', titleBn: 'ডায়াগনস্টিক সেবা', icon: Activity, descEn: 'Home sample collection & tests', descBn: 'বাসা থেকে স্যাম্পল সংগ্রহ এবং টেস্ট রিপোর্ট', cat: 'medical' },
    { slug: 'doctor', titleEn: 'Doctor Consultation', titleBn: 'চিকিৎসক সেবা', icon: Stethoscope, descEn: 'Specialist doctors at home or video call', descBn: 'বিশেষজ্ঞ ডাক্তার হোম ভিজিট বা টেলিমেডিসিন', cat: 'medical' },
    { slug: 'medicine', titleEn: 'Medicine Delivery', titleBn: 'ঔষধ ডেলিভারি', icon: Pill, descEn: 'Fast medicine delivery from partner pharmacies', descBn: 'দ্রুত ঔষধ এবং হেলথ রিকোয়ারমেন্ট ডেলিভারি', cat: 'delivery' },
    { slug: 'emergency', titleEn: 'Emergency Care', titleBn: 'জরুরি সেবা', icon: HeartPulse, descEn: '24/7 Ambulance & emergency support', descBn: 'সার্বক্ষণিক অ্যাম্বুলেন্স এবং ফার্স্ট এইড', cat: 'emergency' },
    { slug: 'daily', titleEn: 'Daily Needs', titleBn: 'দৈনন্দিন প্রয়োজন', icon: Car, descEn: 'Hospital transport, billing & errands', descBn: 'হাসপাতালে যাতায়াত, বাজার এবং আনুষঙ্গিক সাহায্য', cat: 'lifestyle' },
    { slug: 'companion', titleEn: 'Senior Companion', titleBn: 'মানসিক সঙ্গ', icon: HandHeart, descEn: 'Conversation, reading & walking companion', descBn: 'শারীরিক বা মানসিক সাপোর্ট, গল্প করা এবং যত্ন', cat: 'lifestyle' },
];

export default function ServicesPage() {
    const { t } = useLang();
    const [q, setQ] = useState('');
    const [cat, setCat] = useState('all');

    const filtered = SERVICES.filter(s => (cat === 'all' || s.cat === cat) && (s.titleBn.includes(q) || s.titleEn.toLowerCase().includes(q.toLowerCase())));

    return (
        <div className="pb-20">
            <div className="bg-primary-dark pt-32 pb-16 px-4 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-black mb-4">{t('আমাদের সেবাসমূহ', 'Our Services')}</h1>
                <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">{t('আপনার প্রিয়জনের প্রতিটি প্রয়োজনে নির্ভার কেয়ার আছে পাশে।', 'NirvaarCare is here for every need of your loved ones.')}</p>

                {/* Search & Filter Bar */}
                <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input value={q} onChange={e => setQ(e.target.value)} className="w-full bg-white text-gray-800 rounded-full pl-12 pr-4 py-4 focus:outline-none" placeholder={t('সেবা খুঁজুন...', 'Search services...')} />
                    </div>
                    <select value={cat} onChange={e => setCat(e.target.value)} className="bg-white text-gray-800 rounded-full px-6 py-4 focus:outline-none font-bold border-r-8 border-transparent">
                        <option value="all">{t('সব ক্যাটেগরি', 'All Categories')}</option>
                        <option value="medical">{t('মেডিকেল', 'Medical')}</option>
                        <option value="lifestyle">{t('লাইফস্টাইল', 'Lifestyle')}</option>
                        <option value="delivery">{t('ডেলিভারি', 'Delivery')}</option>
                    </select>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((service, idx) => (
                        <Link key={idx} href={`/services/${service.slug}`} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 card-hover group block relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-black text-primary-dark mb-3">{t(service.titleBn, service.titleEn)}</h3>
                            <p className="text-gray-600 mb-6 line-clamp-2">{t(service.descBn, service.descEn)}</p>
                            <div className="flex items-center text-primary font-bold text-sm">
                                {t('বিস্তারিত দেখুন', 'View Details')} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </div>
                        </Link>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100 mt-8">
                            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">{t('কোনো সেবা পাওয়া যায়নি', 'No services found')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
