'use client';
import { useState } from 'react';
import { Search, UserX, UserCheck, Filter } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const USERS = [
    { id: 'U001', name: 'রাহেলা বেগম', phone: '01700000001', role: 'customer', plan: 'বেসিক', joined: 'জানুয়ারি ২০২৬', status: 'active', bookings: 12 },
    { id: 'U002', name: 'ফারিদা নার্স', phone: '01800000001', role: 'caregiver', plan: '—', joined: 'ফেব্রুয়ারি ২০২৬', status: 'active', bookings: 38 },
    { id: 'U003', name: 'করিম সাহেব', phone: '01700000002', role: 'customer', plan: 'প্রিমিয়াম', joined: 'ডিসেম্বর ২০২৫', status: 'suspended', bookings: 5 },
    { id: 'U004', name: 'ABC ফার্মেসি', phone: '01900000001', role: 'partner', plan: '—', joined: 'নভেম্বর ২০২৫', status: 'active', bookings: 0 },
];

const ROLE_LABELS: Record<string, string> = { customer: 'ক্লায়েন্ট', caregiver: 'কেয়ারগিভার', partner: 'পার্টনার' };

export default function UsersPage() {
    const { t } = useLang();
    const [users, setUsers] = useState(USERS);
    const [q, setQ] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    const toggleStatus = (id: string) => setUsers(us => us.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
    const filtered = users.filter(u => (roleFilter === 'all' || u.role === roleFilter) && (u.name.includes(q) || u.phone.includes(q) || u.id.includes(q)));

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('ইউজার ম্যানেজমেন্ট', 'User Management')}</h1>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={q} onChange={e => setQ(e.target.value)} className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:border-primary outline-none" placeholder={t('নাম, ফোন বা ID খুঁজুন', 'Search name, phone or ID')} />
                </div>
                <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-primary outline-none bg-white">
                    <option value="all">{t('সব রোল', 'All Roles')}</option>
                    <option value="customer">{t('ক্লায়েন্ট', 'Customer')}</option>
                    <option value="caregiver">{t('কেয়ারগিভার', 'Caregiver')}</option>
                    <option value="partner">{t('পার্টনার', 'Partner')}</option>
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-5">
                {[{ v: users.filter(u => u.status === 'active').length, l: 'সক্রিয় ইউজার', c: 'text-success' },
                { v: users.filter(u => u.role === 'customer').length, l: 'ক্লায়েন্ট', c: 'text-primary' },
                { v: users.filter(u => u.role === 'caregiver').length, l: 'কেয়ারগিভার', c: 'text-primary' },
                { v: users.filter(u => u.status === 'suspended').length, l: 'সাসপেন্ডেড', c: 'text-emergency' }].map(s => (
                    <div key={s.l} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                        <div className={`text-2xl font-black ${s.c}`}>{s.v}</div>
                        <div className="text-xs text-gray-400">{s.l}</div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {filtered.map(user => (
                        <div key={user.id} className="px-4 py-3 flex items-center gap-3">
                            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                                {user.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-gray-800">{user.name}</span>
                                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">{ROLE_LABELS[user.role]}</span>
                                    {user.plan !== '—' && <span className="text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded">{user.plan}</span>}
                                </div>
                                <div className="text-xs text-gray-400">{user.phone} • {user.id} • {t('যোগ দিয়েছেন:', 'Joined:')} {user.joined}</div>
                            </div>
                            <div className="text-xs text-gray-400">{user.bookings} {t('বুকিং', 'bookings')}</div>
                            <div>
                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${user.status === 'active' ? 'bg-green-100 text-success' : 'bg-red-100 text-emergency'}`}>
                                    {user.status === 'active' ? t('সক্রিয়', 'Active') : t('সাসপেন্ড', 'Suspended')}
                                </span>
                            </div>
                            <button onClick={() => toggleStatus(user.id)}
                                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${user.status === 'active' ? 'border-emergency text-emergency hover:bg-emergency hover:text-white' : 'border-success text-success hover:bg-success hover:text-white'}`}>
                                {user.status === 'active' ? <><UserX className="w-3 h-3" /> {t('সাসপেন্ড', 'Suspend')}</> : <><UserCheck className="w-3 h-3" /> {t('রিস্টোর', 'Restore')}</>}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
