import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, interpolate, easeOut } from '../utils/animation.js';

export function SentinelRevealScene({ currentFrame }) {
  // Scene frame range: 1050 to 1140 (35s to 38s)
  // Final scene: NO FADE OUT at the end. Final frame remains visible.
  const opacity = fade(currentFrame, 1050, 15, 'in');

  // Entrance scaling for logo and text
  const logoScale = scale(currentFrame, 1050, 45, 0.85, 1.0, easeOut);
  const textOpacity = fade(currentFrame, 1065, 20, 'in');
  const textY = interpolate(currentFrame, [1065, 1095], [20, 0], { easing: easeOut });

  // Logo glow pulse animation
  const glowScale = interpolate(currentFrame, [1060, 1140], [0.95, 1.05]);
  const glowOpacity = interpolate(currentFrame, [1050, 1080], [0, 0.5]) * (0.6 + 0.4 * Math.sin(currentFrame * 0.08));

  return (
    <div 
      className="absolute inset-0 bg-[#00030f] flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Background glowing pulse behind the logo area */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-0"
        style={{
          transform: `scale(${glowScale})`,
          opacity: glowOpacity,
        }}
      />

      {/* Programmatic visual composition matching Slide 16_9 - 2.png layout */}
      <div className="z-10 flex flex-col items-center justify-center text-center max-w-4xl px-8 select-none">
        
        {/* Logo Shield (using logo.png directly as official production asset) */}
        <div 
          className="w-48 h-48 flex items-center justify-center mb-6"
          style={{
            transform: `scale(${logoScale})`,
            transition: 'transform 0.05s linear'
          }}
        >
          <img 
            src={ASSETS.desain.logo} 
            alt="Sentinel-ID Shield Logo" 
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Brand Name & Tagline */}
        <div 
          className="flex flex-col items-center gap-3"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`
          }}
        >
          <h1 
            className="text-6xl font-black tracking-tight text-white font-sans uppercase"
            style={{ letterSpacing: '-0.02em' }}
          >
            SENTINEL<span className="text-[#00a2ff]">-ID</span>
          </h1>

          <div className="w-24 h-0.5 bg-gradient-to-r from-[#00a2ff] to-[#0052d9] rounded-full my-1" />

          <div 
            className="text-sm font-bold tracking-[0.2em] text-cyan-300 uppercase font-mono mt-1 opacity-90"
            style={{ wordSpacing: '0.1em' }}
          >
            CONTINUOUS BEHAVIORAL AUTHENTICATION
          </div>

          <div className="mt-10 text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            BY DIZIPHER TEAM
          </div>
        </div>

      </div>
    </div>
  );
}

