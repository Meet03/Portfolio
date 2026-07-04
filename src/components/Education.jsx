import { useEffect, useRef, useState } from 'react';

const EDU = [
  {
    degree: 'Post-Graduate Certificate',
    field: 'Web Development',
    school: 'Conestoga College',
    location: 'Waterloo, ON',
    year: '2024',
    note: 'Completed full-time, building 5+ hands-on projects with React, Node.js, MongoDB, and AWS before moving into freelance client work.',
  },
  {
    degree: 'Bachelor of Technology',
    field: 'Information & Communication Technology',
    school: 'Dhirubhai Ambani University',
    location: 'Gujarat, India',
    year: '2019',
    note: 'Foundation in computer science, algorithms, distributed systems, and software engineering.',
  },
];

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold:0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="education" ref={ref} style={{ padding:'var(--section) var(--pad)' }}>
      <div style={{ maxWidth:'var(--max)', margin:'0 auto' }}>
        <div style={{ marginBottom:'clamp(40px,5vw,64px)' }}>
          <span className="u-label">Background</span>
          <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,5vw,48px)',
            fontWeight:700, letterSpacing:'-0.02em' }}>
            Education
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'1px',
          border:'1px solid var(--border)', background:'var(--border)' }}>
          {EDU.map((e, i) => (
            <div key={i} className="card" style={{
              padding:'clamp(28px,4vw,44px)', borderRadius:0, border:'none',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(12px)',
              transition: `all 0.5s ease ${i*0.1}s`,
            }}>
              <div style={{ fontFamily:'var(--serif)', fontStyle:'italic',
                fontSize:'clamp(52px,7vw,72px)', fontWeight:900, color:'var(--border)',
                lineHeight:1, marginBottom:'24px' }}>
                {e.year}
              </div>
              <p style={{ fontFamily:'var(--mono)', fontSize:'10px', letterSpacing:'0.15em',
                textTransform:'uppercase', color:'var(--orange)', marginBottom:'8px' }}>
                {e.degree}
              </p>
              <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(20px,2.5vw,26px)',
                fontWeight:700, letterSpacing:'-0.01em', marginBottom:'10px' }}>
                {e.field}
              </h3>
              <p style={{ fontSize:'14px', fontWeight:500, color:'var(--text-head)',
                marginBottom:'4px' }}>{e.school}</p>
              <p style={{ fontSize:'13px', color:'var(--text-dim)', marginBottom:'20px' }}>
                {e.location}
              </p>
              <p style={{ fontSize:'13px', color:'var(--text-dim)', lineHeight:1.7 }}>{e.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
