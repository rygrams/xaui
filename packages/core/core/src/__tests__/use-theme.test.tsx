import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { useXUITheme } from '../use-theme'
import { XUIProvider } from '../theme'

describe('useXUITheme', () => {
  describe('error handling', () => {
    it('should throw error when used outside XUIProvider', () => {
      expect(() => {
        renderHook(() => useXUITheme())
      }).toThrow('useXUITheme must be used within XUIProvider')
    })
  })

  describe('color roles direct access', () => {
    it('should return primary color role with main, foreground, and background', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.colors.primary).toBeDefined()
      expect(typeof result.current.colors.primary.main).toBe('string')
      expect(typeof result.current.colors.primary.foreground).toBe('string')
      expect(typeof result.current.colors.primary.background).toBe('string')
    })

    it('should return secondary color role', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.colors.secondary).toBeDefined()
      expect(typeof result.current.colors.secondary.main).toBe('string')
      expect(typeof result.current.colors.secondary.foreground).toBe('string')
      expect(typeof result.current.colors.secondary.background).toBe('string')
    })

    it('should return semantic color roles', () => {
      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider>{children}</XUIProvider>,
      })

      expect(result.current.colors.success).toBeDefined()
      expect(result.current.colors.warning).toBeDefined()
      expect(result.current.colors.danger).toBeDefined()
      expect(result.current.colors.default).toBeDefined()

      expect(typeof result.current.colors.success.main).toBe('string')
      expect(typeof result.current.colors.warning.main).toBe('string')
      expect(typeof result.current.colors.danger.main).toBe('string')
      expect(typeof result.current.colors.default.main).toBe('string')
    })
  })

  describe('custom theme', () => {
    it('should use custom theme colors when provided', () => {
      const customTheme = {
        colors: {
          primary: {
            main: '#CUSTOM1',
            foreground: '#FFFFFF',
            background: '#CUSTOM1_SURFACE',
          },
          secondary: {
            main: '#CUSTOM2',
            foreground: '#FFFFFF',
            background: '#CUSTOM2_SURFACE',
          },
        },
      }

      const { result } = renderHook(() => useXUITheme(), {
        wrapper: ({ children }) => <XUIProvider theme={customTheme}>{children}</XUIProvider>,
      })

      expect(result.current.colors.primary.main).toBe('#CUSTOM1')
      expect(result.current.colors.secondary.main).toBe('#CUSTOM2')
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
        wrapper: ({ children }) => <XUIProvider theme={customTheme}>{children}</XUIProvider>,
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
        wrapper: ({ children }) => <XUIProvider theme={customTheme}>{children}</XUIProvider>,
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
