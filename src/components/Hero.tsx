import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Blocks, 
  FileCode, 
  Palette, 
  Coffee, 
  Server, 
  Brain, 
  Database, 
  Cloud 
} from 'lucide-react';

const techIcons = [
  { name: 'JavaScript', icon: FileCode },
  { name: 'React', icon: Blocks },
  { name: 'HTML', icon: Code },
  { name: 'CSS', icon: Palette },
  { name: 'Java', icon: Coffee },
  { name: 'Node.js', icon: Server },
  { name: 'Python', icon: Code },
  { name: 'AI / ML', icon: Brain },
  { name: 'Database', icon: Database },
  { name: 'Cloud', icon: Cloud },
];

// Triple the array for seamless infinite scroll
const allIcons = [...techIcons, ...techIcons, ...techIcons];

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Animated gradient orbs - subtle parallax */}
      <motion.div 
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-24 pb-32">
        {/* Main Heading - Light, Clean Typography */}
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-[1.1]"
          style={{
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'rgba(255, 255, 255, 0.95)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block">InTence</span>
          <span 
            className="block mt-2"
            style={{ color: 'rgba(255, 255, 255, 0.85)' }}
          >
            Redefining the Future.
          </span>
        </motion.h1>

        {/* Subtitle - Muted, Clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p 
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-2 leading-relaxed"
            style={{
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Creating latest solutions that redefine innovation.
          </p>
          <p 
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Stay ahead with AI-powered technology for the future.
          </p>
        </motion.div>

        {/* Buttons - Minimal, Premium */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <button
            onClick={() => handleScroll('#contact')}
            className="group relative px-8 py-3.5 bg-white text-black rounded-xl font-medium text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="relative z-10">Connect With Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            className="group px-8 py-3.5 bg-white/5 text-white rounded-xl font-medium text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            What is InTence?
          </button>
        </motion.div>
      </div>

      {/* Bottom Curved Purple Glow - EXACT MATCH TO REFERENCE */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] pointer-events-none overflow-hidden">
        {/* Main curved purple glow - wider and more intense */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '200%',
            height: '300px',
            background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0.4) 25%, rgba(99, 102, 241, 0.3) 40%, rgba(139, 92, 246, 0.15) 60%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Secondary glow layer for depth */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: '180%',
            height: '250px',
            background: 'radial-gradient(ellipse 90% 50% at 50% 100%, rgba(99, 102, 241, 0.5) 0%, rgba(139, 92, 246, 0.3) 30%, rgba(99, 102, 241, 0.2) 50%, transparent 80%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Bottom edge glow - more intense */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0.2) 40%, transparent)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Scrolling Tech Icon Strip - EXACT MATCH TO REFERENCE */}
      <div className="absolute bottom-10 left-0 right-0 pointer-events-none overflow-hidden">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
        
        {/* Scrolling container - smooth left animation */}
        <motion.div 
          className="flex gap-6 py-3"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {allIcons.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-sm"
              style={{
                fontSize: '0.875rem',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.35)',
              }}
            >
              <tech.icon 
                className="w-5 h-5" 
                style={{ 
                  opacity: 0.4,
                  strokeWidth: 1.5,
                }} 
              />
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Vignette effect on edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }} />
      </div>
    </section>
  );
};