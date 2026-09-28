import { describe, expect, it } from 'vitest'
import { parseInstallCommand } from './install-command'

describe('parseInstallCommand', () => {
  it('reads the package manager and the XAUI package', () => {
    expect(parseInstallCommand('pnpm add @xaui/native')).toEqual({
      packageManager: 'pnpm',
      xauiPackage: '@xaui/native',
    })
    expect(parseInstallCommand('npm install @xaui/hybrid')).toEqual({
      packageManager: 'npm',
      xauiPackage: '@xaui/hybrid',
    })
    expect(parseInstallCommand('yarn add @xaui/native')?.packageManager).toBe('yarn')
    expect(parseInstallCommand('bun i @xaui/native')?.packageManager).toBe('bun')
  })

  it('finds the install line among the peer installs', () => {
    const code = `pnpm add @xaui/native libphonenumber-js
pnpm exec expo install react-native-reanimated react-native-worklets`

    expect(parseInstallCommand(code)?.xauiPackage).toBe('@xaui/native')
  })

  it('joins a command wrapped with backslashes', () => {
    const code = `pnpm add \\
  libphonenumber-js @xaui/native`

    expect(parseInstallCommand(code)?.xauiPackage).toBe('@xaui/native')
  })

  it('keeps the first package and drops its version', () => {
    expect(
      parseInstallCommand(
        'pnpm add @xaui/native --save-exact @xaui/native-legacy@0.2.11'
      )
    ).toEqual({ packageManager: 'pnpm', xauiPackage: '@xaui/native' })
    expect(
      parseInstallCommand('pnpm add @xaui/native-legacy@0.2.11')?.xauiPackage
    ).toBe('@xaui/native-legacy')
  })

  it('ignores whatever does not install XAUI', () => {
    expect(parseInstallCommand('pnpm exec expo install react-native-svg')).toBeNull()
    expect(parseInstallCommand('pnpm add react-native-svg')).toBeNull()
    expect(
      parseInstallCommand("import { Button } from '@xaui/native/button'")
    ).toBeNull()
    expect(parseInstallCommand('pnpm dlx @xaui/native')).toBeNull()
  })
})
