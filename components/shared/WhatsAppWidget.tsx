'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Delay showing the widget slightly so it doesn't pop up immediately on load
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end">
            {/* Chat Box */}
            <div className={`mb-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                <div className="bg-green-500 p-4 text-white flex justify-between items-center">
                    <div>
                        <div className="font-bold text-lg">Nirvaar Care</div>
                        <div className="text-xs text-green-100">Usually replies in 5 minutes</div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-green-600 p-1 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 bg-gray-50 h-32 flex flex-col justify-end">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 shadow-sm self-start inline-block">
                        হ্যালো! কীভাবে আপনাকে সাহায্য করতে পারি? 👋
                    </div>
                </div>
                <div className="p-3 bg-white border-t border-gray-100">
                    <a href="https://wa.me/8801800000000" target="_blank" rel="noreferrer"
                        className="block w-full text-center bg-green-500 text-white font-bold py-2.5 rounded-xl hover:bg-green-600 transition-colors">
                        Start Chat
                    </a>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:bg-green-600 transition-all animate-bounce-slow"
                aria-label="Chat on WhatsApp"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
            </button>
        </div>
    );
}
