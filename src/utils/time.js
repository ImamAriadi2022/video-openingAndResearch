import { VIDEO_CONFIG } from '../config/video.js';

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  
  const padMins = String(mins).padStart(2, '0');
  const padSecs = String(secs).padStart(2, '0');
  const padMs = String(ms).padStart(2, '0');
  
  return `${padMins}:${padSecs}.${padMs}`;
}

export function formatFrame(frame) {
  const currentSec = frame / VIDEO_CONFIG.fps;
  return `${formatTime(currentSec)} (${frame}/${VIDEO_CONFIG.totalFrames})`;
}
