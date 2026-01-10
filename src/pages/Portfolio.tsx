import { Navigation } from '@/components/Navigation';
import { Portfolio as PortfolioComponent } from '@/components/Portfolio';
import { Footer } from '@/components/Footer';
import { FloatingContactButton } from '@/components/FloatingContactButton';

const Portfolio = () => {
  return (
    <main className="relative bg-background">
      <Navigation />
      <FloatingContactButton />
      
      {/* Portfolio Section */}
      <section className="bg-background pt-20">
        <PortfolioComponent />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Portfolio;