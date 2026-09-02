import { describe, it, expect } from 'vitest'
import type {
  AlertProps,
  AlertVariant,
} from '../../../components/alert/alert.type'
import type { ThemeColor } from '../../../types'

describe('AlertProps types', () => {
  it('accepts all theme colors', () => {
    const colors: ThemeColor[] = [
      'default',
      'primary',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'danger',
    ]
    colors.forEach(color => {
      const _props: AlertProps = { themeColor: color }
      expect(_props.themeColor).toBeDefined()
    })
  })

  it('accepts all variants', () => {
    const variants: AlertVariant[] = ['solid', 'bordered', 'flat', 'faded']
    variants.forEach(variant => {
      const _props: AlertProps = { variant }
      expect(_props.variant).toBeDefined()
    })
  })

  it('accepts a numeric radius', () => {
    const _props: AlertProps = { radius: 12 }
    expect(_props.radius).toBe(12)
  })

  it('accepts event callbacks', () => {
    const _props: AlertProps = {
      onClose: () => {},
      onVisibleChange: (_v: boolean) => {},
    }
    expect(typeof _props.onClose).toBe('function')
    expect(typeof _props.onVisibleChange).toBe('function')
  })

  it('accepts style overrides', () => {
    const _props: AlertProps = {
      style: { backgroundColor: 'red' },
      titleStyle: { color: 'blue' },
      descriptionStyle: { fontSize: 14 },
    }
    expect(_props.style?.backgroundColor).toBe('red')
    expect(_props.titleStyle?.color).toBe('blue')
  })

  it('accepts full props', () => {
    const _props: AlertProps = {
      title: 'Title',
      description: 'Description',
      themeColor: 'success',
      variant: 'solid',
      radius: 'lg',
      isClosable: true,
      isVisible: true,
      testID: 'my-alert',
      style: { marginTop: 8 },
    }
    expect(_props.title).toBe('Title')
  })
})
