import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertOctagon, Loader2, Sparkles } from 'lucide-react';

export default function AnalyzeBillPage() {
    const [file, setFile] = useState<File | null>(null); // Fixed type
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setLoading(true);
        setData(null);

        const formData = new FormData();
        formData.append('file', file);

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        try {
            const res = await fetch(`${apiUrl}/api/agents/analyze-bill`, {
                method: 'POST',
                body: formData,
            });
            const result = await res.json();

            let parsedData = result.result;
            if (typeof parsedData === 'string') {
                try { parsedData = JSON.parse(parsedData); } catch (e) { }
            }
            setData(parsedData);
        } catch (err) {
            console.error(err);
            alert('Error analyzing bill');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <FileText className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Upload & Analyze Bill
                    </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-lg">
                    Upload a photo or PDF of your electricity bill. Our AI will extract data and check for errors.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-red-500/50 transition-all group cursor-pointer relative overflow-hidden bg-white dark:bg-white/[0.02]"
                >
                    {/* Animated border glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10" />
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/20 dark:to-blue-600/10 rounded-2xl flex items-center justify-center mb-5 border border-blue-200 dark:border-blue-500/20"
                    >
                        <UploadCloud className="text-blue-600 dark:text-blue-400 w-9 h-9" />
                    </motion.div>

                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                        Click to Upload Bill
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs mb-6">
                        Supports JPG, PNG, PDF. Ensure text is clear and readable.
                    </p>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="bill-upload"
                        accept="image/*"
                    />
                    <label
                        htmlFor="bill-upload"
                        className="btn-primary px-6 py-2.5 rounded-lg cursor-pointer font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
                    >
                        {file ? file.name : "Select File"}
                    </label>

                    <AnimatePresence>
                        {file && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="mt-6 w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-semibold text-white flex justify-center items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <Sparkles size={18} />
                                        Run AI Analysis
                                    </>
                                )}
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Enriched Results Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-5"
                >
                    <AnimatePresence mode="wait">
                        {!data && !loading && (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-600 border border-gray-200 dark:border-white/5 rounded-2xl bg-gray-50 dark:bg-white/[0.02]"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <FileText size={24} className="text-gray-400 dark:text-gray-600" />
                                    </div>
                                    <p>Analysis & Insights will appear here</p>
                                </div>
                            </motion.div>
                        )}

                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full min-h-[300px] flex flex-col items-center justify-center space-y-5 bg-white dark:glass-panel rounded-2xl shadow-sm border border-gray-100 dark:border-white/5"
                            >
                                <div className="relative">
                                    <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-900 dark:text-white font-medium animate-pulse">Analyzing Bill...</p>
                                    <p className="text-gray-500 text-sm mt-1">Searching for Payment Links & News...</p>
                                </div>
                            </motion.div>
                        )}

                        {data && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white dark:bg-white/5 p-6 rounded-2xl space-y-6 shadow-sm border border-gray-100 dark:border-white/5"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/10">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Analysis Report</h3>
                                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                                        LIVE VERIFIED
                                    </span>
                                </div>

                                {/* Summary Box */}
                                {data.summary && (
                                    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 p-4 rounded-xl">
                                        <p className="text-sm text-blue-900 dark:text-blue-100/90 leading-relaxed font-medium">
                                            {data.summary}
                                        </p>
                                    </div>
                                )}

                                {/* Main Data Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <ResultItem label="Total Units" value={`${data.total_units_consumed || 0} kWh`} />
                                    <ResultItem label="Bill Amount" value={`₹ ${data.current_charges || 0}`} highlight />
                                    <ResultItem label="Due Date" value={data.due_date || "N/A"} />
                                    <ResultItem label="Meter No" value={data.meter_number || "N/A"} />
                                </div>

                                {/* Payment CTA */}
                                {data.payment_link && data.payment_link !== "#" && (
                                    <a
                                        href={data.payment_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block w-full"
                                    >
                                        <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                                            <CheckCircle size={18} />
                                            {data.payment_link_label || "Pay Bill Online"}
                                        </button>
                                    </a>
                                )}

                                {/* Market Intel (News & Tariff) */}
                                <div className="space-y-3 pt-2">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Market Intelligence</h4>

                                    {data.tariff_info && (
                                        <div className="text-xs text-gray-600 dark:text-gray-400 p-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
                                            <span className="font-bold text-gray-900 dark:text-gray-200">Tariff Rate:</span> {data.tariff_info}
                                        </div>
                                    )}

                                    {data.news_update && (
                                        <div className="text-xs text-gray-600 dark:text-gray-400 p-3 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
                                            <span className="font-bold text-gray-900 dark:text-gray-200">Latest News:</span> {data.news_update}
                                        </div>
                                    )}
                                </div>

                                {/* Issues / Anomalies */}
                                {data.anomalies_found && data.anomalies_found.length > 0 && (
                                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400 font-semibold">
                                            <AlertOctagon size={18} />
                                            <span>Issues Detected</span>
                                        </div>
                                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                            {data.anomalies_found.map((issue: string, i: number) => (
                                                <li key={i}>{issue}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

function ResultItem({ label, value, highlight }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            // INCREASED BRIGHTNESS HERE: bg-gray-50 for light, bg-white/[0.08] for dark
            className={`p-3 rounded-lg transition-colors ${highlight
                ? 'bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/15'
                : 'bg-gray-50 dark:bg-white/[0.08] hover:bg-gray-100 dark:hover:bg-white/[0.12] border border-gray-200 dark:border-white/5'
                }`}
        >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <p className={`text-base font-semibold ${highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                {value}
            </p>
        </motion.div>
    );
}
