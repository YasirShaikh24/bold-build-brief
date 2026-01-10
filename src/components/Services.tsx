import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Globe, Zap, Database, Settings, Wrench } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Custom Software Development',
    icon: Code,
    description:
      'We build powerful, tailor-made software solutions designed specifically for your business processes. Our software is developed after understanding real operational workflows and requirements. We focus on performance, scalability, and long-term reliability. Each solution is built to adapt as your business grows and evolves.'
  },
  {
    id: 2,
    title: 'Web & Web Application Development',
    icon: Globe,
    description:
      'We design and develop modern, responsive websites and secure web applications. Our solutions ensure smooth user experiences across all devices and browsers. We follow clean UI practices and optimized coding standards. Every application is scalable, fast, and future-ready.'
  },
  {
    id: 3,
    title: 'Business Automation Solutions',
    icon: Zap,
    description:
      'We automate manual and repetitive business tasks using smart digital systems. Automation helps reduce human effort and operational errors. Our solutions improve productivity and workflow efficiency. Businesses gain faster execution and better control through automation.'
  },
  {
    id: 4,
    title: 'Database & Backend Engineering',
    icon: Database,
    description:
      'We create robust backend architectures supported by secure and scalable databases. Our systems ensure high performance and smooth data handling. We focus on security, stability, and seamless integrations. This forms a strong foundation for enterprise-level applications.'
  },
  {
    id: 5,
    title: 'Management Systems & Business Applications',
    icon: Settings,
    description:
      'We develop complete management solutions including ERP, CRM, inventory, billing, and custom business applications. These systems centralize operations and improve decision-making. Real-time data access enhances control and transparency. Our solutions simplify complex business processes.'
  },
  {
    id: 6,
    title: 'Maintenance, Support & Optimization',
    icon: Wrench,
    description:
      'We provide continuous technical support to keep your systems running smoothly. Our services include performance optimization, security updates, and regular maintenance. We monitor systems to prevent issues before they arise. This ensures long-term stability and reliability.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const Services = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleCard = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0 px-2 sm:px-3 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div
          className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden"
          style={{
            backgroundImage: 'url(/src/assets/service1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className="w-full h-full"
            style={{ background: 'rgba(0, 0, 0, 0.4)' }}
          />
        </div>
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Heading */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Our Services
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4">
            <span className="text-white">Comprehensive Solutions for</span>
            <br />
            <span className="text-white/80">Your Business Growth</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            From custom development to ongoing support, we provide end-to-end technology solutions tailored to your unique business needs.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isOpen = activeId === service.id;

            return (
              <motion.div key={service.id} variants={itemVariants} className="flex flex-col">
                {/* Card */}
                <div
                  onClick={() => toggleCard(service.id)}
                  className="bg-card/50 border border-border/30 hover:border-primary/30 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary/80" />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="bg-card/70 border border-border/20 rounded-b-2xl px-6 py-4 text-center text-white/80 text-sm leading-relaxed">
                        {service.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
