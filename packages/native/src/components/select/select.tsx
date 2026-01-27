import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native'
import { SelectContext } from './select-context'
import type { SelectItemProps, SelectProps } from './select.type'
import { ChevronDownIcon } from './chevron-down-icon'
import { useSelectStyles } from './select.hook'
import { styles } from './select.style'

const defaultPlaceholder = 'Select an option'

type ItemData = {
  key: string
  element: React.ReactElement<SelectItemProps>
  labelText: string
}

const getTextValue = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return undefined
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
  fullWidth = false,
  isOpened,
  isDisabled = false,
  isInvalid = false,
  style,
  textStyle,
  onClose,
  onOpenChange,
  onSelectionChange,
  onClear,
}) => {
  const triggerRef = useRef<View>(null)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState(
    defaultSelectedKeys ?? []
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
    ? (selectedKeys ?? [])
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

        const key = child.props.value ?? String(index)
        const labelText = getTextValue(child.props.label) ?? key

        return {
          key,
          element: child,
          labelText,
        }
      })
      .filter((item): item is ItemData => item !== null)
  }, [children])

  const selectedLabels = useMemo(() => {
    const labelMap = new Map(items.map(item => [item.key, item.labelText]))

    return currentSelectedKeys
      .map(key => labelMap.get(key))
      .filter((value): value is string => Boolean(value))
  }, [currentSelectedKeys, items])

  const displayValue = selectedLabels.length ? selectedLabels.join(', ') : placeholder

  const shouldShowPlaceholder = selectedLabels.length === 0

  const {
    theme,
    sizeStyles,
    radiusStyles,
    listboxRadius,
    variantStyles,
    labelStyle,
    valueColor,
    helperColor,
    selectorColor,
  } = useSelectStyles(themeColor, variant, size, radius, isInvalid, shouldShowPlaceholder)

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
    [isDisabled, isOpened, onOpenChange, onClose]
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
    [isControlledSelection, onSelectionChange, onClear]
  )

  const handleItemSelection = useCallback(
    (key: string) => {
      if (isDisabled) {
        return
      }

      const isAlreadySelected = currentSelectedKeys.includes(key)

      if (selectionMode === 'multiple') {
        const nextKeys = isAlreadySelected
          ? currentSelectedKeys.filter(existingKey => existingKey !== key)
          : [...currentSelectedKeys, key]

        updateSelection(nextKeys)
        return
      }

      if (!isAlreadySelected) {
        updateSelection([key])
      }

      setOpen(false)
    },
    [currentSelectedKeys, isDisabled, selectionMode, setOpen, updateSelection]
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

  const renderLabel = label
    ? typeof label === 'string' || typeof label === 'number'
      ? (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        )
      : (
          <View>{label}</View>
        )
    : null
  const dialogTitle =
    typeof label === 'string' || typeof label === 'number' ? String(label) : undefined

  const renderSelectorIcon = selectorIcon ?? (
    <ChevronDownIcon color={selectorColor} size={16} isOpen={isOpen} />
  )

  const shouldShowHelper = Boolean(hint || errorMessage)
  const helperContent = isInvalid && errorMessage ? errorMessage : hint

  const listboxWidth = fullWidth
    ? (triggerWidth ?? triggerPosition?.width ?? 200)
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

    const frameId = globalThis.setTimeout(measureTrigger, 0)

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

    return () => globalThis.clearTimeout(frameId)
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
    const top = Math.max(12, triggerPosition.y)

    return { top, left }
  }, [triggerPosition, listboxWidth, screenWidth, screenHeight, maxListboxHeight])

  const listItems = items.map(item => {
    const itemProps = item.element.props
    const itemDisabled =
      isDisabled || itemProps.isDisabled || disabledKeySet.has(item.key)
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
        accessibilityRole="button"
        accessibilityLabel={typeof label === 'string' ? label : undefined}
        accessibilityState={{ disabled: isDisabled, expanded: isOpen }}
        style={[
          styles.trigger,
          radiusStyles,
          variantStyles,
          {
            minHeight: sizeStyles.minHeight,
            paddingHorizontal: variant === 'underlined' ? 2 : sizeStyles.paddingHorizontal,
            paddingVertical: sizeStyles.paddingVertical,
          },
          isDisabled && styles.disabled,
          style,
        ]}
      >
        <View
          style={[styles.triggerContent, isLabelInside && styles.triggerContentColumn]}
        >
          {startContent}
          <View style={styles.valueWrapper}>
            {isLabelInside && renderLabel}
            <Text
              style={[
                styles.valueText,
                { fontSize: sizeStyles.fontSize, color: valueColor },
                textStyle,
              ]}
            >
              {displayValue}
            </Text>
          </View>
          {endContent}
        </View>
        <View style={styles.endSlot}>
          {onClear && currentSelectedKeys.length > 0 && (
            <Pressable onPress={handleClear} style={styles.clearButton}>
              <Text style={[styles.clearText, { color: selectorColor }]}>x</Text>
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
      {shouldShowHelper && helperContent
        ? typeof helperContent === 'string' || typeof helperContent === 'number'
          ? (
              <Text style={[styles.helperText, { color: helperColor }]}>
                {helperContent}
              </Text>
            )
          : (
              <View>{helperContent}</View>
            )
        : null}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleOverlayPress}
      >
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
                backgroundColor: theme.colors.background,
                opacity: animationOpacity,
                transform: [{ scale: animationScale }],
                ...theme.shadows.md,
              },
            ]}
          >
            <Pressable onPress={event => event.stopPropagation()} style={{ flex: 1 }}>
              <SelectContext.Provider value={{ size, themeColor, isDisabled }}>
                <View style={styles.listboxContent}>
                  {dialogTitle ? (
                    <Text
                      style={[
                        styles.dialogTitle,
                        { color: theme.colors.foreground },
                      ]}
                    >
                      {dialogTitle}
                    </Text>
                  ) : null}
                  <ScrollView>{listItems}</ScrollView>
                </View>
              </SelectContext.Provider>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  )
}
