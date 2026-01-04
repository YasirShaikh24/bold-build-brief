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
  { name: 'React', icon: Blocks },
  { name: 'Node.js', icon: Server },
  { name: 'Python', icon: Code },
  { name: 'AI / ML', icon: Brain },
];

export const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-24">
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
            className="group px-8 py-3.5 bg-white/5 text-white rounded-xl font-medium text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            What is InTence?
          </button>
        </motion.div>
      </div>

      {/* Scrolling Tech Strip - Centered, 3-4 Items Visible */}
      <div className="relative w-full pb-20 z-10 flex flex-col items-center">
        {/* Subtle line above - centered */}
        <div className="w-full max-w-2xl h-px bg-white/10 mb-8" />
        
        {/* Container that shows only 3-4 items */}
        <div className="relative w-full max-w-2xl overflow-hidden">
          <motion.div 
            className="flex gap-16 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              x: ['0%', '-50%']
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 },
              y: { duration: 0.8, delay: 0.6 },
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }
            }}
          >
            {/* Duplicate array multiple times for seamless loop */}
            {[...techIcons, ...techIcons, ...techIcons, ...techIcons, ...techIcons, ...techIcons].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-3"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.4)',
                  letterSpacing: '0.02em',
                }}
              >
                <tech.icon 
                  className="w-5 h-5" 
                  style={{ 
                    opacity: 0.5,
                    strokeWidth: 1.5,
                  }} 
                />
                <span>{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};