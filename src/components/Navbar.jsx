import { useState, useEffect } from 'react';

const NAV = [
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Education',  href: '#education'  },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const sections = NAV.map(n => document.querySelector(n.href)).filter(Boolean);
    const o = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive('#' + e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => o.observe(s));
    return () => o.disconnect();
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '60px',
        display: 'flex', alignItems: 'center',
        padding: '0 var(--pad)',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <a href="#" style={{
          fontFamily: 'var(--serif)', fontWeight: 700,
          fontSize: '18px', color: 'var(--text-head)',
          letterSpacing: '-0.01em', flex: 1,
        }}>
          Meet Amin
        </a>

        {/* Desktop */}
        <ul style={{ display:'flex', gap:'36px', listStyle:'none' }} className="nav-links">
          {NAV.map(n => (
            <li key={n.label}>
              <a href={n.href}
                className={`nav-link${active === n.href ? ' active' : ''}`}
                style={{
                  fontFamily: 'var(--sans)', fontSize: '13px',
                  fontWeight: 500,
                  color: active === n.href ? 'var(--orange)' : 'var(--text-dim)',
                  letterSpacing: '0.02em',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { if (active !== n.href) e.target.style.color = 'var(--orange)'; }}
                onMouseLeave={e => { if (active !== n.href) e.target.style.color = 'var(--text-dim)'; }}
              >{n.label}</a>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button onClick={onToggleTheme} className="theme-toggle" style={{ marginLeft: '28px' }}
          aria-label="Toggle dark mode" title="Toggle dark mode">
          {theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 9.5A6 6 0 016.5 2.5 6 6 0 1013.5 9.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <a href="mailto:meetamin65@gmail.com" className="btn btn-fill nav-cta"
          style={{ marginLeft: '20px', padding: '8px 20px', fontSize: '13px' }}>
          Hire me
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="nav-mob"
          style={{ display:'none', background:'none', border:'none', cursor:'pointer', padding:'4px', marginLeft:'12px' }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open
              ? <path d="M4 4L18 18M4 18L18 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              : <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            }
          </svg>
        </button>
      </nav>

      {open && (
        <div style={{
          position:'fixed', top:'60px', left:0, right:0, zIndex:99,
          background:'var(--bg-card)', borderBottom:'1px solid var(--border)',
          padding:'24px var(--pad)', display:'flex', flexDirection:'column', gap:'20px',
        }}>
          {NAV.map(n => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)}
              style={{ fontFamily:'var(--sans)', fontSize:'15px', fontWeight:500,
                color: active === n.href ? 'var(--orange)' : 'var(--text-head)' }}>
              {n.label}
            </a>
          ))}
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <button onClick={onToggleTheme} className="theme-toggle">
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <a href="mailto:meetamin65@gmail.com"
              style={{ fontFamily:'var(--sans)', fontSize:'15px', fontWeight:600, color:'var(--orange)' }}>
              Hire me →
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:640px){
          .nav-links,.nav-cta{display:none!important}
          .nav-mob{display:block!important}
        }
      `}</style>
    </>
  );
}
