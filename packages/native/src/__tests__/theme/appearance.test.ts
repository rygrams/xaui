import { describe, expect, it } from 'vitest'
import { appearanceFor } from '../../theme/appearance'
import { defaultTheme } from '../../theme/create-theme'

describe('appearanceFor — the inversion', () => {
  it('draws light ink on the bars of a dark app', () => {
    const { barContent, statusBarStyle } = appearanceFor(defaultTheme.dark)
    expect(barContent).toBe('light')
    expect(statusBarStyle).toBe('light-content')
  })

  it('draws dark ink on the bars of a light app', () => {
    const { barContent, statusBarStyle } = appearanceFor(defaultTheme.light)
    expect(barContent).toBe('dark')
    expect(statusBarStyle).toBe('dark-content')
  })

  /**
   * The bug this whole module exists to stop. `barContent === colorMode` reads correctly
   * in prose and is backwards on screen, and it ships as a status bar nobody can read.
   */
  it('never answers the mode itself', () => {
    for (const theme of [defaultTheme.light, defaultTheme.dark]) {
      const { colorMode, barContent } = appearanceFor(theme)
      expect(barContent).not.toBe(colorMode)
    }
  })
})

describe('appearanceFor — the colours', () => {
  it('reports the mode it was given', () => {
    expect(appearanceFor(defaultTheme.light).colorMode).toBe('light')
    expect(appearanceFor(defaultTheme.dark).colorMode).toBe('dark')
  })

  it('hands back the page ground rather than a raised one', () => {
    const theme = defaultTheme.light
    const { background, foreground, border } = appearanceFor(theme)

    expect(background).toBe(theme.colors.background)
    expect(foreground).toBe(theme.colors.foreground)
    expect(border).toBe(theme.colors.border)
  })

  it('follows a theme that overrode its own ground', () => {
    const theme = { ...defaultTheme.light }
    theme.colors = { ...theme.colors, background: '#101014' }

    expect(appearanceFor(theme).background).toBe('#101014')
  })
})
