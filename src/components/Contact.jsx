import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { label:'Email',    val:'meetamin65@gmail.com',         href:'mailto:meetamin65@gmail.com' },
  { label:'LinkedIn', val:'meet-amin-898904160',          href:'https://linkedin.com/in/meet-amin-898904160' },
  { label:'GitHub',   val:'github.com/Meet03',            href:'https://github.com/Meet03' },
  { label:'Location', val:'Mississauga, ON · Open to remote', href:null },
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

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section id="contact" ref={ref} style={{ padding:'var(--section) var(--pad)' }}>
      <div style={{ maxWidth:'var(--max)', margin:'0 auto' }}>

        {/* Big CTA headline */}
        <div style={{
          background:'var(--bg-dark)', padding:'clamp(48px,8vw,96px)',
          marginBottom:'clamp(40px,5vw,60px)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(20px)',
          transition:'all 0.6s ease',
        }}>
          <span style={{ fontFamily:'var(--mono)', fontSize:'11px', letterSpacing:'0.18em',
            textTransform:'uppercase', color:'var(--orange)', display:'block', marginBottom:'20px' }}>
            Open to work
          </span>
          <h2 style={{ fontFamily:'var(--serif)', fontStyle:'italic',
            fontSize:'clamp(36px,6vw,72px)', fontWeight:700, color:'white',
            lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:'32px', maxWidth:'700px' }}>
            Let's build something that scales.
          </h2>
          <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
            <a href="mailto:meetamin65@gmail.com" className="btn" style={{
              background:'var(--orange)', color:'white', border:'none',
              fontSize:'15px', padding:'14px 36px',
              transition:'all 0.2s',
            }}
              onMouseEnter={e=>{e.target.style.background='#ea6d0e';e.target.style.transform='translateY(-2px)';}}
              onMouseLeave={e=>{e.target.style.background='var(--orange)';e.target.style.transform='none';}}
            >
              Send a message →
            </a>
            <a href="/resume.pdf" download className="btn" style={{
              background:'transparent', color:'white', border:'1.5px solid rgba(255,255,255,0.3)',
              fontSize:'15px', padding:'14px 36px',
              transition:'all 0.2s',
            }}
              onMouseEnter={e=>{e.target.style.borderColor='var(--orange)';e.target.style.color='var(--orange)';e.target.style.transform='translateY(-2px)';}}
              onMouseLeave={e=>{e.target.style.borderColor='rgba(255,255,255,0.3)';e.target.style.color='white';e.target.style.transform='none';}}
            >
              Download Resume ↓
            </a>
          </div>
        </div>

        {/* Contact links grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',
          gap:'1px', border:'1px solid var(--border)', background:'var(--border)' }}>
          {LINKS.map((l, i) => {
            const inner = (
              <div style={{ padding:'clamp(20px,3vw,28px)',
                background:'var(--bg-card)', height:'100%',
                transition:'background 0.15s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(10px)',
                transitionDelay: `${0.1 + i*0.07}s`,
              }}>
                <p style={{ fontFamily:'var(--mono)', fontSize:'10px', letterSpacing:'0.15em',
                  textTransform:'uppercase', color:'var(--text-dim)', marginBottom:'8px' }}>
                  {l.label}
                </p>
                <p style={{ fontSize:'14px', fontWeight:500, color:'var(--text-head)',
                  lineHeight:1.4 }}>
                  {l.val}
                </p>
                {l.href && <span style={{ fontFamily:'var(--mono)', fontSize:'11px',
                  color:'var(--orange)', marginTop:'8px', display:'block' }}>↗</span>}
              </div>
            );
            return l.href ? (
              <a key={l.label} href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                style={{ display:'block', textDecoration:'none' }}
                onMouseEnter={e=>e.currentTarget.querySelector('div').style.background='var(--orange-light)'}
                onMouseLeave={e=>e.currentTarget.querySelector('div').style.background='var(--bg-card)'}
              >{inner}</a>
            ) : <div key={l.label}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
