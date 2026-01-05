import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector('#hero');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
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
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-wide text-white">
              InTence
            </span>
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

          {/* CTA Button */}
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
                  className="text-left py-2 text-white hover:text-[#8B5CF6] transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={handleContactClick}
                className="px-6 py-2.5 bg-[#8B5CF6] text-white rounded-lg font-medium text-sm hover:bg-[#7C3AED] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 mt-4"
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