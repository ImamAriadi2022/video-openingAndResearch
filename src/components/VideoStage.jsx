import React, { useRef, useState, useEffect } from 'react';
import { VIDEO_CONFIG } from '../config/video.js';
import { SceneContainer } from './SceneContainer.jsx';
import { Subtitle } from './Subtitle.jsx';

export function VideoStage({ currentFrame, subtitlesEnabled, isRenderMode }) {
  const containerRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  // Responsive scaling logic so the 1920x1080 stage scales smoothly within parent preview
  useEffect(() => {
    if (isRenderMode) {
      setScaleFactor(1);
      return;
    }

    const handleResize = () => {
      if (!containerRef.current || !containerRef.current.parentElement) return;
      const parent = containerRef.current.parentElement;
      const parentWidth = parent.clientWidth;
      const parentHeight = parent.clientHeight;

      const scaleX = parentWidth / VIDEO_CONFIG.width;
      const scaleY = parentHeight / VIDEO_CONFIG.height;
      const scale = Math.min(scaleX, scaleY, 1.2);

      setScaleFactor(scale > 0 ? scale : 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isRenderMode]);

  // In export render mode, output pure 1920x1080 without scale wrapper padding
  if (isRenderMode) {
    return (
      <div 
        id="video-export-stage"
        style={{
          width: `${VIDEO_CONFIG.width}px`,
          height: `${VIDEO_CONFIG.height}px`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#020617'
        }}
      >
        <SceneContainer currentFrame={currentFrame} />
        <Subtitle currentFrame={currentFrame} enabled={subtitlesEnabled} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-slate-950 overflow-hidden">
      <div 
        ref={containerRef}
        className="relative bg-slate-900 shadow-2xl rounded-xl overflow-hidden border border-slate-800"
        style={{
          width: `${VIDEO_CONFIG.width}px`,
          height: `${VIDEO_CONFIG.height}px`,
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'center center',
          flexShrink: 0
        }}
      >
        <SceneContainer currentFrame={currentFrame} />
        <Subtitle currentFrame={currentFrame} enabled={subtitlesEnabled} />
      </div>
    </div>
  );
}
