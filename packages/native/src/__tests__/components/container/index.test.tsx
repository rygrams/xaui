import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { Container } from '../../../components/view/container'
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
      minHeight: 50,
      maxHeight: 300,
      aspectRatio: 16 / 9,
      flex: 1,
    }

    expect(props.width).toBe(200)
    expect(props.height).toBe('50%')
    expect(props.flex).toBe(1)
  })

  it('accepts spacing props', () => {
    const props: ContainerProps = {
      padding: 16,
      margin: { top: 8, horizontal: 16 },
    }

    expect(props.padding).toBe(16)
    expect(props.margin).toEqual({ top: 8, horizontal: 16 })
  })

  it('accepts visual props', () => {
    const props: ContainerProps = {
      color: '#ff0000',
      opacity: 0.8,
      clip: true,
    }

    expect(props.color).toBe('#ff0000')
    expect(props.opacity).toBe(0.8)
    expect(props.clip).toBe(true)
  })

  it('accepts border props', () => {
    const props: ContainerProps = {
      border: { width: 1, color: '#ccc', style: 'solid' },
      borderRadius: 12,
    }

    expect(props.border).toEqual({ width: 1, color: '#ccc', style: 'solid' })
    expect(props.borderRadius).toBe(12)
  })

  it('accepts shadow prop', () => {
    const props: ContainerProps = {
      shadow: { blur: 20, color: '#667eea', opacity: 0.4, offset: { x: 0, y: 8 } },
    }

    expect(props.shadow).toBeDefined()
    expect(props.shadow?.blur).toBe(20)
  })

  it('accepts interaction handlers', () => {
    const onPress = () => {}
    const props: ContainerProps = {
      onPress,
      onLongPress: () => {},
      onPressIn: () => {},
      onPressOut: () => {},
      disabled: false,
    }

    expect(props.onPress).toBe(onPress)
    expect(props.disabled).toBe(false)
  })

  it('accepts accessibility props', () => {
    const props: ContainerProps = {
      accessibilityLabel: 'card',
      accessibilityRole: 'button',
      accessible: true,
      testID: 'container-test',
    }

    expect(props.testID).toBe('container-test')
    expect(props.accessibilityRole).toBe('button')
  })
})

