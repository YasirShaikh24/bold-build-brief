import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

export const FloatingContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsExpanded(false);
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+919265250494';
    setIsExpanded(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Expanded card */}
      {isExpanded && (
        <div
          className="absolute bottom-20 right-0 w-64 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
          style={{
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-3 h-3 text-white" />
          </button>
          
          <h3 className="text-white font-medium mb-2 pr-6">Need help?</h3>
          <p className="text-white/70 text-sm mb-4">
            Get in touch with us for any inquiries or project discussions.
          </p>
          
          <div className="space-y-2">
            <button
              onClick={scrollToContact}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:via-purple-600 hover:to-purple-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300"
            >
              Get In Touch
            </button>
            
            <button
              onClick={handleCallNow}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-600 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </button>
          </div>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-16 h-16 rounded-full bg-[#8B5CF6] flex items-center justify-center shadow-[0_8px_30px_rgba(139,92,246,0.4)] hover:shadow-[0_8px_40px_rgba(139,92,246,0.6)] hover:scale-110 active:scale-90 transition-all duration-300 group"
      >
        <div
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Pulse effect */}
        {!isExpanded && (
          <div
            className="absolute inset-0 rounded-full bg-[#8B5CF6]"
            style={{
              animation: 'pulse 2s infinite',
            }}
          />
        )}
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};