import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { useXUITheme } from '../use-theme'
import { XUIProvider } from '../theme'

describe('useXUITheme', () => {
  describe('error handling', () => {
    it('should throw error when used outside XUIProvider', () => {
      expect(() => {
        renderHook(() => useXUITheme())
      }).toThrow('useTheme must be used within XAUIProvider')
    })
  })

  describe('color accessors', () => {
    it('should return color accessor for primary color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.primary).toBeDefined()
      expect(typeof result.current.primary.color).toBe('string')
      expect(typeof result.current.primary.toString()).toBe('string')
      expect(typeof result.current.primary.setColor).toBe('function')
    })

    it('should return color accessor for secondary color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.secondary).toBeDefined()
      expect(typeof result.current.secondary.color).toBe('string')
      expect(typeof result.current.secondary.toString()).toBe('string')
    })

    it('should return color accessor for success color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.success).toBeDefined()
      expect(typeof result.current.success.color).toBe('string')
    })

    it('should return color accessor for warning color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.warning).toBeDefined()
      expect(typeof result.current.warning.color).toBe('string')
    })

    it('should return color accessor for error color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.error).toBeDefined()
      expect(typeof result.current.error.color).toBe('string')
    })

    it('should return color accessor for info color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.info).toBeDefined()
      expect(typeof result.current.info.color).toBe('string')
    })
  })

  describe('text color accessors', () => {
    it('should return text color accessors', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.text).toBeDefined()
      expect(result.current.text.primary).toBeDefined()
      expect(result.current.text.secondary).toBeDefined()
      expect(result.current.text.tertiary).toBeDefined()
      expect(result.current.text.disabled).toBeDefined()
      expect(result.current.text.inverse).toBeDefined()
    })

    it('should return correct values for text colors', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(typeof result.current.text.primary.color).toBe('string')
      expect(typeof result.current.text.secondary.color).toBe('string')
      expect(typeof result.current.text.tertiary.color).toBe('string')
      expect(typeof result.current.text.disabled.color).toBe('string')
      expect(typeof result.current.text.inverse.color).toBe('string')
    })
  })

  describe('background color accessors', () => {
    it('should return background color accessors', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.background).toBeDefined()
      expect(result.current.background.primary).toBeDefined()
      expect(result.current.background.secondary).toBeDefined()
      expect(result.current.background.tertiary).toBeDefined()
      expect(result.current.background.inverse).toBeDefined()
    })

    it('should return correct values for background colors', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(typeof result.current.background.primary.color).toBe('string')
      expect(typeof result.current.background.secondary.color).toBe('string')
      expect(typeof result.current.background.tertiary.color).toBe('string')
      expect(typeof result.current.background.inverse.color).toBe('string')
    })
  })

  describe('border color accessors', () => {
    it('should return border color accessors', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.border).toBeDefined()
      expect(result.current.border.primary).toBeDefined()
      expect(result.current.border.secondary).toBeDefined()
      expect(result.current.border.focus).toBeDefined()
    })

    it('should return correct values for border colors', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(typeof result.current.border.primary.color).toBe('string')
      expect(typeof result.current.border.secondary.color).toBe('string')
      expect(typeof result.current.border.focus.color).toBe('string')
    })
  })

  describe('color updates', () => {
    it('should update primary color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      const originalColor = result.current.primary.color

      act(() => {
        result.current.primary.setColor('#FF0000')
      })

      expect(result.current.primary.color).toBe('#FF0000')
      expect(result.current.primary.color).not.toBe(originalColor)
    })

    it('should update secondary color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.secondary.setColor('#00FF00')
      })

      expect(result.current.secondary.color).toBe('#00FF00')
    })

    it('should update text primary color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.text.primary.setColor('#111111')
      })

      expect(result.current.text.primary.color).toBe('#111111')
    })

    it('should update background primary color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.background.primary.setColor('#FAFAFA')
      })

      expect(result.current.background.primary.color).toBe('#FAFAFA')
    })

    it('should update border focus color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.border.focus.setColor('#0066CC')
      })

      expect(result.current.border.focus.color).toBe('#0066CC')
    })
  })

  describe('toString and color', () => {
    it('should return same value for toString and color property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.primary.toString()).toBe(result.current.primary.color)
      expect(result.current.text.primary.toString()).toBe(
        result.current.text.primary.color
      )
      expect(result.current.background.primary.toString()).toBe(
        result.current.background.primary.color
      )
      expect(result.current.border.primary.toString()).toBe(
        result.current.border.primary.color
      )
    })
  })

  describe('independence of color updates', () => {
    it('should not affect other colors when updating one color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      const originalSecondary = result.current.secondary.color
      const originalSuccess = result.current.success.color

      act(() => {
        result.current.primary.setColor('#FF0000')
      })

      expect(result.current.secondary.color).toBe(originalSecondary)
      expect(result.current.success.color).toBe(originalSuccess)
    })

    it('should not affect other text colors when updating one text color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      const originalSecondary = result.current.text.secondary.color
      const originalTertiary = result.current.text.tertiary.color

      act(() => {
        result.current.text.primary.setColor('#111111')
      })

      expect(result.current.text.secondary.color).toBe(originalSecondary)
      expect(result.current.text.tertiary.color).toBe(originalTertiary)
    })
  })

  describe('multiple updates', () => {
    it('should handle multiple sequential updates', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.primary.setColor('#FF0000')
      })
      expect(result.current.primary.color).toBe('#FF0000')

      act(() => {
        result.current.primary.setColor('#00FF00')
      })
      expect(result.current.primary.color).toBe('#00FF00')

      act(() => {
        result.current.primary.setColor('#0000FF')
      })
      expect(result.current.primary.color).toBe('#0000FF')
    })

    it('should handle updates to multiple different colors', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.primary.setColor('#FF0000')
        result.current.secondary.setColor('#00FF00')
        result.current.success.setColor('#0000FF')
      })

      expect(result.current.primary.color).toBe('#FF0000')
      expect(result.current.secondary.color).toBe('#00FF00')
      expect(result.current.success.color).toBe('#0000FF')
    })
  })

  describe('custom theme', () => {
    it('should use custom theme colors when provided', () => {
      const customTheme = {
        colors: {
          primary: '#CUSTOM1',
          secondary: '#CUSTOM2',
        },
      }

      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider theme={customTheme}>{children}</XUIProvider>,
      })

      expect(result.current.primary.color).toBe('#CUSTOM1')
      expect(result.current.secondary.color).toBe('#CUSTOM2')
    })
  })

  describe('theme properties access', () => {
    it('should expose spacing property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.spacing).toBeDefined()
      expect(result.current.spacing.xs).toBe(4)
      expect(result.current.spacing.sm).toBe(8)
      expect(result.current.spacing.md).toBe(16)
    })

    it('should expose borderRadius property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.borderRadius).toBeDefined()
      expect(result.current.borderRadius.sm).toBe(4)
      expect(result.current.borderRadius.md).toBe(8)
      expect(result.current.borderRadius.full).toBe(9999)
    })

    it('should expose fontSizes property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.fontSizes).toBeDefined()
      expect(result.current.fontSizes.xs).toBe(12)
      expect(result.current.fontSizes.sm).toBe(14)
      expect(result.current.fontSizes.md).toBe(16)
    })

    it('should expose fontWeights property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.fontWeights).toBeDefined()
      expect(result.current.fontWeights.light).toBe('300')
      expect(result.current.fontWeights.normal).toBe('400')
      expect(result.current.fontWeights.bold).toBe('700')
    })

    it('should expose shadows property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.shadows).toBeDefined()
      expect(result.current.shadows.sm).toBeDefined()
      expect(result.current.shadows.sm.elevation).toBe(1)
      expect(result.current.shadows.md.elevation).toBe(4)
    })
  })
})
