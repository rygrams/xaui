import { describe, expect, it } from 'vitest'
import { pressedColors } from '../../../components/button/button.pressed'

const dark = { colors: { foreground: '#FFFFFF', muted: '#A3A3A3' } } as Parameters<
  typeof pressedColors
>[0]
const light = { colors: { foreground: '#000000', muted: '#666666' } } as Parameters<
  typeof pressedColors
>[0]

describe('pressedColors', () => {
  it('inverts a fill to the ground ink, in both modes', () => {
    const filled = { bg: '#1BA1E2', border: '#1BA1E2', fg: '#FFFFFF' }

    expect(pressedColors(dark, filled)).toEqual({ fill: '#FFFFFF', ink: '#000000' })
    expect(pressedColors(light, filled)).toEqual({ fill: '#000000', ink: '#FFFFFF' })
  })

  it('fills an outline with its own colour and picks the ink that reads on it', () => {
    const cyan = { border: '#1BA1E2', fg: '#1BA1E2', bgPressed: '#1BA1E2' }
    const lime = { border: '#A4C400', fg: '#A4C400', bgPressed: '#A4C400' }

    expect(pressedColors(dark, cyan)).toEqual({ fill: '#1BA1E2', ink: '#FFFFFF' })
    expect(pressedColors(dark, lime)).toEqual({ fill: '#A4C400', ink: '#000000' })
  })

  it('greys the label of a button that has no box to fill', () => {
    expect(pressedColors(dark, { fg: '#1BA1E2' })).toEqual({ ink: '#A3A3A3' })
  })
})
