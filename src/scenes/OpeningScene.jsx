import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale } from '../utils/animation.js';

export function OpeningScene({ currentFrame, scene }) {
  // Scene frame range: 0 to 60
  const opacity = fade(currentFrame, 0, 20, 'in');
  const imgScale = scale(currentFrame, 0, 60, 1.04, 1.0);
  const fadeOut = fade(currentFrame, 45, 15, 'out');

  const combinedOpacity = opacity * fadeOut;

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{
          opacity: combinedOpacity,
          transform: `scale(${imgScale})`,
          transition: 'transform 0.05s linear'
        }}
      >
        <img 
          src={ASSETS.desain.opening} 
          alt="Sentinel-ID Opening" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
