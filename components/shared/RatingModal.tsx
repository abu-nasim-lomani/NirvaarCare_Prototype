'use client';
import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    caregiverName?: string;
    serviceName?: string;
    onSubmit?: (rating: number, comment: string) => void;
}

export default function RatingModal({ isOpen, onClose, caregiverName = 'ফারিদা নার্স', serviceName = 'ডায়াগনস্টিক সেবা', onSubmit }: RatingModalProps) {
    const { t } = useLang();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const TAGS = [t('সময়মতো এসেছেন', 'On time'), t('যত্নশীল', 'Caring'), t('পেশাদার', 'Professional'), t('পরিষ্কার', 'Neat'), t('সহায়ক', 'Helpful')];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        setSubmitted(true);
        setTimeout(() => { onClose(); setSubmitted(false); setRating(0); setComment(''); setSelectedTags([]); }, 2000);
        onSubmit?.(rating, comment);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
                {submitted ? (
                    <div className="p-8 text-center">
                        <div className="text-5xl mb-3">🙏</div>
                        <h3 className="font-black text-xl text-primary-dark mb-1">{t('ধন্যবাদ!', 'Thank you!')}</h3>
                        <p className="text-sm text-gray-500">{t('আপনার রিভিউ সংরক্ষিত হয়েছে।', 'Your review has been saved.')}</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary to-blue-700 px-6 py-5 text-white relative">
                            <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                            <div className="text-xs opacity-70 mb-1">{t('সার্ভিস সম্পন্ন!', 'Service Completed!')}</div>
                            <h3 className="font-black text-lg">{t('রেটিং দিন', 'Rate Your Experience')}</h3>
                            <div className="text-sm opacity-80 mt-1">{caregiverName} • {serviceName}</div>
                        </div>

                        <div className="p-6">
                            {/* Stars */}
                            <div className="text-center mb-5">
                                <div className="flex justify-center gap-2 mb-2">
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)}>
                                            <Star className={`w-9 h-9 transition-all ${n <= (hover || rating) ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-300'}`} />
                                        </button>
                                    ))}
                                </div>
                                <div className="text-sm font-medium text-gray-600 h-5">
                                    {['', '😞 খুব খারাপ', '😐 মোটামুটি', '🙂 ভালো', '😊 খুব ভালো', '🤩 অসাধারণ!'][(hover || rating)] || ''}
                                </div>
                            </div>

                            {/* Quick tags */}
                            <div className="flex flex-wrap gap-2 mb-4 justify-center">
                                {TAGS.map(tag => (
                                    <button key={tag} onClick={() => setSelectedTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag])}
                                        className={`px-3 py-1 rounded-full border text-xs font-medium transition-all ${selectedTags.includes(tag) ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-600 hover:border-primary'}`}>
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            {/* Comment */}
                            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3}
                                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none resize-none mb-4"
                                placeholder={t('মন্তব্য লিখুন (ঐচ্ছিক)...', 'Write a comment (optional)...')} />

                            <button onClick={handleSubmit} disabled={rating === 0}
                                className="w-full bg-primary text-white py-3 rounded-xl font-bold disabled:opacity-40 hover:bg-primary-dark transition-colors">
                                {t('রিভিউ জমা দিন', 'Submit Review')}
                            </button>
                            <button onClick={onClose} className="w-full mt-2 text-gray-400 text-sm hover:text-gray-600">
                                {t('পরে দেব', 'Rate later')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
