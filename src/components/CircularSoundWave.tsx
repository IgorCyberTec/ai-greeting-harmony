import React from 'react';

interface CircularSoundWaveProps {
  isActive: boolean;
}

const CircularSoundWave: React.FC<CircularSoundWaveProps> = ({ isActive }) => {
  const bars = 40; // Number of bars in the circle
  const radius = 80; // Radius of the circle in pixels

  return (
    <div className="relative w-48 h-48 mx-auto">
      {[...Array(bars)].map((_, i) => {
        const angle = (i * 360) / bars;
        const rotation = `rotate(${angle}deg)`;
        
        return (
          <div
            key={i}
            className={`absolute left-1/2 top-1/2 origin-bottom
              ${isActive ? 'animate-sound-wave' : 'h-1'}
              w-1 bg-blue-500 rounded-full transition-all duration-[50ms]`}
            style={{
              height: '40px',
              transform: `${rotation} translateX(-50%)`,
              opacity: isActive ? 0.3 + (i % 3) * 0.2 : 0.3,
              animationDelay: `${i * (100 / bars)}ms`,
            }}
          />
        );
      })}
    </div>
  );
};

export default CircularSoundWave;