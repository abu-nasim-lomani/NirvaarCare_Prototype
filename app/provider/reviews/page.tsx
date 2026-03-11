'use client';
import { Star } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const REVIEWS = [
    { client: 'রাহেলা বেগম', service: 'ডায়াগনস্টিক সেবা', date: '৮ মার্চ', rating: 5, comment: 'অসাধারণ। সময়মতো এসেছেন, বাবার সাথে খুবই যত্নশীল ছিলেন।' },
    { client: 'করিম সাহেব', service: 'দৈনন্দিন সেবা', date: '৫ মার্চ', rating: 4, comment: 'ভালো সেবা দিয়েছেন। পরের বারও চাই।' },
    { client: 'নাফিসা ইসলাম', service: 'মানসিক সঙ্গ', date: '২ মার্চ', rating: 5, comment: 'মায়ের সাথে দারুণ সম্পর্ক তৈরি করেছেন। মা এখন অনেক খুশি।' },
];

export default function ReviewsPage() {
    const { t } = useLang();
    const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('প্রাপ্ত রিভিউসমূহ', 'Reviews Received')}</h1>

            {/* Summary */}
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-5 text-white mb-5 flex items-center gap-5">
                <div className="text-center">
                    <div className="text-5xl font-black">{avg}</div>
                    <div className="flex gap-0.5 justify-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(avg)) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`} />)}
                    </div>
                    <div className="text-xs opacity-70 mt-1">{t('গড় রেটিং', 'Avg Rating')}</div>
                </div>
                <div className="flex-1">
                    {[5, 4, 3, 2, 1].map(n => {
                        const count = REVIEWS.filter(r => r.rating === n).length;
                        return (
                            <div key={n} className="flex items-center gap-2 mb-1">
                                <span className="text-xs w-3">{n}</span>
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <div className="flex-1 bg-white/20 rounded-full h-1.5">
                                    <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${(count / REVIEWS.length) * 100}%` }} />
                                </div>
                                <span className="text-xs w-3">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-4">
                {REVIEWS.map((r, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <div className="font-bold text-gray-800">{r.client}</div>
                                <div className="text-xs text-gray-400">{r.service} • {r.date}</div>
                            </div>
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />)}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 italic">&ldquo;{r.comment}&rdquo;</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
