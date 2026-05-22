import { useEffect, useRef, useState } from 'react';

const GROUPS = [
  { cat: 'Languages',        items: ['Java', 'SQL', 'JavaScript'] },
  { cat: 'Backend & APIs',   items: ['Spring Boot', 'Spring Security', 'Node.js', 'Express.js', 'REST', 'gRPC', 'OAuth 2.0', 'JWT'] },
  { cat: 'Cloud & DevOps',   items: ['AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Kafka', 'CI/CD'] },
  { cat: 'Databases',        items: ['PostgreSQL', 'MySQL', 'MS SQL Server', 'MongoDB', 'Redis'] },
  { cat: 'Testing & Quality',items: ['JUnit', 'Mockito', 'RestAssured', 'Selenium', 'SonarQube'] },
  { cat: 'Build & Monitoring',items: ['Maven', 'Gradle', 'ELK Stack', 'OpenAPI / Swagger', 'Postman'] },
  { cat: 'Architecture',     items: ['Microservices', 'System Design', 'API Gateway', 'Load Balancing', 'Event-driven'] },
  { cat: 'Frontend',         items: ['React', 'Redux', 'HTML5', 'CSS3', 'Bootstrap'] },
];

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold:0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="skills" ref={ref} style={{ padding:'var(--section) var(--pad)' }}>
      <div style={{ maxWidth:'var(--max)', margin:'0 auto' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
          flexWrap:'wrap', gap:'16px', marginBottom:'clamp(40px,5vw,64px)' }}>
          <div>
            <span className="u-label">Expertise</span>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,5vw,48px)',
              fontWeight:700, color:'var(--text-head)', letterSpacing:'-0.02em' }}>
              Technical Skills
            </h2>
          </div>
          <p style={{ maxWidth:'340px', fontSize:'14px', color:'var(--text-dim)', lineHeight:1.7 }}>
            Full-stack awareness with a deep backend specialisation in Java, distributed systems, and cloud infrastructure.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:'1px',
          border:'1px solid var(--border)', background:'var(--border)' }}>
          {GROUPS.map((g, i) => (
            <div key={g.cat} className="card" style={{
              padding:'28px 30px',
              borderRadius: 0, border:'none',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(12px)',
              transition: `all 0.45s ease ${i*0.05}s`,
            }}>
              <h3 style={{ fontFamily:'var(--mono)', fontSize:'11px', fontWeight:500,
                letterSpacing:'0.12em', textTransform:'uppercase',
                color:'var(--text-head)', marginBottom:'18px' }}>
                {g.cat}
              </h3>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                {g.items.map(item => (
                  <span key={item} style={{
                    fontFamily:'var(--sans)', fontSize:'13px', fontWeight:400,
                    color:'var(--text)', background:'var(--bg)',
                    border:'1px solid var(--border)',
                    padding:'4px 12px',
                    transition:'all 0.15s',
                    cursor:'default',
                  }}
                    onMouseEnter={e=>{
                      e.target.style.background='var(--orange)';
                      e.target.style.borderColor='var(--orange)';
                      e.target.style.color='white';
                    }}
                    onMouseLeave={e=>{
                      e.target.style.background='var(--bg)';
                      e.target.style.borderColor='var(--border)';
                      e.target.style.color='var(--text)';
                    }}
                  >{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
