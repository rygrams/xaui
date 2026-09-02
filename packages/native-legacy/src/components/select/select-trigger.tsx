import React from 'react'
import {
  Pressable,
  Text,
  View,
  type LayoutChangeEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import type { SelectVariant } from './select.type'
import { ChevronDownIcon } from './chevron-down-icon'
import { styles } from './select.style'

type SelectTriggerProps = {
  triggerRef: React.RefObject<View | null>
  isOpen: boolean
  isDisabled: boolean
  onPress: () => void
  onLayout: (event: LayoutChangeEvent) => void
  accessibilityLabel?: string
  variant: SelectVariant
  sizeStyles: {
    minHeight: number
    paddingHorizontal: number
    paddingVertical: number
    fontSize: number
  }
  radiusStyles: {
    borderRadius: number
  }
  variantStyles: ViewStyle
  displayValue: string
  valueColor: string
  selectorColor: string
  labelInside: boolean
  labelNode?: React.ReactNode
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  selectorIcon?: React.ReactNode
  onClear?: () => void
  showClear: boolean
  textStyle?: TextStyle
  style?: ViewStyle
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  triggerRef,
  isOpen,
  isDisabled,
  onPress,
  onLayout,
  accessibilityLabel,
  variant,
  sizeStyles,
  radiusStyles,
  variantStyles,
  displayValue,
  valueColor,
  selectorColor,
  labelInside,
  labelNode,
  startContent,
  endContent,
  selectorIcon,
  onClear,
  showClear,
  textStyle,
  style,
}) => {
  const renderSelectorIcon = selectorIcon ?? (
    <ChevronDownIcon color={selectorColor} size={16} isOpen={isOpen} />
  )

  return (
    <View ref={triggerRef} collapsable={false}>
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        onLayout={onLayout}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isDisabled, expanded: isOpen }}
        style={[
          styles.trigger,
          variant === 'underlined' ? { borderRadius: 0 } : radiusStyles,
          variantStyles,
          {
            minHeight: sizeStyles.minHeight,
            paddingHorizontal:
              variant === 'underlined' ? 2 : sizeStyles.paddingHorizontal,
            paddingVertical: sizeStyles.paddingVertical,
          },
          isDisabled && styles.disabled,
          style,
        ]}
      >
        <View
          style={[styles.triggerContent, labelInside && styles.triggerContentColumn]}
        >
          {startContent}
          <View style={styles.valueWrapper}>
            {labelInside && labelNode}
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
          {showClear && onClear && (
            <Pressable onPress={onClear} style={styles.clearButton}>
              <Text style={[styles.clearText, { color: selectorColor }]}>x</Text>
            </Pressable>
          )}
          {renderSelectorIcon}
        </View>
      </Pressable>
    </View>
  )
}
