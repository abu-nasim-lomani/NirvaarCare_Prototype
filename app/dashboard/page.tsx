'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Calendar, Bell, ArrowRight, Clock, CheckCircle, AlertTriangle, Globe } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useLang } from '@/components/context/LanguageContext';
import RatingModal from '@/components/shared/RatingModal';
import LiveTrackingMap from '@/components/shared/LiveTrackingMap';

const ACTIVE_BOOKING = { id: 'BK001', service: 'ডায়াগনস্টিক সেবা', caregiver: 'ফারিদা নার্স', time: 'আজ, ১১:০০ AM', eta: '৫ মিনিট' };
const RECENT_BOOKINGS = [
    { id: 'BK002', service: 'চিকিৎসক সেবা', date: '৮ মার্চ', status: 'সম্পন্ন', rating: 5, needsRating: false },
    { id: 'BK003', service: 'ঔষধ সেবা', date: '৫ মার্চ', status: 'সম্পন্ন', rating: 4, needsRating: false },
];
const UPCOMING = [
    { id: 'BK010', service: 'চিকিৎসক সেবা', date: 'আগামীকাল', time: 'সকাল ১০টা', caregiver: 'ডা. আরিফ' },
    { id: 'BK011', service: 'ঔষধ ডেলিভারি', date: '১২ মার্চ', time: 'বিকাল ৩টা', caregiver: 'করিম ভাই' },
    { id: 'BK012', service: 'ডায়াগনস্টিক', date: '১৫ মার্চ', time: 'সকাল ৯টা', caregiver: 'ফারিদা নার্স' },
];
const STAGES = ['নিযুক্ত', 'রওনা দিয়েছেন', 'পৌঁছেছেন', 'সম্পন্ন'];
const currentStage = 2;

