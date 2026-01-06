import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Firdaus Makeover',
    subtitle: 'Beauty Platform',
    link: 'https://firdaus-beauty-suite.vercel.app',
    description: 'A high-end, responsive beauty service platform designed for Firdaus Beauty Suite.',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    showLivePreview: false,
    showLiveBadge: true,
  },
  {
    id: 2,
    title: 'Shaden House',
    subtitle: 'Luxury Property',
    link: 'https://www.shadenhouse.com',
    description: 'A modern, elegant website for a Saudi Arabian luxury property.',
    technologies: ['React', 'Vite', 'Tailwind CSS'],
    showLivePreview: true,
    showLiveBadge: true,
  },
  {
    id: 3,
    title: 'AI Analytics',
    subtitle: 'Data Platform',
    link: '',
    description: 'Leverage AI to analyze trends and predict outcomes for smarter decisions.',
    technologies: ['Python', 'React', 'PostgreSQL'],
    showLivePreview: false,
    showLiveBadge: false,
  },
  {
    id: 4,
    title: 'Computer Vision',
    subtitle: 'AI Solutions',
    link: '',
    description: 'AI-based facial recognition, image analysis, and automation solutions.',
    technologies: ['Python', 'TensorFlow', 'React'],
    showLivePreview: false,
    showLiveBadge: false,
  },
  {
    id: 5,
    title: 'Speech Recognition',
    subtitle: 'Smart Actions',
    link: '',
    description: 'Develop voice assistants, transcriptions, and speech with AI.',
    technologies: ['Node.js', 'Python', 'React'],
    showLivePreview: false,
    showLiveBadge: false,
  },
  {
    id: 6,
    title: 'AI Automation',
    subtitle: 'Driven Decisions',
    link: '',
    description: 'Automate tasks, reduce costs, and improve productivity with solutions.',
    technologies: ['Java', 'React', 'PostgreSQL'],
    showLivePreview: false,
    showLiveBadge: false,
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
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const portfolioText = "Our cutting-edge AI solutions are designed to transform businesses, enhance efficiency, and drive innovation across multiple industries and platforms.";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const color = useTransform(progress, range, ['rgba(255,255,255,0.35)', 'rgba(255,255,255,1)']);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};

const LiveWebsitePreview = ({ url, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg md:rounded-xl bg-secondary/20 border border-border/30">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/40 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-white/70 font-medium">Loading live preview...</span>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/40 z-10">
          <div className="text-center px-4">
            <p className="text-sm text-white/70 mb-2">Preview unavailable</p>
            <p className="text-xs text-white/50">Click "Visit Site" to view</p>
          </div>
        </div>
      )}

      <div className="relative w-full h-full overflow-hidden">
        <iframe
          src={url}
          title={`${title} - Live Preview`}
          className="absolute border-0"
          style={{
            width: '4500px',
            height: '2800px',
            transform: 'scale(0.18)',
            transformOrigin: 'top center',
            pointerEvents: 'none',
            top: '-150px',
            left: '50%',
            marginLeft: '-2250px',
          }}
          sandbox="allow-scripts allow-same-origin allow-popups"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />
      
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/40 backdrop-blur-sm flex items-center gap-1.5 z-10">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-green-400 font-medium">Live</span>
      </div>
    </div>
  );
};

export const Portfolio = () => {
  const textRef = useRef(null);
  const headingRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "end 0.5"]
  });

  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.85", "end 0.6"]
  });

  const handleVisit = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const words = portfolioText.split(' ');
  const headingLine1 = "AI-Powered Services for".split(' ');
  const headingLine2 = "Future-Driven Businesses".split(' ');
  const totalHeadingWords = headingLine1.length + headingLine2.length;

  return (
    <section id="work" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 px-2 sm:px-3 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div 
          className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden"
          style={{
            backgroundImage: 'url(/src/assets/service.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          />
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none z-[1]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Portfolio
          </span>
          
          <div ref={headingRef} className="mb-3 md:mb-4 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] md:leading-[1.4]">
              {headingLine1.map((word, index) => {
                const start = index / totalHeadingWords;
                const end = start + (1 / totalHeadingWords);
                return (
                  <Word key={index} progress={headingProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
              <br />
              {headingLine2.map((word, index) => {
                const globalIndex = headingLine1.length + index;
                const start = globalIndex / totalHeadingWords;
                const end = start + (1 / totalHeadingWords);
                return (
                  <Word key={`line2-${index}`} progress={headingProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </h2>
          </div>
          
          <div ref={textRef} className="max-w-4xl mx-auto mb-4 md:mb-6 px-4">
            <p className="text-sm md:text-base lg:text-lg leading-[1.6] md:leading-[1.7] tracking-tight">
              {words.map((word, index) => {
                const start = index / words.length;
                const end = start + (1 / words.length);
                return (
                  <Word key={index} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>

          <button
            onClick={() => {
              const element = document.querySelector('#contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 md:px-5 md:py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Book a 15-min call
          </button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-base md:text-lg">✦</span>
                  </div>
                  
                  {project.link && (
                    <button
                      onClick={() => handleVisit(project.link)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 z-10 relative"
                      aria-label="Visit project site"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <h3 className="text-base md:text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-primary/80 mb-2 md:mb-3">
                  {project.subtitle}
                </p>

                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                  {project.description}
                </p>

                {project.showLivePreview && project.link ? (
                  <LiveWebsitePreview url={project.link} title={project.title} />
                ) : (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg md:rounded-xl bg-secondary/20">
                    <img
                      src={`/projects/project-${project.id}/image-1.png`}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                    
                    {project.showLiveBadge && project.link && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/40 backdrop-blur-sm flex items-center gap-1.5 z-10">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-400 font-medium">Live</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 md:mt-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['AI Content Generation', 'Cybersecurity', 'UX/UI Optimization', 'Data Insight', 'Analytics', 'Personalization', 'Data Analysis', 'Lead Generation'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-card border border-border/50 text-xs md:text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-all cursor-default"
            >
              <span className="mr-1.5 md:mr-2">◈</span>
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};