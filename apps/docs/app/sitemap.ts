import fs from 'node:fs'
import path from 'node:path'
import type { MetadataRoute } from 'next'
import { components } from '@/lib/data/components'
import { getReleases } from '@/lib/releases'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * Every `page.tsx` under `app/docs` that is not a dynamic segment, read off the tree so a
 * new guide page lands in the sitemap without anyone remembering to add it here.
 */
function getStaticDocRoutes(
  directory = path.join(process.cwd(), 'app/docs')
): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  const routes = entries.some(entry => entry.name === 'page.tsx')
    ? [path.relative(path.join(process.cwd(), 'app'), directory)]
    : []

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('[')) {
      routes.push(...getStaticDocRoutes(path.join(directory, entry.name)))
    }
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...getStaticDocRoutes().map(route => `/${route.split(path.sep).join('/')}`),
    ...components.map(component => `/docs/components/${component.id}`),
    ...getReleases().map(release => release.href),
  ]

  return routes.sort().map(route => ({ url: `${SITE_URL}${route}` }))
}
