'use client';
import { useState } from 'react';
import { Folder, FileText, Upload, MoreVertical, Search, FolderOpen, Link2, Copy, Check } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

const FOLDERS = ['টেস্ট রিপোর্ট', 'প্রেসক্রিপশন', 'হাসপাতাল ডকুমেন্ট', 'ইমেজিং (X-Ray, CT)'];
const FILES = [
    { id: 1, name: 'CBC_Blood_Test.pdf', date: '৮ মার্চ ২০২৬', type: 'pdf', folder: 'টেস্ট রিপোর্ট', size: '1.2 MB', uploader: 'ল্যাব এইড' },
];

export default function VaultPage() {
    const { t } = useLang();
    const [activeFolder, setActiveFolder] = useState('টেস্ট রিপোর্ট');
    const [modalOpen, setModalOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [files, setFiles] = useState(FILES);

    const handleCopy = () => {
        navigator.clipboard.writeText('https://nirvaarcare.com.bd/vault/shared/X8Y9Z');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const curFiles = files.filter(f => f.folder === activeFolder);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Upload Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
                        <h3 className="font-bold text-lg mb-4">{t('নতুন ডকুমেন্ট আপলোড', 'Upload Document')}</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-4 hover:border-primary transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-700">{t('ফাইল টেনে আনুন বা ক্লিক করুন', 'Drag & drop or Click')}</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 block mb-1">{t('ফোল্ডার নির্বাচন', 'Select Folder')}</label>
                            <select value={activeFolder} onChange={e => setActiveFolder(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-primary outline-none">
                                {FOLDERS.map(f => <option key={f}>{f}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button onClick={() => setModalOpen(false)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm font-medium">{t('বাতিল', 'Cancel')}</button>
                            <button onClick={() => { setFiles([...files, { id: Date.now(), name: 'New_Document.pdf', date: 'Today', type: 'pdf', folder: activeFolder, size: '2.5 MB', uploader: 'Customer' }]); setModalOpen(false) }} className="flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-bold">{t('আপলোড', 'Upload')}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Link Modal */}
            {shareOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                            <Link2 className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{t('ভল্ট শেয়ার করুন', 'Share Vault')}</h3>
                        <p className="text-sm text-gray-500 mb-5">{t('ডাক্তার বা পরিবারের সাথে রিপোর্ট শেয়ার করতে এই লিংকটি কপি করুন। লিংকটি ৪৮ ঘণ্টা পর মেয়াদোত্তীর্ণ হবে।', 'Copy this link to share reports with your doctor or family. The link expires in 48 hours.')}</p>

                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 mb-5">
                            <input type="text" readOnly value="https://nirvaarcare.com.bd/vault/shared/X8Y9Z" className="bg-transparent text-sm text-gray-600 flex-1 outline-none px-2 font-mono" />
                            <button onClick={handleCopy} className={`p-2 rounded-lg transition-colors ${copied ? 'bg-success text-white' : 'bg-white border text-gray-600 hover:bg-gray-100'}`}>
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>

                        <button onClick={() => setShareOpen(false)} className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors">
                            {t('বন্ধ করুন', 'Close')}
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-primary-dark">{t('মেডিকেল ভল্ট', 'Medical Vault')}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500">{t('কার জন্য:', 'For:')}</span>
                        <select className="bg-gray-100 border-none rounded-lg px-2 py-1 text-sm font-bold text-primary outline-none cursor-pointer">
                            <option>মোঃ আব্দুর রহিম (বাবা)</option>
                            <option>রাহেলা বেগম (মা)</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2 text-sm">
                    <button onClick={() => setShareOpen(true)} className="px-3 py-2 md:px-4 md:py-2 rounded-xl font-bold bg-white text-primary border-2 border-primary hover:bg-primary/5 transition-colors hidden sm:block">
                        {t('শেয়ার লিংক', 'Share Link')}
                    </button>
                    <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl font-bold bg-primary text-white border-2 border-primary hover:bg-primary-dark transition-colors">
                        <Upload className="w-4 h-4" /> <span className="hidden sm:inline">{t('আপলোড', 'Upload')}</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Folders */}
                <div className="w-full md:w-64 space-y-2">
                    {FOLDERS.map(f => (
                        <button key={f} onClick={() => setActiveFolder(f)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeFolder === f ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-transparent'}`}>
                            <div className="flex items-center gap-2">
                                <Folder className={`w-5 h-5 ${activeFolder === f ? 'text-white' : 'text-primary/70'}`} />
                                <span className="font-semibold text-sm">{f}</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${activeFolder === f ? 'bg-white/20' : 'bg-primary/10 text-primary font-bold'}`}>
                                {files.filter(x => x.folder === f).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* File List */}
                <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 min-h-[400px]">
                    <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
                        <h2 className="font-bold text-gray-800 flex items-center gap-2"><FolderOpen className="w-5 h-5 text-primary" /> {activeFolder}</h2>
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input className="bg-gray-50 border border-gray-200 rounded-full pl-9 pr-3 py-1.5 text-xs outline-none focus:border-primary" placeholder={t('ফাইল খুঁজুন...', 'Search files...')} />
                        </div>
                    </div>

                    {/* EMPTY STATE */}
                    {curFiles.length === 0 ? (
                        <div className="text-center py-20">
                            <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-600 mb-1">{t('কোনো ডকুমেন্ট নেই', 'No documents found')}</h3>
                            <p className="text-sm text-gray-400 max-w-xs mx-auto mb-4">{t('ডকুমেন্ট আপলোড করুন, সব এক জায়গায় গুছিয়ে রাখুন।', 'Upload documents and keep everything organized in one place.')}</p>
                            <button onClick={() => setModalOpen(true)} className="text-sm bg-primary/10 text-primary font-bold px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors">
                                {t('+ আপলোড করুন', '+ Upload Document')}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {curFiles.map(file => (
                                <div key={file.id} className="border border-gray-200 rounded-xl p-3 flex items-start gap-3 hover:border-primary transition-colors group cursor-pointer">
                                    <div className="w-10 h-10 bg-red-50 text-emergency rounded-lg flex items-center justify-center flex-shrink-0 font-black text-xs">PDF</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-gray-800 truncate group-hover:text-primary transition-colors">{file.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">{file.date} • {file.size}</div>
                                        <div className="text-[10px] text-gray-400 mt-0.5">{t('আপলোড:', 'By:')} {file.uploader}</div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-800 p-1"><MoreVertical className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
