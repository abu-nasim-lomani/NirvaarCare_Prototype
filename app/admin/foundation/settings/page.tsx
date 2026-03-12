'use client';
import { useState } from 'react';
import { Shield, Check, X } from 'lucide-react';

const ROLES = [
    { id: 'executive', name: 'Executive Director', color: 'bg-purple-100 text-purple-700 border-purple-200', desc: 'Full access to all modules and financial decisions.' },
    { id: 'finance', name: 'Finance Manager', color: 'bg-blue-100 text-blue-700 border-blue-200', desc: 'Manages fund allocation, receipts, and audit trails.' },
    { id: 'case', name: 'Case Manager', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: 'Reviews patient applications and field visits.' },
    { id: 'community', name: 'Community Manager', color: 'bg-amber-100 text-amber-700 border-amber-200', desc: 'Manages donors, badges, and communication.' },
];

const PERMISSIONS = [
    { id: 'dashboard', label: 'View Dashboard', executive: true, finance: true, case: true, community: true },
    { id: 'applications', label: 'Review Applications', executive: true, finance: false, case: true, community: false },
    { id: 'campaigns_view', label: 'View Campaigns', executive: true, finance: true, case: true, community: true },
    { id: 'campaigns_edit', label: 'Create/Edit Campaigns', executive: true, finance: false, case: false, community: false },
    { id: 'fund_allocate', label: 'Allocate Funds', executive: true, finance: true, case: false, community: false },
    { id: 'receipts', label: 'Upload Receipts', executive: true, finance: true, case: false, community: false },
    { id: 'audit', label: 'View Audit Ledger', executive: true, finance: true, case: false, community: false },
    { id: 'donors', label: 'View Donors', executive: true, finance: false, case: false, community: true },
    { id: 'tax_cert', label: 'Generate Tax Certificates', executive: true, finance: true, case: false, community: true },
    { id: 'volunteers', label: 'Manage Volunteers', executive: true, finance: false, case: true, community: true },
    { id: 'analytics', label: 'View Analytics', executive: true, finance: true, case: false, community: false },
    { id: 'settings', label: 'Manage Settings & Roles', executive: true, finance: false, case: false, community: false },
    { id: 'sos_fund', label: 'Emergency SOS Fund', executive: true, finance: true, case: false, community: false },
];

const TEAM = [
    { name: 'Nasim Ahmed', email: 'nasim@nirvaarcare.org', role: 'executive', avatar: 'N' },
    { name: 'Farida Begum', email: 'farida@nirvaarcare.org', role: 'finance', avatar: 'F' },
    { name: 'Rahim Hossain', email: 'rahim@nirvaarcare.org', role: 'case', avatar: 'R' },
    { name: 'Sumaiya Khan', email: 'sumaiya@nirvaarcare.org', role: 'community', avatar: 'S' },
];

type PermRow = { id: string; label: string; executive: boolean; finance: boolean; case: boolean; community: boolean; };

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<'roles' | 'team'>('roles');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Settings & Access Control</h1>
                <p className="text-gray-500 mt-1">Manage team roles, permissions, and access levels (RBAC).</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200">
                {(['roles', 'team'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 text-sm font-bold rounded-t-xl capitalize transition-colors ${activeTab === tab ? 'bg-white border border-b-white border-gray-200 -mb-px text-primary' : 'text-gray-500 hover:text-gray-700'}`}>
                        {tab === 'roles' ? 'Permission Matrix' : 'Team Members'}
                    </button>
                ))}
            </div>

            {activeTab === 'roles' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-6 py-5 font-bold text-gray-500 text-xs uppercase tracking-wider min-w-52">Permission</th>
                                    {ROLES.map(r => (
                                        <th key={r.id} className="px-4 py-5 min-w-36">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${r.color}`}>{r.name}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {PERMISSIONS.map((perm, i) => (
                                    <tr key={perm.id} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                                        <td className="px-6 py-3.5 font-medium text-gray-700">{perm.label}</td>
                                        {ROLES.map(role => (
                                            <td key={role.id} className="px-4 py-3.5 text-center">
                                                {(perm as unknown as Record<string, boolean>)[role.id] ? (
                                                    <span className="inline-flex items-center justify-center w-7 h-7 bg-success/10 rounded-full"><Check className="w-4 h-4 text-success" /></span>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full"><X className="w-4 h-4 text-gray-300" /></span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'team' && (
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                            + Invite Team Member
                        </button>
                    </div>
                    {TEAM.map((m, i) => {
                        const role = ROLES.find(r => r.id === m.role)!;
                        return (
                            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-lg shrink-0">{m.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-800">{m.name}</p>
                                    <p className="text-sm text-gray-500">{m.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${role.color}`}><Shield className="w-3 h-3 inline mr-1" />{role.name}</span>
                                    <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-600 outline-none focus:border-primary bg-white">
                                        {ROLES.map(r => <option key={r.id} value={r.id} selected={r.id === m.role}>{r.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
