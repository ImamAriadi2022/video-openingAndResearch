import React from 'react';
import { HandHoldingPhoneMockup } from '../components/HandHoldingPhoneMockup.jsx';
import { fade, slide, interpolate, easeOut } from '../utils/animation.js';

export function ConvenienceScene({ currentFrame }) {
  // Scene frame range: 150 to 240
  const opacity = fade(currentFrame, 150, 15, 'in');
  const fadeOut = fade(currentFrame, 225, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Hand & phone scaling
  const handScale = interpolate(currentFrame, [150, 240], [1.05, 1.0], { easing: easeOut });

  // Sequential typography timings
  // 150-180: CEPAT
  // 175-210: MUDAH
  // 200-240: DALAM HITUNGAN DETIK
  const text1Opacity = fade(currentFrame, 155, 15, 'in');
  const text1X = slide(currentFrame, 155, 20, 30, 0);

  const text2Opacity = fade(currentFrame, 175, 15, 'in');
  const text2X = slide(currentFrame, 175, 20, 30, 0);

  const text3Opacity = fade(currentFrame, 195, 15, 'in');
  const text3X = slide(currentFrame, 195, 20, 30, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Visual Composition: matching Slide 16_9 - 4.png layout style */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32">
        
        {/* Left: Programmatic Hand holding phone illustration */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `scale(${handScale})`,
            transformOrigin: 'bottom center'
          }}
        >
          <HandHoldingPhoneMockup>
            {/* In-screen Transaction Feedback overlay */}
            <div className="w-full h-full bg-[#f8fafc] flex flex-col justify-center gap-3 p-4 font-sans select-none">
              {text1Opacity > 0.05 && (
                <div className="w-full bg-cyan-50 border border-cyan-200 rounded-xl p-3 shadow-sm text-center transform scale-95 animate-fade-in flex flex-col items-center">
                  <span className="text-2xl">💸</span>
                  <span className="text-[12px] font-extrabold text-cyan-800 uppercase tracking-wider mt-1">Transfer</span>
                  <span className="text-[10px] font-bold text-cyan-600">SELESAI ✓</span>
                </div>
              )}
              {text2Opacity > 0.05 && (
                <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-3 shadow-sm text-center transform scale-95 animate-fade-in flex flex-col items-center">
                  <span className="text-2xl">💳</span>
                  <span className="text-[12px] font-extrabold text-blue-800 uppercase tracking-wider mt-1">Pembayaran</span>
                  <span className="text-[10px] font-bold text-blue-600">BERHASIL ✓</span>
                </div>
              )}
            </div>
          </HandHoldingPhoneMockup>
        </div>

        {/* Right: Typography matching the video design language */}
        <div className="w-[600px] flex flex-col justify-center gap-8">
          <div 
            style={{ opacity: text1Opacity, transform: `translateX(${text1X}px)` }}
            className="flex items-center gap-4"
          >
            <span className="text-6xl font-black text-slate-900 tracking-tight">
              CEPAT.
            </span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-bold tracking-wider uppercase">
              Instant
            </span>
          </div>

          <div 
            style={{ opacity: text2Opacity, transform: `translateX(${text2X}px)` }}
            className="flex items-center gap-4"
          >
            <span className="text-6xl font-black text-slate-900 tracking-tight">
              MUDAH.
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold tracking-wider uppercase">
              1-Click
            </span>
          </div>

          <div 
            style={{ opacity: text3Opacity, transform: `translateX(${text3X}px)` }}
            className="flex flex-col gap-2"
          >
            <span className="text-4xl font-extrabold text-slate-700 tracking-tight">
              Dalam Hitungan Detik.
            </span>
            <p className="text-lg text-slate-500 font-medium max-w-md">
              Seluruh transaksi finansial terselesaikan tanpa hambatan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

