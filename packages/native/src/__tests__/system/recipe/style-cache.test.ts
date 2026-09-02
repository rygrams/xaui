import { describe, expect, it } from 'vitest'
import { cacheKey, createStyleCache } from '../../../system/recipe/style-cache'
import { defaultTheme } from '../../../theme/create-theme'

const light = defaultTheme.light
const dark = defaultTheme.dark

describe('createStyleCache', () => {
  it('builds once per key and returns the same reference after that', () => {
    const cache = createStyleCache(['root'])
    let builds = 0
    const build = () => {
      builds++
      return { root: { flex: 1 } }
    }

    const first = cache.read('a', build)
    const second = cache.read('a', build)

    expect(builds).toBe(1)
    expect(second).toBe(first)
    expect(cache.size).toBe(1)
  })

  it('grows by one entry per distinct key', () => {
    const cache = createStyleCache(['root'])
    const build = () => ({ root: { flex: 1 } })

    cache.read('a', build)
    cache.read('b', build)
    cache.read('a', build)

    expect(cache.size).toBe(2)
  })

  it('fills the slots the build left out', () => {
    const cache = createStyleCache(['root', 'label', 'icon'])

    const styles = cache.read('a', () => ({ root: { flex: 1 } }))

    expect(styles.label).toEqual({})
    expect(styles.icon).toEqual({})
  })

  it('clears', () => {
    const cache = createStyleCache(['root'])
    cache.read('a', () => ({ root: { flex: 1 } }))

    cache.clear()

    expect(cache.size).toBe(0)
  })
})

describe('cacheKey', () => {
  it('separates the two modes of one theme', () => {
    expect(light.id).toBe(dark.id)
    expect(cacheKey(light, {}, {})).not.toBe(cacheKey(dark, {}, {}))
  })

  it('does not depend on the order the axes were passed in', () => {
    const key = cacheKey(light, { variant: 'primary', size: 'md' }, {})

    expect(cacheKey(light, { size: 'md', variant: 'primary' }, {})).toBe(key)
  })

  it('marks an unset axis rather than dropping it', () => {
    expect(cacheKey(light, { size: undefined }, {})).not.toBe(
      cacheKey(light, {}, {})
    )
  })

  it('orders the active states, so two flags give one key', () => {
    const key = cacheKey(light, {}, { pressed: true, disabled: true })

    expect(cacheKey(light, {}, { disabled: true, pressed: true })).toBe(key)
    expect(key).toContain('pressed,disabled')
  })

  it('ignores an inactive state', () => {
    expect(cacheKey(light, {}, { pressed: false })).toBe(cacheKey(light, {}, {}))
  })
})
