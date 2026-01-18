import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#hero', isRoute: false },
  { name: 'About', href: '#about', isRoute: false },
  { name: 'Services', href: '#services', isRoute: false },
  { name: 'Portfolio', href: '#work', isRoute: false },
  { name: 'Contact', href: '/contact', isRoute: true },
  { name: 'FAQ', href: '#faq', isRoute: false },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, isRoute: boolean) => {
    setIsMobileMenuOpen(false);
    
    if (isRoute) {
      // Navigate to route and scroll to top
      navigate(href);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    } else {
      // If we're not on home page, navigate home first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation then scroll
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // Already on home, just scroll
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/');
    // Scroll to top when clicking logo
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/contact');
    // Always scroll to top when navigating to contact page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO – MOBILE FIXED, DESKTOP SAME */}
          <button
            onClick={handleLogoClick}
            className="flex items-center"
          >
            <img
              src="/logo1.png"
              alt="InTence Logo"
              className="
                h-10        /* ✅ Mobile perfect size */
                sm:h-12     /* ✅ Small tablets */
                md:h-28     /* ✅ Desktop unchanged */
                w-auto
                object-contain
              "
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href, link.isRoute)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA (Desktop Only) */}
          <div className="hidden md:block">
            <button
              onClick={handleContactClick}
              className="px-6 py-2.5 text-white rounded-lg font-medium text-sm hover:shadow-[0_0_30px_rgba(123,95,193,0.6)] transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #342063, #7B5FC1)'
              }}
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
                  onClick={() => handleNavClick(link.href, link.isRoute)}
                  className="text-left py-2 text-white hover:text-[#8B5CF6]"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={handleContactClick}
                className="px-6 py-2.5 text-white rounded-lg font-medium text-sm mt-4 hover:shadow-[0_0_20px_rgba(123,95,193,0.6)] transition-all duration-300"
                style={{
                  background: 'linear-gradient(90deg, #342063, #7B5FC1)'
                }}
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