import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Copy, Sparkles, Upload } from 'lucide-react';

export default function ComplaintPage() {
    const [formData, setFormData] = useState({ issue_type: 'High Bill Amount', consumer_id: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [autofilling, setAutofilling] = useState(false);
    const [draft, setDraft] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAutoFill = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setAutofilling(true);

        const file = e.target.files[0];
        const form = new FormData();
        form.append('file', file);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/agents/analyze-bill`, {
                method: 'POST',
                body: form
            });
            const data = await res.json();
            const result = data.result;

            if (result) {
                setFormData(prev => ({
                    ...prev,
                    consumer_id: result.consumer_number || result.meter_number || '',
                    description: `I am writing to report an issue with my electricity bill for the period ${result.bill_period || 'recent month'}. The bill amount of ₹${result.current_charges} is unusually high compared to my average usage. My meter reading is ${result.meter_number || 'N/A'}. Please verify this.`
                }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setAutofilling(false);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/api/agents/complaint`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setDraft(data.result);
        } catch (e) { console.error(e) } finally { setLoading(false) }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 h-full flex flex-col">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <Send className="text-indigo-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Draft Complaint</h2>
                    </div>

                    {/* Auto-fill Button */}
                    <div className="relative">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={autofilling}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors text-sm font-medium"
                        >
                            {autofilling ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                            {autofilling ? "Reading Bill..." : "Auto-fill from Bill"}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*,application/pdf"
                            onChange={handleAutoFill}
                        />
                    </div>
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 flex-1">
                <div className="glass-panel p-6 rounded-2xl space-y-4 h-fit">
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">Issue Type</label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white [&>option]:text-black focus:border-indigo-500/50 outline-none"
                            value={formData.issue_type}
                            onChange={e => setFormData({ ...formData, issue_type: e.target.value })}
                        >
                            <option>High Bill Amount</option>
                            <option>Wrong Meter Reading</option>
                            <option>Meter Fault</option>
                            <option>Tariff Issue</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">Consumer ID / Service No</label>
                        <div className="relative">
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500/50 outline-none transition-all placeholder:text-gray-600"
                                value={formData.consumer_id}
                                onChange={e => setFormData({ ...formData, consumer_id: e.target.value })}
                                placeholder="e.g. 1234567890"
                            />
                            {autofilling && <div className="absolute right-3 top-3.5"><Loader2 size={16} className="text-indigo-400 animate-spin" /></div>}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-400 block mb-2">Details</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white h-32 focus:border-indigo-500/50 outline-none transition-all placeholder:text-gray-600 resize-none"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe your issue..."
                        />
                    </div>
                    <button onClick={handleGenerate} disabled={loading} className="w-full py-3 bg-indigo-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                        {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Generate Draft</>}
                    </button>
                </div>

                <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
                    <h3 className="text-white font-bold mb-4">Preview</h3>
                    {draft ? (
                        <div className="flex-1 bg-white/5 rounded-xl p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap relative group overflow-y-auto max-h-[500px]">
                            <div className="mb-4 pb-4 border-b border-white/10">
                                <span className="font-bold text-gray-400">Subject:</span> {draft.email_subject || draft.subject}
                            </div>
                            {draft.email_body || draft.body || draft.letter_body}
                            <button className="absolute top-4 right-4 p-2 bg-indigo-600 rounded opacity-0 group-hover:opacity-100 transition-opacity text-white hover:scale-105" onClick={() => navigator.clipboard.writeText(`${draft.email_subject}\n\n${draft.email_body}`)}>
                                <Copy size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-600 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                            <Sparkles size={32} className="mb-3 opacity-20" />
                            <p>Draft will appear here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
