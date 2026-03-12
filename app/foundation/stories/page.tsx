'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, PlayCircle, X, MapPin, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';

const STORIES = [
    {
        id: 's1',
        name: 'কাসেম মিয়া',
        age: 52,
        district: 'ঢাকা, মিরপুর',
        condition: 'Heart Surgery',
        conditionBn: 'হার্ট সার্জারি',
        recoveredDate: 'January 2026',
        fundRaised: 150000,
        donors: 342,
        quote: '"আমি ভেবেছিলাম আর বাঁচব না। কিন্তু নির্ভার কেয়ার ফাউন্ডেশনের কারণে আজ আমি আমার সন্তানদের সাথে আছি।"',
        enQuote: '"I thought I would not survive. But thanks to NirvaarCare Foundation, I am alive with my children today."',
        thumbnail: '❤️',
        videoLength: '2:34',
        tag: 'Surgery',
    },
    {
        id: 's2',
        name: 'রাহেলা বেগম',
        age: 38,
        district: 'চট্টগ্রাম, পটিয়া',
        condition: 'Cancer Treatment',
        conditionBn: 'ক্যান্সার চিকিৎসা',
        recoveredDate: 'December 2025',
        fundRaised: 320000,
        donors: 214,
        quote: '"৬ মাসের কেমো শেষে আমি এখন সুস্থ। এত মানুষ আমার জন্য দোয়া করেছেন — আল্লাহ তাদের ভালো রাখুন।"',
        enQuote: '"After 6 months of chemo, I am healthy now. So many people prayed for me — may Allah bless them."',
        thumbnail: '💪',
        videoLength: '3:12',
        tag: 'Cancer',
    },
    {
        id: 's3',
        name: 'রহিম সাহেব',
        age: 67,
        district: 'সিলেট, জিন্দাবাজার',
        condition: 'Wheelchair & Mobility',
        conditionBn: 'হুইলচেয়ার সহায়তা',
        recoveredDate: 'November 2025',
        fundRaised: 8500,
        donors: 89,
        quote: '"এখন নিজে নিজে বাজারে যেতে পারি। কত বছর পর! সবাইকে অনেক ধন্যবাদ।"',
        enQuote: '"I can now go to the market by myself. After so many years! Thank you everyone."',
        thumbnail: '🦽',
        videoLength: '1:48',
        tag: 'Equipment',
    },
    {
        id: 's4',
        name: 'জামিলা খাতুন',
        age: 29,
        district: 'কুমিল্লা, কোতোয়ালি',
        condition: '3 Months Medicine',
        conditionBn: '৩ মাসের ওষুধ',
        recoveredDate: 'February 2026',
        fundRaised: 12000,
        donors: 61,
        quote: '"ওষুধ থামিয়ে দিয়েছিলাম — টাকা ছিল না। এখন নিয়মিত খেতে পারছি, শরীর অনেক ভালো।"',
        enQuote: '"I had stopped my medicine — no money. Now I can take it regularly, feeling much better."',
        thumbnail: '💊',
        videoLength: '2:05',
        tag: 'Medicine',
    },
    {
        id: 's5',
        name: 'আব্দুল করিম',
        age: 44,
        district: 'ময়মনসিংহ সদর',
        condition: 'Kidney Treatment',
        conditionBn: 'কিডনি চিকিৎসা',
        recoveredDate: 'October 2025',
        fundRaised: 210000,
        donors: 178,
        quote: '"ডাক্তার বলেছিল ৩ মাসের বেশি নেই। এখন ১ বছর হয়ে গেল — আলহামদুলিল্লাহ।"',
        enQuote: '"The doctor said I had 3 months left. It has now been a year — Alhamdulillah."',
        thumbnail: '🫁',
        videoLength: '2:58',
        tag: 'Surgery',
    },
    {
        id: 's6',
        name: 'হাসান আলী',
        age: 8,
        district: 'খুলনা, দৌলতপুর',
        condition: 'Eye Surgery',
        conditionBn: 'চোখের অপারেশন',
        recoveredDate: 'March 2026',
        fundRaised: 65000,
        donors: 290,
        quote: '"এখন স্কুলে পড়তে পারি, বোর্ডের লেখা দেখতে পাই। আগে কিছুই বুঝতাম না।"',
        enQuote: '"I can now study at school and see the board. Before, I couldn\'t understand anything."',
        thumbnail: '👁️',
        videoLength: '1:22',
        tag: 'Surgery',
    },
];

const TAGS = ['All', 'Surgery', 'Cancer', 'Medicine', 'Equipment'];

