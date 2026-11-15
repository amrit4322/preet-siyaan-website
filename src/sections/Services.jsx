import { useRef } from 'react'
import { ArrowUpRight, AudioLines, Drum, Gem, Lamp, Mic2, Music2, PartyPopper, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'
import { getVisibleServices } from '../utils/content'

const icons = { AudioLines, Drum, Gem, Lamp, Mic2, Music2, PartyPopper, Sparkles }

function ServiceCard({ service, index }) {
  const card = useRef(null)
  const reduceMotion = useReducedMotion()
  const Icon = icons[service.icon] || Sparkles

  const onMove = (event) => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return
    const rect = card.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.current.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateY(-4px)`
  }
  const reset = () => { if (card.current) card.current.style.transform = '' }

  return (
    <motion.article ref={card} className={`service-card ${service.featured ? 'service-card--featured' : ''}`} onPointerMove={onMove} onPointerLeave={reset} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.24) }}>
      {service.heroImage && <img className="service-card__image" src={service.heroImage} alt="" loading="lazy" />}
      <div className="service-card__wash" />
      <div className="service-card__top"><span>0{index + 1}</span>{service.status === 'draft' && <em>Editable draft</em>}</div>
      <div className="service-icon"><Icon size={23} strokeWidth={1.45} /></div>
      <div className="service-card__content">
        <small>{service.kicker}</small><h3>{service.name}</h3><p>{service.shortDescription}</p>
        <ul>{service.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
        <a href={`#contact`} data-service={service.name}>{service.bookingCta}<ArrowUpRight size={16} /></a>
      </div>
    </motion.article>
  )
}

export default function Services({ content }) {
  const services = getVisibleServices(content)
  return (
    <section className="section services-section" id="services">
      <div className="page-shell">
        <div className="section-heading-row">
          <SectionHeading eyebrow="Our experiences" title="Crafted for the moments everyone remembers." description="Confirmed services are drawn from the official public profile. Draft categories stay visibly labelled until approved." light />
          <span className="section-count">{String(services.length).padStart(2, '0')} experiences</span>
        </div>
        <div className="services-grid">{services.map((service, index) => <ServiceCard key={service.id} service={service} index={index} />)}</div>
      </div>
    </section>
  )
}

