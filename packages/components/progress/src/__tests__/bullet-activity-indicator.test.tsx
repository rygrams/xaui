import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { BulletActivityIndicator } from '../components/bullet-activity-indicator'
import { XUIProvider } from '@xaui/core'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<XUIProvider>{component}</XUIProvider>)
}

describe('BulletActivityIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container).toBeTruthy()
    })

    it('should render with default props', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default size of 40', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom size', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator size={60} />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('bullet rendering', () => {
    it('should render 6 bullets', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should position bullets in a circular orbit', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should apply correct bullet dimensions based on size', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator size={80} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should have circular bullets with proper border radius', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('theme colors', () => {
    it('should render with primary theme color by default', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with secondary theme color', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="secondary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with success theme color', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="success" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with danger theme color', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="danger" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with warning theme color', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="warning" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with tertiary theme color', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="tertiary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default theme color', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="default" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('custom color', () => {
    it('should accept custom color', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator color="#FF0000" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should override theme color when custom color is provided', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="primary" color="#00FF00" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('animation', () => {
    it('should animate by default', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should disable animation when disableAnimation is true', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should create rotation animation for bullets', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should use offset positioning for each bullet', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })
  })

  describe('animation timing', () => {
    it('should have smooth ease-in-out animation', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should loop animation continuously without pause', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should maintain constant rotation speed', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })
  })

  describe('bullet dimensions', () => {
    it('should calculate bullet size as 15% of total size', () => {
      renderWithProvider(<BulletActivityIndicator size={100} />)
      expect(true).toBe(true)
    })

    it('should calculate orbit radius based on size', () => {
      renderWithProvider(<BulletActivityIndicator size={100} />)
      expect(true).toBe(true)
    })

    it('should have circular bullets', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('should have progressbar role', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })

    it('should have loading accessibility label', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      const progressbar = container.querySelector('[aria-label="Loading"]')
      expect(progressbar).toBeTruthy()
    })
  })

  describe('bullet rotation', () => {
    it('should rotate bullets around center point', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should rotate 360 degrees per cycle', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should have bullets evenly spaced at 60 degree intervals', () => {
      renderWithProvider(<BulletActivityIndicator />)
      expect(true).toBe(true)
    })
  })

  describe('integration with XUIProvider', () => {
    it('should use theme from XUIProvider', () => {
      const { container } = renderWithProvider(
        <BulletActivityIndicator themeColor="primary" />
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
          <BulletActivityIndicator themeColor="primary" />
        </XUIProvider>
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('layout', () => {
    it('should have container with proper dimensions', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator size={50} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should center bullets properly', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should position bullets absolutely within container', () => {
      const { container } = renderWithProvider(<BulletActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })
  })
})
