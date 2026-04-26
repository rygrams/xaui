import { describe, it, expect } from 'vitest'
import type { ContainerProps } from '../../../components/view/container'
import {
  resolveEdgeInsets,
  resolveAlignment,
  resolveBorderRadius,
  resolveBorder,
  resolveShadow,
  resolveTransform,
} from '../../../components/view/container/container.utils'

describe('ContainerProps types', () => {
  it('accepts dimension props', () => {
    const props: ContainerProps = {
      width: 200,
      height: '50%',
      minWidth: 100,
      maxWidth: 400,
      flex: 1,
    }

    expect(props.width).toBe(200)
    expect(props.flex).toBe(1)
  })

  it('accepts visual props', () => {
    const props: ContainerProps = {
      color: '#ff0000',
      opacity: 0.8,
      clip: true,
      className: 'my-container',
    }

    expect(props.color).toBe('#ff0000')
    expect(props.opacity).toBe(0.8)
    expect(props.className).toBe('my-container')
  })

  it('accepts interaction handlers', () => {
    const onPress = () => {}
    const props: ContainerProps = {
      onPress,
      disabled: false,
      ariaLabel: 'click me',
      role: 'button',
    }

    expect(props.onPress).toBe(onPress)
    expect(props.ariaLabel).toBe('click me')
  })
})

describe('resolveEdgeInsets', () => {
  it('resolves number to padding shorthand', () => {
    expect(resolveEdgeInsets(16, 'padding')).toEqual({ padding: 16 })
    expect(resolveEdgeInsets(8, 'margin')).toEqual({ margin: 8 })
  })

  it('resolves object with horizontal/vertical shortcuts', () => {
    const result = resolveEdgeInsets({ horizontal: 16, vertical: 8 }, 'padding')
    expect(result.paddingLeft).toBe(16)
    expect(result.paddingRight).toBe(16)
    expect(result.paddingTop).toBe(8)
    expect(result.paddingBottom).toBe(8)
  })

  it('specific sides override shortcuts', () => {
    const result = resolveEdgeInsets({ horizontal: 16, left: 8 }, 'padding')
    expect(result.paddingLeft).toBe(8)
    expect(result.paddingRight).toBe(16)
  })
})

describe('resolveAlignment', () => {
  it('maps named alignments with display flex', () => {
    const result = resolveAlignment('center')
    expect(result.display).toBe('flex')
    expect(result.justifyContent).toBe('center')
    expect(result.alignItems).toBe('center')
  })

  it('maps topRight alignment', () => {
    const result = resolveAlignment('topRight')
    expect(result.justifyContent).toBe('flex-start')
    expect(result.alignItems).toBe('flex-end')
  })

  it('maps coordinate alignment', () => {
    const result = resolveAlignment({ x: 1, y: 0 })
    expect(result.justifyContent).toBe('flex-start')
    expect(result.alignItems).toBe('flex-end')
  })
})

describe('resolveBorderRadius', () => {
  it('resolves number to uniform border-radius', () => {
    expect(resolveBorderRadius(12)).toEqual({ borderRadius: 12 })
  })

  it('resolves per-corner object', () => {
    const result = resolveBorderRadius({ topLeft: 24, topRight: 24 })
    expect(result.borderTopLeftRadius).toBe(24)
    expect(result.borderTopRightRadius).toBe(24)
  })
})

describe('resolveBorder', () => {
  it('resolves uniform border', () => {
    const result = resolveBorder({ width: 1, color: '#ccc', style: 'solid' })
    expect(result).toEqual({ borderWidth: 1, borderColor: '#ccc', borderStyle: 'solid' })
  })

  it('resolves directional border with per-side styles', () => {
    const result = resolveBorder({
      top: { width: 2, color: '#f00', style: 'dashed' },
    })
    expect(result.borderTopWidth).toBe(2)
    expect(result.borderTopColor).toBe('#f00')
    expect(result.borderTopStyle).toBe('dashed')
  })
})

describe('resolveShadow', () => {
  it('builds a box-shadow string', () => {
    const result = resolveShadow({ color: '#667eea', blur: 20, opacity: 0.4, offset: { x: 0, y: 8 } })
    expect(result.boxShadow).toContain('0px 8px 20px')
    expect(result.boxShadow).toContain('#667eea')
  })

  it('uses defaults for missing values', () => {
    const result = resolveShadow({})
    expect(result.boxShadow).toBeDefined()
    expect(result.boxShadow).toContain('rgba(0, 0, 0, 0.1)')
  })
})

describe('resolveTransform', () => {
  it('returns empty object when no transforms', () => {
    expect(resolveTransform({})).toEqual({})
  })

  it('builds CSS transform string', () => {
    const result = resolveTransform({ scale: 1.5, rotate: '45deg' })
    expect(result.transform).toContain('scale(1.5)')
    expect(result.transform).toContain('rotate(45deg)')
  })

  it('includes translate with px unit', () => {
    const result = resolveTransform({ translateX: 10, translateY: -5 })
    expect(result.transform).toContain('translateX(10px)')
    expect(result.transform).toContain('translateY(-5px)')
  })
})
