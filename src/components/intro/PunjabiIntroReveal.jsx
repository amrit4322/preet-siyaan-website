import { useEffect, useRef, useState } from 'react'
import { motion, useTransform } from 'motion/react'
import PerformerGroup from './PerformerGroup'

const PARTICLES = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${7 + ((index * 29) % 88)}%`,
  top: `${8 + ((index * 37) % 78)}%`,
  delay: `${(index % 7) * -0.31}s`,
  size: `${2 + (index % 3)}px`,
}))

export default function PunjabiIntroReveal({ intro, brand, progress, reduceMotion, onSkip }) {
  const rootRef = useRef(null)
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  const backdropOpacity = useTransform(progress, [0, 0.2, 0.64, 0.92, 1], [1, 0.96, 0.72, 0.2, 0])
  const brandOpacity = useTransform(progress, [0, 0.12, 0.3], [1, 1, 0])
  const brandScale = useTransform(progress, [0, 0.3], [1, 0.9])
  const architectureX = useTransform(progress, [0, 1], ['0vw', '-1.4vw'])
  const architectureScale = useTransform(progress, [0, 0.7, 1], [1, 1.12, 1.18])

  useEffect(() => {
    if (reduceMotion || !intro.effects.enablePointerParallax || !intro.performers.enableDepthParallax) return undefined
    const root = rootRef.current
    if (!root || window.matchMedia('(pointer: coarse)').matches) return undefined

    let frame = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    const render = () => {
      currentX += (targetX - currentX) * 0.1
      currentY += (targetY - currentY) * 0.1
      root.style.setProperty('--pointer-fg-x', `${(currentX * 11).toFixed(2)}px`)
      root.style.setProperty('--pointer-fg-y', `${(currentY * 5).toFixed(2)}px`)
      root.style.setProperty('--pointer-particle-x', `${(currentX * -7).toFixed(2)}px`)
      root.style.setProperty('--pointer-particle-y', `${(currentY * -4).toFixed(2)}px`)
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frame = window.requestAnimationFrame(render)
      }
    }
    const handlePointer = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2
      targetY = (event.clientY / window.innerHeight - 0.5) * 2
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(render)
    }
    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointer)
      window.cancelAnimationFrame(frame)
    }
  }, [intro.effects.enablePointerParallax, intro.performers.enableDepthParallax, reduceMotion])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const update = (event) => setCompact(event.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const reducePerformerCount = compact && intro.mobile.reducedPerformerCount
  const leftPerformers = reducePerformerCount ? intro.performers.left.filter((performer) => !performer.secondary) : intro.performers.left
  const rightPerformers = reducePerformerCount ? intro.performers.right.filter((performer) => !performer.secondary) : intro.performers.right

  return (
    <motion.div
      ref={rootRef}
      className={`punjabi-intro ${reduceMotion ? 'punjabi-intro--reduced' : ''} ${!intro.performers.enableDanceAnimation ? 'punjabi-intro--no-dance' : ''} ${intro.mobile.simplifiedAnimation ? 'punjabi-intro--simplify-mobile' : ''}`}
      style={{ opacity: backdropOpacity, '--intro-perspective': `${intro.camera.perspective}px` }}
      role="dialog"
      aria-label={`Opening ${brand.businessName}`}
    >
      {intro.effects.enableAmbientLighting && (
        <motion.div className="punjabi-intro__architecture" style={{ x: architectureX, scale: architectureScale }} aria-hidden="true">
          <span className="punjabi-intro__arch punjabi-intro__arch--left" />
          <span className="punjabi-intro__arch punjabi-intro__arch--center" />
          <span className="punjabi-intro__arch punjabi-intro__arch--right" />
          <span className="punjabi-intro__stage-glow" />
        </motion.div>
      )}

      {intro.effects.enableParticles && (
        <div className="punjabi-intro__particles" aria-hidden="true">
          {PARTICLES.map((particle) => (
            <i key={particle.id} style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, animationDelay: particle.delay }} />
          ))}
        </div>
      )}

      {!reduceMotion && (
        <>
          <PerformerGroup side="left" performers={leftPerformers} progress={progress} />
          <PerformerGroup side="right" performers={rightPerformers} progress={progress} />
        </>
      )}

      <motion.div className="punjabi-intro__brand" style={{ opacity: brandOpacity, scale: brandScale }} aria-hidden="true">
        <span>ਪ੍ਰੀ</span>
        <strong>{brand.shortName}</strong>
        <small>{intro.brandLine}</small>
      </motion.div>

      {intro.showSkipButton && (
        <button className="punjabi-intro__skip" type="button" onClick={onSkip}>
          Skip intro
        </button>
      )}
      <span className="sr-only" role="status">Entering {brand.businessName}</span>
    </motion.div>
  )
}
