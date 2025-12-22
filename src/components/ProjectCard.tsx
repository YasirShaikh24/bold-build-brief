import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
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

  return (
    <>
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
        className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 cursor-pointer hover:border-primary/50 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-accent via-accent/60 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Play button indicator */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
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
        </div>
      </motion.div>

      {/* Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl">{project.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          {/* Project Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent" />
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border border-primary/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project Story */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-display text-xl font-semibold text-primary mb-3">
                The Problem
              </h4>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-display text-xl font-semibold text-primary mb-3">
                Our Solution
              </h4>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-display text-xl font-semibold text-primary mb-3">
                The Result
              </h4>
              <p className="text-muted-foreground leading-relaxed">{project.result}</p>
            </motion.div>
          </div>

          {/* Action Buttons - Only View Project */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border">
            <Button variant="hero" className="flex-1 sm:flex-none">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};