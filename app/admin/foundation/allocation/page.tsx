'use client';
import { useState } from 'react';
import { AlertCircle, CheckCircle, Zap, Clock, ArrowRight } from 'lucide-react';

const IDLE_FUNDS = [
    { donor: 'Nasim Ahmed', amount: 10000, idleDays: 28, avatar: 'N' },
    { donor: 'আরিফুর হোসেন', amount: 2000, idleDays: 25, avatar: 'আ' },
    { donor: 'Shirin Akter', amount: 5000, idleDays: 18, avatar: 'S' },
    { donor: 'রহিম মিয়া', amount: 1200, idleDays: 12, avatar: 'র' },
    { donor: 'Jamil Khan', amount: 3000, idleDays: 8, avatar: 'J' },
];

const URGENT_CAMPAIGNS = [
    { id: 'c1', name: 'কাসেমের হার্ট সার্জারি', needed: 30000, daysLeft: 5 },
    { id: 'c6', name: 'জরুরি অক্সিজেন সিলিন্ডার', needed: 35000, daysLeft: 3 },
    { id: 'c4', name: 'হাসানের ক্যান্সার চিকিৎসা', needed: 250000, daysLeft: 20 },
];

export default function FundAllocationPage() {
    const [allocated, setAllocated] = useState<string[]>([]);
    const [autoSuccess, setAutoSuccess] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState('c1');

    const handleAutoAllocate = () => {
        setAutoSuccess(true);
        setTimeout(() => setAutoSuccess(false), 4000);
    };

    const handleManualAllocate = (donor: string) => {
        setAllocated(prev => [...prev, donor]);
    };

    const totalIdle = IDLE_FUNDS.reduce((a, f) => a + f.amount, 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Fund Allocation Hub</h1>
                <p className="text-gray-500 mt-1">Manage unallocated donor funds and distribute to urgent campaigns.</p>
            </div>

            {/* Summary Stats */}
            <div className="grid sm:grid-cols-3 gap-5">
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <AlertCircle className="w-6 h-6 text-amber-500" />
                        <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">Total Idle Funds</span>
                    </div>
                    <p className="text-3xl font-black text-amber-700">৳{totalIdle.toLocaleString()}</p>
                    <p className="text-xs text-amber-600 mt-1">{IDLE_FUNDS.length} donors have unused balances</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-6 h-6 text-blue-500" />
                        <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">Needs Attention</span>
                    </div>
                    <p className="text-3xl font-black text-blue-700">2</p>
                    <p className="text-xs text-blue-600 mt-1">Donors idle for 25+ days (auto-allocate soon)</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <Zap className="w-6 h-6 text-primary" />
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">Quick Action</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Auto-distribute all <strong>৳{totalIdle.toLocaleString()}</strong> idle funds to the most urgent campaigns proportionally.
                        </p>
                    </div>
                    {autoSuccess ? (
                        <div className="bg-success/10 text-success px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Distributed successfully!
                        </div>
                    ) : (
                        <button 
                            onClick={handleAutoAllocate}
                            className="bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                            <Zap className="w-4 h-4" /> Auto-Allocate All
                        </button>
                    )}
                </div>
            </div>

            {/* Manual Allocation Table */}
            <div className="grid xl:grid-cols-2 gap-6">
                {/* Idle donors list */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="font-black text-gray-800">Donors with Idle Funds</h2>
                        <p className="text-sm text-gray-500 mt-1">Manually assign funds to a specific campaign.</p>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {IDLE_FUNDS.map((f) => {
                            const isAllocated = allocated.includes(f.donor);
                            return (
                                <div key={f.donor} className={`p-5 flex items-center gap-4 transition-colors ${isAllocated ? 'bg-success/5' : 'hover:bg-gray-50'}`}>
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary shrink-0">
                                        {f.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-800 text-sm">{f.donor}</p>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <span className="text-xs text-gray-500">Idle: <strong className="text-gray-700">৳{f.amount.toLocaleString()}</strong></span>
                                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${f.idleDays >= 25 ? 'bg-emergency/10 text-emergency' : f.idleDays >= 15 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                                                {f.idleDays}d idle
                                            </span>
                                        </div>
                                    </div>
                                    {isAllocated ? (
                                        <span className="text-xs font-bold text-success flex items-center gap-1">
                                            <CheckCircle className="w-3.5 h-3.5" /> Done
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => handleManualAllocate(f.donor)}
                                            className="flex items-center gap-1 bg-primary/5 text-primary hover:bg-primary/15 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0"
                                        >
                                            Allocate <ArrowRight className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Target Campaign Selector */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="font-black text-gray-800">Target Campaign</h2>
                        <p className="text-sm text-gray-500 mt-1">Choose which campaign to allocate funds to.</p>
                    </div>
                    <div className="p-6 space-y-4">
                        {URGENT_CAMPAIGNS.map((c) => (
                            <label key={c.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTarget === c.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                                <input 
                                    type="radio" 
                                    name="target" 
                                    value={c.id} 
                                    checked={selectedTarget === c.id} 
                                    onChange={() => setSelectedTarget(c.id)} 
                                    className="accent-primary w-4 h-4"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-800 text-sm">{c.name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Still needs: <strong className="text-emergency">৳{c.needed.toLocaleString()}</strong> · {c.daysLeft} days left</p>
                                </div>
                                {c.daysLeft <= 5 && (
                                    <span className="text-xs bg-emergency/10 text-emergency px-2 py-0.5 rounded font-bold shrink-0">CRITICAL</span>
                                )}
                            </label>
                        ))}
                        <div className="pt-2">
                            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
                                Confirm Allocation to Selected Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
