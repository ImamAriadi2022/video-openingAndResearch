import React from 'react';

export function HandHoldingPhoneMockup({ children, className = '' }) {
  // SVG based hand holding phone mockup
  // This draws the hand and the blue-bordered smartphone programmatically,
  // matching Slide 16_9 - 4.png / Slide 16_9 - 5.png outlines exactly.
  
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: '800px', height: '800px' }}>
      
      {/* SVG drawing the hand behind and phone body */}
      <svg 
        viewBox="0 0 800 800" 
        className="w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Palm & Wrist (Background fill and outline) */}
        <path 
          d="M 520 540 C 620 620 730 750 710 800 C 690 850 560 900 480 820 L 320 670 C 370 610 420 570 520 540 Z" 
          fill="#fce7f3" 
          stroke="#000000" 
          strokeWidth="3" 
          strokeLinejoin="round"
        />

        {/* Right thumb/grip part of the hand */}
        <path 
          d="M 580 260 C 585 240 595 245 610 280 C 630 320 660 420 670 500 C 680 580 670 650 670 700" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Back hand extension under the phone */}
        <path 
          d="M 330 240 C 300 240 290 280 340 330 C 360 350 375 355 375 390 C 375 420 370 440 330 450 C 300 455 290 495 340 540 C 360 560 375 570 375 600" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* The Blue Smartphone Body */}
        {/* External phone frame */}
        <rect 
          x="350" 
          y="120" 
          width="260" 
          height="520" 
          rx="32" 
          ry="32" 
          fill="#f8fafc" 
          stroke="#0052d9" 
          strokeWidth="10" 
        />

        {/* Internal Screen Bezel Border */}
        <rect 
          x="357" 
          y="127" 
          width="246" 
          height="506" 
          rx="25" 
          ry="25" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="2" 
          opacity="0.15"
        />

        {/* Notch at the top */}
        <path 
          d="M 430 120 C 430 135 440 145 455 145 L 505 145 C 520 145 530 135 530 120 Z" 
          fill="#0052d9" 
        />
        {/* Camera and speaker details in notch */}
        <circle cx="515" cy="132" r="3" fill="#ffffff" opacity="0.4" />
        <rect x="460" y="128" width="30" height="4" rx="2" fill="#ffffff" opacity="0.4" />

        {/* Front Finger Overlays (Wrapping over the left side of the screen) */}
        {/* Finger 1 (Top Left) */}
        <path 
          d="M 353 285 C 315 285 305 320 350 345 C 360 350 368 340 368 330 C 368 310 365 285 353 285 Z" 
          fill="#fce7f3" 
          stroke="#000000" 
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Finger 1 Nail detail */}
        <path d="M 320 305 C 315 315 325 325 330 320" fill="none" stroke="#000000" strokeWidth="1.5" />

        {/* Finger 2 (Middle Left) */}
        <path 
          d="M 353 370 C 315 370 305 405 350 430 C 360 435 368 425 368 415 C 368 395 365 370 353 370 Z" 
          fill="#fce7f3" 
          stroke="#000000" 
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Finger 2 Nail detail */}
        <path d="M 320 390 C 315 400 325 410 330 405" fill="none" stroke="#000000" strokeWidth="1.5" />

        {/* Finger 3 (Lower Middle Left) */}
        <path 
          d="M 353 455 C 315 455 305 490 350 515 C 360 520 368 510 368 500 C 368 480 365 455 353 455 Z" 
          fill="#fce7f3" 
          stroke="#000000" 
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Finger 3 Nail detail */}
        <path d="M 320 475 C 315 485 325 495 330 490" fill="none" stroke="#000000" strokeWidth="1.5" />

        {/* Finger 4 (Bottom Left) */}
        <path 
          d="M 353 540 C 320 540 310 575 355 600 C 365 605 373 595 373 585 C 373 565 365 540 353 540 Z" 
          fill="#fce7f3" 
          stroke="#000000" 
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Finger 4 Nail detail */}
        <path d="M 325 560 C 320 570 330 580 335 575" fill="none" stroke="#000000" strokeWidth="1.5" />
      </svg>

      {/* The HTML Screen Container overlaid directly onto the phone screen area */}
      <div 
        className="absolute overflow-hidden bg-[#f1f5f9]"
        style={{
          top: '125px',
          left: '355px',
          width: '250px',
          height: '510px',
          borderRadius: '26px',
          zIndex: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}
