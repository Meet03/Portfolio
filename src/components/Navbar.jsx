import { useState, useEffect } from 'react';

const NAV = [
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Education',  href: '#education'  },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '60px',
        display: 'flex', alignItems: 'center',
        padding: '0 var(--pad)',
        background: scrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
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
              <a href={n.href} style={{
                fontFamily: 'var(--sans)', fontSize: '13px',
                fontWeight: 500, color: 'var(--text-dim)',
                letterSpacing: '0.02em',
                transition: 'color 0.15s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}
              >{n.label}</a>
            </li>
          ))}
        </ul>

        <a href="mailto:meetamin65@gmail.com" className="btn btn-fill nav-cta"
          style={{ marginLeft: '32px', padding: '8px 20px', fontSize: '13px' }}>
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
              style={{ fontFamily:'var(--sans)', fontSize:'15px', fontWeight:500, color:'var(--text-head)' }}>
              {n.label}
            </a>
          ))}
          <a href="mailto:meetamin65@gmail.com"
            style={{ fontFamily:'var(--sans)', fontSize:'15px', fontWeight:600, color:'var(--orange)' }}>
            Hire me →
          </a>
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
