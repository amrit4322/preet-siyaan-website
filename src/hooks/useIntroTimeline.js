import { useCallback, useEffect, useMemo, useState } from 'react'
import { animate, useMotionValue, useReducedMotion } from 'motion/react'

function readDebugProgress() {
  const value = new URLSearchParams(window.location.search).get('introProgress')
  if (value === null) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : null
}

export default function useIntroTimeline(config) {
  const reduceMotion = useReducedMotion()
  const debugProgress = useMemo(readDebugProgress, [])
  const forceReplay = useMemo(
    () => new URLSearchParams(window.location.search).get('intro') === 'force',
    [],
  )
  const shouldPlay = useMemo(() => {
    if (!config?.enabled) return false
    if (debugProgress !== null || forceReplay || !config.playOncePerSession) return true
    try {
      return window.sessionStorage.getItem(config.sessionKey) !== 'complete'
    } catch {
      return true
    }
  }, [config, debugProgress, forceReplay])
  const [visible, setVisible] = useState(shouldPlay)
  const progress = useMotionValue(shouldPlay ? 0 : 1)

  const releasePage = useCallback(() => {
    document.body.classList.remove('intro-reveal-active')
    const liveSite = document.querySelector('[data-live-site]')
    if (liveSite) liveSite.inert = false
  }, [])

  const complete = useCallback(() => {
    progress.set(1)
    if (config?.playOncePerSession && debugProgress === null) {
      try {
        window.sessionStorage.setItem(config.sessionKey, 'complete')
      } catch {
        // Storage can be unavailable in privacy modes; the reveal still completes.
      }
    }
    releasePage()
    window.setTimeout(() => setVisible(false), 80)
  }, [config, debugProgress, progress, releasePage])

  useEffect(() => {
    if (!visible) {
      releasePage()
      return undefined
    }

    document.body.classList.add('intro-reveal-active')
    const liveSite = document.querySelector('[data-live-site]')
    if (liveSite) liveSite.inert = true

    if (debugProgress !== null) {
      progress.set(debugProgress)
      return () => releasePage()
    }

    progress.set(0)
    const timeline = animate(progress, 1, {
      duration: reduceMotion ? 0.18 : config.durationMs / 1000,
      ease: reduceMotion ? 'linear' : [0.22, 0.72, 0.2, 1],
      onComplete: complete,
    })

    return () => {
      timeline.stop()
      releasePage()
    }
  }, [complete, config, debugProgress, progress, reduceMotion, releasePage, visible])

  return {
    progress,
    visible,
    reduceMotion,
    skip: complete,
  }
}
