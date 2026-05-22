import { useEffect, useRef, useState } from 'react';

const JOBS = [
  {
    role: 'Freelance Backend Software Engineer',
    company: 'Contract Projects',
    location: 'Mississauga, ON (Remote)',
    period: 'Aug 2023 – Present',
    type: 'Freelance',
    points: [
      'Designed and deployed RESTful APIs and optimized PostgreSQL queries for 3+ client projects, improving average API response times by 35% and reducing manual workflow time by 40%.',
      'Developed reusable Spring Boot REST API templates on GitHub covering JWT auth, OpenAPI/Swagger, pagination, global exception handling, and RBAC.',
      'Completed Conestoga College Post-Graduate Certificate in Web Development, building 5+ projects with React, Node.js, MongoDB, and AWS.',
      'Deployed personal projects on EC2 with S3 storage and Lambda-based event-driven architecture.',
    ],
    stack: ['Spring Boot', 'PostgreSQL', 'JWT', 'AWS', 'React', 'Node.js'],
  },
  {
    role: 'Senior Software Engineer',
    company: 'eMids Technologies',
    location: 'Karnataka, India',
    period: 'Feb 2023 – Jul 2023',
    type: 'Full-time',
    points: [
      'Led a team of 4 developers to deliver high-impact backend features aligned with product goals.',
      'Improved system throughput by 20% by designing 10 optimized Spring Boot API endpoints with PostgreSQL, documented via OpenAPI/Swagger.',
      'Implemented Docker and Kubernetes for microservices deployment ensuring high availability and fault tolerance.',
      'Established CI/CD pipelines with Jenkins and Maven for automated testing and zero-downtime deploys.',
    ],
    stack: ['Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes', 'Jenkins'],
  },
  {
    role: 'Digital Engineer Specialist',
    company: 'Infosys Limited',
    location: 'Maharashtra, India',
    period: 'Mar 2021 – Feb 2023',
    type: 'Full-time',
    points: [
      'Deployed 20+ Spring Boot RESTful APIs serving high-traffic workflows with zero critical post-deploy failures across 24 months.',
      'Reduced post-deployment defects by 30% by automating API testing pipelines with JUnit, Mockito, RestAssured, and Selenium.',
      'Integrated AWS Lambda and S3 for event-driven, cloud-native architecture in high-availability environments.',
    ],
    stack: ['Spring Boot', 'JUnit', 'Mockito', 'AWS Lambda', 'SonarQube'],
  },
  {
    role: 'Systems Engineer Specialist',
    company: 'Infosys Limited',
    location: 'Maharashtra, India',
    period: 'Jul 2019 – Mar 2021',
    type: 'Full-time',
    points: [
      'Developed multi-threaded batch processing modules processing 1,000+ records/sec with optimised memory management via Gradle.',
      'Managed MS SQL Server and MySQL instances ensuring data integrity and scalability across production systems.',
      'Configured Apache Tomcat with ELK Stack monitoring, reducing system outages by 25%.',
      'Created Jenkins pipelines for automated builds and deployments, enhancing team delivery speed.',
    ],
    stack: ['Spring Boot', 'Gradle', 'MS SQL', 'MySQL', 'ELK Stack', 'Jenkins'],
  },
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

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" ref={ref} style={{ padding:'var(--section) var(--pad)' }}>
      <div style={{ maxWidth:'var(--max)', margin:'0 auto' }}>

        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
          flexWrap:'wrap', gap:'16px', marginBottom:'clamp(40px,5vw,64px)' }}>
          <div>
            <span className="u-label">Career</span>
            <h2 style={{ fontFamily:'var(--serif)', fontSize:'clamp(32px,5vw,48px)',
              fontWeight:700, letterSpacing:'-0.02em' }}>
              Work Experience
            </h2>
          </div>
          <p style={{ fontSize:'14px', color:'var(--text-dim)', maxWidth:'280px', lineHeight:1.7 }}>
            5+ years across enterprise, product, and freelance — India to Canada.
          </p>
        </div>

        <div style={{ border:'1px solid var(--border)' }}>
          {JOBS.map((j, i) => (
            <div key={i} style={{
              borderBottom: i < JOBS.length - 1 ? '1px solid var(--border)' : 'none',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(12px)',
              transition: `all 0.5s ease ${i*0.08}s`,
            }}>
              {/* Row header — always visible */}
              <div onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  display:'grid',
                  gridTemplateColumns: '1fr auto',
                  gap:'24px',
                  padding:'clamp(20px,3vw,28px) clamp(20px,3vw,32px)',
                  cursor:'pointer',
                  background: open === i ? 'var(--orange-light)' : 'var(--bg-card)',
                  transition:'background 0.2s',
                  alignItems:'center',
                }}>
                <div style={{ display:'flex', flexWrap:'wrap', alignItems:'baseline', gap:'16px' }}>
                  <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(17px,2vw,22px)',
                    fontWeight:700, letterSpacing:'-0.01em', color:'var(--text-head)' }}>
                    {j.role}
                  </h3>
                  <span style={{ fontFamily:'var(--sans)', fontSize:'13px',
                    color: open===i ? 'var(--orange-dark)' : 'var(--text-dim)', fontWeight:400 }}>
                    {j.company} · {j.location}
                  </span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'20px', flexShrink:0 }}>
                  <span style={{ fontFamily:'var(--mono)', fontSize:'11px',
                    color:'var(--text-dim)', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>
                    {j.period}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ transform: open===i ? 'rotate(180deg)' : 'none', transition:'transform 0.25s',
                      color: open===i ? 'var(--orange)' : 'var(--text-dim)', flexShrink:0 }}>
                    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Expandable body */}
              <div style={{
                overflow:'hidden',
                maxHeight: open === i ? '600px' : '0',
                transition: 'max-height 0.4s ease',
              }}>
                <div style={{ padding:'0 clamp(20px,3vw,32px) clamp(20px,3vw,28px)',
                  borderTop:`1px solid ${open===i ? 'var(--border)' : 'transparent'}` }}>
                  <ul style={{ listStyle:'none', padding:0, margin:'20px 0 20px',
                    display:'flex', flexDirection:'column', gap:'12px' }}>
                    {j.points.map((p, k) => (
                      <li key={k} style={{ display:'flex', gap:'16px',
                        fontSize:'14px', color:'var(--text)', lineHeight:1.7 }}>
                        <span style={{ color:'var(--orange)', flexShrink:0, fontWeight:600,
                          marginTop:'2px', fontSize:'12px' }}>→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', paddingTop:'16px',
                    borderTop:'1px solid var(--border)' }}>
                    {j.stack.map(t => (
                      <span key={t} style={{ fontFamily:'var(--mono)', fontSize:'11px',
                        color:'var(--text-dim)', border:'1px solid var(--border)',
                        padding:'3px 10px', background:'var(--bg)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
