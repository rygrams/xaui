import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Avatar } from '../../../components/avatar'

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
    borderRadius: { none: 0, sm: 4, md: 8, lg: 12, xl: 16, '2xl': 24, '3xl': 32, full: 9999 },
    borderWidth: { none: 0, xs: 0.5, sm: 1, md: 2, lg: 3, xl: 4 },
    fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36 },
  }),
}))

describe('Avatar', () => {
  it('should render default size', () => {
    const { getByRole } = render(<Avatar name="John Doe" />)
    const container = getByRole('image')
    expect(container.style.width).toBe('40px')
    expect(container.style.height).toBe('40px')
  })

  it('should render custom size', () => {
    const { getByRole } = render(<Avatar name="John Doe" size={64} />)
    const container = getByRole('image')
    expect(container.style.width).toBe('64px')
    expect(container.style.height).toBe('64px')
  })

  it('should render initials when no image', () => {
    const { getByText } = render(<Avatar name="John Doe" />)
    expect(getByText('JD')).toBeTruthy()
  })

  it('should use custom initials', () => {
    const { getByText } = render(
      <Avatar name="John Doe" getInitials={() => 'XD'} />
    )
    expect(getByText('XD')).toBeTruthy()
  })

  it('should apply border when bordered', () => {
    const { getByRole } = render(<Avatar name="John Doe" isBordered />)
    const container = getByRole('image')
    expect(container.style.borderWidth).toMatch(/1px|1/)
  })

  it('should apply theme background color', () => {
    const { getByRole } = render(<Avatar name="John Doe" themeColor="primary" />)
    const container = getByRole('image')
    expect(container.style.backgroundColor).toMatch(/rgb\(227, 242, 253\)|#e3f2fd/i)
  })
})
