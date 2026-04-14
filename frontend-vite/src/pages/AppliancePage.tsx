import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Zap, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export default function AppliancePage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/agents/appliance`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            let parsed = data.result;
            if (typeof parsed === 'string') {
                try { parsed = JSON.parse(parsed); } catch { }
            }
            setResult(parsed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <Zap className="text-amber-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Appliance Efficiency Check</h2>
                </div>
                <p className="text-gray-400">Upload a photo of your appliance's energy label (star sticker) to analyze its efficiency.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-2xl space-y-6 h-fit">
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center hover:border-amber-500/50 transition-colors cursor-pointer relative group overflow-hidden">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-48 object-contain rounded-lg" />
                        ) : (
                            <>
                                <UploadCloud className="text-amber-400 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                                <p className="text-gray-300 font-medium text-center">Click to upload Star Rating Label</p>
                                <p className="text-xs text-gray-500 mt-1">{file ? file.name : "Supports JPG, PNG"}</p>
                            </>
                        )}
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!file || loading}
                        className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Analyze Efficiency'}
                    </button>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        {!result && !loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-64 flex flex-col items-center justify-center text-gray-500 border border-white/5 rounded-2xl bg-white/[0.02]">
                                <Zap size={48} className="mb-4 opacity-20" />
                                <p>Analysis results will appear here</p>
                            </motion.div>
                        )}

                        {loading && (
                            <div className="h-64 flex items-center justify-center">
                                <Loader2 className="animate-spin text-amber-500 w-10 h-10" />
                            </div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-panel p-6 rounded-2xl space-y-5"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{result.appliance || "Unknown Appliance"}</h3>
                                        <p className="text-amber-400 font-medium">{result.stars || "?"} Star Rating</p>
                                    </div>
                                    <div className={`p-2 rounded-lg ${result.is_inefficient ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                        {result.is_inefficient ? <AlertTriangle /> : <CheckCircle />}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white/5 rounded-lg">
                                        <p className="text-xs text-gray-500">Power Usage</p>
                                        <p className="text-white font-mono">{result.wattage || "N/A"}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg">
                                        <p className="text-xs text-gray-500">Cost / Hour</p>
                                        <p className="text-white font-mono">{result.cost_per_hour || "N/A"}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg">
                                        <p className="text-xs text-gray-500">Monthly Cost (Approx)</p>
                                        <p className="text-white font-mono">{result.monthly_cost || "N/A"}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-lg">
                                        <p className="text-xs text-gray-500">Year</p>
                                        <p className="text-white font-mono">{result.year || "N/A"}</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-xl border-l-4 border-amber-500">
                                    <h4 className="text-sm font-bold text-gray-300 mb-1">Recommendation</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">{result.upgrade_recommendation}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
