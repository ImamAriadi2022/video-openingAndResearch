import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, interpolate, easeOut } from '../utils/animation.js';

export function SentinelRevealScene({ currentFrame }) {
  // Scene frame range: 1050 to 1140 (35s to 38s)
  // Final scene: NO FADE OUT at the end. Final frame remains visible.
  const opacity = fade(currentFrame, 1050, 15, 'in');

  // Entrance scaling
  const imgScale = scale(currentFrame, 1050, 45, 1.05, 1.0, easeOut);

  // Logo glow pulse animation
  const glowScale = interpolate(currentFrame, [1060, 1140], [0.95, 1.05]);
  const glowOpacity = interpolate(currentFrame, [1050, 1080], [0, 0.45]) * (0.6 + 0.4 * Math.sin(currentFrame * 0.08));

  return (
    <div 
      className="absolute inset-0 bg-[#00030f] flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Background glowing pulse behind the logo area */}
      <div 
        className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none z-0"
        style={{
          transform: `scale(${glowScale})`,
          opacity: glowOpacity,
        }}
      />

      {/* Slide 16_9 - 2.png base design layout */}
      <div 
        className="w-full h-full flex items-center justify-center z-10"
        style={{
          transform: `scale(${imgScale})`,
        }}
      >
        <img 
          src={ASSETS.desain.slide2} 
          alt="Sentinel-ID continuous behavioral authentication" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
