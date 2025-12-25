import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Technologies } from '@/components/Technologies';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useRef, useEffect, useState } from 'react';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Determine which section is in view
      if (scrollY < windowHeight) {
        setCurrentSection('hero');
      } else if (aboutRef.current && scrollY < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setCurrentSection('about');
      } else if (portfolioRef.current && scrollY < portfolioRef.current.offsetTop + portfolioRef.current.offsetHeight) {
        setCurrentSection('portfolio');
      } else if (techRef.current) {
        setCurrentSection('tech');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get video source based on current section
  const getVideoSource = () => {
    switch (currentSection) {
      case 'hero':
        return '/video1.mp4';
      case 'about':
        return '/video2.mp4';
      case 'portfolio':
        return '/video3.mp4';
      case 'tech':
        return '/video4.mp4';
      default:
        return '/video1.mp4';
    }
  };

  return (
    <main className="relative">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          key={currentSection}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ filter: 'brightness(0.3)' }}
        >
          <source src={getVideoSource()} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <div ref={aboutRef} className="bg-background/90 backdrop-blur-sm">
          <About />
        </div>
        <div ref={portfolioRef} className="bg-background/90 backdrop-blur-sm">
          <Portfolio />
        </div>
        <div ref={techRef} className="bg-background/90 backdrop-blur-sm">
          <Technologies />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;