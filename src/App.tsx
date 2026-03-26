import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Work } from './sections/Work';
import { Contact } from './sections/Contact';

function App() {
  return (
    <div className="noise relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Concentric circles background */}
      <div className="circles-bg">
        <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[50, 100, 150, 200, 250, 300, 350, 380].map((r, i) => (
            <circle key={i} cx="400" cy="400" r={r} stroke="white" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <CustomCursor />

      {/* Main content — full width with controlled padding */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <Work />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
