import { useEffect, useRef } from 'react';

/**
 * Mouse-tracking 3D tilt on hover. Pure CSS transform, no dependency.
 * Attach the returned ref to the element you want to tilt.
 */
export default function useTilt({ max = 10, scale = 1.02 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => {
      el.style.transition = 'transform 0.05s linear';
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;   // 0..1
      const py = (e.clientY - rect.top) / rect.height;   // 0..1
      const rotateY = (px - 0.5) * 2 * max;
      const rotateX = (0.5 - py) * 2 * max;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    };

    const onLeave = () => {
      el.style.transition = 'transform 0.4s ease';
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [max, scale]);

  return ref;
}
