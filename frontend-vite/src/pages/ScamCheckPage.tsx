import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ScamCheckPage() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleCheck = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/agents/scam-detector`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text_content: text })
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
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <ShieldAlert className="text-red-400" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Scam Detector</h2>
                </div>
                <p className="text-gray-400 max-w-lg">Paste a suspicious SMS or link below. Our AI will analyze it for fraud patterns.</p>
            </motion.div>

            <motion.div className="glass-panel p-6 rounded-2xl space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste the message here (e.g. 'Dear user, your power will be cut tonight at 9PM...')"
                    className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                />
                <button
                    onClick={handleCheck}
                    disabled={loading || !text}
                    className="btn-primary w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <><Lock size={18} /> Analyze Security</>}
                </button>
            </motion.div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`glass-panel p-6 rounded-2xl border ${result.is_scam ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-full ${result.is_scam ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                {result.is_scam ? <AlertTriangle size={32} /> : <CheckCircle size={32} />}
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${result.is_scam ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {result.is_scam ? "SCAM DETECTED" : "LIKELY SAFE"}
                                </h3>
                                <p className="text-gray-400 text-sm">Reason: {result.reason}</p>
                            </div>
                        </div>

                        {result.safety_tips && (
                            <div className="bg-white/5 rounded-xl p-4">
                                <p className="text-sm font-bold text-gray-300 mb-2">Safety Tips:</p>
                                <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                    {result.safety_tips.map((tip: string, i: number) => <li key={i}>{tip}</li>)}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
