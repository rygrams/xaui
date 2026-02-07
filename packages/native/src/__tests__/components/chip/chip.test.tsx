import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Chip } from '../../../components/chip'
import type { ChipProps } from '../../../components/chip'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: { main: '#1976d2', foreground: '#ffffff', background: '#e3f2fd' },
      secondary: { main: '#9c27b0', foreground: '#ffffff', background: '#f3e5f5' },
      tertiary: { main: '#00796b', foreground: '#ffffff', background: '#e0f2f1' },
      danger: { main: '#d32f2f', foreground: '#ffffff', background: '#ffebee' },
      warning: { main: '#f57c00', foreground: '#000000', background: '#fff3e0' },
      success: { main: '#388e3c', foreground: '#ffffff', background: '#e8f5e9' },
      default: { main: '#ffffff', foreground: '#111827', background: '#f5f5f5' },
      background: '#ffffff',
      foreground: '#111827',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 24,
      '3xl': 32,
      full: 9999,
    },
    shadows: {
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1,
        elevation: 1,
      },
    },
  }),
}))

describe('Chip', () => {
  it('should render children text', () => {
    const { getByText } = render(<Chip>Hello</Chip>)
    expect(getByText('Hello')).toBeTruthy()
  })

  it('should render with default props', () => {
    const { container } = render(<Chip>Default</Chip>)
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip).toBeTruthy()
    expect(chip.style.height).toBe('40px')
  })

  it('should apply size sm', () => {
    const { container } = render(<Chip size="sm">Small</Chip>)
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.height).toBe('32px')
  })

  it('should apply size lg', () => {
    const { container } = render(<Chip size="lg">Large</Chip>)
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.height).toBe('44px')
  })

  it('should apply bordered variant border width', () => {
    const { container } = render(
      <Chip variant="bordered" themeColor="primary">
        Bordered
      </Chip>,
    )
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.borderWidth).toBe('2px')
  })

  it('should render dot variant with dot element', () => {
    const { container } = render(
      <Chip variant="dot" themeColor="primary">
        Dot
      </Chip>,
    )
    const dots = container.querySelectorAll('div')
    const dotElements = Array.from(dots).filter(
      (el) => (el as HTMLElement).style.borderRadius === '9999px',
    )
    expect(dotElements.length).toBeGreaterThan(0)
  })

  it('should apply radius full', () => {
    const { container } = render(<Chip radius="full">Full</Chip>)
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.borderRadius).toBe('20px')
  })

  it('should apply radius lg', () => {
    const { container } = render(<Chip radius="lg">LargeR</Chip>)
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.borderRadius).toBe('12px')
  })

  it('should render close indicator when onClose provided', () => {
    const onClose = vi.fn()
    const { getByText } = render(<Chip onClose={onClose}>Closable</Chip>)
    expect(getByText('✕')).toBeTruthy()
  })

  it('should not render close indicator without onClose', () => {
    const { queryByText } = render(<Chip>NoClose</Chip>)
    expect(queryByText('✕')).toBeNull()
  })

  it('should apply disabled styles', () => {
    const { container } = render(<Chip isDisabled>Disabled</Chip>)
    const chip = container.querySelector('div[role="text"]') as HTMLElement
    expect(chip.style.opacity).toBe('0.5')
  })

  it('should render avatar content', () => {
    const { getByText } = render(
      <Chip avatar={<span>AV</span>}>WithAvatar</Chip>,
    )
    expect(getByText('AV')).toBeTruthy()
    expect(getByText('WithAvatar')).toBeTruthy()
  })

  it('should render startContent', () => {
    const { getByText } = render(
      <Chip startContent={<span>Start</span>}>Content</Chip>,
    )
    expect(getByText('Start')).toBeTruthy()
  })

  it('should render endContent', () => {
    const { getByText } = render(
      <Chip endContent={<span>End</span>}>Content</Chip>,
    )
    expect(getByText('End')).toBeTruthy()
  })

  it('should wrap in pressable button when onPress provided', () => {
    const onPress = vi.fn()
    const { container } = render(<Chip onPress={onPress}>Clickable</Chip>)
    const button = container.querySelector('button')
    expect(button).toBeTruthy()
  })

  it('should wrap in pressable button when onClose provided', () => {
    const onClose = vi.fn()
    const { container } = render(<Chip onClose={onClose}>Closable</Chip>)
    const button = container.querySelector('button')
    expect(button).toBeTruthy()
  })

  it('should not wrap in pressable without onPress', () => {
    const { container } = render(<Chip>Static</Chip>)
    const button = container.querySelector('button')
    expect(button).toBeNull()
  })

  it('should accept all variants', () => {
    const variants: Array<ChipProps['variant']> = [
      'solid',
      'bordered',
      'light',
      'flat',
      'faded',
      'shadow',
      'dot',
    ]

    variants.forEach((variant) => {
      const props: ChipProps = { children: 'Test', variant }
      expect(props.variant).toBe(variant)
    })
  })

  it('should accept all theme colors', () => {
    const colors: Array<ChipProps['themeColor']> = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'success',
      'default',
    ]

    colors.forEach((color) => {
      const props: ChipProps = { children: 'Test', themeColor: color }
      expect(props.themeColor).toBe(color)
    })
  })

  it('should accept all sizes', () => {
    const sizes: Array<ChipProps['size']> = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const props: ChipProps = { children: 'Test', size }
      expect(props.size).toBe(size)
    })
  })

  it('should accept all radius options', () => {
    const radii: Array<ChipProps['radius']> = ['none', 'sm', 'md', 'lg', 'full']

    radii.forEach((radius) => {
      const props: ChipProps = { children: 'Test', radius }
      expect(props.radius).toBe(radius)
    })
  })

  it('should accept event handlers', () => {
    const props: ChipProps = {
      children: 'Test',
      onClose: () => {},
      onPress: () => {},
    }

    expect(props.onClose).toBeDefined()
    expect(props.onPress).toBeDefined()
  })
})
