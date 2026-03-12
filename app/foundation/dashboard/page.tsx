'use client';
import { useState } from 'react';
import { Heart, Wallet, Activity, ShieldCheck, Download, Eye, Medal, FileText, RefreshCw, TrendingUp } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';
import Link from 'next/link';

// Mock DB for the user's foundation wallet
const MOCK_WALLET = {
    totalDonated: 15500,
    allocatedToPatients: 13500,
    unallocatedBalance: 2000, // 15500 - 13500
};

const MOCK_TIMELINE = [
    { id: 't1', date: 'আজ, সকাল ১০:৩০', type: 'allocation', amount: 500, label: 'কাসেমের ওষুধের বিল', enLabel: "Kasem's Medicine Bill", receiptImg: true },
    { id: 't2', date: 'গত ১৫ মে, ২০২৬', type: 'donation', amount: 5000, label: 'জেনারেল ফান্ডে জমা', enLabel: 'Deposited to General Fund', receiptImg: false },
    { id: 't3', date: 'গত ১০ মে, ২০২৬', type: 'allocation', amount: 3000, label: 'রহিম চাচার হুইলচেয়ার', enLabel: "Rahim Uncle's Wheelchair", receiptImg: true },
    { id: 't4', date: 'গত ৫ জানুয়ারি, ২০২৬', type: 'donation', amount: 10500, label: 'যাকাত ফান্ডে জমা', enLabel: 'Deposited to Zakat Fund', receiptImg: false },
];

