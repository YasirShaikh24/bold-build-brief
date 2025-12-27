import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
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
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-gradient font-display text-5xl md:text-6xl font-bold">
      {count}
      {suffix}
    </span>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            We Build <span className="text-gradient">Powerful</span> Software
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            InTence is a modern software development company focused on creating
            exceptional digital experiences through clean architecture, performance
            optimization, and real-world problem solving.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-3 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
