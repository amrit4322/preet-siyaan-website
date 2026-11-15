import { motion, useTransform } from 'motion/react'

export default function LiveSiteStage({ active, config, progress, children }) {
  const initialScale = config.camera.enableDollyEffect ? config.camera.initialHeroScale : 1
  const finalScale = config.camera.finalHeroScale
  const scale = useTransform(
    progress,
    [0, 0.18, 0.64, 0.88, 1],
    [initialScale, initialScale + 0.02, initialScale + ((finalScale - initialScale) * 0.6), finalScale - 0.02, finalScale],
  )
  const y = useTransform(progress, [0, 0.5, 1], ['1.5vh', '0.8vh', '0vh'])
  const filter = useTransform(
    progress,
    [0, 0.45, 0.82, 1],
    ['brightness(0.42) saturate(0.72) blur(2px)', 'brightness(0.58) saturate(0.82) blur(1px)', 'brightness(0.9) saturate(0.96) blur(0px)', 'brightness(1) saturate(1) blur(0px)'],
  )

  return (
    <motion.div
      className={`live-site-stage ${active ? 'live-site-stage--intro' : ''}`}
      data-live-site
      aria-hidden={active || undefined}
      style={{ scale, y, filter }}
    >
      {children}
    </motion.div>
  )
}
