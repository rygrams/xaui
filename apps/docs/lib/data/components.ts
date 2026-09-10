import catalog from './native-components.generated.json'

export type ComponentCategory =
  | 'Actions'
  | 'Charts'
  | 'Data display'
  | 'Feedback'
  | 'Forms'
  | 'Layout'
  | 'Navigation'
  | 'Overlays'

export type Component = {
  id: string
  name: string
  title: string
  description: string
  category: ComponentCategory
  href: string
  importPath: string
  sourceUrl: string
  markdownPath: string
  demoId: string
  exports: string[]
  status: 'beta'
}

export const components: Component[] = catalog.map(component => ({
  ...component,
  name: component.title,
  category: component.category as ComponentCategory,
  status: 'beta',
}))

export const categories = Array.from(
  new Set(components.map(component => component.category))
)

export function searchComponents(query: string) {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return components

  return components.filter(component =>
    [component.name, component.description, component.category, component.importPath]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery)
  )
}

export function getComponentById(componentId: string) {
  return components.find(component => component.id === componentId)
}
