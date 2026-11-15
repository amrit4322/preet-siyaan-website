import { MessageCircle } from 'lucide-react'
import { buildWhatsAppUrl } from '../../utils/links'

export default function FloatingWhatsApp({ content }) {
  const url = buildWhatsAppUrl(content.contact.phoneHref, {}, content.branding.businessName)
  return <a className="floating-whatsapp" href={url} target="_blank" rel="noreferrer noopener" aria-label="Enquire with Preetsiyaan on WhatsApp"><MessageCircle /><span>Enquire</span></a>
}
