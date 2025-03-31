import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingCells: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cellCount = 20;
    const cells: HTMLDivElement[] = [];
    const colors = ['#60A5FA', '#3B82F6', '#2563EB'];

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      const size = 8 + Math.random() * 16;
      const color = colors[Math.floor(Math.random() * colors.length)];

      cell.className = 'absolute rounded-full backdrop-blur-sm';
      cell.style.width = `${size}px`;
      cell.style.height = `${size}px`;
      cell.style.background = `${color}20`;
      cell.style.border = `1px solid ${color}40`;

      containerRef.current.appendChild(cell);
      cells.push(cell);

      gsap.set(cell, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.5 + Math.random() * 0.5,
      });

      gsap.to(cell, {
        x: `+=${200 - Math.random() * 400}`,
        y: `+=${200 - Math.random() * 400}`,
        scale: 0.8 + Math.random() * 0.4,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: -Math.random() * 10,
      });

      gsap.to(cell, {
        rotation: 360,
        duration: 20 + Math.random() * 30,
        repeat: -1,
        ease: 'none',
      });
    }

    const handleResize = () => {
      cells.forEach(cell => {
        if (parseFloat(cell.style.left) > window.innerWidth) {
          gsap.set(cell, { x: Math.random() * window.innerWidth });
        }
        if (parseFloat(cell.style.top) > window.innerHeight) {
          gsap.set(cell, { y: Math.random() * window.innerHeight });
        }
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cells.forEach(cell => cell.remove());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
};

export default FloatingCells;