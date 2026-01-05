import { Code, Blocks, Server, Brain } from 'lucide-react';

const techIcons = [
  { name: 'React', icon: Blocks },
  { name: 'Node.js', icon: Server },
  { name: 'Python', icon: Code },
  { name: 'AI / ML', icon: Brain },
];

export const Hero = () => {
  const handleScroll = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-start overflow-hidden"
    >
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center pt-24 md:pt-28 lg:pt-32">
        {/* Main Heading */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight leading-[1.1]"
          style={{
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <span className="block">InTence</span>
          <span 
            className="block mt-1"
            style={{ color: 'rgba(255, 255, 255, 0.85)' }}
          >
            Redefining the Future.
          </span>
        </h1>

        {/* Subtitle */}
        <div>
          <p 
            className="text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-1 leading-relaxed"
            style={{
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Creating latest solutions that redefine innovation.
          </p>
          <p 
            className="text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
            style={{
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Stay ahead with AI-powered technology for the future.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={() => handleScroll('#contact')}
            className="group relative px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg font-medium text-sm overflow-hidden transition-all duration-300 hover:bg-[#7C3AED] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            <span className="relative z-10">Get In Touch</span>
          </button>

          <button
            className="group px-6 py-2.5 bg-white/5 text-white rounded-lg font-medium text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            What is InTence?
          </button>
        </div>
      </div>

      {/* Scrolling Tech Strip */}
      <div className="relative w-full pb-16 z-10 flex flex-col items-center">
        {/* Subtle line above */}
        <div className="w-full max-w-2xl h-px bg-white/10 mb-6" />
        
        {/* Container that shows only 3-4 items */}
        <div className="relative w-full max-w-2xl overflow-hidden">
          <div 
            className="flex gap-12 items-center animate-scroll"
            style={{
              animation: 'scroll 30s linear infinite',
            }}
          >
            {/* Duplicate array multiple times for seamless loop */}
            {[...techIcons, ...techIcons, ...techIcons, ...techIcons, ...techIcons, ...techIcons].map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 flex items-center gap-2"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.4)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <Icon 
                    className="w-4 h-4" 
                    style={{ 
                      opacity: 0.5,
                      strokeWidth: 1.5,
                    }} 
                  />
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};