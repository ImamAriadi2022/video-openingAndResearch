import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, slide, interpolate, easeOut } from '../utils/animation.js';

export function DailyBankingScene({ currentFrame }) {
  // Scene range: 60 to 150
  const opacity = fade(currentFrame, 60, 15, 'in');
  const fadeOut = fade(currentFrame, 135, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Hand & phone entrance: slide up from bottom
  const handY = interpolate(currentFrame, [60, 95], [600, 0], { easing: easeOut });
  const handScale = interpolate(currentFrame, [95, 150], [1.0, 1.05], { easing: easeOut });

  // Text details fade in
  const textOpacity = fade(currentFrame, 80, 20, 'in');
  const textX = slide(currentFrame, 80, 25, 40, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Visual Composition: matching Slide 16_9 - 4.png layout */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32">
        
        {/* Left: Hand holding phone illustration from Slide 16_9 - 4.png */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `translateY(${handY}px) scale(${handScale})`,
            transformOrigin: 'bottom center'
          }}
        >
          <img 
            src={ASSETS.desain.slide4} 
            alt="Hand holding phone" 
            className="max-h-[90%] object-contain"
          />
        </div>

        {/* Right: Premium, clean Typography matching the video design language */}
        <div 
          className="w-[600px] flex flex-col justify-center gap-6"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`
          }}
        >
          <span className="text-cyan-600 font-bold tracking-widest text-lg uppercase">
            Aktivitas Sehari-hari
          </span>
          <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Mobile banking telah menjadi bagian dari kehidupan kita.
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Kemudahan transaksi digital kini selalu berada dalam genggaman tangan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}

