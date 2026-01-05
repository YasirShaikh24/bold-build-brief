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
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 md:mb-4 text-foreground px-4">
            Here When You
            <br />
            <span className="text-muted-foreground">Need Us Most.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 md:mb-8 px-4">
            InTence comes with dedicated support to help you launch and maintain
            your site without friction.
          </p>
          <button
            onClick={() => handleScroll('#about')}
            className="px-5 py-2.5 md:px-6 md:py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            View About InTence
          </button>
        </motion.div>

        {/* Floating Device Mockups - Mobile Optimized */}
        <motion.div 
          className="flex justify-center items-end gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 mb-12 md:mb-20 py-6 md:py-8 px-2 sm:px-4 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 min-w-max px-2">
            {floatingImages.map((img, index) => (
              <motion.div
                key={index}
                className="relative flex-shrink-0 w-16 h-24 sm:w-24 sm:h-32 md:w-32 md:h-44 lg:w-40 lg:h-52 xl:w-44 xl:h-56 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden bg-card/50 border border-white/10 shadow-2xl"
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
                  y: img.y - 10, 
                  scale: img.scale + 0.03,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 30px -8px rgba(139, 92, 246, 0.2)'
                }}
              >
                <img
                  src={img.src}
                  alt="Device mockup showing website or app"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Subtle glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Cards Row - Mobile Optimized */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-start p-4 sm:p-5 rounded-xl bg-card/20 border border-white/5 hover:border-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="flex items-center gap-2 mb-2">
                <feature.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="font-medium text-foreground text-sm md:text-base">{feature.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add scrollbar hide utility */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};