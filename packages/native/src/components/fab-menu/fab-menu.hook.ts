import { useMemo, useState, useCallback } from 'react'
import { useXUITheme } from '../../core'
import { getSafeThemeColor } from '@xaui/core'
import type { ThemeColor } from '../../types'
import type { FabVariant } from '../fab/fab.type'

export function useFabMenuState(
  controlledExpanded?: boolean,
  onToggle?: (expanded: boolean) => void
) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded

  const toggle = useCallback(() => {
    const next = !expanded
    if (!isControlled) {
      setInternalExpanded(next)
    }
    onToggle?.(next)
  }, [expanded, isControlled, onToggle])

  const close = useCallback(() => {
    if (!isControlled) {
      setInternalExpanded(false)
    }
    onToggle?.(false)
  }, [isControlled, onToggle])

  return { expanded, toggle, close }
}

export function useFabMenuItemStyles(
  themeColor: ThemeColor,
  variant: FabVariant
) {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const itemStyles = useMemo(() => {
    const iconContainerSize = 48
    const iconContainerRadius = theme.borderRadius.lg

    const labelStyles = {
      backgroundColor: colorScheme.background,
      borderRadius: theme.borderRadius.md,
      color: colorScheme.main,
      fontSize: theme.fontSizes.sm,
    }

    const iconStyles = {
      width: iconContainerSize,
      height: iconContainerSize,
      borderRadius: iconContainerRadius,
      backgroundColor:
        variant === 'solid' ? colorScheme.main : colorScheme.background,
    }

    const iconColor =
      variant === 'solid' ? colorScheme.foreground : colorScheme.main

    return { labelStyles, iconStyles, iconColor }
  }, [colorScheme, variant, theme])

  return itemStyles
}

export function useFabMenuOverlayColor() {
  const theme = useXUITheme()

  return useMemo(() => {
    return theme.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.5)'
      : 'rgba(0, 0, 0, 0.3)'
  }, [theme.mode])
}
