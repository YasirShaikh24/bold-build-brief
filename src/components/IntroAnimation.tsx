import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  children: React.ReactNode;
}

export const IntroAnimation = ({ children }: IntroAnimationProps) => {
  const [showIntro, setShowIntro] = useState(true);
  const [stage, setStage] = useState<'initial' | 'fly' | 'done'>('initial');

  useEffect(() => {
    const seen = sessionStorage.getItem('introSeen');
    if (seen) {
      setShowIntro(false);
      return;
    }

    const timers = [
      // stay in center for 2 seconds
      setTimeout(() => {
        setStage('fly');
      }, 2000),

      // finish animation
      setTimeout(() => {
        setStage('done');
        setShowIntro(false);
        sessionStorage.setItem('introSeen', 'true');
      }, 4200),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* LOGO */}
            <motion.div
              initial={{ y: 0, scale: 1, opacity: 1 }}
              animate={
                stage === 'fly'
                  ? {
                      y: -800,
                      scale: 1.3,
                      opacity: 0,
                    }
                  : {}
              }
              transition={{
                duration: 2.2,
                ease: [0.22, 1, 0.36, 1], // smooth cinematic
              }}
            >
              <img
                src="/logo-eagle.png"
                alt="Eagle Logo"
                className="h-44 md:h-60 w-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 50px rgba(139,92,246,0.8))',
                }}
              />
            </motion.div>

            {/* SOFT GLOW */}
            <div
              className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
              style={{
                background:
                  'radial-gradient(circle, rgba(139,92,246,0.6), transparent)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN WEBSITE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </>
  );
};
