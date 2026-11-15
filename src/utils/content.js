const requiredGroups = [
  'site',
  'branding',
  'theme',
  'seo',
  'navigation',
  'hero',
  'about',
  'services',
  'events',
  'contact',
  'features',
]

export function validateContent(content) {
  const warnings = []

  requiredGroups.forEach((group) => {
    if (content?.[group] == null) warnings.push(`Missing content group: ${group}`)
  })

  if (content?.services && !Array.isArray(content.services)) {
    warnings.push('services must be an array')
  }

  if (content?.events && !Array.isArray(content.events)) {
    warnings.push('events must be an array')
  }

  const duplicateServiceIds = content?.services
    ?.map((service) => service.id)
    .filter((id, index, all) => id && all.indexOf(id) !== index)

  if (duplicateServiceIds?.length) {
    warnings.push(`Duplicate service IDs: ${duplicateServiceIds.join(', ')}`)
  }

  if (import.meta.env.DEV && warnings.length) {
    console.warn('[Preetsiyaan content]', ...warnings)
  }

  return { valid: warnings.length === 0, warnings }
}

export function applyTheme(theme) {
  const root = document.documentElement
  const colors = theme?.colors || {}
  const typography = theme?.typography || {}

  Object.entries(colors).forEach(([name, value]) => {
    if (typeof value === 'string') root.style.setProperty(`--color-${name}`, value)
  })

  if (typography.heading) root.style.setProperty('--font-heading', `'${typography.heading}', Georgia, serif`)
  if (typography.body) root.style.setProperty('--font-body', `'${typography.body}', system-ui, sans-serif`)
}

export function getVisibleServices(content) {
  return [...(content.services || [])]
    .filter((service) => content.features?.showDraftServices || service.status !== 'draft')
    .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
}

