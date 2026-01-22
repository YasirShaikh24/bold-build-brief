import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop (not mobile/tablet)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.style.cursor = 'none';
      document.body.classList.add('custom-cursor-active');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.body.style.cursor = 'auto';
      document.body.classList.remove('custom-cursor-active');
    };

    // Add hover effect for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .cursor-pointer'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    // Get the root element (usually the body or a main container)
    const rootElement = document.body;

    // Listen for mouse events on the root element
    rootElement.addEventListener('mousemove', updatePosition);
    rootElement.addEventListener('mouseenter', handleMouseEnter);
    rootElement.addEventListener('mouseleave', handleMouseLeave);
    
    // Add listeners after a short delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    return () => {
      rootElement.removeEventListener('mousemove', updatePosition);
      rootElement.removeEventListener('mouseenter', handleMouseEnter);
      rootElement.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {/* Modern hollow triangular arrow cursor - only show when mouse is within website */}
      {isVisible && (
        <svg
          className="custom-cursor-arrow"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `scale(${isHovering ? 1.15 : 1})`,
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3L21 12L12 13.5L9 21L3 3Z"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}

      <style>{`
        .custom-cursor-arrow {
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: top left;
        }

        /* Hide custom cursor on mobile */
        @media (max-width: 768px) {
          .custom-cursor-arrow {
            display: none !important;
          }
        }

        /* Hide default cursor on all elements when custom cursor is active */
        @media (min-width: 769px) {
          body.custom-cursor-active,
          body.custom-cursor-active *,
          body.custom-cursor-active a,
          body.custom-cursor-active button,
          body.custom-cursor-active input,
          body.custom-cursor-active textarea,
          body.custom-cursor-active select,
          body.custom-cursor-active [role="button"],
          body.custom-cursor-active .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};
