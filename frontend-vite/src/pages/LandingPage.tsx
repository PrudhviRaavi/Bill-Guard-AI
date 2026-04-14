import { motion } from "framer-motion";
import {
    Zap,
    Shield,
    Clock,
    CheckCircle2,
    ArrowRight,
    Upload,
    FileText,
    TrendingDown,
    Users,
    Building2,
    Home,
    FileCheck,
    Search,
    Star,
    Mail,
    Phone,
    MapPin,
    Send
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden selection:bg-red-100 selection:text-red-900 font-sans">

            {/* ===== HEADER ===== */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                            <Zap className="w-6 h-6 text-white" fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            BillGuard
                        </span>
                    </Link>

                    {/* Centered Nav */}
                    <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} className="hover:text-red-600 transition-colors">Home</a>
                        <a href="#features" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                        }} className="hover:text-red-600 transition-colors">Features</a>
                        <a href="#how-it-works" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                        }} className="hover:text-red-600 transition-colors">How it Works</a>
                        <a href="#benefits" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                        }} className="hover:text-red-600 transition-colors">Benefits</a>
                        <a href="#contact" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }} className="hover:text-red-600 transition-colors">Contact Us</a>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden md:block font-medium text-gray-600 hover:text-red-600 transition-colors">
                            Log In
                        </Link>
                        <Link to="/login" state={{ mode: 'signup' }}>
                            <button className="px-6 py-2.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* ===== HERO SECTION ===== */}
            <section className="relative pt-48 pb-32 overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-gray-900 tracking-tight"
                    >
                        Stop Overpaying on Your
                        <br />
                        <span className="text-red-600">Electricity Bills</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto"
                    >
                        Upload your bill, get instant AI analysis for errors and overcharges, and generate complaint drafts automatically. Trusted by thousands of Indian households.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/login" state={{ mode: 'signup' }}>
                            <button className="px-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg shadow-xl shadow-red-500/30 hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2">
                                Start Analyzing Bills — Free
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <a href="#how-it-works" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            <button className="px-8 py-4 rounded-full bg-white text-gray-700 font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-all hover:scale-105 flex items-center gap-2 shadow-sm">
                                <FileCheck className="w-5 h-5" />
                                See How It Works
                            </button>
                        </a>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500"
                    >
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700">
                            <CheckCircle2 className="w-4 h-4" />
                            Free Forever
                        </div>
                        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full text-purple-700">
                            <Shield className="w-4 h-4" />
                            Secure & Private
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700">
                            <Zap className="w-4 h-4" />
                            All Indian States
                        </div>
                    </motion.div>
                </div>

                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-50/50 rounded-full blur-[120px]" />
                    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-orange-50/50 rounded-full blur-[100px]" />
                </div>
            </section>

            {/* ===== SCORES / STATS ===== */}
            <section className="py-12 border-y border-gray-100 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200/50">
                        <StatItem
                            label="Happy Users"
                            value="10,000+"
                            icon={<Users className="w-6 h-6 text-purple-500" />}
                            bg="bg-purple-100"
                        />
                        <StatItem
                            label="Bills Analyzed"
                            value="50,000+"
                            icon={<FileText className="w-6 h-6 text-blue-500" />}
                            bg="bg-blue-100"
                        />
                        <StatItem
                            label="Savings Detected"
                            value="₹2Cr+"
                            icon={<TrendingDown className="w-6 h-6 text-green-500" />}
                            bg="bg-green-100"
                        />
                        <StatItem
                            label="Accuracy Rate"
                            value="98%"
                            icon={<CheckCircle2 className="w-6 h-6 text-orange-500" />}
                            bg="bg-orange-100"
                        />
                    </div>
                </div>
            </section>

            {/* ===== FEATURES GRID ===== */}
            <section id="features" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            Powerful Features to Protect Your Money
                        </h2>
                        <p className="text-gray-500 text-xl max-w-2xl mx-auto">
                            BillGuard uses advanced AI technology to detect billing errors that even experts might miss.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Zap}
                            title="AI-Powered OCR"
                            desc="Automatically extract all bill details with 98%+ accuracy using advanced computer vision."
                            color="purple"
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Tariff Verification"
                            desc="Cross-check your charges against official government tariff rates for all Indian states."
                            color="green"
                        />
                        <FeatureCard
                            icon={FileCheck}
                            title="Meter Photo Matching"
                            desc="Upload your meter photo and verify if billed units match your actual consumption."
                            color="blue"
                        />
                        <FeatureCard
                            icon={TrendingDown}
                            title="Smart Error Detection"
                            desc="AI identifies suspicious charges, calculation errors, and potential fraud patterns."
                            color="red"
                        />
                        <FeatureCard
                            icon={FileText}
                            title="Auto Complaint Generator"
                            desc="Generate professional complaint drafts with evidence, ready to send to your utility provider."
                            color="sky"
                        />
                        <FeatureCard
                            icon={Clock}
                            title="Instant Results"
                            desc="Get comprehensive analysis in under 30 seconds with detailed reasoning for each finding."
                            color="orange"
                        />
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section id="how-it-works" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            How BillGuard Works
                        </h2>
                        <p className="text-gray-500 text-xl">
                            Simple, fast, and accurate — Get results in 4 easy steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-1.5 bg-red-500 -z-10 opacity-80" />

                        <StepCard
                            step="01"
                            title="Upload Your Bill"
                            desc="Drag and drop your electricity bill (PDF/Image). Optionally add meter photo."
                            icon={Upload}
                            color="purple"
                        />
                        <StepCard
                            step="02"
                            title="AI Extracts Data"
                            desc="Our AI reads bill details: consumer number, units, charges, tariff slab."
                            icon={Search}
                            color="green"
                        />
                        <StepCard
                            step="03"
                            title="Smart Analysis"
                            desc="Compare against government tariffs, check calculations, verify readings."
                            icon={Shield}
                            color="blue"
                        />
                        <StepCard
                            step="04"
                            title="Get Results"
                            desc="View detailed findings. Generate complaint draft if errors found."
                            icon={FileCheck}
                            color="orange"
                        />
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/login" state={{ mode: 'signup' }}>
                            <button className="px-8 py-4 rounded-full bg-red-600 text-white font-bold text-lg shadow-xl shadow-red-500/30 hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-2 mx-auto">
                                Try It Now — Free Forever
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== WHO BENEFITS ===== */}
            <section id="benefits" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            Who Benefits from BillGuard?
                        </h2>
                        <p className="text-gray-500 text-xl">
                            Protecting households and businesses across India
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <BenefitCard
                            title="Homeowners"
                            icon={Home}
                            list={[
                                "Catch billing errors",
                                "Verify meter readings",
                                "Save on monthly bills",
                                "Quick complaint drafts"
                            ]}
                        />
                        <BenefitCard
                            title="Small Businesses"
                            icon={Building2}
                            list={[
                                "Monitor multiple meters",
                                "Detect overcharges early",
                                "Reduce operating costs",
                                "Automated tracking"
                            ]}
                        />
                        <BenefitCard
                            title="Property Managers"
                            icon={Users}
                            list={[
                                "Manage tenant bills",
                                "Bulk bill verification",
                                "Dispute resolution",
                                "Financial transparency"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-gray-900">
                            What Our Users Say
                        </h2>
                        <p className="text-gray-500 text-xl">
                            Real stories from people who saved money
                        </p>
                    </div>

                    <div className="overflow-hidden mask-fade-sides relative">
                        <motion.div
                            className="flex gap-8 w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                        >
                            {/* Duplicate items for seamless loop */}
                            <TestimonialCard
                                quote="Found a ₹2,400 overcharge in my bill! The AI detected a tariff mismatch that I would have never noticed. Got my refund within 2 weeks."
                                author="Mumbai, Maharashtra"
                                stars={5}
                            />
                            <TestimonialCard
                                quote="Super easy to use. Just uploaded my bill and got instant results. The complaint draft was professional and helped me get a correction immediately."
                                author="Bangalore, Karnataka"
                                stars={5}
                            />
                            <TestimonialCard
                                quote="As a small business owner, this saves me hours every month. I check all my bills now and have caught multiple errors. Highly recommended!"
                                author="Ahmedabad, Gujarat"
                                stars={5}
                            />
                            <TestimonialCard
                                quote="Found a ₹2,400 overcharge in my bill! The AI detected a tariff mismatch that I would have never noticed. Got my refund within 2 weeks."
                                author="Mumbai, Maharashtra"
                                stars={5}
                            />
                            <TestimonialCard
                                quote="Super easy to use. Just uploaded my bill and got instant results. The complaint draft was professional and helped me get a correction immediately."
                                author="Bangalore, Karnataka"
                                stars={5}
                            />
                            <TestimonialCard
                                quote="As a small business owner, this saves me hours every month. I check all my bills now and have caught multiple errors. Highly recommended!"
                                author="Ahmedabad, Gujarat"
                                stars={5}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT SECTION ===== */}
            <section id="contact" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-4xl font-bold mb-6 text-gray-900">
                                Get in Touch
                            </h2>
                            <p className="text-gray-500 text-xl mb-12">
                                Have questions? We're here to help you save money on your electricity bills.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Email Us</h4>
                                        <p className="text-gray-600 text-lg">support@billcheck.ai</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Call Us</h4>
                                        <p className="text-gray-600 text-lg">+91 1800-VOLTCHECK</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Visit Us</h4>
                                        <p className="text-gray-600 text-lg">Bangalore, Karnataka, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                    />
                                </div>
                                <button className="w-full py-4 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-all hover:scale-[1.02] shadow-lg shadow-red-500/20 flex items-center justify-center gap-2">
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="py-32 bg-gray-900 relative overflow-hidden text-center">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Ready to Stop Overpaying?
                    </h2>
                    <p className="text-gray-400 text-xl mb-10">
                        Join thousands of users who are already saving money with BillCheckAI
                    </p>
                    <Link to="/login" state={{ mode: 'signup' }}>
                        <button className="px-10 py-5 rounded-full bg-white text-gray-900 font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-2 mx-auto">
                            Start Checking Your Bills — Free
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </Link>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-white border-t border-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">BillGuard</span>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed mb-6">
                            Empowering millions of Indians to understand and optimize their electricity consumption with AI.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Product</h4>
                        <ul className="space-y-4 text-base text-gray-600">
                            <li><a href="#" className="hover:text-red-600 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">How it Works</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">For Businesses</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Company</h4>
                        <ul className="space-y-4 text-base text-gray-600">
                            <li><a href="#" className="hover:text-red-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Legal</h4>
                        <ul className="space-y-4 text-base text-gray-600">
                            <li><a href="#" className="hover:text-red-600 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-red-600 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-base text-gray-400">
                    <p>© 2026 BillGuard Inc. All rights reserved.</p>
                    <p>Developed by <span className="text-red-600 font-bold">Prudhvi Raavi</span></p>
                </div>
            </footer>

        </main>
    );
}

