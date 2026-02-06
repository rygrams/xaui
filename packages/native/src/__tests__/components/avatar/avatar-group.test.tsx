import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Avatar, AvatarGroup } from '../../../components/avatar'

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
  }),
}))

describe('AvatarGroup', () => {
  it('should render max avatars and count', () => {
    const { getByText } = render(
      <AvatarGroup max={2} total={3}>
        <Avatar name="User One" />
        <Avatar name="User Two" />
        <Avatar name="User Three" />
      </AvatarGroup>
    )
    expect(getByText('+1')).toBeTruthy()
  })

  it('should render all avatars when below max', () => {
    const { queryByText, getByText } = render(
      <AvatarGroup max={3}>
        <Avatar name="User One" />
        <Avatar name="User Two" />
      </AvatarGroup>
    )
    expect(getByText('UO')).toBeTruthy()
    expect(getByText('UT')).toBeTruthy()
    expect(queryByText('+1')).toBeNull()
  })
})
