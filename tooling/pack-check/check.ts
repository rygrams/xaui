import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import semver from 'semver'

/**
 * P1.7 — what has to hold for `@xaui/native` to appear exactly once in a consumer's
 * resolution tree. Two copies means two module instances, so two React contexts, so a
 * legacy `Button` under the v1 provider raising "must be used within XAUIProvider" — the
 * one condition §7 calls non-negotiable, and the whole reason legacy declares a peer
 * rather than a dependency.
 *
 * It runs against the **packed** manifests rather than the workspace ones: `workspace:*`
 * is rewritten at pack time, and it is the published shape that consumers install.
 */

const PACKAGES = ['native', 'hybrid', 'native-legacy'] as const
const CORE = '@xaui/native'

/**
 * Whose `exports` map is held to actually shipping what it points at.
 *
 * `@xaui/native-legacy` is out on purpose: its 48 entries carry the same `require` defect
 * the P2 review found in the other two, and it is frozen at `0.2.11` and listed in
 * changesets `ignore`, so fixing it means taking it out of `ignore` for a release. Until
 * that release, adding it here would only turn CI red over a tree nobody republishes.
 * See `.project-specs/P2-API-REVIEW.md`, point A.
 */
const EXPORTS_CHECKED: ReadonlyArray<string> = ['@xaui/native', '@xaui/hybrid']

type Manifest = {
  name: string
  version: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  exports?: Record<string, unknown>
}

/** A packed package: the manifest npm would publish, and the files beside it. */
type Packed = { manifest: Manifest; files: ReadonlySet<string> }

type Failure = { where: string; problem: string }

function main() {
  const workspace = join(import.meta.dirname, '../..')
  const out = mkdtempSync(join(tmpdir(), 'xaui-pack-'))

  try {
    const packages = PACKAGES.map(pkg => packed(workspace, pkg, out))
    const manifests = packages.map(entry => entry.manifest)
    const failures = [
      ...manifests.flatMap(manifest => check(manifest, manifests)),
      ...packages.flatMap(checkExports),
    ]

    for (const { where, problem } of failures) {
      console.error(`  ✗ ${where}\n    ${problem}`)
    }

    if (failures.length > 0) {
      console.error(
        `\n${failures.length} problem(s). See tooling/pack-check/check.ts.`
      )
      process.exitCode = 1
      return
    }

    console.log(
      `✓ ${CORE} resolves once: declared as a peer only, no runtime dependencies, ` +
        'no workspace protocol left, and every peer range admits what we ship.'
    )
    console.log(
      `✓ every subpath of ${EXPORTS_CHECKED.join(' and ')} points at a file the ` +
        'tarball actually contains.'
    )
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}

/** Packs a workspace package and reads what npm would actually publish. */
function packed(workspace: string, pkg: string, out: string): Packed {
  const dir = join(workspace, 'packages', pkg)

  execFileSync('pnpm', ['pack', '--pack-destination', out], {
    cwd: dir,
    stdio: 'pipe',
  })

  const tarball = execFileSync('sh', [
    '-c',
    `ls ${JSON.stringify(out)}/*.tgz | head -n 1`,
  ])
    .toString()
    .trim()

  const raw = execFileSync('tar', [
    '-xOf',
    tarball,
    'package/package.json',
  ]).toString()

  // Read from the tarball rather than from `dist`: `files` decides what ships, and an
  // entry point that exists on disk but is excluded from the package is the same
  // broken install as one that was never built.
  const listing = execFileSync('tar', ['-tf', tarball]).toString()
  execFileSync('rm', ['-f', tarball])

  const files = new Set(
    listing
      .split('\n')
      .filter(Boolean)
      .map(path => path.replace(/^package\//, './'))
  )

  return { manifest: JSON.parse(raw) as Manifest, files }
}

/**
 * Every target in the `exports` map is a file the tarball contains.
 *
 * Two failures it catches, and both are silent until a consumer hits them: a new
 * component declared in `package.json` and forgotten in `tsup.config.ts` — which P3 has
 * 46 more chances to do — and a condition pointing at the wrong build, which is how
 * `require` came to resolve to an ESM file on every subpath of every package.
 */
function checkExports({ manifest, files }: Packed): Failure[] {
  if (!EXPORTS_CHECKED.includes(manifest.name)) return []

  const where = `${manifest.name}@${manifest.version}`

  return targetsOf(manifest.exports ?? {})
    .filter(target => !files.has(target))
    .map(target => ({
      where,
      problem: `exports "${target}", which is not in the tarball. Either the build does not emit it — check tsup.config.ts — or "files" excludes it.`,
    }))
}

/** Every leaf of the conditions tree, which is where the paths are. */
function targetsOf(node: unknown): string[] {
  if (typeof node === 'string') return node.startsWith('./') ? [node] : []
  if (node === null || typeof node !== 'object') return []
  return Object.values(node).flatMap(targetsOf)
}

function check(manifest: Manifest, all: Manifest[]): Failure[] {
  const failures: Failure[] = []
  const where = `${manifest.name}@${manifest.version}`
  const dependencies = manifest.dependencies ?? {}
  const peers = manifest.peerDependencies ?? {}

  // The one that actually causes a duplicate. A peer is resolved from the consumer's
  // own tree; a dependency brings its own copy along.
  if (CORE in dependencies) {
    failures.push({
      where,
      problem: `declares ${CORE} as a dependency. It must be a peer, or a consumer ends up with two copies and two theme contexts.`,
    })
  }

  if (Object.keys(dependencies).length > 0) {
    failures.push({
      where,
      problem: `has runtime dependencies (${Object.keys(dependencies).join(', ')}). Both packages ship with none, so nothing can drag a second copy of anything in.`,
    })
  }

  for (const [field, range] of Object.entries({ ...dependencies, ...peers })) {
    if (range.startsWith('workspace:')) {
      failures.push({
        where,
        problem: `left the workspace protocol on ${field} (${range}). Packing should have rewritten it; installing this would fail outright.`,
      })
    }
  }

  // A range the published version does not satisfy is not a duplicate — package managers
  // warn or refuse rather than quietly installing a second copy — but it is a broken
  // install for anyone following the migration guide.
  const shipped = all.find(other => other.name === CORE)
  const range = peers[CORE]

  if (shipped && range && !semver.satisfies(shipped.version, range)) {
    failures.push({
      where,
      problem: `peers on ${CORE}@${range}, which ${shipped.version} does not satisfy. While ${CORE} publishes prereleases this range has to name the exact tuple — semver excludes prereleases from any range that does not mention their major.minor.patch, so even "*" would not match.`,
    })
  }

  return failures
}

main()
