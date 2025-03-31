import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    if (!cursor || !cursorOuter) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(cursorOuter, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, cursorOuter], {
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, cursorOuter], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorOuterRef}
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor; 