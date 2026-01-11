import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Portfolio } from '@/components/Portfolio';
import { SupportSection } from '@/components/SupportSection';
import { TechMarquee } from '@/components/TechMarquee';
import { FAQ } from '@/components/FAQ';
import { Reviews } from '@/components/Reviews';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingContactButton } from '@/components/FloatingContactButton';

const Index = () => {
  return (
    <main className="relative bg-background">
      <Navigation />
      <FloatingContactButton />

      {/* Hero Section with video background - positioned lower */}
      <div className="relative min-h-[100vh]">
        {/* Video Background - pushed to bottom portion - MORE VISIBLE */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 top-[25vh]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{ 
                objectPosition: 'center center',
                filter: 'brightness(0.85) contrast(1.1)' // Increased visibility
              }}
            >
              <source src="/video/video1.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Gradient overlay for smooth transition - Lighter */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-black/30 to-transparent" style={{ height: '35vh' }} />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
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

      {/* Services Section */}
      <section className="bg-background">
        <Services />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-background">
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

      {/* Reviews Section */}
      <section className="bg-background">
        <Reviews />
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