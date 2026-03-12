'use client';
import { Shield, Star, Award, MapPin } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const TEAM_MEMBERS = [
    {
        category: 'doctor', categoryBn: 'বিশেষজ্ঞ চিকিৎসক', categoryEn: 'Specialist Doctors',
        members: [
            { id: 't1', name: 'ডা. শফিক আহমেদ', roleBn: 'সিনিয়র জেরিয়াট্রিশিয়ান (বার্ধক্যবিদ্যা)', roleEn: 'Senior Geriatrician', exp: '১৫ বছরের অভিজ্ঞতা', expEn: '15 Yrs Exp', rating: 4.9, avatar: '👨‍⚕️', verified: true },
            { id: 't2', name: 'ডা. নুসরাত জাহান', roleBn: 'জেনারেল ফিজিশিয়ান (ফ্যামিলি মেডিসিন)', roleEn: 'General Physician', exp: '৮ বছরের অভিজ্ঞতা', expEn: '8 Yrs Exp', rating: 4.8, avatar: '👩‍⚕️', verified: true },
        ]
    },
    {
        category: 'nurse', categoryBn: 'প্রশিক্ষিত নার্স ও কেয়ারগিভার', categoryEn: 'Trained Nurses & Caregivers',
        members: [
            { id: 't3', name: 'ফারিদা নার্স', roleBn: 'রেজিস্টার্ড সিনিয়র নার্স', roleEn: 'Registered Senior Nurse', exp: '১০ বছরের অভিজ্ঞতা', expEn: '10 Yrs Exp', rating: 4.9, avatar: '👩‍⚕️', verified: true },
            { id: 't4', name: 'করিম হোসেন', roleBn: 'সার্টিফাইড এলডার কেয়ারগিভার', roleEn: 'Certified Elder Caregiver', exp: '৬ বছরের অভিজ্ঞতা', expEn: '6 Yrs Exp', rating: 4.7, avatar: '👨‍⚕️', verified: true },
            { id: 't5', name: 'সালমা বেগম', roleBn: 'পোস্ট-অপারেটিভ কেয়ারগিভার', roleEn: 'Post-Operative Caregiver', exp: '৫ বছরের অভিজ্ঞতা', expEn: '5 Yrs Exp', rating: 4.8, avatar: '👩‍⚕️', verified: true },
        ]
    },
    {
        category: 'therapist', categoryBn: 'ফিজিওথেরাপিস্ট ও সাইকোলজিস্ট', categoryEn: 'Physiotherapists & Psychologists',
        members: [
            { id: 't6', name: 'আহমেদ রেজা', roleBn: 'সিনিয়র ফিজিওথেরাপিস্ট', roleEn: 'Senior Physiotherapist', exp: '১২ বছরের অভিজ্ঞতা', expEn: '12 Yrs Exp', rating: 4.9, avatar: '🏃', verified: true },
            { id: 't7', name: 'সামিনা চৌধুরী', roleBn: 'ক্লিনিক্যাল সাইকোলজিস্ট', roleEn: 'Clinical Psychologist', exp: '৭ বছরের অভিজ্ঞতা', expEn: '7 Yrs Exp', rating: 4.8, avatar: '🧠', verified: true },
        ]
    }
];

export default function TeamPage() {
    const { t } = useLang();

    return (
        <div>
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 text-center">
                <h1 className="text-4xl font-black mb-3">{t('আমাদের বিশেষজ্ঞ দল', 'Our Expert Team')}</h1>
                <p className="text-blue-100 max-w-2xl mx-auto px-4">
                    {t('আপনার প্রিয়জনের সর্বোত্তম সুরক্ষার জন্য আমাদের প্রতিটি কেয়ারগিভার এবং ডাক্তার NID যাচাইকৃত, পুলিশ ক্লিয়ারেনস প্রাপ্ত এবং বিশেষ প্রশিক্ষণপ্রাপ্ত।', 'For the best protection of your loved ones, every caregiver and doctor is NID verified, police cleared, and specially trained.')}
                </p>
                <div className="flex justify-center gap-6 mt-6 text-sm font-bold">
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                        <Shield className="w-4 h-4 text-green-300" /> {t('১০০% যাচাইকৃত', '100% Verified')}
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                        <Award className="w-4 h-4 text-yellow-300" /> {t('প্রশিক্ষণপ্রাপ্ত', 'Professionally Trained')}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                {TEAM_MEMBERS.map(section => (
                    <div key={section.category} className="mb-16 last:mb-0">
                        <h2 className="text-2xl font-black text-gray-800 mb-8 pb-2 border-b-2 border-gray-100 inline-block">
                            {t(section.categoryBn, section.categoryEn)}
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {section.members.map(member => (
                                <div key={member.id} className="bg-white rounded-2xl border border-gray-100 p-6 card-hover shadow-sm">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl">
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                                                {member.verified && <Shield className="w-4 h-4 text-success" />}
                                            </div>
                                            <p className="text-sm text-primary font-medium">{t(member.roleBn, member.roleEn)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                                        <div className="flex items-center gap-1 font-medium">
                                            <Award className="w-4 h-4 text-gray-400" /> {t(member.exp, member.expEn)}
                                        </div>
                                        <div className="flex items-center gap-1 font-bold text-gray-700">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {member.rating.toFixed(1)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <section className="py-12 bg-primary/5 border-t border-primary/10">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-black text-primary-dark mb-4">{t('আমাদের টিমে যোগ দিতে চান?', 'Want to join our team?')}</h2>
                    <p className="text-gray-600 mb-6">{t('আপনি যদি একজন অভিজ্ঞ নার্স, ডাক্তার বা কেয়ারগিভার হয়ে থাকেন, তবে আজই নির্ভার কেয়ারে আবেদন করুন।', 'If you are an experienced nurse, doctor, or caregiver, apply to NirvaarCare today.')}</p>
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary font-bold px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors">
                        {t('আবেদন করুন', 'Apply Now')}
                    </a>
                </div>
            </section>
        </div>
    );
}
