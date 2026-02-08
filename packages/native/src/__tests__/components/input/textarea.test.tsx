import { describe, it, expect } from 'vitest'
import type { TextAreaProps } from '../../../components/input'

describe('TextArea Types', () => {
  it('exports TextAreaProps type', () => {
    const props: TextAreaProps = {
      label: 'Notes',
      value: 'hello',
      minRows: 4,
      maxRows: 8,
      variant: 'bordered',
      themeColor: 'primary',
    }

    expect(props).toBeDefined()
    expect(props.label).toBe('Notes')
    expect(props.minRows).toBe(4)
    expect(props.maxRows).toBe(8)
  })

  it('accepts all variants', () => {
    const variants: Array<TextAreaProps['variant']> = [
      'flat',
      'faded',
      'bordered',
      'underlined',
    ]

    variants.forEach(variant => {
      const props: TextAreaProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all theme colors', () => {
    const themeColors: TextAreaProps['themeColor'][] = [
      'default',
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
    ]

    themeColors.forEach(themeColor => {
      const props: TextAreaProps = { themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })
})
