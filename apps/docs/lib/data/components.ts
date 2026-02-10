export interface Component {
  id: string
  name: string
  description: string
  category: string
  href: string
  status: 'stable' | 'beta' | 'alpha'
}

export const components: Component[] = [
  {
    id: 'expansion-panel',
    name: 'ExpansionPanel',
    description:
      'A vertically stacked set of interactive headings that each reveal a section of content.',
    category: 'Layout',
    href: '/docs/components/expansion-panel',
    status: 'beta',
  },
]

export const categories = Array.from(new Set(components.map(c => c.category))).sort()

export function searchComponents(query: string): Component[] {
  const lowerQuery = query.toLowerCase()
  return components.filter(
    component =>
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.category.toLowerCase().includes(lowerQuery)
  )
}
