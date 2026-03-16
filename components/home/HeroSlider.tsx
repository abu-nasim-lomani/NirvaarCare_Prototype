'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const SLIDES = [
    {
        id: 1,
        image: '/service_hometest.png',
        serviceBn: 'ডায়াগনস্টিক ও মেডিকেল পরীক্ষা',
        serviceEn: 'Diagnostic & Medical Tests',
        headlineBn: 'ঘরে বসেই\nসব মেডিকেল পরীক্ষা',
        headlineEn: 'Diagnostic support,\nright at your doorstep',
        descBn: 'ডায়াগনস্টিক সেন্টারে যাতায়াত সহায়তা, সার্বিক তত্ত্বাবধান এবং ঘরে বসে পরীক্ষা করার সুবিধা।',
        descEn: 'Assistance with diagnostic center visits, full supervision, and home testing facilities.',
        accent: 'from-emerald-900/80 via-emerald-800/60 to-transparent',
        tag: 'bg-emerald-500',
    },
    {
        id: 2,
        image: '/service_medical.png',
        serviceBn: 'চিকিৎসক-সম্পর্কিত সেবা',
        serviceEn: 'Doctor Care',
        headlineBn: 'চিকিৎসকের পরামর্শ\nখুব সহজেই',
        headlineEn: 'Doctor consultations,\nmade simple',
        descBn: 'সরাসরি সাক্ষাতের সময় নির্ধারণ, সার্বিক সহায়তা ও অনলাইন চিকিৎসা পরামর্শ।',
        descEn: 'In-person appointment booking, comprehensive assistance, and online doctor consultations.',
        accent: 'from-blue-900/80 via-blue-800/60 to-transparent',
        tag: 'bg-blue-500',
    },
    {
        id: 3,
        image: '/service_nursing.png',
        serviceBn: 'ঔষধ-সংক্রান্ত সেবা',
        serviceEn: 'Medicine Services',
        headlineBn: 'সময়মতো ঔষধ পৌঁছানো\nও সেবন পর্যবেক্ষণ',
        headlineEn: 'Timely medicine delivery\n& monitoring',
        descBn: 'ঔষধের চাহিদা নির্ধারণ, সময়মতো সংগ্রহ ও বাসায় পৌঁছে দেওয়া এবং স্পেশালিস্ট পরামর্শ সমন্বয়।',
        descEn: 'Determining medicine needs, timely delivery to home, usage monitoring, and doctor coordination.',
        accent: 'from-slate-900/80 via-slate-800/60 to-transparent',
        tag: 'bg-slate-500',
    },
    {
        id: 4,
        image: '/service_emergency.png',
        serviceBn: 'জরুরি পরিস্থিতি-সংক্রান্ত সেবা',
        serviceEn: 'Emergency Support',
        headlineBn: 'যেকোনো জরুরি মুহূর্তে\nআমরা সবার আগে',
        headlineEn: 'In any emergency,\nwe respond first',
        descBn: 'সার্বিক তত্ত্বাবধান ও সমন্বয়, অ্যাম্বুলেন্স ব্যবস্থা, হাসপাতালে ভর্তি সহায়তা ও অ্যাটেনডেন্ট সেবা প্রদান।',
        descEn: 'Overall supervision, ambulance arrangements, hospital admission support, and attendant services.',
        accent: 'from-red-900/80 via-red-800/60 to-transparent',
        tag: 'bg-red-500',
    },
    {
        id: 5,
        image: '/service_caregiver.png',
        serviceBn: 'দৈনন্দিন প্রয়োজন-সংক্রান্ত সেবা',
        serviceEn: 'Daily Needs',
        headlineBn: 'দৈনন্দিন সকল কাজে\nবিশ্বস্ত সহকারী',
        headlineEn: 'Trusted assistance\nfor all daily needs',
        descBn: 'বাজার করা, আত্মীয়ের বাড়ি, মার্কেট ও ব্যাংকে যাতায়াত বা ঘোরাফেরায় পরিবহন ও সহকারীসহ সহায়তা প্রদান।',
        descEn: 'Assistance with shopping, visiting relatives, bank errands, and general mobility with an aide.',
        accent: 'from-teal-900/80 via-teal-800/60 to-transparent',
        tag: 'bg-teal-500',
    },
    {
        id: 6,
        image: '/service_companion.png',
        serviceBn: 'মানসিক সঙ্গ ও সুস্থতা',
        serviceEn: 'Companion & Wellness',
        headlineBn: 'একাকী নন আর —\nআমাদের সঙ্গী আছেন',
        headlineEn: 'Never alone —\nour companion is here',
        descBn: 'সঙ্গ দেওয়া ও গল্প করা, বই বা পত্রিকা পড়ে শোনানো কাউন্সেলিং এবং মানসিক প্রফুল্লতা বজায় রাখতে সহায়তা প্রদান।',
        descEn: 'Companionship, reading books/newspapers, counseling, and mental wellness support.',
        accent: 'from-orange-900/80 via-orange-800/60 to-transparent',
        tag: 'bg-orange-500',
    },
];

