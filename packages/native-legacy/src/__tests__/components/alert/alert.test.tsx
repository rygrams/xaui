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

  it('accepts a numeric radius', () => {
    const props: AlertProps = { radius: 12 }
    expect(props.radius).toBe(12)
  })

  it('accepts events', () => {
    const props: AlertProps = {
      onClose: () => {},
      onVisibleChange: () => {},
    }

    expect(props.onClose).toBeDefined()
    expect(props.onVisibleChange).toBeDefined()
  })

  it('accepts style overrides', () => {
    const props: AlertProps = {
      style: { backgroundColor: 'red' },
      titleStyle: { fontSize: 18 },
      descriptionStyle: { fontSize: 14 },
    }

    expect(props.style).toEqual({ backgroundColor: 'red' })
    expect(props.titleStyle).toEqual({ fontSize: 18 })
    expect(props.descriptionStyle).toEqual({ fontSize: 14 })
  })
})
