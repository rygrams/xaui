import { describe, expect, it } from 'vitest'
import { tilePaints } from '../../../components/timeline/timeline.utils'

const DARK = {
  background: '#000000',
  foreground: '#FFFFFF',
  muted: '#A3A3A3',
  accent: '#1BA1E2',
  accentForeground: '#FFFFFF',
  success: '#60A917',
  successForeground: '#000000',
  warning: '#F0A30A',
  warningForeground: '#000000',
  danger: '#E51400',
  dangerForeground: '#FFFFFF',
}

describe('tilePaints', () => {
  it('fills a default tile with the accent, and reads it with onAccent', () => {
    expect(tilePaints(DARK).default).toEqual({ fill: '#1BA1E2', ink: '#FFFFFF' })
    expect(tilePaints({ ...DARK, accent: '#A4C400' }).default.ink).toBe('#000000')
  })

  it('draws the current tile in the ink, read in the ground', () => {
    expect(tilePaints(DARK).current).toEqual({ fill: '#FFFFFF', ink: '#000000' })
  })

  it('greys a muted tile with the faint fill', () => {
    expect(tilePaints(DARK).muted).toEqual({ fill: '#333333', ink: '#FFFFFF' })
    expect(tilePaints({ ...DARK, foreground: 'white' }).muted.fill).toBe('#A3A3A3')
  })

  it('keeps the outcome colours whatever the accent', () => {
    const paints = tilePaints({ ...DARK, accent: '#D80073' })
    expect(paints.success.fill).toBe('#60A917')
    expect(paints.warning).toEqual({ fill: '#F0A30A', ink: '#000000' })
    expect(paints.danger.ink).toBe('#FFFFFF')
  })

  it('keeps a raw colour it cannot measure, with the fallback ink', () => {
    expect(tilePaints({ ...DARK, accent: 'rebeccapurple' }).default).toEqual({
      fill: 'rebeccapurple',
      ink: '#FFFFFF',
    })
  })
})
