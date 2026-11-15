import { describe, expect, it } from 'vitest'
import { getEventAction, getEventState, getPublishedEvents, isValidExternalUrl } from './events'

const future = {
  id: 'future',
  startDatetime: '2030-01-01T18:00:00+11:00',
  endDatetime: '2030-01-01T22:00:00+11:00',
  bookingType: 'paid',
  externalTicketUrl: 'https://tickets.example.com/event',
  ticketStatus: 'available',
  visibility: 'public',
}

describe('event utilities', () => {
  it('distinguishes upcoming and past events', () => {
    expect(getEventState(future, new Date('2029-01-01'))).toBe('upcoming')
    expect(getEventState(future, new Date('2031-01-01'))).toBe('past')
  })

  it('never publishes demo fixtures', () => {
    expect(getPublishedEvents([{ ...future, isDemo: true }], new Date('2029-01-01'))).toEqual([])
  })

  it('returns safe actions for paid and sold-out events', () => {
    expect(getEventAction({ ...future, computedState: 'upcoming' }).label).toBe('Book tickets')
    expect(getEventAction({ ...future, computedState: 'sold-out' })).toEqual({ label: 'Sold out', disabled: true })
  })

  it('accepts only http and https external links', () => {
    expect(isValidExternalUrl('https://example.com')).toBe(true)
    expect(isValidExternalUrl('javascript:alert(1)')).toBe(false)
  })
})

