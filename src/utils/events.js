export function isValidExternalUrl(value) {
  if (!value) return false
  try {
    const parsed = new URL(value)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function getEventState(event, now = new Date()) {
  const status = event.ticketStatus?.toLowerCase()
  if (['cancelled', 'postponed', 'sold-out', 'private'].includes(status)) return status

  const start = new Date(event.startDatetime)
  const end = new Date(event.endDatetime || event.startDatetime)
  if (Number.isNaN(start.getTime())) return 'invalid'
  if (end < now) return 'past'
  return 'upcoming'
}

export function getPublishedEvents(events = [], now = new Date()) {
  return events
    .filter((event) => event.visibility !== 'hidden' && event.visibility !== 'demo-only' && !event.isDemo)
    .map((event) => ({ ...event, computedState: getEventState(event, now) }))
    .sort((a, b) => new Date(a.startDatetime) - new Date(b.startDatetime))
}

export function formatEventDate(event, locale = 'en-AU') {
  const value = new Date(event.startDatetime)
  if (Number.isNaN(value.getTime())) return 'Date to be confirmed'

  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: event.timezone || 'Australia/Melbourne',
      timeZoneName: 'short',
    }).format(value)
  } catch {
    return value.toLocaleString(locale)
  }
}

export function getEventAction(event) {
  const state = event.computedState || getEventState(event)

  if (state === 'cancelled') return { label: 'Cancelled', disabled: true }
  if (state === 'postponed') return { label: 'Postponed', disabled: true }
  if (state === 'sold-out') return { label: 'Sold out', disabled: true }
  if (state === 'past') return { label: 'Past event', disabled: true }
  if (state === 'private') return { label: 'Private event', disabled: true }
  if (event.ticketStatus === 'coming-soon' || event.bookingType === 'coming-soon') {
    return { label: 'Tickets coming soon', disabled: true }
  }
  if (event.bookingType === 'paid' && isValidExternalUrl(event.externalTicketUrl)) {
    return { label: 'Book tickets', href: event.externalTicketUrl, external: true }
  }
  if (event.bookingType === 'free' && isValidExternalUrl(event.registrationUrl)) {
    return { label: 'Register free', href: event.registrationUrl, external: true }
  }
  if (event.bookingType === 'free') return { label: 'Free entry', disabled: true }
  return { label: 'Enquire now', href: '#contact', enquiry: true }
}

export function getDirectionsUrl(event) {
  const destination = [event.venueName, event.venueAddress, event.city, event.state].filter(Boolean).join(', ')
  return destination ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}` : ''
}