export default function DonorDashboardPage() {
    const { t } = useLang();
    const [viewReceipt, setViewReceipt] = useState<string | null>(null);
    const [allocating, setAllocating] = useState(false);
    const [simulateSuccess, setSimulateSuccess] = useState(false);

    const handleAllocate = () => {
        setAllocating(true);
        setTimeout(() => {
            setAllocating(false);
            setSimulateSuccess(true);
            setTimeout(() => setSimulateSuccess(false), 3000); // hide after 3s
            // We would update the wallet state in a real app here.
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-5xl mx-auto px-4">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-black text-gray-800">{t('ডোনার ড্যাশবোর্ড', 'Donor Dashboard')}</h1>
                            <div className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 flex items-center gap-1">
                                <Medal className="w-3.5 h-3.5" /> Life Saver
                            </div>
                        </div>
                        <p className="text-gray-500">{t('আপনার দানের ১০০% স্বচ্ছ প্রতিবেদন ও ইমপ্যাক্ট', '100% transparent report and impact of your donations')}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <Link href="/foundation/impact" className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl font-bold text-amber-700 hover:bg-amber-100 transition-colors text-sm">
                            <TrendingUp className="w-4 h-4" /> {t('আমার প্রভাব', 'My Impact')}
                        </Link>
                        <button className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors text-sm">
                            <FileText className="w-4 h-4" /> {t('ট্যাক্স সার্টিফিকেট', 'Tax Rebate PDF')}
                        </button>
                        <Link href="/foundation" className="hidden md:inline-flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-xl font-bold text-primary hover:bg-gray-50 transition-colors text-sm">
                            <Heart className="w-4 h-4 fill-primary" /> {t('নতুন ডোনেশন করুন', 'New Donation')}
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* The Wallet Highlight */}
                    <div className="md:col-span-2 bg-gradient-to-br from-teal-900 to-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-teal-900/10">
                        <ShieldCheck className="absolute -right-10 -top-10 w-48 h-48 text-white/5" />

                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg w-max mb-6 backdrop-blur-sm border border-white/20">
                            <Wallet className="w-4 h-4" /> <span className="text-sm font-medium">{t('আপনার নির্ভার ওয়ালেট', 'Your Nirvaar Wallet')}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-8 relative z-10">
                            <div>
                                <div className="text-teal-200 text-sm font-medium mb-1">{t('মোট দান করেছেন', 'Total Donated')}</div>
                                <div className="text-4xl md:text-5xl font-black">৳{(MOCK_WALLET.totalDonated).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-teal-200 text-sm font-medium mb-1">{t('রোগীর পেছনে খরচ', 'Total Spent on Patients')}</div>
                                <div className="text-4xl md:text-5xl font-black text-teal-100">৳{(MOCK_WALLET.allocatedToPatients).toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6 flex items-center justify-between">
                            <div>
                                <div className="text-sm text-teal-200 font-medium mb-1">{t('অব্যবহৃত ফান্ড (Unallocated)', 'Unallocated Balance')}</div>
                                <div className="text-2xl font-bold text-amber-300">৳{(MOCK_WALLET.unallocatedBalance).toLocaleString()}</div>
                            </div>

                            <button className="bg-amber-400 text-teal-950 px-5 py-2.5 rounded-xl font-bold hover:bg-amber-300 transition-colors shadow-sm">
                                {t('রোগীকে দান করুন', 'Allocate to Patient')}
                            </button>
                        </div>
                    </div>

                    {/* Quick Info & Gamification Cards */}
                    <div className="space-y-6">
                        {/* Auto-Subscription Card */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{t('অটো-সাবস্ক্রিপশন', 'Auto-Subscription')}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">মাসে ৫০০ টাকা স্বয়ংক্রিয়ভাবে জেনারেল ফান্ডে দান করুন।</p>
                            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200">
                                <span className="text-sm font-bold text-gray-700">Monthly Contribution</span>
                                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-primary cursor-pointer"></label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    .toggle-checkbox:checked { right: 0; border-color: #0d9488; }
                    .toggle-checkbox:checked + .toggle-label { background-color: #0d9488; }
                    .toggle-checkbox { right: 24px; border-color: #e5e7eb; z-index: 10; transition: right 0.2s; }
                    .toggle-label { background-color: #e5e7eb; transition: background-color 0.2s; }
                `}} />

                {/* Interactive Impact Timeline */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        {t('লাইভ ইমপ্যাক্ট টাইমলাইন', 'Live Impact Timeline')}
                    </h2>

                    <div className="relative border-l-2 border-gray-100 ml-4 space-y-10 pb-4">
                        {MOCK_TIMELINE.map((item, idx) => (
                            <div key={item.id} className="relative pl-8">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white ${item.type === 'donation' ? 'bg-primary' : 'bg-success'}`} />

                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{item.date}</div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">{t(item.label, item.enLabel)}</h3>
                                        <p className="text-sm font-medium text-gray-500">
                                            {item.type === 'donation' ? t('ওয়ালেটে টাকা যোগ হয়েছে', 'Funds added to wallet') : t('ওয়ালেট থেকে খরচ হয়েছে', 'Funds allocated from wallet')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <div className={`text-xl font-black ${item.type === 'donation' ? 'text-primary' : 'text-gray-800'}`}>
                                            {item.type === 'donation' ? '+' : '-'} ৳{(item.amount).toLocaleString()}
                                        </div>
                                        {/* Action Button for Allocations (Receipt View) */}
                                        {item.receiptImg && (
                                            <button onClick={() => setViewReceipt(item.id)} className="flex items-center gap-1.5 text-xs font-bold bg-success/10 text-success px-3 py-1.5 rounded-lg hover:bg-success/20 transition-colors">
                                                <Eye className="w-3.5 h-3.5" /> {t('রসিদ দেখুন', 'View Receipt')}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Receipt Modal Overlay */}
            {viewReceipt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Pharmacy Receipt</h3>
                            <button onClick={() => setViewReceipt(null)} className="text-gray-400 hover:text-gray-800 font-bold p-1">✕</button>
                        </div>
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="w-full h-80 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl mb-6 relative flex items-center justify-center">
                                {/* Simulated receipt image */}
                                <div className="text-gray-400 p-6 opacity-50 text-xs font-mono space-y-2 text-left w-full h-full bg-white bg-opacity-50">
                                    <h4 className="font-bold text-black border-b border-dashed border-black pb-2 text-center text-lg">ABC PHARMACY</h4>
                                    <p>Date: 12/03/2026</p>
                                    <p>Patient: Kasem (Foundation)</p>
                                    <p className="border-t border-dashed border-black pt-2 mt-2">1x Heart Meds ....... 500 BDT</p>
                                    <p className="font-bold text-black border-t-2 border-black pt-2 mt-4 text-right">TOTAL: 500 BDT</p>

                                    <div className="absolute inset-0 flex items-center justify-center -rotate-12 pointer-events-none">
                                        <div className="border-4 border-success text-success px-4 py-1 rounded font-black text-2xl uppercase tracking-widest opacity-30">Paid</div>
                                    </div>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark">
                                <Download className="w-4 h-4" /> {t('ডাউনলোড করুন', 'Download')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
