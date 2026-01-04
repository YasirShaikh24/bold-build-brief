import { Home } from 'lucide-react';

export const About = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Badge */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
            <Home className="w-4 h-4" />
            About Us
          </span>
        </div>

        {/* Main Narrative Text - Italic style like reference */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-white">
            <span className="italic">Built on creativity, collaboration, and top excellence, </span>
            <span className="text-white">InTence is a dynamic team of industry experts committed t</span>
            <span className="text-white/50 italic">o achieving exceptional great results...</span>
          </h2>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => handleScroll('#contact')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};
