import React from 'react';
import { fade, scale } from '../utils/animation.js';

export function OpeningScene({ currentFrame }) {
  // Scene frame range: 0 to 60
  const opacity = fade(currentFrame, 0, 20, 'in');
  const textScale = scale(currentFrame, 0, 60, 0.95, 1.0);
  const fadeOut = fade(currentFrame, 45, 15, 'out');

  const combinedOpacity = opacity * fadeOut;

  return (
    <div className="absolute inset-0 bg-[#00030f] flex items-center justify-center overflow-hidden">
      <div 
        className="flex items-center justify-center"
        style={{
          opacity: combinedOpacity,
          transform: `scale(${textScale})`,
          transition: 'transform 0.05s linear'
        }}
      >
        <span 
          className="text-4xl text-white font-normal tracking-[0.2em] uppercase opacity-80"
          style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
        >
          opening
        </span>
      </div>
    </div>
  );
}

