import { describe, it, expect } from 'vitest'
import { themeReducer, ThemeAction } from '../theme-reducer'
import { themeColors } from '../theme-colors'
import { XUITheme } from '../theme-config'

const mockTheme: XUITheme = {
  colors: themeColors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  fontFamilies: {
    body: 'System',
    heading: 'System',
    default: 'monospace',
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
  },
}

describe('themeReducer', () => {
  describe('primary colors', () => {
    it('should update primary color', () => {
      const action: ThemeAction = { type: 'SET_PRIMARY', color: '#FF0000' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.primary).toBe('#FF0000')
      expect(result).not.toBe(mockTheme)
    })

    it('should update onPrimary color', () => {
      const action: ThemeAction = { type: 'SET_ON_PRIMARY', color: '#FFFFFF' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.onPrimary).toBe('#FFFFFF')
    })

    it('should update primarySurface color', () => {
      const action: ThemeAction = { type: 'SET_PRIMARY_SURFACE', color: '#FFE5E5' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.primarySurface).toBe('#FFE5E5')
    })
  })

  describe('secondary colors', () => {
    it('should update secondary color', () => {
      const action: ThemeAction = { type: 'SET_SECONDARY', color: '#00FF00' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.secondary).toBe('#00FF00')
    })

    it('should update onSecondary color', () => {
      const action: ThemeAction = { type: 'SET_ON_SECONDARY', color: '#FFFFFF' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.onSecondary).toBe('#FFFFFF')
    })

    it('should update secondarySurface color', () => {
      const action: ThemeAction = { type: 'SET_SECONDARY_SURFACE', color: '#E5FFE5' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.secondarySurface).toBe('#E5FFE5')
    })
  })

  describe('semantic colors', () => {
    it('should update success color', () => {
      const action: ThemeAction = { type: 'SET_SUCCESS', color: '#0000FF' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.success).toBe('#0000FF')
    })

    it('should update warning color', () => {
      const action: ThemeAction = { type: 'SET_WARNING', color: '#FFFF00' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.warning).toBe('#FFFF00')
    })

    it('should update danger color', () => {
      const action: ThemeAction = { type: 'SET_DANGER', color: '#FF00FF' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.danger).toBe('#FF00FF')
    })

    it('should update neutral color', () => {
      const action: ThemeAction = { type: 'SET_NEUTRAL', color: '#888888' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.neutral).toBe('#888888')
    })

    it('should update inverse color', () => {
      const action: ThemeAction = { type: 'SET_INVERSE', color: '#000000' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.inverse).toBe('#000000')
    })

    it('should update default color', () => {
      const action: ThemeAction = { type: 'SET_DEFAULT', color: '#CCCCCC' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.default).toBe('#CCCCCC')
    })
  })

  describe('immutability', () => {
    it('should not mutate the original state', () => {
      const originalPrimary = mockTheme.colors.primary
      const action: ThemeAction = { type: 'SET_PRIMARY', color: '#FF0000' }
      const result = themeReducer(mockTheme, action)

      expect(mockTheme.colors.primary).toBe(originalPrimary)
      expect(result).not.toBe(mockTheme)
      expect(result.colors).not.toBe(mockTheme.colors)
    })

    it('should preserve other properties when updating one color', () => {
      const action: ThemeAction = { type: 'SET_PRIMARY', color: '#FF0000' }
      const result = themeReducer(mockTheme, action)

      expect(result.spacing).toEqual(mockTheme.spacing)
      expect(result.borderRadius).toEqual(mockTheme.borderRadius)
      expect(result.fontSizes).toEqual(mockTheme.fontSizes)
      expect(result.fontWeights).toEqual(mockTheme.fontWeights)
      expect(result.shadows).toEqual(mockTheme.shadows)
    })
  })

  describe('default case', () => {
    it('should return the same state for unknown actions', () => {
      const action = { type: 'UNKNOWN_ACTION' } as never
      const result = themeReducer(mockTheme, action)

      expect(result).toBe(mockTheme)
    })
  })

  describe('no-op updates', () => {
    it('should return the same state reference when setting the same primary color', () => {
      const currentColor = mockTheme.colors.primary
      const action: ThemeAction = { type: 'SET_PRIMARY', color: currentColor }
      const result = themeReducer(mockTheme, action)

      expect(result).toBe(mockTheme)
    })

    it('should return the same state reference when setting the same onPrimary color', () => {
      const currentColor = mockTheme.colors.onPrimary
      const action: ThemeAction = { type: 'SET_ON_PRIMARY', color: currentColor }
      const result = themeReducer(mockTheme, action)

      expect(result).toBe(mockTheme)
    })

    it('should return the same state reference when setting the same success color', () => {
      const currentColor = mockTheme.colors.success
      const action: ThemeAction = { type: 'SET_SUCCESS', color: currentColor }
      const result = themeReducer(mockTheme, action)

      expect(result).toBe(mockTheme)
    })

    it('should return the same state reference when setting the same default color', () => {
      const currentColor = mockTheme.colors.default
      const action: ThemeAction = { type: 'SET_DEFAULT', color: currentColor }
      const result = themeReducer(mockTheme, action)

      expect(result).toBe(mockTheme)
    })
  })
})
