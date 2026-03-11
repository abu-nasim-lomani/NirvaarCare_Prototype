'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Upload } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const STEPS = ['প্রতিষ্ঠানের তথ্য', 'ডকুমেন্ট জমা', 'সম্পন্ন!'];

export default function PartnerRegisterPage() {
    const { t } = useLang();
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ orgName: '', type: 'pharmacy', license: '', contact: '', phone: '', district: '' });
    const [licenseFile, setLicenseFile] = useState('');

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🤝</div>
                    <h1 className="text-2xl font-black text-primary-dark">{t('পার্টনার হিসেবে যোগ দিন', 'Join as a Partner')}</h1>
                    <p className="text-sm text-gray-500 mt-1">{t('ফার্মেসি, ডায়াগনস্টিক সেন্টার ও ক্লিনিকের জন্য', 'For pharmacies, diagnostic centers & clinics')}</p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                    {STEPS.map((s, i) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>{i < step ? '✓' : i + 1}</div>
                            {i < STEPS.length - 1 && <div className={`h-0.5 w-16 md:w-24 mx-1 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
                    {step === 0 && (
                        <div className="space-y-4">
                            <h2 className="font-bold text-gray-800 text-lg">{t('প্রতিষ্ঠানের তথ্য', 'Organization Information')}</h2>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('প্রতিষ্ঠানের নাম', 'Organization Name')}</label>
                                <input value={form.orgName} onChange={e => setForm(f => ({ ...f, orgName: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder={t('যেমন: ABC ফার্মেসি', 'e.g. ABC Pharmacy')} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('প্রতিষ্ঠানের ধরন', 'Type')}</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[['pharmacy', '💊', 'ফার্মেসি', 'Pharmacy'], ['diagnostic', '🔬', 'ডায়াগনস্টিক', 'Diagnostic'], ['clinic', '🏥', 'ক্লিনিক', 'Clinic']].map(([val, icon, bn, en]) => (
                                        <button key={val} onClick={() => setForm(f => ({ ...f, type: val }))}
                                            className={`flex flex-col items-center gap-1 py-2.5 border-2 rounded-xl transition-all text-sm ${form.type === val ? 'border-primary bg-primary/5 font-bold' : 'border-gray-200 hover:border-primary/40'}`}>
                                            <span>{icon}</span>{t(bn, en)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('যোগাযোগ ব্যক্তি', 'Contact Person')}</label>
                                    <input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder={t('নাম', 'Name')} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('ফোন', 'Phone')}</label>
                                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder="01XXXXXXXXX" />
                                </div>
                            </div>
                            <button onClick={() => form.orgName && form.contact && form.phone && setStep(1)} disabled={!form.orgName || !form.contact || !form.phone}
                                className="w-full bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors">
                                {t('পরবর্তী', 'Next')} <ArrowRight className="inline w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="font-bold text-gray-800 text-lg">{t('ডকুমেন্ট জমা দিন', 'Submit Documents')}</h2>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">{t('ট্রেড লাইসেন্স নম্বর', 'Trade License Number')}</label>
                                <input value={form.license} onChange={e => setForm(f => ({ ...f, license: e.target.value }))} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none" placeholder="TL/2024/XXXXXX" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">{t('ট্রেড লাইসেন্সের স্ক্যান কপি', 'Trade License Scan')}</label>
                                <div onClick={() => setLicenseFile('trade_license.pdf')} className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-colors ${licenseFile ? 'border-success bg-green-50' : 'border-gray-200 hover:border-primary'}`}>
                                    {licenseFile ? <><CheckCircle className="w-6 h-6 text-success mx-auto mb-1" /><div className="text-sm text-success font-medium">{licenseFile}</div></>
                                        : <><Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" /><div className="text-sm text-gray-500">{t('ক্লিক করে আপলোড করুন', 'Click to upload')}</div></>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setStep(0)} className="px-4 border border-gray-200 rounded-xl py-2.5 text-sm">{t('পিছনে', 'Back')}</button>
                                <button onClick={() => form.license && licenseFile && setStep(2)} disabled={!form.license || !licenseFile}
                                    className="flex-1 bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors">
                                    {t('আবেদন জমা দিন', 'Submit Application')}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center py-4">
                            <div className="text-5xl mb-4">🎉</div>
                            <h2 className="font-black text-2xl text-primary-dark mb-2">{t('আবেদন জমা হয়েছে!', 'Application Submitted!')}</h2>
                            <p className="text-gray-500 text-sm mb-2">{t('আমাদের টিম ৩ কার্যদিবসের মধ্যে যোগাযোগ করবে।', 'Our team will contact you within 3 business days.')}</p>
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-700">
                                {t('অনুমোদনের পর আপনি একটি SMS পাবেন।', 'You will receive an SMS upon approval.')}
                            </div>
                            <Link href="/" className="block w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                                {t('হোমে ফিরুন', 'Back to Home')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
