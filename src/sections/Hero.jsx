import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const HeroScene = lazy(() => import('../components/three/HeroScene'))

export default function Hero({ content }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const lightRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [canRenderScene, setCanRenderScene] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px) and (pointer: fine)')
    const sync = () => setCanRenderScene(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion || !content.hero.animationFlags.pointerLight || !window.matchMedia('(pointer: fine)').matches) return undefined
    let frame
    const onMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        if (imageRef.current) imageRef.current.style.transform = `scale(1.04) translate3d(${x * -12}px, ${y * -8}px, 0)`
        if (lightRef.current) lightRef.current.style.transform = `translate3d(${x * 70}px, ${y * 48}px, 0)`
      })
    }
    const section = sectionRef.current
    section?.addEventListener('pointermove', onMove)
    return () => { cancelAnimationFrame(frame); section?.removeEventListener('pointermove', onMove) }
  }, [content.hero.animationFlags.pointerLight, reduceMotion])

  return (
    <section className="hero-section" id="home" ref={sectionRef}>
      <div className="hero-image-wrap" ref={imageRef}><img src={content.hero.image} alt="" fetchPriority="high" /></div>
      <div className="hero-overlay" /><div className="hero-pointer-light" ref={lightRef} />
      {content.features.enableThreeScene && canRenderScene && !reduceMotion && <Suspense fallback={null}><HeroScene /></Suspense>}
      <div className="hero-arch hero-arch--left" aria-hidden="true" /><div className="hero-arch hero-arch--right" aria-hidden="true" />
      <div className="page-shell hero-content">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <span className="eyebrow eyebrow--light"><i />{content.hero.eyebrow}</span>
          <h1>{content.hero.heading}</h1><p>{content.hero.description}</p>
          <div className="hero-actions"><a className="button button--gold" href={content.hero.primaryButton.href}>{content.hero.primaryButton.label}<ArrowUpRight size={18} /></a><a className="button button--ghost" href={content.hero.secondaryButton.href}>{content.hero.secondaryButton.label}</a></div>
        </motion.div>
      </div>
      <a className="scroll-cue" href="#about"><span>{content.hero.scrollLabel}</span><i><ArrowDown size={15} /></i></a>
    </section>
  )
}
