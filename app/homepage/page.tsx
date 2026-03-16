'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Phone, Shield, Clock, Star, ChevronLeft, ChevronRight, Heart, Activity, Pill, AlertTriangle, ShoppingBag, Smile, CheckCircle, FileText } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';
import HeroSlider from '@/components/home/HeroSlider';

const SERVICES = [
    { icon: Activity, color: 'bg-emerald-50 text-emerald-600', title: 'ডায়াগনস্টিক ও মেডিকেল পরীক্ষা-সংক্রান্ত সেবা', en: 'Diagnostic & Medical Tests', desc: 'ডায়াগনস্টিক সেন্টারে যাতায়াত সহায়তা, সার্বিক তত্ত্বাবধান এবং ঘরে বসে পরীক্ষা করার সুবিধা।', href: '/services/diagnostic' },
    { icon: Heart, color: 'bg-blue-50 text-blue-600', title: 'চিকিৎসক-সম্পর্কিত সেবা', en: 'Doctor Care', desc: 'সরাসরি সাক্ষাতের সময় নির্ধারণ, সার্বিক সহায়তা ও অনলাইন চিকিৎসা পরামর্শ।', href: '/services/doctor' },
    { icon: Pill, color: 'bg-slate-50 text-slate-600', title: 'ঔষধ-সংক্রান্ত সেবা', en: 'Medicine Services', desc: 'ঔষধের চাহিদা নির্ধারণ, সময়মতো সংগ্রহ ও বাসায় পৌঁছে দেওয়া, সেবন পর্যবেক্ষণ এবং প্রয়োজনে চিকিৎসক পরামর্শ সমন্বয়।', href: '/services/medicine' },
    { icon: AlertTriangle, color: 'bg-red-50 text-red-600', title: 'জরুরি পরিস্থিতি-সংক্রান্ত সেবা', en: 'Emergency Support', desc: 'সার্বিক তত্ত্বাবধান ও সমন্বয়, অ্যাম্বুলেন্স ব্যবস্থা, হাসপাতালে ভর্তি সহায়তা ও অ্যাটেনডেন্ট সেবা প্রদান।', href: '/services/emergency' },
    { icon: ShoppingBag, color: 'bg-teal-50 text-teal-600', title: 'দৈনন্দিন প্রয়োজন-সংক্রান্ত সেবা', en: 'Daily Needs & Support', desc: 'বাজার করা, আত্মীয়ের বাড়ি, মার্কেট ও ব্যাংকে যাতায়াত বা ঘোরাফেরায় পরিবহন ও সহকারীসহ সহায়তা প্রদান।', href: '/services/daily' },
    { icon: Smile, color: 'bg-orange-50 text-orange-600', title: 'মানসিক সঙ্গ ও সুস্থতা-সংক্রান্ত সেবা', en: 'Companion & Wellness', desc: 'সঙ্গ দেওয়া ও গল্প করা, বই বা পত্রিকা পড়ে শোনানো কাউন্সেলিং এবং মানসিক প্রফুল্লতা বজায় রাখতে সহায়তা প্রদান।', href: '/services/companion' },
];

const MEDIA_PRESENCE = [
    { id: 1, name: 'The Daily Star', logo: '📰', title: '"NirvaarCare brings revolutionary elder care to Bangladesh"', date: 'Oct 12, 2025' },
    { id: 2, name: 'Prothom Alo', logo: '🗞️', title: '"প্রবাসী সন্তানদের আস্থার প্রতীক নির্ভার কেয়ার"', date: 'Nov 05, 2025' },
    { id: 3, name: 'Somoy TV', logo: '📺', title: '"বাংলাদেশে প্রথম সমন্বিত হোম হেলথকেয়ার সার্ভিস"', date: 'Dec 20, 2025' },
];

const PARTNERS = [
    { id: 1, name: 'Square Hospitals', type: 'Medical Partner' },
    { id: 2, name: 'Popular Diagnostic', type: 'Diagnostic Partner' },
    { id: 3, name: 'Labaid', type: 'Healthcare Partner' },
    { id: 4, name: 'Thyrocare', type: 'Testing Partner' },
];

