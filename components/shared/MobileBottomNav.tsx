'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, Calendar, User } from 'lucide-react';
import { useLang } from '@/components/context/LanguageContext';
import { useAuth } from '@/components/context/AuthContext';

const tabs = [
    { icon: Home, labelBn: 'হোম', labelEn: 'Home', href: '/' },
    { icon: Grid3X3, labelBn: 'সেবা', labelEn: 'Services', href: '/services' },
    { icon: Calendar, labelBn: 'বুকিং', labelEn: 'Book', href: '/dashboard/book' },
    { icon: User, labelBn: 'প্রোফাইল', labelEn: 'Profile', href: '/dashboard/profile' },
];

export default function MobileBottomNav() {
    const pathname = usePathname();
    const { t } = useLang();
    const { isLoggedIn } = useAuth();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 pb-safe">
            <div className="flex">
                {tabs.map(({ icon: Icon, labelBn, labelEn, href }) => {
                    const active = pathname === href || (href !== '/' && pathname.startsWith(href));
                    const link = (href === '/dashboard/book' || href === '/dashboard/profile') && !isLoggedIn ? '/login' : href;
                    return (
                        <Link key={href} href={link} className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${active ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
                            <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
                            <span className="text-[10px] font-medium">{t(labelBn, labelEn)}</span>
                            {active && <div className="w-1 h-1 bg-primary rounded-full" />}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
