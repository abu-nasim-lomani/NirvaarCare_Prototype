'use client';
import { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Heart, Clock } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const ALERTS = [
    { id: 'SOS-001', client: 'মোঃ শফিকুল ইসলাম', age: 75, type: '❤️ হার্ট অ্যাটাক', address: 'মিরপুর-১০, ঢাকা', phone: '01700000001', bloodGroup: 'B+', conditions: ['উচ্চরক্তচাপ', 'ডায়াবেটিস'], time: '৩ মিনিট আগে', status: 'live' },
    { id: 'SOS-002', client: 'বেগম হামিদা', age: 68, type: '🤕 পড়ে গেছেন', address: 'বনানী, ঢাকা', phone: '01800000002', bloodGroup: 'O+', conditions: ['আর্থ্রাইটিস'], time: '১২ মিনিট আগে', status: 'responding' },
];

export default function EmergencyPage() {
    const { t } = useLang();
    const [alerts, setAlerts] = useState(ALERTS);
    const [selected, setSelected] = useState(alerts[0]);
    const [dispatched, setDispatched] = useState<string[]>([]);

    const dispatchAmbulance = (id: string) => {
        setDispatched(d => [...d, id]);
        setAlerts(a => a.map(x => x.id === id ? { ...x, status: 'resolved' } : x));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-emergency rounded-full animate-pulse" />
                <h1 className="text-2xl font-black text-emergency">{t('জরুরি অ্যালার্ট সেন্টার', 'Emergency Alert Center')}</h1>
                <span className="bg-emergency text-white text-xs px-2 py-0.5 rounded-full font-bold">{alerts.filter(a => a.status === 'live').length} {t('লাইভ', 'LIVE')}</span>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
                {/* Alert List */}
                <div className="space-y-3">
                    <h3 className="font-bold text-gray-700 text-sm">{t('অ্যালার্ট তালিকা', 'Alert List')}</h3>
                    {alerts.map(a => (
                        <button key={a.id} onClick={() => setSelected(a)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${selected?.id === a.id ? 'border-emergency bg-red-50' : a.status === 'live' ? 'border-emergency/50 animate-pulse' : 'border-gray-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <div className={`w-2 h-2 rounded-full ${a.status === 'live' ? 'bg-emergency' : 'bg-amber-400'}`} />
                                <span className="text-xs font-bold uppercase text-gray-500">{a.status === 'live' ? t('জীবিত', 'LIVE') : t('সাড়া দেওয়া হচ্ছে', 'RESPONDING')}</span>
                            </div>
                            <div className="font-bold text-sm text-gray-800">{a.client}</div>
                            <div className="text-xs text-gray-500">{a.type} • {a.time}</div>
                        </button>
                    ))}
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div className="md:col-span-2">
                        <div className={`rounded-2xl border-2 p-5 ${selected.status === 'live' ? 'border-emergency bg-red-50/50' : 'border-amber-200 bg-amber-50/30'}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="text-2xl mb-1">{selected.type}</div>
                                    <h2 className="font-black text-xl text-gray-800">{selected.client}</h2>
                                    <div className="text-sm text-gray-500">{t('বয়স:', 'Age:')} {selected.age}</div>
                                </div>
                                {dispatched.includes(selected.id) ? (
                                    <span className="bg-success text-white text-xs px-3 py-1.5 rounded-full font-bold">✓ {t('ডিসপ্যাচ হয়েছে', 'Dispatched')}</span>
                                ) : (
                                    <span className="bg-emergency text-white text-xs px-3 py-1.5 rounded-full font-bold animate-pulse">{t('জরুরি', 'URGENT')}</span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-white rounded-xl p-3">
                                    <div className="text-xs text-gray-400 mb-1"><MapPin className="inline w-3 h-3" /> {t('ঠিকানা', 'Address')}</div>
                                    <div className="font-medium text-sm">{selected.address}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3">
                                    <div className="text-xs text-gray-400 mb-1"><Heart className="inline w-3 h-3 text-emergency" /> {t('রক্তের গ্রুপ', 'Blood Group')}</div>
                                    <div className="font-bold text-emergency">{selected.bloodGroup}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3">
                                    <div className="text-xs text-gray-400 mb-1">{t('বিদ্যমান রোগ', 'Conditions')}</div>
                                    <div className="text-sm">{selected.conditions.join(', ')}</div>
                                </div>
                                <div className="bg-white rounded-xl p-3">
                                    <div className="text-xs text-gray-400 mb-1"><Clock className="inline w-3 h-3" /> {t('সময়', 'Time')}</div>
                                    <div className="font-medium text-sm">{selected.time}</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <a href={`tel:${selected.phone}`} className="flex items-center gap-2 flex-1 bg-white border-2 border-primary text-primary py-2.5 rounded-xl font-bold text-sm justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" /> {t('ক্লায়েন্টকে কল', 'Call Client')}
                                </a>
                                <button onClick={() => dispatchAmbulance(selected.id)} disabled={dispatched.includes(selected.id)}
                                    className="flex items-center gap-2 flex-1 bg-emergency text-white py-2.5 rounded-xl font-bold text-sm justify-center hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-default">
                                    <AlertTriangle className="w-4 h-4" /> {dispatched.includes(selected.id) ? t('✓ ডিসপ্যাচ হয়েছে', '✓ Dispatched') : t('অ্যাম্বুলেন্স পাঠান', 'Dispatch Ambulance')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
