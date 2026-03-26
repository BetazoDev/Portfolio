import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 600 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 40, stiffness: 200 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor — white dot with mix-blend-difference */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference hidden lg:block rounded-full bg-white"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: isHovering ? 44 : 8,
          height: isHovering ? 44 : 8,
          opacity: 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden lg:block rounded-full border border-white/25"
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          width: isHovering ? 64 : 26,
          height: isHovering ? 64 : 26,
          opacity: isHovering ? 0.5 : 0.2,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 150 }}
      />
    </>
  );
};
