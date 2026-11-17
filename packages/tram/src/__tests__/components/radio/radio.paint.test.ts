import { describe, expect, it } from 'vitest'
import { dotTint } from '../../../components/radio/radio.paint'
import { tramAccents } from '../../../theme/tram-tokens'

const RAW = '#7c3aed'

describe('dotTint', () => {
  it("is nothing when neither the option nor its set names a paint: the theme's accent", () => {
    expect(dotTint({}, null, false)).toBeUndefined()
    expect(dotTint({}, {}, false)).toBeUndefined()
  })

  it('resolves a named accent to its true colour', () => {
    expect(dotTint({ accent: 'lime' }, null, false)).toBe(tramAccents.lime)
  })

  it('lets a raw colour win over a named accent', () => {
    expect(dotTint({ accent: 'lime', color: RAW }, null, false)).toBe(RAW)
  })

  it("falls back to the set's paint", () => {
    expect(dotTint({}, { accent: 'amber' }, false)).toBe(tramAccents.amber)
    expect(dotTint({}, { accent: 'amber', color: RAW }, false)).toBe(RAW)
  })

  it("lets the option's own paint win over its set's, whichever word each used", () => {
    expect(dotTint({ accent: 'lime' }, { color: RAW }, false)).toBe(tramAccents.lime)
    expect(dotTint({ color: RAW }, { accent: 'amber' }, false)).toBe(RAW)
  })

  it('paints nothing while invalid', () => {
    expect(
      dotTint({ accent: 'lime', color: RAW }, { accent: 'amber' }, true)
    ).toBeUndefined()
  })
})
