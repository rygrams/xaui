import { describe, it, expect } from 'vitest'
import { themeReducer, ThemeAction } from '../theme-reducer'
import { XUITheme } from '../theme'
import { themeColors } from '../theme-colors'

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
  describe('semantic colors', () => {
    it('should update primary color', () => {
      const action: ThemeAction = { type: 'SET_PRIMARY', color: '#FF0000' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.primary).toBe('#FF0000')
      expect(result).not.toBe(mockTheme)
    })

    it('should update secondary color', () => {
      const action: ThemeAction = { type: 'SET_SECONDARY', color: '#00FF00' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.secondary).toBe('#00FF00')
    })

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

    it('should update error color', () => {
      const action: ThemeAction = { type: 'SET_ERROR', color: '#FF00FF' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.error).toBe('#FF00FF')
    })

    it('should update info color', () => {
      const action: ThemeAction = { type: 'SET_INFO', color: '#00FFFF' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.info).toBe('#00FFFF')
    })
  })

  describe('text colors', () => {
    it('should update text primary color', () => {
      const action: ThemeAction = { type: 'SET_TEXT_PRIMARY', color: '#111111' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.text.primary).toBe('#111111')
      expect(result.colors.text.secondary).toBe(mockTheme.colors.text.secondary)
    })

    it('should update text secondary color', () => {
      const action: ThemeAction = { type: 'SET_TEXT_SECONDARY', color: '#222222' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.text.secondary).toBe('#222222')
    })

    it('should update text tertiary color', () => {
      const action: ThemeAction = { type: 'SET_TEXT_TERTIARY', color: '#333333' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.text.tertiary).toBe('#333333')
    })

    it('should update text disabled color', () => {
      const action: ThemeAction = { type: 'SET_TEXT_DISABLED', color: '#444444' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.text.disabled).toBe('#444444')
    })

    it('should update text inverse color', () => {
      const action: ThemeAction = { type: 'SET_TEXT_INVERSE', color: '#FFFFFF' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.text.inverse).toBe('#FFFFFF')
    })
  })

  describe('background colors', () => {
    it('should update background primary color', () => {
      const action: ThemeAction = { type: 'SET_BACKGROUND_PRIMARY', color: '#FAFAFA' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.background.primary).toBe('#FAFAFA')
      expect(result.colors.background.secondary).toBe(
        mockTheme.colors.background.secondary
      )
    })

    it('should update background secondary color', () => {
      const action: ThemeAction = { type: 'SET_BACKGROUND_SECONDARY', color: '#F5F5F5' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.background.secondary).toBe('#F5F5F5')
    })

    it('should update background tertiary color', () => {
      const action: ThemeAction = { type: 'SET_BACKGROUND_TERTIARY', color: '#F0F0F0' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.background.tertiary).toBe('#F0F0F0')
    })

    it('should update background inverse color', () => {
      const action: ThemeAction = { type: 'SET_BACKGROUND_INVERSE', color: '#000000' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.background.inverse).toBe('#000000')
    })
  })

  describe('border colors', () => {
    it('should update border primary color', () => {
      const action: ThemeAction = { type: 'SET_BORDER_PRIMARY', color: '#CCCCCC' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.border.primary).toBe('#CCCCCC')
      expect(result.colors.border.secondary).toBe(mockTheme.colors.border.secondary)
    })

    it('should update border secondary color', () => {
      const action: ThemeAction = { type: 'SET_BORDER_SECONDARY', color: '#DDDDDD' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.border.secondary).toBe('#DDDDDD')
    })

    it('should update border focus color', () => {
      const action: ThemeAction = { type: 'SET_BORDER_FOCUS', color: '#0066CC' }
      const result = themeReducer(mockTheme, action)

      expect(result.colors.border.focus).toBe('#0066CC')
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
})
