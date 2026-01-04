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

export const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content - Centered */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-24 pb-16">
        {/* Main Heading - Large, bold, straight fonts */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold mb-6 tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-foreground block">InTence</span>
          <span className="text-foreground block mt-2">Redefining the Future.</span>
        </motion.h1>

        {/* Subtitle - Clean, modern, well-spaced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-2 leading-relaxed">
            Creating latest solutions that redefine innovation.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Stay ahead with AI-powered technology for the future.
          </p>
        </motion.div>

        {/* CTA Button - Premium with glow */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <button
            onClick={() => handleScroll('#contact')}
            className="group relative px-8 py-4 text-base font-medium rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10">Contact With InTence</span>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-primary/50 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Tech Stack Icons Row */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
              title={tech.name}
            >
              <tech.icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
