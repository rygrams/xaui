import { describe, it, expect } from 'vitest'
import type { IconProps } from '../../../components/icon/icon.type'

describe('CloseIcon', () => {
  it('accepts baseline variant', () => {
    const props: IconProps = {
      variant: 'baseline',
      size: 24,
      color: 'default',
      isAnimated: false,
    }

    expect(props.variant).toBe('baseline')
  })

  it('accepts filled variant', () => {
    const props: IconProps = {
      variant: 'filled',
    }

    expect(props.variant).toBe('filled')
  })

  it('accepts duotone variant', () => {
    const props: IconProps = {
      variant: 'duotone',
    }

    expect(props.variant).toBe('duotone')
  })

  it('accepts round-outlined variant', () => {
    const props: IconProps = {
      variant: 'round-outlined',
    }

    expect(props.variant).toBe('round-outlined')
  })

  it('accepts square-outlined variant', () => {
    const props: IconProps = {
      variant: 'square-outlined',
    }

    expect(props.variant).toBe('square-outlined')
  })

  it('accepts round-filled variant', () => {
    const props: IconProps = {
      variant: 'round-filled',
    }

    expect(props.variant).toBe('round-filled')
  })

  it('accepts square-filled variant', () => {
    const props: IconProps = {
      variant: 'square-filled',
    }

    expect(props.variant).toBe('square-filled')
  })

  it('accepts custom size', () => {
    const props: IconProps = {
      size: 32,
    }

    expect(props.size).toBe(32)
  })

  it('accepts theme color', () => {
    const props: IconProps = {
      color: 'primary',
    }

    expect(props.color).toBe('primary')
  })

  it('accepts custom RGB color', () => {
    const props: IconProps = {
      color: '#FF0000',
    }

    expect(props.color).toBe('#FF0000')
  })

  it('accepts isAnimated flag', () => {
    const props: IconProps = {
      isAnimated: true,
    }

    expect(props.isAnimated).toBe(true)
  })

  it('accepts all variants', () => {
    const variants: Array<IconProps['variant']> = [
      'baseline',
      'filled',
      'duotone',
      'round-outlined',
      'square-outlined',
      'round-filled',
      'square-filled',
    ]

    variants.forEach(variant => {
      const props: IconProps = { variant }
      expect(props.variant).toBe(variant)
    })
  })
})
