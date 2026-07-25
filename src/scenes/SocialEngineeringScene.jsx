import React from 'react';
import { HandHoldingPhoneMockup } from '../components/HandHoldingPhoneMockup.jsx';
import { fade, scale, slide, easeOut } from '../utils/animation.js';

export function SocialEngineeringScene({ currentFrame }) {
  // Scene frame range: 390 to 480
  const opacity = fade(currentFrame, 390, 15, 'in');
  const fadeOut = fade(currentFrame, 465, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Hand holding phone layout shifts slightly to the left (matching Slide 6)
  const phoneX = slide(currentFrame, 390, 30, 0, -100);

  // Bubble 1 entrance (frame 400 to 425)
  const bubble1Opacity = fade(currentFrame, 400, 15, 'in');
  const bubble1Scale = scale(currentFrame, 400, 20, 0.8, 1.0, easeOut);
  const bubble1Y = slide(currentFrame, 400, 20, 30, 0);

  // Bubble 2 entrance (frame 430 to 455)
  const bubble2Opacity = fade(currentFrame, 430, 15, 'in');
  const bubble2Scale = scale(currentFrame, 430, 20, 0.8, 1.0, easeOut);
  const bubble2Y = slide(currentFrame, 430, 20, 30, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Visual Composition: matching Slide 6 & 7 layouts */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32">
        
        {/* Left: Programmatic Hand holding phone illustration (shifting left) */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `translateX(${phoneX}px)`,
            transformOrigin: 'bottom center'
          }}
        >
          <HandHoldingPhoneMockup>
            {/* Active Call screen inside phone */}
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

              {/* Decline Button in Center (representing active/answered call state) */}
              <div className="flex flex-col items-center gap-1.5 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg border border-red-600 animate-pulse">
                  <svg className="w-6 h-6 transform rotate-[135deg]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Tutup</span>
              </div>

            </div>
          </HandHoldingPhoneMockup>
        </div>

        {/* Right: Sequential Chat Bubbles matching Slide 6 & 7 */}
        <div className="w-[700px] h-[600px] flex flex-col justify-start gap-8 pt-16 z-20">
          
          {/* Chat Bubble 1: "Mencoba manipulasi korban" */}
          {bubble1Opacity > 0.01 && (
            <div 
              style={{
                opacity: bubble1Opacity,
                transform: `scale(${bubble1Scale}) translateY(${bubble1Y}px)`
              }}
              className="self-start relative bg-[#0091ff] text-white text-4xl font-semibold px-8 py-5 rounded-[36px] rounded-tl-none shadow-lg max-w-[550px] leading-relaxed"
            >
              {/* Bubble Tail */}
              <div className="absolute top-0 left-[-15px] w-0 h-0 border-t-[0px] border-t-transparent border-r-[25px] border-r-[#0091ff] border-b-[25px] border-b-transparent" />
              Mencoba manipulasi korban
            </div>
          )}

          {/* Chat Bubble 2: "untuk mendapatkan informasi" */}
          {bubble2Opacity > 0.01 && (
            <div 
              style={{
                opacity: bubble2Opacity,
                transform: `scale(${bubble2Scale}) translateY(${bubble2Y}px)`
              }}
              className="self-start relative bg-[#0091ff] text-white text-4xl font-semibold px-8 py-5 rounded-[36px] rounded-tl-none shadow-lg max-w-[550px] leading-relaxed mt-4"
            >
              {/* Bubble Tail */}
              <div className="absolute top-0 left-[-15px] w-0 h-0 border-t-[0px] border-t-transparent border-r-[25px] border-r-[#0091ff] border-b-[25px] border-b-transparent" />
              untuk mendapatkan informasi
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

