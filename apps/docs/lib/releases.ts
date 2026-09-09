import fs from 'node:fs'
import path from 'node:path'

export type Release = {
  version: string
  channel: 'alpha' | 'stable'
  summary: string
  markdown: string
  href: string
}

/**
 * The changelog is `@xaui/native`'s own — changesets writes it, so the release notes on the
 * site and the notes on npm are the same text. `public/docs/changelog.md` is the copy the
 * generator drops next to the component markdown, and it is read first: a deployed build
 * has the docs app without the workspace around it.
 */
const CHANGELOG_PATHS = [
  'public/docs/changelog.md',
  '../../packages/native/CHANGELOG.md',
]

function readChangelog() {
  for (const candidate of CHANGELOG_PATHS) {
    const changelogPath = path.resolve(process.cwd(), candidate)
    if (fs.existsSync(changelogPath)) return fs.readFileSync(changelogPath, 'utf8')
  }
  throw new Error('No @xaui/native CHANGELOG.md found.')
}

/**
 * The first line of the first bullet, without the changeset hash — what the release was
 * about, for the lists that cannot show the whole entry.
 */
function getSummary(markdown: string) {
  const bullet = markdown.match(/^- (?:[0-9a-f]{7,}: )?(.+)$/m)?.[1] ?? ''
  return bullet.replaceAll('`', '').trim()
}

let cache: Release[] | undefined

/** Every published version, newest first. */
export function getReleases(): Release[] {
  if (cache) return cache

  const source = readChangelog()
  const headings = [...source.matchAll(/^## (.+)$/gm)]

  cache = headings.map((heading, index) => {
    const version = heading[1].trim()
    const markdown = source
      .slice(
        (heading.index ?? 0) + heading[0].length,
        headings[index + 1]?.index ?? source.length
      )
      .trim()

    return {
      version,
      channel: version.includes('-alpha') ? 'alpha' : 'stable',
      summary: getSummary(markdown),
      markdown,
      href: `/docs/releases/${version}`,
    }
  })

  return cache
}

export function getRelease(version: string) {
  return getReleases().find(release => release.version === version)
}

export function getLatestRelease() {
  const [latest] = getReleases()
  if (!latest) throw new Error('The @xaui/native CHANGELOG.md holds no version.')
  return latest
}
