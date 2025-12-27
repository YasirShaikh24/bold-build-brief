import { useState, useEffect } from 'react';
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
      <div
        className="group relative overflow-hidden rounded-2xl bg-card border border-border cursor-pointer hover:border-primary/50 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/20">
          {thumbnailImage ? (
            <>
              <img
                src={thumbnailImage}
                alt={project.title || 'Project'}
                className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary-foreground fill-current" />
                </div>
              </div>

              {/* Visit Website Button on Card - Top Right */}
              {project.link && (
                <button
                  onClick={handleVisitWebsite}
                  className={`absolute top-4 right-4 px-4 py-2 bg-primary-foreground text-foreground rounded-lg shadow-lg flex items-center gap-2 text-sm font-semibold z-10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </button>
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
          <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
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
                  className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:bg-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="relative w-full bg-background">
                <img
                  src={images[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  className="w-full h-auto max-h-[50vh] object-contain"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/90 border border-border text-foreground text-sm font-medium">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {project.title}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-2">Technologies Used:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visit Project Button */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Project
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
