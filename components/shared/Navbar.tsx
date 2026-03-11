'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Phone, Bell, Menu, X, Globe } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useLang } from '@/components/context/LanguageContext';
import { useA11y } from '@/components/context/AccessibilityContext';

export default function Navbar() {
    const { isLoggedIn, role, logout } = useAuth();
    const { lang, setLang, t } = useLang();
    const { incFont, decFont, toggleContrast } = useA11y();
    const [menuOpen, setMenuOpen] = useState(false);

    const portalLink = role === 'caregiver' ? '/provider' : role === 'admin' ? '/admin' : role === 'partner' ? '/partners' : '/dashboard';

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="font-bold text-xl text-primary-dark">নির্ভার <span className="text-accent">কেয়ার</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t('সেবাসমূহ', 'Services')}</Link>
                        <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t('প্যাকেজ', 'Pricing')}</Link>
                        <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t('আমাদের সম্পর্কে', 'About')}</Link>
                        <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t('যোগাযোগ', 'Contact')}</Link>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        {/* Accessibility */}
                        <div className="hidden md:flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1">
                            <button onClick={decFont} className="text-gray-500 hover:text-primary font-bold text-xs px-1">A-</button>
                            <button onClick={incFont} className="text-gray-500 hover:text-primary font-bold text-sm px-1">A+</button>
                            <button onClick={toggleContrast} className="text-gray-500 hover:text-primary ml-1" title="High Contrast">◐</button>
                        </div>

                        {/* Language Toggle */}
                        <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                            className="hidden md:flex items-center gap-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg px-2 py-1.5 hover:border-primary hover:text-primary">
                            <Globe className="w-3 h-3" />
                            {lang === 'bn' ? 'EN' : 'বাং'}
                        </button>

                        {/* Emergency */}
                        <a href="tel:01800000000" className="hidden md:flex items-center gap-1 bg-red-50 text-emergency border border-red-200 rounded-lg px-2 py-1.5 text-xs font-bold hover:bg-emergency hover:text-white transition-colors">
                            <Phone className="w-3 h-3" /> {t('জরুরি কল', 'Emergency')}
                        </a>

                        {/* Auth */}
                        {isLoggedIn ? (
                            <div className="flex items-center gap-2">
                                <Link href="/dashboard/notifications">
                                    <Bell className="w-5 h-5 text-gray-500 hover:text-primary cursor-pointer" />
                                </Link>
                                <Link href={portalLink} className="bg-primary text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-primary-dark transition-colors">
                                    {t('ড্যাশবোর্ড', 'Dashboard')}
                                </Link>
                                <button onClick={logout} className="text-sm text-gray-500 hover:text-emergency">{t('লগআউট', 'Logout')}</button>
                            </div>
                        ) : (
                            <Link href="/login" className="bg-primary text-white rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-primary-dark transition-colors">
                                {t('লগইন', 'Login')}
                            </Link>
                        )}

                        {/* Mobile menu toggle */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1">
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
                    {[['সেবাসমূহ', 'Services', '/services'], ['প্যাকেজ', 'Pricing', '/pricing'], ['আমাদের সম্পর্কে', 'About', '/about'], ['যোগাযোগ', 'Contact', '/contact']].map(([bn, en, href]) => (
                        <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="block text-sm py-2 text-gray-700 hover:text-primary border-b border-gray-50">{t(bn, en)}</Link>
                    ))}
                    {isLoggedIn && <Link href={portalLink} onClick={() => setMenuOpen(false)} className="block text-sm py-2 text-primary font-medium">{t('ড্যাশবোর্ড', 'Dashboard')}</Link>}
                    <div className="flex gap-2 pt-2">
                        <button onClick={decFont} className="text-xs border px-2 py-1 rounded">A-</button>
                        <button onClick={incFont} className="text-xs border px-2 py-1 rounded">A+</button>
                        <button onClick={toggleContrast} className="text-xs border px-2 py-1 rounded">Contrast</button>
                        <button onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')} className="text-xs border px-2 py-1 rounded ml-auto">{lang === 'bn' ? 'EN' : 'বাং'}</button>
                    </div>
                </div>
            )}
        </nav>
    );
}
