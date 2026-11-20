import { describe, expect, it } from 'vitest'
import { statusBarStyleOn } from '../../../components/scaffold/scaffold.utils'

describe('statusBarStyleOn', () => {
  it('writes light icons on a dark ground', () => {
    expect(statusBarStyleOn('#000000', 'dark-content')).toBe('light-content')
    expect(statusBarStyleOn('#1BA1E2', 'dark-content')).toBe('light-content')
  })

  it('writes dark icons on a light ground', () => {
    expect(statusBarStyleOn('#FFFFFF', 'light-content')).toBe('dark-content')
    expect(statusBarStyleOn('#F2F2F2', 'light-content')).toBe('dark-content')
  })

  it('writes dark icons on the light accents, whatever the mode', () => {
    expect(statusBarStyleOn('#A4C400', 'light-content')).toBe('dark-content')
    expect(statusBarStyleOn('#E3C800', 'light-content')).toBe('dark-content')
  })

  it('reads the short hex form', () => {
    expect(statusBarStyleOn('#fff', 'light-content')).toBe('dark-content')
  })

  it('keeps the mode’s ink for a ground it cannot read', () => {
    expect(statusBarStyleOn('rgb(0, 0, 0)', 'dark-content')).toBe('dark-content')
    expect(statusBarStyleOn(undefined, 'light-content')).toBe('light-content')
  })
})
