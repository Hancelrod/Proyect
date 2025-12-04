import React, { useState, useEffect } from 'react';
import { TimeElapsed } from '../types';
import { Clock, Heart } from 'lucide-react';

const START_DATE = new Date('2024-12-20T00:00:00');

const TimeCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 glass-panel rounded-2xl mt-12 relative overflow-hidden group hover:neon-glow transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
        
        <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-future text-pink-400 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 animate-pulse" />
                Cronología de Nuestro Amor
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <TimeUnit value={elapsed.days} label="Días" />
                <TimeUnit value={elapsed.hours} label="Horas" />
                <TimeUnit value={elapsed.minutes} label="Minutos" />
                <TimeUnit value={elapsed.seconds} label="Segundos" />
            </div>

            <div className="mt-8 text-gray-400 text-sm font-future tracking-widest uppercase">
                Iniciando secuencia: 20 de Diciembre, 2024
            </div>
            <Heart className="w-6 h-6 text-red-500 fill-red-500 mt-4 animate-bounce" />
        </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="bg-black/30 p-4 rounded-lg border border-pink-500/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
        <div className="text-4xl md:text-6xl font-future font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-500">
            {value.toString().padStart(2, '0')}
        </div>
        <div className="text-pink-300 font-light mt-2 tracking-widest text-xs md:text-sm uppercase">{label}</div>
    </div>
);

export default TimeCounter;