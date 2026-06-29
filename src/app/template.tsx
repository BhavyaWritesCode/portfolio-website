'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--dust)',
          transformOrigin: 'left',
          zIndex: 1002,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </>
  );
}
