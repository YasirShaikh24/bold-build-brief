import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Globe, Code2, Smartphone } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'We build high-performance, visually stunning websites that leave lasting impressions.',
  },
  {
    icon: Code2,
    title: 'Software Development',
    description: 'Custom software solutions tailored to streamline your business operations.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development + AI Integration',
    description: 'Intelligent mobile apps powered by cutting-edge AI technology.',
  },
];

const aboutText = "Built on creativity, collaboration, and top excellence, InTence is a dynamic team of industry experts committed to achieving exceptional great results...";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "end 0.5"]
  });

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Split text into words for progressive reveal
  const words = aboutText.split(' ');

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Badge */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
            <Home className="w-4 h-4" />
            About Us
          </span>
        </motion.div>

        {/* Main Narrative Text with Scroll Reveal Effect */}
        <div ref={textRef} className="text-center max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.4] md:leading-[1.5]">
            {words.map((word, index) => {
              const start = index / words.length;
              const end = start + (1 / words.length);
              
              return (
                <Word key={index} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </h2>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="flex justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => handleScroll('#contact')}
            className="px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            Book an Appointment
          </button>
        </motion.div>

        {/* Service Cards - 3 Equal Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative p-8 rounded-2xl bg-card/30 border border-white/10 backdrop-blur-md hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="relative text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Word component for scroll-based reveal
const Word = ({ 
  children, 
  progress, 
  range 
}: { 
  children: string; 
  progress: any; 
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(
    progress, 
    range, 
    ['rgba(255,255,255,0.2)', 'rgba(255,255,255,1)']
  );
  
  return (
    <motion.span 
      style={{ opacity, color }} 
      className="inline-block mr-[0.25em] transition-colors duration-300"
    >
      {children}
    </motion.span>
  );
};
