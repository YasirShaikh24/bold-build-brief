import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { 
  Home, 
  Zap, 
  Bot, 
  Database,
  Smartphone, 
  CheckCircle2, 
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PieChart,
  Cloud,
  Workflow
} from 'lucide-react';

const services = [
  {
    icon: Zap,
    badge: 'Custom Software',
    title: 'Software Development',
    description: 'Custom mobile apps (iOS & Android), web apps, websites, and business management systems (ERP & CRM) built to solve real business challenges.',
    type: 'video',
    videoSrc: '/video/api.mp4',
    tags: ['Mobile Apps (iOS & Android)', 'Web Apps & Websites', 'ERP & CRM Systems']
  },
  {
    icon: Bot,
    badge: 'Intelligent Systems',
    title: 'Custom AI & Intelligent Systems',
    description: 'AI-powered applications to automate, analyze, and assist your business — including chatbots, smart assistants, and automated workflows.',
    type: 'ai-system',
    tags: ['Custom AI Models', 'AI Integration & Automation']
  },
  {
    icon: Database,
    badge: 'Business Efficiency',
    title: 'Database & Management Systems',
    description: 'Complete database solutions and management systems to organize your data, streamline operations, and scale reliably.',
    type: 'database-system',
    tags: ['Management Systems', 'Data Analytics & Reporting']
  },
];

