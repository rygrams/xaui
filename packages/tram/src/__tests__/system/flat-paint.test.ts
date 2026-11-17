import { describe, expect, it } from 'vitest'
import { flatPaint } from '../../system/flat-paint'
import { tramAccents } from '../../theme/tram-tokens'

const RAW = '#7c3aed'

describe('flatPaint', () => {
  it("is nothing when no paint is named: the theme's accent", () => {
    expect(flatPaint({})).toBeUndefined()
  })

  it('resolves a named accent to its true colour', () => {
    expect(flatPaint({ accent: 'lime' })).toBe(tramAccents.lime)
  })

  it('lets a raw colour win over a named accent', () => {
    expect(flatPaint({ accent: 'lime', color: RAW })).toBe(RAW)
  })
})
