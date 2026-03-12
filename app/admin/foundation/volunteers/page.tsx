'use client';
import { useState } from 'react';
import { MapPin, Clock, CheckCircle, Plus, Phone } from 'lucide-react';

const VOLUNTEERS = [
    { name: 'তারেক রহমান', area: 'Dhaka, Mirpur', visits: 8, status: 'active', phone: '01711-XXXX', avatar: 'ত' },
    { name: 'সাদিয়া ইসলাম', area: 'Chittagong, Agrabad', visits: 3, status: 'active', phone: '01811-XXXX', avatar: 'স' },
    { name: 'Karim Uddin', area: 'Sylhet, Zindabazar', visits: 5, status: 'on_field', phone: '01611-XXXX', avatar: 'K' },
    { name: 'রিপা আক্তার', area: 'Comilla, Kotwali', visits: 1, status: 'new', phone: '01711-XXXX', avatar: 'র' },
];

const FIELD_VISITS = [
    { volunteer: 'তারেক রহমান', patient: 'আব্দুল করিম', date: '11 Mar 2026', status: 'completed', report: true },
    { volunteer: 'Karim Uddin', patient: 'রাহেলা বেগম', date: '12 Mar 2026', status: 'in_progress', report: false },
    { volunteer: 'সাদিয়া ইসলাম', patient: 'জসিম উদ্দিন', date: '10 Mar 2026', status: 'completed', report: true },
];

const STATUS_COLOR: Record<string, string> = {
    active: 'bg-success/10 text-success',
    on_field: 'bg-blue-100 text-blue-600',
    new: 'bg-amber-100 text-amber-600',
};

export default function VolunteersPage() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Volunteer Management</h1>
                    <p className="text-gray-500 mt-1">Onboard volunteers and track field visit reports.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <Plus className="w-4 h-4" /> Add Volunteer
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-black text-gray-800 mb-5">Onboard New Volunteer</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="text-xs font-bold text-gray-500 block mb-1.5">Full Name</label><input type="text" placeholder="নাম লিখুন" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
                        <div><label className="text-xs font-bold text-gray-500 block mb-1.5">Phone Number</label><input type="tel" placeholder="01XXXXXXXXX" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
                        <div><label className="text-xs font-bold text-gray-500 block mb-1.5">Service Area (District)</label><input type="text" placeholder="e.g. Dhaka, Mirpur" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
                        <div><label className="text-xs font-bold text-gray-500 block mb-1.5">Profession</label><input type="text" placeholder="e.g. Social Worker, Student" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary" /></div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm">Add Volunteer</button>
                        <button onClick={() => setShowForm(false)} className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-bold text-sm">Cancel</button>
                    </div>
                </div>
            )}

            <div className="grid xl:grid-cols-2 gap-6">
                {/* Volunteer List */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-black text-gray-800 mb-5">Active Volunteers ({VOLUNTEERS.length})</h2>
                    <div className="space-y-4">
                        {VOLUNTEERS.map((v, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-50">
                                <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary shrink-0">{v.avatar}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-800">{v.name}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {v.area}</span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" /> {v.phone}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${STATUS_COLOR[v.status]}`}>{v.status === 'on_field' ? 'On Field' : v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span>
                                    <p className="text-xs text-gray-400 mt-1">{v.visits} visits</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Field Visits */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-black text-gray-800 mb-5">Recent Field Visits</h2>
                    <div className="space-y-4">
                        {FIELD_VISITS.map((v, i) => (
                            <div key={i} className="p-4 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">Patient: {v.patient}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Volunteer: {v.volunteer}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${v.status === 'completed' ? 'bg-success/10 text-success' : 'bg-blue-100 text-blue-600'}`}>
                                        {v.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {v.date}</span>
                                    {v.report ? (
                                        <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> View Report</button>
                                    ) : (
                                        <button className="text-xs font-bold text-amber-600 hover:underline">Submit Report →</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
