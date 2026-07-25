import React, { useState, useEffect } from 'react';
import { useVideoTimeline } from '../hooks/useVideoTimeline.js';
import { VideoStage } from './VideoStage.jsx';
import { VideoControls } from './VideoControls.jsx';

export function VideoPlayer() {
  const timeline = useVideoTimeline();
  const [isRenderMode, setIsRenderMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check URL parameters for export render mode (e.g. ?render=true&frame=600)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const renderParam = params.get('render');
    const frameParam = params.get('frame');

    if (renderParam === 'true') {
      setIsRenderMode(true);
      if (frameParam !== null) {
        const frameNum = parseInt(frameParam, 10);
        if (!isNaN(frameNum)) {
          timeline.seekToFrame(frameNum);
        }
      }
    }
  }, []);

  const handleToggleFullscreen = () => {
    const elem = document.getElementById('video-preview-container');
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Pure Render Mode for export script (1920x1080, no UI chrome)
  if (isRenderMode) {
    return (
      <div className="w-[1920px] h-[1080px] bg-slate-950 overflow-hidden">
        <VideoStage 
          currentFrame={timeline.currentFrame} 
          subtitlesEnabled={timeline.subtitlesEnabled}
          isRenderMode={true}
        />
      </div>
    );
  }

  // Developer Preview Mode
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-bold text-sm">
            🛡️
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
              SENTINEL<span className="text-cyan-400">-ID</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-normal">
                Opening Motion Graphic
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Dizipher Team • Hackathon Video Composition Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-3 py-1 bg-slate-800 rounded-lg text-slate-300 border border-slate-700">
            1920×1080 • 16:9 • 30 FPS
          </div>
        </div>
      </header>

      {/* Main Video Viewport Stage */}
      <main 
        id="video-preview-container" 
        className="flex-1 flex items-center justify-center relative min-h-[600px] overflow-hidden"
      >
        <VideoStage 
          currentFrame={timeline.currentFrame} 
          subtitlesEnabled={timeline.subtitlesEnabled}
          isRenderMode={false}
        />
      </main>

      {/* Bottom Interactive Controls */}
      <footer className="z-20 bg-slate-950 p-4">
        <VideoControls 
          timeline={timeline}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </footer>
    </div>
  );
}
