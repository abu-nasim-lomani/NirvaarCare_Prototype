'use client';
import { useState } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const APPLICANTS = [
    { id: 'KYC-001', name: 'মোঃ আরিফ হোসেন', age: 30, nidNum: '1234567890', submitted: '৮ মার্চ', status: 'pending', avatar: '👨', skills: ['ডায়াগনস্টিক', 'দৈনন্দিন'] },
    { id: 'KYC-002', name: 'সুমাইয়া বেগম', age: 26, nidNum: '0987654321', submitted: '৭ মার্চ', status: 'pending', avatar: '👩', skills: ['সঙ্গ', 'চিকিৎসক'] },
    { id: 'KYC-003', name: 'রাশেদুল করিম', age: 35, nidNum: '1122334455', submitted: '৫ মার্চ', status: 'approved', avatar: '👨', skills: ['জরুরি', 'দৈনন্দিন'] },
];

export default function KYCPage() {
    const { t } = useLang();
    const [applicants, setApplicants] = useState(APPLICANTS);
    const [selected, setSelected] = useState(APPLICANTS[0]);
    const [reason, setReason] = useState('');
    const [showReject, setShowReject] = useState(false);

    const approve = (id: string) => setApplicants(a => a.map(x => x.id === id ? { ...x, status: 'approved' } : x));
    const reject = (id: string) => { setApplicants(a => a.map(x => x.id === id ? { ...x, status: 'rejected' } : x)); setShowReject(false); };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-black text-primary-dark mb-2">{t('KYC যাচাইকরণ', 'KYC Verification')}</h1>
            <p className="text-sm text-gray-500 mb-6">{t('কেয়ারগিভারদের NID ও সেলফি যাচাই করুন', 'Verify caregiver NID and selfie')}</p>

            {/* Rejection modal */}
            {showReject && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="font-bold text-lg mb-3">{t('প্রত্যাখ্যানের কারণ', 'Rejection Reason')}</h3>
                        <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-emergency outline-none resize-none mb-3" placeholder={t('কারণ লিখুন...', 'Write reason...')} />
                        <div className="flex gap-2">
                            <button onClick={() => setShowReject(false)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm">{t('বাতিল', 'Cancel')}</button>
                            <button onClick={() => reject(selected.id)} disabled={!reason} className="flex-1 bg-emergency text-white py-2.5 rounded-xl text-sm font-bold disabled:opacity-50">{t('প্রত্যাখ্যান করুন', 'Reject')}</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-5">
                {/* List */}
                <div className="space-y-2">
                    {applicants.map(a => (
                        <button key={a.id} onClick={() => setSelected(a)}
                            className={`w-full text-left p-3 rounded-2xl border-2 transition-all ${selected.id === a.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/40'}`}>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{a.avatar}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm text-gray-800 truncate">{a.name}</div>
                                    <div className="text-xs text-gray-400">{a.submitted}</div>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${a.status === 'approved' ? 'bg-green-100 text-success' : a.status === 'rejected' ? 'bg-red-100 text-emergency' : 'bg-amber-100 text-amber-600'}`}>
                                    {a.status === 'approved' ? '✓' : a.status === 'rejected' ? '✗' : '⌛'}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Detail */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="text-5xl">{selected.avatar}</div>
                        <div>
                            <h2 className="font-black text-xl text-primary-dark">{selected.name}</h2>
                            <div className="text-sm text-gray-500">{t('বয়স:', 'Age:')} {selected.age} | NID: {selected.nidNum}</div>
                            <div className="flex gap-1 mt-1">
                                {selected.skills.map(s => <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{s}</span>)}
                            </div>
                        </div>
                    </div>

                    {/* Documents (placeholder) */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-gray-50 rounded-xl h-32 flex flex-col items-center justify-center border border-gray-200">
                            <Eye className="w-6 h-6 text-gray-400 mb-1" />
                            <div className="text-xs font-medium text-gray-600">{t('NID সামনের দিক', 'NID Front')}</div>
                            <div className="text-xs text-blue-500 mt-1">{t('(স্যাম্পল ডকুমেন্ট)', '(Sample Document)')}</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl h-32 flex flex-col items-center justify-center border border-gray-200">
                            <Eye className="w-6 h-6 text-gray-400 mb-1" />
                            <div className="text-xs font-medium text-gray-600">{t('সেলফি', 'Selfie')}</div>
                            <div className="text-xs text-blue-500 mt-1">{t('(স্যাম্পল)', '(Sample)')}</div>
                        </div>
                    </div>

                    {selected.status === 'pending' ? (
                        <div className="flex gap-3">
                            <button onClick={() => setShowReject(true)} className="flex-1 flex items-center justify-center gap-2 border-2 border-emergency text-emergency py-3 rounded-xl font-bold hover:bg-emergency hover:text-white transition-colors">
                                <XCircle className="w-4 h-4" /> {t('প্রত্যাখ্যান', 'Reject')}
                            </button>
                            <button onClick={() => approve(selected.id)} className="flex-1 flex items-center justify-center gap-2 bg-success text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors">
                                <CheckCircle className="w-4 h-4" /> {t('অনুমোদন করুন', 'Approve')}
                            </button>
                        </div>
                    ) : (
                        <div className={`text-center p-4 rounded-xl font-bold ${selected.status === 'approved' ? 'bg-green-100 text-success' : 'bg-red-100 text-emergency'}`}>
                            {selected.status === 'approved' ? `✓ ${t('অনুমোদিত হয়েছে', 'Approved')}` : t('প্রত্যাখ্যাত হয়েছে', 'Rejected')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
