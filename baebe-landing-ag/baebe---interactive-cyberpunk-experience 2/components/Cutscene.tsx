import React, { useEffect, useState } from 'react';

interface CutsceneProps {
  sceneId: '1' | '2' | '3';
  onComplete: () => void;
}

export const Cutscene: React.FC<CutsceneProps> = ({ sceneId, onComplete }) => {
  const [overlayText, setOverlayText] = useState<string[]>([]);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    if (sceneId === '1') {
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> SYSTEM BREACH DETECTED"]), 1000));
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> ALTITUDE: 200,000 FT"]), 2500));
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> VELOCITY: ACCELERATING"]), 4000));
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> TARGET: Taivalu"]), 5500));
      timeouts.push(setTimeout(() => setVideoEnded(true), 8000));
    } else if (sceneId === '2') {
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> RESONANCE DETECTED"]), 1000));
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> Frequency tuning..."]), 3000));
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> RESONANCE LEVEL: 2 → 3"]), 5000));
      timeouts.push(setTimeout(() => setVideoEnded(true), 8000));
    } else if (sceneId === '3') {
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> NETWORK CONNECTION SEVERED"]), 1000));
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> Freedom protocol activated..."]), 3000));
      timeouts.push(setTimeout(() => setOverlayText(prev => [...prev, "> ACCESS GRANTED: FULL RESONANCE"]), 6000));
      timeouts.push(setTimeout(() => setVideoEnded(true), 9000));
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [sceneId]);

  useEffect(() => {
    if (videoEnded) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [videoEnded, onComplete]);

  // Visual styling based on scene
  const bgClass = sceneId === '1'
    ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black'
    : sceneId === '2'
      ? 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-800 via-black to-black'
      : 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-black to-black';

  return (
    <div className={`h-screen w-full relative overflow-hidden flex items-center justify-center text-white font-mono ${bgClass}`}>
      {/* Abstract Visual Representation of Video */}
      <div className="absolute inset-0 opacity-30">
        {sceneId === '1' && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border-2 border-white opacity-20 animate-ping"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10 animate-[glitch_2s_infinite]"></div>
          </div>
        )}
        {sceneId === '2' && (
          <div className="w-full h-full grid grid-cols-12 gap-4 opacity-20">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="bg-white rounded-sm animate-pulse" style={{ animationDelay: `${Math.random()}s` }}></div>
            ))}
          </div>
        )}
        {sceneId === '3' && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-[200px] text-white opacity-10 animate-pulse font-bold">FREEDOM</div>
          </div>
        )}
      </div>

      {/* Text Overlays */}
      <div className="z-10 flex flex-col items-center gap-4">
        {overlayText.map((line, i) => (
          <div key={i} className="text-xl md:text-3xl font-bold text-glow animate-glitch">
            {line}
          </div>
        ))}
      </div>


    </div>
  );
};