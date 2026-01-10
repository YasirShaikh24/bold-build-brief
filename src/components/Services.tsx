import { motion } from 'framer-motion';
import { Code, Globe, Zap, Database, Settings, Wrench } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Custom Software Development',
    icon: Code,
    description:
      'We build tailor-made software solutions\nfocused on real business processes\nto improve efficiency and scalability.'
  },
  {
    id: 2,
    title: 'Web & Web Application Development',
    icon: Globe,
    description:
      'We design modern responsive websites\nand secure web applications\nfor smooth and seamless experiences.'
  },
  {
    id: 3,
    title: 'Business Automation Solutions',
    icon: Zap,
    description:
      'We automate repetitive business tasks\nusing smart digital workflows\nto reduce errors and improve productivity.'
  },
  {
    id: 4,
    title: 'Database & Backend Engineering',
    icon: Database,
    description:
      'We develop secure backend systems\nwith scalable database architecture\nensuring performance and reliability.'
  },
  {
    id: 5,
    title: 'Management Systems & Business Applications',
    icon: Settings,
    description:
      'We build complete management systems\nincluding ERP CRM inventory and billing\nfor centralized business control.'
  },
  {
    id: 6,
    title: 'Maintenance, Support & Optimization',
    icon: Wrench,
    description:
      'We provide ongoing technical support\nsystem optimization and regular updates\nto keep everything running smoothly.'
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
  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
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
            From custom development to automation and support, we deliver complete technology solutions tailored to your business needs.
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
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative overflow-visible"
              >

                {/* Tooltip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                  pointer-events-none z-20 mb-2">
                  
                  <div className="bg-card/95 backdrop-blur-md 
                    border border-primary/20 
                    rounded-2xl px-8 py-5 
                    shadow-2xl w-[360px]">

                    <p className="text-sm text-white/80 text-center leading-relaxed whitespace-pre-line">
                      {service.description}
                    </p>

                    <div className="absolute top-full left-1/2 -translate-x-1/2">
                      <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px]
                        border-l-transparent border-r-transparent border-t-card/95" />
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="bg-card/50 border border-border/30 hover:border-primary/30 
                  backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 
                  cursor-pointer hover:scale-[1.02] hover:shadow-lg">

                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary/80" />
                    </div>

                    <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
