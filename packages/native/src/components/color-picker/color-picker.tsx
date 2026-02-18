import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import { BottomSheet } from '../bottom-sheet/bottom-sheet'
import { InputTrigger } from '../input-trigger/input-trigger'
import { defaultColorGroups } from './color-picker.palette'
import { styles } from './color-picker.style'
import type { ColorGroup, ColorPickerProps } from './color-picker.type'

type SwatchProps = {
  color: string
  size: number
  isSelected: boolean
  onSelect: (color: string) => void
  borderColor: string
}

const Swatch: React.FC<SwatchProps> = ({
  color,
  size,
  isSelected,
  onSelect,
  borderColor,
}) => (
  <Pressable
    onPress={() => onSelect(color)}
    accessibilityRole="button"
    accessibilityLabel={color}
    accessibilityState={{ selected: isSelected }}
    style={[
      {
        width: size,
        height: size,
        borderRadius: 6,
        backgroundColor: color,
        borderWidth: isSelected ? 3 : 1,
        borderColor: isSelected ? borderColor : withOpacity(borderColor, 0.15),
      },
    ]}
  />
)

type ColorGroupSectionProps = {
  group: ColorGroup
  selectedColor: string | undefined
  swatchSize: number
  themeMain: string
  foreground: string
  onSelect: (color: string) => void
}

const ColorGroupSection: React.FC<ColorGroupSectionProps> = ({
  group,
  selectedColor,
  swatchSize,
  themeMain,
  foreground,
  onSelect,
}) => (
  <View style={styles.groupContainer}>
    <Text style={[styles.groupName, { color: withOpacity(foreground, 0.6) }]}>
      {group.name}
    </Text>
    <View style={styles.swatchRow}>
      {group.colors.map(color => (
        <Swatch
          key={color}
          color={color}
          size={swatchSize}
          isSelected={color === selectedColor}
          onSelect={onSelect}
          borderColor={color === selectedColor ? themeMain : foreground}
        />
      ))}
    </View>
  </View>
)

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  placeholder = 'Pick a color...',
  label,
  labelPlacement = 'outside',
  description,
  errorMessage,
  colorGroups = defaultColorGroups,
  sheetTitle = 'Pick a color',
  themeColor = 'primary',
  variant = 'flat',
  size = 'md',
  radius = 'md',
  isOpened,
  isDisabled = false,
  isInvalid = false,
  fullWidth = true,
  sheetStyle,
  swatchSize = 28,
  onColorChange,
  onOpenChange,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(isOpened ?? false)
  const theme = useXUITheme()
  const sheetBackground =
    theme.mode === 'dark' ? theme.colors.background : '#ffffff'

  useEffect(() => {
    if (isOpened !== undefined) {
      setIsOpen(isOpened)
    }
  }, [isOpened])

  const handleOpen = () => {
    if (isDisabled) return
    setIsOpen(true)
    onOpenChange?.(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    onOpenChange?.(false)
    onClose?.()
  }

  const handleSelect = (color: string) => {
    onColorChange?.(color)
    handleClose()
  }

  const triggerColor = value
  const foreground = theme.colors.foreground
  const themeMain = theme.colors[themeColor]?.main ?? foreground

  const triggerEndContent = (
    <View
      style={[
        styles.triggerSwatch,
        {
          backgroundColor: triggerColor ?? 'transparent',
          borderColor: triggerColor
            ? withOpacity(foreground, 0.2)
            : withOpacity(foreground, 0.15),
          borderStyle: triggerColor ? 'solid' : 'dashed',
        },
      ]}
    />
  )

  return (
    <>
      <InputTrigger
        value={value ? '' : undefined}
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
        startContent={triggerEndContent}
        endContent={
          value ? (
            <Text
              style={[
                {
                  fontSize: 13,
                  fontWeight: '500',
                  letterSpacing: 0.5,
                  color: withOpacity(foreground, 0.6),
                },
              ]}
            >
              {value.toUpperCase()}
            </Text>
          ) : undefined
        }
        onPress={handleOpen}
      />

      <BottomSheet
        isOpen={isOpen}
        snapPoints={[0.75]}
        themeColor={themeColor}
        onClose={handleClose}
        style={{ backgroundColor: sheetBackground, ...sheetStyle }}
      >
        <View style={styles.sheetContent}>
          <View style={styles.header}>
            <Text style={[styles.sheetTitle, { color: foreground }]}>
              {sheetTitle}
            </Text>
            {value && (
              <View style={styles.selectedPreview}>
                <View
                  style={[
                    styles.previewSwatch,
                    {
                      backgroundColor: value,
                      borderColor: withOpacity(foreground, 0.2),
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.hexLabel,
                    { color: withOpacity(foreground, 0.7) },
                  ]}
                >
                  {value.toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {colorGroups.map(group => (
              <ColorGroupSection
                key={group.name}
                group={group}
                selectedColor={value}
                swatchSize={swatchSize}
                themeMain={themeMain}
                foreground={foreground}
                onSelect={handleSelect}
              />
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </>
  )
}
