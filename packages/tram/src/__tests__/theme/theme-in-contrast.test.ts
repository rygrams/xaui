import { describe, expect, it } from 'vitest'
import type { XAUITheme, XAUIThemeSet } from '@xaui/native/theme'
import { registerThemeSet, themeInContrast } from '../../theme/theme-in-contrast'

/** Only identity matters to the lookup: a mode is told apart by being the same object. */
const mode = (name: string) => ({ name }) as unknown as XAUITheme
const set = (id: string): XAUIThemeSet => ({
  id,
  light: mode(`${id}.light`),
  dark: mode(`${id}.dark`),
})

describe('themeInContrast', () => {
  it('hands the dark mode the light one, and the light one the dark', () => {
    const tram = set('tram')
    registerThemeSet(tram)

    expect(themeInContrast(tram.dark)).toBe(tram.light)
    expect(themeInContrast(tram.light)).toBe(tram.dark)
  })

  it('stays inside the set the mode came from', () => {
    const cyan = set('cyan')
    const magenta = set('magenta')
    registerThemeSet(cyan)
    registerThemeSet(magenta)

    expect(themeInContrast(magenta.dark)).toBe(magenta.light)
    expect(themeInContrast(magenta.dark)).not.toBe(cyan.light)
  })

  it('finds nothing for a mode no registered set holds', () => {
    expect(themeInContrast(set('native').dark)).toBeUndefined()
  })
})
