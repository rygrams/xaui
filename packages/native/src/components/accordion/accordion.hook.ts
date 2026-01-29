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
  selectedKeys: string[] | undefined,
  defaultSelectedKeys: string[],
  onSelectionChange?: (selectedKeys: string[]) => void
) => {
  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState<string[]>(defaultSelectedKeys)

  const isControlled = selectedKeys !== undefined
  const currentSelectedKeys = isControlled ? selectedKeys : internalSelectedKeys

  const toggleItem = useCallback(
    (key: string) => {
      const isSelected = currentSelectedKeys.includes(key)
      const newSelectedKeys =
        selectionMode === 'toggle'
          ? isSelected
            ? []
            : [key]
          : isSelected
            ? currentSelectedKeys.filter((k) => k !== key)
            : [...currentSelectedKeys, key]

      if (!isControlled) {
        setInternalSelectedKeys(newSelectedKeys)
      }

      onSelectionChange?.(newSelectedKeys)
    },
    [selectionMode, currentSelectedKeys, isControlled, onSelectionChange]
  )

  return { currentSelectedKeys, toggleItem }
}
