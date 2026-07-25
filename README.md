# Sentinel-ID Motion Graphics

Motion graphics opening video project for **SENTINEL-ID** by **Dizipher Team**.

Built using Vite, React (JavaScript/JSX), and a deterministic frame-by-frame rendering engine for 1920x1080 Full HD 30 FPS video production.

---

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Preview in Browser
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to preview the interactive video player with play/pause, timeline scrubbing, frame step controls, and subtitle toggle.

### Export MP4 Video
```bash
npm run export:video
```
This automatically builds the web app, captures all 1140 frames deterministically at 1920×1080 resolution, and encodes the final H.264 video with FFmpeg.

---

## 📹 Output

- **Path:** `output/sentinel-id-opening.mp4`
- **Resolution:** 1920 × 1080 (16:9 Aspect Ratio)
- **Frame Rate:** 30 FPS
- **Duration:** 38.00 seconds (1140 frames)

---

## 🛠️ Architecture & Configuration

- **Scene & Narration Timeline:** [`src/config/timeline.js`](file:///c:/programming/video-openingAndResearch/src/config/timeline.js)
  - Configures all 12 scenes, start/end frames, durations, and Indonesian narration script.
- **Asset Mapping:** [`src/config/assets.js`](file:///c:/programming/video-openingAndResearch/src/config/assets.js)
  - Centralized map of all visual design assets (`bahan/desain`) and research evidence (`bahan/research`).
- **Video Specifications:** [`src/config/video.js`](file:///c:/programming/video-openingAndResearch/src/config/video.js)
  - Sets width (1920), height (1080), aspect ratio (16:9), and target FPS (30).
- **Deterministic Animation Utilities:** [`src/utils/animation.js`](file:///c:/programming/video-openingAndResearch/src/utils/animation.js)
  - Provides frame-based interpolation, easing, count-up, fade, scale, slide, and stagger utilities.
- **Optional Audio Directory:** `public/audio/`
  - Put `narration.mp3` or `music.mp3` here for voiceover/music sync.