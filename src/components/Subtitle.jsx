import React from 'react';
import { getCurrentSubtitle } from '../config/timeline.js';

export function Subtitle({ currentFrame, enabled }) {
  if (!enabled) return null;

  const narrationText = getCurrentSubtitle(currentFrame);
  if (!narrationText) return null;

  return (
    <div className="absolute bottom-10 inset-x-0 z-50 flex justify-center pointer-events-none px-12">
      <div className="bg-slate-950/85 border border-slate-700/70 text-white px-8 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md max-w-4xl text-center">
        <p className="text-xl font-medium leading-relaxed tracking-wide text-slate-100 drop-shadow">
          "{narrationText}"
        </p>
      </div>
    </div>
  );
}