export default function CustomerDashboard() {
    const { user } = useAuth();
    const { t } = useLang();
    const [ratingOpen, setRatingOpen] = useState(false);
    const bdTime = new Date().toLocaleTimeString('bn-BD', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit' });
    const localTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {/* Rating Modal */}
            <RatingModal isOpen={ratingOpen} onClose={() => setRatingOpen(false)} caregiverName="ফারিদা নার্স" serviceName="ডায়াগনস্টিক সেবা" />

            {/* Welcome */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black text-primary-dark">{t('স্বাগতম,', 'Welcome,')} {user?.name || 'রাহেলা'}! 👋</h1>
                    <p className="text-gray-500 text-sm">{t('আপনার প্রিয়জন আজ কেমন আছেন?', "How is your loved one today?")}</p>
                </div>
                {/* NRB Time Widget */}
                <div className="hidden md:flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-2xl px-4 py-2.5 text-sm">
                    <Globe className="w-4 h-4 text-primary" />
                    <div>
                        <div className="text-xs text-gray-400">{t('BD / আপনার সময়', 'BD / Your Time')}</div>
                        <div className="font-bold text-primary">{bdTime} / {localTime}</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                {[['📅', 'বুক করুন', 'Book', '/dashboard/book'], ['🏥', 'ভল্ট', 'Vault', '/dashboard/vault'], ['📦', 'প্যাকেজ', 'Plan', '/dashboard/subscription'], ['🔔', 'নোটিফ.', 'Alerts', '/dashboard/notifications']].map(([emoji, bn, en, href]) => (
                    <Link key={href} href={href} className="bg-white rounded-2xl border border-gray-100 p-3 text-center card-hover">
                        <div className="text-2xl mb-1">{emoji}</div>
                        <div className="text-xs font-semibold text-gray-700">{t(bn, en)}</div>
                    </Link>
                ))}
            </div>

            {/* Active Booking + Live Tracking */}
            <div className="bg-white rounded-3xl border-2 border-primary/30 p-5 mb-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-xs bg-green-100 text-success font-bold px-2 py-0.5 rounded-full">{t('সক্রিয় বুকিং', 'Active Booking')}</span>
                        <h3 className="font-bold text-gray-800 mt-1">{ACTIVE_BOOKING.service}</h3>
                    </div>
                    <div className="text-right text-sm">
                        <div className="font-medium text-gray-800">{ACTIVE_BOOKING.caregiver}</div>
                        <div className="text-xs text-gray-400">{ACTIVE_BOOKING.time}</div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center mb-4">
                    {STAGES.map((s, i) => (
                        <div key={s} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${i <= currentStage ? 'border-success bg-success text-white' : 'border-gray-200 bg-white text-gray-400'}`}>
                                    {i < currentStage ? '✓' : i + 1}
                                </div>
                                <div className="text-[9px] text-center mt-1 text-gray-500 w-14 leading-tight">{s}</div>
                            </div>
                            {i < STAGES.length - 1 && <div className={`flex-1 h-0.5 mx-1 -mt-4 ${i < currentStage ? 'bg-success' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                {/* Live Map Component */}
                <div className="mb-4">
                    <LiveTrackingMap caregiver={ACTIVE_BOOKING.caregiver} eta={ACTIVE_BOOKING.eta} />
                </div>

                <div className="flex items-center justify-between bg-success/10 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-success">{t(`${ACTIVE_BOOKING.caregiver} পৌঁছে গেছেন!`, `${ACTIVE_BOOKING.caregiver} has arrived!`)}</span>
                    </div>
                    <button onClick={() => setRatingOpen(true)} className="text-xs text-primary font-bold hover:underline">
                        {t('★ রেটিং দিন', '★ Rate')}
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800">{t('সাম্প্রতিক বুকিং', 'Recent Bookings')}</h3>
                        <Link href="/dashboard/payments" className="text-xs text-primary hover:underline">{t('সব দেখুন', 'View all')}</Link>
                    </div>
                    {RECENT_BOOKINGS.length === 0 ? (
                        <div className="text-center py-8">
                            <Calendar className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                            <p className="text-gray-400 text-sm">{t('এখনো কোনো বুকিং নেই', 'No bookings yet')}</p>
                            <Link href="/dashboard/book" className="text-primary text-xs font-bold hover:underline mt-1 block">{t('প্রথম বুকিং করুন', 'Make your first booking')}</Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {RECENT_BOOKINGS.map(b => (
                                <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                    <div>
                                        <div className="font-medium text-sm text-gray-800">{b.service}</div>
                                        <div className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex gap-0.5 justify-end">{Array.from({ length: b.rating }).map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}</div>
                                        <span className="text-xs bg-green-100 text-success px-1.5 py-0.5 rounded-full">{b.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link href="/dashboard/book" className="mt-4 w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-2.5 rounded-xl font-bold hover:bg-primary hover:text-white transition-colors text-sm">
                        <Calendar className="w-4 h-4" /> {t('নতুন বুকিং', 'New Booking')}
                    </Link>
                </div>

                {/* Right column */}
                <div className="space-y-4">
                    {/* Quick Rebook */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-4">
                        <h3 className="font-bold text-gray-800 mb-3 text-sm">{t('দ্রুত রি-বুক', 'Quick Rebook')}</h3>
                        <div className="space-y-2">
                            {[{ icon: '🔬', name: 'ডায়াগনস্টিক সেবা', id: 'diagnostic' }, { icon: '👨‍⚕️', name: 'চিকিৎসক সেবা', id: 'doctor' }].map(s => (
                                <Link key={s.name} href={`/dashboard/book?service=${s.id}`} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all">
                                    <span>{s.icon}</span>
                                    <span className="text-sm text-gray-700 flex-1">{s.name}</span>
                                    <ArrowRight className="w-4 h-4 text-primary" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Health Reminder */}
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <div>
                                <div className="font-semibold text-amber-800 text-sm">{t('স্বাস্থ্য রিমাইন্ডার', 'Health Reminder')}</div>
                                <div className="text-xs text-amber-700 mt-1">{t('আগামীকাল ডায়াবেটিস চেকআপের সময়।', "Tomorrow is the diabetes checkup time.")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">{t('আসন্ন অ্যাপয়েন্টমেন্ট', 'Upcoming Appointments')}</h3>
                    <Link href="/dashboard/book" className="text-xs text-primary hover:underline">{t('+ নতুন', '+ New')}</Link>
                </div>
                {UPCOMING.length === 0 ? (
                    <div className="text-center py-6">
                        <Clock className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">{t('কোনো আসন্ন অ্যাপয়েন্টমেন্ট নেই', 'No upcoming appointments')}</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {UPCOMING.map(u => (
                            <div key={u.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-800">{u.service}</div>
                                    <div className="text-xs text-gray-400">{u.caregiver} • {u.date}, {u.time}</div>
                                </div>
                                <span className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full font-mono">{u.id}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
