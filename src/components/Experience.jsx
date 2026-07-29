import { useState } from 'react';
import useInView from '../hooks/useInView';

const JOBS = [
  {
    role: 'Freelance Software Engineer',
    company: 'Self-Employed',
    location: 'Canada',
    period: 'Jan 2025 – Present',
    client: 'Small-business clients (restaurants, salon, convenience store) — names withheld under NDA',
    points: [
      'Built and shipped full-stack web applications from scratch — owning solution architecture, API design, and deployment — using React, Bootstrap, Java/Spring Boot, and REST APIs for small-business clients.',
      "Took ownership of an existing client's underperforming production system, engineering targeted SQL indexing and query optimization to resolve performance bottlenecks.",
      'Containerized and orchestrated services using Docker and Kubernetes, running production workloads on AWS.',
      'Managed the full client lifecycle — requirements gathering, technical scoping, and delivery — across concurrent engagements with restaurant, salon, and retail clients.',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'Bootstrap', 'Docker', 'Kubernetes', 'AWS', 'SQL', 'REST APIs'],
  },
  {
    role: 'Senior Software Engineer',
    company: 'eMids Technologies',
    location: 'Karnataka, India',
    period: 'Feb 2023 – Jul 2023',
    client: 'Greenfield Finance Platform',
    points: [
      'Led a team of 4 developers, acting as technical lead — driving architecture and design reviews — while delivering Spring Boot microservices in an Agile environment.',
      'Designed and deployed 10 optimized RESTful API endpoints with PostgreSQL, improving system throughput by 20%, documented via OpenAPI/Swagger.',
      'Implemented Docker, Kubernetes, and OpenShift for microservices deployment, ensuring high availability and fault-tolerant architecture.',
      'Adopted Azure cloud services to support deployment, monitoring, and scaling of Spring Boot microservices.',
      'Established CI/CD pipelines using Jenkins with integrated automated testing, enabling zero-downtime deployments across all environments.',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes', 'OpenShift', 'Azure', 'Jenkins', 'CI/CD', 'REST APIs', 'Agile'],
  },
  {
    role: 'Software Engineer — Digital Engineer Specialist',
    company: 'Infosys Limited',
    location: 'Maharashtra, India',
    period: 'Mar 2021 – Feb 2023',
    client: 'Trade Credit Insurance / Financial Services',
    points: [
      'Designed and shipped 20+ production Spring MVC/Spring Boot microservices and REST APIs — zero critical post-deploy failures across 24 consecutive months.',
      'Owned Oracle and MS SQL Server data layers for high-volume transactional processing.',
      'Reduced post-deployment defects by 30% by building automated API testing pipelines using JUnit, Mockito, and RestAssured.',
      'Integrated AWS Lambda and S3 to support event-driven architecture in high-traffic production environments.',
      'Developed Oracle SQL/PL-SQL stored procedures and Hibernate data layers for high-volume transactional processing; mentored junior developers through code review.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring MVC', 'Oracle', 'MS SQL Server', 'AWS Lambda', 'S3', 'Hibernate', 'JUnit', 'Mockito', 'RestAssured'],
  },
  {
    role: 'Software Engineer — Systems Engineer Specialist',
    company: 'Infosys Limited',
    location: 'Maharashtra, India',
    period: 'Jul 2019 – Mar 2021',
    points: [
      'Built multi-threaded Spring Boot batch services processing 1,000+ records/second, applying Core Java concurrency and multithreading expertise to sustain high-volume throughput.',
      'Configured and maintained Apache Tomcat application servers with proactive system monitoring, reducing service outages by 25%.',
      'Administered Oracle, MS SQL Server, and MySQL databases with PL-SQL optimization alongside multi-threaded batch processing.',
    ],
    stack: ['Java', 'Spring Boot', 'Apache Tomcat', 'Oracle', 'MS SQL Server', 'MySQL', 'PL-SQL'],
  },
  {
    role: 'Data Engineer Intern',
    company: 'GE Digital',
    location: 'Bangalore, India',
    period: 'Jan 2019 – Jun 2019',
    points: [
      'Built ETL pipelines and complex SQL queries against large-scale enterprise datasets to support reporting.',
      'Gained hands-on exposure to CI/CD workflows, version control, and Agile development practices in a production engineering environment.',
    ],
    stack: ['Java', 'PHP', 'SQL', 'ETL', 'CI/CD'],
  },
];

function JobRow({ job, index, isOpen, onToggle, inView, isLast }) {
  const panelId = `job-panel-${index}`;

  return (
    <div style={{
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(12px)',
      transition: `all 0.5s ease ${index * 0.08}s`,
    }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={{
          width: '100%',
          textAlign: 'left',
          font: 'inherit',
          color: 'inherit',
          border: 'none',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '24px',
          padding: 'clamp(20px,3vw,28px) clamp(20px,3vw,32px)',
          cursor: 'pointer',
          background: isOpen ? 'var(--orange-light)' : 'var(--bg-card)',
          transition: 'background 0.2s',
          alignItems: 'center',
        }}>
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '16px' }}>
            <h3 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(17px,2vw,22px)',
              fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-head)',
            }}>
              {job.role}
            </h3>
            <span style={{
              fontFamily: 'var(--sans)', fontSize: '13px',
              color: isOpen ? 'var(--orange-dark)' : 'var(--text-dim)', fontWeight: 400,
            }}>
              {job.company} · {job.location}
            </span>
          </div>
          {job.client && (
            <p style={{
              fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)',
              marginTop: '8px', letterSpacing: '0.02em', lineHeight: 1.5,
            }}>
              Client: {job.client}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '11px',
            color: 'var(--text-dim)', letterSpacing: '0.05em', whiteSpace: 'nowrap',
          }}>
            {job.period}
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s',
              color: isOpen ? 'var(--orange)' : 'var(--text-dim)', flexShrink: 0,
            }}>
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* 0fr → 1fr animates to the content's natural height — no JS measurement,
          so bullet lists of any length expand fully instead of clipping. */}
      <div id={panelId} role="region" aria-label={`${job.role} at ${job.company} details`} style={{
        display: 'grid',
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.4s ease',
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
        <div style={{
          padding: '0 clamp(20px,3vw,32px) clamp(20px,3vw,28px)',
          borderTop: `1px solid ${isOpen ? 'var(--border)' : 'transparent'}`,
        }}>
          <ul style={{
            listStyle: 'none', padding: 0, margin: '20px 0 20px',
            display: 'flex', flexDirection: 'column', gap: '12px',
          }}>
            {job.points.map((p, k) => (
              <li key={k} style={{
                display: 'flex', gap: '16px',
                fontSize: '14px', color: 'var(--text)', lineHeight: 1.7,
              }}>
                <span aria-hidden="true" style={{
                  color: 'var(--orange)', flexShrink: 0, fontWeight: 600,
                  marginTop: '2px', fontSize: '12px',
                }}>→</span>
                {p}
              </li>
            ))}
          </ul>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '16px',
            borderTop: '1px solid var(--border)',
          }}>
            {job.stack.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--mono)', fontSize: '11px',
                color: 'var(--text-dim)', border: '1px solid var(--border)',
                padding: '3px 10px', background: 'var(--bg)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" ref={ref} style={{ padding: 'var(--section) var(--pad)' }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>

        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px', marginBottom: 'clamp(40px,5vw,64px)',
        }}>
          <div>
            <span className="u-label">Career</span>
            <h2 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(32px,5vw,48px)',
              fontWeight: 700, letterSpacing: '-0.02em',
            }}>
              Work Experience
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-dim)', maxWidth: '280px', lineHeight: 1.7 }}>
            5+ years across enterprise and product engineering — India to Canada.
          </p>
        </div>

        <div style={{ border: '1px solid var(--border)' }}>
          {JOBS.map((job, i) => (
            <JobRow
              key={`${job.company}-${job.period}`}
              job={job}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
              inView={inView}
              isLast={i === JOBS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
