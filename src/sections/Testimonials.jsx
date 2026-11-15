import { ExternalLink, Star } from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'

export default function Testimonials({ content }) {
  if (!content.testimonials?.length) return null
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="page-shell"><SectionHeading eyebrow="Kind words" title="Celebrations remembered." align="center" />
        <div className="testimonials-grid">{content.testimonials.map((item) => <motion.blockquote key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="rating" aria-label={`${item.rating} out of 5 stars`}>{Array.from({ length: item.rating || 0 }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><p>“{item.review}”</p><footer><div><strong>{item.customerName}</strong><span>{[item.eventType, item.date].filter(Boolean).join(' · ')}</span></div>{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer noopener" aria-label="View verified review source"><ExternalLink size={16} /></a>}</footer></motion.blockquote>)}</div>
      </div>
    </section>
  )
}

