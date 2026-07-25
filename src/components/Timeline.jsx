import React, { useRef } from 'react';
import { SCENES } from '../config/timeline.js';
import { VIDEO_CONFIG } from '../config/video.js';
import { TimelineMarker } from './TimelineMarker.jsx';

export function Timeline({ currentFrame, onSeek }) {
  const trackRef = useRef(null);

  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(Math.max(0, clickX / rect.width), 1);
    const targetFrame = Math.round(ratio * VIDEO_CONFIG.totalFrames);
    onSeek(targetFrame);
  };

  const progressPercent = (currentFrame / VIDEO_CONFIG.totalFrames) * 100;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-inner">
      {/* Scene Track Bar */}
      <div 
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative h-7 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden cursor-pointer mb-2"
      >
        {/* Scene Markers */}
        {SCENES.map((scene) => (
          <TimelineMarker 
            key={scene.id} 
            scene={scene} 
            onSelect={onSeek} 
          />
        ))}

        {/* Progress Fill */}
        <div 
          className="absolute top-0 bottom-0 left-0 bg-cyan-500/25 border-r-2 border-cyan-400 pointer-events-none transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Scrubber Knob */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_#06b6d4] pointer-events-none -ml-0.5"
          style={{ left: `${progressPercent}%` }}
        />
      </div>

      {/* Frame Ticks indicator */}
      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
        <span>00:00.00 (F0)</span>
        <span>00:10.00 (F300)</span>
        <span>00:20.00 (F600)</span>
        <span>00:30.00 (F900)</span>
        <span>00:38.00 (F1140)</span>
      </div>
    </div>
  );
}
