import React, { useState, useCallback, useMemo } from 'react'
import { View, StyleSheet, type ViewStyle } from 'react-native'
import { useXUITheme } from '../../core'
import { AccordionContext } from './accordion-context'
import type { AccordionProps } from './accordion.type'
import type { AccordionItemProps } from './accordion-item.type'
import { AccordionItem } from './accordion-item'
import { colors as palette } from '@xaui/core/palette'

const getItemKey = (value: unknown, fallback: number) => {
  if (value === null || value === undefined) return String(fallback)
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  return String(fallback)
}

const normalizeElementKey = (value: unknown) => {
  if (typeof value !== 'string') return value
  return value.startsWith('.') ? value.slice(1) : value
}

const isAccordionItem = (
  value: React.ReactNode
): value is React.ReactElement<AccordionItemProps> =>
  React.isValidElement(value) &&
  (value.type === AccordionItem ||
    (typeof value.type === 'function' &&
      (value.type as { displayName?: string }).displayName === 'AccordionItem'))

export const Accordion: React.FC<AccordionProps> = ({
  children,
  variant = 'light',
  selectionMode = 'toggle',
  showDivider = false,
  hideIndicator = false,
  fullWidth = true,
  selectedKeys,
  defaultSelectedKeys = [],
  disabledKeys = [],
  disableAnimation = false,
  isCompact = false,
  containerStyle,
  itemStyle,
  onSelectionChange,
}) => {
  const theme = useXUITheme()
  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState<string[]>(defaultSelectedKeys)

  const isControlled = selectedKeys !== undefined
  const currentSelectedKeys = isControlled ? selectedKeys : internalSelectedKeys

  const toggleItem = useCallback(
    (key: string) => {
      let newSelectedKeys: string[]

      if (selectionMode === 'toggle') {
        newSelectedKeys = currentSelectedKeys.includes(key) ? [] : [key]
      } else {
        newSelectedKeys = currentSelectedKeys.includes(key)
          ? currentSelectedKeys.filter(currentKey => currentKey !== key)
          : [...currentSelectedKeys, key]
      }

      if (!isControlled) {
        setInternalSelectedKeys(newSelectedKeys)
      }

      onSelectionChange?.(newSelectedKeys)
    },
    [selectionMode, currentSelectedKeys, isControlled, onSelectionChange]
  )

  const containerStyles = useMemo<ViewStyle>(() => {
    const styles: ViewStyle = {}

    if (fullWidth) {
      styles.width = '100%'
    }

    if (variant === 'bordered') {
      styles.borderWidth = theme.borderWidth.md
      styles.borderColor = palette.gray[200]
      styles.borderRadius = theme.borderRadius.md
      styles.marginHorizontal = theme.spacing.sm
      styles.overflow = 'hidden'
    } else if (variant === 'light') {
      styles.paddingHorizontal = theme.spacing.sm
    }

    return styles
  }, [variant, fullWidth, theme])

  const contextValue = useMemo(
    () => ({
      variant,
      hideIndicator,
      disableAnimation,
      isCompact,
      showDivider,
      expandedKeys: currentSelectedKeys,
      disabledKeys,
      toggleItem,
    }),
    [
      variant,
      hideIndicator,
      disableAnimation,
      isCompact,
      showDivider,
      currentSelectedKeys,
      disabledKeys,
      toggleItem,
    ]
  )

  const childrenArray = React.Children.toArray(children)

  return (
    <AccordionContext.Provider value={contextValue}>
      <View style={[containerStyles, containerStyle]}>
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1
          const showBottomDivider =
            (showDivider || variant === 'bordered') && !isLast && variant !== 'splitted'
          const dividerColor =
            variant === 'bordered' ? palette.gray[200] : theme.colors.default.foreground
          const dividerOpacity = variant === 'bordered' ? 1 : 0.2
          const resolvedChildKey = isAccordionItem(child)
            ? getItemKey(
                child.props.itemKey ?? normalizeElementKey(child.key),
                index
              )
            : getItemKey(
                React.isValidElement(child) ? normalizeElementKey(child.key) : undefined,
                index
              )

          return (
            <View key={index} style={itemStyle}>
              {isAccordionItem(child)
                ? React.cloneElement(child, { itemKey: resolvedChildKey })
                : child}
              {showBottomDivider && (
                <View
                  style={[
                    styles.divider,
                    {
                      backgroundColor: dividerColor,
                      opacity: dividerOpacity,
                    },
                  ]}
                />
              )}
            </View>
          )
        })}
      </View>
    </AccordionContext.Provider>
  )
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
})
