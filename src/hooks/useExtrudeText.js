import { useEffect, useRef } from 'react';

/**
 * Gives a heading real depth via layered text-shadow (poor-man's extrusion),
 * tilting toward the cursor as it moves across `containerRef`.
 */
export default function useExtrudeText(containerRef, color, { depth = 14, max = 18 } = {}) {
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const apply = (rx, ry) => {
      const dir = ry >= 0 ? 1 : -1;
      const layers = [];
      for (let i = 1; i <= depth; i++) {
        const alpha = Math.round((1 - i / depth) * 50 + 8);
        layers.push(`${i * 0.35 * dir}px ${i * 0.55}px 0 ${color}${alpha.toString(16).padStart(2, '0')}`);
      }
      text.style.textShadow = layers.join(',');
      text.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg)`;
    };

    apply(0, 0);
    if (reduced) return;

    const applyFromPoint = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width - 0.5;
      const py = (clientY - rect.top) / rect.height - 0.5;
      apply(py * max * 0.6, px * max);
    };

    const onMove = (e) => applyFromPoint(e.clientX, e.clientY);
    const onLeave = () => apply(0, 0);
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (t) applyFromPoint(t.clientX, t.clientY);
    };
    const onTouchEnd = () => apply(0, 0);

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchcancel', onTouchEnd);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [containerRef, color, depth, max]);

  return textRef;
}
