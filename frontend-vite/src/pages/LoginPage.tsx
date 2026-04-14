import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { INDIAN_STATES } from '../lib/StateData';
import { motion } from 'framer-motion';
import { Mail, Lock, User, MapPin, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for classes
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.state?.mode !== 'signup');
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        state: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    // Validation Logic
    const validate = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Email Validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password Validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else {
            if (formData.password.length < 8) newErrors.password = "Must be at least 8 characters";
        }

        // State Validation
        if (!isLogin && !formData.state) {
            newErrors.state = "Please select your state";
        }

        // Name Validation
        if (!isLogin && !formData.name) {
            newErrors.name = "Name is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            // Save to LocalStorage (Mock Backend)
            localStorage.setItem('userSession', JSON.stringify({
                name: isLogin ? 'User' : formData.name,
                email: formData.email,
                state: formData.state || 'Delhi'
            }));

            // For signup, we explicitly save the state preference
            if (!isLogin && formData.state) {
                localStorage.setItem('selectedState', formData.state);
            }

            navigate('/dashboard');
        }, 1500);
    };

    const handleSocialLogin = (provider: string) => {
        alert(`${provider} Login Simulated! Redirecting...`);
        localStorage.setItem('userSession', JSON.stringify({ name: 'Demo User', email: 'demo@example.com', state: 'Delhi' }));
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-[100px]" />

            {/* Back to Home Link */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 left-8 z-10"
            >
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-900 font-medium hover:text-red-600 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to Dashboard
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="p-8 text-center border-b border-gray-100">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
                        <ShieldCheck className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-gray-500">
                        {isLogin ? "Enter your credentials to access your dashboard" : "Join us to optimize your electricity bills"}
                    </p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name (Signup Only) */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className={cn("w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all", errors.name && "border-red-500")}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className={cn("w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all", errors.email && "border-red-500")}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                        </div>

                        {/* State Selection (Signup Only) */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 ml-1">State / Region</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                                    <select
                                        className={cn("w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all", errors.state && "border-red-500")}
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    >
                                        <option value="">Select your State</option>
                                        {INDIAN_STATES.map(s => (
                                            <option key={s.name} value={s.name}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.state && <p className="text-xs text-red-500 ml-1">{errors.state}</p>}
                            </div>
                        )}

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={cn("w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all", errors.password && "border-red-500")}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password}</p>}
                        </div>

                        <p className="text-xs text-gray-500 italic">
                            {!isLogin && "Password must be 8+ chars, incl. uppercase, number, & symbol."}
                        </p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleSocialLogin('Google')} className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-colors">
                            Google
                        </button>
                        <button onClick={() => handleSocialLogin('Mobile')} className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium transition-colors">
                            Mobile Number
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm">
                        <p className="text-gray-500">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                                className="ml-1 text-red-600 hover:text-red-700 font-semibold"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
