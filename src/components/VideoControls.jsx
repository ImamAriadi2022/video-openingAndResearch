import React from 'react';
import { formatTime } from '../utils/time.js';
import { VIDEO_CONFIG } from '../config/video.js';
import { Timeline } from './Timeline.jsx';

export function VideoControls({
  timeline,
  onToggleFullscreen
}) {
  const {
    currentFrame,
    currentTime,
    isPlaying,
    subtitlesEnabled,
    currentScene,
    play,
    pause,
    togglePlay,
    restart,
    seekToFrame,
    nextScene,
    prevScene,
    setSubtitlesEnabled
  } = timeline;

  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 p-4 flex flex-col gap-3 max-w-7xl mx-auto rounded-b-2xl shadow-2xl">
      {/* Timeline Scrubber */}
      <Timeline currentFrame={currentFrame} onSeek={seekToFrame} />

      {/* Control Buttons & Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Transport Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Restart Video (Frame 0)"
          >
            ⏮ Restart
          </button>

          <button
            onClick={prevScene}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
            title="Previous Scene"
          >
            ◀◀ Prev Scene
          </button>

          <button
            onClick={togglePlay}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-900/40 transition-colors flex items-center gap-2"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>

          <button
            onClick={nextScene}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
            title="Next Scene"
          >
            Next Scene ▶▶
          </button>
        </div>

        {/* Center: Time & Frame Display */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono text-sm">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span>⏱</span>
            <span>{formatTime(currentTime)}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{formatTime(VIDEO_CONFIG.totalDurationSeconds)}</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div className="text-xs text-slate-400">
            Frame: <span className="text-white font-bold">{currentFrame}</span> / {VIDEO_CONFIG.totalFrames}
          </div>
        </div>

        {/* Right: Scene Badge & Toggles */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold max-w-[200px] truncate">
            {currentScene ? currentScene.name : 'Scene'}
          </div>

          <button
            onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors border ${
              subtitlesEnabled
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            Subtitles: {subtitlesEnabled ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold"
            title="Fullscreen Video Stage"
          >
            ⛶ Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}
