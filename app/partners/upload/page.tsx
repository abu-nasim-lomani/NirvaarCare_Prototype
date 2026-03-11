'use client';
import { useState } from 'react';
import { Upload, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/components/context/LanguageContext';

export default function PartnerUploadPage() {
    const { t } = useLang();
    const [file, setFile] = useState('');
    const [client, setClient] = useState('');
    const [folder, setFolder] = useState('');
    const [note, setNote] = useState('');
    const [done, setDone] = useState(false);
    const [dragging, setDragging] = useState(false);

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Link href="/partners" className="flex items-center gap-1 text-primary text-sm mb-5 hover:underline">
                <ArrowLeft className="w-4 h-4" /> {t('ড্যাশবোর্ডে ফিরুন', 'Back to Dashboard')}
            </Link>
            <h1 className="text-2xl font-black text-primary-dark mb-6">{t('মেডিকেল রিপোর্ট আপলোড', 'Upload Medical Report')}</h1>

            {done ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="font-black text-2xl text-success mb-2">{t('আপলোড সম্পন্ন!', 'Upload Complete!')}</h2>
                    <p className="text-gray-500 text-sm mb-6">{t('রিপোর্টটি ক্লায়েন্টের Medical Vault-এ পাঠানো হয়েছে।', 'Report has been sent to the client\'s Medical Vault.')}</p>
                    <button onClick={() => { setDone(false); setFile(''); setClient(''); }} className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors">
                        {t('আরো আপলোড করুন', 'Upload Another')}
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
                    {/* Client selector */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">{t('ক্লায়েন্ট নির্বাচন করুন', 'Select Client')}</label>
                        <select value={client} onChange={e => setClient(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none bg-white">
                            <option value="">{t('ক্লায়েন্ট বাছুন', 'Choose client')}</option>
                            <option>রাহেলা বেগম (BK-ORD-001)</option>
                            <option>বেগম সালেহা (BK-ORD-003)</option>
                        </select>
                    </div>

                    {/* Vault folder */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">{t('ভল্ট ফোল্ডার', 'Vault Folder')}</label>
                        <select value={folder} onChange={e => setFolder(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none bg-white">
                            <option value="">{t('ফোল্ডার বাছুন', 'Choose folder')}</option>
                            <option>রক্ত পরীক্ষা</option>
                            <option>প্রেসক্রিপশন</option>
                            <option>আল্ট্রাসাউন্ড</option>
                            <option>এক্স-রে</option>
                        </select>
                    </div>

                    {/* File drop zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setDragging(false); setFile('report.pdf') }}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${dragging ? 'border-primary bg-primary/5' : file ? 'border-success bg-green-50' : 'border-gray-200 hover:border-primary'}`}
                        onClick={() => setFile('report.pdf')}>
                        {file ? (
                            <div>
                                <FileText className="w-10 h-10 text-success mx-auto mb-2" />
                                <div className="font-bold text-success text-sm">{file}</div>
                                <div className="text-xs text-gray-400 mt-1">{t('ক্লিক করে পরিবর্তন করুন', 'Click to change')}</div>
                            </div>
                        ) : (
                            <div>
                                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                <div className="text-sm font-medium text-gray-600">{t('ফাইল টেনে আনুন বা ক্লিক করুন', 'Drag & drop or click to select')}</div>
                                <div className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (max 20MB)</div>
                            </div>
                        )}
                    </div>

                    {/* Note */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">{t('ডাক্তারের মন্তব্য (ঐচ্ছিক)', 'Doctor\'s Note (optional)')}</label>
                        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none resize-none" placeholder={t('রিপোর্ট সম্পর্কে কোনো মন্তব্য...', 'Any notes about the report...')} />
                    </div>

                    <button onClick={() => client && file && folder && setDone(true)} disabled={!client || !file || !folder}
                        className="w-full bg-primary text-white py-3.5 rounded-xl font-bold disabled:opacity-50 hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" /> {t('রিপোর্ট আপলোড করুন', 'Upload Report to Vault')}
                    </button>
                </div>
            )}
        </div>
    );
}
