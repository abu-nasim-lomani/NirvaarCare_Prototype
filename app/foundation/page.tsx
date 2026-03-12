'use client';
import Link from 'next/link';
import { Heart, ArrowRight, ShieldCheck, Activity, Users, ChevronRight } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const CAMPAIGNS = [
    { id: 'c1', name: 'কাসেমের হার্ট সার্জারি', need: 'Heart Surgery for Kasem', amount: 150000, raised: 120000, daysLeft: 5, category: 'Surgery', img: '❤️', isUrgent: true, isZakat: true },
    { id: 'c2', name: 'জামিলার ৩ মাসের ওষুধ', need: '3 Months Medicine for Jamila', amount: 12000, raised: 4500, daysLeft: 12, category: 'Medicine', img: '💊', isUrgent: false, isZakat: true },
    { id: 'c3', name: 'রহিম চাচার হুইলচেয়ার', need: 'Wheelchair for Rahim Uncle', amount: 8500, raised: 8500, daysLeft: 0, category: 'Equipment', img: '🦽', isUrgent: false, isZakat: false },
];

export default function FoundationLandingPage() {
    const { t } = useLang();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-primary text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-teal-100 text-sm font-medium border border-white/20 mb-6">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        {t('১০০% স্বচ্ছ ডোনেশন ট্র্যাকিং', '100% Transparent Donation Tracking')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        {t('নির্ভার কেয়ার', 'Nirvaar Care')} <span className="text-teal-300">{t('ফাউন্ডেশন', 'Foundation')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto mb-10 opacity-90">
                        {t('আপনার দেওয়া প্রতিটি টাকার হিসাব থাকবে আপনার চোখের সামনে। আমরা বিশ্বাস করি, স্বচ্ছতাই পারে মানবতাকে আরও একধাপ এগিয়ে নিতে।', 'Every penny you donate is tracked right before your eyes. We believe transparency takes humanity one step further.')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/foundation/dashboard" className="bg-white text-teal-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl shadow-teal-900/20 flex items-center justify-center gap-2">
                            <Heart className="w-5 h-5 text-emergency" fill="currentColor" /> {t('আমার ওয়ালেট দেখুন', 'View My Wallet')}
                        </Link>
                        <button className="bg-teal-700/50 border border-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                            {t('জেনারেল ফান্ডে দান করুন', 'Donate to General Fund')}
                        </button>
                        <Link href="/foundation/transparency" className="bg-teal-700/50 border border-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                            <ShieldCheck className="w-5 h-5" /> {t('ট্রান্সপারেন্সি দেখুন', 'View Transparency')}
                        </Link>
                    </div>

                    {/* Quick trust links */}
                    <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
                        <Link href="/foundation/stories" className="flex items-center gap-1.5 text-teal-200 hover:text-white text-sm font-bold transition-colors underline underline-offset-4">
                            ❤️ {t('সুস্থতার গল্প', 'Recovery Stories')}
                        </Link>
                        <span className="text-teal-600">·</span>
                        <Link href="/foundation/transparency" className="flex items-center gap-1.5 text-teal-200 hover:text-white text-sm font-bold transition-colors underline underline-offset-4">
                            <ShieldCheck className="w-4 h-4" /> {t('পাবলিক অডিট রিপোর্ট', 'Public Audit Report')}
                        </Link>
                        <span className="text-teal-600">·</span>
                        <Link href="/foundation/apply" className="flex items-center gap-1.5 text-teal-200 hover:text-white text-sm font-bold transition-colors underline underline-offset-4">
                            {t('সাহায্যের জন্য আবেদন করুন', 'Apply for Help')}
                        </Link>
                    </div>

                    {/* Live Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pb-8 border-b border-white/10">
                        {[{ v: '৳ ১২.৫ লাখ', l: 'মোট ফান্ড রেইজড', en: 'Total Funds Raised' }, { v: '৩,৪২০', l: 'মোট ডোনার', en: 'Total Donors' }, { v: '১৪৫+', l: 'রোগী সুস্থ হয়েছেন', en: 'Patients Recovered' }, { v: '১০০%', l: 'স্বচ্ছতা গ্যারান্টি', en: 'Transparency Guarantee' }].map(s => (
                            <div key={s.l} className="text-center">
                                <div className="text-3xl font-black text-white mb-1">{s.v}</div>
                                <div className="text-xs text-teal-200 uppercase tracking-wider font-bold">{t(s.l, s.en)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works (Micro-tracking) */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-800 mb-4">{t('কীভাবে আমাদের ট্রান্সপারেন্সি কাজ করে?', 'How our transparency works?')}</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">{t('আপনার দানের একটি টাকাও কোথায় যাচ্ছে তা আপনি নিজে দেখতে পাবেন।', 'You can see exactly where every single Taka of your donation is going.')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[{ step: '১', title: 'ওয়ালেটে টাকা দিন', enTitle: 'Fund Your Wallet', desc: 'নগদ বা কার্ডের মাধ্যমে আপনার নিজস্ব ডোনেশন ওয়ালেটে টাকা জমা রাখুন।', enDesc: 'Deposit funds into your personal donation wallet securely.', icon: <Heart className="w-8 h-8 text-primary" /> },
                        { step: '২', title: 'রোগী নির্বাচন করুন', enTitle: 'Select a Patient', desc: 'যে রোগীর টাকার প্রয়োজন, তাকে নির্বাচন করে আপনার ওয়ালেট থেকে ফান্ড দিন।', enDesc: 'Choose a patient in need and allocate funds from your wallet.', icon: <Users className="w-8 h-8 text-primary" /> },
                        { step: '৩', title: 'রসিদ ট্র্যাকিং', enTitle: 'Receipt Tracking', desc: 'ডাক্তার বা ওষুধের বিলের রসিদ সরাসরি আপনার টাইমলাইনে দেখতে পাবেন।', enDesc: 'View doctor or pharmacy receipt scans directly on your timeline.', icon: <Activity className="w-8 h-8 text-primary" /> }]
                            .map((f, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-3xl p-8 relative overflow-hidden group hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20">
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                        {f.icon}
                                    </div>
                                    <div className="absolute top-6 right-8 text-5xl font-black text-gray-200 group-hover:text-primary/10 transition-colors">{f.step}</div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{t(f.title, f.enTitle)}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">{t(f.desc, f.enDesc)}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Active Campaigns */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-gray-800 mb-2">{t('জরুরি ফান্ডিং প্রয়োজন', 'Urgent Funding Needed')}</h2>
                            <p className="text-gray-500">{t('যেকোনো একটি ক্যাম্পেইনে আপনার সামর্থ্য অনুযায়ী সাহায্য করুন', 'Help according to your ability in any of these campaigns')}</p>
                        </div>
                        <Link href="/foundation/campaigns" className="hidden md:flex items-center gap-1 font-bold text-primary hover:text-primary-dark">
                            {t('সবগুলো দেখুন', 'View All')} <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {CAMPAIGNS.map(camp => {
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
            </section>

            {/* Apply CTA Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-primary rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
                        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full" />
                        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full" />
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div>
                                <div className="text-teal-300 font-bold text-sm uppercase tracking-widest mb-3">{t('সাহায্য দরকার?', 'Need Help?')}</div>
                                <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3">
                                    {t('আপনার রোগীর জন্য আবেদন করুন', 'Apply for Your Patient')}
                                </h2>
                                <p className="text-teal-100 text-sm max-w-md">
                                    {t('রোগী নিজে, পরিবারের কেউ, অথবা যেকোনো শুভাকাঙ্ক্ষী ফাউন্ডেশনে সাহায্যের জন্য আবেদন করতে পারবেন।', 'The patient, a family member, or any well-wisher can apply for assistance from the Foundation.')}
                                </p>
                            </div>
                            <Link href="/foundation/apply" className="shrink-0 bg-white text-teal-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl shadow-teal-900/20 flex items-center gap-2 whitespace-nowrap">
                                <Heart className="w-5 h-5" fill="currentColor" />
                                {t('আবেদন করুন', 'Apply Now')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
