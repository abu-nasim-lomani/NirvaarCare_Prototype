'use client';
import Link from 'next/link';
import { Heart, Activity, ShieldCheck, Search, Filter } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const ALL_CAMPAIGNS = [
    { id: 'c1', name: 'কাসেমের হার্ট সার্জারি', need: 'Heart Surgery for Kasem', amount: 150000, raised: 120000, daysLeft: 5, category: 'Surgery', img: '❤️', isUrgent: true, isZakat: true },
    { id: 'c2', name: 'জামিলার ৩ মাসের ওষুধ', need: '3 Months Medicine for Jamila', amount: 12000, raised: 4500, daysLeft: 12, category: 'Medicine', img: '💊', isUrgent: false, isZakat: true },
    { id: 'c3', name: 'রহিম চাচার হুইলচেয়ার', need: 'Wheelchair for Rahim Uncle', amount: 8500, raised: 8500, daysLeft: 0, category: 'Equipment', img: '🦽', isUrgent: false, isZakat: false },
    { id: 'c4', name: 'হাসানের ক্যান্সার চিকিৎসা', need: 'Cancer Treatment for Hasan', amount: 500000, raised: 250000, daysLeft: 20, category: 'Surgery', img: '🏥', isUrgent: true, isZakat: true },
    { id: 'c5', name: 'অরফানেজ ফুড প্রোগ্রাম', need: 'Orphanage Food Program', amount: 50000, raised: 50000, daysLeft: 0, category: 'Food', img: '🍲', isUrgent: false, isZakat: true },
    { id: 'c6', name: 'জরুরি অক্সিজেন সিলিন্ডার', need: 'Emergency Oxygen Cylinders', amount: 45000, raised: 10000, daysLeft: 3, category: 'Equipment', img: '🫁', isUrgent: true, isZakat: false },
];

export default function CampaignsListPage() {
    const { t } = useLang();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-10 pb-20 px-4">
            <div className="max-w-6xl mx-auto w-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-gray-800 mb-2">{t('সব ক্যাম্পেইন', 'All Campaigns')}</h1>
                        <p className="text-gray-500">{t('যেকোনো একটি ক্যাম্পেইনে আপনার সামর্থ্য অনুযায়ী সাহায্য করুন', 'Help according to your ability in any of these campaigns')}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder={t('খুঁজুন...', 'Search...')}
                                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-primary transition-colors text-sm"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        <button className="bg-white border border-gray-200 p-2.5 rounded-xl hover:bg-gray-50 text-gray-600">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Campaigns Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_CAMPAIGNS.map(camp => {
                        const percent = Math.min(100, Math.round((camp.raised / camp.amount) * 100));
                        const isDone = camp.raised >= camp.amount;
                        return (
                            <Link href={`/foundation/campaign/${camp.id}`} key={camp.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group flex flex-col">
                                <div className="h-48 bg-gray-100 relative flex items-center justify-center text-6xl">
                                    {camp.img}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-primary shadow-sm">
                                            {camp.category}
                                        </div>
                                        {camp.isZakat && (
                                            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-xs font-bold shadow-sm border border-emerald-100 flex items-center gap-1">
                                                ✨ Zakat Eligible
                                            </div>
                                        )}
                                    </div>
                                    {camp.isUrgent && (
                                        <div className="absolute top-4 right-4 bg-emergency text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm animate-pulse">
                                            URGENT
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">{t(camp.name, camp.need)}</h3>

                                    <div className="mt-auto">
                                        <div className="flex justify-between text-sm font-bold mb-2">
                                            <span className="text-primary">৳{(camp.raised).toLocaleString()}</span>
                                            <span className="text-gray-400">Target ৳{(camp.amount).toLocaleString()}</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                            <div className={`h-full rounded-full ${isDone ? 'bg-success' : 'bg-primary'}`} style={{ width: `${percent}%` }} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs text-gray-500 font-medium">
                                                {isDone ? <span className="text-success flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> {t('ফান্ড সম্পন্ন', 'Fully Funded')}</span> : <span>{camp.daysLeft} {t('দিন বাকি', 'days left')}</span>}
                                            </div>
                                            <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold">
                                                {isDone ? t('বিস্তারিত দেখুন', 'View Details') : t('দান করুন', 'Donate Now')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}
