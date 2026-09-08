import { describe, expect, it } from 'vitest'
import { decoratorBox } from '../../utils/decorator-box'
import { defaultTheme } from '../../theme/create-theme'

describe('decoratorBox', () => {
  const theme = defaultTheme.light

  it('pins the decorator out of flow across the field', () => {
    const box = decoratorBox(theme)
    expect(box.position).toBe('absolute')
    expect(box.top).toBe(0)
    expect(box.bottom).toBe(0)
  })

  it('elevates one step above the field, so Android hit-tests the decorator first', () => {
    // An elevated `primary` field holds a native Z that `zIndex` does not outrank; the
    // decorator's elevation is what keeps the touch from reaching the field beneath it.
    expect(decoratorBox(theme).elevation).toBe(theme.shadows.field.elevation + 1)
  })
})
