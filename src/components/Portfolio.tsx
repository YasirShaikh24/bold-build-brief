import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';

const projects = [
  {
    id: 1,
    title: 'Enterprise Analytics Platform',
    description: 'Real-time data visualization dashboard for Fortune 500 companies.',
    longDescription: 'A comprehensive analytics solution handling millions of data points.',
    image: project1,
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'D3.js'],
    problem: 'Our client, a Fortune 500 company, struggled with data silos across 15 departments, making it impossible to get a unified view of their operations. Decision-makers were working with outdated information, leading to missed opportunities.',
    solution: 'We built a centralized analytics platform that ingests data from multiple sources in real-time. Using advanced visualization techniques and machine learning algorithms, we created intuitive dashboards that surface actionable insights automatically.',
    result: '45% improvement in decision-making speed, $2.3M saved in the first year through optimized operations, and 99.9% uptime achieved since launch.',
  },
  {
    id: 2,
    title: 'FinTech Mobile App',
    description: 'Next-generation banking experience with AI-powered insights.',
    longDescription: 'Revolutionary mobile banking with predictive analytics.',
    image: project2,
    technologies: ['React Native', 'Python', 'Flask', 'TensorFlow', 'AWS'],
    problem: 'Traditional banking apps frustrated users with complex interfaces and lack of personalization. Our client wanted to capture the millennial market with a modern, intelligent banking experience.',
    solution: 'We developed a mobile-first banking app featuring AI-powered spending analysis, predictive savings recommendations, and a sleek dark mode interface. Biometric authentication and real-time notifications keep users engaged and secure.',
    result: '500K+ downloads in the first quarter, 4.8-star App Store rating, and 60% increase in user engagement compared to their previous app.',
  },
  {
    id: 3,
    title: 'Luxury E-Commerce Platform',
    description: 'Premium shopping experience for high-end retail brands.',
    longDescription: 'Bespoke e-commerce solution for luxury goods market.',
    image: project3,
    technologies: ['Vue.js', 'Node.js', 'Stripe', 'Elasticsearch', 'Redis'],
    problem: 'Luxury brands needed an online presence that matched their in-store experience. Generic e-commerce platforms failed to convey the exclusivity and craftsmanship their products deserved.',
    solution: 'We crafted a bespoke e-commerce platform featuring immersive 3D product viewers, personalized recommendations based on purchase history, and white-glove customer service integration. Every interaction feels premium.',
    result: '200% increase in average order value, 35% improvement in conversion rate, and successful expansion to 12 new international markets.',
  },
  {
    id: 4,
    title: 'Healthcare Management System',
    description: 'HIPAA-compliant patient care and telemedicine platform.',
    longDescription: 'Comprehensive healthcare solution for modern medical practices.',
    image: project4,
    technologies: ['React', 'Java', 'Spring Boot', 'MySQL', 'WebRTC'],
    problem: 'Healthcare providers were overwhelmed with paperwork and struggled to provide efficient patient care. The pandemic highlighted the urgent need for telemedicine capabilities.',
    solution: 'We developed an integrated platform combining electronic health records, appointment scheduling, telemedicine consultations, and automated billing. All while maintaining strict HIPAA compliance and data security.',
    result: '70% reduction in administrative overhead, 40% increase in patient satisfaction scores, and seamless transition to telehealth during COVID-19.',
  },
  {
    id: 5,
    title: 'Real Estate Marketplace',
    description: 'AI-powered property discovery with virtual tours.',
    longDescription: 'Modern real estate platform with immersive experiences.',
    image: project5,
    technologies: ['Next.js', 'Python', 'MongoDB', 'Three.js', 'Mapbox'],
    problem: 'Traditional real estate listings failed to capture property essence. Buyers wasted time on properties that didn\'t meet expectations, and sellers struggled to showcase unique features.',
    solution: 'We built a marketplace featuring AI-powered matching algorithms, 3D virtual tours, interactive neighborhood maps, and instant mortgage pre-qualification. Properties are presented as immersive experiences.',
    result: '55% faster time-to-sale, 80% reduction in unnecessary property visits, and expansion to cover 50+ metropolitan areas.',
  },
  {
    id: 6,
    title: 'AI Research Platform',
    description: 'Machine learning infrastructure for data scientists.',
    longDescription: 'Enterprise-grade ML platform for research teams.',
    image: project6,
    technologies: ['Python', 'TensorFlow', 'Kubernetes', 'PostgreSQL', 'React'],
    problem: 'Data science teams spent more time on infrastructure and DevOps than actual research. Model deployment was a bottleneck that slowed innovation.',
    solution: 'We created an end-to-end ML platform with automated experiment tracking, one-click model deployment, and collaborative notebooks. GPU clusters auto-scale based on demand, optimizing costs.',
    result: '3x faster model iteration cycles, 60% reduction in infrastructure costs, and successful deployment of 200+ models in production.',
  },
];

export const Portfolio = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries.
            Each project represents our commitment to excellence and innovation.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
