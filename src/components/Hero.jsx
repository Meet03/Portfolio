import { useEffect, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  return (
    <section style={{
      minHeight: '100vh',
      padding: 'clamp(110px,14vh,160px) var(--pad) clamp(60px,8vw,100px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      maxWidth: 'var(--max)', margin: '0 auto',
      position: 'relative',
    }}>
      <div className="hero-glow" />

      {/* Eyebrow */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        marginBottom: '36px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: 'all 0.6s ease 0s',
      }}>
        <div style={{ width:'36px', height:'1.5px', background:'var(--orange)' }} />
        <span style={{ fontFamily:'var(--mono)', fontSize:'12px', letterSpacing:'0.2em',
          textTransform:'uppercase', color:'var(--orange)' }}>
          Backend Software Engineer
        </span>
      </div>

      {/* Main heading */}
      <h1 style={{
        fontSize: 'clamp(56px, 9vw, 112px)',
        fontWeight: 900,
        color: 'var(--text-head)',
        lineHeight: 0.95,
        letterSpacing: '-0.03em',
        marginBottom: '16px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'all 0.65s ease 0.08s',
      }}>
        Meet<br />
        <span style={{ fontStyle:'italic', color:'var(--orange)' }}>Amin.</span>
      </h1>

      {/* Subheading row */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: '60px',
        flexWrap: 'wrap', marginTop: '48px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(20px)',
        transition: 'all 0.65s ease 0.16s',
      }}>
        <p style={{
          flex: '1 1 380px', maxWidth: '500px',
          fontSize: 'clamp(16px,2vw,19px)', color:'var(--text)',
          lineHeight: 1.75, fontWeight: 300,
        }}>
          Mississauga-based engineer with{' '}
          <strong style={{ fontWeight: 600, color:'var(--text-head)' }}>5+ years</strong>{' '}
          building production-grade Java, Spring Boot, and cloud-native microservices across
          fintech and enterprise — from Infosys to eMids, India to Canada.
        </p>

        <div style={{ flex:'0 0 auto', display:'flex', flexDirection:'column', gap:'14px' }}>
          <a href="#projects" className="btn btn-fill">View work</a>
          <a href="mailto:meetamin65@gmail.com" className="btn btn-outline">Get in touch</a>
          <div style={{ display:'flex', gap:'20px', marginTop:'6px' }}>
            <a href="https://github.com/Meet03" target="_blank" rel="noreferrer"
              style={{ fontFamily:'var(--mono)', fontSize:'11px', color:'var(--text-dim)',
                letterSpacing:'0.05em', transition:'color 0.15s' }}
              onMouseEnter={e=>e.target.style.color='var(--text-head)'}
              onMouseLeave={e=>e.target.style.color='var(--text-dim)'}>
              GitHub ↗
            </a>
            <a href="https://linkedin.com/in/meet-amin-898904160" target="_blank" rel="noreferrer"
              style={{ fontFamily:'var(--mono)', fontSize:'11px', color:'var(--text-dim)',
                letterSpacing:'0.05em', transition:'color 0.15s' }}
              onMouseEnter={e=>e.target.style.color='var(--text-head)'}
              onMouseLeave={e=>e.target.style.color='var(--text-dim)'}>
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        marginTop: 'clamp(60px,8vw,100px)',
        display: 'flex', alignItems: 'center', gap:'12px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease 0.5s',
      }}>
        <div style={{
          width:'1px', height:'50px',
          background:'linear-gradient(to bottom, var(--orange), transparent)',
        }}/>
        <span style={{ fontFamily:'var(--mono)', fontSize:'10px',
          letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-dim)' }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
