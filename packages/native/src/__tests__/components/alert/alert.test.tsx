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
    const colors: Array<AlertProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach(color => {
      const props: AlertProps = {
        themeColor: color,
      }
      expect(props.themeColor).toBe(color)
    })
  })

  it('accepts all variants', () => {
    const variants: Array<AlertProps['variant']> = [
      'solid',
      'bordered',
      'flat',
      'faded',
    ]

    variants.forEach(variant => {
      const props: AlertProps = {
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all radius options', () => {
    const radii: Array<AlertProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach(radius => {
      const props: AlertProps = {
        radius,
      }
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

  it('accepts customAppearance with style props', () => {
    const props: AlertProps = {
      customAppearance: {
        container: { backgroundColor: 'red' },
        title: { fontSize: 18 },
        description: { fontSize: 14 },
      },
    }

    expect(props.customAppearance?.container).toEqual({ backgroundColor: 'red' })
    expect(props.customAppearance?.title).toEqual({ fontSize: 18 })
    expect(props.customAppearance?.description).toEqual({ fontSize: 14 })
  })
})