const features = [
  {
    icon: Smartphone,
    title: 'Mobile & Web Applications',
    description: 'High-speed iOS & Android mobile apps and fast responsive web platforms tailored to your brand.',
  },
  {
    icon: Bot,
    title: 'Custom AI & Smart Assistants',
    description: 'Intelligent conversational chatbots and tools trained specifically on your company data.',
  },
  {
    icon: Workflow,
    title: 'Process & Tool Automation',
    description: 'Multi-platform integrations that eliminate manual repetitive tasks and human data errors.',
  },
  {
    icon: BarChart3,
    title: 'Management Systems (ERP/CRM)',
    description: 'Custom billing, inventory, client relations, and operational portals engineered to scale.',
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

  const handleScroll = (href: string) => {
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
            className="px-6 py-2.5 md:px-8 md:py-3.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
          >
            Get In Touch 
          </button>
        </motion.div>

        {/* 3 Core Pillars Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 max-w-[1400px] mx-auto mb-20 md:mb-32"
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
                className="group relative h-full"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <div className="relative min-h-[580px] sm:min-h-[610px] md:min-h-[640px] rounded-2xl md:rounded-[32px] bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-700 ease-out group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10 flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative h-full flex flex-col p-5 sm:p-6 md:p-7 flex-1">
                    {/* Header: Icon, Badge, Title, Description */}
                    <div className="flex flex-col items-center text-center mb-4 md:mb-5">
                      <motion.div 
                        className="relative mb-3 md:mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/25 group-hover:border-primary/40 transition-all duration-500">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={1.5} />
                        </div>
                      </motion.div>
                      
                      <div className="mb-1.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/25">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 tracking-wide px-2 text-center min-h-[52px] sm:min-h-[56px] flex items-center justify-center leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed font-light max-w-[340px] px-1 text-center min-h-[44px] flex items-center justify-center">
                        {service.description}
                      </p>
                    </div>

                    {/* Showcase Container */}
                    <div className="relative flex-1 min-h-[300px] sm:min-h-[330px] rounded-xl md:rounded-2xl bg-black/50 border border-white/5 overflow-hidden flex flex-col">
                      {service.type === 'video' && (
                        <div className="relative w-full h-full flex flex-col justify-between">
                          <div className="relative flex-1 min-h-[220px] overflow-hidden">
                            <VideoPlayer src={service.videoSrc} />
                          </div>
                          {/* Categories bar for Card 1 matching image.png */}
                          <div className="p-3 bg-black/80 border-t border-white/10 flex flex-col gap-1.5 items-center z-10">
                            <div className="flex flex-wrap gap-1.5 justify-center">
                              <span className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/85">
                                Mobile Apps (iOS & Android)
                              </span>
                              <span className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/85">
                                Web Apps & Websites
                              </span>
                            </div>
                            <span className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/85">
                              ERP & CRM Systems
                            </span>
                          </div>
                        </div>
                      )}

                      {service.type === 'ai-system' && <AiSystemCardVisual tags={service.tags} />}
                      {service.type === 'database-system' && <DatabaseSystemCardVisual tags={service.tags} />}
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

        {/* Lower Features Grid - Normalized & Clean */}
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
                className="flex flex-col items-start text-left p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-3 md:mb-4 p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-medium text-white mb-1.5">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Word = ({ children, progress, range }: { children: ReactNode; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ['rgba(255,255,255,0.2)', 'rgba(255,255,255,1)']);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

const VideoPlayer = ({ src }: { src: string }) => {
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

/**
 * Background Video Layer with Cosmic Moving Stars
 */
const MovingStarsVideo = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <video
        src="/video/video1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-35 mix-blend-screen scale-110"
      />
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85" />
      {/* Floating subtle star particles */}
      <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-60" />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse opacity-70" />
      <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-50" />
    </div>
  );
};

/**
 * Visual for Card 2: Custom AI & Intelligent Systems
 * Exact match to user's uploaded reference image + moving stars video background
 */
const AiSystemCardVisual = ({ tags }: { tags: string[] }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none bg-black/60">
      {/* Cosmic moving stars video background */}
      <MovingStarsVideo />

      {/* Ambient glow underneath central AI chip */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/25 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-indigo-500/30 rounded-full blur-xl pointer-events-none z-0" />

      {/* Main Diagram Area with central AI chip and 4 cards */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto py-2">
        {/* SVG Circuit Lines connecting central AI chip to cards */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-80" viewBox="0 0 320 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aiGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="aiGlow2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Top-Left to Center */}
          <path d="M 90 40 C 130 40, 140 70, 150 80" stroke="url(#aiGlow1)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          {/* Top-Right to Center */}
          <path d="M 230 40 C 190 40, 180 70, 170 80" stroke="url(#aiGlow2)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          {/* Bottom-Left to Center */}
          <path d="M 90 140 C 130 140, 140 110, 150 100" stroke="url(#aiGlow1)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
          {/* Bottom-Right to Center */}
          <path d="M 230 140 C 190 140, 180 110, 170 100" stroke="url(#aiGlow2)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
        </svg>

        {/* Top Row: AI Chatbots & Document AI */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 relative z-10 mb-2 w-full max-w-[340px] mx-auto">
          {/* Top-Left: AI Chatbots */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-purple-500/25 backdrop-blur-md shadow-lg shadow-purple-950/20 hover:border-purple-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">AI Chatbots</p>
              <p className="text-[9px] text-white/60">Customer Support</p>
            </div>
          </div>

          {/* Top-Right: Document AI */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-purple-500/25 backdrop-blur-md shadow-lg shadow-purple-950/20 hover:border-purple-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">Document AI</p>
              <p className="text-[9px] text-white/60">Extract & Analyze</p>
            </div>
          </div>
        </div>

        {/* Middle: Glowing AI Processor Chip */}
        <div className="relative z-20 flex items-center justify-center my-2">
          <motion.div 
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-purple-950 via-black to-indigo-950 border-2 border-purple-500 flex flex-col items-center justify-center shadow-xl shadow-purple-600/30"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(168,85,247,0.35)', 
                '0 0 35px rgba(168,85,247,0.65)', 
                '0 0 20px rgba(168,85,247,0.35)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Pins on 4 sides of chip */}
            <div className="absolute -top-1.5 flex gap-1.5">
              <span className="w-1 h-1.5 bg-purple-400 rounded-t-sm" />
              <span className="w-1 h-1.5 bg-purple-400 rounded-t-sm" />
              <span className="w-1 h-1.5 bg-purple-400 rounded-t-sm" />
            </div>
            <div className="absolute -bottom-1.5 flex gap-1.5">
              <span className="w-1 h-1.5 bg-purple-400 rounded-b-sm" />
              <span className="w-1 h-1.5 bg-purple-400 rounded-b-sm" />
              <span className="w-1 h-1.5 bg-purple-400 rounded-b-sm" />
            </div>
            <div className="absolute -left-1.5 flex flex-col gap-1.5">
              <span className="h-1 w-1.5 bg-purple-400 rounded-l-sm" />
              <span className="h-1 w-1.5 bg-purple-400 rounded-l-sm" />
              <span className="h-1 w-1.5 bg-purple-400 rounded-l-sm" />
            </div>
            <div className="absolute -right-1.5 flex flex-col gap-1.5">
              <span className="h-1 w-1.5 bg-purple-400 rounded-r-sm" />
              <span className="h-1 w-1.5 bg-purple-400 rounded-r-sm" />
              <span className="h-1 w-1.5 bg-purple-400 rounded-r-sm" />
            </div>

            <span className="text-xl sm:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-indigo-300 drop-shadow-md">
              AI
            </span>
            <span className="text-[7px] text-purple-300/80 uppercase font-mono tracking-widest -mt-0.5">Core</span>
          </motion.div>
        </div>

        {/* Bottom Row: Data Insights & Process Automation */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 relative z-10 mt-2 w-full max-w-[340px] mx-auto">
          {/* Bottom-Left: Data Insights */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-purple-500/25 backdrop-blur-md shadow-lg shadow-purple-950/20 hover:border-purple-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">Data Insights</p>
              <p className="text-[9px] text-white/60">Predict & Grow</p>
            </div>
          </div>

          {/* Bottom-Right: Process Automation */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-purple-500/25 backdrop-blur-md shadow-lg shadow-purple-950/20 hover:border-purple-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
              <Settings className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">Automation</p>
              <p className="text-[9px] text-white/60">Save Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search / Interactive prompt bar from image.png */}
      <div className="relative z-10 my-2">
        <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-white/[0.05] border border-purple-500/30 backdrop-blur-md shadow-inner">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] text-white/60 truncate font-light">
              Turn your ideas into intelligent solutions...
            </span>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-[10px] shadow-sm hover:scale-110 active:scale-95 transition-transform flex-shrink-0 cursor-pointer"
          >
            <ArrowRight className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Category Badges matching image.png */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * Visual for Card 3: Database & Management Systems
 * Centered, balanced architecture visual with moving stars video background
 */
const DatabaseSystemCardVisual = ({ tags }: { tags: string[] }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none bg-black/60">
      {/* Cosmic moving stars video background */}
      <MovingStarsVideo />

      {/* Ambient glow underneath central database cylinder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-indigo-500/25 rounded-full blur-xl pointer-events-none z-0" />

      {/* Main Diagram Area - Centered and balanced */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center my-auto py-2 w-full max-w-[340px] mx-auto">
        {/* Subtle SVG Circuit Lines connecting center to cards cleanly */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-60" viewBox="0 0 320 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dbLine1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="dbLine2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Top-Left to Center */}
          <path d="M 85 45 C 120 45, 135 75, 150 85" stroke="url(#dbLine1)" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
          {/* Top-Right to Center */}
          <path d="M 235 45 C 200 45, 185 75, 170 85" stroke="url(#dbLine2)" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
          {/* Bottom-Left to Center */}
          <path d="M 85 135 C 120 135, 135 115, 150 105" stroke="url(#dbLine1)" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
          {/* Bottom-Right to Center */}
          <path d="M 235 135 C 200 135, 185 115, 170 105" stroke="url(#dbLine2)" strokeWidth="1.2" fill="none" strokeDasharray="3 3" />
        </svg>

        {/* Top 2 Cards: Database Architecture & Business Systems */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 relative z-10 mb-2 w-full">
          {/* Top-Left: Database Architecture */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-blue-500/25 backdrop-blur-md shadow-lg shadow-blue-950/20 hover:border-blue-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 flex-shrink-0">
              <Database className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">Database Design</p>
              <p className="text-[9px] text-white/60">Structured & Scalable</p>
            </div>
          </div>

          {/* Top-Right: Business Systems */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-indigo-500/25 backdrop-blur-md shadow-lg shadow-indigo-950/20 hover:border-indigo-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">Business Systems</p>
              <p className="text-[9px] text-white/60">ERP / CRM / MIS</p>
            </div>
          </div>
        </div>

        {/* Center: 3D Holographic Database Core */}
        <div className="relative z-20 flex items-center justify-center my-1">
          <motion.div 
            className="relative flex flex-col items-center justify-center cursor-default"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Top cylinder layer */}
            <div className="w-16 sm:w-20 h-5 sm:h-6 rounded-full bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 border border-white/60 shadow-lg shadow-blue-500/50 z-30 flex items-center justify-center">
              <span className="w-6 h-1 bg-white/70 rounded-full blur-[0.5px]" />
            </div>
            
            {/* Mid cylinder tier 1 */}
            <div className="w-16 sm:w-20 h-4 sm:h-5 -mt-2 bg-gradient-to-b from-blue-600 via-indigo-700 to-purple-900 border-x border-b border-blue-400/60 rounded-b-full shadow-inner z-20 flex items-center justify-center">
              <span className="w-10 h-0.5 bg-cyan-300/80 rounded-full blur-[0.5px]" />
            </div>

            {/* Mid cylinder tier 2 */}
            <div className="w-16 sm:w-20 h-4 sm:h-5 -mt-1 bg-gradient-to-b from-blue-700 via-indigo-800 to-black border-x border-b border-blue-400/50 rounded-b-full shadow-inner z-10 flex items-center justify-center">
              <span className="w-10 h-0.5 bg-blue-400/70 rounded-full blur-[0.5px]" />
            </div>

            {/* Bottom glowing ring */}
            <div className="w-20 sm:w-24 h-2 bg-blue-500/40 rounded-full blur-sm -mt-0.5" />
          </motion.div>
        </div>

        {/* Bottom 2 Cards: Data Security & Real-Time Analytics */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 relative z-10 mt-1 w-full">
          {/* Bottom-Left: Data Security */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-blue-500/25 backdrop-blur-md shadow-lg shadow-blue-950/20 hover:border-blue-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">Data Security</p>
              <p className="text-[9px] text-white/60">Store & Protect</p>
            </div>
          </div>

          {/* Bottom-Right: Reports & Analytics */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.06] border border-indigo-500/25 backdrop-blur-md shadow-lg shadow-indigo-950/20 hover:border-indigo-400/40 transition-all">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0">
              <PieChart className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-medium text-white">Live Analytics</p>
              <p className="text-[9px] text-white/60">Real-Time Insights</p>
            </div>
          </div>
        </div>

        {/* 4 Bottom Database Technology Nodes */}
        <div className="grid grid-cols-4 gap-1.5 relative z-20 mt-2 sm:mt-2.5 w-full">
          {/* MySQL */}
          <div className="flex flex-col items-center justify-center py-1 px-1 rounded-lg bg-white/[0.05] border border-blue-500/20 hover:border-blue-400/40 transition-all">
            <span className="text-xs leading-none">🐬</span>
            <span className="text-[9px] sm:text-[10px] text-white/80 font-medium mt-0.5">MySQL</span>
          </div>

          {/* PostgreSQL */}
          <div className="flex flex-col items-center justify-center py-1 px-1 rounded-lg bg-white/[0.05] border border-indigo-500/20 hover:border-indigo-400/40 transition-all">
            <span className="text-xs leading-none">🐘</span>
            <span className="text-[9px] sm:text-[10px] text-white/80 font-medium mt-0.5">PostgreSQL</span>
          </div>

          {/* MongoDB */}
          <div className="flex flex-col items-center justify-center py-1 px-1 rounded-lg bg-white/[0.05] border border-emerald-500/20 hover:border-emerald-400/40 transition-all">
            <span className="text-xs leading-none">🍃</span>
            <span className="text-[9px] sm:text-[10px] text-white/80 font-medium mt-0.5">MongoDB</span>
          </div>

          {/* Cloud DB */}
          <div className="flex flex-col items-center justify-center py-1 px-1 rounded-lg bg-white/[0.05] border border-purple-500/20 hover:border-purple-400/40 transition-all">
            <Cloud className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[9px] sm:text-[10px] text-white/80 font-medium mt-0.5">Cloud DB</span>
          </div>
        </div>
      </div>

      {/* Bottom Category Badges */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

