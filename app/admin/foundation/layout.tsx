'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Target, FileText, Settings, Heart, Bell, Search, Activity, LogOut, BarChart2, UserCheck, ClipboardList } from 'lucide-react';

const ADMIN_NAV = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin/foundation' },
    { name: 'Applications', icon: <ClipboardList className="w-5 h-5" />, path: '/admin/foundation/applications' },
    { name: 'Campaigns', icon: <Target className="w-5 h-5" />, path: '/admin/foundation/campaigns' },
    { name: 'Fund Allocation', icon: <Activity className="w-5 h-5" />, path: '/admin/foundation/allocation' },
    { name: 'Donors', icon: <Users className="w-5 h-5" />, path: '/admin/foundation/donors' },
    { name: 'Receipts & Audit', icon: <FileText className="w-5 h-5" />, path: '/admin/foundation/receipts' },
    { name: 'Volunteers', icon: <UserCheck className="w-5 h-5" />, path: '/admin/foundation/volunteers' },
    { name: 'Analytics', icon: <BarChart2 className="w-5 h-5" />, path: '/admin/foundation/analytics' },
    { name: 'Notifications', icon: <Bell className="w-5 h-5" />, path: '/admin/foundation/notifications' },
    { name: 'Settings & Roles', icon: <Settings className="w-5 h-5" />, path: '/admin/foundation/settings' },
];

export default function FoundationAdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">

            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col min-h-screen sticky top-0">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <Heart className="w-8 h-8 text-primary fill-primary" />
                        <div>
                            <h1 className="font-black text-xl leading-tight">NirvaarCare</h1>
                            <span className="text-xs text-teal-400 font-bold tracking-widest uppercase">Foundation Admin</span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {ADMIN_NAV.map(item => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors font-medium text-sm">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div className="relative w-96 hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search campaigns, donors, receipts..."
                            className="w-full bg-gray-50 text-sm pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/50 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emergency rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">Admin User</p>
                                <span className="text-xs text-gray-500">Superadmin</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">
                                AU
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

        </div>
    );
}
