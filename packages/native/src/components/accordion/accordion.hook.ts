import { useState, useCallback, useMemo } from 'react'
import type { ViewStyle } from 'react-native'
import { useXUITheme } from '../../core'
import type { AccordionVariant, AccordionSelectionMode } from './accordion.type'
import { useXUIPalette } from '../../core/theme-hooks'

interface AccordionStylesConfig {
  variant: AccordionVariant
  fullWidth: boolean
}

interface AccordionSelectionConfig {
  selectionMode: AccordionSelectionMode
  expandedKeys?: string[]
  defaultExpandedKeys: string[]
  onSelectionChange?: (expandedKeys: string[]) => void
}

interface AccordionContextConfig {
  variant: AccordionVariant
  hideIndicator: boolean
  disableAnimation: boolean
  isCompact: boolean
  showDivider: boolean
  expandedKeys?: string[]
  defaultExpandedKeys: string[]
  disabledKeys: string[]
  selectionMode: AccordionSelectionMode
  onSelectionChange?: (expandedKeys: string[]) => void
}

export const useAccordionStyles = ({ variant, fullWidth }: AccordionStylesConfig) => {
  const theme = useXUITheme()
  const palette = useXUIPalette()

  const containerStyles = useMemo<ViewStyle>(() => {
    const base: ViewStyle = {}

    if (fullWidth) {
      base.width = '100%'
    }

    if (variant === 'bordered') {
      base.borderWidth = theme.borderWidth.md
      base.borderColor =
        theme.mode === 'dark' ? palette.gray[800] : theme.palette.gray[200]
      base.borderRadius = theme.borderRadius.md
      base.marginHorizontal = theme.spacing.sm
      base.overflow = 'hidden'
    } else if (variant === 'light') {
      base.paddingHorizontal = theme.spacing.sm
    }

    return base
  }, [variant, fullWidth, theme])

  const dividerColor: string | undefined =
    variant === 'bordered'
      ? (containerStyles.borderColor as string | undefined)
      : theme.mode === 'dark'
        ? palette.gray[800]
        : theme.palette.gray[200]
  const dividerOpacity = variant === 'bordered' ? 1 : 0.2

  return { containerStyles, dividerColor, dividerOpacity }
}

export const useAccordionSelection = ({
  selectionMode,
  expandedKeys,
  defaultExpandedKeys,
  onSelectionChange,
}: AccordionSelectionConfig) => {
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

export const useAccordionContextValue = (config: AccordionContextConfig) => {
  const { currentExpandedKeys, toggleItem } = useAccordionSelection({
    selectionMode: config.selectionMode,
    expandedKeys: config.expandedKeys,
    defaultExpandedKeys: config.defaultExpandedKeys,
    onSelectionChange: config.onSelectionChange,
  })

  return useMemo(
    () => ({
      variant: config.variant,
      hideIndicator: config.hideIndicator,
      disableAnimation: config.disableAnimation,
      isCompact: config.isCompact,
      showDivider: config.showDivider,
      expandedKeys: currentExpandedKeys,
      disabledKeys: config.disabledKeys,
      toggleItem,
    }),
    [
      config.variant,
      config.hideIndicator,
      config.disableAnimation,
      config.isCompact,
      config.showDivider,
      currentExpandedKeys,
      config.disabledKeys,
      toggleItem,
    ]
  )
}
