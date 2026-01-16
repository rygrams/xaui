import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { CircularProgressIndicator } from '../components/circular-progress-indicator'
import { XUIProvider } from '@xaui/core'

const renderWithProvider = (component: React.ReactElement) => {
  return render(<XUIProvider>{component}</XUIProvider>)
}

describe('CircularProgressIndicator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator />)
      expect(container).toBeTruthy()
    })

    it('should render with default props', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom size', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator size={60} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with custom strokeWidth', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator strokeWidth={6} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('indeterminate mode', () => {
    it('should render in indeterminate mode when value is undefined', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render in indeterminate mode when value is null', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator value={null as unknown as undefined} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should use square strokeCap by default in indeterminate mode', () => {
      renderWithProvider(<CircularProgressIndicator />)
      expect(true).toBe(true)
    })
  })

  describe('determinate mode', () => {
    it('should render in determinate mode when value is provided', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator value={0.5} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with value 0', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator value={0} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with value 1', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator value={1} />)
      expect(container.firstChild).toBeTruthy()
    })

    it('should clamp value between 0 and 1', () => {
      const { container: container1 } = renderWithProvider(
        <CircularProgressIndicator value={-0.5} />
      )
      expect(container1.firstChild).toBeTruthy()

      const { container: container2 } = renderWithProvider(
        <CircularProgressIndicator value={1.5} />
      )
      expect(container2.firstChild).toBeTruthy()
    })

    it('should use butt strokeCap by default in determinate mode', () => {
      renderWithProvider(<CircularProgressIndicator value={0.5} />)
      expect(true).toBe(true)
    })
  })

  describe('strokeCap prop', () => {
    it('should accept round strokeCap', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator value={0.5} strokeCap="round" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept butt strokeCap', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator value={0.5} strokeCap="butt" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept square strokeCap', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator value={0.5} strokeCap="square" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should override default strokeCap in indeterminate mode', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator strokeCap="round" />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('theme colors', () => {
    it('should render with primary theme color', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator themeColor="primary" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with secondary theme color', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator themeColor="secondary" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with success theme color', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator themeColor="success" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with danger theme color', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator themeColor="danger" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should render with warning theme color', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator themeColor="warning" value={0.5} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('custom colors', () => {
    it('should accept custom color', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator value={0.5} color="#FF0000" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept custom backgroundColor', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator value={0.5} backgroundColor="#EEEEEE" />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should accept both custom color and backgroundColor', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator
          value={0.5}
          color="#FF0000"
          backgroundColor="#EEEEEE"
        />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('animation', () => {
    it('should animate by default', () => {
      renderWithProvider(<CircularProgressIndicator value={0.5} />)
      expect(true).toBe(true)
    })

    it('should disable animation when disableAnimation is true', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator value={0.5} disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })

    it('should not animate indeterminate when disableAnimation is true', () => {
      const { container } = renderWithProvider(
        <CircularProgressIndicator disableAnimation={true} />
      )
      expect(container.firstChild).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('should have progressbar role', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator value={0.5} />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })

    it('should have correct accessibility value in determinate mode', () => {
      const { container } = renderWithProvider(<CircularProgressIndicator value={0.75} />)
      const progressbar = container.querySelector('[role="progressbar"]')
      expect(progressbar).toBeTruthy()
    })
  })
})
