import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedProjects from './components/FeaturedProjects'
import WhyNagi from './components/WhyNagi'
import Testimonial from './components/Testimonial'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'
import useMotion from './hooks/useMotion'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()
  useScrollReveal()
  useMotion()

  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <FeaturedProjects />
      <WhyNagi />
      <Testimonial />
      <Process />
      <Pricing />
      <Contact />
      <Footer />
    </>
  )
}
