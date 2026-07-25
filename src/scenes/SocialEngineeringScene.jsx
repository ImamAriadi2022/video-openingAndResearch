import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, slide, interpolate, easeOut } from '../utils/animation.js';

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
        
        {/* Left: Hand holding phone illustration (shifting left) */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `translateX(${phoneX}px)`,
            transformOrigin: 'bottom center'
          }}
        >
          <img 
            src={ASSETS.desain.slide5} 
            alt="Hand holding phone" 
            className="max-h-[90%] object-contain"
          />
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
