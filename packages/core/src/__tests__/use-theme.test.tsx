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

  describe('primary color accessors', () => {
    it('should return primary color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.primary).toBeDefined()
      expect(typeof result.current.primary.color).toBe('string')
      expect(typeof result.current.primary.toString()).toBe('string')
      expect(typeof result.current.primary.setColor).toBe('function')
    })

    it('should return onPrimary color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.onPrimary).toBeDefined()
      expect(typeof result.current.onPrimary.color).toBe('string')
    })

    it('should return primarySurface color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.primarySurface).toBeDefined()
      expect(typeof result.current.primarySurface.color).toBe('string')
    })
  })

  describe('secondary color accessors', () => {
    it('should return secondary color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.secondary).toBeDefined()
      expect(typeof result.current.secondary.color).toBe('string')
    })

    it('should return onSecondary color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.onSecondary).toBeDefined()
      expect(typeof result.current.onSecondary.color).toBe('string')
    })

    it('should return secondarySurface color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.secondarySurface).toBeDefined()
      expect(typeof result.current.secondarySurface.color).toBe('string')
    })
  })

  describe('semantic color accessors', () => {
    it('should return success color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.success).toBeDefined()
      expect(typeof result.current.success.color).toBe('string')
    })

    it('should return warning color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.warning).toBeDefined()
      expect(typeof result.current.warning.color).toBe('string')
    })

    it('should return danger color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.danger).toBeDefined()
      expect(typeof result.current.danger.color).toBe('string')
    })

    it('should return neutral color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.neutral).toBeDefined()
      expect(typeof result.current.neutral.color).toBe('string')
    })

    it('should return inverse color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.inverse).toBeDefined()
      expect(typeof result.current.inverse.color).toBe('string')
    })

    it('should return default color accessor', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.default).toBeDefined()
      expect(typeof result.current.default.color).toBe('string')
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

    it('should update onPrimary color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.onPrimary.setColor('#FFFFFF')
      })

      expect(result.current.onPrimary.color).toBe('#FFFFFF')
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

    it('should update danger color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.danger.setColor('#FF0000')
      })

      expect(result.current.danger.color).toBe('#FF0000')
    })

    it('should update default color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      act(() => {
        result.current.default.setColor('#CCCCCC')
      })

      expect(result.current.default.color).toBe('#CCCCCC')
    })
  })

  describe('toString and color', () => {
    it('should return same value for toString and color property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.primary.toString()).toBe(result.current.primary.color)
      expect(result.current.onPrimary.toString()).toBe(result.current.onPrimary.color)
      expect(result.current.success.toString()).toBe(result.current.success.color)
      expect(result.current.default.toString()).toBe(result.current.default.color)
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

    it('should not affect surface colors when updating base color', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      const originalPrimarySurface = result.current.primarySurface.color
      const originalOnPrimary = result.current.onPrimary.color

      act(() => {
        result.current.primary.setColor('#FF0000')
      })

      expect(result.current.primarySurface.color).toBe(originalPrimarySurface)
      expect(result.current.onPrimary.color).toBe(originalOnPrimary)
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
        wrapper: ({ children }) => (
          <XUIProvider theme={customTheme}>{children}</XUIProvider>
        ),
      })

      expect(result.current.primary.color).toBe('#CUSTOM1')
      expect(result.current.secondary.color).toBe('#CUSTOM2')
    })

    it('should use custom font families when provided', () => {
      const customTheme = {
        fontFamilies: {
          body: 'Roboto',
          heading: 'Montserrat',
          default: 'Fira Code',
        },
      }

      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => (
          <XUIProvider theme={customTheme}>{children}</XUIProvider>
        ),
      })

      expect(result.current.fontFamilies.body).toBe('Roboto')
      expect(result.current.fontFamilies.heading).toBe('Montserrat')
      expect(result.current.fontFamilies.default).toBe('Fira Code')
    })

    it('should partially override font families', () => {
      const customTheme = {
        fontFamilies: {
          heading: 'Playfair Display',
        },
      }

      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => (
          <XUIProvider theme={customTheme}>{children}</XUIProvider>
        ),
      })

      expect(result.current.fontFamilies.heading).toBe('Playfair Display')
      expect(result.current.fontFamilies.body).toBe('System')
      expect(result.current.fontFamilies.default).toBe('monospace')
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

    it('should expose fontFamilies property', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.fontFamilies).toBeDefined()
      expect(result.current.fontFamilies.body).toBe('System')
      expect(result.current.fontFamilies.heading).toBe('System')
      expect(result.current.fontFamilies.default).toBe('monospace')
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
