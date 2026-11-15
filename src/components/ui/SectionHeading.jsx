import { motion } from 'motion/react'

export default function SectionHeading({ eyebrow, title, description, align = 'left', light = false }) {
  return (
    <motion.div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {eyebrow && <span className="eyebrow"><i />{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  )
}

