'use client';
import { useState } from 'react';
import { User, Droplets, Phone, Globe, Shield, Edit, Check, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/context/AuthContext';
import { useLang } from '@/components/context/LanguageContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const CONDITIONS = ['ডায়াবেটিস', 'উচ্চরক্তচাপ', 'হার্টের সমস্যা', 'কিডনি সমস্যা', 'আর্থ্রাইটিস', 'অ্যাজমা', 'ডিমেনশিয়া'];
const TIMEZONES = ['Asia/Dhaka (BD)', 'Europe/London (UK)', 'America/Toronto (Canada)', 'America/New_York (US-East)', 'Asia/Dubai (UAE)', 'Australia/Sydney (AU)'];

const FAMILY_MEMBERS = [
    { id: 1, name: 'মোঃ আব্দুর রহিম', relation: 'বাবা', age: 72, blood: 'O+', conditions: ['ডায়াবেটিস', 'উচ্চরক্তচাপ'], meds: 'Metformin, Amlodipine' },
    { id: 2, name: 'বেগম রাহেলা', relation: 'মা', age: 68, blood: 'B+', conditions: ['আর্থ্রাইটিস'], meds: 'Calcium Supplement' },
];

type Tab = 'profile' | 'family' | 'emergency' | 'nrb';

export default function ProfilePage() {
    const { user } = useAuth();
    const { t } = useLang();
    const [tab, setTab] = useState<Tab>('profile');
    const [editing, setEditing] = useState(false);
    const [selectedConditions, setSelectedConditions] = useState(['ডায়াবেটিস', 'উচ্চরক্তচাপ']);
    const [bloodGroup, setBloodGroup] = useState('O+');
    const [timezone, setTimezone] = useState('Asia/Dhaka (BD)');
    const [isNRB, setIsNRB] = useState(true);
    const [members, setMembers] = useState(FAMILY_MEMBERS);
    const [showAddMember, setShowAddMember] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', relation: '', age: '', blood: '' });

    const TABS: { id: Tab, label: string, en: string }[] = [
        { id: 'profile', label: 'আমার প্রোফাইল', en: 'My Profile' },
        { id: 'family', label: 'পরিবারের সদস্য', en: 'Family Members' },
        { id: 'emergency', label: 'জরুরি যোগাযোগ', en: 'Emergency' },
        { id: 'nrb', label: 'NRB সেটিংস', en: 'NRB Settings' },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-black text-primary-dark">{t('প্রোফাইল সেটিংস', 'Profile Settings')}</h1>
                {(tab === 'profile' || tab === 'nrb') && (
                    <button onClick={() => setEditing(!editing)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${editing ? 'bg-success text-white' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}>
                        {editing ? <><Check className="w-4 h-4" /> {t('সংরক্ষণ', 'Save')}</> : <><Edit className="w-4 h-4" /> {t('সম্পাদনা', 'Edit')}</>}
                    </button>
                )}
            </div>

            {/* Tab bar */}
            <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-6 overflow-x-auto">
                {TABS.map(tb => (
                    <button key={tb.id} onClick={() => { setTab(tb.id); setEditing(false); }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${tab === tb.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                        {t(tb.label, tb.en)}
                    </button>
                ))}
            </div>

            {/* TAB 1: My Profile */}
            {tab === 'profile' && (
                <div className="space-y-5">
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl cursor-pointer hover:bg-primary/20 transition-colors">👤</div>
                            <div>
                                <h2 className="font-black text-xl text-primary-dark">{user?.name || 'রাহেলা বেগম'}</h2>
                                <div className="text-sm text-gray-500">{user?.phone || '+447700900000'}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[['নাম', 'Name', user?.name || 'রাহেলা বেগম'], ['ইমেইল', 'Email', 'rahela@email.com'], ['জেলা', 'District', 'ঢাকা'], ['ঠিকানা', 'Address', 'গুলশান-১']].map(([bn, en, val]) => (
                                <div key={bn}>
                                    <label className="text-xs font-medium text-gray-400 mb-1 block">{t(bn, en)}</label>
                                    {editing ? <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-primary outline-none" /> : <div className="font-medium text-sm text-gray-800">{val}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Patient Info */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-800 mb-3">{t('প্রাথমিক রোগীর তথ্য', 'Primary Patient Info')}</h3>
                        <div className="mb-3">
                            <label className="text-xs font-medium text-gray-400 block mb-1">{t('রক্তের গ্রুপ', 'Blood Group')}</label>
                            {editing ? (
                                <div className="flex flex-wrap gap-1">{BLOOD_GROUPS.map(bg => (
                                    <button key={bg} onClick={() => setBloodGroup(bg)} className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${bloodGroup === bg ? 'border-emergency bg-emergency text-white' : 'border-gray-200'}`}>{bg}</button>
                                ))}</div>
                            ) : <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-emergency" /><span className="font-bold text-emergency">{bloodGroup}</span></div>}
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-400 block mb-2">{t('বিদ্যমান রোগ', 'Conditions')}</label>
                            <div className="flex flex-wrap gap-2">
                                {CONDITIONS.map(c => (
                                    <button key={c} onClick={() => editing && setSelectedConditions(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c])}
                                        className={`px-3 py-1.5 rounded-full border text-xs ${selectedConditions.includes(c) ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-600'} ${editing ? 'cursor-pointer' : 'cursor-default'}`}>
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: Family Members */}
            {tab === 'family' && (
                <div className="space-y-3">
                    {members.map(m => (
                        <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">{m.relation === 'বাবা' ? '👴' : '👵'}</div>
                                    <div>
                                        <div className="font-bold text-gray-800">{m.name}</div>
                                        <div className="text-xs text-gray-500">{m.relation} • বয়স {m.age}</div>
                                    </div>
                                </div>
                                <button onClick={() => setMembers(ms => ms.filter(x => x.id !== m.id))} className="p-1.5 hover:bg-red-50 rounded-lg text-red-300 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                <div className="bg-red-50 rounded-xl p-2 text-center"><div className="text-emergency font-bold">{m.blood}</div><div className="text-gray-400">রক্ত</div></div>
                                <div className="bg-blue-50 rounded-xl p-2 text-center"><div className="text-primary font-bold text-[10px] leading-tight">{m.conditions.join(', ')}</div><div className="text-gray-400">রোগ</div></div>
                                <div className="bg-green-50 rounded-xl p-2 text-center"><div className="text-success font-bold text-[10px] leading-tight">{m.meds}</div><div className="text-gray-400">ওষুধ</div></div>
                            </div>
                        </div>
                    ))}

                    {/* Empty state */}
                    {members.length === 0 && (
                        <div className="text-center py-10">
                            <div className="text-5xl mb-3">👨‍👩‍👧</div>
                            <p className="text-gray-400 text-sm">{t('কোনো পরিবারের সদস্য যোগ হয়নি', 'No family members added yet')}</p>
                        </div>
                    )}

                    {/* Add Member */}
                    {showAddMember ? (
                        <div className="bg-white rounded-2xl border-2 border-primary/30 p-4">
                            <h3 className="font-bold text-gray-800 mb-3">{t('নতুন সদস্য যোগ করুন', 'Add New Member')}</h3>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                {[['name', 'নাম', 'Name'], ['relation', 'সম্পর্ক', 'Relation'], ['age', 'বয়স', 'Age'], ['blood', 'রক্তের গ্রুপ', 'Blood Group']].map(([f, bn, en]) => (
                                    <div key={f}>
                                        <label className="text-xs font-medium text-gray-500 mb-1 block">{t(bn, en)}</label>
                                        <input value={newMember[f as keyof typeof newMember]} onChange={e => setNewMember(v => ({ ...v, [f]: e.target.value }))}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-primary outline-none" placeholder={t(bn, en)} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setShowAddMember(false)} className="flex-1 border border-gray-200 py-2 rounded-xl text-sm">{t('বাতিল', 'Cancel')}</button>
                                <button onClick={() => { setMembers(m => [...m, { id: Date.now(), ...newMember, age: +newMember.age, conditions: [], meds: '' }]); setShowAddMember(false); setNewMember({ name: '', relation: '', age: '', blood: '' }); }}
                                    disabled={!newMember.name || !newMember.relation}
                                    className="flex-1 bg-primary text-white py-2 rounded-xl text-sm font-bold disabled:opacity-50">{t('যোগ করুন', 'Add')}</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setShowAddMember(true)} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-primary/30 py-3 rounded-2xl text-primary font-bold hover:border-primary transition-colors text-sm">
                            <Plus className="w-4 h-4" /> {t('নতুন সদস্য যোগ করুন', 'Add New Member')}
                        </button>
                    )}
                </div>
            )}

            {/* TAB 3: Emergency Contact */}
            {tab === 'emergency' && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                    <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2"><Phone className="w-4 h-4 text-emergency" />{t('জরুরি যোগাযোগ তালিকা', 'Emergency Contacts')}</h3>
                    <div className="space-y-3">
                        {[{ name: 'করিম ভাই', phone: '+447700900000', rel: 'ছেলে' }, { name: 'ঢাকা মেডিকেল', phone: '01234567890', rel: 'হাসপাতাল' }].map(c => (
                            <div key={c.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">{c.name[0]}</div>
                                <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-800">{c.name}</div>
                                    <div className="text-xs text-gray-400">{c.rel} • {c.phone}</div>
                                </div>
                                <a href={`tel:${c.phone}`} className="text-xs bg-success text-white px-3 py-1.5 rounded-lg font-bold">{t('কল', 'Call')}</a>
                            </div>
                        ))}
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 py-3 rounded-xl text-gray-500 hover:border-primary hover:text-primary transition-colors text-sm">
                        <Plus className="w-4 h-4" /> {t('যোগাযোগ যোগ করুন', 'Add Contact')}
                    </button>
                </div>
            )}

            {/* TAB 4: NRB Settings */}
            {tab === 'nrb' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" />{t('প্রবাসী সেটিংস', 'NRB Settings')}</h3>
                            <div onClick={() => setIsNRB(!isNRB)} className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${isNRB ? 'bg-primary' : 'bg-gray-300'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isNRB ? 'translate-x-5' : 'translate-x-0.5'}`} />
                            </div>
                        </div>
                        {isNRB && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('আপনার টাইমজোন', 'Your Timezone')}</label>
                                    <select value={timezone} onChange={e => setTimezone(e.target.value)} disabled={!editing}
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-primary outline-none">
                                        {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                                    </select>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-sm font-medium text-gray-700 mb-1">{t('নোটিফিকেশন প্রেফারেন্স', 'Notification Preference')}</div>
                                    {[t('বাংলাদেশ সময়ে পাঠান', 'Send in BD time'), t('আমার সময়ে পাঠান', 'Send in my local time')].map(opt => (
                                        <label key={opt} className="flex items-center gap-2 py-2 cursor-pointer">
                                            <input type="radio" name="notif" className="text-primary" />
                                            <span className="text-sm text-gray-700">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Family Sharing */}
                    <div className="bg-gradient-to-br from-accent/10 to-yellow-50 border border-accent/30 rounded-2xl p-5">
                        <div className="flex items-start gap-3 mb-3">
                            <span className="text-3xl">👨‍👩‍👧‍👦</span>
                            <div>
                                <h3 className="font-bold text-gray-800">{t('ফ্যামিলি শেয়ারিং', 'Family Sharing')}</h3>
                                <p className="text-xs text-gray-500 mt-1">{t('পরিবারের অন্য সদস্যদের সাথে ড্যাশবোর্ড ভাগ করুন', 'Share dashboard access with family members')}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center">
                            <span className="text-xs bg-accent text-white font-bold px-3 py-1 rounded-full">{t('⭐ প্রিমিয়াম ফিচার', '⭐ Premium Feature')}</span>
                            <p className="text-xs text-gray-500 mt-2">{t('প্রিমিয়াম প্ল্যানে আপগ্রেড করুন', 'Upgrade to Premium plan')}</p>
                            <a href="/pricing" className="inline-block mt-2 text-xs text-primary font-bold hover:underline">{t('আপগ্রেড করুন →', 'Upgrade →')}</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
