import React, { useEffect, useRef } from 'react';

interface SoundWaveProps {
  isActive: boolean;
}

const SoundWave: React.FC<SoundWaveProps> = ({ isActive }) => {
  const bars = 30; // Number of bars in the visualization

  return (
    <div className="flex items-center justify-center gap-[2px] h-24">
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-blue-500 rounded-full transition-all duration-[50ms] transform origin-bottom
            ${isActive ? 'animate-sound-wave' : 'h-1'}
          `}
          style={{
            animationDelay: `${i * (100 / bars)}ms`,
            opacity: isActive ? 0.3 + (i % 3) * 0.2 : 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default SoundWave;