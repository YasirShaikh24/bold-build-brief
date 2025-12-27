import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ExternalLink, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  link?: string;
  description: string;
  longDescription: string;
  technologies: string[];
  problem: string;
  solution: string;
  result: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailImage, setThumbnailImage] = useState<string>('');

  useEffect(() => {
    const loadImages = async () => {
      const imageList: string[] = [];
      const extensions = ['jpg', 'jpeg', 'png', 'webp'];
      
      for (let imageIndex = 1; imageIndex <= 20; imageIndex++) {
        let imageFound = false;
        
        for (const ext of extensions) {
          try {
            const imagePath = `/projects/project-${project.id}/image-${imageIndex}.${ext}`;
            const imageExists = await new Promise<boolean>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
              img.src = imagePath;
            });
            
            if (imageExists) {
              imageList.push(imagePath);
              imageFound = true;
              break;
            }
          } catch (error) {
            continue;
          }
        }
        
        if (!imageFound && imageIndex > 1) break;
      }
      
      setImages(imageList);
      if (imageList.length > 0) {
        setThumbnailImage(imageList[0]);
      }
    };

    if (project.id) loadImages();
  }, [project.id]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleVisitWebsite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: index * 0.12 }}
        whileHover={{ 
          y: -10, 
          scale: 1.02,
          boxShadow: "0 30px 60px hsl(var(--primary) / 0.2)"
        }}
        className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
          {thumbnailImage ? (
            <>
              <motion.img
                src={thumbnailImage}
                alt={project.title || 'Project'}
                className="w-full h-full object-cover"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.6 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              
              <motion.div
                className="absolute inset-0 bg-black/20"
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </motion.div>

              {/* Visit Website Button on Card - Top Right */}
              {project.link && (
                <motion.button
                  onClick={handleVisitWebsite}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 px-4 py-2 bg-white text-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-semibold z-10"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </motion.button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm">No Image</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Below Image */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
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
      </motion.div>

      {/* Modal - Compact, Everything Visible */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl h-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image Gallery - Adjusted to image aspect ratio */}
            {images.length > 0 && (
              <div className="relative w-full bg-gradient-to-r from-black via-white to-black">
                <img
                  src={images[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[55vh] object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-700 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-700 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content Section - Compact */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Technologies Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium bg-white text-gray-700 rounded-full shadow-sm border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visit Project Button - Right Side */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Project
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};