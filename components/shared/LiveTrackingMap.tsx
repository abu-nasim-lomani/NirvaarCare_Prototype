'use client';
import { useLang } from '@/components/context/LanguageContext';
import { MapPin, Navigation } from 'lucide-react';

export default function LiveTrackingMap({ eta, caregiver }: { eta: string, caregiver: string }) {
    const { t } = useLang();

    return (
        <div className="mt-4 border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 relative h-48 w-full group">
            {/* Simulated Live Map using standard gmaps embed */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1394186595567!2d90.4101884!3d23.7780447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c770ce66d213%3A0x6e9ec19d14fc11c1!2sGulshan%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1716900000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, opacity: 0.7 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Overlay UI for Tracking Simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur shadow-sm border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-primary" />
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-800">{caregiver}</div>
                    <div className="text-[10px] text-gray-500">{t('রওনা দিয়েছেন', 'On the way')}</div>
                </div>
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white shadow-lg rounded-full px-5 py-2 flex items-center gap-2 whitespace-nowrap">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-bold">{t(`পৌঁছাতে সময় লাগবে: ${eta}`, `ETA: ${eta}`)}</span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                    <MapPin className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}
