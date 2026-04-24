import { FC, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import confetti from 'canvas-confetti';

const TESTIMONIAL_IMAGES = [
  'https://files.catbox.moe/g1gsns.jpg',
  'https://files.catbox.moe/g1gsns.jpg',
  'https://files.catbox.moe/g1gsns.jpg',
  'https://files.catbox.moe/g1gsns.jpg',
  'https://files.catbox.moe/g1gsns.jpg',
  'https://files.catbox.moe/g1gsns.jpg',
];

export const Testimonials: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      // Duolingo-style realistic confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden" id="testimonials">
      <div className="text-center mb-12 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-text-dark mb-4"
        >
          Quem já comemorou com a gente
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-light"
        >
          Milhares de festas e memórias inesquecíveis espalhadas pelo Brasil.
        </motion.p>
      </div>

      {/* Continuous Infinite Carousel - Full Width */}
      <div className="relative overflow-hidden group w-full">
        <motion.div 
          className="flex gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...TESTIMONIAL_IMAGES, ...TESTIMONIAL_IMAGES, ...TESTIMONIAL_IMAGES].map((img, idx) => (
            <div
              key={idx}
              className="w-[180px] md:w-[220px] aspect-[9/16] rounded-2xl overflow-hidden relative shrink-0"
            >
              <img 
                src={img} 
                alt={`Depoimento ${idx + 1}`} 
                className="w-full h-full object-cover px-1"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
        
        <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

