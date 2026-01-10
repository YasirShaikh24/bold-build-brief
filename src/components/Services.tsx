import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform
} from 'framer-motion';
import { Code, Globe, Zap, Database, Settings, Wrench } from 'lucide-react';

/* ================= DATA ================= */

const services = [
  {
    id: 1,
    title: 'Custom Software Development',
    icon: Code,
    description:
      'We build powerful tailor-made software solutions designed for real business workflows. Our systems improve scalability performance and long-term reliability. Each solution evolves with your organization and supports sustainable growth.'
  },
  {
    id: 2,
    title: 'Web & Web Application Development',
    icon: Globe,
    description:
      'We create modern responsive websites and secure web applications. Our focus is clean interfaces smooth performance and excellent user experience. Every product is optimized for future expansion.'
  },
  {
    id: 3,
    title: 'Business Automation Solutions',
    icon: Zap,
    description:
      'We automate repetitive and manual business processes using intelligent digital systems. Automation reduces errors improves efficiency and saves valuable time. Businesses gain stronger operational control.'
  },
  {
    id: 4,
    title: 'Database & Backend Engineering',
    icon: Database,
    description:
      'We design secure scalable backend architectures supported by robust databases. Our systems ensure stability performance and seamless integration. This creates a reliable foundation for enterprise platforms.'
  },
  {
    id: 5,
    title: 'Management Systems & Business Applications',
    icon: Settings,
    description:
      'We build ERP CRM inventory billing and custom management systems. These solutions centralize operations and improve decision making. Real-time data ensures transparency and control.'
  },
  {
    id: 6,
    title: 'Maintenance Support & Optimization',
    icon: Wrench,
    description:
      'We provide continuous system support performance optimization and security updates. Our proactive monitoring prevents future issues. This ensures long-term reliability and stability.'
  }
];

/* ================= COMPONENT ================= */

export const Services = () => {
  const [activeId, setActiveId] = useState(null);
  
  // Refs for scroll animations
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);

  // Heading scroll logic
  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.9', 'end 0.6'],
  });

  // Subheading scroll logic (Syncs with Portfolio style)
  const { scrollYProgress: subHeadingProgress } = useScroll({
    target: subHeadingRef,
    offset: ['start 0.85', 'end 0.5'],
  });

  const toggleCard = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const headingText = 'Comprehensive Solutions for Your Business Growth';
  const subHeadingText = 'From custom development to ongoing support, we provide end-to-end technology solutions tailored to your unique business needs.';

  return (
    <section
      id="services"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 px-2 sm:px-3 md:px-6 lg:px-8 py-4">
        <div
          className="w-full h-full rounded-[3rem] overflow-hidden"
          style={{
            backgroundImage: 'url(/service1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full h-full bg-black/40" />
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-[1]" />

      <div className="container mx-auto px-4 relative z-10">

        {/* ================= HEADING ================= */}
        <div ref={headingRef} className="text-center max-w-5xl mx-auto mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            {headingText.split(' ').map((word, i) => {
              const start = i / headingText.split(' ').length;
              const end = start + 1 / headingText.split(' ').length;
              return (
                <Word
                  key={i}
                  progress={headingProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </h2>
        </div>

        {/* ================= SUB HEADING (SCROLL REVEAL) ================= */}
        <div ref={subHeadingRef} className="text-center max-w-3xl mx-auto mb-12 px-4">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/60">
            {subHeadingText.split(' ').map((word, i) => {
              const wordsArray = subHeadingText.split(' ');
              const start = i / wordsArray.length;
              const end = start + 1 / wordsArray.length;
              return (
                <Word
                  key={i}
                  progress={subHeadingProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            const isOpen = activeId === service.id;

            return (
              <div key={service.id} className="flex flex-col">
                {/* Main Clickable Card */}
                <motion.div
                  onClick={() => toggleCard(service.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-card/50 border border-border/30 p-6 cursor-pointer transition-colors duration-300 ${
                    isOpen ? 'rounded-t-2xl border-b-transparent' : 'rounded-2xl'
                  } hover:bg-card/70`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary/80" />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {service.title}
                    </h3>
                  </div>
                </motion.div>

                {/* Animated Drawer for Description */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="bg-card/70 border-x border-b border-border/20 rounded-b-2xl px-6 py-4 text-sm text-white/80 leading-relaxed text-center">
                        <FastTypeWriter
                          text={service.description}
                          speed={0.005}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ================= SHARED COMPONENTS ================= */

/**
 * Reusable Word component for Scroll-based reveals 
 * Matches the logic in your Portfolio code
 */
const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(255,255,255,0.35)', 'rgba(255,255,255,1)']
  );
  
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

/**
 * Fast typewriter for card descriptions
 */
const FastTypeWriter = ({ text, speed = 0.01 }) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: speed,
          },
        },
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};