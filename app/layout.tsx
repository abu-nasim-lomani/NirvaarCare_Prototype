import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/context/AuthContext';
import { LanguageProvider } from '@/components/context/LanguageContext';
import { AccessibilityProvider } from '@/components/context/AccessibilityContext';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import SOSButton from '@/components/shared/SOSButton';
import WhatsAppWidget from '@/components/shared/WhatsAppWidget';
import MobileBottomNav from '@/components/shared/MobileBottomNav';

export const metadata: Metadata = {
    title: 'নির্ভার কেয়ার | আপনার প্রিয়জনের যত্ন',
    description: 'বাংলাদেশের সার্বক্ষণিক এলডারকেয়ার সেবা। NID যাচাইকৃত কেয়ারগিভার, মেডিকেল ভল্ট, জরুরি SOS। NRB পরিবারের জন্য বিশেষ সেবা।',
    keywords: 'eldercare, bangladesh, homecare, caregiver, medical, nirvaar care',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="bn">
            <body className="min-h-screen flex flex-col">
                <AuthProvider>
                    <LanguageProvider>
                        <AccessibilityProvider>
                            <Navbar />
                            <main className="flex-1 pb-16 md:pb-0">
                                {children}
                            </main>
                            <Footer />
                            <SOSButton />
                            <WhatsAppWidget />
                            <MobileBottomNav />
                        </AccessibilityProvider>
                    </LanguageProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
