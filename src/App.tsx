import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Services from './components/Services'
import Work from './components/Work'
import BeforeAfter from './components/BeforeAfter'
import Testimonial from './components/Testimonial'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useSmoothScroll from './hooks/useSmoothScroll'
import useScrollReveal from './hooks/useScrollReveal'
import useNagiOrchestrator from './hooks/useNagiOrchestrator'

/**
 * 凪 Still Water: the page is one journey from wind to stillness.
 * Golden hour fades to night as you travel toward the contact form;
 * the orchestrator reads each section's data-theme / data-sea so the
 * background crossfades and the wavelines calm down to 凪.
 */
export default function App() {
  useSmoothScroll()
  useScrollReveal()
  useNagiOrchestrator()

  return (
    <>
      <Preloader />
      <Nav />
      <Hero />
      <Manifesto />
      <Services />
      <Work />
      <BeforeAfter />
      <Testimonial />
      <Process />
      <Pricing />
      <Contact />
      <Footer />
    </>
  )
}
