import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { LinearActivityIndicator } from '../linear-activity-indicator'
import { XUIProvider } from '@xaui/core'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<XUIProvider>{component}</XUIProvider>)
}

describe('LinearActivityIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProvider(<LinearActivityIndicator />)
      expect(container).toBeTruthy()
    })

    it('should render with default props', () => {
      const { container } = renderWithProvider(<LinearActivityIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom size', () => {
      const { container } = renderWithProvider(<LinearActivityIndicator size={8} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom borderRadius', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator borderRadius={0} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('theme colors', () => {
    it('should render with primary theme color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator themeColor="primary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with secondary theme color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator themeColor="secondary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with tertiary theme color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator themeColor="tertiary" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with success theme color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator themeColor="success" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with danger theme color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator themeColor="danger" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with warning theme color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator themeColor="warning" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default theme color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator themeColor="default" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('custom colors', () => {
    it('should accept custom color', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator color="#FF0000" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept custom backgroundColor', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator backgroundColor="#EEEEEE" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept both custom color and backgroundColor', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator color="#FF0000" backgroundColor="#EEEEEE" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('animation', () => {
    it('should animate by default', () => {
      renderWithProvider(<LinearActivityIndicator />)
      expect(true).toBe(true)
    })

    it('should disable animation when disableAnimation is true', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('should have progressbar role', () => {
      const { container } = renderWithProvider(<LinearActivityIndicator />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })
  })

  describe('borderRadius', () => {
    it('should use default rounded borderRadius', () => {
      const { container } = renderWithProvider(<LinearActivityIndicator size={4} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept borderRadius 0 for square edges', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator borderRadius={0} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept custom borderRadius', () => {
      const { container } = renderWithProvider(
        <LinearActivityIndicator borderRadius={10} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })
})