export default function StoriesPage() {
    const [activeTag, setActiveTag] = useState('All');
    const [playingVideo, setPlayingVideo] = useState<typeof STORIES[0] | null>(null);

    const filtered = activeTag === 'All' ? STORIES : STORIES.filter(s => s.tag === activeTag);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* Hero */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700 text-white py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <Link href="/foundation" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white text-sm font-bold mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> ফাউন্ডেশনে ফিরুন
                    </Link>
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <CheckCircle className="w-4 h-4 text-emerald-300" /> সত্যিকারের গল্প, সত্যিকারের মানুষ
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                        সুস্থতার গল্প <span className="text-emerald-300">১৪৫+ জন</span>
                    </h1>
                    <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                        আপনাদের দানে যারা নতুন জীবন ফিরে পেয়েছেন — তারা নিজেদের কথা বলছেন।
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-10">
                        {[
                            { v: '১৪৫+', l: 'রোগী সুস্থ' },
                            { v: '৩,৪২০', l: 'দাতা' },
                            { v: '৳৪৮ লাখ', l: 'মোট সংগ্রহ' },
                        ].map(s => (
                            <div key={s.l} className="text-center">
                                <div className="text-3xl font-black">{s.v}</div>
                                <div className="text-xs text-emerald-200 font-bold mt-1 uppercase tracking-wider">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Tags */}
            <div className="sticky top-0 bg-white border-b border-gray-100 z-10 py-4 px-4 shadow-sm">
                <div className="max-w-5xl mx-auto flex items-center gap-3 flex-wrap justify-center">
                    {TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTag === tag ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {tag}
                        </button>
                    ))}
                    <span className="text-xs text-gray-400 ml-2">{filtered.length} জনের গল্প</span>
                </div>
            </div>

            {/* Stories Grid */}
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map(story => (
                        <div key={story.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">

                            {/* Video Thumbnail */}
                            <div
                                className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center cursor-pointer"
                                onClick={() => setPlayingVideo(story)}
                            >
                                <span className="text-6xl">{story.thumbnail}</span>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                        <PlayCircle className="w-10 h-10 text-emerald-600" />
                                    </div>
                                </div>
                                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg">{story.videoLength}</span>
                                <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> সুস্থ হয়েছেন
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <div>
                                        <h3 className="font-black text-gray-800 text-lg leading-tight">{story.name}</h3>
                                        <p className="text-sm text-emerald-600 font-bold">{story.conditionBn}</p>
                                    </div>
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full whitespace-nowrap shrink-0">বয়স {story.age}</span>
                                </div>

                                <p className="text-sm text-gray-600 italic leading-relaxed mb-4 line-clamp-3">
                                    {story.quote}
                                </p>

                                <div className="border-t border-gray-50 pt-4 flex items-center justify-between text-xs text-gray-400">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {story.district}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {story.recoveredDate}</span>
                                </div>

                                <div className="mt-3 flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-xs font-bold text-primary">
                                        <Heart className="w-3.5 h-3.5 fill-primary" /> {story.donors} জন দাতা
                                    </div>
                                    <div className="text-xs font-bold text-gray-500">৳{story.fundRaised.toLocaleString()} সংগ্রহ</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="max-w-2xl mx-auto px-4 text-center">
                <div className="bg-gradient-to-br from-emerald-700 to-teal-700 text-white rounded-3xl p-10">
                    <Heart className="w-10 h-10 mx-auto mb-4 text-emerald-200" fill="currentColor" />
                    <h2 className="text-2xl font-black mb-2">আপনিও একজনের গল্প বদলে দিন</h2>
                    <p className="text-emerald-100 text-sm mb-6">আপনার দানে পরবর্তী গল্পটা হয়তো আরো কাছের কারো।</p>
                    <Link href="/foundation" className="inline-flex items-center gap-2 bg-white text-emerald-800 px-8 py-3.5 rounded-xl font-black hover:bg-gray-100 transition-colors">
                        <Heart className="w-5 h-5" fill="currentColor" /> এখনই দান করুন
                    </Link>
                </div>
            </div>

            {/* Video Modal */}
            {playingVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPlayingVideo(null)}>
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div>
                                <h3 className="font-black text-gray-800">{playingVideo.name}-এর গল্প</h3>
                                <p className="text-xs text-emerald-600 font-bold">{playingVideo.conditionBn} · {playingVideo.recoveredDate}</p>
                            </div>
                            <button onClick={() => setPlayingVideo(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Simulated Video Player */}
                        <div className="relative bg-gray-900 h-64 flex items-center justify-center">
                            <span className="text-8xl opacity-30">{playingVideo.thumbnail}</span>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-3 animate-pulse">
                                    <PlayCircle className="w-12 h-12 text-white" />
                                </div>
                                <span className="text-white/70 text-sm">ভিডিও চলছে… {playingVideo.videoLength}</span>
                            </div>
                            {/* Fake progress bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                <div className="h-full bg-emerald-400 w-1/3 animate-pulse" />
                            </div>
                        </div>

                        <div className="p-6">
                            <p className="text-gray-700 italic text-sm leading-relaxed mb-4">{playingVideo.quote}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {playingVideo.district}</span>
                                <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-primary text-primary" /> {playingVideo.donors} জন দাতার সাহায্যে</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
