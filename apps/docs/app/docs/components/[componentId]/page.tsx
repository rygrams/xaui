import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CodeBlock } from '@/components/ui/code-block'
import { getComponentById, components, type Component } from '@/lib/data/components'
import { componentPropsMap } from '@/lib/data/component-props'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type ComponentPageProps = {
  params: Promise<{
    componentId: string
  }>
}

function getStatusClass(status: 'stable' | 'beta' | 'alpha') {
  if (status === 'stable') {
    return 'rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300'
  }
  if (status === 'beta') {
    return 'rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900 dark:text-amber-300'
  }
  return 'rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-300'
}

function getVariantsCode(importPath: string, primaryExport: string) {
  return `import { ${primaryExport} } from '${importPath}'\n\nexport function VariantsExample() {\n  return (\n    <>\n      <${primaryExport} variant="solid" />\n      <${primaryExport} variant="outlined" />\n      <${primaryExport} variant="light" />\n      <${primaryExport} variant="flat" />\n      <${primaryExport} variant="faded" />\n    </>\n  )\n}`
}

function getControlledCode(importPath: string, primaryExport: string) {
  return `import { useState } from 'react'\nimport { ${primaryExport} } from '${importPath}'\n\nexport function ControlledExample() {\n  const [value, setValue] = useState(undefined)\n\n  return <${primaryExport} value={value} onValueChange={setValue} />\n}`
}

function getDisabledCode(importPath: string, primaryExport: string) {
  return `import { ${primaryExport} } from '${importPath}'\n\nexport function DisabledExample() {\n  return <${primaryExport} isDisabled />\n}`
}

function getCustomizationCode(importPath: string, primaryExport: string) {
  return `import { ${primaryExport} } from '${importPath}'\n\nexport function CustomAppearanceExample() {\n  return (\n    <${primaryExport}\n      customAppearance={{\n        container: { borderRadius: 12 },\n      }}\n    />\n  )\n}`
}

function getComponentKeywords(component: Component) {
  return Array.from(
    new Set([
      'xaui',
      'xaui docs',
      'react native',
      'ui component',
      component.name,
      component.id,
      component.category,
      component.importPath,
      ...component.exports,
      ...(component.types ?? []),
    ])
  )
}

