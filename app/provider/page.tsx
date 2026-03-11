'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Timer, CheckCircle, XCircle, Upload, MapPin, Clock, FileText } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useLang } from '@/components/context/LanguageContext';

const TASKS = [
    { id: 'T001', client: 'মোঃ আব্দুর রহিম', service: 'ডায়াগনস্টিক সেবা', address: 'গুলশান-১, ঢাকা', time: 'সকাল ১০টা', status: 'pending', urgent: false },
    { id: 'T002', client: 'বেগম আমেনা', service: 'চিকিৎসক সেবা', address: 'মিরপুর-১, ঢাকা', time: 'দুপুর ২টা', status: 'pending', urgent: true },
];

export default function ProviderDashboard() {
    const { user } = useAuth();
    const { t } = useLang();
    const [tasks, setTasks] = useState(TASKS);
    const [activeTimer, setActiveTimer] = useState<{ taskId: string, stage: number } | null>(null);
    const [uploadOpen, setUploadOpen] = useState(false);

    const acceptTask = (id: string) => setTasks(ts => ts.map(t => t.id === id ? { ...t, status: 'accepted' } : t));
    const rejectTask = (id: string) => setTasks(ts => ts.filter(t => t.id !== id));

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            {/* Upload Modal to Vault */}
            {uploadOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center">
                        <div className="text-6xl mb-3">⬆️</div>
                        <h3 className="font-bold text-lg mb-2">{t('রিপোর্ট আপলোড', 'Upload Report')}</h3>
                        <p className="text-sm text-gray-500 mb-5">{t('ক্লায়েন্টের Medical Vault-এ সরাসরি যাবে', 'Will be saved directly to client\'s Medical Vault')}</p>
                        <div className="border-2 border-dashed border-primary/40 bg-primary/5 rounded-2xl p-8 mb-5 cursor-pointer hover:border-primary transition-colors">
                            <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                            <div className="text-sm font-bold text-primary">{t('ছবি তুলুন বা ফাইল বাছুন', 'Take Photo or Select File')}</div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setUploadOpen(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold">{t('বাতিল', 'Cancel')}</button>
                            <button onClick={() => setUploadOpen(false)} className="flex-1 py-3 bg-success text-white rounded-xl font-bold">{t('আপলোড', 'Upload')}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-primary-dark">{t('প্রোভাইডার ড্যাশবোর্ড', 'Provider Dashboard')}</h1>
                    <p className="text-sm text-gray-500">{t('আজকের কাজ ও আপডেট', "Today's tasks & updates")}</p>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-400">{t('আজকের আয়', 'Today earned')}</div>
                    <div className="text-xl font-black text-success">৳৮০০</div>
                </div>
            </div>

            {/* Quick stats & Nav */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                {[{ v: '৫', l: 'কাজ' }, { v: '৩', l: 'সম্পন্ন' }, { v: '৪.৮', l: 'রেটিং' }].map(s => (
                    <div key={s.l} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                        <div className="text-xl font-black text-primary">{s.v}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
                    </div>
                ))}
                <Link href="/provider/profile" className="bg-white border border-gray-100 rounded-xl p-3 text-center card-hover flex flex-col items-center justify-center">
                    <div className="text-xl mb-1">👤</div>
                    <div className="text-xs text-gray-500">{t('প্রোফাইল', 'Profile')}</div>
                </Link>
            </div>

            {/* Task Cards */}
            <h2 className="font-bold text-gray-800 mb-3">{t('নতুন রিকোয়েস্ট', 'New Requests')}</h2>
            <div className="space-y-4 mb-6">
                {tasks.length === 0 && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
                        <CheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-500 font-bold">{t('আজকের মতো আর কোনো কাজ নেই!', 'No more tasks for today!')}</p>
                        <p className="text-sm text-gray-400 mt-1">{t('বিশ্রাম নিন বা প্রোফাইল আপডেট করুন।', 'Take a break or update profile.')}</p>
                    </div>
                )}
                {tasks.map(task => (
                    <div key={task.id} className={`bg-white rounded-2xl border-2 p-5 ${task.urgent ? 'border-emergency/40 bg-red-50/30' : 'border-gray-100'}`}>
                        {task.urgent && <span className="text-xs bg-emergency text-white px-2 py-0.5 rounded-full font-bold mb-2 inline-block">⚡ {t('জরুরি', 'Urgent')}</span>}
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="font-bold text-gray-800">{task.client}</h3>
                                <div className="text-sm text-primary font-medium">{task.service}</div>
                            </div>
                            <span className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full font-mono">{task.id}</span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{task.address}</div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" />{task.time}</div>
                        </div>

                        {task.status === 'pending' ? (
                            <div className="flex gap-2">
                                <button onClick={() => rejectTask(task.id)} className="flex-1 flex items-center justify-center gap-1.5 border-2 border-emergency text-emergency py-2.5 rounded-xl font-bold hover:bg-emergency hover:text-white transition-colors">
                                    <XCircle className="w-4 h-4" /> {t('প্রত্যাখ্যান', 'Reject')}
                                </button>
                                <button onClick={() => acceptTask(task.id)} className="flex-1 flex items-center justify-center gap-1.5 bg-success text-white py-2.5 rounded-xl font-bold hover:bg-green-700 transition-colors">
                                    <CheckCircle className="w-4 h-4" /> {t('গ্রহণ করুন', 'Accept')}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-xs text-success font-bold">✓ {t('গ্রহণ করা হয়েছে', 'Accepted')}</div>
                                    <button onClick={() => setUploadOpen(true)} className="flex items-center gap-1 text-xs bg-primary/10 text-primary font-bold px-2 py-1 rounded hover:bg-primary/20">
                                        <FileText className="w-3 h-3" /> {t('রিপোর্ট আপলোড', 'Upload Report')}
                                    </button>
                                </div>
                                {/* Duty Timer stages */}
                                <div className="flex gap-2">
                                    {[['রওনা দিন', 'Go', 'travel'], ['পৌঁছেছি', 'Arrived', 'reached'], ['সম্পন্ন', 'Done', 'complete']].map(([bn, en, stage], i) => (
                                        <button key={stage} onClick={() => setActiveTimer({ taskId: task.id, stage: i })}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTimer?.stage === i ? 'bg-primary text-white' : 'border border-gray-200 text-gray-600 hover:border-primary'}`}>
                                            {t(bn, en)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Quick nav */}
            <div className="grid grid-cols-3 gap-3">
                {[['📅', 'শিডিউল', 'Availability', '/provider/availability'], ['💰', 'আয়', 'Earnings', '/provider/earnings'], ['⭐', 'রিভিউ', 'Reviews', '/provider/reviews']].map(([e, bn, en, href]) => (
                    <Link key={href} href={href} className="bg-white border border-gray-100 rounded-xl p-3 text-center card-hover">
                        <div className="text-2xl mb-1">{e}</div>
                        <div className="text-xs font-semibold text-gray-700">{t(bn, en)}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
