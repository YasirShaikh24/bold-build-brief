import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Custom hook for mouse tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return { mousePosition, updateMousePosition };
};

// Mouse-following View Now component
const MouseFollowViewNow = ({ mousePosition, isVisible }: { mousePosition: { x: number; y: number }, isVisible: boolean }) => {
  return (
    <div
      className={`absolute pointer-events-none z-30 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: mousePosition.x - 50, // Center the button on cursor
        top: mousePosition.y - 20,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="px-4 py-2 bg-white text-black rounded-full font-semibold text-sm shadow-lg whitespace-nowrap">
        View Now
      </div>
    </div>
  );
};

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
    imageName: 'image-1.png' // Explicitly naming the file
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
    imageName: 'image-1.png'
  },
  {
    id: 3,
    title: 'Islamic Deeds Tracker',
    subtitle: 'Faith & Productivity Platform',
    link: 'https://islamic-deeds-tracker.vercel.app/',
    description: 'A minimal and spiritually focused web app designed to help Muslims track daily good deeds, strengthen consistency in worship, and stay mindful of Islamic goals.',
    technologies: ['Python', 'React', 'PostgreSQL'],
    showLivePreview: false,
    showLiveBadge: true,
    imageName: 'image-3.png' // Matches your screenshot
  },
  {
    id: 4,
    title: 'Dual Sync',
    subtitle: 'Productivity & Sync Tool',
    link: 'https://dualsync-ojd8q93.public.builtwithrocket.new/',
    description: 'A simple and powerful web app built to help users sync data seamlessly across devices and platforms with minimal setup, designed for fast and reliable syncing of data through a clean and intuitive interface.',
    technologies: ['Python', 'TensorFlow', 'React'],
    showLivePreview: false,
    showLiveBadge: true,
    imageName: 'image-4.png'
  },
  {
    id: 5,
    title: 'NOVA',
    subtitle: 'Modern Shopping Experience',
    link: 'https://nova-ecommerce-website.netlify.app/',
    description: 'A modern and responsive e-commerce web app that allows users to browse products and shop online with ease.Built for a smooth, fast, and user-friendly shopping experience across all devices.',
    technologies: ['Node.js', 'Python', 'React'],
    showLivePreview: false,
    showLiveBadge: true,
    imageName: 'image-5.png'
  },
  {
    id: 6,
    title: 'Sagir Trader',
    subtitle: 'Enterprise Trading Solutions',
    link: 'https://sagir-trader.netlify.app',
    description: 'A powerful and responsive trading dashboard that enables users to track market movements, manage their portfolio, and analyze financial data in real time with a clean and intuitive interface designed for fast decision-making and seamless user experience.',
    technologies: ['Java', 'React', 'PostgreSQL'],
    showLivePreview: false,
    showLiveBadge: true,
    imageName: 'image-6.png'
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
  },
};

const portfolioText = "Our cutting-edge AI solutions are designed to transform businesses, enhance efficiency, and drive innovation across multiple industries and platforms.";

const LiveWebsitePreview = ({ url, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="relative aspect-[16/10] overflow-hidden rounded-lg md:rounded-xl bg-secondary/20 border border-border/30 cursor-pointer hover:border-primary/30 transition-colors duration-300"
      onClick={handleClick}
    >
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
            <p className="text-xs text-white/50">Click to visit site</p>
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
  const { mousePosition, updateMousePosition } = useMousePosition();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const animated = sessionStorage.getItem('portfolioAnimated');
    if (!animated) {
      sessionStorage.setItem('portfolioAnimated', 'true');
    } else {
      setHasAnimated(true);
    }
  }, []);

  const handleVisit = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="work" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 px-2 sm:px-3 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div 
          className="w-full h-full rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden"
          style={{
            backgroundImage: 'url(/service.png)',
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
          
          <div className="mb-3 md:mb-4 px-4">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
              initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(12px)', x: -30 }}
              whileInView={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 1, filter: 'blur(0px)', x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, delay: hasAnimated ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span 
                className="inline-block mr-[0.25em] text-white"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                AI-Powered
              </motion.span>
              <motion.span 
                className="inline-block mr-[0.25em] text-white"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Services
              </motion.span>
              <motion.span 
                className="inline-block mr-[0.25em] text-white"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                for
              </motion.span>
              <br />
              <motion.span 
                className="inline-block mr-[0.25em] text-white/70"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Future-Driven
              </motion.span>
              <motion.span 
                className="inline-block mr-[0.25em] text-white/70"
                initial={hasAnimated ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -25 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: hasAnimated ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Businesses
              </motion.span>
            </motion.h2>
          </div>
          
          <div className="max-w-4xl mx-auto mb-4 md:mb-6 px-4">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/60">
              Our cutting-edge AI solutions are designed to transform businesses, enhance efficiency, and drive innovation across multiple industries and platforms.
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = '/portfolio-more';
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-2xl font-semibold text-base hover:bg-purple-700 hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] transition-all duration-300 transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(147, 51, 234, 0.4)'
            }}
          >
            View More Projects
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
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                      <span className="text-xs">↗</span>
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
                  <div 
                    className="relative aspect-[16/10] overflow-hidden rounded-lg md:rounded-xl bg-secondary/20 border border-border/30 cursor-pointer hover:border-primary/30 transition-colors duration-300 group"
                    onClick={() => project.link && window.open(project.link, '_blank', 'noopener,noreferrer')}
                    onMouseMove={updateMousePosition}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <LiveWebsitePreview url={project.link} title={project.title} />
                    
                    {/* Dark overlay on hover */}
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    {/* Mouse-following View Now Button */}
                    <MouseFollowViewNow 
                      mousePosition={mousePosition} 
                      isVisible={hoveredProject === project.id} 
                    />
                  </div>
                ) : (
                  <div 
                    className="relative aspect-[16/10] overflow-hidden rounded-lg md:rounded-xl bg-secondary/20 cursor-pointer hover:border-primary/30 border border-transparent transition-colors duration-300 group"
                    onClick={() => project.link && window.open(project.link, '_blank', 'noopener,noreferrer')}
                    onMouseMove={updateMousePosition}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <img
                      src={`/projects/project-1/${project.imageName}`}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    
                    {/* Dark overlay on hover */}
                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    {/* Mouse-following View Now Button */}
                    <MouseFollowViewNow 
                      mousePosition={mousePosition} 
                      isVisible={hoveredProject === project.id} 
                    />
                    
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
          className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { name: 'AI Content Generation', icon: '✨' },
            { name: 'Cybersecurity', icon: '🔒' },
            { name: 'UX/UI Optimization', icon: '🎨' },
            { name: 'Data Insight', icon: '📊' },
            { name: 'Analytics', icon: '⏱️' },
            { name: 'Personalization', icon: '⭐' },
            { name: 'Data Analysis', icon: '📈' },
            { name: 'Lead Generation', icon: '🎯' }
          ].map((tag) => (
            <div
              key={tag.name}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-primary/20 hover:border-primary/40 transition-all cursor-default"
            >
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-white">{tag.icon}</span>
              </div>
              <span className="text-sm text-white font-medium">
                {tag.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};