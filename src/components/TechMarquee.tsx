import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link2 } from 'lucide-react';

// Tech logos with original brand colors
const techLogos = [
  { 
    name: 'React', 
    color: '#61DAFB',
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)"/>
      </svg>
    )
  },
  { 
    name: 'Node.js', 
    color: '#68A063',
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7" fill="#68A063">
        <path d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.182-.277-.072-.314.496-.165.588-.201 1.101-.493.056-.03.129-.018.185.015l1.87 1.12c.074.036.166.036.221 0l7.319-4.237c.074-.036.11-.11.11-.202V7.768c0-.091-.036-.165-.11-.201l-7.319-4.219c-.073-.037-.165-.037-.221 0L4.552 7.566c-.073.036-.11.129-.11.201v8.457c0 .073.037.166.11.202l2 1.157c1.082.548 1.762-.091 1.762-.716V8.578c0-.11.091-.221.22-.221h.936c.11 0 .22.092.22.221v8.289c0 1.411-.77 2.234-2.11 2.234-.405 0-.733 0-1.633-.442l-1.927-1.102A1.555 1.555 0 0 1 3.25 16.225V7.768c0-.569.312-1.102.772-1.376l7.319-4.237a1.637 1.637 0 0 1 1.544 0l7.319 4.237c.46.274.771.807.771 1.376v8.457c0 .57-.311 1.103-.771 1.376l-7.319 4.237c-.24.128-.517.147-.885.147z"/>
      </svg>
    )
  },
  { 
    name: 'Tailwind', 
    color: '#38BDF8',
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
      </svg>
    )
  },
  { 
    name: 'TypeScript', 
    color: '#3178C6',
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7" fill="#3178C6">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    )
  },
  { 
    name: 'Python', 
    color: '#FFD43B',
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7">
        <path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.403 3.35-3.403h5.766s3.24.052 3.24-3.133V3.15S18.28 0 11.914 0zM8.708 1.82a1.046 1.046 0 1 1 0 2.092 1.046 1.046 0 0 1 0-2.092z"/>
        <path fill="#FFD43B" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121s3.9.445 3.9-5.735c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.403-3.35 3.403H9.451s-3.24-.052-3.24 3.133v5.376S5.72 24 12.086 24zm3.206-1.82a1.046 1.046 0 1 1 0-2.092 1.046 1.046 0 0 1 0 2.092z"/>
      </svg>
    )
  },
  { 
    name: 'Figma', 
    color: '#F24E1E',
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7">
        <path fill="#F24E1E" d="M5 5.5A5.5 5.5 0 0 1 10.5 0H12v11h-1.5A5.5 5.5 0 0 1 5 5.5z"/>
        <path fill="#FF7262" d="M12 0h1.5a5.5 5.5 0 1 1 0 11H12V0z"/>
        <path fill="#1ABCFE" d="M12 12.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0z"/>
        <path fill="#0ACF83" d="M5 19.5A5.5 5.5 0 0 1 10.5 14H12v5.5a5.5 5.5 0 1 1-7 0z"/>
        <path fill="#A259FF" d="M5 12.5A5.5 5.5 0 0 1 10.5 7H12v11h-1.5A5.5 5.5 0 0 1 5 12.5z"/>
      </svg>
    )
  },
];

// Duplicate for seamless loop
const allLogos = [...techLogos, ...techLogos, ...techLogos];

const marqueeText = "InTence seamlessly integrates with leading tools and platforms, ensuring a smooth and efficient workflow.";

export const TechMarquee = () => {
  const textRef = useRef(null);
  const words = marqueeText.split(' ');

  // useScroll and useTransform for reveal effect
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.9", "end 0.6"]
  });

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Link2 className="w-4 h-4" />
            Integrations
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-foreground">
            Seamless Integrations for
            <br />
            <span className="text-muted-foreground">Maximum Efficiency.</span>
          </h2>
          
          {/* Narrative reveal text container */}
          <div ref={textRef} className="max-w-xl mx-auto mb-10">
            <p className="text-base md:text-lg font-light leading-relaxed">
              {words.map((word, index) => {
                const start = index / words.length;
                const end = start + (1 / words.length);
                return (
                  <Word key={index} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>

          <button
            onClick={() => handleScroll('#about')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            View About InTence
          </button>
        </motion.div>

        {/* Marquee */}
        <div className="relative mt-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/30 rounded-full blur-2xl pointer-events-none" />
          
          <div className="overflow-hidden py-6">
            <motion.div
              className="flex gap-6 md:gap-8"
              animate={{ x: ['0%', '-33.33%'] }}
              transition={{
                duration: 25, // FASTER icon speed (reduced from 40s)
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {allLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-card/60 border border-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:border-primary/40 transition-all duration-300 cursor-default group"
                  title={logo.name}
                  style={{
                    boxShadow: `0 0 20px ${logo.color}15`
                  }}
                >
                  <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {logo.svg}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

// Word helper for reveal effect
const Word = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ['rgba(156, 163, 175, 0.3)', 'rgba(255, 255, 255, 1)']);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
};