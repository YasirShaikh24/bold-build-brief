import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

// Tech logos with SVG-style minimal icons
const techLogos = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'Tailwind', color: '#38BDF8' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Python', color: '#FFD43B' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Java', color: '#ED8B00' },
  { name: 'Vue.js', color: '#4FC08D' },
  { name: 'MySQL', color: '#00758F' },
  { name: 'Flask', color: '#FFFFFF' },
  { name: 'MongoDB', color: '#4DB33D' },
];

// Duplicate for seamless loop
const allLogos = [...techLogos, ...techLogos, ...techLogos];

export const TechMarquee = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background with subtle purple glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Link2 className="w-4 h-4" />
            Integrations
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-foreground">
            Seamless Integrations for
            <br />
            <span className="text-muted-foreground">Maximum Efficiency.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
            InTence seamlessly integrates with leading tools and platforms, ensuring
            a smooth and efficient workflow.
          </p>
          <button
            onClick={() => handleScroll('#about')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            View About InTence
          </button>
        </motion.div>

        {/* Marquee */}
        <div className="relative mt-16">
          {/* Center glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
          
          {/* Marquee container */}
          <div className="overflow-hidden py-6">
            <motion.div
              className="flex gap-6 md:gap-8"
              animate={{ x: ['0%', '-33.33%'] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {allLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card/60 border border-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:border-primary/40 transition-all duration-300 cursor-default group"
                  title={logo.name}
                >
                  {/* Simple circle with first letter */}
                  <div 
                    className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      backgroundColor: `${logo.color}20`,
                      color: logo.color
                    }}
                  >
                    {logo.name.charAt(0)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};
