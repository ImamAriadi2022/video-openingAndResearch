import React from 'react';
import { ASSETS } from '../config/assets.js';
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

  // Narration text image fade-in
  const textOpacity = fade(currentFrame, 315, 20, 'in');
  const textX = slide(currentFrame, 315, 25, 40, 0);

  return (
    <div 
      className="absolute inset-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Visual Composition: matching visual identity of the design package */}
      <div className="relative w-[1920px] h-[1080px] flex items-center justify-between px-32">
        
        {/* Left: Hand holding phone illustration with incoming call (Slide 16_9 - 5.png) */}
        <div 
          className="relative w-[1000px] h-[900px] flex items-center justify-center"
          style={{
            transform: `scale(${phoneScale}) translate(${vibrateOffset}px, ${vibrateOffset}px)`,
            transformOrigin: 'bottom center'
          }}
        >
          <img 
            src={ASSETS.desain.slide5} 
            alt="Incoming Call illustration" 
            className="max-h-[90%] object-contain"
          />

          {/* Green call accept button pulse ring */}
          {isVibrating && (
            <div className="absolute top-[612px] left-[472px] w-[54px] h-[54px] bg-emerald-500/25 border-2 border-emerald-400 rounded-full animate-ping pointer-events-none" />
          )}
        </div>

        {/* Right: Existing text design asset (narasi_satu_panggilan.png) */}
        <div 
          className="w-[600px] flex flex-col justify-center"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`
          }}
        >
          <img 
            src={ASSETS.desain.incomingCall} 
            alt="Satu panggilan bisa menjadi awal pengambilalihan akun."
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

