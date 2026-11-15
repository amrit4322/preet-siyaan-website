import { motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'

export default function About({ content }) {
  const about = content.about
  return (
    <section className="section about-section" id="about">
      <div className="page-shell about-grid">
        <motion.div className="about-visual" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }}>
          <div className="arch-frame"><img src={about.image} alt={about.imageAlt} loading="lazy" /></div>
          <span className="image-note">Original concept artwork</span>
          <div className="about-seal"><span>ਰੰਗ</span><small>Rhythm · Colour · Connection</small></div>
        </motion.div>
        <div className="about-copy">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="editorial-copy">{about.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="about-highlights">
            {about.highlights.map((item) => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

