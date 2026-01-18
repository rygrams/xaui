import { describe, it, expect } from 'vitest'
import type { DividerProps, ThemeColor } from '../divider-types'

describe('Divider props', () => {
  it('accepts theme colors', () => {
    const colors: Array<ThemeColor> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((themeColor) => {
      const props: DividerProps = {
        themeColor,
      }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts layout props', () => {
    const props: DividerProps = {
      orientation: 'vertical',
      thickness: 2,
      length: 120,
      indent: 8,
      endIndent: 12,
      color: '#444444',
    }

    expect(props.orientation).toBe('vertical')
    expect(props.thickness).toBe(2)
    expect(props.length).toBe(120)
    expect(props.indent).toBe(8)
    expect(props.endIndent).toBe(12)
    expect(props.color).toBe('#444444')
  })
})
