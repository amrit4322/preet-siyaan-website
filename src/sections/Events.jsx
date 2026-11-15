import { useMemo, useState } from 'react'
import { ArrowUpRight, CalendarDays, Clock3, MapPin, Ticket } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'
import { formatEventDate, getDirectionsUrl, getEventAction, getPublishedEvents } from '../utils/events'

function EventCard({ event, locale, onDetails }) {
  const action = getEventAction(event)
  const directions = getDirectionsUrl(event)
  return (
    <motion.article className={`event-card ${event.featured ? 'event-card--featured' : ''}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="event-poster">{event.poster ? <img src={event.poster} alt={`${event.title} poster`} loading="lazy" /> : <><CalendarDays size={34} /><span>{event.category}</span></>}</div>
      <div className="event-card__body">
        <div className="event-meta"><span>{event.category}</span>{event.featured && <em>Featured</em>}</div>
        <h3>{event.title}</h3><p>{event.shortDescription}</p>
        <ul><li><Clock3 size={15} />{formatEventDate(event, locale)}</li><li><MapPin size={15} />{[event.venueName, event.city, event.state].filter(Boolean).join(', ')}</li></ul>
        <div className="event-card__actions">
          {action.disabled ? <button className="button button--muted" disabled>{action.label}</button> : <a className="button button--wine" href={action.href} target={action.external ? '_blank' : undefined} rel={action.external ? 'noreferrer noopener' : undefined}>{action.label}<ArrowUpRight size={16} /></a>}
          <button className="text-button" type="button" onClick={() => onDetails(event)}>View details</button>
          {directions && <a className="text-button" href={directions} target="_blank" rel="noreferrer noopener">Directions</a>}
        </div>
      </div>
    </motion.article>
  )
}

function EventModal({ event, locale, onClose }) {
  if (!event) return null
  const action = getEventAction(event)
  return (
    <motion.div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close event details">×</button>
        <span className="eyebrow"><i />{event.category}</span><h2 id="event-modal-title">{event.title}</h2><p>{event.fullDescription}</p>
        <dl><div><dt>When</dt><dd>{formatEventDate(event, locale)}</dd></div><div><dt>Where</dt><dd>{[event.venueName, event.venueAddress, event.city, event.state].filter(Boolean).join(', ')}</dd></div>{event.price && <div><dt>Tickets</dt><dd>{event.price} {event.currency}</dd></div>}</dl>
        {action.disabled ? <button className="button button--muted" disabled>{action.label}</button> : <a className="button button--wine" href={action.href} target={action.external ? '_blank' : undefined} rel={action.external ? 'noreferrer noopener' : undefined}>{action.label}</a>}
      </motion.div>
    </motion.div>
  )
}

export default function Events({ content }) {
  const [filter, setFilter] = useState('upcoming')
  const [selected, setSelected] = useState(null)
  const events = useMemo(() => getPublishedEvents(content.events), [content.events])
  const filtered = events.filter((event) => filter === 'all' || (filter === 'upcoming' ? event.computedState === 'upcoming' : event.computedState === 'past'))

  return (
    <section className="section events-section" id="events">
      <div className="page-shell">
        <SectionHeading eyebrow="Upcoming events" title="Meet us where the celebration happens." description="Genuine public events and valid ticket links will appear here automatically when added to the central content file." align="center" />
        {events.length > 0 ? <>
          <div className="event-filters" aria-label="Filter events">{['upcoming', 'all', 'past'].map((item) => <button className={filter === item ? 'is-active' : ''} type="button" onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          <div className="events-grid">{filtered.map((event) => <EventCard key={event.id} event={event} locale={content.site.locale} onDetails={setSelected} />)}</div>
          {filtered.length === 0 && <p className="empty-inline">No events match this filter.</p>}
        </> : <div className="events-empty"><div className="events-empty__icon"><Ticket size={30} /></div><span>Next announcement</span><h3>The next celebration is still under wraps.</h3><p>No public events are listed right now. Follow Instagram for genuine announcements as soon as they land.</p><a className="button button--wine" href={content.socialMedia.instagram.url} target="_blank" rel="noreferrer noopener">Follow the celebration<ArrowUpRight size={17} /></a></div>}
      </div>
      <AnimatePresence>{selected && <EventModal event={selected} locale={content.site.locale} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}

