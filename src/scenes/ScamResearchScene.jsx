import React from 'react';
import { ASSETS } from '../config/assets.js';
import { fade, scale, countUp, interpolate, easeOut } from '../utils/animation.js';

export function ScamResearchScene({ currentFrame }) {
  // Scene frame range: 570 to 720
  const opacity = fade(currentFrame, 570, 15, 'in');
  const fadeOut = fade(currentFrame, 705, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Stat 1 count-up: 200,000+
  // 575 to 640
  const count1 = countUp(currentFrame, 575, 45, 200000);
  const stat1Opacity = fade(currentFrame, 575, 15, 'in');
  const stat1Scale = scale(currentFrame, 575, 25, 0.85, 1.0);

  // Stat 2 entrance: Rp6 TRILIUN
  // 640 to 720
  const stat2Opacity = fade(currentFrame, 640, 15, 'in');
  const stat2Scale = scale(currentFrame, 640, 25, 0.85, 1.0);

  // Background research slide floating cards
  const card1Opacity = fade(currentFrame, 580, 25, 'in');
  const card2Opacity = fade(currentFrame, 610, 25, 'in');

  return (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity: combinedOpacity }}
    >
      {/* Background research evidence cards floating subtly */}
      <div className="absolute inset-0 flex items-center justify-between px-16 pointer-events-none opacity-25">
        <div 
          className="w-[450px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl transform -rotate-3"
          style={{ opacity: card1Opacity }}
        >
          <img src={ASSETS.research.slide11} alt="Research Document" className="w-full h-auto" />
        </div>
        <div 
          className="w-[450px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl transform rotate-3"
          style={{ opacity: card2Opacity }}
        >
          <img src={ASSETS.research.img2} alt="Research Data" className="w-full h-auto" />
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.18)_0%,transparent_75%)] z-10" />

      {/* Main hero statistics */}
      <div className="z-20 text-center flex flex-col items-center gap-10 max-w-5xl px-8">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-bold tracking-widest uppercase">
          Skala Modus Kejahatan Digital • Indonesia (1 Tahun)
        </div>

        <div className="grid grid-cols-2 gap-12 w-full mt-4">
          {/* Stat 1 Card: 200,000+ Scam Reports */}
          <div 
            className="bg-slate-900/90 border border-rose-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur-md flex flex-col items-center text-center"
            style={{
              opacity: stat1Opacity,
              transform: `scale(${stat1Scale})`
            }}
          >
            <div className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-2">Total Aduan Terlayani</div>
            <div className="text-6xl font-black text-white tracking-tight font-mono my-2">
              {count1}+
            </div>
            <div className="text-xl font-bold text-slate-300">ADUAN SCAM</div>
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 w-full">
              Laporan penipuan transaksi keuangan terbukti
            </div>
          </div>

          {/* Stat 2 Card: Rp 6 TRILIUN Losses */}
          <div 
            className="bg-slate-900/90 border border-rose-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur-md flex flex-col items-center text-center"
            style={{
              opacity: stat2Opacity,
              transform: `scale(${stat2Scale})`
            }}
          >
            <div className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">Estimasi Kerugian Finansial</div>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-red-500 tracking-tight my-2">
              ± Rp 6 TRILIUN
            </div>
            <div className="text-xl font-bold text-slate-300">KERUGIAN NASABAH</div>
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 w-full">
              Total kerugian materiil dalam periode 12 bulan
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-2">
          Sumber Data: Catatan Aduan & Kerugian Finansial Digital
        </div>
      </div>
    </div>
  );
}
