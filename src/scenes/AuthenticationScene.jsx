import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, slide, interpolate, easeOut } from '../utils/animation.js';

export function AuthenticationScene({ currentFrame }) {
  // Scene frame range: 480 to 570
  const opacity = fade(currentFrame, 480, 15, 'in');
  const fadeOut = fade(currentFrame, 555, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Hand & phone scaling
  const handScale = interpolate(currentFrame, [480, 570], [1.0, 1.05], { easing: easeOut });

  // PIN check verification (enters frame 485, verified frame 510)
  const pinEntered = currentFrame >= 485;
  const pinVerified = currentFrame >= 505;

  // OTP check verification (enters frame 515, verified frame 540)
  const otpEntered = currentFrame >= 515;
  const otpVerified = currentFrame >= 535;

  // Text entrances
  const text1Opacity = fade(currentFrame, 490, 15, 'in');
  const text1X = slide(currentFrame, 490, 20, 30, 0);

  const text2Opacity = fade(currentFrame, 520, 15, 'in');
  const text2X = slide(currentFrame, 520, 20, 30, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Visual Composition: matching Slide 16_9 - 4.png layout */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32">
        
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

          {/* In-screen inputs for PIN & OTP */}
          <div className="absolute top-[300px] left-[450px] w-[210px] h-[370px] flex flex-col justify-center gap-3 p-2.5 select-none">
            {pinEntered && (
              <div className={`w-full border rounded-xl p-2.5 shadow-sm text-center transform scale-95 transition-all ${
                pinVerified ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">PIN</div>
                <div className="text-sm font-mono tracking-widest mt-0.5">••••••</div>
                <div className="text-[9px] font-black mt-1">{pinVerified ? '✓ VERIFIED' : 'WAIT...'}</div>
              </div>
            )}
            {otpEntered && (
              <div className={`w-full border rounded-xl p-2.5 shadow-sm text-center transform scale-95 transition-all ${
                otpVerified ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">OTP</div>
                <div className="text-sm font-mono tracking-widest mt-0.5">849201</div>
                <div className="text-[9px] font-black mt-1">{otpVerified ? '✓ VERIFIED' : 'WAIT...'}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Typography matching the video design language */}
        <div className="w-[600px] flex flex-col justify-center gap-8">
          <div 
            style={{ opacity: text1Opacity, transform: `translateX(${text1X}px)` }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-slate-900 tracking-tight">PIN Benar.</span>
              {pinVerified && <span className="text-2xl text-emerald-500 font-bold">✓</span>}
            </div>
            <p className="text-base text-slate-500 font-medium">
              Tahap otentikasi pertama berhasil terverifikasi oleh sistem perbankan.
            </p>
          </div>

          <div 
            style={{ opacity: text2Opacity, transform: `translateX(${text2X}px)` }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black text-slate-900 tracking-tight">OTP Benar.</span>
              {otpVerified && <span className="text-2xl text-emerald-500 font-bold">✓</span>}
            </div>
            <p className="text-base text-slate-500 font-medium">
              Tahap otentikasi kedua (One-Time Password) juga dinyatakan valid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
