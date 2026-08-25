import useInView from '../hooks/useInView';

const GROUPS = [
  { cat: 'Languages',         items: ['Java 8 / 11 / 17', 'Java EE / J2EE', 'SQL', 'PL/SQL', 'JavaScript', 'TypeScript'] },
  { cat: 'Core Java',         items: ['Multithreading & Concurrency', 'Collections', 'Exception Handling', 'JVM Performance Tuning', 'Data Structures', 'Design Patterns', 'SOLID'] },
  { cat: 'Backend & APIs',    items: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data JPA', 'Spring Cloud', 'Hibernate', 'REST', 'SOAP / XML', 'OAuth 2.0', 'JWT'] },
  { cat: 'Architecture',      items: ['Microservices', 'System Design', 'API Gateway', 'Service Discovery', 'Circuit Breaker', 'Distributed Tracing', 'Event-driven', 'Idempotency & Reconciliation'] },
  { cat: 'Databases',         items: ['Oracle', 'PostgreSQL', 'MS SQL Server', 'MySQL', 'Data Modelling', 'Indexing', 'Query Optimization'] },
  { cat: 'Cloud & DevOps',    items: ['AWS (EC2, S3, Lambda)', 'Azure', 'OpenShift', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Git', 'Maven'] },
  { cat: 'Testing & Quality', items: ['JUnit', 'Mockito', 'RestAssured', 'TDD', 'SonarQube', 'OpenAPI / Swagger', 'Postman'] },
  { cat: 'Personal Projects', items: ['Kafka', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'Socket.io', 'HTML5', 'CSS3'] },
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05 });

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
            Deep backend specialisation in Java and Spring Boot, distributed systems, and the relational data layer — with the personal-project stack listed separately, not blended in.
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

        {/* Honesty note: mirrors exactly what the resume and cover letters state,
            so a recruiter cross-checking the two never finds a discrepancy. */}
        <p style={{
          marginTop: '24px', fontSize: '13px', lineHeight: 1.7,
          color: 'var(--text-dim)', maxWidth: '760px',
        }}>
          <strong style={{ color: 'var(--text-head)', fontWeight: 600 }}>On the last group:</strong>{' '}
          those are personal-project depth, not production experience. Production event-driven work
          is AWS Lambda and S3 rather than a Kafka cluster, and the JavaScript stack comes from a
          full-stack side project. Production depth is Java and Spring Boot on Oracle, MS SQL Server
          and PostgreSQL.
        </p>
      </div>
    </section>
  );
}
