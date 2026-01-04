import { motion } from 'framer-motion';
import { Sparkles, Clock, Headphones, Eye } from 'lucide-react';
import mockupLaptop1 from '@/assets/mockup-laptop-1.png';
import mockupMobile1 from '@/assets/mockup-mobile-1.png';
import mockupLaptop2 from '@/assets/mockup-laptop-2.png';
import mockupDevices from '@/assets/mockup-devices.png';
import mockupMulti from '@/assets/mockup-multi.png';

const features = [
  {
    icon: Clock,
    title: 'Real-Time Data',
    description: 'Instant insights for faster decision-making.',
  },
  {
    icon: Eye,
    title: 'Vision Capabilities',
    description: 'AI-powered image and video recognition.',
  },
  {
    icon: Sparkles,
    title: 'Optimized UX/UI',
    description: 'Smart design that enhances user experience.',
  },
  {
    icon: Headphones,
    title: 'Predictive Analytics',
    description: 'Make data-driven decisions with AI insights.',
  },
];

const floatingImages = [
  { src: mockupLaptop1, rotation: -12, y: 20, scale: 0.95 },
  { src: mockupMobile1, rotation: -6, y: -10, scale: 0.98 },
  { src: mockupLaptop2, rotation: 0, y: 0, scale: 1 },
  { src: mockupDevices, rotation: 6, y: -10, scale: 0.98 },
  { src: mockupMulti, rotation: 12, y: 20, scale: 0.95 },
];

export const SupportSection = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-foreground">
            Here When You
            <br />
            <span className="text-muted-foreground">Need Us Most.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
            InTence comes with dedicated support to help you launch and maintain
            your site without friction.
          </p>
          <button
            onClick={() => handleScroll('#about')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            View About InTence
          </button>
        </motion.div>

        {/* Floating Device Mockups - Image Strip */}
        <motion.div 
          className="flex justify-center items-end gap-2 sm:gap-3 md:gap-4 mb-20 py-8 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {floatingImages.map((img, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-20 h-28 sm:w-28 sm:h-36 md:w-36 md:h-48 lg:w-44 lg:h-56 rounded-2xl md:rounded-3xl overflow-hidden bg-card/50 border border-white/10 shadow-2xl"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ 
                opacity: 1, 
                y: img.y,
                rotate: img.rotation,
                scale: img.scale
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: img.y - 15, 
                scale: img.scale + 0.05,
                transition: { duration: 0.3 }
              }}
              style={{ 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px -10px rgba(139, 92, 246, 0.2)'
              }}
            >
              <img
                src={img.src}
                alt="Device mockup showing website or app"
                className="w-full h-full object-cover"
              />
              {/* Subtle glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Cards Row */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-start p-4 md:p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="flex items-center gap-2 mb-2">
                <feature.icon className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-foreground text-sm md:text-base">{feature.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
