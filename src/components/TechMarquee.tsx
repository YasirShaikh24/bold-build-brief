import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const techLogos = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Python', icon: '🐍' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Figma', icon: '🎯' },
  { name: 'Java', icon: '☕' },
  { name: 'Vue.js', icon: '💚' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'Flask', icon: '🌶️' },
  { name: 'MongoDB', icon: '🍃' },
];

// Duplicate for seamless loop
const allLogos = [...techLogos, ...techLogos];

export const TechMarquee = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background with purple glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[200px] pointer-events-none" />

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-foreground">
            Seamless Integrations for
            <br />
            <span className="text-gradient">Maximum Efficiency.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            InTence seamlessly integrates with leading tools and platforms, ensuring
            a smooth and efficient workflow.
          </p>
          <button
            onClick={() => handleScroll('#about')}
            className="btn-purple"
          >
            View About InTence
          </button>
        </motion.div>

        {/* Marquee */}
        <div className="relative mt-16">
          {/* Center glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/40 rounded-full blur-3xl pointer-events-none" />
          
          {/* Marquee container */}
          <div className="overflow-hidden py-8">
            <motion.div
              className="flex gap-8"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {allLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 w-14 h-14 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm flex items-center justify-center text-2xl hover:scale-110 hover:border-primary/50 transition-all cursor-default"
                  title={logo.name}
                >
                  {logo.icon}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
