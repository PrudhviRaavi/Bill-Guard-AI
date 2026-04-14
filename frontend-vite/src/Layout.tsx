import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Camera,
    ShieldAlert,
    Send,
    TrendingDown,
    Zap,
    ChevronRight,
    Sun,
    Moon
} from 'lucide-react';
import { cn } from './lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Check local storage or preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#0d0d0d] transition-colors duration-300">
            <Sidebar isDark={isDark} toggleTheme={toggleTheme} />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto relative h-screen">
                {/* Subtle ambient glow - only in dark mode */}
                <div className="fixed top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[150px] pointer-events-none opacity-0 dark:opacity-100 transition-opacity" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="relative z-10"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}

function Sidebar({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
    const location = useLocation();
    const pathname = location.pathname;

    const links = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Analyze Bill', href: '/dashboard/analyze', icon: FileText },
        { name: 'Verify Meter', href: '/dashboard/meter', icon: Camera },
        { name: 'Scam Check', href: '/dashboard/scam-check', icon: ShieldAlert },
        { name: 'Draft Complaint', href: '/dashboard/complaint', icon: Send },
        { name: 'Savings Tips', href: '/dashboard/savings', icon: TrendingDown },
        { name: 'Check Appliance', href: '/dashboard/appliance', icon: Zap },
    ];

    // Helper to check active state (exact match for root, startsWith for subs)
    const isActiveLink = (href: string) => {
        if (href === '/dashboard') return pathname === '/dashboard';
        return pathname.startsWith(href);
    };

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white dark:bg-black/40 border-r border-gray-200 dark:border-white/5 p-4 flex flex-col sticky top-0 h-screen transition-colors duration-300"
        >
            {/* Logo & Theme Toggle */}
            <div className="flex items-center justify-between px-3 py-4 mb-2">
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                            <span className="text-white font-black text-sm">BG</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-red-500 transition-colors">
                            BILLGUARD
                        </span>
                    </motion.div>
                </Link>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1 mt-4">
                <p className="px-3 text-[10px] font-bold text-gray-400 dark:text-gray-600 mb-3 uppercase tracking-widest">
                    Menu
                </p>
                {links.map((link, index) => {
                    const active = isActiveLink(link.href);
                    const Icon = link.icon;
                    return (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={link.href}
                                className={cn(
                                    "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                                    active
                                        ? 'text-red-600 dark:text-white bg-red-50 dark:bg-white/10'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                                )}
                            >
                                {/* Active indicator */}
                                {active && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-r-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                <Icon size={18} className={`${active ? 'text-red-600 dark:text-red-500' : 'group-hover:text-red-500 dark:group-hover:text-red-400'} transition-colors`} />
                                <span className="font-medium">{link.name}</span>

                                {active && (
                                    <ChevronRight size={14} className="ml-auto text-red-400 dark:text-gray-500" />
                                )}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Bottom Card */}
            <div className="mt-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-red-50/50 to-red-100/50 dark:from-red-600/20 dark:to-red-900/10 border border-red-200 dark:border-red-600/20"
                >
                    <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">Pro Tip</p>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                        Upload your bill to detect hidden charges instantly.
                    </p>
                    <Link to="/dashboard/analyze">
                        <button className="mt-3 w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-bold text-white transition-colors">
                            Start Analysis
                        </button>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
}
