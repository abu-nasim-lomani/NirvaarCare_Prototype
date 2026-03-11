'use client';
import Link from 'next/link';
import { ArrowRight, Target, Users, Award, CheckCircle } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const TEAM = [
    { name: 'ডা. আরিফুল ইসলাম', en: 'Dr. Ariful Islam', role: 'প্রধান চিকিৎসা উপদেষ্টা', roleEn: 'Chief Medical Advisor', avatar: '👨‍⚕️', exp: '১৫ বছর' },
    { name: 'ডা. শামিমা আক্তার', en: 'Dr. Shamima Akter', role: 'সাইকোলজিস্ট', roleEn: 'Psychologist', avatar: '👩‍⚕️', exp: '১২ বছর' },
    { name: 'রফিকুল ইসলাম', en: 'Rafiqul Islam', role: 'নার্সিং লিড', roleEn: 'Nursing Lead', avatar: '🧑‍⚕️', exp: '৮ বছর' },
    { name: 'তানিয়া হোসেন', en: 'Tania Hossain', role: 'অপারেশন্স হেড', roleEn: 'Operations Head', avatar: '👩‍💼', exp: '১০ বছর' },
];

const STATS = [
    { num: '৫০০+', label: 'পরিবার সেবিত' },
    { num: '৫০+', label: 'যাচাইকৃত কেয়ারগিভার' },
    { num: '৯৮%', label: 'সন্তুষ্টির হার' },
    { num: '৩', label: 'বছরের অভিজ্ঞতা' },
];

export default function AboutPage() {
    const { t } = useLang();
    return (
        <div>
            {/* Hero */}
            <div className="bg-gradient-to-br from-primary-dark to-primary text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-black mb-4">{t('আমাদের সম্পর্কে', 'About Us')}</h1>
                    <p className="text-blue-100 text-lg">{t('কেন নির্ভার কেয়ার শুরু হলো তার গল্প', 'The story of why Nirvaar Care was founded')}</p>
                </div>
            </div>

            {/* Mission */}
            <section className="py-16 max-w-4xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-accent" />
                            <span className="font-bold text-accent uppercase text-sm tracking-wide">{t('আমাদের মিশন', 'Our Mission')}</span>
                        </div>
                        <h2 className="text-3xl font-black text-primary-dark mb-4">{t('প্রতিটি বয়স্ক মানুষ যেন ভালো থাকেন', 'Every elder deserves quality care')}</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">{t('২০২২ সালে কো-ফাউন্ডার রাহিম সাহেব তাঁর বাবার অসুস্থতার সময় উপলব্ধি করলেন — প্রবাসে থেকে দেশে বাবা-মায়ের যত্ন নেওয়া কতটা কঠিন। সেখান থেকেই জন্ম নিল নির্ভার কেয়ার।', 'In 2022, co-founder Rahim realized how difficult it is to care for aging parents from abroad. That insight born Nirvaar Care.')}</p>
                        <p className="text-gray-600 leading-relaxed">{t('আমাদের লক্ষ্য: প্রযুক্তি এবং মানবিক যত্নের সমন্বয়ে প্রতিটি বয়স্ক মানুষকে বিশ্বমানের সেবা দেওয়া।', 'Our goal: give every elder world-class care through the perfect blend of technology and human touch.')}</p>
                    </div>
                    <div className="bg-primary/5 rounded-3xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {STATS.map(s => (
                                <div key={s.num} className="bg-white rounded-2xl p-4 text-center shadow-sm">
                                    <div className="text-3xl font-black text-primary">{s.num}</div>
                                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-12 bg-bg">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-black text-center text-primary-dark mb-8">{t('আমাদের মূল্যবোধ', 'Our Values')}</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[{ icon: '🤝', title: 'বিশ্বাস', desc: 'প্রতিটি কেয়ারগিভার NID যাচাইকৃত ও পুলিশ ভেরিফাইড' },
                        { icon: '💙', title: 'সহানুভূতি', desc: 'আমরা শুধু সেবা নই, পরিবারের মতো পাশে থাকি' },
                        { icon: '⚡', title: 'দ্রুততা', desc: '৬০ মিনিটের মধ্যে কেয়ারগিভার পৌঁছে যায়' }].map(v => (
                            <div key={v.title} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
                                <div className="text-4xl mb-3">{v.icon}</div>
                                <h3 className="font-bold text-primary-dark mb-2">{v.title}</h3>
                                <p className="text-sm text-gray-500">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <div className="flex items-center gap-2 justify-center mb-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="font-bold text-accent uppercase text-sm tracking-wide">{t('আমাদের দল', 'Our Team')}</span>
                </div>
                <h2 className="text-3xl font-black text-center text-primary-dark mb-10">{t('বিশেষজ্ঞদের সাথে পরিচয় হোন', 'Meet the Experts')}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {TEAM.map(m => (
                        <div key={m.name} className="bg-white rounded-2xl p-5 text-center border border-gray-100 card-hover">
                            <div className="text-5xl mb-3">{m.avatar}</div>
                            <h3 className="font-bold text-gray-800 text-sm">{t(m.name, m.en)}</h3>
                            <div className="text-xs text-primary font-medium mt-1">{t(m.role, m.roleEn)}</div>
                            <div className="flex items-center gap-1 justify-center mt-2">
                                <Award className="w-3 h-3 text-accent" />
                                <span className="text-xs text-gray-400">{m.exp} {t('অভিজ্ঞতা', 'exp.')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="bg-primary text-white text-center py-12">
                <h2 className="text-2xl font-black mb-3">{t('আমাদের সাথে যোগ দিন', 'Join our family')}</h2>
                <Link href="/login" className="inline-flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform">
                    {t('আজই শুরু করুন', 'Start Today')} <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
