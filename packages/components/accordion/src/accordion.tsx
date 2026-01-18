import React, { useState, useCallback, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { useXUITheme } from '@xaui/core'
import { AccordionContext } from './accordion-context'
import type { AccordionProps } from './accordion-types'

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
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(
    defaultSelectedKeys
  )

  const isControlled = selectedKeys !== undefined
  const currentSelectedKeys = isControlled ? selectedKeys : internalSelectedKeys

  const toggleItem = useCallback(
    (key: string) => {
      let newSelectedKeys: string[]

      if (selectionMode === 'toggle') {
        newSelectedKeys = currentSelectedKeys.includes(key) ? [] : [key]
      } else {
        newSelectedKeys = currentSelectedKeys.includes(key)
          ? currentSelectedKeys.filter((k) => k !== key)
          : [...currentSelectedKeys, key]
      }

      if (!isControlled) {
        setInternalSelectedKeys(newSelectedKeys)
      }

      onSelectionChange?.(newSelectedKeys)
    },
    [selectionMode, currentSelectedKeys, isControlled, onSelectionChange]
  )

  const containerStyles = useMemo(() => {
    const styles: any = {}

    if (fullWidth) {
      styles.width = '100%'
    }

    if (variant === 'bordered') {
      styles.borderWidth = theme.borderWidth.sm
      styles.borderColor = theme.colors.default.foreground
      styles.borderRadius = theme.borderRadius.md
      styles.paddingHorizontal = theme.spacing.lg
    } else if (variant === 'splitted') {
      styles.paddingHorizontal = theme.spacing.sm
    } else {
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
      <View style={[containerStyles, containerStyle]} role="group">
        {childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1
          const showBottomDivider = showDivider && !isLast && variant !== 'splitted'

          return (
            <View key={index} style={itemStyle}>
              {child}
              {showBottomDivider && (
                <View
                  style={[
                    styles.divider,
                    {
                      backgroundColor: theme.colors.default.foreground,
                      opacity: 0.2,
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
