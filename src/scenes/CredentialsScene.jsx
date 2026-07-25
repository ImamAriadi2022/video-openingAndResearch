import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, slide, interpolate, easeOut } from '../utils/animation.js';

export function CredentialsScene({ currentFrame }) {
  // Scene frame range: 870 to 960
  const opacity = fade(currentFrame, 870, 15, 'in');
  const fadeOut = fade(currentFrame, 945, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Hand & phone scaling
  const handScale = interpolate(currentFrame, [870, 960], [1.05, 1.0], { easing: easeOut });

  // Warning glow fade-in (frame 900 to 930)
  const warningTintOpacity = interpolate(currentFrame, [900, 930], [0, 0.08], { easing: easeOut });

  // Text details fade in
  const textOpacity = fade(currentFrame, 885, 20, 'in');
  const textX = slide(currentFrame, 885, 25, 40, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Warning overlay tint */}
      <div 
        className="absolute inset-0 bg-amber-500 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: warningTintOpacity }}
      />

      {/* Visual Composition: matching Slide 16_9 - 4.png layout */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32 z-10">
        
        {/* Left: Hand holding phone illustration */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `scale(${handScale})`,
            transformOrigin: 'bottom center'
          }}
        >
          <img 
            src={ASSETS.desain.slide4} 
            alt="Hand holding phone" 
            className="max-h-[90%] object-contain"
          />

          {/* In-screen credentials valid overlay */}
          <div className="absolute top-[300px] left-[450px] w-[210px] h-[370px] flex flex-col justify-center gap-3 p-3 select-none">
            <div className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-3 shadow-md text-center transform scale-95 flex flex-col items-center">
              <span className="text-2xl text-emerald-500">✓</span>
              <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider mt-1">Credentials Valid</span>
              <span className="text-[9px] text-slate-500 mt-1">Akses Diterima</span>
            </div>
            
            {warningTintOpacity > 0.02 && (
              <div className="w-full bg-amber-50 border border-amber-300 rounded-xl p-2.5 shadow-sm text-center transform scale-95 animate-fade-in flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span className="text-[8px] font-bold text-amber-800 text-left leading-normal">Pengakses Terindikasi Mencurigakan!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Typography matching the video design language */}
        <div 
          className="w-[600px] flex flex-col justify-center gap-6"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`
          }}
        >
          <span className="text-amber-600 font-bold tracking-widest text-lg uppercase flex items-center gap-2">
            ⚠️ Masalah Utama
          </span>
          <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Aktivitas pelaku masih dapat terlihat sah.
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Ketika kredensial (PIN & OTP) dimasukkan dengan benar, sistem konvensional menganggap transaksi tersebut aman dan dilakukan oleh pemiliknya.
          </p>
        </div>
      </div>
    </div>
  );
}
