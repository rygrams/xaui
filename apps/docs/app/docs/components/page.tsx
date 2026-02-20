'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { components, categories } from '@/lib/data/components'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredComponents = searchQuery
    ? components.filter(
        c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : components

  const groupedComponents = categories.reduce(
    (acc, category) => {
      acc[category] = filteredComponents.filter(c => c.category === category)
      return acc
    },
    {} as Record<string, typeof components>
  )

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Components</h1>
        <p className="text-base text-muted-foreground md:text-xl">
          Browse all available components in the Xaui library.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-8">
        {categories.map(category => {
          const categoryComponents = groupedComponents[category]
          if (categoryComponents.length === 0) return null

          return (
            <section key={category} className="space-y-4">
              <h2 className="text-xl font-semibold">{category}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {categoryComponents.map(component => (
                  <Link
                    key={component.id}
                    href={component.href}
                    className="group rounded-lg border p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{component.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground group-hover:text-accent-foreground">
                          {component.description}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs',
                          component.status === 'stable' &&
                            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
                          component.status === 'beta' &&
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        )}
                      >
                        {component.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No components found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
