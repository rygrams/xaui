import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  type LayoutChangeEvent,
} from 'react-native'
import { useXUITheme } from '@xaui/core'
import { colors } from '@xaui/colors'
import { SelectContext } from './select-context'
import type { SelectItemProps, SelectProps } from './select-types'
import { ChevronDownIcon } from './chevron-down-icon'

const defaultPlaceholder = 'Select an option'

type ItemData = {
  key: string
  element: React.ReactElement<SelectItemProps>
  titleText: string
}

export const Select: React.FC<SelectProps> = ({
  children,
  selectionMode = 'single',
  selectedKeys,
  disabledKeys,
  defaultSelectedKeys,
  variant = 'flat',
  themeColor = 'default',
  size = 'md',
  radius = 'md',
  placeholder = defaultPlaceholder,
  labelPlacement = 'outside',
  label,
  hint,
  errorMessage,
  startContent,
  endContent,
  selectorIcon,
  maxListboxHeight = 280,
  fullWidth = true,
  isOpened,
  isDisabled = false,
  isInvalid = false,
  mainStyle,
  textStyle,
  onClose,
  onOpenChange,
  onSelectionChange,
  onClear,
}) => {
  const theme = useXUITheme()
  const triggerRef = useRef<View>(null)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(
    defaultSelectedKeys ?? [],
  )
  const [internalOpen, setInternalOpen] = useState(false)
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null)
  const [triggerPosition, setTriggerPosition] = useState<{
    x: number
    y: number
    height: number
    width: number
  } | null>(null)
  const animationOpacity = useRef(new Animated.Value(0)).current
  const animationScale = useRef(new Animated.Value(0.98)).current

  const isControlledSelection = selectedKeys !== undefined
  const currentSelectedKeys = isControlledSelection
    ? selectedKeys ?? []
    : internalSelectedKeys

  const isOpen = isOpened ?? internalOpen

  const disabledKeySet = useMemo(() => {
    return new Set(disabledKeys ?? [])
  }, [disabledKeys])

  const items = useMemo(() => {
    const elements = React.Children.toArray(children).filter(Boolean)
    return elements
      .map((child, index) => {
        if (!React.isValidElement<SelectItemProps>(child)) {
          return null
        }

        const keyFromElement = typeof child.key === 'string' ? child.key : undefined
        const keyFromTitle =
          typeof child.props.title === 'string' ? child.props.title : undefined
        const key = keyFromElement ?? keyFromTitle ?? String(index)
        const titleText =
          typeof child.props.title === 'string'
            ? child.props.title
            : typeof child.props.title === 'number'
              ? String(child.props.title)
              : key

        return {
          key,
          element: child,
          titleText,
        }
      })
      .filter((item): item is ItemData => item !== null)
  }, [children])

  const selectedLabels = useMemo(() => {
    const labelMap = new Map(items.map((item) => [item.key, item.titleText]))
    return currentSelectedKeys
      .map((key) => labelMap.get(key))
      .filter((value): value is string => Boolean(value))
  }, [currentSelectedKeys, items])

  const displayValue = selectedLabels.length ? selectedLabels.join(', ') : placeholder

  const shouldShowPlaceholder = selectedLabels.length === 0

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen && isDisabled) {
        return
      }

      if (isOpened === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)

      if (!nextOpen) {
        onClose?.()
      }
    },
    [isDisabled, isOpened, onOpenChange, onClose],
  )

  const updateSelection = useCallback(
    (nextKeys: string[]) => {
      if (!isControlledSelection) {
        setInternalSelectedKeys(nextKeys)
      }

      onSelectionChange?.(nextKeys)

      if (nextKeys.length === 0) {
        onClear?.()
      }
    },
    [isControlledSelection, onSelectionChange, onClear],
  )

  const handleItemSelection = useCallback(
    (key: string) => {
      if (isDisabled) {
        return
      }

      const isAlreadySelected = currentSelectedKeys.includes(key)

      if (selectionMode === 'multiple') {
        const nextKeys = isAlreadySelected
          ? currentSelectedKeys.filter((existingKey) => existingKey !== key)
          : [...currentSelectedKeys, key]

        updateSelection(nextKeys)
        return
      }

      if (!isAlreadySelected) {
        updateSelection([key])
      }

      setOpen(false)
    },
    [
      currentSelectedKeys,
      isDisabled,
      selectionMode,
      setOpen,
      updateSelection,
    ],
  )

  const handleClear = () => {
    if (isDisabled || currentSelectedKeys.length === 0) {
      return
    }

    updateSelection([])
  }

  const handleTriggerLayout = (event: LayoutChangeEvent) => {
    setTriggerWidth(event.nativeEvent.layout.width)
  }

  const handleOverlayPress = () => {
    setOpen(false)
  }

  const sizeStyles = useMemo(() => {
    const sizes = {
      sm: {
        minHeight: 36,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
        labelSize: theme.fontSizes.xs,
      },
      md: {
        minHeight: 40,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        fontSize: theme.fontSizes.md,
        labelSize: theme.fontSizes.sm,
      },
      lg: {
        minHeight: 48,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        fontSize: theme.fontSizes.lg,
        labelSize: theme.fontSizes.md,
      },
    }

    return sizes[size]
  }, [size, theme])

  const radiusStyles = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: radii[radius] }
  }, [radius, theme])

  const listboxRadius = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return Math.min(radii[radius], theme.borderRadius.lg)
  }, [radius, theme])

  const colorScheme = theme.colors[themeColor]

  const variantStyles = useMemo(() => {
    let borderColor = isInvalid ? theme.colors.danger.main : colorScheme.main

    if ((variant === 'outlined' || variant === 'faded') && themeColor === 'default') {
      borderColor = colors.gray[300]
    }

    const styles = {
      outlined: {
        backgroundColor: colors.transparent,
        borderWidth: theme.borderWidth.md,
        borderColor,
      },
      flat: {
        backgroundColor: colorScheme.background,
        borderWidth: 0,
      },
      light: {
        backgroundColor: colors.transparent,
        borderWidth: 0,
      },
      faded: {
        backgroundColor: `${colorScheme.background}90`,
        borderWidth: theme.borderWidth.md,
        borderColor,
      },
      underlined: {
        backgroundColor: colors.transparent,
        borderBottomWidth: theme.borderWidth.md,
        borderColor,
      },
    }
    return styles[variant]
  }, [variant, theme, colorScheme, isInvalid, themeColor])

  const labelStyle = useMemo(() => {
    const baseColor = isInvalid ? theme.colors.danger.main : theme.colors.foreground
    return {
      fontSize: sizeStyles.labelSize,
      color: baseColor,
    }
  }, [isInvalid, sizeStyles.labelSize, theme])

  const valueColor = useMemo(() => {
    if (isInvalid) {
      return theme.colors.danger.main
    }

    if (shouldShowPlaceholder) {
      return colors.gray[500]
    }

    return theme.colors.foreground
  }, [isInvalid, shouldShowPlaceholder, theme])

  const renderLabel = label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null

  const renderSelectorIcon = selectorIcon ?? (
    <ChevronDownIcon color={colors.gray[700]} size={16} isOpen={isOpen} />
  )

  const shouldShowHelper = Boolean(hint || errorMessage)
  const helperContent = isInvalid && errorMessage ? errorMessage : hint

  const listboxWidth = fullWidth
    ? triggerWidth ?? triggerPosition?.width ?? 200
    : 280

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const measureTrigger = () => {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerPosition({ x, y, width, height })
      })
    }

    const frameId = requestAnimationFrame(measureTrigger)

    animationOpacity.setValue(0)
    animationScale.setValue(0.98)
    Animated.parallel([
      Animated.timing(animationOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(animationScale, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start()
    return () => cancelAnimationFrame(frameId)
  }, [isOpen, animationOpacity, animationScale])

  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const listboxPosition = useMemo(() => {
    if (!triggerPosition) {
      return { top: 0, left: 0 }
    }

    const listWidth = listboxWidth || 0
    const centeredLeft = triggerPosition.x + triggerPosition.width / 2 - listWidth / 2
    const left = Math.max(12, Math.min(centeredLeft, screenWidth - listWidth - 12))
    const top = Math.min(
      triggerPosition.y + triggerPosition.height + 8,
      screenHeight - maxListboxHeight - 12,
    )

    return { top, left }
  }, [triggerPosition, listboxWidth, screenWidth, screenHeight, maxListboxHeight])

  const listItems = items.map((item) => {
    const itemProps = item.element.props
    const itemDisabled = isDisabled || itemProps.isDisabled || disabledKeySet.has(item.key)
    const itemSelected = itemProps.isSelected ?? currentSelectedKeys.includes(item.key)

    const handleItemSelected = () => {
      if (itemDisabled || itemProps.isReadOnly) {
        return
      }

      handleItemSelection(item.key)
      itemProps.onSelected?.()
    }

    return React.cloneElement(item.element, {
      key: item.key,
      isDisabled: itemDisabled,
      isSelected: itemSelected,
      onSelected: handleItemSelected,
    })
  })

  const isLabelInside = labelPlacement === 'inside'
  const isLabelOutsideLeft = labelPlacement === 'outside-left'
  const isLabelOutside = labelPlacement === 'outside' || labelPlacement === 'outside-top'

  const triggerContent = (
    <View ref={triggerRef} collapsable={false}>
      <Pressable
        onPress={() => setOpen(!isOpen)}
        disabled={isDisabled}
        onLayout={handleTriggerLayout}
        style={[
          styles.trigger,
          radiusStyles,
          variantStyles,
          {
            minHeight: sizeStyles.minHeight,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            paddingVertical: sizeStyles.paddingVertical,
          },
          isDisabled && styles.disabled,
          mainStyle,
        ]}
      >
      <View style={[styles.triggerContent, isLabelInside && styles.triggerContentColumn]}>
        {startContent}
        <View style={styles.valueWrapper}>
          {isLabelInside && renderLabel}
          <Text style={[styles.valueText, { fontSize: sizeStyles.fontSize, color: valueColor }, textStyle]}>
            {displayValue}
          </Text>
        </View>
        {endContent}
      </View>
      <View style={styles.endSlot}>
        {onClear && currentSelectedKeys.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Text style={styles.clearText}>x</Text>
          </Pressable>
        )}
        {renderSelectorIcon}
      </View>
    </Pressable>
    </View>
  )

  const labelBlock = isLabelOutside || isLabelInside ? renderLabel : null

  return (
    <View style={[styles.container, fullWidth ? styles.fullWidth : styles.minWidth]}>
      {isLabelOutside && labelBlock}
      {isLabelOutsideLeft ? (
        <View style={styles.outsideLeftRow}>
          {renderLabel}
          {triggerContent}
        </View>
      ) : (
        triggerContent
      )}
      {shouldShowHelper && helperContent && (
        <Text
          style={[
            styles.helperText,
            { color: isInvalid ? theme.colors.danger.main : colors.gray[600] },
          ]}
        >
          {helperContent}
        </Text>
      )}

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleOverlayPress}>
        <Pressable style={styles.overlay} onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.listbox,
              {
                width: listboxWidth,
                maxHeight: maxListboxHeight,
                position: 'absolute',
                top: listboxPosition.top,
                left: listboxPosition.left,
                borderRadius: listboxRadius,
                opacity: animationOpacity,
                transform: [{ scale: animationScale }],
              },
            ]}
          >
            <Pressable onPress={(event) => event.stopPropagation()} style={{ flex: 1 }}>
              <SelectContext.Provider value={{ size, themeColor, isDisabled }}>
                <ScrollView>{listItems}</ScrollView>
              </SelectContext.Provider>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  fullWidth: {
    width: '100%',
  },
  minWidth: {
    minWidth: 200,
  },
  label: {
    fontWeight: '500',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  triggerContentColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  valueWrapper: {
    flex: 1,
    gap: 2,
  },
  valueText: {
    flexShrink: 1,
  },
  endSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  clearText: {
    fontSize: 12,
    color: colors.gray[700],
  },
  helperText: {
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  listbox: {
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  outsideLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
})
