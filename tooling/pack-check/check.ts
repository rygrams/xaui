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

const PACKAGES = ['native', 'native-legacy'] as const
const CORE = '@xaui/native'

type Manifest = {
  name: string
  version: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

type Failure = { where: string; problem: string }

function main() {
  const workspace = join(import.meta.dirname, '../..')
  const out = mkdtempSync(join(tmpdir(), 'xaui-pack-'))

  try {
    const manifests = PACKAGES.map(pkg => packed(workspace, pkg, out))
    const failures = manifests.flatMap(manifest => check(manifest, manifests))

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
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}

/** Packs a workspace package and reads the manifest npm would actually publish. */
function packed(workspace: string, pkg: string, out: string): Manifest {
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
  execFileSync('rm', ['-f', tarball])

  return JSON.parse(raw) as Manifest
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
