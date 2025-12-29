import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'Firdaus Makeover',
    link: 'https://firdaus-beauty-suite.vercel.app',
    description: 'A high-end, responsive beauty service platform designed for Firdaus Beauty Suite, showcasing professional makeup services and bridal packages.',
    technologies: ['React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    id: 2,
    title: 'Shaden House (Saudi Project)',
    link: 'https://www.shadenhouse.com',
    description: 'A modern, elegant website for a Saudi Arabian luxury property, built with React, Vite, and Tailwind CSS.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 3,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    technologies: [],
  },
  {
    id: 4,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    technologies: [],
  },
  {
    id: 5,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    technologies: [],
  },
  {
    id: 6,
    title: 'Coming Soon',
    link: '',
    description: 'New exciting project in development.',
    technologies: [],
  },
];

export const Portfolio = () => {
  const containerRef = useRef(null);

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={containerRef}>
        <div className="text-center mb-20">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const thumbnailImage = `/projects/project-${project.id}/image-1.jpg`;

  const handleVisitWebsite = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
        <img
          src={thumbnailImage}
          alt={project.title || 'Project'}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        
        {/* Visit Website Button - Always Visible */}
        {project.link && (
          <button
            onClick={handleVisitWebsite}
            className="absolute top-4 right-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg text-sm font-semibold"
          >
            Visit Site
          </button>
        )}
      </div>

      {/* Content Below Image */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold mb-2">
          {project.title || 'Project Title'}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description || 'Add project description here'}
        </p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className="px-3 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};