import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
<<<<<<< HEAD
      className="relative flex items-start justify-center overflow-hidden pt-32"
      style={{ minHeight: '110vh' }}
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-5 tracking-tight leading-[1.1]">
          <span className="text-white block">InTence</span>
          <span className="text-white block">Redefining the Future.</span>
=======
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden"
    >
      {/* Content - Positioned higher for floating effect */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center -mt-24 md:-mt-32">
        {/* Main Heading - Larger fonts */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal mb-6 tracking-tight leading-[1.05]">
          <span className="text-foreground block">InTence</span>
          <span className="text-foreground block">Redefining the Future.</span>
>>>>>>> c1c84f9401b4b7c124de2af4d80b6dc293ae60af
        </h1>

        {/* Subtitle - Slightly larger */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
          Creating latest solutions that redefine innovation.
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Stay ahead with AI-powered technology for the future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => handleScroll('#contact')}
            className="btn-primary"
          >
            Connect With Us
          </button>
          <button
            onClick={() => handleScroll('#about')}
            className="btn-secondary"
          >
            What is InTence?
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
<<<<<<< HEAD
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
=======
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
>>>>>>> c1c84f9401b4b7c124de2af4d80b6dc293ae60af
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
