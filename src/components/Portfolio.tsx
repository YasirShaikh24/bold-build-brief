import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'Firdaus Makeover',
    link: 'https://firdaus-beauty-suite.vercel.app',
    description: 'A high-end, responsive beauty service platform designed for Firdaus Beauty Suite, showcasing professional makeup services and bridal packages.',
    longDescription: 'This web application serves as a digital storefront for Firdaus Beauty Suite. It features a modern, elegant user interface built with React and Tailwind CSS to reflect the luxury and artistry of the makeup industry.',
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
    longDescription: 'Shaden House is a sophisticated web application showcasing premium real estate in Saudi Arabia.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    problem: 'The client needed an international-standard website to showcase their luxury property to potential buyers and investors in the Saudi market.',
    solution: 'Built a high-performance, bilingual-ready website using React and Vite, with Tailwind CSS for responsive design.',
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
  return (
    <section id="work" className="py-24 lg:py-32 bg-card/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects across various industries.
            Each project represents our commitment to excellence and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