const ADVISORY_BOARD = [
    { id: 1, name: 'ডাঃ এ. কে. এম. ফজলুল হক', role: 'প্রধান চিকিৎসা উপদেষ্টা (Chief Medical Advisor)', desc: 'MBBS, FCPS (Medicine). মেডিসিন ও জেরিয়াট্রিক কেয়ার বিশেষজ্ঞ।' },
    { id: 2, name: 'অধ্যাপক ডাঃ নার্গিস আক্তার', role: 'নার্সিং উপদেষ্টা (Nursing Advisor)', desc: 'PhD in Public Health. ক্লিনিক্যাল নার্সিংয়ে ৩০ বছরের অভিজ্ঞতা।' },
    { id: 3, name: 'ডাঃ শাহীন মাহমুদ', role: 'মানসিক স্বাস্থ্য উপদেষ্টা (Psychological Advisor)', desc: 'সিনিয়র কনসালটেন্ট সাইকিয়াট্রিস্ট। বয়স্কদের মানসিক স্বাস্থ্য বিশেষজ্ঞ।' },
];

const PRECISE_BENEFITS = [
    { icon: Shield, title: '১০০% নিরাপদ ও যাচাইকৃত', enTitle: '100% Safe & Verified', desc: 'আমাদের প্রতিটি কেয়ারগিভার এবং নার্স NID, ঠিকানা ও ব্যাকগ্রাউন্ড পুলিশ ভেরিফাইড।' },
    { icon: Clock, title: '২৪/৭ সার্বক্ষণিক সাপোর্ট', enTitle: '24/7 Support', desc: 'রোগীর অবস্থা পর্যবেক্ষণ এবং যেকোনো জরুরি প্রয়োজনে আমাদের সাপোর্ট টিম সদা প্রস্তুত।' },
    { icon: Activity, title: 'নিয়মিত হেলথ আপডেট', enTitle: 'Health Tracking', desc: 'প্রতিদিনের স্বাস্থ্য রিপোর্ট ও কাজের আপডেট আপনি বিশ্বের যেকোনো প্রান্ত থেকে অ্যাপে দেখতে পাবেন।' },
    { icon: Heart, title: 'পারিবারিক আন্তরিকতা', enTitle: 'Family-like Care', desc: 'আমরা শুধু পেশাদার দায়িত্ব পালন করি না, পরিবারের একজন হিসেবে আন্তরিকতার সাথে সেবা দিই।' },
];

const HOW_IT_WORKS = [
    { step: '১', icon: '📱', title: 'অ্যাকাউন্ট খুলুন', desc: 'ফোন নম্বর দিয়ে OTP-তে লগইন করুন এবং প্রোফাইল সেটআপ করুন।' },
    { step: '২', icon: '🏥', title: 'সার্ভিস বাছুন', desc: '৬টি সেবার মধ্যে যেটা দরকার সিলেক্ট করুন এবং সময় নির্ধারণ করুন।' },
    { step: '৩', icon: '😊', title: 'নিশ্চিন্ত থাকুন', desc: 'যাচাইকৃত কেয়ারগিভার পাঠানো হবে এবং সব আপডেট আপনি পাবেন।' },
];

const TRUST_BADGES = [
    { icon: Shield, label: 'NID যাচাইকৃত', sub: 'Verified Caregivers' },
    { icon: Clock, label: '২৪/৭ সহায়তা', sub: '24/7 Support' },
    { icon: Star, label: '৯৮% সন্তুষ্টি', sub: '98% Satisfaction' },
    { icon: CheckCircle, label: 'বীমাকৃত সেবা', sub: 'Insured Service' },
];

