import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop (not mobile/tablet)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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

    window.addEventListener('mousemove', updatePosition);
    
    // Add listeners after a short delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* White dot cursor */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      <style>{`
        .custom-cursor-dot {
          position: fixed;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transition: transform 0.2s ease;
        }

        /* Hide custom cursor on mobile */
        @media (max-width: 768px) {
          .custom-cursor-dot {
            display: none !important;
          }
        }

        /* Hide default cursor on desktop */
        @media (min-width: 769px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};