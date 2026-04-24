import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PHRASES = [
  'incrível',
  'memorável',
  'única',
  'mágica',
  'especial'
];

export const AnimatedWavyBanner: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 py-8 md:py-12 bg-white overflow-hidden" id="phrase-banner">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-48 md:h-72 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden flex flex-col items-center justify-center text-center bg-[#54C1C9] shadow-lg isolate">
          
          {/* Refined Wavy Pattern - Fixed for Safari */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <motion.div 
              animate={{ 
                x: [-15, 15, -15],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-[120%] h-[120%] absolute -left-[10%] -top-[10%] opacity-25"
            >
              <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cleanWaves" x="0" y="0" width="100" height="70" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
                    <path 
                      d="M 0 35 C 20 0, 80 70, 100 35" 
                      stroke="#429ca3" 
                      fill="transparent" 
                      strokeWidth="32"
                      strokeLinecap="round"
                    />
                    <path 
                      d="M 0 35 C 20 0, 80 70, 100 35" 
                      stroke="#429ca3" 
                      fill="transparent" 
                      strokeWidth="32"
                      strokeLinecap="round"
                      transform="translate(0, 35)"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cleanWaves)" />
              </svg>
            </motion.div>
          </div>

          {/* Content Container with fixed height to avoid layout shift */}
          <div className="relative z-10 px-6 flex flex-col items-center justify-center w-full">
            <span className="text-white uppercase tracking-[0.4em] text-[10px] md:text-sm font-heading font-bold mb-4 block">
              Sua celebração merece ser
            </span>
            
            <div className="h-20 md:h-28 flex items-center justify-center w-full relative overflow-visible">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 1.1 }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-white text-5xl md:text-9xl font-serif tracking-tighter font-bold absolute lowercase"
                >
                  {PHRASES[index]}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
