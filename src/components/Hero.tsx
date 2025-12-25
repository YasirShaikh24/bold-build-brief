  import { motion, useScroll, useTransform } from 'framer-motion';
  import { ChevronDown, Play, TrendingUp } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { useRef } from 'react';

  export const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const handleScroll = (href: string) => {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <section
        id="hero"
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background - Optimized */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5)' }}
          >
            <source src="/video1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 container mx-auto px-6 lg:px-12 text-center"
          style={{ opacity }}
        >
          {/* Logo Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white">
                Web Apps • UI/UX • Scalable Solutions
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">InTence</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Always Good
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12"
          >
            Building powerful digital experiences through innovative software
            development and cutting-edge technology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => handleScroll('#work')}
              className="group"
            >
              <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              View Our Work
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={() => handleScroll('#contact')}
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity }}
        >
          <motion.button
            onClick={() => handleScroll('#about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    );
  };