import React from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ActivityIndicator } from '../../../components/indicator'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    colors: {
      primary: { main: '#1976d2', background: '#e3f2fd' },
      secondary: { main: '#9c27b0', background: '#f3e5f5' },
      tertiary: { main: '#00796b', background: '#e0f2f1' },
      danger: { main: '#d32f2f', background: '#ffebee' },
      warning: { main: '#f57c00', background: '#fff3e0' },
      success: { main: '#388e3c', background: '#e8f5e9' },
      default: { main: '#616161', background: '#f5f5f5' },
      background: '#ffffff',
    },
  }),
}))

describe('ActivityIndicator', () => {
  describe('Variant', () => {
    it('should render circular variant by default', () => {
      const { getByRole } = render(<ActivityIndicator />)
      const container = getByRole('progressbar')
      expect(container.style.width).toBe('40px')
      expect(container.style.height).toBe('40px')
    })

    it('should render circular variant when variant is circular', () => {
      const { getByRole } = render(<ActivityIndicator variant="circular" />)
      const container = getByRole('progressbar')
      expect(container.style.width).toBe('40px')
      expect(container.style.height).toBe('40px')
    })

    it('should render linear variant when variant is linear', () => {
      const { getByRole } = render(<ActivityIndicator variant="linear" />)
      const container = getByRole('progressbar')
      const track = container.firstChild as HTMLElement
      // The track in LinearActivityIndicator has width: 100%
      expect(track.style.width).toBe('100%')
    })
  })

  describe('Rendering', () => {
    it('should render with default size for circular', () => {
      const { getByRole } = render(<ActivityIndicator variant="circular" />)
      const container = getByRole('progressbar')
      expect(container.style.width).toBe('40px')
    })

    it('should render with custom size for circular', () => {
      const { getByRole } = render(<ActivityIndicator variant="circular" size={60} />)
      const container = getByRole('progressbar')
      expect(container.style.width).toBe('60px')
    })

    it('should render with default size for linear', () => {
      const { getByRole } = render(<ActivityIndicator variant="linear" />)
      const container = getByRole('progressbar')
      const track = container.firstChild as HTMLElement
      expect(track.style.height).toBe('4px')
    })

    it('should render with custom size for linear', () => {
      const { getByRole } = render(<ActivityIndicator variant="linear" size={8} />)
      const container = getByRole('progressbar')
      const track = container.firstChild as HTMLElement
      expect(track.style.height).toBe('8px')
    })
  })

  describe('Theme colors', () => {
    it('should apply primary theme color by default for circular', () => {
      const { getByRole } = render(<ActivityIndicator variant="circular" />)
      const container = getByRole('progressbar')
      const allDivs = Array.from(container.querySelectorAll('div'))
      // Find the line which has borderColor and is not transparent
      const line = allDivs.find(
        d => d.style.borderColor && d.style.borderColor !== 'transparent'
      )
      expect(line?.style.borderColor).toMatch(/rgb\(25, 118, 210\)|#1976d2/i)
    })

    it('should apply secondary theme color for circular', () => {
      const { getByRole } = render(
        <ActivityIndicator variant="circular" themeColor="secondary" />
      )
      const container = getByRole('progressbar')
      const allDivs = Array.from(container.querySelectorAll('div'))
      const line = allDivs.find(
        d => d.style.borderColor && d.style.borderColor !== 'transparent'
      )
      expect(line?.style.borderColor).toMatch(/rgb\(156, 39, 176\)|#9c27b0/i)
    })

    it('should apply primary theme color by default for linear', () => {
      const { getByRole } = render(<ActivityIndicator variant="linear" />)
      const container = getByRole('progressbar')
      const allDivs = Array.from(container.querySelectorAll('div'))
      // The bar has backgroundColor
      const bar = allDivs.find(
        d => d.style.backgroundColor && d.style.backgroundColor !== 'transparent'
      )
      expect(bar?.style.backgroundColor).toMatch(/rgb\(25, 118, 210\)|#1976d2/i)
    })

    it('should apply secondary theme color for linear', () => {
      const { getByRole } = render(
        <ActivityIndicator variant="linear" themeColor="secondary" />
      )
      const container = getByRole('progressbar')
      const allDivs = Array.from(container.querySelectorAll('div'))
      const bar = allDivs.find(
        d => d.style.backgroundColor && d.style.backgroundColor !== 'transparent'
      )
      expect(bar?.style.backgroundColor).toMatch(/rgb\(156, 39, 176\)|#9c27b0/i)
    })
  })

  describe('Custom colors', () => {
    it('should apply custom color for circular', () => {
      const { getByRole } = render(
        <ActivityIndicator variant="circular" color="#ff0000" />
      )
      const container = getByRole('progressbar')
      const allDivs = Array.from(container.querySelectorAll('div'))
      const line = allDivs.find(
        d => d.style.borderColor && d.style.borderColor !== 'transparent'
      )
      expect(line?.style.borderColor).toMatch(/rgb\(255, 0, 0\)|#ff0000/i)
    })

    it('should apply custom color for linear', () => {
      const { getByRole } = render(<ActivityIndicator variant="linear" color="#ff0000" />)
      const container = getByRole('progressbar')
      const allDivs = Array.from(container.querySelectorAll('div'))
      const bar = allDivs.find(
        d => d.style.backgroundColor && d.style.backgroundColor !== 'transparent'
      )
      expect(bar?.style.backgroundColor).toMatch(/rgb\(255, 0, 0\)|#ff0000/i)
    })

    it('should apply custom backgroundColor for circular', () => {
      const { getByRole } = render(
        <ActivityIndicator variant="circular" backgroundColor="#00ff00" />
      )
      const container = getByRole('progressbar')
      // The track is the first child of the circular indicator's container
      const track = container.firstChild?.firstChild as HTMLElement
      expect(track.style.borderColor).toMatch(/rgb\(0, 255, 0\)|#00ff00/i)
    })

    it('should apply custom backgroundColor for linear', () => {
      const { getByRole } = render(
        <ActivityIndicator variant="linear" backgroundColor="#00ff00" />
      )
      const container = getByRole('progressbar')
      const track = container.firstChild as HTMLElement
      expect(track.style.backgroundColor).toMatch(/rgb\(0, 255, 0\)|#00ff00/i)
    })
  })

  describe('Border radius', () => {
    it('should apply borderRadius for linear', () => {
      const { getByRole } = render(
        <ActivityIndicator variant="linear" borderRadius={5} />
      )
      const container = getByRole('progressbar')
      const track = container.firstChild as HTMLElement
      expect(track.style.borderRadius).toMatch(/5px|5/)

      const allDivs = Array.from(container.querySelectorAll('div'))
      const bar = allDivs.find(
        d => d.style.backgroundColor && d.style.backgroundColor !== 'transparent'
      )
      expect(bar?.style.borderRadius).toMatch(/5px|5/)
    })
  })

  describe('Accessibility', () => {
    it('should have progressbar role', () => {
      const { getByRole } = render(<ActivityIndicator />)
      expect(getByRole('progressbar')).toBeTruthy()
    })

    it('should have loading accessibility label', () => {
      const { getByLabelText } = render(<ActivityIndicator />)
      expect(getByLabelText('Loading')).toBeTruthy()
    })

    it('should have progressbar role for linear', () => {
      const { getByRole } = render(<ActivityIndicator variant="linear" />)
      expect(getByRole('progressbar')).toBeTruthy()
    })
  })
})
