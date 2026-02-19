import { describe, it, expect } from 'vitest'
import type { AlertProps } from '../../../components/alert'

describe('Alert Types', () => {
  it('exports AlertProps type', () => {
    const props: AlertProps = {
      title: 'Title',
      description: 'Description',
      themeColor: 'primary',
      variant: 'solid',
      radius: 'md',
      isClosable: true,
      hideIcon: false,
      isVisible: true,
    }

    expect(props).toBeDefined()
    expect(props.title).toBe('Title')
    expect(props.themeColor).toBe('primary')
    expect(props.variant).toBe('solid')
  })

  it('accepts all theme colors', () => {
    const themeColors: Array<AlertProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    themeColors.forEach(themeColor => {
      const props: AlertProps = { themeColor }
      expect(props.themeColor).toBe(themeColor)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<AlertProps['variant']> = ['solid', 'bordered', 'flat', 'faded']

    variants.forEach(variant => {
      const props: AlertProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<AlertProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach(radius => {
      const props: AlertProps = { radius }
      expect(props.radius).toBe(radius)
    })
  })

  it('accepts events', () => {
    const props: AlertProps = {
      onClose: () => {},
      onVisibleChange: () => {},
    }

    expect(props.onClose).toBeDefined()
    expect(props.onVisibleChange).toBeDefined()
  })

  it('accepts customAppearance with CSS properties', () => {
    const props: AlertProps = {
      customAppearance: {
        container: { backgroundColor: 'red', padding: '8px' },
        title: { fontSize: 18, fontWeight: 'bold' },
        description: { fontSize: 14, opacity: 0.8 },
      },
    }

    expect(props.customAppearance?.container).toEqual({ backgroundColor: 'red', padding: '8px' })
    expect(props.customAppearance?.title).toEqual({ fontSize: 18, fontWeight: 'bold' })
    expect(props.customAppearance?.description).toEqual({ fontSize: 14, opacity: 0.8 })
  })
})
