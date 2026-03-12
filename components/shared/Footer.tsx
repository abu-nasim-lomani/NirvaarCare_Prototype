'use client';
import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

export default function Footer() {
    const { t } = useLang();
    return (
        <footer className="bg-primary-dark text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white fill-white" />
                            </div>
                            <span className="font-bold text-xl">নির্ভার কেয়ার</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{t('আপনার প্রিয়জনের যত্ন, এখন আপনার হাতের মুঠোয়।', "Your loved one's care, now in your hands.")}</p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"><Instagram className="w-4 h-4" /></a>
                            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"><Youtube className="w-4 h-4" /></a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-accent mb-3">{t('আমাদের সেবা', 'Our Services')}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            {[['ডায়াগনস্টিক সেবা', 'Diagnostic', '/services/diagnostic'], ['চিকিৎসক সেবা', 'Doctor', '/services/doctor'], ['ঔষধ সেবা', 'Medicine', '/services/medicine'], ['জরুরি সেবা', 'Emergency', '/services/emergency'], ['দৈনন্দিন সেবা', 'Daily Needs', '/services/daily'], ['মানসিক সঙ্গ', 'Companion', '/services/companion']].map(([bn, en, href]) => (
                                <li key={href}><Link href={href} className="hover:text-accent transition-colors">{t(bn, en)}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-accent mb-3">{t('প্রতিষ্ঠান', 'Company')}</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            {[['আমাদের সম্পর্কে', 'About', '/about'], ['আমাদের টিম', 'Team', '/team'], ['মূল্য ও প্যাকেজ', 'Pricing', '/pricing'], ['যোগাযোগ', 'Contact', '/contact'], ['পার্টনার হন', 'Become a Partner', '/partners/register'], ['কেয়ারগিভার হন', 'Become a Caregiver', '/login']].map(([bn, en, href]) => (
                                <li key={href}><Link href={href} className="hover:text-accent transition-colors">{t(bn, en)}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-accent mb-3">{t('যোগাযোগ', 'Contact')}</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" /><div><div className="font-semibold text-white">০১৮০০-০০০০০০</div><div className="text-xs">{t('২৪/৭ হেল্পলাইন', '24/7 Helpline')}</div></div></div>
                            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent" /><span>care@nirvaarcare.com.bd</span></div>
                            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent" /><span>{t('ঢাকা-১২১২, বাংলাদেশ', 'Dhaka-1212, Bangladesh')}</span></div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <span>© ২০২৬ নির্ভার কেয়ার প্রাইভেট লিমিটেড। সর্বস্বত্ব সংরক্ষিত।</span>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <a href="#" className="hover:text-accent">{t('গোপনীয়তা নীতি', 'Privacy Policy')}</a>
                        <a href="#" className="hover:text-accent">{t('ব্যবহারের শর্ত', 'Terms of Service')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
