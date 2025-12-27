import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'Firdaus Makeover',
    link: 'https://firdaus-beauty-suite.vercel.app',
    description: 'A high-end, responsive beauty service platform designed for Firdaus Beauty Suite, showcasing professional makeup services and bridal packages.',
    longDescription: 'This web application serves as a digital storefront for Firdaus Beauty Suite. It features a modern, elegant user interface built with React and Tailwind CSS to reflect the luxury and artistry of the makeup industry. The site includes a dynamic gallery to showcase various makeup styles (Bridal, Editorial, Party), a detailed service menu, and a seamless contact system for client bookings.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    problem: 'Firdaus Beauty Suite needed a professional online presence to provide potential clients with a centralized place to view high-quality portfolio images and service details.',
    solution: 'Developed a high-performance, mobile-first website using Vite and React. I implemented a sophisticated aesthetic using Tailwind CSS and smooth reveal animations to create a premium brand experience.',
    result: 'Successfully established a professional digital identity, resulting in increased client trust and a streamlined booking process through a centralized portfolio.',
  },
  {
    id: 2,
    title: 'Shaden House (Saudi Project)',
    link: 'https://www.shadenhouse.com',
    description: 'A modern, elegant website for a Saudi Arabian luxury property, built with React, Vite, and Tailwind CSS.',
    longDescription: 'Shaden House is a sophisticated web application showcasing premium real estate in Saudi Arabia. The site features a clean, modern design that highlights property details and amenities with an emphasis on visual storytelling.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    problem: 'The client needed an international-standard website to showcase their luxury property to potential buyers and investors in the Saudi market.',
    solution: 'Built a high-performance, bilingual-ready website using React and Vite, with Tailwind CSS for responsive design and Framer Motion for smooth animations that reflect the premium nature of the property.',
    result: 'Delivered a world-class digital presence that effectively communicates the luxury and value of the property to an international audience.',
  },
  {
    id: 3,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    longDescription: '',
    technologies: [],
    problem: '',
    solution: '',
    result: '',
  },
  {
    id: 4,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    longDescription: '',
    technologies: [],
    problem: '',
    solution: '',
    result: '',
  },
  {
    id: 5,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    longDescription: '',
    technologies: [],
    problem: '',
    solution: '',
    result: '',
  },
  {
    id: 6,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    longDescription: '',
    technologies: [],
    problem: '',
    solution: '',
    result: '',
  },

];

export const Portfolio = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundX = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]"
        style={{ x: backgroundX }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"
        style={{ x: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={containerRef}>
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
            Our Work
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries.
            Each project represents our commitment to excellence and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};