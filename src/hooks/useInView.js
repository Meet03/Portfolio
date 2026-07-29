import { useEffect, useRef, useState } from 'react';

/**
 * Reveals a section once it scrolls into view. Fires once, then disconnects.
 * Returns [ref, inView] — spread the ref onto the element you want to watch.
 */
export default function useInView({ threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); o.disconnect(); }
    }, { threshold });
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);

  return [ref, inView];
}
