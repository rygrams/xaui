import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, ScrollView, Text, View } from 'react-native'
import { AutocompleteContext } from './autocomplete-context'
import type { AutocompleteItemProps, AutocompleteProps } from './autocomplete.type'
import {
  useAutocompleteHelperColor,
  useAutocompleteInputColor,
  useAutocompleteLabelStyle,
  useAutocompletePlaceholderColor,
  useAutocompleteRadiusStyles,
  useAutocompleteSelectorColor,
  useAutocompleteSizeStyles,
  useAutocompleteVariantStyles,
} from './autocomplete.hook'
import { styles } from './autocomplete.style'
import { useXUITheme } from '../../core'
import { AutocompleteTrigger } from './autocomplete-trigger'
import {
  useAutocompleteListboxAnimation,
  useAutocompleteSelectorAnimation,
} from './autocomplete.animation'
import {
  useAutocompleteInputState,
  useAutocompleteOpenState,
  useAutocompleteSelection,
  useAutocompleteTriggerMeasurements,
} from './autocomplete.state.hook'
import { defaultFilterFunction, getTextValue } from './autocomplete.utils'

const defaultPlaceholder = 'Search...'

type ItemData = {
  key: string
  element: React.ReactElement<AutocompleteItemProps>
  labelText: string
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  children,
  variant = 'flat',
  themeColor = 'default',
  size = 'md',
  radius = 'md',
  placeholder = defaultPlaceholder,
  labelPlacement = 'outside',
  label,
  description,
  errorMessage,
  startContent,
  endContent,
  selectorIcon,
  clearIcon,
  maxListboxHeight = 280,
  fullWidth = false,
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
  isClearable = true,
  allowsCustomValue = false,
  allowsEmptyCollection = true,
  disableAnimation = false,
  disableSelectorIconRotation = false,
  selectedKey,
  defaultSelectedKey,
  inputValue,
  defaultInputValue,
  disabledKeys,
  menuTrigger = 'focus',
  style,
  textStyle,
  onClose,
  onOpenChange,
  onSelectionChange,
  onInputChange,
  onClear,
  onFocus,
  onBlur,
}) => {
  const [isFocused, setFocused] = useState(false)
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const isInteractingWithListboxRef = useRef(false)

  const { currentSelectedKey, updateSelection } = useAutocompleteSelection({
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
  })

  const { currentInputValue, updateInputValue } = useAutocompleteInputState({
    inputValue,
    defaultInputValue,
    selectedKey: currentSelectedKey,
    onInputChange,
  })

  const { isOpen, setOpen } = useAutocompleteOpenState({
    isOpened: undefined,
    isDisabled,
    onOpenChange,
    onClose,
  })

  const { triggerRef, triggerWidth, triggerHeight, handleTriggerLayout } =
    useAutocompleteTriggerMeasurements()
  const { animationOpacity, animationScale } = useAutocompleteListboxAnimation(
    isOpen && !disableAnimation
  )
  const { rotation } = useAutocompleteSelectorAnimation(
    isOpen,
    disableSelectorIconRotation
  )

  const disabledKeySet = useMemo(() => {
    return new Set(disabledKeys ?? [])
  }, [disabledKeys])

  const items = useMemo(() => {
    const elements = React.Children.toArray(children).filter(Boolean)

    return elements
      .map((child, index) => {
        if (!React.isValidElement<AutocompleteItemProps>(child)) {
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

  const filteredItems = useMemo(() => {
    if (!currentInputValue.trim()) {
      return items
    }

    return items.filter(item => defaultFilterFunction(item.labelText, currentInputValue))
  }, [items, currentInputValue])

  const theme = useXUITheme()
  const sizeStyles = useAutocompleteSizeStyles(size)
  const { radiusStyles, listboxRadius } = useAutocompleteRadiusStyles(radius)
  const variantStyles = useAutocompleteVariantStyles(themeColor, variant, isInvalid)
  const labelStyle = useAutocompleteLabelStyle(
    themeColor,
    isInvalid,
    sizeStyles.labelSize
  )
  const inputColor = useAutocompleteInputColor(isInvalid)
  const placeholderColor = useAutocompletePlaceholderColor()
  const helperColor = useAutocompleteHelperColor(isInvalid)
  const selectorColor = useAutocompleteSelectorColor(
    isInvalid,
    Boolean(currentInputValue || currentSelectedKey)
  )

  const handleInputChange = useCallback(
    (text: string) => {
      updateInputValue(text)

      if (menuTrigger === 'input' && text.trim()) {
        setOpen(true)
      }

      if (!text.trim() && !allowsCustomValue) {
        updateSelection(null)
      }
    },
    [updateInputValue, menuTrigger, setOpen, allowsCustomValue, updateSelection]
  )

  const handleItemSelection = useCallback(
    (key: string, itemLabel: string) => {
      if (isDisabled || isReadOnly) {
        return
      }

      updateSelection(key)
      updateInputValue(itemLabel)
      setOpen(false)
    },
    [isDisabled, isReadOnly, updateSelection, updateInputValue, setOpen]
  )

  const handleClear = useCallback(() => {
    if (isDisabled || (!currentInputValue && !currentSelectedKey)) {
      return
    }

    updateSelection(null)
    updateInputValue('')
    onClear?.()
  }, [
    isDisabled,
    currentInputValue,
    currentSelectedKey,
    updateSelection,
    updateInputValue,
    onClear,
  ])

  const handleFocus = useCallback(() => {
    setFocused(true)

    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }

    if (menuTrigger === 'focus') {
      setOpen(true)
    }

    onFocus?.()
  }, [menuTrigger, setOpen, onFocus])

  const handleBlur = useCallback(() => {
    setFocused(false)

    blurTimeoutRef.current = setTimeout(() => {
      if (!isInteractingWithListboxRef.current) {
        setOpen(false)
      }
    }, 200)

    onBlur?.()
  }, [onBlur, setOpen])

  const handleListboxTouchStart = useCallback(() => {
    isInteractingWithListboxRef.current = true
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current)
    }
  }, [])

  const handleListboxTouchEnd = useCallback(() => {
    isInteractingWithListboxRef.current = false
  }, [])

  const renderLabel = label ? (
    typeof label === 'string' || typeof label === 'number' ? (
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    ) : (
      <View>{label}</View>
    )
  ) : null

  const shouldShowHelper = Boolean(description || errorMessage)
  const helperContent = isInvalid && errorMessage ? errorMessage : description

  const listboxWidth = triggerWidth || 280
  const listboxTop = (triggerHeight ?? 0) + 4

  const listItems = filteredItems.map(item => {
    const itemProps = item.element.props
    const itemDisabled =
      isDisabled || itemProps.isDisabled || disabledKeySet.has(item.key)
    const itemSelected = itemProps.isSelected ?? currentSelectedKey === item.key

    const handleItemSelected = () => {
      if (itemDisabled || itemProps.isReadOnly) {
        return
      }

      handleItemSelection(item.key, item.labelText)
      itemProps.onSelected?.()
    }

    return React.cloneElement(item.element, {
      key: item.key,
      isDisabled: itemDisabled,
      isSelected: itemSelected,
      onSelected: handleItemSelected,
    })
  })

  const showEmptyMessage = !allowsEmptyCollection && listItems.length === 0

  const isLabelInside = labelPlacement === 'inside'
  const isLabelOutsideLeft = labelPlacement === 'outside-left'
  const isLabelOutside = labelPlacement === 'outside' || labelPlacement === 'outside-top'

  const triggerContent = (
    <View style={styles.triggerWrapper}>
      <AutocompleteTrigger
        triggerRef={triggerRef}
        _isOpen={isOpen}
        isDisabled={isDisabled}
        _isFocused={isFocused}
        inputValue={currentInputValue}
        placeholder={placeholder}
        variant={variant}
        sizeStyles={sizeStyles}
        radiusStyles={radiusStyles}
        variantStyles={variantStyles}
        inputColor={inputColor}
        placeholderColor={placeholderColor}
        selectorColor={selectorColor}
        labelInside={isLabelInside}
        labelNode={renderLabel}
        startContent={startContent}
        endContent={endContent}
        selectorIcon={selectorIcon}
        clearIcon={clearIcon}
        showClear={isClearable && Boolean(currentInputValue || currentSelectedKey)}
        selectorRotation={rotation}
        onPress={() => setOpen(!isOpen)}
        onInputChange={handleInputChange}
        onClear={handleClear}
        onLayout={handleTriggerLayout}
        onFocus={handleFocus}
        onBlur={handleBlur}
        textStyle={textStyle}
        style={style}
      />

      {isOpen && (filteredItems.length > 0 || showEmptyMessage) ? (
        <Animated.View
          onTouchStart={handleListboxTouchStart}
          onTouchEnd={handleListboxTouchEnd}
          style={[
            styles.listbox,
            {
              width: listboxWidth || 300,
              maxHeight: maxListboxHeight,
              top: listboxTop,
              borderRadius: listboxRadius,
              backgroundColor: theme.colors.background,
              opacity: disableAnimation ? 1 : animationOpacity,
              transform: [{ scale: disableAnimation ? 1 : animationScale }],
              ...theme.shadows.md,
            },
          ]}
        >
          <AutocompleteContext.Provider value={{ size, themeColor, isDisabled }}>
            <View style={styles.listboxContent}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="none"
                nestedScrollEnabled
                style={{ maxHeight: maxListboxHeight }}
              >
                {showEmptyMessage ? (
                  <Text style={[styles.emptyMessage, { color: theme.colors.foreground }]}>
                    No results found
                  </Text>
                ) : (
                  listItems
                )}
              </ScrollView>
            </View>
          </AutocompleteContext.Provider>
        </Animated.View>
      ) : null}
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
      {shouldShowHelper && helperContent ? (
        typeof helperContent === 'string' || typeof helperContent === 'number' ? (
          <Text style={[styles.helperText, { color: helperColor }]}>{helperContent}</Text>
        ) : (
          <View>{helperContent}</View>
        )
      ) : null}

      {null}
    </View>
  )
}
