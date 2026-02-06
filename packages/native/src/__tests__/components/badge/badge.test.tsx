import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Badge } from '../../../components/badge'

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
    borderWidth: { none: 0, xs: 0.5, sm: 1, md: 2, lg: 3, xl: 4 },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
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

describe('Badge', () => {
  it('should render content', () => {
    const { getByText } = render(<Badge content="9" />)
    expect(getByText('9')).toBeTruthy()
  })

  it('should render dot badge', () => {
    const { container } = render(<Badge isDot />)
    const badge = container.querySelector('div[role="text"]') as HTMLElement
    expect(badge).toBeTruthy()
  })

  it('should hide when invisible', () => {
    const { container } = render(<Badge isInvisible content="1" />)
    const badge = container.querySelector('div[role="text"]') as HTMLElement
    expect(badge).toBeNull()
  })

  it('should apply size styles', () => {
    const { container } = render(<Badge content="1" size="lg" />)
    const badge = container.querySelector('div[role="text"]') as HTMLElement
    expect(badge.style.height).toBe('24px')
  })
})
