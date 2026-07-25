import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { spawn, execSync } from 'child_process';
import { chromium } from 'playwright';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TOTAL_FRAMES = 1140; // 38 seconds * 30 FPS
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
const PORT = 5173;

const tempFramesDir = path.join(projectRoot, 'temp_frames');
const outputDir = path.join(projectRoot, 'output');
const outputFile = path.join(outputDir, 'sentinel-id-opening.mp4');

// Simple static HTTP file server for dist directory
function createStaticServer(distPath) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.woff2': 'font/woff2'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(distPath, req.url.split('?')[0]);
    if (filePath.endsWith('/') || filePath === distPath) {
      filePath = path.join(distPath, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(distPath, 'index.html'), (err2, indexData) => {
          if (err2) {
            res.writeHead(404);
            res.end('Not found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexData);
          }
        });
      } else {
        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });

  return server;
}

async function main() {
  console.log('====================================================');
  console.log(' SENTINEL-ID MP4 Video Export Engine');
  console.log('====================================================');

  if (!ffmpegPath) {
    console.error('ERROR: ffmpeg binary path not found from ffmpeg-static module.');
    process.exit(1);
  }
  console.log(`✓ FFmpeg binary detected: ${ffmpegPath}`);

  // 1. Build Vite project
  console.log('\n[1/5] Building static web application...');
  try {
    const viteBin = path.join(projectRoot, 'node_modules', '.bin', 'vite.cmd');
    if (fs.existsSync(viteBin)) {
      execSync(`"${viteBin}" build`, { cwd: projectRoot, stdio: 'inherit' });
    } else {
      execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
    }
    console.log('✓ Vite build complete.');
  } catch (err) {
    console.error('ERROR: Vite build failed:', err.message);
    process.exit(1);
  }

  const distDir = path.join(projectRoot, 'dist');
  if (!fs.existsSync(distDir)) {
    console.error('ERROR: dist directory missing after build.');
    process.exit(1);
  }

  // 2. Start local HTTP server
  console.log('\n[2/5] Starting local preview server on port 5173...');
  const server = createStaticServer(distDir);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`✓ Server running at http://localhost:${PORT}`);

  // 3. Prepare directories
  if (fs.existsSync(tempFramesDir)) {
    fs.rmSync(tempFramesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempFramesDir, { recursive: true });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 4. Launch Playwright headless browser
  console.log('\n[3/5] Capturing video frames via headless browser...');
  console.log(`Target: ${TOTAL_FRAMES} frames @ ${FPS} FPS (${WIDTH}x${HEIGHT})`);

  let browser;
  try {
    browser = await chromium.launch({
      channel: 'msedge',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('✓ Launched Microsoft Edge in headless mode.');
  } catch (err1) {
    try {
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      console.log('✓ Launched Chromium in headless mode.');
    } catch (err2) {
      console.error('ERROR launching browser:', err2.message);
      server.close();
      process.exit(1);
    }
  }

  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1
  });

  await page.goto(`http://localhost:${PORT}/?render=true`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const startTime = Date.now();

  for (let frame = 0; frame <= TOTAL_FRAMES; frame++) {
    await page.evaluate((f) => {
      if (window.setVideoFrame) {
        window.setVideoFrame(f);
      }
    }, frame);

    await page.waitForTimeout(10);

    const frameFileName = `frame_${String(frame).padStart(4, '0')}.png`;
    const framePath = path.join(tempFramesDir, frameFileName);

    await page.screenshot({
      path: framePath,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT }
    });

    if (frame % 60 === 0 || frame === TOTAL_FRAMES) {
      const percent = Math.round((frame / TOTAL_FRAMES) * 100);
      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(` Captured Frame ${frame}/${TOTAL_FRAMES} (${percent}%) - ${elapsedSec}s elapsed`);
    }
  }

  await browser.close();
  server.close();
  console.log('✓ All frames captured successfully.');

  // 5. Encode MP4 with FFmpeg
  console.log('\n[4/5] Encoding frames to H.264 MP4 with FFmpeg...');
  const inputPattern = path.join(tempFramesDir, 'frame_%04d.png');

  const ffmpegArgs = [
    '-y',
    '-framerate', String(FPS),
    '-i', `"${inputPattern}"`,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '18',
    '-preset', 'fast',
    `"${outputFile}"`
  ];

  try {
    execSync(`"${ffmpegPath}" ${ffmpegArgs.join(' ')}`, { stdio: 'inherit' });
    console.log('✓ FFmpeg encoding completed successfully.');
  } catch (err) {
    console.error('ERROR running FFmpeg:', err.message);
    process.exit(1);
  }

  // 6. Clean up temp frames
  console.log('\n[5/5] Cleaning up temporary frame files...');
  if (fs.existsSync(tempFramesDir)) {
    fs.rmSync(tempFramesDir, { recursive: true, force: true });
  }

  console.log('\n====================================================');
  console.log(' SUCCESS: MP4 Video Export Generated!');
  console.log(` Output Path: ${outputFile}`);
  console.log('====================================================');
}

main().catch((err) => {
  console.error('Fatal export error:', err);
  process.exit(1);
});
