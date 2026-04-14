import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle, AlertOctagon, Loader2, Sparkles, UploadCloud } from 'lucide-react';

export default function MeterPage() {
    const [file, setFile] = useState<File | null>(null);
    const [reading, setReading] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleVerify = async () => {
        if (!file || !reading) return;
        setLoading(true);
        setData(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('claimed_reading', reading);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/agents/verify-meter`, {
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
            alert('Error verifying meter');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                        <Camera className="text-pink-400" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Verify Meter Reading</h2>
                </div>
                <p className="text-gray-400 mt-2 max-w-lg">
                    Upload a photo of your electric meter to verify if the reading matches your bill.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                    className="glass-panel p-8 rounded-2xl flex flex-col space-y-6"
                >
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center hover:border-pink-500/50 transition-colors cursor-pointer relative group">
                        <UploadCloud className="text-pink-400 w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-gray-300 font-medium">Click to upload photo</p>
                        <p className="text-xs text-gray-500 mt-1">{file ? file.name : "Supports JPG, PNG"}</p>
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>

                    {/* Reading Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Bill Reading (kWh)</label>
                        <input
                            type="number"
                            value={reading}
                            onChange={(e) => setReading(e.target.value)}
                            placeholder="e.g 1450"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                        />
                    </div>

                    <button
                        onClick={handleVerify}
                        disabled={loading || !file || !reading}
                        className="w-full py-3.5 bg-pink-600 hover:bg-pink-500 rounded-xl font-semibold text-white flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={18} /> Verify Reading</>}
                    </button>
                </motion.div>

                {/* Results Section */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
                    <AnimatePresence mode="wait">
                        {!data && !loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[300px] flex items-center justify-center text-gray-600 border border-white/5 rounded-2xl bg-white/[0.02]">
                                <div className="text-center">
                                    <Camera size={48} className="text-gray-700 mx-auto mb-4" />
                                    <p>Verification results will appear here</p>
                                </div>
                            </motion.div>
                        )}
                        {/* ... (Loading State omitted for brevity, similar to AnalyzePage) ... */}
                        {loading && (
                            <div className="h-full min-h-[300px] flex items-center justify-center"><Loader2 className="text-pink-500 animate-spin w-10 h-10" /></div>
                        )}

                        {data && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-6 rounded-2xl space-y-5">
                                <h3 className="font-bold text-lg text-white border-b border-white/10 pb-4">Verification Result</h3>

                                <div className={`p-4 rounded-xl border ${data.match ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                    <div className="flex items-start gap-3">
                                        {data.match ? <CheckCircle className="text-emerald-400 mt-1" /> : <AlertOctagon className="text-red-400 mt-1" />}
                                        <div>
                                            <p className={`font-bold text-lg ${data.match ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {data.match ? "Readings Match" : "Discrepancy Detected"}
                                            </p>
                                            <p className="text-sm text-gray-300 mt-1">{data.reasoning || data.explanation}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <ResultBox label="Detected Reading" value={data.detected_reading} />
                                    <ResultBox label="Claimed Reading" value={data.claimed_reading} />
                                    <ResultBox label="Confidence" value={data.confidence ? `${data.confidence}%` : "N/A"} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

function ResultBox({ label, value }: any) {
    return (
        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    );
}
