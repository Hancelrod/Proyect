import React, { useEffect, useState } from 'react';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // Generate static array for hearts to prevent re-renders causing weirdness
    const count = 20;
    const newHearts = Array.from({ length: count }, (_, i) => i);
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 10 + Math.random() * 10;
        const size = 10 + Math.random() * 30;
        
        return (
          <div
            key={i}
            className="floating-heart text-pink-500 opacity-20"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              fontSize: `${size}px`
            }}
          >
            ❤
          </div>
        );
      })}
    </div>
  );
};

export default HeartBackground;
