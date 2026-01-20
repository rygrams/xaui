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
  describe('Variant', () => {
    it('should render linear progress by default', () => {
      const { container } = render(<Progress value={0.5} />)
      const svg = (container as HTMLElement).querySelector('svg')
      expect(svg).toBeNull()
    })

    it('should render circular progress when variant is circular', () => {
      const { container } = render(<Progress variant="circular" value={0.5} />)
      const svg = (container as HTMLElement).querySelector('svg')
      const circles = (container as HTMLElement).querySelectorAll('circle')
      expect(svg).toBeTruthy()
      expect(circles).toHaveLength(2)
    })
  })

  describe('Theme colors', () => {
    it('should apply secondary theme color for circular variant', () => {
      const { container } = render(<Progress variant="circular" themeColor="secondary" value={0.5} />)
      const circles = (container as HTMLElement).querySelectorAll('circle')
      const progressCircle = circles[1]
      expect(progressCircle.getAttribute('stroke')).toBe('#9c27b0')
    })

    it('should apply success theme color for circular variant', () => {
      const { container } = render(<Progress variant="circular" themeColor="success" value={0.5} />)
      const circles = (container as HTMLElement).querySelectorAll('circle')
      const progressCircle = circles[1]
      expect(progressCircle.getAttribute('stroke')).toBe('#388e3c')
    })
  })

  describe('Custom colors', () => {
    it('should apply custom color for circular variant', () => {
      const { container } = render(<Progress variant="circular" value={0.5} color="#ff0000" />)
      const circles = (container as HTMLElement).querySelectorAll('circle')
      const progressCircle = circles[1]
      expect(progressCircle.getAttribute('stroke')).toBe('#ff0000')
    })

    it('should apply custom backgroundColor for circular variant', () => {
      const { container } = render(<Progress variant="circular" value={0.5} backgroundColor="#00ff00" />)
      const circles = (container as HTMLElement).querySelectorAll('circle')
      const trackCircle = circles[0]
      expect(trackCircle.getAttribute('stroke')).toBe('#00ff00')
    })
  })

  describe('Size', () => {
    it('should apply custom size for circular progress', () => {
      const { container } = render(<Progress variant="circular" value={0.5} size={60} />)
      const svg = (container as HTMLElement).querySelector('svg')
      expect(svg?.getAttribute('width')).toBe('60')
      expect(svg?.getAttribute('height')).toBe('60')
    })
  })

  describe('Border radius', () => {
    it('should apply rounded stroke cap when borderRadius is provided for circular', () => {
      const { container } = render(<Progress variant="circular" value={0.5} borderRadius={5} />)
      const circles = (container as HTMLElement).querySelectorAll('circle')
      const progressCircle = circles[1]
      expect(progressCircle.getAttribute('stroke-linecap')).toBe('round')
    })

    it('should apply butt stroke cap when no borderRadius for circular', () => {
      const { container } = render(<Progress variant="circular" value={0.5} />)
      const circles = (container as HTMLElement).querySelectorAll('circle')
      const progressCircle = circles[1]
      expect(progressCircle.getAttribute('stroke-linecap')).toBe('butt')
    })
  })

  describe('Edge cases', () => {
    it('should render without errors', () => {
      const { container } = render(<Progress value={0.5} />)
      expect(container).toBeTruthy()
    })
  })
})
