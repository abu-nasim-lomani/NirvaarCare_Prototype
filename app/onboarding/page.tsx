'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useLang } from '@/components/context/LanguageContext';

const STEPS = ['প্রোফাইল', 'রোগীর তথ্য', 'জরুরি যোগাযোগ', 'সম্পন্ন!'];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({ name: '', age: '', relation: 'নিজে', district: '' });
    const [patient, setPatient] = useState({ name: '', age: '', conditions: '', bloodGroup: '' });
    const [emergency, setEmergency] = useState({ name: '', phone: '', relation: '' });
    const { t } = useLang();
    const router = useRouter();

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-black text-primary-dark">{t('স্বাগতম! প্রোফাইল সেটআপ করুন', 'Welcome! Set up your profile')}</h1>
                    <p className="text-sm text-gray-500 mt-1">{t('মাত্র ৩ ধাপ, ২ মিনিটেই সম্পন্ন', 'Just 3 steps, done in 2 minutes')}</p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            {i < STEPS.length - 1 && <div className={`h-0.5 w-12 md:w-20 mx-1 transition-all ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-7">
                    {/* Step 0 */}
                    {step === 0 && (
                        <div className="space-y-4">
                            <h2 className="font-bold text-lg text-gray-800">{t('আপনার তথ্য', 'Your Information')}</h2>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('আপনার নাম', 'Your Name')}</label>
                                <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="inp" placeholder={t('নাম লিখুন', 'Enter name')} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('বয়স', 'Age')}</label>
                                    <input value={profile.age} onChange={e => setProfile(p => ({ ...p, age: e.target.value }))} type="number" className="inp" placeholder="35" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('জেলা', 'District')}</label>
                                    <select value={profile.district} onChange={e => setProfile(p => ({ ...p, district: e.target.value }))} className="inp">
                                        <option value="">{t('বাছুন', 'Select')}</option>
                                        {['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী', 'খুলনা', 'বরিশাল'].map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('আপনি কি সম্পর্কে?', 'Your relation to patient')}</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['নিজে', 'ছেলে', 'মেয়ে', 'ভাই', 'বোন', 'অন্যান্য'].map(r => (
                                        <button key={r} onClick={() => setProfile(p => ({ ...p, relation: r }))}
                                            className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${profile.relation === r ? 'border-primary bg-primary text-white' : 'border-gray-200 hover:border-primary'}`}>
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="font-bold text-lg text-gray-800">{t('যার সেবা দরকার তার তথ্য', "Patient's Information")}</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('নাম', 'Name')}</label>
                                    <input value={patient.name} onChange={e => setPatient(p => ({ ...p, name: e.target.value }))} className="inp" placeholder={t('রোগীর নাম', "Patient's name")} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('বয়স', 'Age')}</label>
                                    <input value={patient.age} onChange={e => setPatient(p => ({ ...p, age: e.target.value }))} type="number" className="inp" placeholder="65" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('বিদ্যমান রোগসমূহ', 'Existing Conditions')}</label>
                                <input value={patient.conditions} onChange={e => setPatient(p => ({ ...p, conditions: e.target.value }))} className="inp" placeholder={t('যেমন: ডায়াবেটিস, উচ্চরক্তচাপ', 'e.g. Diabetes, Hypertension')} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('রক্তের গ্রুপ', 'Blood Group')}</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                        <button key={bg} onClick={() => setPatient(p => ({ ...p, bloodGroup: bg }))}
                                            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${patient.bloodGroup === bg ? 'border-emergency bg-emergency text-white' : 'border-gray-200 hover:border-emergency'}`}>
                                            {bg}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="font-bold text-lg text-gray-800">{t('জরুরি যোগাযোগ', 'Emergency Contact')}</h2>
                            <p className="text-sm text-gray-500">{t('প্রবাসী হলে আপনার দেশীয় যোগাযোগ নম্বর দিন', 'If NRB, provide your local emergency contact')}</p>
                            {[['name', 'নাম', 'Enter name'], ['phone', 'ফোন নম্বর', '01XXXXXXXXX'], ['relation', 'সম্পর্ক', 'e.g. Uncle']].map(([f, bn, ph]) => (
                                <div key={f}>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t(bn, bn)}</label>
                                    <input value={emergency[f as keyof typeof emergency]} onChange={e => setEmergency(v => ({ ...v, [f]: e.target.value }))} className="inp" placeholder={t(ph, ph)} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="text-center py-4">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="font-black text-2xl text-primary-dark mb-2">{t('সেটআপ সম্পন্ন!', 'Setup complete!')}</h2>
                            <p className="text-gray-500 text-sm mb-6">{t('আপনার প্রোফাইল তৈরি হয়েছে। এবার সেবা বুক করুন।', 'Your profile is ready. Now book a service.')}</p>
                            <button onClick={() => router.push('/dashboard')} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                                {t('ড্যাশবোর্ডে যান', 'Go to Dashboard')} <ArrowRight className="inline w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Navigation */}
                    {step < 3 && (
                        <div className="flex gap-2 mt-6">
                            {step > 0 && (
                                <button onClick={() => setStep(s => s - 1 as 0 | 1 | 2 | 3)} className="flex items-center gap-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium hover:border-primary">
                                    <ArrowLeft className="w-4 h-4" /> {t('পিছনে', 'Back')}
                                </button>
                            )}
                            <button onClick={() => setStep(s => Math.min(s + 1, 3) as 0 | 1 | 2 | 3)} className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                                {step === 2 ? t('সম্পন্ন করুন', 'Finish') : t('পরবর্তী', 'Next')} <ArrowRight className="inline w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <style jsx>{`.inp { width: 100%; border: 2px solid #e5e7eb; border-radius: 12px; padding: 10px 14px; font-size: 14px; outline: none; transition: border-color 0.2s; } .inp:focus { border-color: #1A5C8C; }`}</style>
            </div>
        </div>
    );
}
