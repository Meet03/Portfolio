import { useEffect, useRef, useState } from 'react';
import useTilt from '../hooks/useTilt';

const PROJECTS = [
  {
    num: '01',
    title: 'RaahWebsite',
    period: '2025',
    desc: 'React 19 + TypeScript rebuild of raahtech.com — improved visuals, dark/light theming, and performance-first architecture for an Identity & Access Management consultancy.',
    points: [
      'Rebuilt on React 19 + TypeScript + Vite with Tailwind CSS v4',
      'Framer Motion animations and self-hosted fonts for a polished, fast-loading feel',
      'Data-driven content via typed TypeScript files — no component edits needed for copy updates',
    ],
    stack: ['React 19', 'TypeScript', 'Tailwind v4', 'Framer Motion', 'Vite'],
    href: 'https://raah-website-theta.vercel.app',
    repo: 'https://github.com/Meet03/RaahWebsite',
    visibility: 'Public',
    screenshot: '/projects/raah-website.png',
  },
  {
    num: '02',
    title: 'IndianParadiseRestaurant',
    period: '2024',
    desc: 'Restaurant marketing site — menu, location, and ordering info for a real local business, built and deployed end to end.',
    points: [
      'Fully responsive layout built with vanilla HTML/CSS/JavaScript',
      'Deployed to production on Vercel for a real client',
      'Optimized for fast load on mobile, where most restaurant traffic lands',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    href: 'https://indian-paradise-restaurant.vercel.app',
    repo: 'https://github.com/Meet03/IndianParadiseRestaurant',
    visibility: 'Public',
    screenshot: '/projects/indian-paradise.png',
  },
  {
    num: '03',
    title: 'TiffinConnect',
    period: 'Sep – Dec 2024',
    desc: 'Multi-user subscription and delivery platform serving 3 roles — admin, vendor, and customer — with real-time order tracking and role-based access control. Capstone project, Conestoga College.',
    points: [
      'Optimized MongoDB schemas reducing average query time by 40%',
      'Integrated Socket.io for real-time delivery tracking at sub-200ms latency',
      'JWT authentication with Spring Security–style RBAC and full OpenAPI docs',
    ],
    stack: ['Node.js', 'MongoDB', 'JWT', 'Socket.io', 'React', 'Express.js'],
    repo: 'https://github.com/Meet03/TiffinConnect',
    visibility: 'Public',
    code: [
      ['1', 'kw', 'router.post', 'plain', "('/orders', "],
      ['2', 'fn', '  authenticate', 'plain', ', async (req, res) => {'],
      ['3', 'plain', '    const order = ', 'fn', 'await Order.create'],
      ['4', 'plain', '    io.to(vendorId).', 'fn', 'emit', 'str', "('order:new')"],
      ['5', 'kw', '  })'],
    ],
  },
  {
    num: '04',
    title: 'BookEasy',
    period: '2024 – Present',
    desc: 'Full-stack local service booking platform for Mississauga & GTA. Connects customers with local businesses via real-time slot booking, a business dashboard, and live analytics.',
    points: [
      'Real-time slot booking engine with live availability updates',
      'Business dashboard with analytics and booking management',
      'JWT authentication, MongoDB data layer, and Express REST API',
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/Meet03/BookEasy',
    visibility: 'Private',
    code: [
      ['1', 'kw', 'async function', 'fn', ' getAvailability', 'plain', '(slotId) {'],
      ['2', 'plain', '  const slot = ', 'fn', 'await Slot.findById', 'plain', '(slotId)'],
      ['3', 'kw', '  if', 'plain', ' (slot.', 'fn', 'isBooked', 'plain', ') '],
      ['4', 'kw', '    return', 'str', ' res.status(409)'],
      ['5', 'plain', '}'],
    ],
  },
  {
    num: '05',
    title: 'Cupid Site',
    period: '2024',
    desc: 'Full website built for Sunny — Cupid Mantra. A Next.js + TypeScript client project delivering a polished, brand-tailored web experience.',
    points: [
      'Built end-to-end with Next.js and TypeScript for type safety and maintainability',
      'Clean, responsive UI tailored to the client’s brand and requirements',
      'Deployed as a production site for a real client (deployment since retired)',
    ],
    stack: ['TypeScript', 'Next.js', 'React', 'CSS'],
    repo: 'https://github.com/Meet03/cupid-site',
    visibility: 'Private',
    code: [
      ['1', 'kw', 'export default function', 'fn', ' HomePage', 'plain', '() {'],
      ['2', 'kw', '  return', 'plain', ' ('],
      ['3', 'plain', '    <', 'fn', 'Hero', 'plain', ' title=', 'str', '"Cupid Mantra"', 'plain', ' />'],
      ['4', 'plain', '  )'],
      ['5', 'plain', '}'],
    ],
  },
  {
    num: '06',
    title: 'Portfolio',
    period: '2025 – Present',
    desc: "This site. Yes — you're looking at it right now. A React + Vite build with a hand-rolled editorial design system, dark mode, and (as of this pass) a three.js hero accent.",
    points: [
      'React 18 + Vite, zero UI framework — every component styled by hand',
      'Light/dark theme with persisted preference, scroll-aware nav, IntersectionObserver reveals',
      'Recursion achievement unlocked: a portfolio project featured inside its own portfolio',
    ],
    stack: ['React', 'Vite', 'Three.js', 'React Three Fiber'],
    href: 'https://portfolio-five-beta-39.vercel.app',
    repo: 'https://github.com/Meet03/Portfolio',
    visibility: 'Public',
    meta: true,
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

function CodePanel({ lines }) {
  const classMap = { kw: 'code-panel__kw', str: 'code-panel__str', fn: 'code-panel__fn', plain: 'code-panel__plain' };
  return (
    <div className="code-panel">
      {lines.map((line, i) => {
        const [ln, ...rest] = line;
        const segments = [];
        for (let k = 0; k < rest.length; k += 2) segments.push([rest[k], rest[k + 1]]);
        return (
          <div className="code-panel__line" key={i}>
            <span className="code-panel__ln">{ln}</span>
            <span>
              {segments.map(([cls, text], j) => (
                <span key={j} className={classMap[cls] || 'code-panel__plain'}>{text}</span>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProjectCard({ p, index, inView }) {
  const tiltRef = useTilt({ max: 6, scale: 1.015 });
  const [hovered, setHovered] = useState(false);
  const targetHref = p.href || p.repo;

  return (
    <a
      ref={tiltRef}
      href={targetHref}
      target="_blank"
      rel="noreferrer"
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      <div className="browser-frame">
        <div className="browser-frame__bar">
          <span className="browser-frame__dot" />
          <span className="browser-frame__dot" />
          <span className="browser-frame__dot" />
        </div>
        <div className="browser-frame__body">
          {p.screenshot ? (
            <img className="browser-frame__img" src={p.screenshot} alt={`${p.title} screenshot`} loading="lazy" />
          ) : p.code ? (
            <CodePanel lines={p.code} />
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--orange-light), var(--bg-card))',
              color: hovered ? 'var(--orange)' : 'var(--border)', transition: 'color 0.2s',
              fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(22px,3vw,32px)',
              fontFamily: 'var(--serif)', textAlign: 'center', padding: '0 16px',
            }}>
              You are here ↻
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '20px 4px 0' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between',
          flexWrap:'wrap', gap:'10px', marginBottom:'12px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap' }}>
            <span style={{ fontFamily:'var(--mono)', fontSize:'12px', color: hovered ? 'var(--orange)' : 'var(--text-dim)', transition:'color 0.2s' }}>
              {p.num}
            </span>
            <h3 style={{ fontFamily:'var(--serif)', fontSize:'clamp(19px,2.2vw,24px)',
              fontWeight:700, letterSpacing:'-0.01em', color:'var(--text-head)' }}>
              {p.title}
            </h3>
            <span style={{ fontFamily:'var(--mono)', fontSize:'10px', letterSpacing:'0.1em',
              textTransform:'uppercase', padding:'3px 10px',
              border:'1px solid var(--border)', color:'var(--text-dim)',
              background:'var(--bg)', flexShrink:0 }}>{p.visibility}</span>
          </div>
          <span style={{ fontFamily:'var(--mono)', fontSize:'11px', color:'var(--text-dim)', flexShrink:0 }}>
            {p.period}
          </span>
        </div>

        <p style={{ fontSize:'14px', color:'var(--text)', lineHeight:1.65, marginBottom:'16px' }}>
          {p.desc}
        </p>

        <ul style={{ listStyle:'none', padding:0, marginBottom:'16px',
          display:'flex', flexDirection:'column', gap:'6px' }}>
          {p.points.map((pt, k) => (
            <li key={k} style={{ display:'flex', gap:'10px',
              fontSize:'12.5px', color:'var(--text-dim)', lineHeight:1.6 }}>
              <span style={{ color:'var(--orange)', flexShrink:0 }}>—</span> {pt}
            </li>
          ))}
        </ul>

        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom: '14px' }}>
          {p.stack.map(t => (
            <span key={t} style={{ fontFamily:'var(--mono)', fontSize:'10.5px',
              color:'var(--text-dim)', border:'1px solid var(--border)',
              padding:'3px 9px', background:'var(--bg)' }}>{t}</span>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'8px',
          fontFamily:'var(--mono)', fontSize:'12px', color:'var(--orange)' }}>
          {p.href ? 'Live demo' : 'View source'}
          <span style={{ transform: hovered ? 'translateX(4px)' : 'none', transition:'transform 0.2s' }}>↗</span>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref);

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

        <div className="project-gallery">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
