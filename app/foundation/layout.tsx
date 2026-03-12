'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, Globe, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const NAV_LINKS = [
    { href: '/foundation', label: 'ফাউন্ডেশন', en: 'Home', exact: true },
    { href: '/foundation/campaigns', label: 'সব ক্যাম্পেইন', en: 'Campaigns' },
    { href: '/foundation/stories', label: 'সুস্থতার গল্প', en: 'Stories' },
    { href: '/foundation/transparency', label: 'স্বচ্ছতা', en: 'Transparency' },
    { href: '/foundation/apply', label: 'আবেদন করুন', en: 'Apply' },
];

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { lang, setLang, t } = useLang();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname.startsWith(href);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Foundation Navbar */}
            <nav className="sticky top-0 z-50 bg-white border-b border-emerald-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="hidden md:flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors">
                                <ArrowLeft className="w-3 h-3" /> NirvaarCare
                            </Link>
                            <span className="hidden md:block w-px h-5 bg-gray-200" />
                            <Link href="/foundation" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-white fill-white" />
                                </div>
                                <div className="leading-tight">
                                    <span className="font-black text-emerald-700 text-base">নির্ভার কেয়ার</span>
                                    <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest -mt-0.5">Foundation</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                        isActive(link.href, link.exact)
                                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                            : 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                                    }`}
                                >
                                    {lang === 'bn' ? link.label : link.en}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Transparency badge */}
                            <Link href="/foundation/transparency" className="hidden lg:flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-emerald-100 transition-colors">
                                <ShieldCheck className="w-3.5 h-3.5" /> ১০০% স্বচ্ছ
                            </Link>

                            {/* Language */}
                            <button
                                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                                className="flex items-center gap-1 text-xs font-bold text-gray-500 border border-gray-200 rounded-lg px-2 py-1.5 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                            >
                                <Globe className="w-3 h-3" />
                                {lang === 'bn' ? 'EN' : 'বাং'}
                            </button>

                            {/* Donor Dashboard */}
                            <Link href="/foundation/dashboard" className="hidden md:flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">
                                <Heart className="w-3.5 h-3.5 fill-white" />
                                {lang === 'bn' ? 'আমার ওয়ালেট' : 'My Wallet'}
                            </Link>

                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="md:hidden p-2 text-gray-500 hover:text-emerald-600"
                            >
                                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                                    isActive(link.href, link.exact)
                                        ? 'bg-emerald-600 text-white'
                                        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                                }`}
                            >
                                {lang === 'bn' ? link.label : link.en}
                            </Link>
                        ))}
                        <Link
                            href="/foundation/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className="block mt-3 px-4 py-3 rounded-xl text-sm font-bold bg-emerald-600 text-white text-center"
                        >
                            ❤️ আমার ওয়ালেট
                        </Link>
                        <Link href="/" className="block text-center text-xs text-gray-400 hover:text-primary mt-2">
                            ← NirvaarCare মূল সাইটে ফিরুন
                        </Link>
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Foundation Footer */}
            <footer className="bg-emerald-900 text-emerald-100 py-10 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Heart className="w-5 h-5 fill-white text-white" />
                                <span className="font-black text-white">নির্ভার কেয়ার ফাউন্ডেশন</span>
                            </div>
                            <p className="text-sm text-emerald-300">১০০% স্বচ্ছ ডোনেশন ট্র্যাকিং · ০% অ্যাডমিন ফি</p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <Link href="/foundation/stories" className="text-emerald-300 hover:text-white transition-colors">সুস্থতার গল্প</Link>
                            <Link href="/foundation/transparency" className="text-emerald-300 hover:text-white transition-colors">স্বচ্ছতা রিপোর্ট</Link>
                            <Link href="/foundation/apply" className="text-emerald-300 hover:text-white transition-colors">আবেদন করুন</Link>
                            <Link href="/" className="text-emerald-300 hover:text-white transition-colors">মূল সাইট</Link>
                        </div>
                    </div>
                    <div className="border-t border-emerald-800 mt-8 pt-6 text-xs text-emerald-400 text-center">
                        © 2026 NirvaarCare Foundation · Registered NGO, Bangladesh · সকল অধিকার সংরক্ষিত
                    </div>
                </div>
            </footer>
        </div>
    );
}
