import { motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'

export default function Experience({ content }) {
  const experience = content.experience
  return (
    <section className="experience-section">
      <div className="experience-image"><img src={experience.image} alt={experience.imageAlt} loading="lazy" /><div /></div>
      <div className="experience-orbit" aria-hidden="true"><span /><span /></div>
      <div className="page-shell experience-content">
        <SectionHeading eyebrow={experience.eyebrow} title={experience.title} description={experience.description} light />
        <div className="experience-steps">
          {experience.steps.map((step, index) => (
            <motion.div key={step.number} initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
              <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
            </motion.div>
          ))}
        </div>
        <small className="concept-note">{experience.note}</small>
      </div>
    </section>
  )
}
