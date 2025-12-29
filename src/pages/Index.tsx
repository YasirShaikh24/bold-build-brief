import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Technologies } from '@/components/Technologies';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative bg-black">
      {/* Fixed Background Video - Only video1, fully visible */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(1)' }}
        >
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>
        {/* Very light overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <div id="hero" style={{ minHeight: '100vh' }}>
          <Hero />
        </div>

        {/* About Section - Black background */}
        <div id="about" className="bg-black" style={{ minHeight: '100vh' }}>
          <About />
        </div>

        {/* Portfolio Section - Black background */}
        <div id="work" className="bg-black" style={{ minHeight: '100vh' }}>
          <Portfolio />
        </div>

        {/* Technologies/Contact/Footer Section - Black background */}
        <div id="tech" className="bg-black">
          <Technologies />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;