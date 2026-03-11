import { Building2, CheckCircle2, PhoneCall, Link as LinkIcon } from 'lucide-react';

export default function CompanionServicePage() {
    const caregivers = [
        { name: 'বেগম আমেনা', age: 45, langs: ['বাংলা'], hobbies: ['বই পড়া', 'ধর্মীয় আলোচনা'], rating: 4.9 },
        { name: 'রাশেদ আহমেদ', age: 28, langs: ['বাংলা', 'English'], hobbies: ['খেলাধুলা', 'প্রযুক্তি'], rating: 4.8 },
    ];

    return (
        <div className="pb-20">
            <div className="bg-primary-dark pt-32 pb-20 px-4 text-center text-white relative overflow-hidden">
                <h1 className="text-4xl md:text-5xl font-black mb-4">মানসিক সঙ্গ (Senior Companion)</h1>
                <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed mb-8">একাকিত্ব দূর করতে বিশ্বস্ত সঙ্গী</p>
                <a href="/dashboard/book" className="bg-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-colors inline-block">বুকিং করুন</a>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-10">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl mb-10">
                    <h2 className="text-2xl font-black text-gray-800 mb-6 border-l-4 border-primary pl-4">কী কী পাবেন?</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {['বিশ্বস্ত সঙ্গী ও কথোপকথন', 'বই/পত্রিকা পড়ে শোনানো', 'হাঁটতে বের হওয়া', 'শখের কাজে সাহায্য করা'].map(feature => (
                            <div key={feature} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl"><CheckCircle2 className="w-5 h-5 text-success" /><span className="font-semibold text-gray-700">{feature}</span></div>
                        ))}
                    </div>
                </div>

                {/* Caregiver Browse Showcase (Unique to this service) */}
                <h2 className="text-2xl font-black text-gray-800 mb-6 text-center">আপনার জন্য উপযুক্ত কেয়ারগিভার খুঁজুন</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {caregivers.map(cg => (
                        <div key={cg.name} className="bg-white border-2 border-primary/20 rounded-3xl p-6 text-center hover:border-primary transition-colors cursor-pointer group">
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
                            <h3 className="font-black text-xl text-primary-dark mb-1">{cg.name}</h3>
                            <div className="text-yellow-500 text-sm font-bold mb-3">★ {cg.rating} রেটিং</div>
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {cg.hobbies.map(h => <span key={h} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">{h}</span>)}
                            </div>
                            <div className="text-xs text-gray-500 font-medium bg-gray-50 inline-block px-3 py-1 rounded-full">ভাষা: {cg.langs.join(', ')}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
