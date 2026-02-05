import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Text, View } from 'react-native'
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
import type { TriggerLayout } from '../dialogs/autocomplete-dialog/autocomplete-dialog.type'
import { AutocompleteTrigger } from './autocomplete-trigger'

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
  clearIcon,
  fullWidth = false,
  isDisabled = false,
  isInvalid = false,
  isClearable = true,
  allowsCustomValue = false,
  allowsEmptyCollection = true,
  disableLocalFilter = false,
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

  const triggerRef = useRef<View>(null)
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | undefined>()

  const handleTriggerLayout = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height })
    })
  }, [])

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
    if (disableLocalFilter || !currentInputValue.trim()) {
      return items
    }

    return items.filter(item => defaultFilterFunction(item.labelText, currentInputValue))
  }, [disableLocalFilter, items, currentInputValue])

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
  const displayValue = selectedItem?.labelText || currentInputValue || placeholder

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
      if (selectedItem && !currentInputValue) {
        updateInputValue(selectedItem.labelText)
      }
      setOpen(true)
    }
  }, [isDisabled, setOpen, selectedItem, currentInputValue, updateInputValue])

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
    <AutocompleteTrigger
      triggerRef={triggerRef}
      isDisabled={isDisabled}
      currentSelectedKey={currentSelectedKey}
      currentInputValue={currentInputValue}
      displayValue={displayValue}
      sizeStyles={sizeStyles}
      radiusStyles={radiusStyles}
      variantStyles={variantStyles}
      theme={theme}
      isClearable={isClearable}
      label={renderLabel}
      labelText={typeof label === 'string' ? label : undefined}
      isLabelInside={isLabelInside}
      clearIcon={clearIcon}
      style={style}
      textStyle={textStyle}
      onPress={handleTriggerPress}
      onClear={handleClear}
      onLayout={handleTriggerLayout}
    />
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
        _triggerLayout={triggerLayout}
        showCheckmark={false}
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
