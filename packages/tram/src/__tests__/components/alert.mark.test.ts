import { describe, expect, it } from 'vitest'
import { alertMark, markDrawing } from '../../components/alert/alert.mark'

describe('markDrawing', () => {
  it('draws a line where the alert is already the colour', () => {
    expect(markDrawing('contained')).toBe('line')
  })

  it('fills the square on the soft slice and on the page', () => {
    expect(markDrawing('flat')).toBe('fill')
    expect(markDrawing('outline')).toBe('fill')
  })
})

describe('alertMark', () => {
  it('lines the square in the ink on a contained alert', () => {
    expect(alertMark('contained', '#E51400', undefined, '#FFFFFF')).toEqual({
      box: { borderColor: '#FFFFFF' },
      glyph: '#FFFFFF',
    })
  })

  it('fills it with the hue and cuts the glyph in the ink that reads on it', () => {
    expect(alertMark('flat', '#A4C400', undefined, '#000000')).toEqual({
      box: { backgroundColor: '#A4C400', borderColor: '#A4C400' },
      glyph: '#000000',
    })
    expect(alertMark('outline', '#1BA1E2', '#FFFFFF', '#1BA1E2').glyph).toBe(
      '#FFFFFF'
    )
  })
})
