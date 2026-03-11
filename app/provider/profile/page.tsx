'use client';
import { useState } from 'react';
import { Shield, Upload, Star, Edit, Check, Award, Languages } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const SPECIALIZATIONS = ['ডায়াগনস্টিক', 'চিকিৎসক', 'ঔষধ', 'জরুরি', 'দৈনন্দিন', 'মানসিক সঙ্গ'];
const LANGUAGES = ['বাংলা', 'ইংরেজি', 'হিন্দি', 'উর্দু'];
const HOBBIES = ['গান শোনা', 'গল্প পড়া', 'বাগান করা', 'রান্না', 'খেলাধুলা', 'ধর্মীয় আলোচনা'];
const CERTIFICATIONS = ['প্রাথমিক চিকিৎসা', 'CPR', 'বয়স্ক সেবা', 'ডায়াবেটিস কেয়ার'];

export default function ProviderProfilePage() {
    const { t } = useLang();
    const [editing, setEditing] = useState(false);
    const [specs, setSpecs] = useState(['ডায়াগনস্টিক', 'দৈনন্দিন']);
    const [langs, setLangs] = useState(['বাংলা', 'ইংরেজি']);
    const [hobbies, setHobbies] = useState(['গান শোনা', 'গল্প পড়া']);
    const [certs, setCerts] = useState(['প্রাথমিক চিকিৎসা', 'CPR']);
    const [saved, setSaved] = useState(false);
    const [nid, setNid] = useState('');

    const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
        setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

    const kycStatus: 'verified' | 'pending' = nid ? 'pending' : 'verified';

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-primary-dark">{t('কেয়ারগিভার প্রোফাইল', 'Caregiver Profile')}</h1>
                <button onClick={() => { if (editing) setSaved(true); setEditing(!editing); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${editing ? 'bg-success text-white' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}>
                    {editing ? <><Check className="w-4 h-4" /> {t('সংরক্ষণ', 'Save')}</> : <><Edit className="w-4 h-4" /> {t('সম্পাদনা', 'Edit')}</>}
                </button>
            </div>

            {saved && <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-sm text-success font-medium">✅ {t('প্রোফাইল আপডেট হয়েছে!', 'Profile updated!')}</div>}

            <div className="space-y-5">
                {/* Identity */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-4xl">👩‍⚕️</div>
                            {editing && <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center"><Upload className="w-3 h-3 text-white" /></button>}
                        </div>
                        <div>
                            <h2 className="font-black text-xl text-primary-dark">{t('ফারিদা নার্স', 'Farida Nurse')}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold ${kycStatus === 'verified' ? 'bg-green-100 text-success' : 'bg-amber-100 text-amber-600'}`}>
                                    <Shield className="w-3 h-3" />
                                    {kycStatus === 'verified' ? t('✓ KYC যাচাইকৃত', '✓ KYC Verified') : t('⌛ KYC অপেক্ষায়', '⌛ KYC Pending')}
                                </div>
                            </div>
                            <div className="flex gap-0.5 mt-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {[['ফোন', 'Phone', '01800000001'], ['NID নম্বর', 'NID Number', '123-456-7890'], ['জেলা', 'District', 'ঢাকা'], ['অভিজ্ঞতা', 'Experience', '৫ বছর']].map(([bn, en, val]) => (
                            <div key={bn}>
                                <label className="text-xs font-medium text-gray-400 block mb-1">{t(bn, en)}</label>
                                {editing && (bn === 'NID নম্বর') ? (
                                    <input value={nid} onChange={e => setNid(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-primary outline-none" placeholder={val} />
                                ) : (
                                    <div className="font-medium text-gray-800">{val}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* NID Upload */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />{t('পরিচয় দলিল', 'Identity Documents')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[['NID সামনে', 'NID Front'], ['NID পেছনে', 'NID Back']].map(([bn, en]) => (
                            <div key={bn} onClick={() => editing && setNid('uploaded')}
                                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${editing ? 'hover:border-primary' : 'opacity-60'} ${nid ? 'border-success bg-green-50' : 'border-gray-200'}`}>
                                <Upload className={`w-6 h-6 mx-auto mb-1 ${nid ? 'text-success' : 'text-gray-400'}`} />
                                <div className="text-xs text-gray-500">{nid ? '✓ আপলোড হয়েছে' : t(`${bn} আপলোড করুন`, `Upload ${en}`)}</div>
                            </div>
                        ))}
                    </div>
                    {editing && (
                        <div className="mt-3 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                            <div className="text-xs text-gray-500">{t('সেলফি আপলোড', 'Upload Selfie')}</div>
                        </div>
                    )}
                </div>

                {/* Specializations */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-primary" />{t('আমি যে সেবা দিতে পারি', 'Services I can offer')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {SPECIALIZATIONS.map(s => (
                            <button key={s} onClick={() => editing && toggle(specs, setSpecs, s)} disabled={!editing}
                                className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${specs.includes(s) ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-600'} ${editing ? 'cursor-pointer hover:border-primary' : 'cursor-default'}`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Language & Hobbies — for companion matching */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2"><Languages className="w-4 h-4 text-primary" />{t('ভাষা ও শখ', 'Language & Hobbies')}</h3>
                    <p className="text-xs text-gray-400 mb-3">{t('মানসিক সঙ্গ সেবার জন্য ক্লায়েন্ট ম্যাচিং-এ ব্যবহার হয়', 'Used for companion service matching')}</p>
                    <div className="mb-3">
                        <div className="text-xs font-semibold text-gray-500 mb-2">{t('ভাষা', 'Languages')}</div>
                        <div className="flex flex-wrap gap-2">
                            {LANGUAGES.map(l => (
                                <button key={l} onClick={() => editing && toggle(langs, setLangs, l)} disabled={!editing}
                                    className={`px-3 py-1.5 rounded-full border text-xs font-medium ${langs.includes(l) ? 'bg-accent border-accent text-white' : 'border-gray-200 text-gray-600'} ${editing ? 'cursor-pointer hover:border-accent' : 'cursor-default'}`}>
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 mb-2">{t('শখ', 'Hobbies')}</div>
                        <div className="flex flex-wrap gap-2">
                            {HOBBIES.map(h => (
                                <button key={h} onClick={() => editing && toggle(hobbies, setHobbies, h)} disabled={!editing}
                                    className={`px-3 py-1.5 rounded-full border text-xs font-medium ${hobbies.includes(h) ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-200 text-gray-600'} ${editing ? 'cursor-pointer hover:border-purple-400' : 'cursor-default'}`}>
                                    {h}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-800 mb-3">{t('সার্টিফিকেট', 'Certifications')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {CERTIFICATIONS.map(c => (
                            <div key={c} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${certs.includes(c) ? 'bg-green-100 text-success' : 'bg-gray-100 text-gray-400'}`}>
                                {certs.includes(c) ? '✓' : ''} {c}
                            </div>
                        ))}
                    </div>
                    {editing && <button className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline"><Upload className="w-3 h-3" /> {t('সার্টিফিকেট আপলোড করুন', 'Upload Certificate')}</button>}
                </div>
            </div>
        </div>
    );
}
