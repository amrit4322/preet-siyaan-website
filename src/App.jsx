import { useEffect } from 'react'
import content from './data/siteContent.json'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ErrorBoundary from './components/ui/ErrorBoundary'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp'
import LiveSiteStage from './components/intro/LiveSiteStage'
import PunjabiIntroReveal from './components/intro/PunjabiIntroReveal'
import useIntroTimeline from './hooks/useIntroTimeline'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Experience from './sections/Experience'
import Gallery from './sections/Gallery'
import Events from './sections/Events'
import Testimonials from './sections/Testimonials'
import Faq from './sections/Faq'
import Contact from './sections/Contact'
import { applyTheme, validateContent } from './utils/content'

export default function App() {
  useEffect(() => {
    applyTheme(content.theme)
    validateContent(content)
    document.title = content.seo.title
    document.documentElement.lang = content.site.language
  }, [])

  const features = content.features
  const intro = useIntroTimeline({
    ...content.introAnimation,
    enabled: features.enableIntroAnimation && content.introAnimation.enabled,
  })
  return (
    <>
      <LiveSiteStage active={intro.visible} config={content.introAnimation} progress={intro.progress}>
        <Header content={content} />
        <main id="main">
          <ErrorBoundary fallback={<div className="hero-fallback" />}><Hero content={content} /></ErrorBoundary>
          {features.showAbout && <About content={content} />}
          {features.showServices && <Services content={content} />}
          {features.showExperience && <Experience content={content} />}
          {features.showGallery && <Gallery content={content} />}
          {features.showEvents && <Events content={content} />}
          {features.showTestimonials && <Testimonials content={content} />}
          {features.showFaq && <Faq content={content} />}
          {features.showContact && <Contact content={content} />}
        </main>
        <Footer content={content} />
        <FloatingWhatsApp content={content} />
      </LiveSiteStage>
      {intro.visible && (
        <PunjabiIntroReveal
          intro={content.introAnimation}
          brand={content.branding}
          progress={intro.progress}
          reduceMotion={intro.reduceMotion}
          onSkip={intro.skip}
        />
      )}
    </>
  )
}