export default function HomePage() {
    const { t } = useLang();

    return (
        <div>
            {/* ── HERO SLIDER ── */}
            <HeroSlider />



            {/* ── TAGLINE ── */}
            <section className="py-16 bg-gradient-to-br from-primary-dark via-primary to-blue-800 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                        আপনার প্রিয়জন থাকুন আমাদের বিশ্বস্ত ও আন্তরিক যত্নে।
                    </h2>
                    <p className="text-xl text-blue-100 italic">
                        Your loved ones are in our trusted and attentive care.
                    </p>
                </div>
            </section>

            {/* ── VISION & MISSION ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Vision Card */}
                        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-10 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                                <span className="text-2xl">👁️</span>
                            </div>
                            <h3 className="text-2xl font-black text-primary-dark mb-4">রূপকল্প (Vision)</h3>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                বাংলাদেশে বয়স্ক বাবা–মা ও প্রিয়জনদের জন্য নিরাপদ, সম্মানজনক ও মানবিক যত্ন নিশ্চিত করে একটি বিশ্বস্ত ও নির্ভরযোগ্য কেয়ারগিভিং সেবার মানদণ্ড প্রতিষ্ঠা করা।
                            </p>
                            <p className="text-gray-500 italic text-sm">
                                To establish a trusted and reliable standard of caregiving services that ensure safe, dignified, and compassionate care for elderly parents and loved ones in Bangladesh.
                            </p>
                        </div>
                        {/* Mission Card */}
                        <div className="bg-teal-50/50 border border-teal-100 rounded-3xl p-10 hover:shadow-xl hover:shadow-teal-900/5 transition-all">
                            <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-600/30">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-2xl font-black text-primary-dark mb-4">লক্ষ্য (Mission)</h3>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                প্রশিক্ষিত কেয়ারগিভার, পেশাদার স্বাস্থ্যসেবা সমন্বয়, প্রযুক্তিনির্ভর যোগাযোগ এবং মানবিক সহায়তার মাধ্যমে বয়স্ক প্রিয়জনদের নিরাপদ ও সম্মানজনক জীবনযাপন নিশ্চিত করা এবং পরিবারকে নিশ্চিন্ততা প্রদান করা।
                            </p>
                            <p className="text-gray-500 italic text-sm">
                                To provide dependable caregiving, coordinated healthcare support, and technology-enabled communication that ensure elderly loved ones receive safe and respectful care while giving families peace of mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OUR STORY ── */}
            <section className="py-20 bg-bg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-6 text-primary">
                            <Heart className="w-8 h-8 fill-primary" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-primary-dark mb-6">নির্ভার কেয়ার – আমাদের ভাবনা</h2>
                    </div>
                    
                    <div className="prose prose-lg prose-blue text-gray-700 mx-auto space-y-6 leading-relaxed">
                        <p>
                            জীবন ও জীবিকার প্রয়োজনে আজ অনেকেই দেশ ছেড়ে বিদেশে, অথবা নিজের শহর থেকে দূরে অন্য কোথাও বসবাস করছেন। চাইলেও তাদের প্রয়োজনে সবসময় পাশে থাকা সম্ভব হয় না। তাই দূরে থেকে সবসময় চিন্তা আবর্তিত হয় বাবা-মা ও প্রিয়জনদের কেন্দ্র করে। বয়স্ক বাবা–মা এবং প্রিয়জনেরা ঠিক আছেন তো? তাদের প্রয়োজনীয় গুরুত্বপূর্ণ সেবা গুলো ঠিক মতো পাচ্ছেন কি? মনে,কেউ যদি থাকতো তাদের কাছে প্রয়োজনীয় সেবাগুলো যত্ন নিয়ে পৌঁছে দিতো!
                        </p>
                        <p>
                            এই ভাবনা, দায়বদ্ধতা এবং জীবন বাস্তবতার অনুভূতি থেকেই নির্ভার কেয়ার–এর যাত্রা শুরু। নির্ভার কেয়ার এমন একটি সেবা, যেখানে আমরা শুধু দায়িত্ব পালন করি না, আমরা মানুষের পাশে দাঁড়াই। বাংলাদেশে বসবাসরত বয়স্ক বাবা–মা এবং প্রিয়জনদের জন্য আমরা নিশ্চিত করি নিরাপদ, সম্মানজনক এবং আন্তরিক সহায়তা, যেন তারা কখনোই একাকী, অসহায় ও অবহেলিত অনুভব না করেন।
                        </p>
                        <p>
                            আমাদের প্রদত্ত সেবার মাধ্যমে আমরা বয়োবৃদ্ধ বাবা–মা ও প্রিয়জনদের জন্য চিকিৎসা সংক্রান্ত সেবা গুলোর সমন্বয় করি থাকি। ডাক্তার ও হাসপাতাল ভিজিটের ব্যবস্থা করা সহ প্রয়োজনে ঘরে বসেই মেডিকেল টেস্ট ও রিপোর্ট ব্যবস্থাপনা নিশ্চিতকরণ করা হয়। পাশাপাশি প্রশিক্ষিত কেয়ারগিভার ও নার্সিং সেবার ব্যবস্থা প্রদান। প্রয়োজনে অ্যাটেনডেন্ট সহায়তা প্রদান করা হয়। প্রযুক্তির সঠিক ব্যবহার করে পরিবারের সদস্যদের স্বচ্ছ ও নিয়মিত আপডেট প্রদান করা এই প্রদত্ত সেবার অন্যতম বৈশিষ্ট্য।
                        </p>
                        <p>
                            যেকোনো জরুরি পরিস্থিতিতে আমরা দ্রুত ও সমন্বিতভাবে প্রয়োজনীয় সেবা সহায়তা নিশ্চিত করতে সবসময় পাশে আছি।
                        </p>
                        <p>
                            নির্ভার কেয়ার পরিচালিত হয় অভিজ্ঞ পেশাজীবীদের একটি দল এবং সম্মানিত চিকিৎসকদের পরামর্শে। আমরা পেশাদারীত্ব ও দক্ষতার সাথে মানবিক যত্নসমূহকে একত্রিত করি—কারণ আমরা বিশ্বাস করি, <strong className="text-primary-dark font-black">যত্ন শুধু একটি সেবা নয়, এটি একটি সম্পর্ক।</strong>
                        </p>
                        <p>
                            আপনি পৃথিবীর যেখানেই থাকুন বিদেশে, অন্য শহরে বা ব্যস্ত জীবনের মাঝে, নির্ভার কেয়ার নিশ্চিত করে আপনার প্রিয় মানুষরা সঠিক সময়ে সঠিক যত্ন পাচ্ছেন। কারণ আমাদের কাছে তারা শুধু একজন সেবাগ্রহীতা নন, তারা পরিবার।
                        </p>
                        <div className="mt-12 bg-white/60 backdrop-blur-sm border-l-4 border-accent p-6 rounded-r-2xl shadow-sm text-xl font-bold text-primary-dark">
                            &ldquo;তাই নিশ্চিন্ত থাকুন, আপনার প্রিয়জনেরা আছেন নিরাপদে, আন্তরিক যত্নে, এবং কখনোই একা নন।&rdquo;
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OUR 6 SERVICES ── */}
            <section className="py-16 bg-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-primary-dark">{t('আমাদের ৬টি সেবা', 'Our 6 Services')}</h2>
                        <p className="text-gray-500 mt-2">{t('আপনার প্রিয়জনের সব প্রয়োজনে আমরা পাশে আছি', 'We are there for all your loved one\'s needs')}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SERVICES.map((svc) => {
                            const Icon = svc.icon;
                            return (
                                <Link key={svc.href} href={svc.href} className="group bg-white rounded-2xl p-6 border border-gray-100 card-hover cursor-pointer">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${svc.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{svc.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{svc.desc}</p>
                                    <div className="flex items-center text-primary text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                                        {t('বিস্তারিত', 'Learn more')} <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 4. PRESENCE IN MEDIA ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-primary-dark mb-2">গণমাধ্যমে আমরা (Presence in Media)</h2>
                        <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {MEDIA_PRESENCE.map((media) => (
                            <div key={media.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{media.logo}</div>
                                <div className="text-sm font-bold text-gray-500 mb-2">{media.name}</div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4">{media.title}</h3>
                                <div className="text-sm text-gray-400">{media.date}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. PARTNERS ── */}
            <section className="py-16 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-8">আমাদের সহযোগী পার্টনার (Our Partners)</h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {PARTNERS.map((partner) => (
                            <div key={partner.id} className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-blue-100 min-w-[200px]">
                                <h3 className="font-black text-xl text-blue-900 mb-1">{partner.name}</h3>
                                <div className="text-sm text-blue-500 font-medium">{partner.type}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. ADVISORY BOARD ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-primary-dark mb-2">উপদেষ্টামণ্ডলী (Advisory Board)</h2>
                        <p className="text-gray-500">দেশবরেণ্য চিকিৎসক ও বিশেষজ্ঞদের প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {ADVISORY_BOARD.map((advisor) => (
                            <div key={advisor.id} className="text-center group">
                                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-6 overflow-hidden border-4 border-white shadow-lg group-hover:border-accent transition-colors flex items-center justify-center">
                                    <span className="text-5xl">👨‍⚕️</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{advisor.name}</h3>
                                <div className="text-sm font-bold text-primary mb-3">{advisor.role}</div>
                                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{advisor.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. PRECISE BENEFITS ── */}
            <section className="py-20 bg-gradient-to-b from-primary-dark to-primary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4">নির্ভার থাকার সুনির্দিষ্ট কারণ (Precise Benefits)</h2>
                        <p className="text-blue-100/80 text-lg">কেন আমাদের ওপর আস্থা রাখবেন?</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRECISE_BENEFITS.map((benefit, i) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all text-center">
                                    <div className="w-16 h-16 bg-white text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{benefit.title}</h3>
                                    <div className="text-xs text-accent font-bold mb-4 uppercase tracking-wider">{benefit.enTitle}</div>
                                    <p className="text-blue-50 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 8. CONTACT US & 9. SERVICE REQUEST ── */}
            <section className="py-20 bg-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        
                        {/* 8. Contact Info */}
                        <div className="bg-primary p-12 text-white flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                            <h2 className="text-3xl font-black mb-2 relative z-10">যোগাযোগ করুন (Contact Us)</h2>
                            <p className="text-blue-100 mb-10 relative z-10">যেকোনো জিজ্ঞাসা বা পরামর্শের জন্য আমাদের সাথে কথা বলুন। আমরা সবসময় আপনার পাশে আছি।</p>
                            
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-blue-200 mb-1">হটলাইন (Hotline)</div>
                                        <div className="text-2xl font-bold">+880 1234 567890</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                        <span className="text-2xl">📧</span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-blue-200 mb-1">ইমেইল (Email)</div>
                                        <div className="text-xl font-bold">support@nirvaarcare.com</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                        <span className="text-2xl">🏢</span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-blue-200 mb-1">অফিস (Office)</div>
                                        <div className="text-lg font-bold leading-relaxed">বাড়ি ১২, রোড ৫, ধানমন্ডি<br/>ঢাকা - ১২০৫, বাংলাদেশ</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 9. Service Request Option */}
                        <div className="p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-black text-gray-900 mb-2">সার্ভিস রিকোয়েস্ট (Service Request)</h2>
                            <p className="text-gray-500 mb-8">এখনই ফর্মটি পূরণ করুন, আমাদের প্রতিনিধি খুব দ্রুত আপনার সাথে যোগাযোগ করবে।</p>
                            
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">আপনার নাম</label>
                                        <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="নাম লিখুন" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">মোবাইল নাম্বার</label>
                                        <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="01XXXXXXXXX" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">কোন সেবাটি প্রয়োজন?</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700">
                                        <option value="">সেবা নির্বাচন করুন...</option>
                                        <option value="diagnostic">ডায়াগনস্টিক ও মেডিকেল পরীক্ষা</option>
                                        <option value="doctor">চিকিৎসক-সম্পর্কিত সেবা</option>
                                        <option value="medicine">ঔষধ-সংক্রান্ত সেবা</option>
                                        <option value="emergency">জরুরি পরিস্থিতি-সংক্রান্ত সেবা</option>
                                        <option value="daily">দৈনন্দিন প্রয়োজন-সংক্রান্ত সেবা</option>
                                        <option value="companion">মানসিক সঙ্গ ও সুস্থতা</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">বিস্তারিত বার্তা (যদি থাকে)</label>
                                    <textarea rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="আপনার প্রয়োজনীয়তা বিস্তারিত লিখুন..."></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02]">
                                    রিকোয়েস্ট সাবমিট করুন
                                </button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    );
}
