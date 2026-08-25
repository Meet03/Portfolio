import { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView';

const STATS = [
  { val: 5,  suffix: '+', label: 'Years of experience'          },
  { val: 20, suffix: '+', label: 'Production APIs shipped'       },
  { val: 30, suffix: '%', label: 'Defect reduction at Infosys'   },
  { val: 20, suffix: '%', label: 'Throughput gain at eMids'      },
  { val: 4,  suffix: '',  label: 'Developers led as tech lead'   },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The real number is the DEFAULT state, not the end state. Previously this
// started at 0 and only counted up once the section scrolled into view, so any
// render where the observer never fired — a screenshot, a print, reduced
// motion, a recruiter who lands mid-page — showed "0+ Years of experience".
// The count-up is now a pure enhancement layered on top of a correct value.
function CountUp({ to, suffix, start }) {
  const [n, setN] = useState(to);
  const ran = useRef(false);

  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    if (prefersReducedMotion()) return;   // leave the final value in place

    const duration = 900;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);

  return <>{n}{suffix}</>;
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} style={{ padding: '0 var(--pad)' }}>
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        borderLeft: '1px solid var(--border)',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            padding: 'clamp(32px,5vw,52px) 24px',
            borderRight: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(16px)',
            transition: `all 0.5s ease ${i * 0.08}s`,
          }}>
            <div style={{
              fontFamily: 'var(--serif)', fontWeight: 900, fontStyle: 'italic',
              fontSize: 'clamp(36px,5vw,52px)', color: 'var(--orange)',
              lineHeight: 1, marginBottom: '10px',
            }}>
              <CountUp to={s.val} suffix={s.suffix} start={inView} />
            </div>
            <div style={{
              fontFamily: 'var(--sans)', fontSize: '13px',
              color: 'var(--text-dim)', lineHeight: 1.4, fontWeight: 400,
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