export default function HeroSlider() {
    const { lang, t } = useLang();
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const goTo = useCallback((index: number, dir: 'left' | 'right' = 'right') => {
        if (isAnimating) return;
        setIsAnimating(true);
        setDirection(dir);
        setTimeout(() => {
            setCurrent(index);
            setIsAnimating(false);
        }, 600);
    }, [isAnimating]);

    const next = useCallback(() => {
        goTo((current + 1) % SLIDES.length, 'right');
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + SLIDES.length) % SLIDES.length, 'left');
    }, [current, goTo]);

    // Auto-play every 5 seconds
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = SLIDES[current];

    return (
        <section className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: '600px' }}>

            {/* Background Image with Ken Burns effect */}
            <div className="absolute inset-0 z-0">
                {SLIDES.map((s, i) => (
                    <div
                        key={s.id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            i === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                        }`}
                        style={{ transition: 'opacity 0.7s ease, transform 6s ease' }}
                    >
                        <Image
                            src={s.image}
                            alt={s.serviceBn}
                            fill
                            className="object-cover"
                            priority={i === 0}
                            sizes="100vw"
                        />
                    </div>
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 z-10 bg-gradient-to-r ${slide.accent} transition-all duration-700`} />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <div className="max-w-2xl">

                        {/* Service Tag */}
                        <div
                            key={`tag-${current}`}
                            className={`inline-flex items-center gap-2 ${slide.tag} text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 animate-fade-in-up`}
                            style={{ animationDelay: '0.1s' }}
                        >
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            {lang === 'bn' ? slide.serviceBn : slide.serviceEn}
                        </div>

                        {/* Main Headline */}
                        <h1
                            key={`headline-${current}`}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 animate-fade-in-up"
                            style={{ animationDelay: '0.2s', whiteSpace: 'pre-line' }}
                        >
                            {lang === 'bn' ? slide.headlineBn : slide.headlineEn}
                        </h1>

                        {/* English sub-headline (only show if viewing in Bengali) */}
                        {lang === 'bn' && (
                            <p
                                key={`enhead-${current}`}
                                className="text-lg text-white/70 font-medium italic mb-4 animate-fade-in-up"
                                style={{ animationDelay: '0.3s', whiteSpace: 'pre-line' }}
                            >
                                {slide.headlineEn}
                            </p>
                        )}

                        {/* Description */}
                        <p
                            key={`desc-${current}`}
                            className="text-base md:text-lg text-white/90 mb-8 max-w-lg leading-relaxed animate-fade-in-up"
                            style={{ animationDelay: '0.35s' }}
                        >
                            {lang === 'bn' ? slide.descBn : slide.descEn}
                        </p>

                        {/* CTA Buttons */}
                        <div
                            key={`cta-${current}`}
                            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
                            style={{ animationDelay: '0.45s' }}
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-teal-900/30"
                            >
                                <Phone className="w-5 h-5" />
                                {t('এখনই যোগাযোগ করুন', 'Contact Us Now')}
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 backdrop-blur-sm"
                            >
                                {t('সকল সেবা দেখুন →', 'View All Services →')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom: Dots + Slide Thumbnails */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-4">

                {/* Service Thumbnail Nav */}
                <div className="hidden md:flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => goTo(i, i > current ? 'right' : 'left')}
                            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                i === current
                                    ? 'bg-white text-gray-900 shadow-md scale-105'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            {lang === 'bn' ? s.serviceBn : s.serviceEn}
                        </button>
                    ))}
                </div>

                {/* Dots (mobile) */}
                <div className="flex md:hidden items-center gap-2">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`rounded-full transition-all ${
                                i === current ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
                <div
                    className="h-full bg-teal-400 transition-none"
                    style={{
                        width: `${((current + 1) / SLIDES.length) * 100}%`,
                        transition: 'width 0.6s ease',
                    }}
                />
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}
