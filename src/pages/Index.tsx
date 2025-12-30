import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { SupportSection } from '@/components/SupportSection';
import { TechMarquee } from '@/components/TechMarquee';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative bg-background">
      <Navigation />

      {/* Hero Section with video background contained */}
      <div className="relative">
        {/* Video Background - only in hero */}
        <div className="absolute inset-0 z-0 overflow-hidden" style={{ height: '110vh' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ 
              objectPosition: 'center bottom',
              filter: 'brightness(0.8)'
            }}
          >
            <source src="/video/video1.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlay for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10">
          <Hero />
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-background">
        <About />
      </section>

      {/* Portfolio Section */}
      <section className="bg-background">
        <Portfolio />
      </section>

      {/* Support Section */}
      <section className="bg-background">
        <SupportSection />
      </section>

      {/* Tech Marquee */}
      <section className="bg-background">
        <TechMarquee />
      </section>

      {/* FAQ Section */}
      <section className="bg-background">
        <FAQ />
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-background">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
