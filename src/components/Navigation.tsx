import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#work' },
  { name: 'Contact', href: '#contact' },
  { name: 'FAQ', href: '#faq' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* LOGO ONLY – TEXT REMOVED */}
          <button onClick={handleLogoClick}>
            <img
              src="/logo1.png"
              alt="InTence Logo"
              className="h-50 md:h-28 w-auto"   // ⬅️ increased size
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={handleContactClick}
              className="px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg font-medium text-sm hover:bg-[#7C3AED] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2 text-white hover:text-[#8B5CF6]"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={handleContactClick}
                className="px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg font-medium text-sm mt-4"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
