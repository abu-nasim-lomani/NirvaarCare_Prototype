'use client';
import { Medal, TrendingUp, Download } from 'lucide-react';

const DONORS = [
    { name: 'আরিফুর রহমান', email: 'ariful@gmail.com', total: 45000, donations: 7, badge: 'Life Saver', lastDonation: '2 days ago', avatar: 'আ' },
    { name: 'Nasim Ahmed', email: 'nasim@gmail.com', total: 10000, donations: 1, badge: 'First Donation', lastDonation: '15 min ago', avatar: 'N' },
    { name: 'সুমাইয়া বেগম', email: 'sumaiya@gmail.com', total: 32000, donations: 5, badge: 'Heart Warrior', lastDonation: '1 hour ago', avatar: 'স' },
    { name: 'Rahim Mia', email: 'rahim@gmail.com', total: 1000, donations: 1, badge: 'First Donation', lastDonation: '3 hours ago', avatar: 'R' },
    { name: 'Jannatul Ferdous', email: 'jannatul@gmail.com', total: 78000, donations: 12, badge: 'Champion Donor', lastDonation: '1 week ago', avatar: 'J' },
];

const BADGE_COLOR: Record<string, string> = {
    'Life Saver': 'bg-amber-100 text-amber-600',
    'First Donation': 'bg-blue-100 text-blue-600',
    'Heart Warrior': 'bg-pink-100 text-pink-600',
    'Champion Donor': 'bg-emerald-100 text-emerald-600',
};

export default function AdminDonorsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Donor Management</h1>
                    <p className="text-gray-500 mt-1">View all donors, their badges, and generate tax certificates.</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Donors</p>
                    <p className="text-3xl font-black text-gray-900">3,420</p>
                    <p className="text-xs text-success font-bold mt-1">+48 this week</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Life Savers</p>
                    <p className="text-3xl font-black text-gray-900">142</p>
                    <p className="text-xs text-amber-600 font-bold mt-1">Donated ৳10,000+</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Repeat Donors</p>
                    <p className="text-3xl font-black text-gray-900">1,284</p>
                    <p className="text-xs text-primary font-bold mt-1">Already donated 2+ times</p>
                </div>
            </div>

            {/* Donor Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Donor</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Total Donated</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Donations</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Badge</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Last Donation</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DONORS.map((d, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary shrink-0 text-sm">{d.avatar}</div>
                                            <div>
                                                <p className="font-bold text-gray-800">{d.name}</p>
                                                <p className="text-xs text-gray-400">{d.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-black text-gray-800">৳{d.total.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-600 font-bold">{d.donations}x</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit ${BADGE_COLOR[d.badge] || 'bg-gray-100 text-gray-600'}`}>
                                            <Medal className="w-3 h-3" /> {d.badge}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500 font-medium">{d.lastDonation}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                                                <Download className="w-3.5 h-3.5" /> Tax Certificate
                                            </button>
                                            <button className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                                                <TrendingUp className="w-3.5 h-3.5" /> Report
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
