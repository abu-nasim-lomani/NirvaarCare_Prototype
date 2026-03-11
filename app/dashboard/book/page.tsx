'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Search, ArrowRight, Activity, Clock, Shield, Upload } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const SERVICES = [
    { id: 'diagnostic', bn: 'ডায়াগনস্টিক সেবা', en: 'Diagnostic Service', emoji: '🔬', price: '৳১,২০০+', items: ['রক্ত পরীক্ষা', 'ইউরিন টেস্ট', 'এক্স-রে (বুক)'] },
    { id: 'doctor', bn: 'চিকিৎসক সেবা', en: 'Doctor Service', emoji: '🧑‍⚕️', price: '৳৮০০+', items: ['জেনারেল ফিজিশিয়ান', 'স্পেশালিস্ট', 'টেলিমেডিসিন'] },
    { id: 'medicine', bn: 'ঔষধ ডেলিভারি', en: 'Medicine Delivery', emoji: '💊', price: '৳২০০+', items: ['নিয়মিত ওষুধ', 'ইমার্জেন্সি', 'হেলথ সাপ্লিমেন্ট'] },
    { id: 'emergency', bn: 'জরুরি সেবা', en: 'Emergency Care', emoji: '🚑', price: '৳১,৫০০+', items: ['অ্যাম্বুলেন্স', 'প্রাথমিক চিকিৎসা', 'অক্সিজেন'] },
    { id: 'daily', bn: 'দৈনন্দিন প্রয়োজন', en: 'Daily Needs', emoji: '🛍️', price: '৳৪০০+', items: ['বাজার করা', 'বিল পেমেন্ট', 'ব্যাংক কাজ'] },
    { id: 'companion', bn: 'মানসিক সঙ্গ', en: 'Senior Companion', emoji: '🤝', price: '৳৬০০+', items: ['গল্প করা', 'বই পড়ে শোনানো', 'হাঁটতে যাওয়া'] },
];

const FAMILY_MEMBERS = ['রাহেলা বেগম (নিজ)', 'আব্দুর রহিম (বাবা)', 'বেগম সালেহা (মা)'];

const CAREGIVERS = [
    { id: 'cg1', name: 'ফারিদা নার্স', age: 32, langs: ['বাংলা', 'English'], hobbies: ['গল্প করা', 'গান'], rating: 4.9 },
    { id: 'cg2', name: 'করিম হোসেন', age: 28, langs: ['বাংলা'], hobbies: ['বই পড়া', 'ধর্মীয় আলোচনা'], rating: 4.7 },
];

