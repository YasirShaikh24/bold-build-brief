import { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';

/* ================= DATA ================= */

const services = [
  {
    id: 1,
    title: 'Custom Software Development',
    icon: '💻',
    description:
      'We build powerful tailor-made software solutions designed for real business workflows. Our systems improve scalability performance and long-term reliability. Each solution evolves with your organization and supports sustainable growth.'
  },
  {
    id: 2,
    title: 'Web & Web Application Development',
    icon: '🌐',
    description:
      'We create modern responsive websites and secure web applications. Our focus is clean interfaces smooth performance and excellent user experience. Every product is optimized for future expansion.'
  },
  {
    id: 3,
    title: 'Business Automation Solutions',
    icon: '⚡',
    description:
      'We automate repetitive and manual business processes using intelligent digital systems. Automation reduces errors improves efficiency and saves valuable time. Businesses gain stronger operational control.'
  },
  {
    id: 4,
    title: 'Database & Backend Engineering',
    icon: '🗄️',
    description:
      'We design secure scalable backend architectures supported by robust databases. Our systems ensure stability performance and seamless integration. This creates a reliable foundation for enterprise platforms.'
  },
  {
    id: 5,
    title: 'Management Systems & Business Applications',
    icon: '⚙️',
    description:
      'We build ERP CRM inventory billing and custom management systems. These solutions centralize operations and improve decision making. Real-time data ensures transparency and control.'
  },
  {
    id: 6,
    title: 'Maintenance Support & Optimization',
    icon: '🔧',
    description:
      'We provide continuous system support performance optimization and security updates. Our proactive monitoring prevents future issues. This ensures long-term reliability and stability.'
  }
];

/* ================= COMPONENT ================= */

export const Services = () => {
  const [activeId, setActiveId] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animated = sessionStorage.getItem('servicesAnimated');
    if (!animated) {
      sessionStorage.setItem('servicesAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  const toggleCard = (id) => {
    setActiveId(activeId === id ? null : id);
  };

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
        <div className="text-center max-w-5xl mx-auto mb-6">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(12px)', x: -30 }}
            whileInView={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 1, filter: 'blur(0px)', x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: hasAnimated ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span 
              className="inline-block mr-[0.25em] text-white"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Comprehensive
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Solutions
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              for
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Your
            </motion.span>
            <br />
            <motion.span 
              className="inline-block mr-[0.25em] text-white/70"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Business
            </motion.span>
            <motion.span 
              className="inline-block mr-[0.25em] text-white/70"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Growth
            </motion.span>
          </motion.h2>
        </div>

        {/* ================= SUB HEADING (ALWAYS VISIBLE) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/60">
            From custom development to ongoing support, we provide end-to-end technology solutions tailored to your unique business needs.
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => {
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
                      <span className="text-2xl">{service.icon}</span>
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