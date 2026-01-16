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

      {/* Hero Section with video background - responsive positioning */}
      <div className="relative min-h-[100vh]">
        {/* Video Background - responsive positioning */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Desktop: video starts from 25vh, Mobile: video starts from 15vh */}
          <div className="absolute inset-0 top-[15vh] md:top-[25vh]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              style={{ 
                objectPosition: 'center center',
                filter: 'brightness(0.85) contrast(1.1)'
              }}
            >
              <source src="/video/video1.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Gradient overlay - responsive height */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-black/30 to-transparent h-[20vh] md:h-[35vh]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-background to-transparent" />
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

      {/* Reviews Section (Testimonials) */}
      <section className="bg-background">
        <Reviews />
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