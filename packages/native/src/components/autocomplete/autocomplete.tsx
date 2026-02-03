import React, { useCallback, useMemo } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { AutocompleteContext } from './autocomplete-context'
import type { AutocompleteItemProps, AutocompleteProps } from './autocomplete.type'
import {
  useAutocompleteHelperColor,
  useAutocompleteLabelStyle,
  useAutocompleteRadiusStyles,
  useAutocompleteSizeStyles,
  useAutocompleteVariantStyles,
} from './autocomplete.hook'
import { styles } from './autocomplete.style'
import { useXUITheme } from '../../core'
import {
  useAutocompleteInputState,
  useAutocompleteOpenState,
  useAutocompleteSelection,
} from './autocomplete.state.hook'
import { defaultFilterFunction, getTextValue } from './autocomplete.utils'
import { AutocompleteDialog } from '../dialogs/autocomplete-dialog'

const defaultPlaceholder = 'Search...'

const CloseIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <Text style={{ fontSize: size, color, lineHeight: size }}>×</Text>
)

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
  clearIcon,
  fullWidth = false,
  isDisabled = false,
  isInvalid = false,
  isClearable = true,
  allowsCustomValue = false,
  allowsEmptyCollection = true,
  selectedKey,
  defaultSelectedKey,
  inputValue,
  defaultInputValue,
  disabledKeys,
  style,
  textStyle,
  onClose,
  onOpenChange,
  onSelectionChange,
  onInputChange,
  onClear,
}) => {
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
  const { radiusStyles } = useAutocompleteRadiusStyles(radius)
  const variantStyles = useAutocompleteVariantStyles(themeColor, variant, isInvalid)
  const labelStyle = useAutocompleteLabelStyle(
    themeColor,
    isInvalid,
    sizeStyles.labelSize
  )
  const helperColor = useAutocompleteHelperColor(isInvalid)

  const selectedItem = items.find(item => item.key === currentSelectedKey)
  const displayValue = selectedItem?.labelText || placeholder

  const handleInputChange = useCallback(
    (text: string) => {
      updateInputValue(text)

      if (!text.trim() && !allowsCustomValue) {
        updateSelection(null)
      }
    },
    [updateInputValue, allowsCustomValue, updateSelection]
  )

  const handleItemSelection = useCallback(
    (key: string, itemLabel: string) => {
      if (isDisabled) {
        return
      }

      updateSelection(key)
      updateInputValue(itemLabel)
      setOpen(false)
    },
    [isDisabled, updateSelection, updateInputValue, setOpen]
  )

  const handleCheckmark = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleClear = useCallback(() => {
    if (isDisabled) {
      return
    }

    updateSelection(null)
    updateInputValue('')
    onClear?.()
  }, [isDisabled, updateSelection, updateInputValue, onClear])

  const handleTriggerPress = useCallback(() => {
    if (!isDisabled) {
      setOpen(true)
    }
  }, [isDisabled, setOpen])

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

  const renderLabel = label ? (
    typeof label === 'string' || typeof label === 'number' ? (
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    ) : (
      <View>{label}</View>
    )
  ) : null

  const shouldShowHelper = Boolean(description || errorMessage)
  const helperContent = isInvalid && errorMessage ? errorMessage : description

  const triggerContent = (
    <Pressable
      onPress={handleTriggerPress}
      disabled={isDisabled}
      style={[
        styles.trigger,
        {
          minHeight: sizeStyles.minHeight,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
        radiusStyles,
        variantStyles,
        isDisabled && styles.disabled,
        style,
      ]}
      accessibilityLabel={typeof label === 'string' ? label : undefined}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <View style={styles.triggerContent}>
        {isLabelInside && renderLabel}
        <Text
          style={[
            styles.triggerText,
            { fontSize: sizeStyles.fontSize, color: theme.colors.foreground },
            !currentSelectedKey && { opacity: 0.5 },
            textStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {displayValue}
        </Text>
      </View>
      {isClearable && currentSelectedKey ? (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          {clearIcon ?? <CloseIcon color={theme.colors.foreground} size={20} />}
        </TouchableOpacity>
      ) : null}
    </Pressable>
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

      <AutocompleteDialog
        visible={isOpen}
        inputValue={currentInputValue}
        placeholder={placeholder}
        title={typeof label === 'string' ? label : undefined}
        themeColor={themeColor}
        onInputChange={handleInputChange}
        onClose={() => setOpen(false)}
        onCheckmark={handleCheckmark}
      >
        <AutocompleteContext.Provider value={{ size, themeColor, isDisabled }}>
          {showEmptyMessage ? (
            <Text style={[styles.emptyMessage, { color: theme.colors.foreground }]}>
              No results found
            </Text>
          ) : (
            listItems
          )}
        </AutocompleteContext.Provider>
      </AutocompleteDialog>
    </View>
  )
}
