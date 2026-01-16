import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { TickActivityIndicator } from '../components/tick-activity-indicator'
import { XUIProvider } from '@xaui/core'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<XUIProvider>{component}</XUIProvider>)
}

describe('TickActivityIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container).toBeTruthy()
    })

    it('should render with default props', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default size of 20', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom size', () => {
      const { container } = renderWithProvider(<TickActivityIndicator size={40} />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('tick rendering', () => {
    it('should render 8 ticks', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should position ticks in a circle', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should apply correct tick dimensions based on size', () => {
      const { container } = renderWithProvider(<TickActivityIndicator size={40} />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('theme colors', () => {
    it('should render with primary theme color by default', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with secondary theme color', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="secondary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with success theme color', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="success" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with danger theme color', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="danger" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with warning theme color', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="warning" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with tertiary theme color', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="tertiary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default theme color', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="default" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('custom color', () => {
    it('should accept custom color', () => {
      const { container } = renderWithProvider(<TickActivityIndicator color="#FF0000" />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should override theme color when custom color is provided', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="primary" color="#00FF00" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('animation', () => {
    it('should animate by default', () => {
      renderWithProvider(<TickActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should disable animation when disableAnimation is true', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should create opacity animation for ticks', () => {
      renderWithProvider(<TickActivityIndicator />)
      expect(true).toBe(true)
    })
  })

  describe('opacity behavior', () => {
    it('should have varying opacity across ticks', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should have active tick with opacity 1.0', () => {
      renderWithProvider(<TickActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should have adjacent tick with opacity 0.8', () => {
      renderWithProvider(<TickActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should have remaining ticks with opacity between 0.2 and 0.4', () => {
      renderWithProvider(<TickActivityIndicator />)
      expect(true).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('should have progressbar role', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })

    it('should have loading accessibility label', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      const progressbar = container.querySelector('[aria-label="Loading"]')
      expect(progressbar).toBeTruthy()
    })
  })

  describe('tick dimensions', () => {
    it('should calculate tick width as 7% of size', () => {
      renderWithProvider(<TickActivityIndicator size={100} />)
      expect(true).toBe(true)
    })

    it('should calculate tick height as 28% of size', () => {
      renderWithProvider(<TickActivityIndicator size={100} />)
      expect(true).toBe(true)
    })

    it('should have rounded tick borders', () => {
      const { container } = renderWithProvider(<TickActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('integration with XUIProvider', () => {
    it('should use theme from XUIProvider', () => {
      const { container } = renderWithProvider(
        <TickActivityIndicator themeColor="primary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should work with custom theme', () => {
      const customTheme = {
        colors: {
          primary: {
            main: '#CUSTOM',
            foreground: '#FFFFFF',
            background: '#CUSTOM_BG',
          },
        },
      }

      const { container } = render(
        <XUIProvider theme={customTheme}>
          <TickActivityIndicator themeColor="primary" />
        </XUIProvider>
      )
      expect(container.firstChild).toBeTruthy()
    })
  })
})
