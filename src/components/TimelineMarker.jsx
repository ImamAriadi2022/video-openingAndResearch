import React from 'react';
import { SCENES } from '../config/timeline.js';
import { VIDEO_CONFIG } from '../config/video.js';

export function TimelineMarker({ scene, onSelect }) {
  const leftPercent = (scene.startFrame / VIDEO_CONFIG.totalFrames) * 100;
  const widthPercent = ((scene.endFrame - scene.startFrame) / VIDEO_CONFIG.totalFrames) * 100;

  return (
    <div
      onClick={() => onSelect(scene.startFrame)}
      title={`${scene.name} (${scene.start}s - ${scene.end}s)`}
      className="absolute top-0 bottom-0 border-r border-slate-700/60 hover:bg-cyan-500/20 cursor-pointer group transition-colors flex items-center px-1 overflow-hidden"
      style={{
        left: `${leftPercent}%`,
        width: `${widthPercent}%`
      }}
    >
      <span className="text-[10px] font-medium text-slate-400 group-hover:text-cyan-300 truncate select-none">
        {scene.name.split('.')[1] || scene.name}
      </span>
    </div>
  );
}
