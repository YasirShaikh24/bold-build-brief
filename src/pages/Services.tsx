import { motion } from 'framer-motion';
import { ArrowUpRight, Cloud, Bot, LineChart, Eye, Mic, Cog, Settings } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Service card images
import serviceAiDev from '@/assets/service-ai-development.jpg';
import serviceChatbots from '@/assets/service-chatbots.jpg';
import serviceAnalytics from '@/assets/service-analytics.jpg';
import serviceVision from '@/assets/service-vision.jpg';
import serviceSpeech from '@/assets/service-speech.jpg';
import serviceAutomation from '@/assets/service-automation.jpg';

const services = [
  {
    icon: Cloud,
    title: 'AI-Powered Development',
    subtitle: 'Smart Websites',
    description: 'We build AI-driven websites that adapt to users and automation.',
    image: serviceAiDev,
  },
  {
    icon: Bot,
    title: 'AI Chatbots',
    subtitle: '24/7 Customer Support',
    description: 'Instant AI-powered chatbots that automate responses.',
    image: serviceChatbots,
  },
  {
    icon: LineChart,
    title: 'Predictive Analytics',
    subtitle: 'Driven Decisions',
    description: 'Leverage AI to analyze trends and predict outcomes for smarter ways.',
    image: serviceAnalytics,
  },
  {
    icon: Eye,
    title: 'Computer Vision Solutions',
    subtitle: 'World Through AI',
    description: 'Advanced image and video processing powered by machine learning.',
    image: serviceVision,
  },
  {
    icon: Mic,
    title: 'Speech Recognition',
    subtitle: 'Smart Actions',
    description: 'Voice-enabled solutions for hands-free interaction and control.',
    image: serviceSpeech,
  },
  {
    icon: Cog,
    title: 'AI-Driven Automation',
    subtitle: 'Driven Decisions',
    description: 'Streamline workflows with intelligent automation systems.',
    image: serviceAutomation,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const Services = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section with Purple Glow */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Purple Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px]"
            style={{
              background: 'radial-gradient(ellipse at center top, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
            }}
          />
          {/* Dotted Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Services Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Settings className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/80">Services</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6"
          >
            <span className="block">AI-Powered Services for</span>
            <span className="block">Future-Driven Businesses</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-white/50 text-lg max-w-2xl mx-auto mb-10"
          >
            Our cutting-edge AI solutions are designed to transform businesses,
            enhance efficiency, and drive innovation.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            >
              Book a 15-min call
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.15] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white/40" />
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-5">
                  <service.icon className="w-5 h-5 text-purple-400" />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-medium text-white mb-1">{service.title}</h3>
                <p className="text-sm text-white/40 mb-4">{service.subtitle}</p>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Image */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/10]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile App CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Cards Container */}
            <div className="flex items-center justify-center gap-6 overflow-hidden">
              {/* Left Card - Laptop */}
              <div className="hidden md:block w-64 h-80 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4 -rotate-6 opacity-60">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="w-24 h-16 bg-gray-700 rounded-md" />
                </div>
              </div>

              {/* Center Card - Phone */}
              <div className="w-72 h-96 rounded-3xl bg-white/[0.03] border border-white/[0.1] p-3 relative z-10 group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_60px_rgba(139,92,246,0.3)]">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center relative overflow-hidden">
                  {/* Phone Screen Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                    <p className="text-white text-lg font-medium mb-2">We build websites</p>
                    <p className="text-white/80 text-sm mb-2">We create apps</p>
                    <p className="text-white/60 text-xs">We design AI-powered platforms</p>
                  </div>
                  
                  {/* Phone mockup shape */}
                  <div className="w-20 h-36 rounded-2xl bg-gradient-to-b from-purple-400 to-purple-700 shadow-2xl" />
                </div>
              </div>

              {/* Right Card - Laptop */}
              <div className="hidden md:block w-64 h-80 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-4 rotate-6 opacity-60">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="w-24 h-16 bg-gray-700 rounded-md" />
                </div>
              </div>
            </div>

            {/* Floating dot */}
            <div className="absolute top-10 left-1/4 w-3 h-3 rounded-full bg-white/20" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
