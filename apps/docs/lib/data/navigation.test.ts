import { describe, expect, it } from 'vitest'
import { getPackageOfPath } from './components'
import { getActiveTab, getPackageSwitchHref } from './navigation'

describe('getPackageOfPath', () => {
  it('reads Tram off its prefix and everything else as Native', () => {
    expect(getPackageOfPath('/docs/tram')).toBe('tram')
    expect(getPackageOfPath('/docs/tram/components/button')).toBe('tram')
    expect(getPackageOfPath('/docs/components/button')).toBe('native')
    expect(getPackageOfPath('/docs/introduction')).toBe('native')
  })

  it('does not take a lookalike path for the prefix', () => {
    expect(getPackageOfPath('/docs/trampoline')).toBe('native')
  })
})

describe('getPackageSwitchHref', () => {
  it('keeps the component when the other package has it', () => {
    expect(getPackageSwitchHref('/docs/components/button', 'tram')).toBe(
      '/docs/tram/components/button'
    )
    expect(getPackageSwitchHref('/docs/tram/components/button', 'native')).toBe(
      '/docs/components/button'
    )
  })

  it('falls back to the catalogue when the other package lacks it', () => {
    expect(getPackageSwitchHref('/docs/tram/components/tile', 'native')).toBe(
      '/docs/components'
    )
  })

  it('maps catalogue to catalogue and any other page to the start', () => {
    expect(getPackageSwitchHref('/docs/components', 'tram')).toBe(
      '/docs/tram/components'
    )
    expect(getPackageSwitchHref('/docs/theme', 'tram')).toBe(
      '/docs/tram/getting-started'
    )
    expect(getPackageSwitchHref('/docs/tram/getting-started', 'native')).toBe(
      '/docs/introduction'
    )
  })
})

describe('getActiveTab', () => {
  it("lights one of the path's own package tabs", () => {
    expect(getActiveTab('/docs/tram/components/button').id).toBe('tram-components')
    expect(getActiveTab('/docs/components/button').id).toBe('components')
    expect(getActiveTab('/docs/tram/getting-started').id).toBe(
      'tram-getting-started'
    )
  })
})
