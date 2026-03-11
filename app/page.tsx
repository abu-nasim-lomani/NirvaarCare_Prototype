'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowRight, Phone, Shield, Clock, Star, ChevronLeft, ChevronRight, Heart, Activity, Pill, AlertTriangle, ShoppingBag, Smile, CheckCircle, FileText } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const SERVICES = [
    { icon: Activity, color: 'bg-blue-50 text-blue-600', title: 'ডায়াগনস্টিক সেবা', en: 'Diagnostic', desc: 'ডায়াগনস্টিক সেন্টারে যাতায়াত ও ঘরে পরীক্ষার সুবিধা', href: '/services/diagnostic' },
    { icon: Heart, color: 'bg-red-50 text-red-600', title: 'চিকিৎসক সেবা', en: 'Doctor Care', desc: 'সাক্ষাতের সময় নির্ধারণ ও অনলাইন পরামর্শ', href: '/services/doctor' },
    { icon: Pill, color: 'bg-green-50 text-green-600', title: 'ঔষধ সেবা', en: 'Medicine', desc: 'ওষুধ সংগ্রহ, বাসায় পৌঁছে দেওয়া ও সেবন পর্যবেক্ষণ', href: '/services/medicine' },
    { icon: AlertTriangle, color: 'bg-red-50 text-emergency', title: 'জরুরি সেবা', en: 'Emergency', desc: 'অ্যাম্বুলেন্স, হাসপাতালে ভর্তি ও অ্যাটেনডেন্ট প্রদান', href: '/services/emergency' },
    { icon: ShoppingBag, color: 'bg-orange-50 text-orange-600', title: 'দৈনন্দিন সেবা', en: 'Daily Needs', desc: 'বাজার, ব্যাংক, মার্কেট — পরিবহন ও সহকারীসহ', href: '/services/daily' },
    { icon: Smile, color: 'bg-purple-50 text-purple-600', title: 'মানসিক সঙ্গ', en: 'Companion', desc: 'সঙ্গ দেওয়া, কাউন্সেলিং ও মানসিক প্রফুল্লতা', href: '/services/companion' },
];

