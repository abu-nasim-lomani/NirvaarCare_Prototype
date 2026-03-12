'use client';
import { FileText, ShieldCheck, Upload, Eye, Download } from 'lucide-react';

const AUDIT_LOG = [
    { date: '12 Mar 2026', type: 'Donation', donor: 'Nasim Ahmed', amount: 10000, campaign: 'General Fund', vendor: null, status: 'idle' },
    { date: '12 Mar 2026', type: 'Receipt', donor: 'আরিফুর রহমান', amount: 5000, campaign: 'কাসেমের হার্ট সার্জারি', vendor: 'Evercare Hospital', status: 'verified' },
    { date: '11 Mar 2026', type: 'Receipt', donor: 'সুমাইয়া বেগম', amount: 3500, campaign: 'কাসেমের হার্ট সার্জারি', vendor: 'Lazz Pharma', status: 'verified' },
    { date: '10 Mar 2026', type: 'Allocation', donor: 'Foundation', amount: 2000, campaign: 'হাসানের ক্যান্সার', vendor: null, status: 'allocated' },
    { date: '09 Mar 2026', type: 'Donation', donor: 'Jannatul Ferdous', amount: 15000, campaign: 'General Fund', vendor: null, status: 'allocated' },
];

const STATUS_COLORS: Record<string, string> = {
    verified: 'bg-success/10 text-success',
    idle: 'bg-amber-100 text-amber-600',
    allocated: 'bg-primary/10 text-primary',
};

export default function ReceiptsAuditPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Receipts & Audit Trail</h1>
                    <p className="text-gray-500 mt-1">Upload vendor receipts and view the full financial audit log.</p>
                </div>
                <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Upload Receipt
                </button>
            </div>

            {/* Upload Box */}
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 hover:border-primary/40 transition-colors cursor-pointer group">
                <div className="w-14 h-14 bg-primary/5 group-hover:bg-primary/10 rounded-2xl flex items-center justify-center transition-colors">
                    <FileText className="w-7 h-7 text-primary" />
                </div>
                <div className="text-center">
                    <p className="font-bold text-gray-700">Drag & drop receipt PDF or image here</p>
                    <p className="text-sm text-gray-400 mt-1">Or click to browse — PDF, PNG, JPG supported</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md mt-2">
                    <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Select Campaign</label>
                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-primary bg-white">
                            <option>কাসেমের হার্ট সার্জারি</option>
                            <option>জামিলার ৩ মাসের ওষুধ</option>
                            <option>হাসানের ক্যান্সার</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Vendor Name</label>
                        <input placeholder="Lazz Pharma..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 block mb-1">Amount (৳)</label>
                        <input type="number" placeholder="35000" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-primary" />
                    </div>
                </div>
            </div>

            {/* Audit Log Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="font-black text-gray-800">Financial Audit Ledger</h2>
                    <p className="text-xs text-gray-400 mt-1">Every transaction — donation, allocation, and receipt — is logged here for 100% transparency.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Type</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">From</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Campaign</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Vendor</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Amount</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AUDIT_LOG.map((row, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                    <td className="px-6 py-4 text-xs text-gray-500 font-medium whitespace-nowrap">{row.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.type === 'Receipt' ? 'bg-emerald-100 text-emerald-600' : row.type === 'Allocation' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-800 text-sm">{row.donor}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm max-w-40 truncate">{row.campaign}</td>
                                    <td className="px-6 py-4">
                                        {row.vendor ? (
                                            <span className="flex items-center gap-1 text-xs text-primary font-bold">
                                                <ShieldCheck className="w-3 h-3" /> {row.vendor}
                                            </span>
                                        ) : <span className="text-xs text-gray-300">—</span>}
                                    </td>
                                    <td className="px-6 py-4 font-black text-gray-800">৳{row.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[row.status] || ''}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                                            <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><Download className="w-3.5 h-3.5" /></button>
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
