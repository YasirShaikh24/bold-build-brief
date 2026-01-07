import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Service data structure
const services = [
  {
    id: 1,
    tag: 'Core Service',
    title: 'Product Development',
    description: 'We build complete digital products from concept to launch',
    features: [
      'Custom Web Applications',
      'Mobile App Development',
      'SaaS & Startup Products',
      'Backend & API Systems',
      'Scalable Architecture'
    ],
    tags: ['Web', 'Mobile', 'SaaS'],
    images: [
      '/services/service-1/image-1.png',
      '/services/service-1/image-2.png'
    ],
    color: 'from-purple-600/20 to-blue-600/20'
  },
  {
    id: 2,
    tag: 'Core Service',
    title: 'UI/UX & Brand Design',
    description: 'Creating beautiful, user-centered designs that convert',
    features: [
      'UI / UX Design',
      'Web & App Interfaces',
      'Design Systems',
      'Brand Consistency',
      'User-Centered Design'
    ],
    tags: ['Design', 'UX', 'Brand'],
    images: [
      '/services/service-2/image-1.png',
      '/services/service-2/image-2.png'
    ],
    color: 'from-pink-600/20 to-purple-600/20'
  },
  {
    id: 3,
    tag: 'Core Service',
    title: 'Performance & Optimization',
    description: 'Lightning-fast experiences that scale with your growth',
    features: [
      'Fast-Loading Websites',
      'SEO Optimization',
      'Responsive Design',
      'Scalable Systems',
      'Long-Term Support'
    ],
    tags: ['Performance', 'SEO', 'Growth'],
    images: [
      '/services/service-3/image-1.png',
      '/services/service-3/image-2.png'
    ],
    color: 'from-blue-600/20 to-cyan-600/20'
  }
];

const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-black to-blue-600/10 animate-pulse" 
           style={{ animationDuration: '8s' }} />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight leading-tight">
            Here's how we turn ideas into{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              powerful digital products
            </span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          We don't just design or develop — we build complete digital solutions
        </motion.p>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <motion.div style={{ opacity }} className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className={`p-8 lg:p-10 rounded-3xl bg-gradient-to-br ${service.color} backdrop-blur-xl border border-white/10`}>
              <h2 className="text-4xl lg:text-5xl font-light mb-4 tracking-tight">{service.title}</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">{service.description}</p>
              <div className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white/80">
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div style={{ scale }} className="order-1 lg:order-2 space-y-6">
            {service.images.map((img, idx) => (
              <motion.div key={idx} style={{ y: imageY }} className="rounded-2xl border border-white/10 overflow-hidden aspect-[16/10] bg-white/5">
                <img src={img} alt={service.title} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default function ServicesPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />
      <IntroSection />
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-6">Ready to build something <span className="text-purple-400">extraordinary?</span></h2>
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium flex items-center gap-2 mx-auto transition-all">
            Start Your Project <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}