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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-card"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/80 border border-border">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">
              Web Apps • UI/UX • Scalable Solutions
            </span>
          </div>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-foreground">InTence</span>
          <br />
          <span className="text-gradient">
            Always Good
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Building powerful digital experiences through innovative software
          development and cutting-edge technology
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => handleScroll('#work')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base"
          >
            <Play className="w-5 h-5 mr-2" />
            View Our Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleScroll('#contact')}
            className="border-border hover:bg-card text-foreground px-8 py-6 text-base"
          >
            Contact Us
          </Button>
        </div>
      </div>

      <button
        onClick={() => handleScroll('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
};
