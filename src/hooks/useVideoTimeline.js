import { useState, useEffect, useRef, useCallback } from 'react';
import { VIDEO_CONFIG } from '../config/video.js';
import { SCENES, getCurrentScene } from '../config/timeline.js';

export function useVideoTimeline() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);

  const seekToFrame = useCallback((frame) => {
    const clampedFrame = Math.min(Math.max(0, Math.round(frame)), VIDEO_CONFIG.totalFrames);
    setCurrentFrame(clampedFrame);
  }, []);

  const seekToSecond = useCallback((sec) => {
    seekToFrame(sec * VIDEO_CONFIG.fps);
  }, [seekToFrame]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev && currentFrame >= VIDEO_CONFIG.totalFrames) {
        seekToFrame(0);
      }
      return !prev;
    });
  }, [currentFrame, seekToFrame]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const restart = useCallback(() => {
    seekToFrame(0);
    setIsPlaying(true);
  }, [seekToFrame]);

  const nextScene = useCallback(() => {
    const activeScene = getCurrentScene(currentFrame);
    const currentIndex = SCENES.findIndex((s) => s.id === activeScene.id);
    if (currentIndex < SCENES.length - 1) {
      seekToFrame(SCENES[currentIndex + 1].startFrame);
    }
  }, [currentFrame, seekToFrame]);

  const prevScene = useCallback(() => {
    const activeScene = getCurrentScene(currentFrame);
    const currentIndex = SCENES.findIndex((s) => s.id === activeScene.id);
    if (currentIndex > 0) {
      seekToFrame(SCENES[currentIndex - 1].startFrame);
    } else {
      seekToFrame(0);
    }
  }, [currentFrame, seekToFrame]);

  // Handle playback loop with requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const frameDurationMs = 1000 / VIDEO_CONFIG.fps;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= frameDurationMs) {
        const framesToAdvance = Math.floor(elapsed / frameDurationMs);
        lastTimeRef.current = timestamp - (elapsed % frameDurationMs);

        setCurrentFrame((prev) => {
          const next = prev + framesToAdvance;
          if (next >= VIDEO_CONFIG.totalFrames) {
            setIsPlaying(false);
            return VIDEO_CONFIG.totalFrames;
          }
          return next;
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]);

  // Expose setVideoFrame to window for headless export
  useEffect(() => {
    window.setVideoFrame = (frame) => {
      setIsPlaying(false);
      seekToFrame(frame);
    };
    window.getVideoFrame = () => currentFrame;
    window.isTimelineReady = true;
  }, [seekToFrame, currentFrame]);

  const currentScene = getCurrentScene(currentFrame);
  const currentTime = currentFrame / VIDEO_CONFIG.fps;

  return {
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
    seekToSecond,
    nextScene,
    prevScene,
    setSubtitlesEnabled,
  };
}
