import { useState } from 'react'

export default function Performer({ performer }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <span
      className={`intro-performer intro-performer--${performer.motion} ${performer.secondary ? 'intro-performer--secondary' : ''} ${performer.hasGlow ? 'intro-performer--glow' : ''}`}
      style={{
        '--performer-x': performer.x,
        '--performer-width': performer.width,
        '--performer-delay': `${performer.delayMs}ms`,
        '--performer-depth': performer.depth,
      }}
      aria-hidden="true"
    >
      <img
        src={performer.src}
        alt=""
        draggable="false"
        loading="eager"
        fetchPriority="high"
        onError={() => setFailed(true)}
      />
      <i className="intro-performer__contact" />
    </span>
  )
}
