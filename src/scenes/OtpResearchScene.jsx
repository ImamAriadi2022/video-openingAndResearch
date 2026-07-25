import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, slide, interpolate } from '../utils/animation.js';

export function OtpResearchScene({ currentFrame }) {
  // Scene frame range: 720 to 870
  const opacity = fade(currentFrame, 720, 15, 'in');
  const fadeOut = fade(currentFrame, 855, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Stat entrance
  const heroOpacity = fade(currentFrame, 730, 20, 'in');
  const heroScale = scale(currentFrame, 730, 30, 0.85, 1.0);

  // Transition near end of scene (830 to 870) transforming OTP into OTP VERIFIED ✓
  const isTransitioningToVerified = currentFrame >= 830;
  const verifiedBadgeOpacity = fade(currentFrame, 830, 15, 'in');

  return (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Background research image element */}
      <div className="absolute right-12 bottom-12 w-[420px] rounded-2xl overflow-hidden border border-slate-800 opacity-20 pointer-events-none">
        <img src={ASSETS.research.slide13} alt="OTP Fraud Data" className="w-full h-auto" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.18)_0%,transparent_70%)] z-10" />

      <div className="z-20 text-center flex flex-col items-center gap-8 max-w-4xl px-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/40 text-rose-400 text-sm font-bold tracking-widest uppercase">
          Faktor Spesifik Penipuan OTP
        </div>

        {/* Hero Card */}
        <div 
          className="w-full bg-slate-900/90 border border-rose-500/50 rounded-3xl p-10 shadow-2xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden"
          style={{
            opacity: heroOpacity,
            transform: `scale(${heroScale})`
          }}
        >
          {/* OTP Code Box */}
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
            <span className="text-sm font-semibold text-slate-400">Modus OTP SMS</span>
            <span className="font-mono text-xl font-black text-rose-400 tracking-widest">••••••</span>
          </div>

          <h3 className="text-xl font-bold text-slate-300 uppercase tracking-wider">
            Kerugian Akibat Penipuan Berbasis OTP
          </h3>

          {/* Hero Figure: Rp 2.5 TRILIUN */}
          <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-amber-400 tracking-tight my-4">
            ± Rp 2,5 TRILIUN
          </div>

          <p className="text-sm text-slate-400 max-w-xl">
            Diperkirakan dari pengambilalihan akses sepihak memanfaatkan verifikasi OTP tanpa verifikasi perilaku pengoperasian perangkat
          </p>

          {/* Visual bridge transition at end of scene */}
          {isTransitioningToVerified && (
            <div 
              className="mt-6 pt-6 border-t border-slate-800 w-full flex items-center justify-center gap-4"
              style={{ opacity: verifiedBadgeOpacity }}
            >
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-400 font-bold text-sm flex items-center gap-2">
                <span>OTP VERIFIED ✓</span>
                <span className="text-xs text-slate-300">(Namun Pengakses Berbeda)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
