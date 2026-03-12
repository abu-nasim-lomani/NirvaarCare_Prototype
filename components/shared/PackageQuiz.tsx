'use client';
import { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const QUESTIONS = [
    {
        id: 'frequency',
        bn: 'আপনার কত ঘন ঘন কেয়ারগিভার বা স্বাস্থ্য সহায়তা প্রয়োজন?',
        en: 'How often do you need a caregiver or health support?',
        options: [
            { bn: 'মাঝে মাঝে (মাসে ১-২ বার)', en: 'Occasionally (1-2 times a month)', score: { onetime: 3, basic: 0, premium: 0 } },
            { bn: 'নিয়মিত (সপ্তাহে ২-৩ দিন)', en: 'Regularly (2-3 days a week)', score: { onetime: 0, basic: 3, premium: 1 } },
            { bn: 'প্রতিদিন (২৪/৭ সহায়তা)', en: 'Everyday (24/7 support)', score: { onetime: 0, basic: 0, premium: 3 } },
        ]
    },
    {
        id: 'emergency',
        bn: 'আপনার কি সার্বক্ষণিক মেডিকেল ভল্ট এবং অগ্রাধিকার ইমার্জেন্সি সাপোর্ট প্রয়োজন?',
        en: 'Do you need a 24/7 medical vault and priority emergency support?',
        options: [
            { bn: 'না, শুধু সাধারণ সেবা দরকার', en: 'No, just normal service', score: { onetime: 2, basic: 0, premium: 0 } },
            { bn: 'হ্যাঁ, স্বাস্থ্য রেকর্ড রাখা জরুরি', en: 'Yes, keeping health records is important', score: { onetime: 0, basic: 2, premium: 1 } },
            { bn: 'হ্যাঁ, সাথে ডেডিকেটেড কেয়ারগিভারও চাই', en: 'Yes, and a dedicated caregiver too', score: { onetime: 0, basic: 0, premium: 3 } },
        ]
    },
    {
        id: 'nrb',
        bn: 'আপনি কি প্রবাসী (NRB) এবং ফ্যামিলি মেম্বারদের সাথে ড্যাশবোর্ড শেয়ার করতে চান?',
        en: 'Are you an NRB and want to share the dashboard with family members?',
        options: [
            { bn: 'না, শুধু আমার জন্যই', en: 'No, just for me', score: { onetime: 1, basic: 2, premium: 0 } },
            { bn: 'হ্যাঁ, আমি দেশের বাইরে থাকি', en: 'Yes, I live abroad', score: { onetime: 0, basic: 1, premium: 3 } },
        ]
    }
];

export default function PackageQuiz() {
    const { t } = useLang();
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState({ onetime: 0, basic: 0, premium: 0 });
    const [result, setResult] = useState<'onetime' | 'basic' | 'premium' | null>(null);

    const handleAnswer = (score: { onetime: number, basic: number, premium: number }) => {
        const newScores = {
            onetime: scores.onetime + score.onetime,
            basic: scores.basic + score.basic,
            premium: scores.premium + score.premium,
        };
        setScores(newScores);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            // Calculate final result
            const max = Math.max(newScores.onetime, newScores.basic, newScores.premium);
            if (max === newScores.premium) setResult('premium');
            else if (max === newScores.basic) setResult('basic');
            else setResult('onetime');
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setScores({ onetime: 0, basic: 0, premium: 0 });
        setResult(null);
    };

    const getResultContent = () => {
        if (result === 'premium') return { name: t('প্রিমিয়াম কেয়ার', 'Premium Care'), color: 'bg-accent', desc: t('আপনার জন্য সম্পূর্ণ নিশ্চিন্ত সমাধান।', 'Complete peace of mind for you.') };
        if (result === 'basic') return { name: t('বেসিক মাসিক', 'Basic Monthly'), color: 'bg-primary', desc: t('নিয়মিত চেকআপ ও সেবার জন্য সেরা।', 'Best for regular checkups & care.') };
        return { name: t('এককালীন সেবা', 'One-time Service'), color: 'bg-gray-800', desc: t('প্রয়োজন মত বুক করার জন্য উপযুক্ত।', 'Perfect for pay-as-you-go needs.') };
    };

    return (
        <div className="bg-gradient-to-br from-primary/5 to-blue-100/50 rounded-3xl p-8 border border-primary/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 text-primary/10">
                <Sparkles className="w-48 h-48" />
            </div>

            <div className="relative z-10 max-w-xl mx-auto text-center">
                {!result ? (
                    <>
                        <div className="inline-block bg-white text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-sm border border-primary/10">
                            {t('গাইডেড কুইজ', 'Guided Quiz')} • {step + 1}/{QUESTIONS.length}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-6">
                            {t(QUESTIONS[step].bn, QUESTIONS[step].en)}
                        </h3>
                        <div className="space-y-3">
                            {QUESTIONS[step].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(opt.score)}
                                    className="w-full bg-white hover:bg-primary hover:text-white border-2 border-primary/20 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all text-left flex items-center justify-between group"
                                >
                                    <span>{t(opt.bn, opt.en)}</span>
                                    <ArrowRight className="w-4 h-4 text-primary group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="animate-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg text-gray-600 font-medium mb-1">{t('আপনার জন্য সেরা প্যাকেজ:', 'The best package for you:')}</h3>
                        <h2 className={`text-3xl font-black ${getResultContent().color === 'bg-accent' ? 'text-accent' : getResultContent().color === 'bg-primary' ? 'text-primary' : 'text-gray-800'} mb-2`}>
                            {getResultContent().name}
                        </h2>
                        <p className="text-gray-500 mb-8">{getResultContent().desc}</p>

                        <div className="flex gap-3 justify-center">
                            <button onClick={resetQuiz} className="px-6 py-2.5 rounded-xl border-2 border-gray-300 text-gray-600 font-bold hover:bg-gray-100 transition-colors">
                                {t('আবার খেলুন', 'Try Again')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
