import React from 'react';
import { HandHoldingPhoneMockup } from '../components/HandHoldingPhoneMockup.jsx';
import { fade, slide, interpolate, easeOut } from '../utils/animation.js';

export function DailyBankingScene({ currentFrame }) {
  // Scene range: 60 to 150
  const opacity = fade(currentFrame, 60, 15, 'in');
  const fadeOut = fade(currentFrame, 135, 15, 'out');
  const combinedOpacity = opacity * fadeOut;

  // Hand & phone entrance: slide up from bottom
  const handY = interpolate(currentFrame, [60, 95], [600, 0], { easing: easeOut });
  const handScale = interpolate(currentFrame, [95, 150], [1.0, 1.05], { easing: easeOut });

  // Text details fade in
  const textOpacity = fade(currentFrame, 80, 20, 'in');
  const textX = slide(currentFrame, 80, 25, 40, 0);

  // Programmatic Banking elements inside the screen
  const headerOpacity = fade(currentFrame, 85, 15, 'in');
  const balanceOpacity = fade(currentFrame, 95, 15, 'in');
  const actionsOpacity = fade(currentFrame, 105, 15, 'in');

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
            transform: `translateY(${handY}px) scale(${handScale})`,
            transformOrigin: 'bottom center'
          }}
        >
          <HandHoldingPhoneMockup>
            {/* Bank Application Dashboard inside mockup */}
            <div className="w-full h-full bg-[#f8fafc] flex flex-col justify-between p-4 font-sans select-none">
              
              {/* Header */}
              <div 
                className="flex items-center justify-between pb-3 border-b border-slate-200 mt-6"
                style={{ opacity: headerOpacity }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs">
                    IA
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400">Selamat Datang</div>
                    <div className="text-[10px] font-bold text-slate-800">Imam Ariadi</div>
                  </div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Balance Card */}
              <div 
                className="bg-blue-600 p-3.5 rounded-xl text-white shadow-sm my-3 flex flex-col justify-between"
                style={{ opacity: balanceOpacity }}
              >
                <span className="text-[9px] font-medium opacity-80">Total Saldo</span>
                <span className="text-lg font-black tracking-tight mt-0.5">Rp 24.850.000</span>
                <span className="text-[7px] opacity-60 mt-1.5">Rekening Utama •••• 8842</span>
              </div>

              {/* Quick Actions (TRANSFER, PAYMENT, BILLS) */}
              <div 
                className="grid grid-cols-3 gap-1.5 my-1"
                style={{ opacity: actionsOpacity }}
              >
                <div className="bg-white border border-slate-200 p-2 rounded-lg text-center flex flex-col items-center">
                  <span className="text-sm">⇄</span>
                  <span className="text-[7px] font-extrabold text-slate-600 uppercase tracking-wider mt-1">Transfer</span>
                </div>
                <div className="bg-white border border-slate-200 p-2 rounded-lg text-center flex flex-col items-center">
                  <span className="text-sm">💳</span>
                  <span className="text-[7px] font-extrabold text-slate-600 uppercase tracking-wider mt-1">Bayar</span>
                </div>
                <div className="bg-white border border-slate-200 p-2 rounded-lg text-center flex flex-col items-center">
                  <span className="text-sm">🧾</span>
                  <span className="text-[7px] font-extrabold text-slate-600 uppercase tracking-wider mt-1">Tagihan</span>
                </div>
              </div>

              {/* Recent transaction history list */}
              <div 
                className="flex-1 mt-2 space-y-1.5 overflow-hidden"
                style={{ opacity: actionsOpacity }}
              >
                <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider">Aktivitas Terakhir</span>
                <div className="bg-white border border-slate-100 p-2 rounded-lg flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] bg-emerald-100 text-emerald-600 w-4 h-4 rounded-full flex items-center justify-center">↓</span>
                    <span className="text-[8px] font-bold text-slate-700">Terima Transfer</span>
                  </div>
                  <span className="text-[8px] font-black text-emerald-600">+Rp 1.500.000</span>
                </div>
                <div className="bg-white border border-slate-100 p-2 rounded-lg flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] bg-slate-100 text-slate-500 w-4 h-4 rounded-full flex items-center justify-center">↑</span>
                    <span className="text-[8px] font-bold text-slate-700">Pembayaran Listrik</span>
                  </div>
                  <span className="text-[8px] font-black text-slate-600">-Rp 350.000</span>
                </div>
              </div>

            </div>
          </HandHoldingPhoneMockup>
        </div>

        {/* Right: Premium, clean Typography matching the video design language */}
        <div 
          className="w-[600px] flex flex-col justify-center gap-6"
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`
          }}
        >
          <span className="text-cyan-600 font-bold tracking-widest text-lg uppercase">
            Aktivitas Sehari-hari
          </span>
          <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Mobile banking telah menjadi bagian dari kehidupan kita.
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Kemudahan transaksi digital kini selalu berada dalam genggaman tangan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}


