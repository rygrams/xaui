import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TextSpan, Typography } from '../../../components/typography'

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
    fontFamilies: {
      heading: 'System',
      body: 'System',
      mono: 'monospace',
    },
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
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

describe('TextSpan', () => {
  it('propagates align to nested Typography', () => {
    const { getByText } = render(
      <TextSpan align="right">
        <Typography>Texte aligne</Typography>
      </TextSpan>
    )

    const text = getByText('Texte aligne') as HTMLElement
    expect(text.style.textAlign).toBe('right')
  })

  it('allows nested Typography to override inherited align', () => {
    const { getByText } = render(
      <TextSpan align="right">
        <Typography align="left">Priorite locale</Typography>
      </TextSpan>
    )

    const text = getByText('Priorite locale') as HTMLElement
    expect(text.style.textAlign).toBe('left')
  })
})