const TESTIMONIALS = [
    { name: 'রাহেলা বেগম', loc: 'লন্ডন, UK', text: 'আমি দূরে থাকি, কিন্তু নির্ভার কেয়ারের কারণে আমার বাবার প্রতিটি ডাক্তার ভিজিট নিশ্চিত হয়। অসাধারণ সেবা!', stars: 5, avatar: '👩' },
    { name: 'করিম সাহেব', loc: 'দুবাই, UAE', text: 'মায়ের ওষুধ সময়মতো পৌঁছানো এবং রিপোর্ট ভল্টে দেখতে পাওয়া — প্রবাসী হিসেবে এটা অমূল্য।', stars: 5, avatar: '👨' },
    { name: 'নাফিসা ইসলাম', loc: 'টরন্টো, Canada', text: 'কেয়ারগিভার আন্টি খুবই দয়ালু। বাবার সাথে প্রতিদিন গল্প করেন। বাবা এখন অনেক ভালো আছেন।', stars: 5, avatar: '👩' },
    { name: 'আহমেদ রেজা', loc: 'ঢাকা', text: 'এক ফোনেই সব ব্যবস্থা। জরুরি সময়ে অ্যাম্বুলেন্স ডেকে দিয়েছিল। সত্যিকারের নির্ভরযোগ্য সেবা।', stars: 5, avatar: '👨' },
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
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setActiveTestimonial(a => (a + 1) % TESTIMONIALS.length), 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            {/* ── HERO ── */}
            <section className="relative bg-gradient-to-br from-primary-dark via-primary to-blue-800 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #F4A836 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 50%)' }} />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm mb-6">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                {t('৫০০+ পরিবার আমাদের সাথে', '500+ families trust us')}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                                {t('আপনার প্রিয়জনের যত্ন,', "Your loved one's care,")}
                                <br />
                                <span className="text-accent">{t('এখন আপনার হাতের মুঠোয়', 'now in your hands')}</span>
                            </h1>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                {t('NID যাচাইকৃত কেয়ারগিভার, মেডিকেল ভল্ট, লাইভ ট্র্যাকিং — সব এক জায়গায়।', 'NID-verified caregivers, medical vault, live tracking — all in one place.')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/dashboard/book" className="inline-flex items-center justify-center gap-2 bg-accent text-white font-bold px-6 py-3.5 rounded-xl hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg">
                                    {t('সার্ভিস বুক করুন', 'Book a Service')} <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a href="tel:01800000000" className="inline-flex items-center justify-center gap-2 bg-emergency font-bold px-6 py-3.5 rounded-xl hover:bg-red-700 transition-all">
                                    <Phone className="w-4 h-4" /> {t('জরুরি কল', 'Emergency Call')}
                                </a>
                            </div>

                            {/* PROJECT PLAN LINK */}
                            <div className="mt-6 flex items-center">
                                <a href="/nirvaar_care_plan.html" target="_blank" className="inline-flex items-center gap-2 text-blue-100 hover:text-white underline decoration-white/30 hover:decoration-white transition-all text-sm font-bold">
                                    <FileText className="w-4 h-4" /> {t('সম্পূর্ণ প্রজেক্ট প্ল্যান ও ফিচার লিস্ট দেখুন', 'View Full Project Plan & Feature List')}
                                </a>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="hidden md:block">
                            <div className="relative bg-white/10 backdrop-blur rounded-3xl p-6">
                                {/* Simulated booking card */}
                                <div className="bg-white rounded-2xl p-4 text-gray-800 mb-3 shadow">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl">👩‍⚕️</div>
                                        <div>
                                            <p className="font-bold text-sm">ফারিদা নার্স</p>
                                            <div className="flex items-center gap-1 text-yellow-500 text-xs">{'★★★★★'}<span className="text-gray-400">(৪৮ রিভিউ)</span></div>
                                        </div>
                                        <span className="ml-auto text-xs bg-green-100 text-success px-2 py-1 rounded-full font-medium">✓ {t('যাচাইকৃত', 'Verified')}</span>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl p-4 text-gray-800 shadow">
                                    <p className="text-xs text-gray-500 mb-1">{t('লাইভ ট্র্যাকিং', 'Live Tracking')}</p>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                                        <span className="text-sm font-bold text-success">{t('পৌঁছে গেছেন', 'Arrived at location')}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {['নিযুক্ত', 'রওনা', 'পৌঁছেছেন', 'সম্পন্ন'].map((s, i) => (
                                            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 2 ? 'bg-success' : 'bg-gray-200'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-primary-dark">{t('কীভাবে কাজ করে?', 'How does it work?')}</h2>
                        <p className="text-gray-500 mt-2">{t('মাত্র ৩টি সহজ ধাপে শুরু করুন', 'Get started in just 3 easy steps')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {HOW_IT_WORKS.map((step, i) => (
                            <div key={i} className="relative text-center p-6 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors">
                                {i < 2 && <div className="hidden md:block absolute top-12 right-0 translate-x-1/2 text-3xl text-primary/30 font-black z-10">→</div>}
                                <div className="text-5xl mb-4">{step.icon}</div>
                                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3 text-sm">{step.step}</div>
                                <h3 className="font-bold text-primary-dark text-lg mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
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

            {/* ── TRUST BADGES ── */}
            <section className="py-12 bg-primary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                            <div key={label} className="text-center text-white">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="font-bold">{label}</div>
                                <div className="text-xs text-blue-200">{sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-primary-dark">{t('আমাদের পরিবারদের কথা', 'What families say')}</h2>
                    </div>
                    <div className="relative bg-primary/5 rounded-3xl p-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">{TESTIMONIALS[activeTestimonial].avatar}</div>
                            <div className="flex justify-center gap-0.5 mb-4">
                                {'★★★★★'.split('').map((s, i) => <span key={i} className="text-yellow-400 text-xl">{s}</span>)}
                            </div>
                            <blockquote className="text-gray-700 text-lg italic leading-relaxed mb-6">
                                &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
                            </blockquote>
                            <div className="font-bold text-primary-dark">{TESTIMONIALS[activeTestimonial].name}</div>
                            <div className="text-sm text-gray-400">{TESTIMONIALS[activeTestimonial].loc}</div>
                        </div>
                        <div className="flex justify-center gap-2 mt-6">
                            <button onClick={() => setActiveTestimonial(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md"><ChevronLeft className="w-4 h-4" /></button>
                            {TESTIMONIALS.map((_, i) => (
                                <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-primary w-4' : 'bg-gray-300'}`} />
                            ))}
                            <button onClick={() => setActiveTestimonial(a => (a + 1) % TESTIMONIALS.length)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:shadow-md"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="py-12 bg-gradient-to-r from-accent to-orange-500">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black text-white mb-3">{t('আজই শুরু করুন', 'Get started today')}</h2>
                    <p className="text-white/90 mb-6">{t('বিনামূল্যে প্রোফাইল তৈরি করুন এবং প্রথম সার্ভিসে ১০% ছাড় পান।', 'Create a free profile and get 10% off your first service.')}</p>
                    <Link href="/login" className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-3.5 rounded-xl hover:scale-105 transition-transform shadow-lg">
                        {t('এখনই শুরু করুন', 'Start Now')} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
