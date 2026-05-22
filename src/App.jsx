import './index.css';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import Stats      from './components/Stats';
import Skills     from './components/Skills';
import Experience from './components/Experience';
import Projects   from './components/Projects';
import Education  from './components/Education';
import Contact    from './components/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <hr className="u-rule" />
        <Stats />
        <hr className="u-rule" />
        <Skills />
        <hr className="u-rule" />
        <Experience />
        <hr className="u-rule" />
        <Projects />
        <hr className="u-rule" />
        <Education />
        <hr className="u-rule" />
        <Contact />
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '28px var(--pad)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: 'var(--text-head)', fontWeight: 700 }}>
          Meet Amin
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} — Mississauga, ON
        </span>
      </footer>
    </>
  );
}
