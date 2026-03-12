'use client';
import { useState } from 'react';
import { Plus, Upload, ShieldCheck, Edit3, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

const CAMPAIGNS = [
    { id: 'c1', name: 'কাসেমের হার্ট সার্জারি', category: 'Surgery', amount: 150000, raised: 120000, daysLeft: 5, isUrgent: true, isZakat: true, status: 'active' },
    { id: 'c2', name: 'জামিলার ৩ মাসের ওষুধ', category: 'Medicine', amount: 12000, raised: 4500, daysLeft: 12, isUrgent: false, isZakat: true, status: 'active' },
    { id: 'c3', name: 'রহিম চাচার হুইলচেয়ার', category: 'Equipment', amount: 8500, raised: 8500, daysLeft: 0, isUrgent: false, isZakat: false, status: 'completed' },
    { id: 'c4', name: 'হাসানের ক্যান্সার চিকিৎসা', category: 'Surgery', amount: 500000, raised: 250000, daysLeft: 20, isUrgent: true, isZakat: true, status: 'active' },
    { id: 'c6', name: 'জরুরি অক্সিজেন সিলিন্ডার', category: 'Equipment', amount: 45000, raised: 10000, daysLeft: 3, isUrgent: true, isZakat: false, status: 'active' },
];

export default function AdminCampaignsPage() {
    const [showNewForm, setShowNewForm] = useState(false);
    const [uploaded, setUploaded] = useState<string | null>(null);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Campaign Management</h1>
                    <p className="text-gray-500 mt-1">Create, manage, and upload receipts for patient campaigns.</p>
                </div>
                <button 
                    onClick={() => setShowNewForm(!showNewForm)}
                    className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> New Campaign
                </button>
            </div>

            {/* New Campaign Form */}
            {showNewForm && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <h2 className="font-black text-gray-800 text-xl mb-6">Create New Patient Campaign</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Patient Name (Bengali)</label>
                            <input type="text" placeholder="যেমন: কাসেম মিয়া" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Patient Name (English)</label>
                            <input type="text" placeholder="e.g. Kasem Mia" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm bg-white">
                                <option>Surgery</option>
                                <option>Medicine</option>
                                <option>Equipment</option>
                                <option>Food</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Target Amount (৳)</label>
                            <input type="number" placeholder="150000" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Campaign Deadline (Days)</label>
                            <input type="number" placeholder="30" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                            <input type="text" placeholder="Dhaka, Bangladesh" className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Patient Story</label>
                            <textarea rows={3} placeholder="Write the patient's story in detail..." className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm resize-none" />
                        </div>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 accent-primary" />
                                <span className="text-sm font-bold text-gray-700">✨ Zakat Eligible</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 accent-primary" />
                                <span className="text-sm font-bold text-gray-700">🔴 Mark as URGENT</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">Create Campaign</button>
                        <button onClick={() => setShowNewForm(false)} className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">Cancel</button>
                    </div>
                </div>
            )}

            {/* Campaigns Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Patient / Campaign</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Category</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Progress</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CAMPAIGNS.map((c, i) => {
                                const pc = Math.min(100, Math.round((c.raised / c.amount) * 100));
                                const done = c.status === 'completed';
                                return (
                                    <tr key={c.id} className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold text-gray-800">{c.name}</p>
                                                {c.isUrgent && <span className="text-xs bg-emergency/10 text-emergency px-2 py-0.5 rounded font-bold">URGENT</span>}
                                                {c.isZakat && <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded font-bold">Zakat</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 font-medium">{c.category}</td>
                                        <td className="px-6 py-4">
                                            <div className="w-32">
                                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span>৳{(c.raised/1000).toFixed(0)}K</span>
                                                    <span className="font-bold">{pc}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${done ? 'bg-success' : c.isUrgent ? 'bg-emergency' : 'bg-primary'}`} style={{ width: `${pc}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {done ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">
                                                    <CheckCircle className="w-3 h-3" /> Completed
                                                </span>
                                            ) : c.daysLeft <= 5 ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-bold text-emergency bg-emergency/10 px-2 py-1 rounded-full">
                                                    <AlertCircle className="w-3 h-3" /> {c.daysLeft}d left
                                                </span>
                                            ) : (
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{c.daysLeft}d left</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Edit Campaign">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => setUploaded(c.id)}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${uploaded === c.id ? 'bg-success/10 text-success' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
                                                >
                                                    {uploaded === c.id ? <><ShieldCheck className="w-3.5 h-3.5" />Uploaded</> : <><Upload className="w-3.5 h-3.5" /> Upload Receipt</>}
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-emergency hover:bg-emergency/5 rounded-lg transition-colors" title="Delete Campaign">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
