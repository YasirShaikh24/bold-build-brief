import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Technologies } from '@/components/Technologies';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative noise">
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Technologies />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
