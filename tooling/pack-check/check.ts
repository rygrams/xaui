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
 * The one package allowed to depend on {@link CORE} rather than peer on it. `@xaui/hybrid`
 * is Native re-exported for the web (P6), so installing it has to install Native. A
 * caret range still resolves to the consumer's own copy whenever they also install Native
 * directly, as long as it admits the version we ship — checked below like a peer range.
 */
const CORE_DEPENDENT = '@xaui/hybrid'

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
      ...checkSubpathParity(manifests),
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
      `✓ ${CORE} resolves once: a peer everywhere but ${CORE_DEPENDENT}, no other runtime dependencies, ` +
        'no workspace protocol left, and every peer range admits what we ship.'
    )
    console.log(
      `✓ every subpath of ${EXPORTS_CHECKED.join(' and ')} points at a file the ` +
        'tarball actually contains.'
    )
    console.log(`✓ ${CORE_DEPENDENT} exposes exactly the subpaths ${CORE} does.`)
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

/**
 * `@xaui/hybrid` exposes exactly `@xaui/native`'s subpaths. A Native component added
 * without its one-line Hybrid re-export is missing on the web; a Hybrid-only subpath is a
 * shared component forked. Web-only components will need their own allowance here when
 * the first one lands.
 */
function checkSubpathParity(all: Manifest[]): Failure[] {
  const core = all.find(manifest => manifest.name === CORE)
  const dependent = all.find(manifest => manifest.name === CORE_DEPENDENT)
  if (!core || !dependent) return []

  const coreSubpaths = new Set(Object.keys(core.exports ?? {}))
  const dependentSubpaths = new Set(Object.keys(dependent.exports ?? {}))
  const where = `${dependent.name}@${dependent.version}`

  const missing = [...coreSubpaths]
    .filter(subpath => !dependentSubpaths.has(subpath))
    .map(subpath => ({
      where,
      problem: `does not export "${subpath}", which ${CORE} does. Add its one-line re-export to src, package.json and tsup.config.ts.`,
    }))
  const extra = [...dependentSubpaths]
    .filter(subpath => !coreSubpaths.has(subpath))
    .map(subpath => ({
      where,
      problem: `exports "${subpath}", which ${CORE} does not. A Hybrid subpath exists because the Native one does.`,
    }))

  return [...missing, ...extra]
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

  const dependsOnCore = manifest.name === CORE_DEPENDENT

  // The one that actually causes a duplicate. A peer is resolved from the consumer's
  // own tree; a dependency brings its own copy along.
  if (CORE in dependencies && !dependsOnCore) {
    failures.push({
      where,
      problem: `declares ${CORE} as a dependency. It must be a peer, or a consumer ends up with two copies and two theme contexts.`,
    })
  }

  if (dependsOnCore && !(CORE in dependencies)) {
    failures.push({
      where,
      problem: `does not declare ${CORE} as a dependency. It re-exports every Native subpath, so installing it without Native installs nothing that works.`,
    })
  }

  const others = Object.keys(dependencies).filter(
    name => !(dependsOnCore && name === CORE)
  )

  if (others.length > 0) {
    failures.push({
      where,
      problem: `has runtime dependencies (${others.join(', ')}). The packages ship with none beyond ${CORE_DEPENDENT} → ${CORE}, so nothing can drag a second copy of anything in.`,
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
  const range = peers[CORE] ?? dependencies[CORE]

  if (shipped && range && !semver.satisfies(shipped.version, range)) {
    failures.push({
      where,
      problem: `requires ${CORE}@${range}, which ${shipped.version} does not satisfy. While ${CORE} publishes prereleases this range has to name the exact tuple — semver excludes prereleases from any range that does not mention their major.minor.patch, so even "*" would not match.`,
    })
  }

  return failures
}

main()
