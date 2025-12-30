import { motion } from 'framer-motion';
import { Headphones, Sparkles, Clock } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Fast Responses',
    description: 'Get timely answers to your questions.',
  },
  {
    icon: Sparkles,
    title: 'Expert Guidance',
    description: 'Our team understands both design and tech.',
  },
  {
    icon: Headphones,
    title: 'Continuous Help',
    description: "Support doesn't stop after launch.",
  },
];

const floatingImages = [
  { src: '/projects/project-1/image-1.png', rotation: -15, delay: 0 },
  { src: '/projects/project-1/image-2.png', rotation: -8, delay: 0.1 },
  { src: '/projects/project-2/image-1.png', rotation: 0, delay: 0.2 },
  { src: '/projects/project-2/image-2.png', rotation: 8, delay: 0.3 },
  { src: '/projects/project-1/image-3.png', rotation: 15, delay: 0.4 },
];

export const SupportSection = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
      
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
            <Headphones className="w-4 h-4" />
            24/7 Support
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4 text-foreground">
            Here When You
            <br />
            <span className="text-muted-foreground">Need Us Most Important.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            InTence comes with dedicated support to help you launch and maintain
            your site without friction.
          </p>
          <button
            onClick={() => handleScroll('#about')}
            className="btn-purple"
          >
            View About InTence
          </button>
        </motion.div>

        {/* Floating Images */}
        <motion.div 
          className="flex justify-center items-center gap-3 md:gap-4 mb-16 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {floatingImages.map((img, index) => (
            <motion.div
              key={index}
              className="relative w-20 h-28 md:w-28 md:h-40 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 50, rotate: img.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: img.rotation }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: img.delay }}
              whileHover={{ y: -10, scale: 1.05 }}
              style={{ transform: `rotate(${img.rotation}deg)` }}
            >
              <img
                src={img.src}
                alt="Project preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.backgroundColor = 'hsl(var(--card))';
                }}
              />
              {/* Floating labels */}
              {index === 0 && (
                <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full bg-primary text-xs text-primary-foreground whitespace-nowrap">
                  Hey, It's me!
                </div>
              )}
              {index === floatingImages.length - 1 && (
                <div className="absolute -top-3 -left-2 px-3 py-1 rounded-full bg-primary text-xs text-primary-foreground whitespace-nowrap">
                  Problem Solved
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
