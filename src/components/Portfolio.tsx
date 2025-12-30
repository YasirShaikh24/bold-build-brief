import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Firdaus Makeover',
    subtitle: 'Beauty Platform',
    link: 'https://firdaus-beauty-suite.vercel.app',
    description: 'A high-end, responsive beauty service platform designed for Firdaus Beauty Suite.',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 2,
    title: 'Shaden House',
    subtitle: 'Luxury Property',
    link: 'https://www.shadenhouse.com',
    description: 'A modern, elegant website for a Saudi Arabian luxury property.',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'AI Analytics',
    subtitle: 'Data Platform',
    link: '',
    description: 'Leverage AI to analyze trends and predict outcomes for smarter decisions.',
    technologies: ['Python', 'React', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'Computer Vision',
    subtitle: 'AI Solutions',
    link: '',
    description: 'AI-based facial recognition, image analysis, and automation solutions.',
    technologies: ['Python', 'TensorFlow', 'React'],
  },
  {
    id: 5,
    title: 'Speech Recognition',
    subtitle: 'Smart Actions',
    link: '',
    description: 'Develop voice assistants, transcriptions, and speech with AI.',
    technologies: ['Node.js', 'Python', 'React'],
  },
  {
    id: 6,
    title: 'AI Automation',
    subtitle: 'Driven Decisions',
    link: '',
    description: 'Automate tasks, reduce costs, and improve productivity with solutions.',
    technologies: ['Java', 'React', 'PostgreSQL'],
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

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const Portfolio = () => {
  const handleVisit = (link: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-foreground">
            AI-Powered Services for
            <br />
            <span className="text-gradient">Future-Driven Businesses</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our cutting-edge AI solutions are designed to transform businesses,
            enhance efficiency, and drive innovation.
          </p>
        </motion.div>

        {/* Projects Grid - 3 columns desktop, 2 mobile */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              {/* Card Content */}
              <div className="p-5 md:p-6">
                {/* Icon + Arrow */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg">✦</span>
                  </div>
                  {project.link && (
                    <button
                      onClick={() => handleVisit(project.link)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                    </button>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-primary/80 mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary/20">
                  <img
                    src={`/projects/project-${project.id}/image-1.png`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tags */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['AI Content Generation', 'Cybersecurity', 'UX/UI Optimization', 'Data Insight', 'Analytics', 'Personalization', 'Data Analysis', 'Lead Generation'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-card border border-border/50 text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-all cursor-default"
            >
              <span className="mr-2">◈</span>
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
