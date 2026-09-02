import { describe, it, expect } from 'vitest'
import type { RoundedViewProps } from '../../../../components/view/rounded-view/rounded-view.type'

describe('RoundedView Props', () => {
  it('should handle all corners with all prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      all: 16,
    }

    expect(props.all).toBe(16)
  })

  it('should handle top corners with top prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      top: 20,
    }

    expect(props.top).toBe(20)
  })

  it('should handle bottom corners with bottom prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      bottom: 12,
    }

    expect(props.bottom).toBe(12)
  })

  it('should handle left corners with left prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      left: 8,
    }

    expect(props.left).toBe(8)
  })

  it('should handle right corners with right prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      right: 24,
    }

    expect(props.right).toBe(24)
  })

  it('should handle individual corner with topLeft prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      topLeft: 10,
    }

    expect(props.topLeft).toBe(10)
  })

  it('should handle individual corner with topRight prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      topRight: 15,
    }

    expect(props.topRight).toBe(15)
  })

  it('should handle individual corner with bottomLeft prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      bottomLeft: 18,
    }

    expect(props.bottomLeft).toBe(18)
  })

  it('should handle individual corner with bottomRight prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      bottomRight: 22,
    }

    expect(props.bottomRight).toBe(22)
  })

  it('should handle fullWidth prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      all: 16,
      fullWidth: true,
    }

    expect(props.fullWidth).toBe(true)
  })

  it('should handle backgroundColor prop', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      all: 16,
      backgroundColor: '#FF0000',
    }

    expect(props.backgroundColor).toBe('#FF0000')
  })

  it('should handle combination of props', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      top: 20,
      bottom: 10,
      fullWidth: true,
    }

    expect(props.top).toBe(20)
    expect(props.bottom).toBe(10)
    expect(props.fullWidth).toBe(true)
  })

  it('should handle specific corners overriding general props', () => {
    const props: RoundedViewProps = {
      children: 'Test',
      all: 16,
      topLeft: 0,
      bottomRight: 32,
    }

    expect(props.all).toBe(16)
    expect(props.topLeft).toBe(0)
    expect(props.bottomRight).toBe(32)
  })

  it('should handle custom style prop', () => {
    const customStyle = { padding: 10, margin: 5 }
    const props: RoundedViewProps = {
      children: 'Test',
      all: 16,
      style: customStyle,
    }

    expect(props.style).toBe(customStyle)
  })
})
