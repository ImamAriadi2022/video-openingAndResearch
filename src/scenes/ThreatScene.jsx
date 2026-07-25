import React from 'react';
import { fade, scale, slide, easeOut } from '../utils/animation.js';

export function ThreatScene({ currentFrame }) {
  // Scene frame range: 240 to 300
  const opacity = fade(currentFrame, 240, 15, 'in');
  const fadeOut = fade(currentFrame, 285, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Text details fade in
  const text1Opacity = fade(currentFrame, 245, 15, 'in');
  const text1Y = slide(currentFrame, 245, 20, 20, 0);

  const text2Opacity = fade(currentFrame, 260, 15, 'in');
  const text2Y = slide(currentFrame, 260, 20, 20, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#00030f] flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Visual Composition: matching Slide 16_9 - 3.png layout style */}
      <div className="z-10 text-center flex flex-col items-center gap-8 max-w-5xl px-12">
        <h3 
          style={{
            opacity: text1Opacity,
            transform: `translateY(${text1Y}px)`
          }}
          className="text-4xl font-black text-rose-500 uppercase tracking-widest"
        >
          Namun...
        </h3>

        <h2 
          style={{
            opacity: text2Opacity,
            transform: `translateY(${text2Y}px)`
          }}
          className="text-6xl font-black text-white tracking-tight leading-tight"
        >
          Kemudahan ini juga membuka ruang bagi modus kejahatan digital.
        </h2>

        <div 
          style={{ opacity: text2Opacity }}
          className="w-24 h-1 bg-rose-500 rounded-full mt-4"
        />
      </div>
    </div>
  );
}

