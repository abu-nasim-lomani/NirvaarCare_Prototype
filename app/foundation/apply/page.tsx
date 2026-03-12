'use client';
import { useState } from 'react';
import { User, Users, Heart, ArrowRight, ArrowLeft, Upload, CheckCircle, ShieldCheck, Phone } from 'lucide-react';
import Link from 'next/link';

type ApplicantType = 'self' | 'family' | 'referral';

export default function FoundationApplyPage() {
    const [step, setStep] = useState(1);
    const [applicantType, setApplicantType] = useState<ApplicantType>('family');
    const [submitted, setSubmitted] = useState(false);
    const [trackingId] = useState('NCF-2026-' + Math.floor(10000 + Math.random() * 90000));

    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => s - 1);
    const submit = () => setSubmitted(true);

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-gray-100">
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-success" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">আবেদন সফল হয়েছে!</h2>
                    <p className="text-gray-500 mb-6">আপনার আবেদন আমাদের টিম পর্যালোচনা করছে। সাধারণত ৪৮-৭২ ঘণ্টার মধ্যে যোগাযোগ করা হয়।</p>
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">আপনার Tracking ID</p>
                        <p className="text-2xl font-black text-primary tracking-widest">{trackingId}</p>
                        <p className="text-xs text-gray-400 mt-2">এই নম্বরটি সংরক্ষণ করুন। আবেদনের অবস্থা জানতে এটি লাগবে।</p>
                    </div>
                    <div className="space-y-3">
                        <Link href="/foundation" className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                            <Heart className="w-4 h-4" /> ফাউন্ডেশনে ফিরে যান
                        </Link>
                        <p className="text-xs text-gray-400">SMS এবং ইমেইলে আপডেট পাঠানো হবে।</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <Link href="/foundation" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-4">
                        <ArrowLeft className="w-4 h-4" /> ফাউন্ডেশনে ফিরে যান
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900">সাহায্যের জন্য আবেদন করুন</h1>
                    <p className="text-gray-500 mt-2">রোগী নিজে, পরিবার, অথবা কোনো শুভাকাঙ্ক্ষী আবেদন করতে পারবেন।</p>
                </div>

                {/* Step Progress */}
                <div className="flex items-center gap-2 mb-8 justify-center">
                    {[1, 2, 3].map(s => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-colors ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                            </div>
                            {s < 3 && <div className={`w-16 h-1 rounded-full transition-colors ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400 font-bold -mt-4 mb-8">
                    {step === 1 ? 'আবেদনকারীর ধরন' : step === 2 ? 'রোগীর তথ্য ও মেডিকেল ডকুমেন্ট' : 'আর্থিক তথ্য ও জমা দিন'}
                </p>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

                    {/* Step 1: Applicant Type */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-800">আপনি কি হিসেবে আবেদন করছেন?</h2>
                            <div className="space-y-4">
                                {[
                                    { type: 'self' as const, icon: <User className="w-6 h-6" />, title: 'নিজে (রোগী)', desc: 'আপনি নিজেই অসুস্থ এবং সাহায্য চাইছেন।' },
                                    { type: 'family' as const, icon: <Users className="w-6 h-6" />, title: 'পরিবারের পক্ষে', desc: 'আপনার পরিবারের কোনো সদস্য অসুস্থ (স্বামী/স্ত্রী/সন্তান/ভাই-বোন)।' },
                                    { type: 'referral' as const, icon: <Heart className="w-6 h-6" />, title: 'শুভাকাঙ্ক্ষী (Referral)', desc: 'আপনি একজন ডাক্তার, সমাজকর্মী, বা প্রতিবেশী যিনি একজন রোগীর পক্ষে আবেদন করছেন।' },
                                ].map(opt => (
                                    <label key={opt.type} className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${applicantType === opt.type ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                        <input type="radio" name="type" value={opt.type} checked={applicantType === opt.type} onChange={() => setApplicantType(opt.type)} className="mt-1 accent-primary w-4 h-4 shrink-0" />
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${applicantType === opt.type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            {opt.icon}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{opt.title}</p>
                                            <p className="text-sm text-gray-500 mt-1">{opt.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Applicant's own info */}
                            <div className="pt-4 border-t border-gray-100 space-y-4">
                                <h3 className="font-bold text-gray-700">আবেদনকারীর যোগাযোগের তথ্য</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1.5">আপনার নাম</label>
                                        <input type="text" placeholder="পূর্ণ নাম লিখুন" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1.5">মোবাইল নম্বর</label>
                                        <div className="relative">
                                            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input type="tel" placeholder="01XXXXXXXXX" className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-primary text-sm" />
                                        </div>
                                    </div>
                                </div>
                                {applicantType !== 'referral' && (
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1.5">রোগীর সাথে আপনার সম্পর্ক (Family হলে)</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm bg-white">
                                            <option>নিজে</option>
                                            <option>স্বামী/স্ত্রী</option>
                                            <option>পুত্র/কন্যা</option>
                                            <option>বাবা/মা</option>
                                            <option>ভাই/বোন</option>
                                        </select>
                                    </div>
                                )}
                                {applicantType === 'referral' && (
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1.5">আপনার পেশা / সংস্থার নাম</label>
                                        <input type="text" placeholder="যেমন: ডাক্তার, ঢাকা মেডিকেল কলেজ" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Patient Info & Documents */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-800">রোগীর তথ্য ও ডকুমেন্ট</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1.5">রোগীর নাম (বাংলা)</label>
                                    <input type="text" placeholder="যেমন: কাসেম মিয়া" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1.5">রোগীর বয়স</label>
                                    <input type="number" placeholder="৪৫" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1.5">জেলা</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm bg-white">
                                        <option>ঢাকা</option><option>চট্টগ্রাম</option><option>সিলেট</option><option>কুমিল্লা</option><option>রাজশাহী</option><option>খুলনা</option><option>বরিশাল</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1.5">রোগের ধরন</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm bg-white">
                                        <option>হার্টের সমস্যা</option><option>ক্যান্সার</option><option>কিডনি সমস্যা</option><option>ডায়াবেটিস</option><option>অন্যান্য</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1.5">রোগের বিস্তারিত বিবরণ</label>
                                <textarea rows={4} placeholder="রোগের শুরু থেকে এখন পর্যন্ত কি হয়েছে, বর্তমান অবস্থা কেমন ইত্যাদি বিস্তারিত লিখুন..." className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm resize-none" />
                            </div>

                            {/* Document Upload */}
                            <div className="space-y-3">
                                <h3 className="font-bold text-gray-700">ডকুমেন্ট আপলোড করুন</h3>
                                {[
                                    { label: 'ডাক্তারের প্রেসক্রিপশন / মেডিকেল রিপোর্ট', required: true },
                                    { label: 'রোগীর NID বা জন্ম নিবন্ধন', required: true },
                                    { label: 'রোগীর ছবি (ঐচ্ছিক)', required: false },
                                ].map(doc => (
                                    <div key={doc.label} className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-primary/40 cursor-pointer transition-colors group">
                                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-primary/5 rounded-lg flex items-center justify-center shrink-0 transition-colors">
                                            <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-700">{doc.label} {doc.required && <span className="text-emergency text-xs">*</span>}</p>
                                            <p className="text-xs text-gray-400">PDF, PNG, JPG — সর্বোচ্চ 5MB</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Financial Info & Submit */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black text-gray-800">আর্থিক তথ্য ও চূড়ান্ত জমা</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1.5">মোট প্রয়োজনীয় ফান্ড (৳)</label>
                                    <input type="number" placeholder="150000" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 block mb-1.5">কত দিনের মধ্যে প্রয়োজন?</label>
                                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm bg-white">
                                        <option>৭ দিনের মধ্যে (জরুরি)</option>
                                        <option>১৫ দিনের মধ্যে</option>
                                        <option>৩০ দিনের মধ্যে</option>
                                        <option>৬০ দিনের মধ্যে</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1.5">খরচের সম্ভাব্য খাত (যত বিস্তারিত হবে, তত ভালো)</label>
                                <textarea rows={3} placeholder="যেমন: সার্জারি - ১,০০,০০০ ৳, ওষুধ - ৩৫,০০০ ৳, হাসপাতাল বেড ১০ দিন - ২০,০০০ ৳" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm resize-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1.5">অন্য কোথাও সাহায্যের আবেদন করা হয়েছে?</label>
                                <div className="flex items-center gap-6 mt-1">
                                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700"><input type="radio" name="other" className="accent-primary" /> হ্যাঁ</label>
                                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700"><input type="radio" name="other" className="accent-primary" defaultChecked /> না</label>
                                </div>
                            </div>

                            {/* Consent */}
                            <div className="bg-gray-50 rounded-2xl p-5 space-y-3 border border-gray-100">
                                <h3 className="font-bold text-gray-700 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> সম্মতি ও প্রতিশ্রুতি</h3>
                                {[
                                    'আমি নিশ্চিত করছি যে দেওয়া সকল তথ্য সত্য এবং সঠিক।',
                                    'আমি সম্মত আছি যে ফাউন্ডেশন সরাসরি হাসপাতাল বা ফার্মেসিতে পেমেন্ট করবে।',
                                    'আমি সম্মত আছি যে চিকিৎসার সকল রসিদ ফাউন্ডেশনের ওয়েবসাইটে প্রকাশিত হবে।',
                                ].map((c, i) => (
                                    <label key={i} className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" className="accent-primary mt-0.5 w-4 h-4 shrink-0" />
                                        <span className="text-sm text-gray-600">{c}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                        {step > 1 && (
                            <button onClick={back} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> পেছনে
                            </button>
                        )}
                        <button
                            onClick={step === 3 ? submit : next}
                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                        >
                            {step === 3 ? <><CheckCircle className="w-5 h-5" /> আবেদন জমা দিন</> : <>পরবর্তী ধাপ <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">সাহায্যের জন্য কল করুন: <strong className="text-gray-600">01700-000000</strong> (সকাল ৯টা - রাত ৯টা)</p>
            </div>
        </div>
    );
}
