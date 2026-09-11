import { describe, expect, it } from 'vitest'
import { cacheKey, createStyleCache } from '../../../system/recipe/style-cache'
import { defaultTheme } from '../../../theme'

describe('createStyleCache', () => {
  it('returns stable style references for the same token key', () => {
    const cache = createStyleCache(['root', 'label'] as const)
    const key = cacheKey(defaultTheme.light, { variant: 'body' }, {})
    const first = cache.read(key, () => ({ root: { fontSize: 16 } }))
    const second = cache.read(key, () => ({ root: { fontSize: 18 } }))

    expect(second).toBe(first)
    expect(second.root).toBe(first.root)
    expect(second.label).toEqual({})
    expect(cache.size).toBe(1)
  })
})
