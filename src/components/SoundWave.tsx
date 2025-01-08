import React from 'react';

interface SoundWaveProps {
  isActive: boolean;
}

const SoundWave: React.FC<SoundWaveProps> = ({ isActive }) => {
  const bars = 50; // Increased number of bars to fill the screen width

  return (
    <div className="flex items-center justify-center gap-[2px] h-24 w-screen">
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className={`w-2 bg-blue-500 rounded-full transition-all duration-[50ms] transform origin-bottom
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