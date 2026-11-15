import { useMemo, useState } from 'react'
import { ArrowUpRight, Camera, MessageCircle, Phone } from 'lucide-react'
import { motion } from 'motion/react'
import SectionHeading from '../components/ui/SectionHeading'
import { buildWhatsAppUrl } from '../utils/links'

const initialForm = { fullName: '', email: '', phone: '', eventType: '', eventDate: '', eventLocation: '', guestCount: '', services: [], message: '', consent: false }

function validate(form) {
  const errors = {}
  if (!form.fullName.trim()) errors.fullName = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.phone.trim()) errors.phone = 'Please enter a contact number.'
  if (!form.eventType) errors.eventType = 'Choose an event type.'
  if (!form.eventLocation.trim()) errors.eventLocation = 'Please enter an event location or suburb.'
  if (!form.consent) errors.consent = 'Consent is required so we can respond.'
  return errors
}

export default function Contact({ content }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [notice, setNotice] = useState('')
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(content.contact.phoneHref, form, content.branding.businessName), [content, form])

  const update = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const toggleService = (service) => {
    setForm((current) => ({ ...current, services: current.services.includes(service) ? current.services.filter((item) => item !== service) : [...current.services, service] }))
  }

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { setNotice('Please check the highlighted fields.'); return }
    if (!endpoint) { setStatus('unconfigured'); setNotice(content.contact.unconfiguredMessage); return }
    try {
      setStatus('sending'); setNotice('Sending your enquiry…')
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error('Delivery failed')
      setStatus('success'); setNotice(content.contact.successMessage); setForm(initialForm)
    } catch {
      setStatus('error'); setNotice('The form could not be delivered. Please continue on WhatsApp instead.')
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="page-shell contact-grid">
        <div className="contact-copy">
          <SectionHeading eyebrow={content.contact.eyebrow} title={content.contact.title} description={content.contact.description} light />
          <div className="direct-contact">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener"><MessageCircle /><span><small>WhatsApp</small><strong>{content.contact.phoneDisplay}</strong></span><ArrowUpRight /></a>
            <a href={`tel:${content.contact.phoneHref}`}><Phone /><span><small>Call</small><strong>{content.contact.phoneDisplay}</strong></span><ArrowUpRight /></a>
            <a href={content.socialMedia.instagram.url} target="_blank" rel="noreferrer noopener"><Camera /><span><small>Instagram</small><strong>{content.socialMedia.instagram.handle}</strong></span><ArrowUpRight /></a>
          </div>
          <p className="verification-note">{content.contact.verificationNote}</p>
        </div>

        <motion.form className="enquiry-form" onSubmit={submit} noValidate initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="form-row">
            <Field label="Full name" name="fullName" value={form.fullName} onChange={update} error={errors.fullName} autoComplete="name" />
            <Field label="Email" name="email" type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email" />
          </div>
          <div className="form-row">
            <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={update} error={errors.phone} autoComplete="tel" />
            <label className={`form-field ${errors.eventType ? 'has-error' : ''}`}><span>Event type</span><select name="eventType" value={form.eventType} onChange={update}><option value="">Choose one</option>{content.contact.eventTypes.map((item) => <option key={item}>{item}</option>)}</select>{errors.eventType && <small role="alert">{errors.eventType}</small>}</label>
          </div>
          <div className="form-row form-row--three">
            <Field label="Event date" name="eventDate" type="date" value={form.eventDate} onChange={update} />
            <Field label="Event location" name="eventLocation" value={form.eventLocation} onChange={update} error={errors.eventLocation} placeholder="Venue or suburb" />
            <Field label="Guest count" name="guestCount" type="number" value={form.guestCount} onChange={update} min="1" placeholder="Optional" />
          </div>
          <fieldset className="service-options"><legend>Services you’re interested in</legend><div>{content.contact.serviceOptions.map((service) => <label key={service}><input type="checkbox" checked={form.services.includes(service)} onChange={() => toggleService(service)} /><span>{service}</span></label>)}</div></fieldset>
          <label className="form-field"><span>Message / special requirements</span><textarea name="message" value={form.message} onChange={update} rows="4" placeholder="Tell us about the moments you want to create…" /></label>
          <label className={`consent-field ${errors.consent ? 'has-error' : ''}`}><input type="checkbox" name="consent" checked={form.consent} onChange={update} /><span>{content.contact.consentLabel}</span></label>{errors.consent && <small className="field-error" role="alert">{errors.consent}</small>}
          {notice && <p className={`form-notice form-notice--${status}`} role="status">{notice}</p>}
          <div className="form-actions"><button className="button button--gold" type="submit" disabled={status === 'sending'}>{content.contact.submitLabel}<ArrowUpRight size={17} /></button><a className="button button--outline-gold" href={whatsappUrl} target="_blank" rel="noreferrer noopener">{content.contact.fallbackLabel}<MessageCircle size={17} /></a></div>
        </motion.form>
      </div>
    </section>
  )
}

function Field({ label, error, ...props }) {
  return <label className={`form-field ${error ? 'has-error' : ''}`}><span>{label}</span><input {...props} />{error && <small role="alert">{error}</small>}</label>
}