export function generateStaticParams() {
  return components
    .filter(component => component.id !== 'expansion-panel')
    .map(component => ({
      componentId: component.id,
    }))
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const { componentId } = await params
  const component = getComponentById(componentId)

  if (!component) {
    return {
      title: 'Component Not Found - Xaui',
      description: 'This component documentation page does not exist.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `${component.name} - Xaui`
  const description = component.description

  return {
    title,
    description,
    keywords: getComponentKeywords(component),
    alternates: {
      canonical: component.href,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: component.href,
      siteName: 'Xaui Documentation',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { componentId } = await params
  const component = getComponentById(componentId)

  if (!component) {
    notFound()
  }

  const propsData = componentPropsMap[component.id]
  const installationCode = 'npm install @xaui/native'
  const importCode = `import { ${component.exports.join(', ')} } from '${component.importPath}'`
  const primaryExport = component.exports[0] ?? component.name
  const searchableApi =
    `${component.id} ${component.exports.join(' ')} ${component.types?.join(' ') ?? ''}`.toLowerCase()
  const hasVariant = searchableApi.includes('variant')
  const hasControlled =
    component.category === 'Inputs' ||
    searchableApi.includes('group') ||
    searchableApi.includes('item')
  const hasDisabled =
    component.category === 'Inputs' ||
    component.category === 'Actions' ||
    component.category === 'Navigation'
  const hasCustomAppearance = searchableApi.includes('customappearance')
  const noChildrenComponents = new Set(['spacer', 'sized-box', 'aspect-ratio', 'divider'])
  const needsChildren =
    (component.category === 'Layout' && !noChildrenComponents.has(component.id)) ||
    component.id === 'card' ||
    component.id === 'list' ||
    component.id === 'pager' ||
    component.id === 'tabs' ||
    component.id === 'stepper'
  const usageCode = needsChildren
    ? `import { ${primaryExport} } from '${component.importPath}'\n\nexport function Example() {\n  return (\n    <${primaryExport}>\n      {/* children */}\n    </${primaryExport}>\n  )\n}`
    : `import { ${primaryExport} } from '${component.importPath}'\n\nexport function Example() {\n  return <${primaryExport} />\n}`
  const variantsCode = getVariantsCode(component.importPath, primaryExport)
  const controlledCode = getControlledCode(component.importPath, primaryExport)
  const disabledCode = getDisabledCode(component.importPath, primaryExport)
  const customizationCode = getCustomizationCode(component.importPath, primaryExport)
  const typesCode =
    component.types && component.types.length > 0
      ? `import type { ${component.types.join(', ')} } from '${component.importPath}'`
      : null

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight">{component.name}</h1>
          <span className={getStatusClass(component.status)}>
            {component.status[0]?.toUpperCase()}
            {component.status.slice(1)}
          </span>
        </div>
        <p className="text-xl text-muted-foreground">{component.description}</p>
      </div>

      <Tabs defaultValue="code" className="w-full">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Installation</h3>
            <CodeBlock code={installationCode} language="bash" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Import</h3>
            <CodeBlock code={importCode} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <p className="text-muted-foreground">
              Minimal example showing the component with its default configuration.
            </p>
            <CodeBlock code={usageCode} />
          </div>

          {propsData?.examples
            ? propsData.examples.map(example => (
                <div key={example.title} className="space-y-4">
                  <h3 className="text-lg font-semibold">{example.title}</h3>
                  {example.description && (
                    <p className="text-muted-foreground">{example.description}</p>
                  )}
                  <CodeBlock code={example.code} />
                </div>
              ))
            : (
              <>
                {hasVariant && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Variants</h3>
                    <p className="text-muted-foreground">
                      Use case with multiple visual variants.
                    </p>
                    <CodeBlock code={variantsCode} />
                  </div>
                )}

                {hasControlled && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Controlled State</h3>
                    <p className="text-muted-foreground">
                      Controlled pattern using external React state.
                    </p>
                    <CodeBlock code={controlledCode} />
                  </div>
                )}

                {hasDisabled && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Disabled State</h3>
                    <p className="text-muted-foreground">
                      Use case where the component should be non-interactive.
                    </p>
                    <CodeBlock code={disabledCode} />
                  </div>
                )}

                {hasCustomAppearance && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Customization</h3>
                    <p className="text-muted-foreground">
                      Customization via the <code>customAppearance</code> API.
                    </p>
                    <CodeBlock code={customizationCode} />
                  </div>
                )}
              </>
            )}
        </TabsContent>

        <TabsContent value="props" className="space-y-8">
          {typesCode && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">TypeScript Types</h3>
              <CodeBlock code={typesCode} />
            </div>
          )}

          {propsData ? (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{component.name} Props</h3>
                <div className="rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Prop</th>
                        <th className="px-4 py-3 text-left font-medium">Type</th>
                        <th className="px-4 py-3 text-left font-medium">Default</th>
                        <th className="px-4 py-3 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propsData.props.map((prop, i) => (
                        <tr
                          key={prop.name}
                          className={i < propsData.props.length - 1 ? 'border-b' : ''}
                        >
                          <td className="px-4 py-3 font-mono text-xs">{prop.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{prop.type}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {prop.defaultValue}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {prop.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {propsData.events && propsData.events.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{component.name} Events</h3>
                  <div className="rounded-lg border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Event</th>
                          <th className="px-4 py-3 text-left font-medium">Type</th>
                          <th className="px-4 py-3 text-left font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {propsData.events.map((event, i) => (
                          <tr
                            key={event.name}
                            className={
                              propsData.events && i < propsData.events.length - 1
                                ? 'border-b'
                                : ''
                            }
                          >
                            <td className="px-4 py-3 font-mono text-xs">{event.name}</td>
                            <td className="px-4 py-3 text-muted-foreground">{event.type}</td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {event.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {propsData.subComponents?.map(sub => (
                <div key={sub.name} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{sub.name} Props</h3>
                    <div className="rounded-lg border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-3 text-left font-medium">Prop</th>
                            <th className="px-4 py-3 text-left font-medium">Type</th>
                            <th className="px-4 py-3 text-left font-medium">Default</th>
                            <th className="px-4 py-3 text-left font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sub.props.map((prop, i) => (
                            <tr
                              key={prop.name}
                              className={i < sub.props.length - 1 ? 'border-b' : ''}
                            >
                              <td className="px-4 py-3 font-mono text-xs">{prop.name}</td>
                              <td className="px-4 py-3 text-muted-foreground">{prop.type}</td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {prop.defaultValue}
                              </td>
                              <td className="px-4 py-3 text-muted-foreground">
                                {prop.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {sub.events && sub.events.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">{sub.name} Events</h3>
                      <div className="rounded-lg border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="px-4 py-3 text-left font-medium">Event</th>
                              <th className="px-4 py-3 text-left font-medium">Type</th>
                              <th className="px-4 py-3 text-left font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sub.events.map((event, i) => (
                              <tr
                                key={event.name}
                                className={
                                  sub.events && i < sub.events.length - 1 ? 'border-b' : ''
                                }
                              >
                                <td className="px-4 py-3 font-mono text-xs">{event.name}</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  {event.type}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  {event.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Exports</h3>
              <div className="rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Module</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.exports.map((exportName, i) => (
                      <tr
                        key={exportName}
                        className={i < component.exports.length - 1 ? 'border-b' : ''}
                      >
                        <td className="px-4 py-3 font-mono text-xs">{exportName}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          {component.importPath}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