// ===== SUB COMPONENTS =====

function StatItem({ label, value, icon, bg }: any) {
    return (
        <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{value}</p>
            <p className="text-lg font-medium text-gray-500">{label}</p>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc, color }: any) {
    const colorMap: Record<string, string> = {
        purple: "bg-purple-100 text-purple-600",
        green: "bg-green-100 text-green-600",
        blue: "bg-blue-100 text-blue-600",
        red: "bg-red-100 text-red-600",
        sky: "bg-sky-100 text-sky-600",
        orange: "bg-orange-100 text-orange-600",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300"
        >
            <div className={`w-14 h-14 rounded-2xl ${colorMap[color] || colorMap.blue} flex items-center justify-center mb-6`}>
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-500 text-lg leading-relaxed">{desc}</p>
        </motion.div>
    );
}

function StepCard({ step, title, desc, icon: Icon, color }: any) {
    const colorMap: Record<string, string> = {
        purple: "bg-purple-600 shadow-purple-200",
        green: "bg-green-600 shadow-green-200",
        blue: "bg-blue-600 shadow-blue-200",
        orange: "bg-orange-600 shadow-orange-200",
    };

    const hoverMap: Record<string, string> = {
        purple: "group-hover:border-purple-500 group-hover:shadow-purple-100",
        green: "group-hover:border-green-500 group-hover:shadow-green-100",
        blue: "group-hover:border-blue-500 group-hover:shadow-blue-100",
        orange: "group-hover:border-orange-500 group-hover:shadow-orange-100",
    }

    return (
        <div className={`relative flex flex-col items-center text-center group p-8 rounded-3xl bg-white border border-gray-200 shadow-md ${hoverMap[color]} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full`}>
            <div className={`w-20 h-20 rounded-3xl ${colorMap[color]} text-white flex items-center justify-center mb-6 shadow-xl relative z-10 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
            </div>
            <div className="mb-3 text-sm font-bold tracking-widest text-gray-400 uppercase group-hover:text-red-500 transition-colors">Step {step}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-lg text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function BenefitCard({ title, list, icon: Icon }: any) {
    return (
        <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
                {/* Icon */}
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                    <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            </div>
            <ul className="space-y-4">
                {list.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 text-lg">
                        <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TestimonialCard({ quote, author, stars }: any) {
    return (
        <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                ))}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed italic mb-6">"{quote}"</p>
            <p className="text-gray-500 font-medium text-sm">{author}</p>
        </div>
    );
}
