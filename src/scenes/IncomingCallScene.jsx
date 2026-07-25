import React from 'react';
import { HandHoldingPhoneMockup } from '../components/HandHoldingPhoneMockup.jsx';
import { fade, scale, slide, interpolate, easeOut } from '../utils/animation.js';

export function IncomingCallScene({ currentFrame }) {
  // Scene frame range: 300 to 390
  const opacity = fade(currentFrame, 300, 15, 'in');
  const fadeOut = fade(currentFrame, 375, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Subtle call vibration (vibrate on X/Y coordinates periodically)
  const isVibrating = currentFrame >= 305 && currentFrame < 380;
  const vibrateOffset = isVibrating ? (currentFrame % 3 === 0 ? 3 : -3) : 0;

  // Phone scale & push
  const phoneScale = scale(currentFrame, 300, 40, 0.95, 1.0, easeOut);

  // Narration text fade-in
  const textOpacity = fade(currentFrame, 315, 20, 'in');
  const textX = slide(currentFrame, 315, 25, 40, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Visual Composition: matching Slide 16_9 - 5.png layout style */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32">
        
        {/* Left: Programmatic Hand holding phone with incoming call screen */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `scale(${phoneScale}) translate(${vibrateOffset}px, ${vibrateOffset}px)`,
            transformOrigin: 'bottom center'
          }}
        >
          <HandHoldingPhoneMockup>
            {/* Incoming Call UI inside phone screen */}
            <div className="w-full h-full bg-[#e2e8f0]/30 flex flex-col items-center justify-between p-4 font-sans select-none pt-12 pb-10">
              
              {/* Call contact Avatar */}
              <div className="flex flex-col items-center gap-3 mt-10">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500 flex items-center justify-center text-blue-500 shadow-md">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Number & Unknown caller label */}
                <div className="text-center mt-2">
                  <div className="text-base font-black text-slate-900 tracking-tight">+62764783726648</div>
                  <div className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Telpon tidak dikenal</div>
                </div>
              </div>

              {/* Accept & Decline Buttons */}
              <div className="flex justify-around w-full px-4 mb-4">
                {/* Decline Button (Red) */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg border border-red-600">
                    <svg className="w-6 h-6 transform rotate-[135deg]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Tolak</span>
                </div>

                {/* Accept Button (Green) */}
                <div className="flex flex-col items-center gap-1.5 relative">
                  {isVibrating && (
                    <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/25 border-2 border-emerald-400 rounded-full animate-ping pointer-events-none" />
                  )}
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg border border-emerald-600 z-10">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Jawab</span>
                </div>
              </div>
            </div>
          </HandHoldingPhoneMockup>
        </div>

        {/* Right: Programmatic text layout matching Slide 5 typography exactly */}
        <div 
          className="w-[600px] flex flex-col justify-center gap-6"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`
          }}
        >
          <span className="text-red-500 font-extrabold tracking-widest text-lg uppercase">
            Peringatan Panggilan
          </span>
          <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Satu panggilan bisa menjadi awal pengambilalihan akun.
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Manipulasi psikologis dimulai dari panggilan suara telepon yang tidak Anda kenali.
          </p>
        </div>
      </div>
    </div>
  );
}