export default function BookingWizard() {
    const { t } = useLang();
    const [step, setStep] = useState(1);
    const [svcId, setSvcId] = useState('');
    const [form, setForm] = useState({ member: FAMILY_MEMBERS[0], date: '', time: '', address: '', notes: '', isSub: false });

    // Service-specific sub-options
    const [telemed, setTelemed] = useState(false);
    const [prescription, setPrescription] = useState('');
    const [caregiver, setCaregiver] = useState('');

    const nextStep = () => window.scrollTo(0, 0) || setStep(s => s + 1);
    const prevStep = () => window.scrollTo(0, 0) || setStep(s => s - 1);

    const curSvc = SERVICES.find(s => s.id === svcId);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Wizard Header */}
            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-500 rounded-full" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
                {[1, 2, 3].map(st => (
                    <div key={st} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-4 transition-colors duration-500 ${step >= st ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                        {st}
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-black text-gray-800">{t('কোন সেবাটি প্রয়োজন?', 'Which service do you need?')}</h2>
                            <p className="text-sm text-gray-500 mt-1">{t('একটি স্পেসিফিক সেবা নির্বাচন করুন', 'Select a specific service')}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {SERVICES.map(svc => (
                                <button key={svc.id} onClick={() => setSvcId(svc.id)} className={`p-4 rounded-2xl border-2 text-left transition-all ${svcId === svc.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/40'}`}>
                                    <div className="text-3xl mb-2">{svc.emoji}</div>
                                    <h3 className="font-bold text-gray-800 text-sm leading-tight">{t(svc.bn, svc.en)}</h3>
                                </button>
                            ))}
                        </div>

                        {svcId && (
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 animate-in fade-in slide-in-from-bottom-2">
                                <div className="font-bold text-primary-dark mb-3 flex items-center justify-between">
                                    <span>{t('বুকিং ধরন', 'Booking Type')}</span>
                                    <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
                                        <button onClick={() => setForm({ ...form, isSub: false })} className={`px-3 py-1 text-xs font-bold rounded-md ${!form.isSub ? 'bg-primary text-white' : 'text-gray-500'}`}>{t('ওয়ান-টাইম', 'One-time')}</button>
                                        <button onClick={() => setForm({ ...form, isSub: true })} className={`px-3 py-1 text-xs font-bold rounded-md ${form.isSub ? 'bg-primary text-white' : 'text-gray-500'}`}>{t('মাসিক সাব.', 'Subscription')}</button>
                                    </div>
                                </div>

                                {/* Sub-options based on service */}
                                {svcId === 'doctor' && (
                                    <div className="bg-white rounded-xl border border-gray-200 p-3 mb-3">
                                        <label className="text-xs font-bold text-gray-700 block mb-2">{t('পরামর্শের ধরন', 'Consultation Type')}</label>
                                        <div className="flex gap-2">
                                            <button onClick={() => setTelemed(false)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${!telemed ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200'}`}>{t('হোম ভিজিট', 'Home Visit')}</button>
                                            <button onClick={() => setTelemed(true)} className={`flex-1 py-1.5 rounded-lg text-xs font-medium border ${telemed ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200'}`}>{t('ভিডিও কল (Telemedicine)', 'Video Call')}</button>
                                        </div>
                                    </div>
                                )}
                                {svcId === 'medicine' && (
                                    <div className="bg-white rounded-xl border border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-primary transition-colors mb-3">
                                        <Upload className="w-6 h-6 text-primary mx-auto mb-1" />
                                        <div className="text-xs font-bold text-gray-700">{t('প্রেসক্রিপশন আপলোড করুন', 'Upload Prescription')}</div>
                                    </div>
                                )}
                                {svcId === 'companion' && (
                                    <div className="bg-white rounded-xl border border-gray-200 p-3 mb-3">
                                        <label className="text-xs font-bold text-gray-700 block mb-2">{t('কেয়ারগিভার পছন্দ (ঐচ্ছিক)', 'Caregiver Preference (Optional)')}</label>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {CAREGIVERS.map(cg => (
                                                <button key={cg.id} onClick={() => setCaregiver(cg.id)} className={`w-full flex items-center justify-between p-2 rounded-lg border text-left ${caregiver === cg.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/20'}`}>
                                                    <div>
                                                        <div className="text-xs font-bold">{cg.name} <span className="text-yellow-500 font-normal">★{cg.rating}</span></div>
                                                        <div className="text-[10px] text-gray-500">{t('শখ: ', 'Hobbies: ')}{cg.hobbies.join(',')}</div>
                                                    </div>
                                                    {caregiver === cg.id && <div className="w-2 h-2 bg-primary rounded-full" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button onClick={nextStep} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                                    {t('পরবর্তী স্টেপ', 'Next Step')} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5 animate-in slide-in-from-right-8">
                        <h2 className="text-2xl font-black text-gray-800 text-center mb-4">{t('বিস্তারিত তথ্য', 'Details')}</h2>

                        {/* For Whom */}
                        <div>
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-2">{t('কার জন্য বুক করছেন?', 'Who is this for?')}</label>
                            <select value={form.member} onChange={e => setForm({ ...form, member: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-primary focus:bg-white outline-none transition-colors">
                                {FAMILY_MEMBERS.map(m => <option key={m}>{m}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-2">{t('কখন?', 'When?')}</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-10 pr-3 py-3 text-sm focus:border-primary focus:bg-white outline-none transition-colors" />
                                </div>
                                <div className="relative">
                                    <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-10 pr-3 py-3 text-sm focus:border-primary focus:bg-white outline-none transition-colors" />
                                </div>
                            </div>
                        </div>

                        {!(svcId === 'doctor' && telemed) && (
                            <div>
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-2">{t('কোথায়?', 'Where?')}</label>
                                <div className="relative">
                                    <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                    <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={2} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-10 pr-3 py-3 text-sm focus:border-primary focus:bg-white outline-none transition-colors resize-none" placeholder={t('বাসার বিস্তারিত ঠিকানা...', 'Detailed home address...')} />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-2">{t('বিশেষ নির্দেশনা (ঐচ্ছিক)', 'Special Instructions')}</label>
                            <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 text-sm focus:border-primary focus:bg-white outline-none transition-colors resize-none" placeholder={t('ভিতরে আসার গলি, গেইট কোড ইত্যাদি...', 'Directions, gate code etc...')} />
                        </div>

                        <div className="flex gap-3">
                            <button onClick={prevStep} className="w-1/3 py-3.5 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">{t('পিছনে', 'Back')}</button>
                            <button onClick={nextStep} disabled={!form.date || (!form.address && !(svcId === 'doctor' && telemed))} className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors">{t('পরবর্তী স্টেপ', 'Next Step')}</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8">
                        <h2 className="text-2xl font-black text-gray-800 text-center">{t('পেমেন্ট ও কনফার্মেশন', 'Payment & Confirm')}</h2>

                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{t('অর্ডার সামারি', 'Order Summary')}</h3>
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-bold text-gray-800">{curSvc?.bn} {form.isSub ? '(মাসিক)' : ''}</div>
                                <div className="font-black text-primary">{curSvc?.price}</div>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div>• {form.date} @ {form.time || 'TBA'}</div>
                                {!(svcId === 'doctor' && telemed) && <div>• {form.address}</div>}
                                <div>• Patient: {form.member}</div>
                                {telemed && <div className="text-primary font-bold">• Telemedicine Call</div>}
                                {caregiver && <div>• Pref. Caregiver: {CAREGIVERS.find(c => c.id === caregiver)?.name}</div>}
                            </div>
                            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-black text-lg">
                                <span>{t('মোট বিল', 'Total Bill')}</span>
                                <span className="text-primary">~{curSvc?.price}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1 block">{t('পেমেন্ট মাধ্যম', 'Payment Method')}</label>
                            {[{ id: 'bkash', name: 'bKash', emoji: '🟣' }, { id: 'nagad', name: 'নগদ', emoji: '🟠' }, { id: 'card', name: 'Card (দেশি/বিদেশি)', emoji: '💳' }, { id: 'cash', name: 'Cash on Service', emoji: '💵' }].map(p => (
                                <button key={p.id} className="w-full flex items-center justify-between p-3 border-2 border-gray-100 rounded-xl hover:border-primary focus:border-primary focus:bg-primary/5 transition-all outline-none">
                                    <div className="flex items-center gap-2"><span className="text-xl">{p.emoji}</span> <span className="font-bold text-gray-700">{p.name}</span></div>
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                </button>
                            ))}
                            <p className="text-[10px] text-gray-400 mt-2 text-center">{t('NRB দের জন্য ভিসা/মাস্টারকার্ড সাপোর্টেড', 'Visa/Mastercard supported for NRBs')}</p>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={prevStep} className="w-1/3 py-3.5 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">{t('পিছনে', 'Back')}</button>
                            <Link href="/dashboard" className="flex-1 flex justify-center items-center bg-primary text-white py-3.5 rounded-xl font-black hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
                                {t('কনফার্ম করুন', 'Confirm Booking')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
