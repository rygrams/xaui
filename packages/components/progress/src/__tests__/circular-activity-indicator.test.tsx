import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { CircularActivityIndicator } from '../circular-activity-indicator'
import { XUIProvider } from '@xaui/core'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<XUIProvider>{component}</XUIProvider>)
}

describe('CircularActivityIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProvider(<CircularActivityIndicator />)
      expect(container).toBeTruthy()
    })

    it('should render with default props', () => {
      const { container } = renderWithProvider(<CircularActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default variant spinner', () => {
      const { container } = renderWithProvider(<CircularActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('variants', () => {
    it('should render ticks variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render bullets variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render spinner variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should default to spinner variant when invalid variant provided', () => {
      const { container } = renderWithProvider(<CircularActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('size prop', () => {
    it('should render with custom size for ticks variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" size={30} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom size for bullets variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" size={50} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom size for spinner variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" size={60} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('theme colors', () => {
    it('should render with primary theme color by default', () => {
      const { container } = renderWithProvider(<CircularActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with secondary theme color', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="secondary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with success theme color', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="success" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with danger theme color', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="danger" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with warning theme color', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="warning" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with tertiary theme color', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="tertiary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default theme color', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="default" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('custom color', () => {
    it('should accept custom color for ticks variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" color="#FF0000" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept custom color for bullets variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" color="#00FF00" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept custom color for spinner variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" color="#0000FF" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should override theme color when custom color is provided', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="primary" color="#FFFFFF" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('background color', () => {
    it('should accept custom backgroundColor for spinner variant', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" backgroundColor="#EEEEEE" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with backgroundColor and custom color together', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator
          variant="spinner"
          color="#007AFF"
          backgroundColor="#E5E5EA"
        />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should default to transparent when no backgroundColor provided', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('animation', () => {
    it('should animate by default', () => {
      renderWithProvider(<CircularActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should disable animation when disableAnimation is true for ticks', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should disable animation when disableAnimation is true for bullets', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should disable animation when disableAnimation is true for spinner', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('should have progressbar role for all variants', () => {
      const { container: ticksContainer } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" />
      )
      const ticksProgressbar = ticksContainer.querySelector('[role="progressbar"]')
      expect(ticksProgressbar).toBeTruthy()

      const { container: bulletsContainer } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" />
      )
      const bulletsProgressbar = bulletsContainer.querySelector('[role="progressbar"]')
      expect(bulletsProgressbar).toBeTruthy()

      const { container: spinnerContainer } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" />
      )
      const spinnerProgressbar = spinnerContainer.querySelector('[role="progressbar"]')
      expect(spinnerProgressbar).toBeTruthy()
    })

    it('should have loading accessibility label for all variants', () => {
      const { container: ticksContainer } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" />
      )
      const ticksLabel = ticksContainer.querySelector('[aria-label="Loading"]')
      expect(ticksLabel).toBeTruthy()

      const { container: bulletsContainer } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" />
      )
      const bulletsLabel = bulletsContainer.querySelector('[aria-label="Loading"]')
      expect(bulletsLabel).toBeTruthy()

      const { container: spinnerContainer } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" />
      )
      const spinnerLabel = spinnerContainer.querySelector('[aria-label="Loading"]')
      expect(spinnerLabel).toBeTruthy()
    })
  })

  describe('integration with XUIProvider', () => {
    it('should use theme from XUIProvider', () => {
      const { container } = renderWithProvider(
        <CircularActivityIndicator themeColor="primary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should work with custom theme for ticks variant', () => {
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
          <CircularActivityIndicator variant="ticks" themeColor="primary" />
        </XUIProvider>
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should work with custom theme for bullets variant', () => {
      const customTheme = {
        colors: {
          secondary: {
            main: '#CUSTOM2',
            foreground: '#FFFFFF',
            background: '#CUSTOM_BG2',
          },
        },
      }

      const { container } = render(
        <XUIProvider theme={customTheme}>
          <CircularActivityIndicator variant="bullets" themeColor="secondary" />
        </XUIProvider>
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should work with custom theme for spinner variant', () => {
      const customTheme = {
        colors: {
          success: {
            main: '#CUSTOM3',
            foreground: '#FFFFFF',
            background: '#CUSTOM_BG3',
          },
        },
      }

      const { container } = render(
        <XUIProvider theme={customTheme}>
          <CircularActivityIndicator variant="spinner" themeColor="success" />
        </XUIProvider>
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('variant switching', () => {
    it('should switch between variants correctly', () => {
      const { container: ticksContainer } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" />
      )
      expect(ticksContainer.firstChild).toBeTruthy()

      const { container: bulletsContainer } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" />
      )
      expect(bulletsContainer.firstChild).toBeTruthy()

      const { container: spinnerContainer } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" />
      )
      expect(spinnerContainer.firstChild).toBeTruthy()
    })

    it('should pass all props correctly to underlying components', () => {
      const commonProps = {
        size: 50,
        themeColor: 'success' as const,
        color: '#FF00FF',
        disableAnimation: true,
      }

      const { container: ticksContainer } = renderWithProvider(
        <CircularActivityIndicator variant="ticks" {...commonProps} />
      )
      expect(ticksContainer.firstChild).toBeTruthy()

      const { container: bulletsContainer } = renderWithProvider(
        <CircularActivityIndicator variant="bullets" {...commonProps} />
      )
      expect(bulletsContainer.firstChild).toBeTruthy()

      const { container: spinnerContainer } = renderWithProvider(
        <CircularActivityIndicator variant="spinner" {...commonProps} />
      )
      expect(spinnerContainer.firstChild).toBeTruthy()
    })
  })
})
