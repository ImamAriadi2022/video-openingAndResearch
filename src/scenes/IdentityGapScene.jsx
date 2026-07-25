import React from 'react';
import { HandHoldingPhoneMockup } from '../components/HandHoldingPhoneMockup.jsx';
import { fade, slide, interpolate, easeOut } from '../utils/animation.js';

export function IdentityGapScene({ currentFrame }) {
  // Scene frame range: 960 to 1050
  const opacity = fade(currentFrame, 960, 15, 'in');
  const fadeOut = fade(currentFrame, 1025, 25, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Hand & phone scaling
  const handScale = interpolate(currentFrame, [960, 1050], [1.0, 1.05], { easing: easeOut });

  // Identity Gap Warning glow
  const warningTintOpacity = interpolate(currentFrame, [970, 1010], [0, 0.1], { easing: easeOut });

  // Text details fade in
  const text1Opacity = fade(currentFrame, 965, 15, 'in');
  const text1X = slide(currentFrame, 965, 20, 30, 0);

  const text2Opacity = fade(currentFrame, 985, 15, 'in');
  const text2X = slide(currentFrame, 985, 20, 30, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Warning overlay tint */}
      <div 
        className="absolute inset-0 bg-red-500 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: warningTintOpacity }}
      />

      {/* Visual Composition: matching Slide 16_9 - 4.png layout style */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32 z-10">
        
        {/* Left: Programmatic Hand holding phone illustration */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `scale(${handScale})`,
            transformOrigin: 'bottom center'
          }}
        >
          <HandHoldingPhoneMockup>
            {/* In-screen Identity Gap Silhouette overlay */}
            <div className="w-full h-full bg-[#f8fafc] flex flex-col justify-center items-center gap-3 p-4 font-sans select-none">
              <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-500 text-red-500 flex items-center justify-center text-4xl font-black animate-pulse shadow-md">
                ?
              </div>
              
              <div className="w-full bg-red-50 border border-red-200 rounded-xl p-2.5 shadow-sm text-center">
                <span className="text-[10px] font-extrabold text-red-800 uppercase tracking-widest leading-none">Identity Unknown</span>
                <div className="text-[9px] font-bold text-red-600 mt-1">SIAPA PENGGUNA ASLI?</div>
              </div>
            </div>
          </HandHoldingPhoneMockup>
        </div>

        {/* Right: Typography matching the video design language */}
        <div className="w-[600px] flex flex-col justify-center gap-8">
          <div 
            style={{ opacity: text1Opacity, transform: `translateX(${text1X}px)` }}
            className="flex flex-col gap-2"
          >
            <span className="text-slate-500 font-bold tracking-widest text-lg uppercase">
              Sistem mengenali kredensialnya.
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              PIN benar. OTP benar.
            </h2>
          </div>

          <div 
            style={{ opacity: text2Opacity, transform: `translateX(${text2X}px)` }}
            className="flex flex-col gap-2"
          >
            <h2 className="text-5xl font-black text-red-600 tracking-tight leading-tight">
              Tapi siapa yang sebenarnya memegang perangkat?
            </h2>
            <div className="w-24 h-1 bg-red-500 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

