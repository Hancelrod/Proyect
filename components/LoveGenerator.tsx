import React, { useState } from 'react';
import { generateLoveMessage } from '../services/geminiService';
import { Sparkles, Cpu, Send } from 'lucide-react';

const LoveGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    const result = await generateLoveMessage(topic);
    setMessage(result);
    setLoading(false);
  };

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto mt-16 border border-purple-500/30">
      <h3 className="text-2xl font-future text-center text-purple-300 mb-2 flex justify-center items-center gap-2">
        <Cpu className="w-6 h-6" />
        Oráculo de Amor IA
      </h3>
      <p className="text-gray-400 text-center mb-6 text-sm">
        Introduce una palabra (ej: destino, risas, futuro) y la IA generará una dedicatoria cuántica única para nosotros.
      </p>

      <div className="flex gap-2 mb-6">
        <input 
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Escribe un sentimiento..."
          className="flex-1 bg-black/50 border border-purple-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-future text-sm"
          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg hover:shadow-purple-500/50 flex items-center justify-center"
        >
          {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <Send className="w-5 h-5" />}
        </button>
      </div>

      {message && (
        <div className="relative p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl border border-white/10 animate-[fadeIn_0.5s_ease-in]">
          <Sparkles className="absolute -top-3 -right-3 text-yellow-400 w-6 h-6 animate-spin-slow" />
          <p className="font-love text-2xl md:text-3xl text-center leading-relaxed text-pink-200">
            "{message}"
          </p>
        </div>
      )}
    </div>
  );
};

export default LoveGenerator;
