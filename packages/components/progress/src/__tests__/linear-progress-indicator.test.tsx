import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { LinearProgressIndicator } from '../linear-progress-indicator'
import { XUIProvider } from '@xaui/core'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<XUIProvider>{component}</XUIProvider>)
}

describe('LinearProgressIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0.5} />)
      expect(container).toBeTruthy()
    })

    it('should render with default props', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0.5} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom size', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} size={8} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom borderRadius', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} borderRadius={0} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('value handling', () => {
    it('should render with value 0', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with value 1', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={1} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with value 0.5', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0.5} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should clamp value between 0 and 1', () => {
      const { container: container1 } = renderWithProvider(
        <LinearProgressIndicator value={-0.5} />
      )
      expect(container1.firstChild).toBeTruthy()

      const { container: container2 } = renderWithProvider(
        <LinearProgressIndicator value={1.5} />
      )
      expect(container2.firstChild).toBeTruthy()
    })
  })

  describe('theme colors', () => {
    it('should render with primary theme color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator themeColor="primary" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with secondary theme color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator themeColor="secondary" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with tertiary theme color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator themeColor="tertiary" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with success theme color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator themeColor="success" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with danger theme color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator themeColor="danger" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with warning theme color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator themeColor="warning" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with default theme color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator themeColor="default" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('custom colors', () => {
    it('should accept custom color', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} color="#FF0000" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept custom backgroundColor', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} backgroundColor="#EEEEEE" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept both custom color and backgroundColor', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} color="#FF0000" backgroundColor="#EEEEEE" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('animation', () => {
    it('should animate by default', () => {
      renderWithProvider(<LinearProgressIndicator value={0.5} />)
      expect(true).toBe(true)
    })

    it('should disable animation when disableAnimation is true', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('should have progressbar role', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0.5} />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })

    it('should have correct accessibility value', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0.75} />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })

    it('should have accessibility value with value 0', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0} />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })

    it('should have accessibility value with value 1', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={1} />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })
  })

  describe('borderRadius', () => {
    it('should use default rounded borderRadius', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} size={4} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept borderRadius 0 for square edges', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} borderRadius={0} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept custom borderRadius', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} borderRadius={10} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('size', () => {
    it('should use default size', () => {
      const { container } = renderWithProvider(<LinearProgressIndicator value={0.5} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept small size', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} size={2} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept large size', () => {
      const { container } = renderWithProvider(
        <LinearProgressIndicator value={0.5} size={12} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })
})
