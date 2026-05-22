import { useEffect, useRef, useState } from 'react';

const STATS = [
  { n: '5+',  label: 'Years of experience'         },
  { n: '20+', label: 'Production APIs shipped'      },
  { n: '30%', label: 'Defect reduction at Infosys'  },
  { n: '35%', label: 'API response time improvement'},
  { n: '3+',  label: 'Client projects delivered'    },
];

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold:0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref);

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
            }}>{s.n}</div>
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
