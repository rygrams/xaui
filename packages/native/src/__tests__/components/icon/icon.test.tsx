import { describe, it, expect } from 'vitest'
import type { IconProps, IconVariant } from '../../../components/icon'

describe('Icon Types', () => {
  it('exports IconProps type with default values', () => {
    const props: IconProps = {}

    expect(props).toBeDefined()
  })

  it('accepts size prop', () => {
    const props: IconProps = {
      size: 32,
    }

    expect(props.size).toBe(32)
  })

  it('accepts color prop', () => {
    const props: IconProps = {
      color: '#FF0000',
    }

    expect(props.color).toBe('#FF0000')
  })

  it('accepts secondaryColor prop', () => {
    const props: IconProps = {
      secondaryColor: '#00FF00',
    }

    expect(props.secondaryColor).toBe('#00FF00')
  })

  it('accepts all variants', () => {
    const variants: IconVariant[] = [
      'thin',
      'stroke',
      'solid',
      'contrast',
      'duo-stroke',
      'duo-solid',
    ]

    variants.forEach(variant => {
      const props: IconProps = {
        variant,
      }
      expect(props.variant).toBe(variant)
    })
  })

  it('accepts all props together', () => {
    const props: IconProps = {
      size: 48,
      color: '#000000',
      secondaryColor: '#666666',
      variant: 'duo-solid',
      style: { opacity: 0.5 },
    }

    expect(props.size).toBe(48)
    expect(props.color).toBe('#000000')
    expect(props.secondaryColor).toBe('#666666')
    expect(props.variant).toBe('duo-solid')
    expect(props.style).toEqual({ opacity: 0.5 })
  })

  it('accepts style prop', () => {
    const props: IconProps = {
      style: { margin: 10 },
    }

    expect(props.style).toEqual({ margin: 10 })
  })
})
