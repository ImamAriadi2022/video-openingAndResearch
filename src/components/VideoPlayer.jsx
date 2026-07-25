import React, { useState, useEffect } from 'react';
import { useVideoTimeline } from '../hooks/useVideoTimeline.js';
import { VideoStage } from './VideoStage.jsx';
import { VideoControls } from './VideoControls.jsx';
import { SCENES } from '../config/timeline.js';

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

  // Developer Preview Mode with Split Workspace Layout
  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden">
      
      {/* Top Header */}
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-lg shadow-sm">
            🛡️
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
              Sentinel-ID <span className="text-[#00a2ff]">Motion Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-normal">
                Composition Engine
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">Dizipher Hackathon Video System • Rebuild & Motion Render Pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-3 py-1 bg-slate-800 rounded-lg text-slate-300 border border-slate-700">
            1920×1080 • 16:9 • 30 FPS
          </div>
        </div>
      </header>

      {/* Workspace Area: Sidebar + Stage */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Interactive Scene Sidebar */}
        <aside className="w-80 bg-slate-900/40 border-r border-slate-800/80 flex flex-col overflow-y-auto flex-shrink-0 p-4 select-none">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Daftar Scene</h3>
          
          <div className="space-y-1">
            {SCENES.map((scene) => {
              const isActive = timeline.currentScene && timeline.currentScene.id === scene.id;
              
              return (
                <button
                  key={scene.id}
                  onClick={() => timeline.seekToFrame(scene.startFrame)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex flex-col gap-1 border ${
                    isActive 
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md' 
                      : 'bg-transparent border-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-tight">{scene.name}</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {scene.startFrame} F
                    </span>
                  </div>
                  {scene.narration && (
                    <p className={`text-[10px] line-clamp-2 leading-relaxed ${
                      isActive ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      "{scene.narration}"
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Side: Video Preview Stage */}
        <main 
          id="video-preview-container" 
          className="flex-1 flex items-center justify-center relative bg-slate-950 overflow-hidden"
        >
          <VideoStage 
            currentFrame={timeline.currentFrame} 
            subtitlesEnabled={timeline.subtitlesEnabled}
            isRenderMode={false}
          />
        </main>
      </div>

      {/* Bottom Interactive Controls */}
      <footer className="z-20 bg-slate-950 p-4 border-t border-slate-900 flex-shrink-0">
        <VideoControls 
          timeline={timeline}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </footer>
    </div>
  );
}

export default VideoPlayer;

