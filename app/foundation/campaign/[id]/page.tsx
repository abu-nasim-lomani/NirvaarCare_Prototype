'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Upload, ArrowLeft, ShieldCheck, UserCircle, Activity, PlayCircle, BadgeCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLang } from '@/components/context/LanguageContext';

const MOCK_CAMPAIGN = {
    id: 'c1',
    name: 'কাসেমের ওপেন হার্ট সার্জারি',
    enName: "Kasem's Open Heart Surgery",
    patientAge: 65,
    location: 'Mirpur, Dhaka',
    story: 'কাসেম সাহেব পেশায় একজন অবসরপ্রাপ্ত সরকারি চাকরিজীবী। গত সপ্তাহে উনার একটি বড় হার্ট অ্যাটাক হয়। ডাক্তার ওপেন হার্ট সার্জারির পরামর্শ দিয়েছেন, যার জন্য প্রায় ১.৫ লক্ষ টাকা প্রয়োজন। উনার ২ ছেলে প্রবাসে থাকলেও তাদের বর্তমান আর্থিক অবস্থা খুব একটা ভালো নয়। আপনারা চাইলে কাসেম সাহেবকে এই কঠিন সময়ে একটু সাহায্য করতে পারেন।',
    enStory: 'Kasem is a retired govt worker. Last week he had a major heart attack and needs immediate open heart surgery...',
    amount: 150000,
    raised: 120000,
    donorsCount: 342,
    images: ['❤️'],
    isUrgent: true,
    isZakat: true,
    costs: [
        { item: 'সার্জারি চার্জ', enItem: 'Surgery Cost', amount: 80000, done: true, vendor: 'Evercare Hospital' },
        { item: 'ওষুধপত্র', enItem: 'Medicines', amount: 35000, done: true, vendor: 'Lazz Pharma (Verified)' },
        { item: 'হাসপাতাল বেড (১০ দিন)', enItem: 'Hospital Bed', amount: 20000, done: false, vendor: 'Evercare' },
        { item: 'বিশেষ ডায়েট', enItem: 'Special Diet', amount: 15000, done: false, vendor: 'Dietian BD' }
    ],
    recentDonors: [
        { name: 'আরিফুর রহমান', amount: 5000, date: '2 hour ago' },
        { name: 'নাম প্রকাশে অনিচ্ছুক', amount: 1000, date: '5 hours ago' },
        { name: 'তাসনিয়া মেহনাজ', amount: 2000, date: 'Yesterday' }
    ]
};

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
    const { t } = useLang();
    const { id } = params;
    const [donating, setDonating] = useState(false);
    const [donateAmount, setDonateAmount] = useState('1000');
    const [success, setSuccess] = useState(false);

    // Simulate database lookup (we just use mock)
    const camp = MOCK_CAMPAIGN;
    const percent = Math.min(100, Math.round((camp.raised / camp.amount) * 100));

    const handleDonateSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setDonating(false);
        setSuccess(true);
        // Fire confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0d9488', '#f59e0b', '#10b981']
        });
        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Nav Bar back button (simplified) */}
            <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/foundation" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" /> {t('ফিরে যান', 'Back')}
                    </Link>
                    <div className="flex gap-2 items-center text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
                        <ShieldCheck className="w-4 h-4" /> {t('১০০% ভেরিফাইড কেস', '100% Verified Case')}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-8 grid md:grid-cols-3 gap-8">
                {/* Left Content */}
                <div className="md:col-span-2 space-y-8">
                    {/* Header Card */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                        <div className="w-full h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-8xl mb-6 border border-gray-200 relative overflow-hidden">
                            {camp.images[0]}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {camp.isZakat && (
                                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm border border-emerald-200 flex items-center gap-1">
                                        ✨ Zakat Eligible
                                    </div>
                                )}
                                {camp.isUrgent && (
                                    <div className="bg-emergency text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm animate-pulse">
                                        URGENT
                                    </div>
                                )}
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">{t(camp.name, camp.enName)}</h1>
                        <p className="text-gray-500 font-medium mb-6">Patient: {camp.patientAge} yrs • {camp.location}</p>

                        <div className="prose prose-teal max-w-none text-gray-600 leading-relaxed">
                            <p>{t(camp.story, camp.enStory)}</p>
                        </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">{t('কোথায় কত খরচ হবে?', 'Detailed Cost Breakdown')}</h2>
                        <div className="space-y-4">
                            {camp.costs.map((cost, idx) => (
                                <div key={idx} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${cost.done ? 'bg-success/5 border-success/20' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex flex-col">
                                        <span className={`font-bold ${cost.done ? 'text-gray-800' : 'text-gray-600'}`}>{t(cost.item, cost.enItem)}</span>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            {cost.done && <span className="text-xs text-success font-bold flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded"><ShieldCheck className="w-3 h-3" /> Funded</span>}
                                            <span className="text-xs text-gray-500 flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5 text-primary" /> Vendor: {cost.vendor}</span>
                                        </div>
                                    </div>
                                    <span className="font-black text-gray-800 md:text-right">৳{(cost.amount).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Post-Treatment Follow-up */}
                    <div className="bg-emerald-50 rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-emerald-200/50 rounded-full blur-3xl" />
                        <h2 className="text-xl font-bold text-gray-800 mb-2 relative z-10">{t('পোস্ট-ট্রিটমেন্ট আপডেট', 'Post-Treatment Update')}</h2>
                        <p className="text-gray-600 text-sm mb-6 max-w-lg relative z-10">আপনার অনুদানে পূর্বে সুস্থ হয়ে ওঠা রোগীদের গল্প দেখুন। আমরা নিশ্চিত করি আপনার অনুদান সঠিক মানুষের কাছে পৌঁছায়।</p>

                        <div className="bg-white p-4 rounded-2xl flex items-center gap-4 relative z-10 shadow-sm cursor-pointer hover:shadow-md transition-shadow group">
                            <div className="w-24 h-24 bg-gray-200 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                                <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">👨🏻‍🦳</span>
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                    <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">রফিক সাহেবের সুস্থতার গল্প</h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">"আপনাদের সবার সাহায্যে আমি আজ সম্পূর্ণ সুস্থ হয়ে পরিবারের কাছে ফিরতে পেরেছি। আল্লাহ আপনাদের ভালো করুক।"</p>
                                <span className="text-xs font-bold text-emerald-600 mt-2 block">১ মাস আগের ভিডিও</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sticky Sidebar */}
                <div className="space-y-6 relative">
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-36">
                        <div className="text-center mb-6">
                            <div className="text-3xl font-black text-primary mb-1">৳{(camp.raised).toLocaleString()}</div>
                            <div className="text-sm text-gray-500">{t(`৳${(camp.amount).toLocaleString()} এর মধ্যে`, `raised of ৳${(camp.amount).toLocaleString()}`)}</div>
                        </div>

                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${percent}%` }} />
                        </div>

                        <div className="flex justify-between text-sm font-medium text-gray-500 mb-8 pb-6 border-b border-gray-100">
                            <div><strong className="text-gray-800">{camp.donorsCount}</strong> {t('ডোনার', 'Donors')}</div>
                            <div><strong className="text-gray-800">{percent}%</strong> {t('সম্পন্ন', 'Funded')}</div>
                        </div>

                        {!donating ? (
                            <button onClick={() => setDonating(true)} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                <Heart className="w-5 h-5" fill="currentColor" /> {t('সাহায্য করুন', 'Donate Now')}
                            </button>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <div className="grid grid-cols-3 gap-2">
                                    {['500', '1000', '5000'].map(amt => (
                                        <button key={amt} onClick={() => setDonateAmount(amt)} className={`py-2 rounded-lg font-bold border ${donateAmount === amt ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                                            ৳{amt}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">৳</span>
                                    <input type="number" value={donateAmount} onChange={e => setDonateAmount(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl pl-8 pr-4 py-3 font-bold focus:border-primary outline-none" placeholder="Custom amount" />
                                </div>
                                <button onClick={handleDonateSubmit} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                                    {t(`৳${donateAmount} দান করুন`, `Donate ৳${donateAmount}`)}
                                </button>
                                <button onClick={() => setDonating(false)} className="w-full py-2 text-sm font-medium text-gray-500 hover:text-gray-800">Cancel</button>
                            </div>
                        )}

                        {success && (
                            <div className="bg-success text-white p-4 rounded-xl font-bold text-center animate-in zoom-in spin-in-2 mb-6 shadow-lg shadow-success/20">
                                🎉 ধন্যবাদ! আপনার ৳{donateAmount} দান সফলভাবে গ্রহণ করা হয়েছে।
                            </div>
                        )}

                        {/* Recent Donors List */}
                        <div className="mt-8">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                                <Activity className="w-4 h-4 text-emerald-500" />
                                {t('সাম্প্রতিক ডোনেশন', 'Recent Donations')}
                            </h3>
                            <div className="space-y-4">
                                {camp.recentDonors.map((rd, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                                            <UserCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-800">{rd.name}</div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-primary font-bold">৳{rd.amount}</span>
                                                <span className="text-gray-400">• {rd.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