describe('Container rendering', () => {
  it('renders a div when no press handler is provided', () => {
    render(
      <Container testID="box">
        <></>
      </Container>
    )
    expect(screen.getByTestId('box').tagName).toBe('DIV')
  })

  it('renders a button when onPress is provided', () => {
    render(
      <Container testID="box" onPress={() => {}}>
        <></>
      </Container>
    )
    expect(screen.getByTestId('box').tagName).toBe('BUTTON')
  })

  it('renders a button when only onLongPress is provided', () => {
    render(
      <Container testID="box" onLongPress={() => {}}>
        <></>
      </Container>
    )
    expect(screen.getByTestId('box').tagName).toBe('BUTTON')
  })

  it('does not invoke onPress when disabled', () => {
    const onPress = vi.fn()
    render(
      <Container testID="box" onPress={onPress} disabled>
        <></>
      </Container>
    )
    fireEvent.click(screen.getByTestId('box'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('does not invoke onLongPress when disabled', () => {
    const onLongPress = vi.fn()
    render(
      <Container testID="box" onLongPress={onLongPress} disabled>
        <></>
      </Container>
    )
    fireEvent.click(screen.getByTestId('box'))
    expect(onLongPress).not.toHaveBeenCalled()
  })
})

describe('resolveEdgeInsets', () => {
  it('resolves number to padding shorthand', () => {
    expect(resolveEdgeInsets(16, 'padding')).toEqual({ padding: 16 })
    expect(resolveEdgeInsets(8, 'margin')).toEqual({ margin: 8 })
  })

  it('resolves object to individual padding sides', () => {
    const result = resolveEdgeInsets(
      { top: 8, bottom: 16, left: 4, right: 4 },
      'padding'
    )
    expect(result).toEqual({
      paddingTop: 8,
      paddingBottom: 16,
      paddingLeft: 4,
      paddingRight: 4,
    })
  })

  it('resolves horizontal and vertical shortcuts', () => {
    const result = resolveEdgeInsets({ horizontal: 16, vertical: 8 }, 'margin')
    expect(result).toEqual({ marginHorizontal: 16, marginVertical: 8 })
  })

  it('specific sides override horizontal/vertical', () => {
    const result = resolveEdgeInsets({ horizontal: 16, left: 8 }, 'padding')
    expect(result.paddingHorizontal).toBe(16)
    expect(result.paddingLeft).toBe(8)
  })
})

describe('resolveAlignment', () => {
  it('maps named alignments', () => {
    expect(resolveAlignment('center')).toEqual({
      justifyContent: 'center',
      alignItems: 'center',
    })
    expect(resolveAlignment('topLeft')).toEqual({
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    })
    expect(resolveAlignment('bottomRight')).toEqual({
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    })
  })

  it('maps x/y coordinate alignment', () => {
    expect(resolveAlignment({ x: 0, y: 0 })).toEqual({
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    })
    expect(resolveAlignment({ x: 0.5, y: 0.5 })).toEqual({
      justifyContent: 'center',
      alignItems: 'center',
    })
    expect(resolveAlignment({ x: 1, y: 1 })).toEqual({
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    })
  })
})

describe('resolveBorderRadius', () => {
  it('resolves number to uniform borderRadius', () => {
    expect(resolveBorderRadius(8)).toEqual({ borderRadius: 8 })
  })

  it('resolves per-corner object', () => {
    const result = resolveBorderRadius({ topLeft: 8, topRight: 16 })
    expect(result).toEqual({ borderTopLeftRadius: 8, borderTopRightRadius: 16 })
  })
})

describe('resolveBorder', () => {
  it('resolves uniform border side', () => {
    const result = resolveBorder({ width: 1, color: '#000', style: 'solid' })
    expect(result).toEqual({
      borderWidth: 1,
      borderColor: '#000',
      borderStyle: 'solid',
    })
  })

  it('resolves directional border', () => {
    const result = resolveBorder({ top: { width: 2, color: '#f00' } })
    expect(result).toEqual({ borderTopWidth: 2, borderTopColor: '#f00' })
  })
})

describe('resolveShadow', () => {
  it('resolves shadow with defaults', () => {
    const result = resolveShadow({})
    expect(result.shadowColor).toBe('#000000')
    expect(result.shadowOpacity).toBe(0.1)
    expect(result.shadowRadius).toBe(4)
    expect(result.elevation).toBe(2)
  })

  it('resolves shadow with custom values', () => {
    const result = resolveShadow({
      color: '#667eea',
      opacity: 0.4,
      blur: 20,
      offset: { x: 0, y: 8 },
      elevation: 8,
    })
    expect(result.shadowColor).toBe('#667eea')
    expect(result.shadowOpacity).toBe(0.4)
    expect(result.shadowRadius).toBe(20)
    expect(result.shadowOffset).toEqual({ width: 0, height: 8 })
    expect(result.elevation).toBe(8)
  })
})

describe('resolveTransform', () => {
  it('returns empty array when no transforms set', () => {
    expect(resolveTransform({})).toEqual([])
  })

  it('resolves scale transform', () => {
    const result = resolveTransform({ scale: 1.5 })
    expect(result).toContainEqual({ scale: 1.5 })
  })

  it('resolves multiple transforms in order', () => {
    const result = resolveTransform({ rotate: '45deg', translateX: 10, scale: 2 })
    expect(result[0]).toEqual({ rotate: '45deg' })
    expect(result[1]).toEqual({ scale: 2 })
    expect(result[2]).toEqual({ translateX: 10 })
  })
})
