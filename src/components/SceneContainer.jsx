import React from 'react';
import { OpeningScene } from '../scenes/OpeningScene.jsx';
import { DailyBankingScene } from '../scenes/DailyBankingScene.jsx';
import { ConvenienceScene } from '../scenes/ConvenienceScene.jsx';
import { ThreatScene } from '../scenes/ThreatScene.jsx';
import { IncomingCallScene } from '../scenes/IncomingCallScene.jsx';
import { SocialEngineeringScene } from '../scenes/SocialEngineeringScene.jsx';
import { AuthenticationScene } from '../scenes/AuthenticationScene.jsx';
import { ScamResearchScene } from '../scenes/ScamResearchScene.jsx';
import { OtpResearchScene } from '../scenes/OtpResearchScene.jsx';
import { CredentialsScene } from '../scenes/CredentialsScene.jsx';
import { IdentityGapScene } from '../scenes/IdentityGapScene.jsx';
import { SentinelRevealScene } from '../scenes/SentinelRevealScene.jsx';

export function SceneContainer({ currentFrame }) {
  // Render active scenes based on current frame to allow seamless cross-fades or exact frame scrubbing
  return (
    <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none">
      {currentFrame >= 0 && currentFrame < 60 && (
        <OpeningScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 60 && currentFrame < 150 && (
        <DailyBankingScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 150 && currentFrame < 240 && (
        <ConvenienceScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 240 && currentFrame < 300 && (
        <ThreatScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 300 && currentFrame < 390 && (
        <IncomingCallScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 390 && currentFrame < 480 && (
        <SocialEngineeringScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 480 && currentFrame < 570 && (
        <AuthenticationScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 570 && currentFrame < 720 && (
        <ScamResearchScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 720 && currentFrame < 870 && (
        <OtpResearchScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 870 && currentFrame < 960 && (
        <CredentialsScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 960 && currentFrame < 1050 && (
        <IdentityGapScene currentFrame={currentFrame} />
      )}
      {currentFrame >= 1050 && currentFrame <= 1140 && (
        <SentinelRevealScene currentFrame={currentFrame} />
      )}
    </div>
  );
}
