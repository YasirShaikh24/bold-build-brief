import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Zap, Shield, Mic, Clock, Eye, Sparkles, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Seamless API Integrations',
    description: 'Nubien supports a wide range of third-party integrations.',
    animation: 'connections'
  },
  {
    icon: Shield,
    title: 'Trusted Authentication',
    description: 'Quickly integrate with major platforms to workflows.',
    animation: 'check'
  },
  {
    icon: Mic,
    title: 'AI-Speech Recognition',
    description: 'Enable your user to control or navigate your site using speech.',
    animation: 'waveform'
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
    <section ref={containerRef} className="py-24 md:py-32 relative overflow-hidden bg-black">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Badge */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-light tracking-wide">
            <Home className="w-4 h-4" />
            About Us
          </span>
        </motion.div>

        {/* Main Narrative Text */}
        <div ref={textRef} className="text-center max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.4] md:leading-[1.5] tracking-tight">
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
          className="flex justify-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <button
            onClick={() => handleScroll('#contact')}
            className="px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            Book an Appointment
          </button>
        </motion.div>

        {/* Premium Feature Cards */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto mb-32"
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
                {/* Card Container */}
                <div className="relative h-[520px] rounded-[32px] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-700 ease-out group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
                  
                  {/* Ambient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Content container */}
                  <div className="relative h-full flex flex-col p-8">
                    
                    {/* Top section */}
                    <div className="flex flex-col items-center text-center mb-8">
                      {/* Icon */}
                      <motion.div 
                        className="relative mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/25 group-hover:border-primary/40 transition-all duration-500">
                          <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                        </div>
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-medium text-white mb-3 tracking-wide">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-white/50 leading-relaxed font-light max-w-[280px]">
                        {service.description}
                      </p>
                    </div>

                    {/* Animation Container */}
                    <div className="relative flex-1 rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
                      {service.animation === 'connections' && <ConnectionsAnimation />}
                      {service.animation === 'check' && <CheckAnimation />}
                      {service.animation === 'waveform' && <WaveformAnimation />}
                    </div>
                  </div>

                  {/* Noise texture */}
                  <div 
                    className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
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
                className="flex flex-col items-start text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
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

const ConnectionsAnimation = () => {
  const brandIcons = ['🍎', '🚗', '📦', '⚡', '🏢', '✓'];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {brandIcons.map((_, index) => {
          const angle = (index / brandIcons.length) * Math.PI * 2 - Math.PI / 2;
          const x1 = 50 + Math.cos(angle) * 35;
          const y1 = 30 + Math.sin(angle) * 20;
          
          return (
            <motion.path
              key={index}
              d={`M ${x1}% ${y1}% Q 50% 50%, 50% 75%`}
              fill="none"
              stroke="url(#line-grad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0.8, 0], opacity: [0, 0.6, 0.4, 0] }}
              transition={{ duration: 3, delay: index * 0.3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          );
        })}
      </svg>

      {brandIcons.map((emoji, index) => {
        const angle = (index / brandIcons.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 35;
        const y = 30 + Math.sin(angle) * 20;
        
        return (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-70"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', filter: 'grayscale(1)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.7, 0.7, 0], scale: [0.5, 1, 1, 0.5] }}
            transition={{ duration: 3, delay: index * 0.3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          >
            {emoji}
          </motion.div>
        );
      })}

      <motion.div
        className="absolute left-1/2 bottom-[20%] -translate-x-1/2 w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-md"
        animate={{ boxShadow: ['0 0 20px rgba(139, 92, 246, 0.2)', '0 0 40px rgba(139, 92, 246, 0.4)', '0 0 20px rgba(139, 92, 246, 0.2)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap className="w-10 h-10 text-primary" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
};

const CheckAnimation = () => {
  const keywords = ['Capabilities', 'Infrastructure', 'Intelligent', 'Data Analysis', 'Cognitive', 'Chatbots', 'Security', 'Verified', 'Trusted'];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      {keywords.map((text, i) => (
        <motion.span 
          key={i}
          className="absolute text-xs text-white/15 font-light tracking-wider"
          style={{ left: `${15 + (i % 3) * 30}%`, top: `${20 + Math.floor(i / 3) * 25}%` }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      ))}

      <motion.div
        className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-md"
        animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 40px rgba(139, 92, 246, 0.3)', '0 0 60px rgba(139, 92, 246, 0.5)', '0 0 40px rgba(139, 92, 246, 0.3)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </motion.svg>
      </motion.div>
    </div>
  );
};

const WaveformAnimation = () => {
  const bars = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 p-8">
      <motion.div
        className="px-10 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-xl tracking-wide"
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Speech Recognition
      </motion.div>

      <div className="relative w-[90%] max-w-[320px] h-20 rounded-2xl bg-gradient-to-r from-black/60 via-black/80 to-black/60 border border-white/10 backdrop-blur-md flex items-center px-6 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-primary/25 border border-primary/40 flex items-center justify-center flex-shrink-0 mr-4">
          <Mic className="w-6 h-6 text-primary" strokeWidth={2} />
        </div>

        <div className="flex items-center justify-center gap-[3px] flex-1">
          {bars.map((_, index) => (
            <motion.div
              key={index}
              className="w-[2px] bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-full"
              animate={{ height: ['12px', `${Math.random() * 35 + 12}px`, '12px'] }}
              transition={{ duration: 0.5 + Math.random() * 0.3, delay: index * 0.02, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};