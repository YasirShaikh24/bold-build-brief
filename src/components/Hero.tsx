import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Content - Centered with proper spacing */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        {/* Main Heading - Refined sizing like reference */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 tracking-tight leading-[1.15] italic">
          <span className="text-foreground block">InTence</span>
          <span className="text-foreground block">Redefining the Future.</span>
        </h1>

        {/* Subtitle - Smaller, elegant */}
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-2">
          Creating latest solutions that redefine innovation.
        </p>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-8">
          Stay ahead with AI-powered technology for the future.
        </p>

        {/* CTA Buttons - Compact */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={() => handleScroll('#contact')}
            className="px-6 py-2.5 text-sm bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Connect With Us
          </button>
          <button
            onClick={() => handleScroll('#about')}
            className="px-6 py-2.5 text-sm bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
          >
            What is InTence?
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => handleScroll('#about')}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};