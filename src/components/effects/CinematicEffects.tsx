'use client';

export default function CinematicEffects() {
  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          // We use a CSS blend mode to composite the SVG grain over the page.
          mixBlendMode: 'overlay',
          opacity: 0.4,
        }}
        aria-hidden="true"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full opacity-50"
        >
          <filter id="cinematic-grain">
            {/* Generates a high-frequency noise pattern */}
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="
              1 0 0 0 0,
              0 1 0 0 0,
              0 0 1 0 0,
              0 0 0 0.1 0" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematic-grain)"/>
        </svg>
      </div>

      {/* Subtle screen-edge vignette & chromatic aberration simulation via CSS box-shadows */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8), inset 0 0 20px rgba(168, 200, 255, 0.05)',
        }}
        aria-hidden="true"
      />

      <style>{`
        /* Global classes for elements that need chromatic aberration / bloom */
        .chromatic-text {
          text-shadow: 2px 0 0 rgba(255, 0, 0, 0.5), -2px 0 0 rgba(0, 255, 255, 0.5);
        }
        
        .cinematic-bloom {
          filter: drop-shadow(0 0 8px rgba(196, 145, 58, 0.6)) drop-shadow(0 0 20px rgba(196, 145, 58, 0.2));
        }

        /* Prevent the body from showing a scrollbar for the fixed overlays if they accidentally overflow */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
