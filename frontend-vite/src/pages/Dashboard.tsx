import { motion } from 'framer-motion';
import { TrendingDown, AlertTriangle, CheckCircle, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
                <p className="text-gray-500 mt-1">Welcome back! Here's your energy overview.</p>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <StatCard
                    label="Total Savings Identified"
                    value="₹ 0"
                    desc="No savings found yet"
                    icon={<TrendingDown size={22} />}
                    color="emerald"
                    trend="0%"
                    delay={0}
                />
                <StatCard
                    label="Anomalies Detected"
                    value="0 Warnings"
                    desc="No issues detected yet"
                    icon={<AlertTriangle size={22} />}
                    color="amber"
                    trend="0"
                    delay={1}
                />
                <StatCard
                    label="Verified Bills"
                    value="0 Bills"
                    desc="Start your first check"
                    icon={<CheckCircle size={22} />}
                    color="blue"
                    trend="0"
                    delay={2}
                />
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[
                    { name: 'Analyze Bill', icon: <Zap size={18} />, href: '/dashboard/analyze' },
                    { name: 'Verify Meter', icon: <CheckCircle size={18} />, href: '/dashboard/meter' },
                    { name: 'Scam Check', icon: <AlertTriangle size={18} />, href: '/dashboard/scam-check' },
                    { name: 'Get Tips', icon: <TrendingDown size={18} />, href: '/dashboard/savings' },
                ].map((action, i) => (
                    <Link
                        key={i}
                        to={action.href}
                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-4 rounded-xl flex items-center gap-3 group cursor-pointer hover:border-red-600/30 hover:shadow-lg hover:shadow-red-500/10 transition-all"
                    >
                        <div className="p-2 rounded-lg bg-red-50 dark:bg-red-600/10 text-red-600 dark:text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            {action.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-white transition-colors">
                            {action.name}
                        </span>
                        <ArrowUpRight size={14} className="ml-auto text-gray-400 dark:text-gray-600 group-hover:text-red-500 transition-colors" />
                    </Link>
                ))}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm"
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Analyses</h3>
                    <span className="text-xs text-gray-500 hover:text-red-600 cursor-pointer transition-colors">
                        View All →
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 dark:border-white/5 rounded-xl bg-gray-50 dark:bg-white/[0.01]">
                        <div className="p-3 rounded-full bg-gray-100 dark:bg-white/5 mb-3 text-gray-500">
                            <Zap size={24} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No checks yet</p>
                        <p className="text-sm text-gray-400 dark:text-gray-600 mt-1 mb-4">Upload a bill to see your history here.</p>
                        <Link to="/dashboard/analyze">
                            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-red-500/20">
                                Analyze Now
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function StatCard({ label, value, desc, icon, color, trend, delay }: any) {
    const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
        emerald: {
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-400',
            border: 'border-emerald-500/20',
            glow: 'group-hover:shadow-emerald-500/20'
        },
        amber: {
            bg: 'bg-amber-500/10',
            text: 'text-amber-400',
            border: 'border-amber-500/20',
            glow: 'group-hover:shadow-amber-500/20'
        },
        blue: {
            bg: 'bg-blue-500/10',
            text: 'text-blue-400',
            border: 'border-blue-500/20',
            glow: 'group-hover:shadow-blue-500/20'
        }
    };

    const c = colorClasses[color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: delay * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className={`bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-5 rounded-2xl relative overflow-hidden group cursor-pointer hover:shadow-lg ${c.glow} transition-all`}
        >
            {/* Background Glow */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 ${c.bg} rounded-full blur-[60px] opacity-20 dark:opacity-50 group-hover:opacity-40 dark:group-hover:opacity-80 transition-opacity`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${c.bg} border ${c.border}`}>
                    <span className={c.text}>{icon}</span>
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${c.bg} ${c.text} font-medium`}>
                    {trend}
                </span>
            </div>

            <div className="relative z-10">
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{label}</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-600">{desc}</p>
            </div>
        </motion.div>
    );
}
