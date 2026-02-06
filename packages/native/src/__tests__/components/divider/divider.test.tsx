import { describe, it, expect } from 'vitest'
import type { DividerProps } from '../../../components/divider'

describe('Divider Types', () => {
  it('exports DividerProps type', () => {
    const props: DividerProps = {
      size: 2,
      themeColor: 'primary',
      orientation: 'horizontal',
    }

    expect(props).toBeDefined()
    expect(props.size).toBe(2)
    expect(props.themeColor).toBe('primary')
    expect(props.orientation).toBe('horizontal')
  })

  it('accepts all theme colors', () => {
    const colors: Array<DividerProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(color => {
      const props: DividerProps = {
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all orientations', () => {
    const orientations: Array<DividerProps['orientation']> = [
      'horizontal',
      'vertical',
    ]

    orientations.forEach(orientation => {
      const props: DividerProps = {
        orientation,
      }
      expect(props.orientation).toBe(orientation)
    })
  })

  it('accepts custom color', () => {
    const props: DividerProps = {
      color: '#FF0000',
    }

    expect(props.color).toBe('#FF0000')
  })

  it('accepts size as number', () => {
    const props: DividerProps = {
      size: 5,
    }

    expect(props.size).toBe(5)
  })

  it('accepts all props together', () => {
    const props: DividerProps = {
      size: 3,
      themeColor: 'danger',
      color: '#00FF00',
      orientation: 'vertical',
    }

    expect(props.size).toBe(3)
    expect(props.themeColor).toBe('danger')
    expect(props.color).toBe('#00FF00')
    expect(props.orientation).toBe('vertical')
  })

  it('works with minimal props', () => {
    const props: DividerProps = {}

    expect(props).toBeDefined()
  })
})
