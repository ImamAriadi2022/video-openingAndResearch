import { VIDEO_CONFIG } from './video.js';

export const SCENES = [
  {
    id: 'opening',
    name: '01. Opening',
    start: 0,
    end: 2,
    startFrame: 0,
    endFrame: 60,
    narration: null
  },
  {
    id: 'daily-banking',
    name: '02. Daily Banking',
    start: 2,
    end: 5,
    startFrame: 60,
    endFrame: 150,
    narration: "Mobile banking telah menjadi bagian dari aktivitas kita sehari-hari."
  },
  {
    id: 'convenience',
    name: '03. Convenience',
    start: 5,
    end: 8,
    startFrame: 150,
    endFrame: 240,
    narration: "Transaksi kini dapat dilakukan dengan cepat, mudah, dan dalam hitungan detik."
  },
  {
    id: 'threat',
    name: '04. Threat Shift',
    start: 8,
    end: 10,
    startFrame: 240,
    endFrame: 300,
    narration: "Namun kemudahan ini juga membuka ruang bagi modus kejahatan digital."
  },
  {
    id: 'incoming-call',
    name: '05. Incoming Call',
    start: 10,
    end: 13,
    startFrame: 300,
    endFrame: 390,
    narration: "Satu panggilan bisa menjadi awal pengambilalihan akun."
  },
  {
    id: 'social-engineering',
    name: '06. Social Engineering',
    start: 13,
    end: 16,
    startFrame: 390,
    endFrame: 480,
    narration: "Melalui social engineering, pelaku dapat memperoleh kredensial yang sah."
  },
  {
    id: 'authentication',
    name: '07. PIN & OTP Verified',
    start: 16,
    end: 19,
    startFrame: 480,
    endFrame: 570,
    narration: "PIN benar. OTP benar."
  },
  {
    id: 'scam-research',
    name: '08. Scale of Fraud',
    start: 19,
    end: 24,
    startFrame: 570,
    endFrame: 720,
    narration: "Data yang kami gunakan mencatat lebih dari 200 ribu aduan scam, dengan estimasi kerugian mencapai Rp6 triliun dalam satu tahun."
  },
  {
    id: 'otp-research',
    name: '09. OTP Fraud Loss',
    start: 24,
    end: 29,
    startFrame: 720,
    endFrame: 870,
    narration: "Bahkan, kerugian akibat penipuan berbasis OTP saja diperkirakan mencapai Rp2,5 triliun."
  },
  {
    id: 'credentials-valid',
    name: '10. Credentials Valid',
    start: 29,
    end: 32,
    startFrame: 870,
    endFrame: 960,
    narration: "Masalahnya, ketika kredensial benar, aktivitas pelaku masih dapat terlihat sah."
  },
  {
    id: 'identity-gap',
    name: '11. Identity Gap',
    start: 32,
    end: 35,
    startFrame: 960,
    endFrame: 1050,
    narration: "Sistem mengenali kredensialnya. Tapi siapa yang sebenarnya memegang perangkat?"
  },
  {
    id: 'sentinel-reveal',
    name: '12. Sentinel-ID Reveal',
    start: 35,
    end: 38,
    startFrame: 1050,
    endFrame: 1140,
    narration: "Di sinilah Sentinel-ID bekerja."
  }
];

export function getCurrentScene(frame) {
  const currentSec = frame / VIDEO_CONFIG.fps;
  for (let i = SCENES.length - 1; i >= 0; i--) {
    if (currentSec >= SCENES[i].start) {
      return SCENES[i];
    }
  }
  return SCENES[0];
}

export function getCurrentSubtitle(frame) {
  const scene = getCurrentScene(frame);
  return scene ? scene.narration : null;
}
