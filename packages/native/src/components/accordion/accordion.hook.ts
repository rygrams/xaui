import { useState, useCallback, useMemo } from 'react'
import type { ViewStyle } from 'react-native'
import { useXUITheme } from '../../core'
import { colors as palette } from '@xaui/core/palette'
import type { AccordionVariant, AccordionSelectionMode } from './accordion.type'

export const useAccordionStyles = (variant: AccordionVariant, fullWidth: boolean) => {
  const theme = useXUITheme()

  const containerStyles = useMemo<ViewStyle>(() => {
    const base: ViewStyle = {}

    if (fullWidth) {
      base.width = '100%'
    }

    if (variant === 'bordered') {
      base.borderWidth = theme.borderWidth.md
      base.borderColor = palette.gray[200]
      base.borderRadius = theme.borderRadius.md
      base.marginHorizontal = theme.spacing.sm
      base.overflow = 'hidden'
    } else if (variant === 'light') {
      base.paddingHorizontal = theme.spacing.sm
    }

    return base
  }, [variant, fullWidth, theme])

  const dividerColor =
    variant === 'bordered' ? palette.gray[200] : theme.colors.default.foreground
  const dividerOpacity = variant === 'bordered' ? 1 : 0.2

  return { containerStyles, dividerColor, dividerOpacity }
}

export const useAccordionSelection = (
  selectionMode: AccordionSelectionMode,
  expandedKeys: string[] | undefined,
  defaultExpandedKeys: string[],
  onSelectionChange?: (expandedKeys: string[]) => void
) => {
  const [internalExpandedKeys, setInternalExpandedKeys] =
    useState<string[]>(defaultExpandedKeys)

  const isControlled = expandedKeys !== undefined
  const currentExpandedKeys = isControlled ? expandedKeys : internalExpandedKeys

  const toggleItem = useCallback(
    (key: string) => {
      const isExpanded = currentExpandedKeys.includes(key)
      const newExpandedKeys =
        selectionMode === 'toggle'
          ? isExpanded
            ? []
            : [key]
          : isExpanded
            ? currentExpandedKeys.filter(k => k !== key)
            : [...currentExpandedKeys, key]

      if (!isControlled) {
        setInternalExpandedKeys(newExpandedKeys)
      }

      onSelectionChange?.(newExpandedKeys)
    },
    [selectionMode, currentExpandedKeys, isControlled, onSelectionChange]
  )

  return { currentExpandedKeys, toggleItem }
}
