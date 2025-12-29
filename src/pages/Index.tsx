import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Technologies } from '@/components/Technologies';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';

const Index = () => {
  const [currentVideo, setCurrentVideo] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate thresholds for video switching
      const heroEnd = windowHeight * 0.5;
      const aboutEnd = windowHeight * 1.5;
      const portfolioEnd = windowHeight * 2.5;

      // Switch videos based on scroll position
      if (scrollY < heroEnd) {
        setCurrentVideo(1);
      } else if (scrollY < aboutEnd) {
        setCurrentVideo(2);
      } else if (scrollY < portfolioEnd) {
        setCurrentVideo(3);
      } else {
        setCurrentVideo(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          key={currentVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.4)' }}
        >
          <source src={`/video/video${currentVideo}.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <div id="hero" style={{ minHeight: '100vh' }}>
          <Hero />
        </div>

        {/* About Section - Transparent to show video */}
        <div id="about" style={{ minHeight: '100vh' }}>
          <About />
        </div>

        {/* Portfolio Section */}
        <div id="work" className="bg-background/85 backdrop-blur-sm" style={{ minHeight: '100vh' }}>
          <Portfolio />
        </div>

        {/* Technologies/Contact/Footer Section */}
        <div id="tech" className="bg-background/85 backdrop-blur-sm">
          <Technologies />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;