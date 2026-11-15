import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Images, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'

export default function Gallery({ content }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const gallery = content.gallery || []
  const selected = selectedIndex == null ? null : gallery[selectedIndex]
  const move = useCallback((direction) => setSelectedIndex((value) => (value + direction + gallery.length) % gallery.length), [gallery.length])

  useEffect(() => {
    if (!selected) return undefined
    const onKey = (event) => { if (event.key === 'Escape') setSelectedIndex(null); if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, move])

  return (
    <section className="section gallery-section" id="gallery">
      <div className="page-shell">
        <div className="section-heading-row"><SectionHeading eyebrow="From the floor" title="Follow the celebration." description="Approved performance images, videos and original post links can be added through one content file—without scraping or pretending this is a live feed." light /><a className="social-pill" href={content.socialMedia.instagram.url} target="_blank" rel="noreferrer noopener"><Camera size={18} />{content.socialMedia.instagram.handle}<ArrowUpRight size={16} /></a></div>
        {gallery.length ? <div className="gallery-grid">{gallery.map((item, index) => <motion.button className={`gallery-item gallery-item--${(index % 5) + 1}`} type="button" onClick={() => setSelectedIndex(index)} key={item.id} whileHover={{ y: -5 }}><img src={item.thumbnail || item.src} alt={item.alt} loading="lazy" /><span>{item.category}</span></motion.button>)}</div> : <div className="gallery-empty"><Images size={36} /><h3>Authentic moments, arriving soon.</h3><p>No business-owned media has been published here yet. Add approved images or video details to <code>gallery</code> in the content file and this space will build itself.</p><a className="button button--gold" href={content.socialMedia.instagram.url} target="_blank" rel="noreferrer noopener">Visit Instagram<ArrowUpRight size={16} /></a></div>}
      </div>
      <AnimatePresence>{selected && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button className="lightbox-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close gallery"><X /></button><button type="button" onClick={() => move(-1)} aria-label="Previous image"><ArrowLeft /></button><figure>{selected.type === 'video' ? <video src={selected.src} controls /> : <img src={selected.src} alt={selected.alt} />}<figcaption>{selected.caption}</figcaption></figure><button type="button" onClick={() => move(1)} aria-label="Next image"><ArrowRight /></button></motion.div>}</AnimatePresence>
    </section>
  )
}
