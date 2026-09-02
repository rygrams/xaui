import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { mergeRefs } from '../../../system/slot/merge-refs'

describe('mergeRefs', () => {
  it('feeds object refs and callback refs alike', () => {
    const object = createRef<string>()
    const callback = vi.fn()

    mergeRefs<string>(object, callback)('node')

    expect(object.current).toBe('node')
    expect(callback).toHaveBeenCalledWith('node')
  })

  it('skips the refs that were never passed', () => {
    const object = createRef<string>()

    expect(() => mergeRefs<string>(undefined, object, null)('node')).not.toThrow()
    expect(object.current).toBe('node')
  })

  it('forwards the null React sends on unmount', () => {
    const object = createRef<string>()
    const merged = mergeRefs<string>(object)

    merged('node')
    merged(null)

    expect(object.current).toBeNull()
  })

  it('returns nothing, so React 19 does not read a cleanup where React 18 sees none', () => {
    expect(mergeRefs<string>(vi.fn(() => 'not a cleanup'))('node')).toBeUndefined()
  })
})
