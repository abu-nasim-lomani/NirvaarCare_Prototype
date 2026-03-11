'use client';
import { useState } from 'react';
import { MapPin, User, CheckCircle } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const REQUESTS = [
    { id: 'BK-048', client: 'রাহেলা বেগম', service: 'ডায়াগনস্টিক', address: 'গুলশান-১', priority: 'normal' },
    { id: 'BK-049', client: 'আহমেদ রেজা', service: 'জরুরি সেবা', address: 'মিরপুর-৭', priority: 'urgent' },
];
const CAREGIVERS = [
    { id: 'C1', name: 'ফারিদা নার্স', area: 'গুলশান', distance: '১.২ কি.মি.', rating: 4.9, status: 'available' },
    { id: 'C2', name: 'করিম হোসেন', area: 'বনানী', distance: '২.৫ কি.মি.', rating: 4.7, status: 'on-duty' },
    { id: 'C3', name: 'রুমা বেগম', area: 'গুলশান', distance: '০.৮ কি.মি.', rating: 4.8, status: 'available' },
];

export default function DispatchPage() {
    const { t } = useLang();
    const [selected, setSelected] = useState('BK-048');
    const [assigned, setAssigned] = useState<Record<string, string>>({});

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('ডিসপ্যাচ ও ম্যাচিং সিস্টেম', 'Dispatch & Matching System')}</h1>

            <div className="grid md:grid-cols-3 gap-5">
                {/* Pending Requests */}
                <div>
                    <h3 className="font-bold text-gray-700 mb-3">{t('অপেক্ষমাণ রিকোয়েস্ট', 'Pending Requests')}</h3>
                    <div className="space-y-3">
                        {REQUESTS.map(r => (
                            <button key={r.id} onClick={() => setSelected(r.id)}
                                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${selected === r.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40'}`}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${r.priority === 'urgent' ? 'bg-emergency text-white' : 'bg-blue-100 text-primary'}`}>{r.id}</span>
                                        <div className="font-bold text-sm text-gray-800 mt-1">{r.client}</div>
                                        <div className="text-xs text-gray-500">{r.service} • {r.address}</div>
                                    </div>
                                    {assigned[r.id] && <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-primary/10 rounded-2xl border-2 border-primary/20 flex items-center justify-center">
                    <div className="text-center p-4">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                        <p className="font-bold text-primary">{t('লাইভ ম্যাপ', 'Live Map')}</p>
                        <p className="text-xs text-gray-500 mt-1">{t('ক্লায়েন্ট ও কেয়ারগিভার পিন', 'Client & caregiver pins')}</p>
                        <div className="mt-3 space-y-1">
                            {['📍 ক্লায়েন্ট — গুলশান-১', '🟢 ফারিদা — ১.২ কি.মি.', '🟢 রুমা — ০.৮ কি.মি.'].map(p => (
                                <div key={p} className="text-xs bg-white rounded-lg px-2 py-1">{p}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Available Caregivers */}
                <div>
                    <h3 className="font-bold text-gray-700 mb-3">{t('কেয়ারগিভার তালিকা', 'Available Caregivers')}</h3>
                    <div className="space-y-3">
                        {CAREGIVERS.map(c => (
                            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-primary" /></div>
                                    <div className="flex-1">
                                        <div className="font-medium text-sm text-gray-800">{c.name}</div>
                                        <div className="text-xs text-gray-400">{c.area} • {c.distance} • ⭐{c.rating}</div>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${c.status === 'available' ? 'bg-green-100 text-success' : 'bg-amber-100 text-amber-600'}`}>
                                        {c.status === 'available' ? t('উপলব্ধ', 'Free') : t('কর্মরত', 'Busy')}
                                    </span>
                                </div>
                                {c.status === 'available' && (
                                    <button onClick={() => setAssigned(a => ({ ...a, [selected]: c.id }))}
                                        disabled={assigned[selected] === c.id}
                                        className={`w-full py-1.5 rounded-lg text-xs font-bold transition-colors ${assigned[selected] === c.id ? 'bg-success text-white' : 'border border-primary text-primary hover:bg-primary hover:text-white'}`}>
                                        {assigned[selected] === c.id ? `✓ ${t('অ্যাসাইন হয়েছে', 'Assigned')}` : t('অ্যাসাইন করুন', 'Assign')}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
