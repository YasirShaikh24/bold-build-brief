import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Rocket, Users } from 'lucide-react';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 25, suffix: '+', label: 'Technologies Used' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 10, suffix: '+', label: 'Years Experience' },
];

const features = [
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Lightning-fast applications optimized for speed and efficiency.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee.',
  },
  {
    icon: Rocket,
    title: 'Scalable Solutions',
    description: 'Architecture designed to grow with your business needs.',
  },
  {
    icon: Users,
    title: 'User-Centric',
    description: 'Intuitive interfaces that users love to engage with.',
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-gradient font-display text-5xl md:text-6xl font-bold">
      {count}
      {suffix}
    </span>
  );
};

export const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background glow with parallax */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]"
        style={{ y: backgroundY }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block"
          >
            About Us
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            We Build <span className="text-gradient">Powerful</span> Software
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            InTence is a modern software development company focused on creating
            exceptional digital experiences through clean architecture, performance
            optimization, and real-world problem solving.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px hsl(var(--primary) / 0.15)"
              }}
              className="text-center p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-3 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 + index * 0.12 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px hsl(var(--primary) / 0.15)"
              }}
              className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <feature.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="font-display text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};