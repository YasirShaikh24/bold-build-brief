import { ChevronDown, Play, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-white">
              Web Apps • UI/UX • Scalable Solutions
            </span>
          </div>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-white">InTence</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Always Good
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12">
          Building powerful digital experiences through innovative software
          development and cutting-edge technology
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="hero"
            size="xl"
            onClick={() => handleScroll('#work')}
          >
            <Play className="w-5 h-5 mr-2" />
            View Our Work
          </Button>
          <Button
            variant="heroOutline"
            size="xl"
            onClick={() => handleScroll('#contact')}
          >
            Contact Us
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => handleScroll('#about')}
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white"
        >
          <span className="text-xs font-medium uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};