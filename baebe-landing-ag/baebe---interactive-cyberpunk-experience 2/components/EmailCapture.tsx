import React, { useState } from 'react';

interface EmailCaptureProps {
  onComplete: (email: string) => void;
  onSubscribe: () => void;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({ onComplete, onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'verification'>('email');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'email' && email) {
      // Simulate sending code
      setStep('verification');
    } else if (step === 'verification' && verificationCode) {
      // Validate code (mock)
      onComplete(email);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-gray-300 font-mono p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <style>{`
        @keyframes scan-on {
          0% {
            clip-path: inset(0 0 100% 0);
            opacity: 0;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }
        .scan-reveal {
          animation: scan-on 2s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
          opacity: 0; /* Start hidden */
        }
        .scan-delay-1 { animation-delay: 0.5s; }
        .scan-delay-2 { animation-delay: 1.5s; }
        
        @keyframes iridescent {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .text-iridescent {
          background: linear-gradient(270deg, #0ea5e9, #10b981, #06b6d4, #3b82f6);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: iridescent 4s ease infinite;
        }
      `}</style>
      <div className="max-w-2xl w-full space-y-8 z-10">
        <div className="space-y-2 text-center md:text-left scan-reveal">
          <div className="text-gray-200 font-bold text-xl md:text-3xl animate-pulse text-glow shadow-gray-500/50">{"> QUANTUM SUBNET: SOUL_MANIFOLD"}</div>
          <div className="text-lg text-gray-400">{"> Secure connection established. Identity verification required."}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8 border border-gray-800 p-6 md:p-8 bg-black/80 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-sm relative scan-reveal scan-delay-1">
          {/* Decorative corner markers */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-500"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-500"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-500"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-500"></div>

          {step === 'email' ? (
            <>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold tracking-widest bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">{"&gt; ENTER IDENTITY HASH (EMAIL):"}</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border-2 border-gray-800 text-gray-300 p-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all placeholder-gray-800 font-mono"
                  placeholder="identity@soul.net"
                  autoFocus
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 border border-gray-500 text-gray-400 hover:bg-gray-200 hover:text-black transition-all font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  [ INITIALIZE LINK ]
                </button>
                <button
                  type="button"
                  onClick={onSubscribe}
                  className="flex-1 py-3 px-6 bg-gray-900/30 border border-gray-700 text-gray-500 hover:bg-gray-800 hover:border-gray-400 hover:text-gray-300 transition-all font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                >
                  [ SUBNET ACCESS - $10/MO ]
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="text-green-400 text-sm mb-4 animate-pulse">{"> TRANSMISSION SENT. AWAITING VERIFICATION CODE."}</div>
                <label htmlFor="code" className="block text-sm font-bold tracking-widest bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">{"&gt; ENTER ACCESS CODE:"}</label>
                <input
                  id="code"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full bg-black border-2 border-gray-800 text-gray-300 p-3 focus:outline-none focus:border-gray-400 focus:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all placeholder-gray-800 font-mono tracking-[0.5em] text-center text-xl"
                  placeholder="XXXXXX"
                  maxLength={6}
                  autoFocus
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 border border-gray-500 text-gray-400 hover:bg-gray-200 hover:text-black transition-all font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  [ VERIFY ACCESS ]
                </button>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="flex-1 py-3 px-6 bg-gray-900/30 border border-gray-700 text-gray-500 hover:bg-gray-800 hover:border-gray-400 hover:text-gray-300 transition-all font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                >
                  [ RESTART SEQUENCE ]
                </button>
              </div>
            </>
          )}

          <div className="text-xs text-gray-600 text-center mt-4">
            {"> By verifying identity, you agree to receive encrypted transmission updates."}
          </div>
        </form>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 right-0 p-4 text-xs text-gray-800">SOUL_MANIFOLD_V.2025</div>

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01),rgba(255,255,255,0.02))] bg-[length:100%_2px,3px_100%] z-50 opacity-10"></div>
    </div>
  );
};