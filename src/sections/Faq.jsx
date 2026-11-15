import { useState } from 'react'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'

export default function Faq({ content }) {
  const [open, setOpen] = useState(content.faq[0]?.id || null)
  return (
    <section className="section faq-section" id="faq">
      <div className="page-shell faq-grid">
        <div><SectionHeading eyebrow="Good to know" title="A few things before the first beat." description="Clear starting points for planning. Final availability, coverage and inclusions are always confirmed directly." /><a className="text-link" href="#contact">Still curious? Ask us directly <ArrowRightIcon /></a></div>
        <div className="faq-list">{content.faq.map((item, index) => { const expanded = open === item.id; return <div className="faq-item" key={item.id}><button type="button" aria-expanded={expanded} aria-controls={`faq-${item.id}`} onClick={() => setOpen(expanded ? null : item.id)}><span>0{index + 1}</span><strong>{item.question}</strong>{expanded ? <Minus /> : <Plus />}</button><AnimatePresence initial={false}>{expanded && <motion.div id={`faq-${item.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{item.answer}</p></motion.div>}</AnimatePresence></div> })}</div>
      </div>
    </section>
  )
}

function ArrowRightIcon() { return <ArrowUpRight size={16} /> }
