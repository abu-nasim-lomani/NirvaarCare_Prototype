'use client';
import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';

export default function ContactPage() {
    const { t } = useLang();
    const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    return (
        <div>
            <div className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 text-center">
                <h1 className="text-4xl font-black mb-3">{t('যোগাযোগ করুন', 'Contact Us')}</h1>
                <p className="text-blue-100">{t('আমরা ২৪/৭ আপনার পাশে আছি', "We're available 24/7 for you")}</p>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-black text-primary-dark mb-6">{t('সরাসরি যোগাযোগ', 'Direct Contact')}</h2>

                        <div className="space-y-4 mb-8">
                            {/* Hotline */}
                            <div className="bg-red-50 border-2 border-emergency rounded-2xl p-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emergency rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-emergency font-semibold uppercase">{t('জরুরি হেল্পলাইন ২৪/৭', '24/7 Emergency Helpline')}</div>
                                        <div className="text-2xl font-black text-emergency">০১৮০০-০০০০০০</div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <a href="https://wa.me/8801800000000" target="_blank" rel="noreferrer"
                                className="flex items-center gap-3 bg-green-50 border-2 border-green-300 rounded-2xl p-4 hover:bg-green-100 transition-colors">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-green-700">{t('WhatsApp-এ চ্যাট করুন', 'Chat on WhatsApp')}</div>
                                    <div className="text-xs text-green-600">{t('সাধারণত ৫ মিনিটের মধ্যে উত্তর', 'Usually responds in 5 minutes')}</div>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <Mail className="w-5 h-5 text-primary" />
                                <div><div className="text-xs text-gray-400">{t('ইমেইল', 'Email')}</div><div className="font-medium">care@nirvaarcare.com.bd</div></div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                <div><div className="text-xs text-gray-400">{t('অফিস ঠিকানা', 'Office Address')}</div><div className="font-medium">{t('হাউস ১২, রোড ৫, গুলশান-১, ঢাকা-১২১২', 'House 12, Road 5, Gulshan-1, Dhaka-1212')}</div></div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <Clock className="w-5 h-5 text-primary" />
                                <div><div className="text-xs text-gray-400">{t('অফিস সময়', 'Office Hours')}</div><div className="font-medium">{t('শনি–বৃহস্পতি: সকাল ৯টা – রাত ৮টা', 'Sat–Thu: 9am – 8pm')}</div></div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="bg-gray-100 rounded-2xl h-64 w-full overflow-hidden border border-gray-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1394186595567!2d90.4101884!3d23.7780447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c770ce66d213%3A0x6e9ec19d14fc11c1!2sGulshan%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1716900000000!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-black text-primary-dark mb-6">{t('বার্তা পাঠান', 'Send a Message')}</h2>
                        {sent ? (
                            <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-8 text-center">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="font-bold text-success text-xl mb-2">{t('বার্তা পাঠানো হয়েছে!', 'Message sent!')}</h3>
                                <p className="text-gray-500 text-sm">{t('আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।', "We'll get back to you soon.")}</p>
                                <button onClick={() => setSent(false)} className="mt-4 text-primary font-medium text-sm">{t('আরো বার্তা পাঠান', 'Send another')}</button>
                            </div>
                        ) : (
                            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">{t('আপনার নাম', 'Your Name')}</label>
                                        <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder={t('নাম লিখুন', 'Enter name')} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">{t('ফোন নম্বর', 'Phone Number')}</label>
                                        <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="01XXXXXXXXX" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('বিষয়', 'Subject')}</label>
                                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary outline-none bg-white">
                                        <option value="">{t('বিষয় বাছুন', 'Select subject')}</option>
                                        <option>{t('সেবা সম্পর্কে জানতে চাই', 'Service inquiry')}</option>
                                        <option>{t('প্যাকেজ সম্পর্কে', 'Package inquiry')}</option>
                                        <option>{t('অভিযোগ', 'Complaint')}</option>
                                        <option>{t('পার্টনারশিপ', 'Partnership')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">{t('বার্তা', 'Message')}</label>
                                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={5}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                                        placeholder={t('আপনার বার্তা লিখুন...', 'Write your message...')} />
                                </div>
                                <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                                    <Send className="w-4 h-4" /> {t('বার্তা পাঠান', 'Send Message')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
