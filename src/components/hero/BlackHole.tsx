'use client';

export default function BlackHole() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      {/* 
        The entire container pulses slightly 
        animation: scale 1.0 -> 1.03 -> 1.0 over 4s ease infinite 
      */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{
          animation: 'pulseScale 4s ease-in-out infinite',
        }}
      >
        {/* Accretion disc - rotates continuously */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(196,145,58,0.1) 0%, rgba(245,158,11,0.8) 25%, rgba(196,145,58,0.1) 50%, rgba(245,158,11,0.8) 75%, rgba(196,145,58,0.1) 100%)',
            filter: 'blur(12px)',
            animation: 'spin 20s linear infinite',
            transform: 'scaleY(0.6) rotateZ(-20deg)', // Tilt it in 3D-ish space
          }}
        />

        {/* Inner accretion ring for depth */}
        <div 
          className="absolute inset-[15%] rounded-full border-[20px] border-amber-600/30"
          style={{
            filter: 'blur(8px)',
            animation: 'spin 12s linear infinite reverse',
            transform: 'scaleY(0.6) rotateZ(20deg)',
          }}
        />

        {/* Faint blue-white gravitational lensing arc on top-left */}
        <svg 
          className="absolute inset-[-10%] w-[120%] h-[120%] opacity-40 blur-md"
          viewBox="0 0 100 100"
        >
          <ellipse cx="40" cy="30" rx="45" ry="15" fill="none" stroke="rgba(147,197,253,0.5)" strokeWidth="4" transform="rotate(-30 40 30)" />
        </svg>

        {/* The Black Hole Disc itself */}
        <div 
          className="relative z-10 w-[55%] h-[55%] rounded-full bg-black shadow-[0_0_40px_10px_rgba(0,0,0,1)_inset,0_0_20px_5px_rgba(245,158,11,0.5)]"
          style={{
            background: '#000000',
          }}
        />
      </div>

      <style>{`
        @keyframes pulseScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes spin {
          from { transform: scaleY(0.6) rotate(0deg); }
          to { transform: scaleY(0.6) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
