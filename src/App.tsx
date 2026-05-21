import { useEffect } from 'react';
import GrainOverlay from './components/ui/GrainOverlay';
import Nav from './components/layout/Nav';
import Hero from './components/sections/Hero';
import Manifesto from './components/sections/Manifesto';
import Stats from './components/sections/Stats';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Portfolio from './components/sections/Portfolio';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import { initLenis, destroyLenis } from './lib/animations/lenis';

export default function App() {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <>
      <GrainOverlay />
      <Nav />
      <main id="main-content">
        <Hero />
        <Manifesto />
        <Stats />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
