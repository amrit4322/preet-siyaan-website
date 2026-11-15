import { motion, useTransform } from 'motion/react'
import Performer from './Performer'

export default function PerformerGroup({ side, performers, progress }) {
  const direction = side === 'left' ? -1 : 1
  const x = useTransform(
    progress,
    [0, 0.14, 0.42, 0.78, 1],
    ['0vw', `${direction * 1.5}vw`, `${direction * 24}vw`, `${direction * 86}vw`, `${direction * 118}vw`],
  )
  const y = useTransform(progress, [0, 0.42, 0.78, 1], ['0vh', '-1.5vh', '2vh', '7vh'])
  const scale = useTransform(progress, [0, 0.28, 0.7, 1], [1.02, 1.07, 1.2, 1.3])
  const rotateY = useTransform(progress, [0, 0.35, 0.82, 1], [0, direction * -2, direction * -11, direction * -16])
  const opacity = useTransform(progress, [0, 0.78, 0.94, 1], [1, 1, 0.72, 0])

  return (
    <motion.div
      className={`intro-performer-group intro-performer-group--${side}`}
      style={{ x, y, scale, rotateY, opacity }}
      aria-hidden="true"
    >
      <div className="intro-performer-group__parallax">
        {performers.map((performer) => <Performer key={performer.id} performer={performer} />)}
      </div>
    </motion.div>
  )
}
