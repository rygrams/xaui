'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { components, categories } from '@/lib/data/components'
import { ArrowUpRight, Search } from 'lucide-react'
import Link from 'next/link'

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
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Components
          </h1>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {components.length}
          </span>
        </div>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-xl md:leading-8">
          The whole @xaui/native catalogue: live React Native Web preview, anatomy,
          examples, generated TypeScript API, accessibility and migration.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search a component…"
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
            <section
              className="scroll-mt-8 space-y-4"
              id={category.toLowerCase().replaceAll(' ', '-')}
              key={category}
            >
              <h2 className="text-xl font-semibold tracking-tight">{category}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {categoryComponents.map(component => (
                  <Link
                    key={component.id}
                    href={component.href}
                    className="group rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 pr-3">
                        <h3 className="font-semibold">{component.name}</h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {component.description}
                        </p>
                      </div>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <code className="mt-4 block truncate text-xs text-muted-foreground">
                      {component.importPath}
                    </code>
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
            No component matches &quot;{searchQuery}&quot;.
          </p>
        </div>
      )}
    </div>
  )
}
