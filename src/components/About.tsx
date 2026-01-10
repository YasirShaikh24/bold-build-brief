import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Zap, Shield, TrendingUp, Clock, Eye, Sparkles, Mic } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Seamless API Integrations',
    description: 'Nubien supports a wide range of third-party integrations.',
    animation: 'video',
    videoSrc: '/video/api.mp4'
  },
  {
    icon: Shield,
    title: 'Trusted Authentication',
    description: 'Quickly integrate with major platforms to workflows.',
    animation: 'video',
    videoSrc: '/video/trusted.mp4'
  },
  {
    icon: TrendingUp,
    title: 'Performance-Optimized Websites',
    description: 'Build blazing-fast websites optimized for performance, SEO, and smooth user experience across all devices.',
    animation: 'video',
    videoSrc: '/video/performance.mp4'
  },
];

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
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Make data-driven decisions with AI insights.',
  },
];

const aboutText = "Built on creativity, collaboration, and top excellence, InTence is a dynamic team of industry experts committed to achieving exceptional great results...";

export const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "end 0.5"]
  });

  const handleScroll = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const words = aboutText.split(' ');

  return (
    <section ref={containerRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/5 rounded-full blur-[150px] md:blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Badge */}
        <motion.div 
          className="flex justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs md:text-sm font-light tracking-wide">
            <Home className="w-3 h-3 md:w-4 md:h-4" />
            About Us
          </span>
        </motion.div>

        {/* Narrative Text */}
        <div ref={textRef} className="text-center max-w-5xl mx-auto mb-8 md:mb-12 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.4] md:leading-[1.5] tracking-tight">
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
          className="flex justify-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <button
            onClick={() => handleScroll('#contact')}
            className="px-6 py-2.5 md:px-8 md:py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            Get In Touch 
          </button>
        </motion.div>

        {/* Service Cards - Mobile Optimized */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-[1400px] mx-auto mb-20 md:mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="group relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <div className="relative h-[420px] sm:h-[480px] md:h-[520px] rounded-2xl md:rounded-[32px] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-700 ease-out group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative h-full flex flex-col p-5 sm:p-6 md:p-8">
                    <div className="flex flex-col items-center text-center mb-6 md:mb-8">
                      <motion.div 
                        className="relative mb-4 md:mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/25 group-hover:border-primary/40 transition-all duration-500">
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
                        </div>
                      </motion.div>
                      
                      <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3 tracking-wide px-2">{service.title}</h3>
                      <p className="text-xs md:text-sm text-white/50 leading-relaxed font-light max-w-[280px] px-2">{service.description}</p>
                    </div>

                    {/* Video Container - Mobile Optimized */}
                    <div className="relative flex-1 rounded-xl md:rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
                      {service.animation === 'video' && <VideoPlayer src={service.videoSrc} />}
                    </div>
                  </div>

                  <div 
                    className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Lower Features Grid - Mobile Optimized */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="flex flex-col items-start text-left px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-3 md:mb-4">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-base md:text-lg font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ['rgba(255,255,255,0.2)', 'rgba(255,255,255,1)']);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

const VideoPlayer = ({ src }) => {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};  