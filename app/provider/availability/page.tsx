'use client';
import { useState } from 'react';
import { useLang } from '@/components/context/LanguageContext';

const DAYS = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র'];
const HOURS = ['সকাল ৮টা', 'সকাল ১০টা', 'দুপুর ১২টা', 'বিকাল ৩টা', 'বিকাল ৫টা', 'সন্ধ্যা ৭টা'];
const SERVICE_TYPES = ['ডায়াগনস্টিক', 'চিকিৎসক', 'ঔষধ', 'জরুরি', 'দৈনন্দিন', 'সঙ্গ'];

export default function AvailabilityPage() {
    const { t } = useLang();
    const [schedule, setSchedule] = useState<Record<string, string[]>>({});
    const [maxBookings, setMaxBookings] = useState(3);
    const [services, setServices] = useState(['ডায়াগনস্টিক', 'দৈনন্দিন']);
    const [saved, setSaved] = useState(false);

    const toggle = (day: string, hour: string) => {
        setSchedule(s => {
            const daySlots = s[day] || [];
            return { ...s, [day]: daySlots.includes(hour) ? daySlots.filter(h => h !== hour) : [...daySlots, hour] };
        });
    };

    const toggleService = (svc: string) => setServices(s => s.includes(svc) ? s.filter(x => x !== svc) : [...s, svc]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black text-primary-dark mb-2">{t('অ্যাভেইলেবিলিটি ম্যানেজার', 'Availability Manager')}</h1>
            <p className="text-sm text-gray-500 mb-6">{t('আপনার সাপ্তাহিক কাজের সময় নির্ধারণ করুন', 'Set your weekly working hours')}</p>

            {saved && <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 text-sm text-success font-medium text-center">✅ {t('সংরক্ষণ সম্পন্ন!', 'Saved successfully!')}</div>}

            {/* Service types */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
                <h3 className="font-bold text-gray-800 mb-3">{t('আমি কোন সেবা দিতে পারি?', 'Which services can I offer?')}</h3>
                <div className="flex flex-wrap gap-2">
                    {SERVICE_TYPES.map(svc => (
                        <button key={svc} onClick={() => toggleService(svc)}
                            className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${services.includes(svc) ? 'bg-primary border-primary text-white' : 'border-gray-200 hover:border-primary text-gray-600'}`}>
                            {svc}
                        </button>
                    ))}
                </div>
            </div>

            {/* Weekly grid */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 overflow-x-auto">
                <h3 className="font-bold text-gray-800 mb-3">{t('সাপ্তাহিক সময়সূচি', 'Weekly Schedule')}</h3>
                <table className="w-full text-xs">
                    <thead>
                        <tr>
                            <th className="text-left text-gray-400 font-normal py-2 pr-3">{t('সময়', 'Time')}</th>
                            {DAYS.map(d => <th key={d} className="text-center font-semibold text-gray-700 py-2 px-2">{d}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {HOURS.map(hour => (
                            <tr key={hour} className="border-t border-gray-50">
                                <td className="py-2 pr-3 text-gray-500 whitespace-nowrap">{hour}</td>
                                {DAYS.map(day => {
                                    const selected = schedule[day]?.includes(hour);
                                    return (
                                        <td key={day} className="text-center py-1.5 px-2">
                                            <button onClick={() => toggle(day, hour)}
                                                className={`w-7 h-7 rounded-lg border-2 transition-all ${selected ? 'bg-primary border-primary text-white' : 'border-gray-200 hover:border-primary/50'}`}>
                                                {selected ? '✓' : ''}
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Max bookings */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
                <h3 className="font-bold text-gray-800 mb-1">{t('প্রতিদিন সর্বোচ্চ বুকিং', 'Daily booking limit')}</h3>
                <p className="text-xs text-gray-400 mb-3">{t('আপনি প্রতি দিন কতটি বুকিং নিতে চান?', 'Max bookings per day')}</p>
                <div className="flex items-center gap-4">
                    <button onClick={() => setMaxBookings(m => Math.max(1, m - 1))} className="w-8 h-8 rounded-full border-2 border-gray-200 font-bold hover:border-primary transition-colors">-</button>
                    <span className="text-3xl font-black text-primary w-8 text-center">{maxBookings}</span>
                    <button onClick={() => setMaxBookings(m => Math.min(10, m + 1))} className="w-8 h-8 rounded-full border-2 border-gray-200 font-bold hover:border-primary transition-colors">+</button>
                    <span className="text-sm text-gray-500">{t('টি বুকিং/দিন', 'bookings/day')}</span>
                </div>
            </div>

            <button onClick={() => setSaved(true)} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                {t('শিডিউল সংরক্ষণ করুন', 'Save Schedule')} ✓
            </button>
        </div>
    );
}
