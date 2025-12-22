import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const technologies = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'Flask', category: 'Framework' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Figma', category: 'Design' },
];

export const Technologies = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="tech" className="py-32 relative overflow-hidden bg-card/30">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

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
            transition={{ duration: 0.5 }}
            className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block"
          >
            Technologies
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and
            future-proof solutions for our clients.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                boxShadow: "0 20px 40px hsl(var(--primary) / 0.2)"
              }}
              className="group relative p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 text-center cursor-default"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
              <div className="relative">
                <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
                <span className="block text-xs text-muted-foreground mt-1">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expertise areas */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Frontend Excellence',
              description: 'Modern, responsive interfaces with React, Vue, and cutting-edge frameworks.',
            },
            {
              title: 'Backend Power',
              description: 'Scalable APIs and microservices with Node.js, Python, and Java ecosystems.',
            },
            {
              title: 'Database & Storage',
              description: 'Robust data management with PostgreSQL, MySQL, and MongoDB solutions.',
            },
          ].map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px hsl(var(--primary) / 0.15)"
              }}
              className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              <h3 className="font-display text-xl font-semibold mb-3 text-gradient">
                {area.title}
              </h3>
              <p className="text-muted-foreground">{area.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};