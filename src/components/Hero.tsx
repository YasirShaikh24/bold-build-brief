import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Blocks, Server, Brain } from 'lucide-react';

const techIcons = [
  { name: 'React', icon: Blocks },
  { name: 'Node.js', icon: Server },
  { name: 'Python', icon: Code },
  { name: 'AI / ML', icon: Brain },
];

export const Hero = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animated = sessionStorage.getItem('heroAnimated');
    if (!animated) {
      sessionStorage.setItem('heroAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  const handleScroll = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const videoVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const subheadingVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', x: -30 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-start overflow-hidden"
    >
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-24 md:pt-28 lg:pt-32">
        {/* Main Heading with Text Reveal + Motion Blur */}
        <motion.h1 
          initial={hasAnimated ? "visible" : "hidden"}
          animate="visible"
          variants={headingVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight leading-[1.1]"
          style={{
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <motion.span 
            className="block"
            initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            InTence
          </motion.span>
          <motion.span 
            className="block mt-1"
            style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Redefining the Future.
          </motion.span>
        </motion.h1>

        {/* Subtitle with Text Reveal + Motion Blur - Line by Line */}
        <motion.div>
          <motion.p 
            className="text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-1 leading-relaxed"
            style={{
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
            }}
            initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(12px)', x: -35 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            transition={{ duration: 1.2, delay: hasAnimated ? 0 : 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Creating latest solutions that redefine innovation.
          </motion.p>
          <motion.p 
            className="text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
            style={{
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
            }}
            initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(12px)', x: -35 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            transition={{ duration: 1.2, delay: hasAnimated ? 0 : 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Stay ahead with AI-powered technology for the future.
          </motion.p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          initial={hasAnimated ? "visible" : "hidden"}
          animate="visible"
          variants={buttonVariants}
          transition={{ delay: hasAnimated ? 0 : 0.6 }}
        >
          {/* Connect With Us Button - White Background with Black Text */}
          <motion.button
            onClick={() => handleScroll('#contact')}
            className="group relative px-6 py-2.5 bg-white text-black rounded-lg font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/30 hover:scale-[1.02]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="relative z-10"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Connect With Us
            </motion.span>
            {/* Subtle shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1
              }}
            />
          </motion.button>

          {/* What is InTence Button - Transparent with Black Border */}
          <motion.button
            onClick={() => handleScroll('#about')}
            className="group px-6 py-2.5 bg-white/5 text-white rounded-lg font-medium text-sm border border-black/80 hover:border-white/40 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            What is InTence?
          </motion.button>
        </motion.div>
      </div>

      {/* Scrolling Tech Strip */}
      <motion.div 
        className="relative w-full pb-16 z-10 flex flex-col items-center"
        initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: hasAnimated ? 0 : 1.8 }}
      >
        {/* Subtle line above */}
        <div className="w-full max-w-2xl h-px bg-white/10 mb-6" />
        
        {/* Container that shows only 3-4 items */}
        <div className="relative w-full max-w-2xl overflow-hidden">
          <div 
            className="flex gap-12 items-center animate-scroll"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {/* Duplicate array multiple times for seamless loop */}
            {[...techIcons, ...techIcons, ...techIcons, ...techIcons, ...techIcons, ...techIcons].map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 flex items-center gap-2"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.4)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <Icon 
                    className="w-4 h-4" 
                    style={{ 
                      opacity: 0.5,
                      strokeWidth: 1.5,
                    }} 
                  />
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};