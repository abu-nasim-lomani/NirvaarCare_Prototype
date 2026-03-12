'use client';
import { useState } from 'react';
import { CheckCircle, XCircle, Clock, MessageSquare, Eye, User, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react';

const APPLICATIONS = [
    {
        id: 'APP-001', trackingId: 'NCF-2026-38291',
        patient: 'আব্দুল করিম', age: 60, district: 'নারায়ণগঞ্জ', disease: 'হার্টের সমস্যা',
        applicantType: 'family', applicantName: 'মোহাম্মদ সালাম (পুত্র)', phone: '01711-XXXXXX',
        amountNeeded: 120000, urgency: '৭ দিন', submittedAt: '12 Mar 2026, 9:15 AM',
        docs: ['prescription.pdf', 'nid_scan.jpg'], status: 'pending'
    },
    {
        id: 'APP-002', trackingId: 'NCF-2026-72034',
        patient: 'রাহেলা বেগম', age: 45, district: 'সিলেট', disease: 'ক্যান্সার',
        applicantType: 'referral', applicantName: 'Dr. Karim, SZMCH', phone: '01811-XXXXXX',
        amountNeeded: 450000, urgency: '৩০ দিন', submittedAt: '11 Mar 2026, 4:00 PM',
        docs: ['medical_report.pdf', 'referral_letter.pdf'], status: 'more_info'
    },
    {
        id: 'APP-003', trackingId: 'NCF-2026-10892',
        patient: 'জসিম উদ্দিন', age: 35, district: 'ঢাকা', disease: 'কিডনি সমস্যা',
        applicantType: 'self', applicantName: 'জসিম উদ্দিন (নিজে)', phone: '01611-XXXXXX',
        amountNeeded: 80000, urgency: '১৫ দিন', submittedAt: '10 Mar 2026, 11:30 AM',
        docs: ['hospital_letter.pdf'], status: 'approved'
    },
    {
        id: 'APP-004', trackingId: 'NCF-2026-55671',
        patient: 'সুরাইয়া খাতুন', age: 70, district: 'রাজশাহী', disease: 'ডায়াবেটিস',
        applicantType: 'family', applicantName: 'নূরজাহান (কন্যা)', phone: '01911-XXXXXX',
        amountNeeded: 15000, urgency: '৬০ দিন', submittedAt: '9 Mar 2026, 2:45 PM',
        docs: ['report.jpg'], status: 'rejected'
    },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending: { label: 'Pending Review', color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-3.5 h-3.5" /> },
    more_info: { label: 'More Info Needed', color: 'bg-blue-100 text-blue-700', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    approved: { label: 'Approved', color: 'bg-success/10 text-success', icon: <CheckCircle className="w-3.5 h-3.5" /> },
    rejected: { label: 'Rejected', color: 'bg-emergency/10 text-emergency', icon: <XCircle className="w-3.5 h-3.5" /> },
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
    self: <User className="w-4 h-4" />,
    family: <Users className="w-4 h-4" />,
    referral: <Heart className="w-4 h-4" />,
};

export default function AdminApplicationsPage() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [statuses, setStatuses] = useState(Object.fromEntries(APPLICATIONS.map(a => [a.id, a.status])));

    const updateStatus = (id: string, status: string) => {
        setStatuses(prev => ({ ...prev, [id]: status }));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Patient Applications</h1>
                    <p className="text-gray-500 mt-1">Review, verify, and approve patient funding applications.</p>
                </div>
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Pending', count: APPLICATIONS.filter(a => a.status === 'pending').length, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'More Info', count: APPLICATIONS.filter(a => a.status === 'more_info').length, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Approved', count: APPLICATIONS.filter(a => a.status === 'approved').length, color: 'text-success', bg: 'bg-success/10' },
                    { label: 'Rejected', count: APPLICATIONS.filter(a => a.status === 'rejected').length, color: 'text-emergency', bg: 'bg-emergency/10' },
                ].map(s => (
                    <div key={s.label} className={`rounded-2xl p-5 border border-gray-100 bg-white`}>
                        <p className={`text-3xl font-black ${s.color}`}>{s.count}</p>
                        <p className="text-sm text-gray-500 font-bold mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {APPLICATIONS.map(app => {
                    const currentStatus = statuses[app.id];
                    const statusCfg = STATUS_CONFIG[currentStatus];
                    const isExpanded = expanded === app.id;

                    return (
                        <div key={app.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {/* Header Row */}
                            <div className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpanded(isExpanded ? null : app.id)}>
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 font-bold">
                                    {app.patient.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-black text-gray-800">{app.patient}</p>
                                        <span className="text-xs text-gray-400">·</span>
                                        <p className="text-xs text-gray-500">{app.age} বছর, {app.district}</p>
                                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${statusCfg.color}`}>
                                            {statusCfg.icon} {statusCfg.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                                        <span className="text-xs text-gray-500">{app.disease}</span>
                                        <span className="text-xs font-bold text-emergency">৳{app.amountNeeded.toLocaleString()} needed</span>
                                        <span className="text-xs text-gray-400">· {app.submittedAt}</span>
                                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                            {TYPE_ICONS[app.applicantType]}
                                            {app.applicantType === 'self' ? 'Self' : app.applicantType === 'family' ? 'Family' : 'Referral'}
                                        </span>
                                    </div>
                                </div>
                                <div className="shrink-0 text-gray-400">
                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                                <div className="border-t border-gray-100 p-6 space-y-6">
                                    <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Applicant</p>
                                            <p className="font-bold text-gray-800">{app.applicantName}</p>
                                            <p className="text-gray-500">{app.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Urgency</p>
                                            <p className="font-bold text-gray-800">{app.urgency}</p>
                                            <p className="text-gray-500">Tracking: {app.trackingId}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Documents</p>
                                            <div className="space-y-1">
                                                {app.docs.map(doc => (
                                                    <button key={doc} className="flex items-center gap-2 text-primary hover:underline text-sm">
                                                        <Eye className="w-3.5 h-3.5" /> {doc}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admin Note */}
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 block mb-1.5">Admin Note / Reason (visible to applicant)</label>
                                        <textarea rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary text-sm resize-none" placeholder="Add a note about your decision..." />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3">
                                        <button onClick={() => updateStatus(app.id, 'approved')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${currentStatus === 'approved' ? 'bg-success text-white shadow-lg shadow-success/20' : 'bg-success/10 text-success hover:bg-success/20'}`}>
                                            <CheckCircle className="w-4 h-4" /> Approve & Create Campaign
                                        </button>
                                        <button onClick={() => updateStatus(app.id, 'more_info')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${currentStatus === 'more_info' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                                            <MessageSquare className="w-4 h-4" /> Request More Info
                                        </button>
                                        <button onClick={() => updateStatus(app.id, 'rejected')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${currentStatus === 'rejected' ? 'bg-emergency text-white' : 'bg-emergency/10 text-emergency hover:bg-emergency/20'}`}>
                                            <XCircle className="w-4 h-4" /> Reject
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
