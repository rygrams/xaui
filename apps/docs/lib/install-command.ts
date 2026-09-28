export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

export type InstallCommand = {
  packageManager: PackageManager
  /** The first `@xaui/*` package the command installs, without its version. */
  xauiPackage: string
}

const INSTALL_LINE = /^(pnpm|npm|yarn|bun)\s+(?:add|install|i)\b(.*)$/
const XAUI_PACKAGE = /@xaui\/[a-z-]+/

/**
 * Reads a copied snippet back as the command that installs XAUI, or `null` when it is
 * anything else — an Expo peer install, a config file, a component example. Lines broken
 * with a trailing backslash are joined first, so a wrapped command reads as one.
 */
export function parseInstallCommand(code: string): InstallCommand | null {
  const lines = code.replace(/\\\r?\n/g, ' ').split(/\r?\n/)

  for (const line of lines) {
    const match = INSTALL_LINE.exec(line.trim())
    const xauiPackage = match?.[2].match(XAUI_PACKAGE)?.[0]

    if (match && xauiPackage) {
      return { packageManager: match[1] as PackageManager, xauiPackage }
    }
  }

  return null
}
