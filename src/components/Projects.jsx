import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  {
    num: '01',
    title: 'TiffinConnect',
    period: 'Sep – Dec 2024',
    desc: 'Multi-user subscription and delivery platform serving 3 roles — admin, vendor, and customer — with real-time order tracking and role-based access control.',
    points: [
      'Optimized MongoDB schemas reducing average query time by 40%',
      'Integrated Socket.io for real-time delivery tracking at sub-200ms latency',
      'JWT authentication with Spring Security–style RBAC and full OpenAPI docs',
    ],
    stack: ['Node.js', 'MongoDB', 'JWT', 'Socket.io', 'React', 'Express.js'],
    href: 'https://github.com/Meet03/TiffinConnect',
    visibility: 'Public',
  },
  {
    num: '02',
    title: 'BookEasy',
    period: '2024 – Present',
    desc: 'Full-stack local service booking platform for Mississauga & GTA. Connects customers with local businesses via real-time slot booking, a business dashboard, and live analytics.',
    points: [
      'Real-time slot booking engine with live availability updates',
      'Business dashboard with analytics and booking management',
      'JWT authentication, MongoDB data layer, and Express REST API',
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'HTML', 'CSS', 'JavaScript'],
    href: 'https://github.com/Meet03/BookEasy',
    visibility: 'Private',
  },
  {
    num: '03',
    title: 'Cupid Site',
    period: '2024',
    desc: 'Full website built for Sunny — Cupid Mantra. A modern TypeScript-based web project delivering a polished client-facing experience.',
    points: [
      'Built end-to-end with TypeScript for type safety and maintainability',
      'Clean, responsive UI tailored to the client\u2019s brand and requirements',
      'Deployed as a production site for a real client',
    ],
    stack: ['TypeScript', 'React', 'CSS'],
    href: 'https://github.com/Meet03/cupid-site',
    visibility: 'Private',
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

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" ref={ref} style={{ padding:'var(--section) var(--pad)' }}>
      <div style={{ maxWidth:'var(--max)', margin:'0 auto' }}>

        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
          flexWrap:'wrap', gap:'16px', marginBottom:'clamp(40px,5vw,64px)' }}>
          <div>
            <span className="u-label">Work</span>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,5vw,48px)',
              fontWeight:700, letterSpacing:'-0.02em' }}>
              Featured Projects
            </h2>
          </div>
          <a href="https://github.com/Meet03" target="_blank" rel="noreferrer"
            className="btn btn-outline" style={{ alignSelf:'flex-end' }}>
            All on GitHub ↗
          </a>
        </div>

        <div style={{ display:'flex', flexDirection:'column' }}>
          {PROJECTS.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noreferrer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display:'block', textDecoration:'none',
                borderTop: i===0 ? '1px solid var(--border)' : 'none',
                borderBottom:'1px solid var(--border)',
                padding:'clamp(32px,5vw,56px) 0',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${i*0.12}s, transform 0.5s ease ${i*0.12}s`,
              }}>
              <div style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:'clamp(24px,4vw,60px)',
                alignItems:'start' }}>

                {/* Number */}
                <span style={{ fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:700,
                  fontSize:'clamp(36px,5vw,56px)', lineHeight:1,
                  color: hovered===i ? 'var(--orange)' : 'var(--border)',
                  transition:'color 0.2s' }}>
                  {p.num}
                </span>

                <div>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between',
                    flexWrap:'wrap', gap:'12px', marginBottom:'16px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
                      <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(22px,3vw,32px)',
                        fontWeight:700, letterSpacing:'-0.02em', color:'var(--text-head)',
                        transition:'color 0.2s' }}>
                        {p.title}
                      </h3>
                      <span style={{ fontFamily:'var(--mono)', fontSize:'10px', letterSpacing:'0.1em',
                        textTransform:'uppercase', padding:'3px 10px',
                        border:'1px solid var(--border)', color:'var(--text-dim)',
                        background:'var(--bg)', flexShrink:0 }}>{p.visibility}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px', flexShrink:0 }}>
                      <span style={{ fontFamily:'var(--mono)', fontSize:'11px', color:'var(--text-dim)',
                        letterSpacing:'0.05em' }}>{p.period}</span>
                      <span style={{
                        fontFamily:'var(--mono)', fontSize:'11px',
                        transform: hovered===i ? 'translateX(4px)' : 'none',
                        transition:'transform 0.2s', color:'var(--orange)',
                      }}>↗</span>
                    </div>
                  </div>

                  <p style={{ fontSize:'15px', color:'var(--text)', lineHeight:1.7,
                    maxWidth:'600px', marginBottom:'20px' }}>{p.desc}</p>

                  <ul style={{ listStyle:'none', padding:0, marginBottom:'20px',
                    display:'flex', flexDirection:'column', gap:'8px' }}>
                    {p.points.map((pt, k) => (
                      <li key={k} style={{ display:'flex', gap:'12px',
                        fontSize:'13px', color:'var(--text-dim)', lineHeight:1.6 }}>
                        <span style={{ color:'var(--orange)', flexShrink:0 }}>—</span> {pt}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                    {p.stack.map(t => (
                      <span key={t} style={{ fontFamily:'var(--mono)', fontSize:'11px',
                        color:'var(--text-dim)', border:'1px solid var(--border)',
                        padding:'3px 10px', background:'var(--bg)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}