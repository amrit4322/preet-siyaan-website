export function buildWhatsAppMessage(form, businessName = 'Preetsiyaan Entertainment') {
  const services = Array.isArray(form.services) ? form.services.join(', ') : form.services || 'Not selected'
  const lines = [
    `Hello ${businessName}, I’d like to enquire about a celebration.`,
    `Name: ${form.fullName || 'Not provided'}`,
    `Event: ${form.eventType || 'Not selected'}`,
    `Date: ${form.eventDate || 'Not confirmed'}`,
    `Location: ${form.eventLocation || 'Not confirmed'}`,
    `Guests: ${form.guestCount || 'Not confirmed'}`,
    `Services: ${services}`,
    form.message ? `Notes: ${form.message}` : '',
  ].filter(Boolean)

  return lines.join('\n')
}

export function buildWhatsAppUrl(phone, form, businessName) {
  const cleanPhone = String(phone || '').replace(/\D/g, '')
  const message = encodeURIComponent(buildWhatsAppMessage(form, businessName))
  return cleanPhone ? `https://wa.me/${cleanPhone}?text=${message}` : ''
}

export function safeExternalProps(url) {
  return url ? { href: url, target: '_blank', rel: 'noreferrer noopener' } : {}
}

