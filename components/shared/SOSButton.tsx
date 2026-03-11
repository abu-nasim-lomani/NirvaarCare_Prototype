'use client';
import { useState } from 'react';
import { AlertTriangle, X, Heart, Phone } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const EMERGENCY_TYPES = [
    { emoji: '❤️', label: 'হার্ট অ্যাটাক', en: 'Heart Attack' },
    { emoji: '🤕', label: 'পড়ে গেছেন', en: 'Fall / Injury' },
    { emoji: '😮‍💨', label: 'শ্বাসকষ্ট', en: 'Breathing Issue' },
    { emoji: '🤒', label: 'হঠাৎ অসুস্থ', en: 'Sudden Illness' },
    { emoji: '🧠', label: 'স্ট্রোক', en: 'Stroke' },
    { emoji: '❓', label: 'অন্যান্য', en: 'Other' },
];

export default function SOSButton() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState('');
    const [countdown, setCountdown] = useState(10);
    const { t } = useLang();

    const handleConfirm = () => {
        setStep(3);
        let c = 10;
        const timer = setInterval(() => {
            c -= 1;
            setCountdown(c);
            if (c <= 0) { clearInterval(timer); setStep(4); }
        }, 1000);
    };

    const reset = () => { setOpen(false); setStep(1); setSelected(''); setCountdown(10); };

    return (
        <>
            {/* Floating SOS Button */}
            <button onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emergency text-white rounded-full font-bold text-sm shadow-lg sos-pulse hover:scale-110 transition-transform flex flex-col items-center justify-center"
                aria-label="SOS Emergency">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-[10px] font-black">SOS</span>
            </button>

            {/* SOS Modal */}
            {open && (
                <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-emergency px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white">
                                <AlertTriangle className="w-5 h-5" />
                                <span className="font-bold">{t('জরুরি সাহায্য', 'Emergency Help')}</span>
                            </div>
                            <button onClick={reset}><X className="w-5 h-5 text-white" /></button>
                        </div>

                        <div className="p-6">
                            {step === 1 && (
                                <div className="text-center">
                                    <div className="text-5xl mb-4">🆘</div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{t('আপনার কি এখনই সাহায্য দরকার?', 'Do you need help right now?')}</h3>
                                    <p className="text-gray-500 text-sm mb-6">{t('নিশ্চিত হলে "হ্যাঁ, সাহায্য দরকার" বাটনে চাপুন।', 'Press confirm if you need immediate help.')}</p>
                                    <button onClick={() => setStep(2)} className="w-full bg-emergency text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors">
                                        {t('হ্যাঁ, সাহায্য দরকার!', 'Yes, I need help!')}
                                    </button>
                                    <button onClick={reset} className="w-full mt-2 py-2 text-gray-500 text-sm">{t('না, ভুলে চাপলাম', 'No, pressed by mistake')}</button>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <h3 className="font-bold text-gray-800 mb-1">{t('কী ধরনের জরুরি পরিস্থিতি?', 'Type of emergency?')}</h3>
                                    <p className="text-gray-500 text-xs mb-4">{t('একটি বেছে নিন', 'Select one')}</p>
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {EMERGENCY_TYPES.map(e => (
                                            <button key={e.label} onClick={() => setSelected(e.label)}
                                                className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${selected === e.label ? 'border-emergency bg-red-50 text-emergency' : 'border-gray-200 hover:border-emergency/40'}`}>
                                                <span className="text-xl">{e.emoji}</span>
                                                <span>{t(e.label, e.en)}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={handleConfirm} disabled={!selected}
                                        className="w-full bg-emergency text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-red-700 transition-colors">
                                        {t('সাহায্য পাঠান', 'Send Help')} →
                                    </button>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="text-center py-4">
                                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                        <Heart className="w-10 h-10 text-emergency fill-emergency" />
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-2">{t('সাহায্য পাঠানো হচ্ছে...', 'Sending help...')}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{t('আনুমানিক সময়:', 'Estimated arrival:')} <span className="font-bold text-emergency text-2xl">{countdown}</span> {t('মিনিট', 'mins')}</p>
                                    <p className="text-xs text-gray-400">{t('অ্যাডমিন টিমকে অ্যালার্ট পাঠানো হয়েছে', 'Admin team has been alerted')}</p>
                                </div>
                            )}

                            {step === 4 && (
                                <div>
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-center">
                                        <div className="text-3xl mb-2">✅</div>
                                        <p className="font-bold text-success">{t('সাহায্য নিশ্চিত হয়েছে!', 'Help is on the way!')}</p>
                                        <p className="text-sm text-gray-500">{t('একটি কেয়ারগিভার রওনা দিয়েছেন', 'A caregiver is on the way')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Phone className="w-5 h-5 text-primary" />
                                            <div><div className="text-xs text-gray-500">{t('নিকটস্থ হাসপাতাল', 'Nearest Hospital')}</div><div className="font-bold text-sm">{t('ঢাকা মেডিকেল কলেজ', 'Dhaka Medical College')}</div></div>
                                            <a href="tel:02-55165088" className="ml-auto text-emergency font-bold text-sm">{t('কল করুন', 'Call')}</a>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <Phone className="w-5 h-5 text-emergency" />
                                            <div><div className="text-xs text-gray-500">{t('অ্যাম্বুলেন্স', 'Ambulance')}</div><div className="font-bold text-sm">999</div></div>
                                            <a href="tel:999" className="ml-auto text-emergency font-bold text-sm">{t('কল করুন', 'Call')}</a>
                                        </div>
                                    </div>
                                    <button onClick={reset} className="w-full mt-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50">{t('বন্ধ করুন', 'Close')}</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
