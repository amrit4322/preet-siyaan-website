import { useEffect, useState } from 'react'
import { Camera, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export default function Header({ content }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28)
      const sections = content.navigation.items.map((item) => document.querySelector(item.href)).filter(Boolean)
      const current = sections.findLast((section) => section.getBoundingClientRect().top <= 180)
      if (current) setActive(current.id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [content.navigation.items])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="site-header__inner page-shell">
        <a className="brand-lockup" href="#home" aria-label={`${content.branding.businessName} home`}>
          {content.branding.logo ? <img src={content.branding.logo} alt={content.branding.businessName} /> : <span className="brand-mark">ਪ੍ਰੀ</span>}
          <span><strong>{content.branding.shortName}</strong><small>Entertainment</small></span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {content.navigation.items.map((item) => (
            <a className={active === item.href.slice(1) ? 'is-active' : ''} href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="icon-button desktop-social" href={content.socialMedia.instagram.url} target="_blank" rel="noreferrer noopener" aria-label={`Follow ${content.socialMedia.instagram.handle} on Instagram`}><Camera size={18} /></a>
          <a className="button button--gold desktop-book" href={content.navigation.ctaHref}>{content.navigation.ctaLabel}</a>
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>{open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
            <div className="page-shell">
              {content.navigation.items.map((item, index) => (
                <a href={item.href} key={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</a>
              ))}
              <a className="button button--gold" href={content.navigation.ctaHref} onClick={() => setOpen(false)}>{content.navigation.ctaLabel}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
