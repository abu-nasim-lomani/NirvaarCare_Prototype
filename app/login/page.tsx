'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Eye, EyeOff, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useLang } from '@/components/context/LanguageContext';

type Role = 'customer' | 'caregiver' | 'partner';

export default function LoginPage() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [role, setRole] = useState<Role>('customer');
    const [name, setName] = useState('');
    const [isNew, setIsNew] = useState(false);
    const { login } = useAuth();
    const { t } = useLang();
    const router = useRouter();

    const handleOtpChange = (i: number, val: string) => {
        if (val.length > 1) return;
        const newOtp = [...otp];
        newOtp[i] = val;
        setOtp(newOtp);
        if (val && i < 5) {
            const next = document.getElementById(`otp-${i + 1}`);
            next?.focus();
        }
        if (newOtp.every(d => d) && newOtp.join('').length === 6) {
            setTimeout(() => setStep(3), 300);
        }
    };

    const handleFinalLogin = () => {
        login(phone, role, name || (role === 'customer' ? 'রাহেলা বেগম' : role === 'caregiver' ? 'ফারিদা নার্স' : 'পার্টনার'));
        const dest = role === 'caregiver' ? '/provider' : role === 'admin' ? '/admin' : role === 'partner' ? '/partners' : isNew ? '/onboarding' : '/dashboard';
        router.push(dest);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-2">❤️</div>
                    <h1 className="text-2xl font-black text-primary-dark">{t('নির্ভার কেয়ারে প্রবেশ করুন', 'Welcome to Nirvaar Care')}</h1>
                    <p className="text-gray-500 text-sm mt-1">{t('ফোন নম্বর দিয়ে লগইন বা রেজিস্ট্রেশন করুন', 'Login or register with your phone number')}</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    {/* Step indicators */}
                    <div className="flex items-center gap-2 mb-6">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${step >= s ? 'bg-primary' : 'bg-gray-200'}`} />
                        ))}
                    </div>

                    {/* Step 1: Phone */}
                    {step === 1 && (
                        <div>
                            <h2 className="font-bold text-gray-800 mb-4">{t('আপনার ফোন নম্বর দিন', 'Enter your phone number')}</h2>
                            <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl px-3 focus-within:border-primary transition-colors">
                                <span className="text-sm text-gray-500 border-r pr-2">🇧🇩 +88</span>
                                <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="flex-1 py-3 outline-none text-sm" placeholder="01XXXXXXXXX" maxLength={11} />
                                <Phone className="w-4 h-4 text-gray-400" />
                            </div>
                            <label className="flex items-center gap-2 mt-3 text-sm text-gray-600 cursor-pointer">
                                <input type="checkbox" checked={isNew} onChange={e => setIsNew(e.target.checked)} className="rounded" />
                                {t('আমি নতুন — প্রথমবার রেজিস্ট্রেশন করছি', "I'm new — first time registering")}
                            </label>
                            <button onClick={() => phone.length >= 10 && setStep(2)} disabled={phone.length < 10}
                                className="w-full mt-5 bg-primary text-white py-3.5 rounded-xl font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors">
                                {t('OTP পাঠান', 'Send OTP')} →
                            </button>
                        </div>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <div>
                            <h2 className="font-bold text-gray-800 mb-1">{t('OTP প্রবেশ করুন', 'Enter OTP')}</h2>
                            <p className="text-sm text-gray-500 mb-5">{t(`+88${phone} নম্বরে একটি OTP পাঠানো হয়েছে`, `OTP sent to +88${phone}`)}</p>
                            <div className="flex gap-2 mb-4">
                                {otp.map((d, i) => (
                                    <input key={i} id={`otp-${i}`} value={d} onChange={e => handleOtpChange(i, e.target.value)} type="text" maxLength={1}
                                        className="w-12 h-12 border-2 border-gray-200 rounded-xl text-center text-xl font-bold focus:border-primary outline-none transition-colors" />
                                ))}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{t('✅ Demo: যেকোনো ৬ সংখ্যা দিন', '✅ Demo: enter any 6 digits')}</span>
                                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-primary hover:underline">
                                    <RefreshCw className="w-3 h-3" /> {t('পুনরায় পাঠান', 'Resend')}
                                </button>
                            </div>
                            <button onClick={() => setStep(3)} disabled={!otp.every(d => d)}
                                className="w-full mt-4 bg-primary text-white py-3.5 rounded-xl font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors">
                                {t('যাচাই করুন', 'Verify OTP')}
                            </button>
                        </div>
                    )}

                    {/* Step 3: Role */}
                    {step === 3 && (
                        <div>
                            <h2 className="font-bold text-gray-800 mb-4">{t('আপনি কে?', 'Who are you?')}</h2>
                            <div className="space-y-2 mb-4">
                                {([['customer', '👨‍👩‍👧', 'আমি একজন ক্লায়েন্ট', 'I am a client (family/patient)'],
                                ['caregiver', '🏥', 'আমি একজন কেয়ারগিভার', 'I am a caregiver'],
                                ['partner', '🏪', 'আমি একজন পার্টনার', 'I am a partner (pharmacy/diagnostic)']] as [Role, string, string, string][]).map(([r, emoji, bn, en]) => (
                                    <button key={r} onClick={() => setRole(r)}
                                        className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${role === r ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40'}`}>
                                        <span className="text-2xl">{emoji}</span>
                                        <div>
                                            <div className="font-semibold text-sm text-gray-800">{t(bn, en)}</div>
                                        </div>
                                        {role === r && <div className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs">✓</div>}
                                    </button>
                                ))}
                            </div>
                            {isNew && (
                                <input value={name} onChange={e => setName(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none mb-3" placeholder={t('আপনার নাম লিখুন', 'Enter your name')} />
                            )}
                            <button onClick={handleFinalLogin} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                                {t('প্রবেশ করুন', 'Enter')} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-gray-400 mt-4">
                    {t('পার্টনার হতে চান?', 'Want to become a partner?')}{' '}
                    <a href="/partners/register" className="text-primary hover:underline">{t('এখানে আবেদন করুন', 'Apply here')}</a>
                </p>
            </div>
        </div>
    );
}
