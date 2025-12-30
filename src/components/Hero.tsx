import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex items-start justify-center overflow-hidden pt-32"
      style={{ minHeight: '110vh' }}
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-5 tracking-tight leading-[1.1]">
          <span className="text-white block">InTence</span>
          <span className="text-white block">Redefining the Future.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base text-gray-400 max-w-2xl mx-auto mb-1.5">
          Creating latest solutions that redefine innovation.
        </p>
        <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8">
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
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => handleScroll('#about')}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
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