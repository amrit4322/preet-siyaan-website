import { describe, expect, it } from 'vitest'
import { buildWhatsAppMessage, buildWhatsAppUrl } from './links'

describe('WhatsApp links', () => {
  it('includes enquiry context', () => {
    const message = buildWhatsAppMessage({ fullName: 'Aman', eventType: 'Wedding', services: ['Dhol'] }, 'Preetsiyaan')
    expect(message).toContain('Aman')
    expect(message).toContain('Wedding')
    expect(message).toContain('Dhol')
  })

  it('normalises the phone and encodes the message', () => {
    const url = buildWhatsAppUrl('+61 422 542 030', { fullName: 'Aman' }, 'Preetsiyaan')
    expect(url).toMatch(/^https:\/\/wa\.me\/61422542030\?text=/)
    expect(url).toContain('Aman')
  })
})
