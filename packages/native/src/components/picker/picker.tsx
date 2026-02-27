import React, { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import { BottomSheet } from '../bottom-sheet/bottom-sheet'
import { InputTrigger } from '../input-trigger/input-trigger'
import { styles } from './picker.style'
import type { PickerOption, PickerProps } from './picker.type'

const ChevronDownIcon: React.FC<{ color: string; size: number }> = ({
  color,
  size,
}) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.5,
        height: size * 0.5,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: -(size * 0.15),
      }}
    />
  </View>
)

const CheckIcon: React.FC<{ color: string }> = ({ color }) => (
  <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: 6,
        height: 10,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: -3,
      }}
    />
  </View>
)

type OptionItemProps = {
  option: PickerOption
  isSelected: boolean
  themeColor: string
  foreground: string
  onSelect: (value: string) => void
}

const OptionItem: React.FC<OptionItemProps> = ({
  option,
  isSelected,
  themeColor,
  foreground,
  onSelect,
}) => {
  const handlePress = () => {
    if (!option.disabled) {
      onSelect(option.value)
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.optionItem, option.disabled && styles.optionItemDisabled]}
      disabled={option.disabled}
    >
      <Text
        style={[
          styles.optionLabel,
          { color: isSelected ? themeColor : foreground },
        ]}
      >
        {option.label}
      </Text>
      {isSelected && <CheckIcon color={themeColor} />}
    </Pressable>
  )
}

export const Picker: React.FC<PickerProps> = ({
  options,
  value,
  placeholder = 'Select an option...',
  label,
  labelPlacement = 'outside',
  description,
  errorMessage,
  sheetTitle,
  themeColor = 'primary',
  variant = 'colored',
  size = 'md',
  radius = 'md',
  isOpened,
  isDisabled = false,
  isInvalid = false,
  fullWidth = true,
  sheetStyle,
  endContent,
  onValueChange,
  onOpenChange,
  onClose,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isControlled = isOpened !== undefined
  const isOpen = isControlled ? Boolean(isOpened) : internalIsOpen
  const theme = useXUITheme()
  const sheetBackground =
    theme.mode === 'dark' ? theme.colors.background : '#ffffff'
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const selectedOption = options.find(opt => opt.value === value)
  const displayLabel = selectedOption?.label

  const setOpen = (nextOpen: boolean) => {
    if (nextOpen && isDisabled) return

    if (!isControlled) {
      setInternalIsOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const requestClose = () => {
    setOpen(false)
  }

  const handleSheetClose = () => {
    // If close came from swipe/backdrop, sync open state once.
    if (isOpen) {
      setOpen(false)
    }
    onClose?.()
  }

  const handleSelect = (selectedValue: string) => {
    onValueChange?.(selectedValue)
    requestClose()
  }

  const chevronColor = withOpacity(theme.colors.foreground, 0.45)

  return (
    <>
      <InputTrigger
        value={displayLabel}
        placeholder={placeholder}
        label={label}
        labelPlacement={labelPlacement}
        description={description}
        errorMessage={errorMessage}
        themeColor={themeColor}
        variant={variant}
        size={size}
        radius={radius}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        fullWidth={fullWidth}
        endContent={
          endContent ?? <ChevronDownIcon color={chevronColor} size={20} />
        }
        onPress={handleOpen}
      />

      <BottomSheet
        isOpen={isOpen}
        snapPoints={[Math.min(0.35 + options.length * 0.065, 0.85)]}
        themeColor={themeColor}
        onClose={handleSheetClose}
        style={{ backgroundColor: sheetBackground, ...sheetStyle }}
      >
        <View style={styles.sheetContent}>
          {sheetTitle ? (
            <Text
              style={[styles.sheetTitle, { color: theme.colors.foreground }]}
            >
              {sheetTitle}
            </Text>
          ) : null}
          <ScrollView>
            {options.map((option, index) => (
              <View key={option.value}>
                <OptionItem
                  option={option}
                  isSelected={option.value === value}
                  themeColor={colorScheme.main}
                  foreground={theme.colors.foreground}
                  onSelect={handleSelect}
                />
                {index < options.length - 1 && (
                  <View
                    style={[
                      styles.divider,
                      {
                        backgroundColor: withOpacity(
                          theme.colors.foreground,
                          0.06
                        ),
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  )
}
