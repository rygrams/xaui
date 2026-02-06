import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import {
  useFabMenuState,
  useFabMenuItemStyles,
  useFabMenuOverlayColor,
} from '../../../components/fab-menu/fab-menu.hook'

vi.mock('../../../core', () => ({
  useXUITheme: () => ({
    mode: 'light',
    colors: {
      primary: {
        main: '#1976d2',
        background: '#e3f2fd',
        foreground: '#ffffff',
        accent: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
        background: '#f3e5f5',
        foreground: '#ffffff',
        accent: '#9c27b0',
      },
      default: {
        main: '#616161',
        background: '#f5f5f5',
        foreground: '#ffffff',
        accent: '#616161',
      },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
    },
    borderRadius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 24,
    },
    borderWidth: {
      md: 2,
    },
    shadows: {
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
    },
  }),
}))

describe('fab-menu hook styles', () => {
  describe('useFabMenuState', () => {
    it('initializes as collapsed (uncontrolled)', () => {
      const { result } = renderHook(() => useFabMenuState())

      expect(result.current.expanded).toBe(false)
    })

    it('toggles expanded state (uncontrolled)', () => {
      const { result } = renderHook(() => useFabMenuState())

      act(() => {
        result.current.toggle()
      })

      expect(result.current.expanded).toBe(true)

      act(() => {
        result.current.toggle()
      })

      expect(result.current.expanded).toBe(false)
    })

    it('closes the menu (uncontrolled)', () => {
      const { result } = renderHook(() => useFabMenuState())

      act(() => {
        result.current.toggle()
      })

      expect(result.current.expanded).toBe(true)

      act(() => {
        result.current.close()
      })

      expect(result.current.expanded).toBe(false)
    })

    it('uses controlled expanded value', () => {
      const { result } = renderHook(() => useFabMenuState(true))

      expect(result.current.expanded).toBe(true)
    })

    it('calls onToggle callback', () => {
      const onToggle = vi.fn()
      const { result } = renderHook(() => useFabMenuState(undefined, onToggle))

      act(() => {
        result.current.toggle()
      })

      expect(onToggle).toHaveBeenCalledWith(true)
    })

    it('calls onToggle with false on close', () => {
      const onToggle = vi.fn()
      const { result } = renderHook(() => useFabMenuState(undefined, onToggle))

      act(() => {
        result.current.toggle()
      })

      act(() => {
        result.current.close()
      })

      expect(onToggle).toHaveBeenLastCalledWith(false)
    })
  })

  describe('useFabMenuItemStyles', () => {
    it('returns correct item styles for solid variant', () => {
      const { result } = renderHook(() =>
        useFabMenuItemStyles('primary', 'solid')
      )

      expect(result.current.iconStyles.backgroundColor).toBe('#1976d2')
      expect(result.current.iconColor).toBe('#ffffff')
      expect(result.current.labelStyles.color).toBe('#1976d2')
      expect(result.current.labelStyles.backgroundColor).toBe('#e3f2fd')
    })

    it('returns correct item styles for flat variant', () => {
      const { result } = renderHook(() =>
        useFabMenuItemStyles('primary', 'flat')
      )

      expect(result.current.iconStyles.backgroundColor).toBe('#e3f2fd')
      expect(result.current.iconColor).toBe('#1976d2')
    })

    it('returns correct icon container dimensions', () => {
      const { result } = renderHook(() =>
        useFabMenuItemStyles('primary', 'solid')
      )

      expect(result.current.iconStyles.width).toBe(48)
      expect(result.current.iconStyles.height).toBe(48)
      expect(result.current.iconStyles.borderRadius).toBe(12)
    })
  })

  describe('useFabMenuOverlayColor', () => {
    it('returns light mode overlay color', () => {
      const { result } = renderHook(() => useFabMenuOverlayColor())

      expect(result.current).toBe('rgba(0, 0, 0, 0.3)')
    })
  })
})
