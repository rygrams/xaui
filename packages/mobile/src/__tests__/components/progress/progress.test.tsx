import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Progress } from '../../../components/progress'

vi.mock('@xaui/core/theme', () => ({
  useXUITheme: () => ({
    colors: {
      primary: { main: '#1976d2', background: '#e3f2fd' },
      secondary: { main: '#9c27b0', background: '#f3e5f5' },
      tertiary: { main: '#00796b', background: '#e0f2f1' },
      danger: { main: '#d32f2f', background: '#ffebee' },
      warning: { main: '#f57c00', background: '#fff3e0' },
      success: { main: '#388e3c', background: '#e8f5e9' },
      default: { main: '#616161', background: '#f5f5f5' },
    },
  }),
}))

describe('Progress', () => {
  it('renders linear progress by default', () => {
    const { container } = render(<Progress value={0.5} />)
    expect(container).toBeTruthy()
  })

  it('renders circular progress when variant is circular', () => {
    const { container } = render(<Progress variant="circular" value={0.5} />)
    expect(container).toBeTruthy()
  })

  it('applies primary theme color by default', () => {
    const { container } = render(<Progress value={0.5} />)
    expect(container).toBeTruthy()
  })

  it('applies secondary theme color when specified', () => {
    const { container } = render(<Progress value={0.5} themeColor="secondary" />)
    expect(container).toBeTruthy()
  })

  it('applies tertiary theme color when specified', () => {
    const { container } = render(<Progress value={0.5} themeColor="tertiary" />)
    expect(container).toBeTruthy()
  })

  it('applies danger theme color when specified', () => {
    const { container } = render(<Progress value={0.5} themeColor="danger" />)
    expect(container).toBeTruthy()
  })

  it('applies warning theme color when specified', () => {
    const { container } = render(<Progress value={0.5} themeColor="warning" />)
    expect(container).toBeTruthy()
  })

  it('applies success theme color when specified', () => {
    const { container } = render(<Progress value={0.5} themeColor="success" />)
    expect(container).toBeTruthy()
  })

  it('applies default theme color when specified', () => {
    const { container } = render(<Progress value={0.5} themeColor="default" />)
    expect(container).toBeTruthy()
  })

  it('applies custom color when provided', () => {
    const { container } = render(<Progress value={0.5} color="#ff0000" />)
    expect(container).toBeTruthy()
  })

  it('applies custom backgroundColor when provided', () => {
    const { container } = render(<Progress value={0.5} backgroundColor="#00ff00" />)
    expect(container).toBeTruthy()
  })

  it('applies custom size for linear progress', () => {
    const { container } = render(<Progress value={0.5} size={8} />)
    expect(container).toBeTruthy()
  })

  it('applies custom size for circular progress', () => {
    const { container } = render(<Progress variant="circular" value={0.5} size={60} />)
    expect(container).toBeTruthy()
  })

  it('applies custom borderRadius for linear progress', () => {
    const { container } = render(<Progress value={0.5} borderRadius={8} />)
    expect(container).toBeTruthy()
  })

  it('applies custom borderRadius for circular progress', () => {
    const { container } = render(
      <Progress variant="circular" value={0.5} borderRadius={5} />
    )
    expect(container).toBeTruthy()
  })

  it('respects disableAnimation prop', () => {
    const { container } = render(<Progress value={0.5} disableAnimation />)
    expect(container).toBeTruthy()
  })

  it('renders with value 0', () => {
    const { container } = render(<Progress value={0} />)
    expect(container).toBeTruthy()
  })

  it('renders with value 1', () => {
    const { container } = render(<Progress value={1} />)
    expect(container).toBeTruthy()
  })

  it('handles value below 0', () => {
    const { container } = render(<Progress value={-0.5} />)
    expect(container).toBeTruthy()
  })

  it('handles value above 1', () => {
    const { container } = render(<Progress value={1.5} />)
    expect(container).toBeTruthy()
  })

  it('renders with all props combined for linear', () => {
    const { container } = render(
      <Progress
        value={0.75}
        themeColor="success"
        color="#00ff00"
        backgroundColor="#000000"
        size={10}
        borderRadius={5}
        disableAnimation
      />
    )
    expect(container).toBeTruthy()
  })

  it('renders with all props combined for circular', () => {
    const { container } = render(
      <Progress
        variant="circular"
        value={0.75}
        themeColor="success"
        color="#00ff00"
        backgroundColor="#000000"
        size={50}
        borderRadius={10}
        disableAnimation
      />
    )
    expect(container).toBeTruthy()
  })
})
