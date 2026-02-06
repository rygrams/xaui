import React, { useCallback, useRef } from 'react'
import { Pressable, Text, View, Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { styles } from './segment-button.style'
import { useSegmentSizeStyles, useSegmentVariantStyles } from './segment-button.hook'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import {
  runSegmentPressInAnimation,
  runSegmentPressOutAnimation,
} from './segment-button.animation'
import type { SegmentButtonProps, SegmentItem } from './segment-button.type'

const CheckIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

type SegmentItemComponentProps = {
  item: SegmentItem
  isSelected: boolean
  isFirst: boolean
  isLast: boolean
  sizeStyles: ReturnType<typeof useSegmentSizeStyles>
  variantStyles: ReturnType<typeof useSegmentVariantStyles>
  borderRadius: number
  isGroupDisabled: boolean
  showCheckmark: boolean
  onPress: (key: string) => void
  customAppearance: SegmentButtonProps['customAppearance']
}

const SegmentItemComponent: React.FC<SegmentItemComponentProps> = ({
  item,
  isSelected,
  isFirst,
  isLast,
  sizeStyles,
  variantStyles,
  borderRadius,
  isGroupDisabled,
  showCheckmark,
  onPress,
  customAppearance,
}) => {
  const animatedScale = useRef(new Animated.Value(1)).current
  const disabled = isGroupDisabled || item.isDisabled

  const handlePressIn = () => {
    if (!disabled) {
      runSegmentPressInAnimation(animatedScale)
    }
  }

  const handlePressOut = () => {
    if (!disabled) {
      runSegmentPressOutAnimation(animatedScale)
    }
  }

  const handlePress = () => {
    if (!disabled) {
      onPress(item.key)
    }
  }

  const segmentBorderRadius = {
    borderTopLeftRadius: isFirst ? borderRadius : 0,
    borderBottomLeftRadius: isFirst ? borderRadius : 0,
    borderTopRightRadius: isLast ? borderRadius : 0,
    borderBottomRightRadius: isLast ? borderRadius : 0,
  }

  const backgroundColor = isSelected
    ? variantStyles.selectedBackground
    : variantStyles.unselectedBackground

  const textColor = isSelected
    ? variantStyles.selectedTextColor
    : variantStyles.unselectedTextColor

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.segment,
          {
            paddingHorizontal: sizeStyles.paddingHorizontal,
            paddingVertical: sizeStyles.paddingVertical,
            minHeight: sizeStyles.minHeight,
            backgroundColor,
            ...segmentBorderRadius,
            transform: [{ scale: animatedScale }],
          },
          disabled && styles.disabled,
          isSelected ? customAppearance?.selectedSegment : customAppearance?.segment,
        ]}
      >
        <View style={styles.segmentContent}>
          {isSelected && showCheckmark && (
            <CheckIcon size={sizeStyles.iconSize} color={textColor} />
          )}
          {item.icon && (!isSelected || !showCheckmark) && item.icon}
          <Text
            style={[
              styles.segmentText,
              {
                fontSize: sizeStyles.fontSize,
                color: textColor,
              },
              isSelected ? customAppearance?.selectedText : customAppearance?.text,
            ]}
          >
            {item.label}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  )
}

export const SegmentButton: React.FC<SegmentButtonProps> = ({
  segments,
  selected,
  onSelectionChange,
  selectionMode = 'single',
  themeColor = 'primary',
  variant = 'outlined',
  size = 'md',
  radius = 'full',
  fullWidth = false,
  isDisabled = false,
  showCheckmark = true,
  customAppearance,
}) => {
  const sizeStyles = useSegmentSizeStyles(size)
  const variantStyles = useSegmentVariantStyles(themeColor, variant)
  const radiusStyles = useBorderRadiusStyles(radius)

  const isItemSelected = useCallback(
    (key: string): boolean => {
      if (Array.isArray(selected)) {
        return selected.includes(key)
      }
      return selected === key
    },
    [selected]
  )

  const handleSegmentPress = useCallback(
    (key: string) => {
      if (selectionMode === 'single') {
        onSelectionChange(key)
        return
      }

      const currentSelected = Array.isArray(selected) ? selected : [selected]
      const isCurrentlySelected = currentSelected.includes(key)

      if (isCurrentlySelected && currentSelected.length > 1) {
        onSelectionChange(currentSelected.filter(k => k !== key))
        return
      }

      if (!isCurrentlySelected) {
        onSelectionChange([...currentSelected, key])
      }
    },
    [selectionMode, selected, onSelectionChange]
  )

  const showDivider = variant === 'outlined' || variant === 'faded'

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyles.containerBackground,
          borderWidth: variantStyles.containerBorderWidth,
          borderColor: variantStyles.containerBorderColor,
          borderRadius: radiusStyles.borderRadius,
          ...(variantStyles.containerShadow as Record<string, unknown>),
        },
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        customAppearance?.container,
      ]}
    >
      {segments.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === segments.length - 1
        const isSelected = isItemSelected(item.key)
        const nextSelected = !isLast && isItemSelected(segments[index + 1].key)

        return (
          <React.Fragment key={item.key}>
            <SegmentItemComponent
              item={item}
              isSelected={isSelected}
              isFirst={isFirst}
              isLast={isLast}
              sizeStyles={sizeStyles}
              variantStyles={variantStyles}
              borderRadius={radiusStyles.borderRadius}
              isGroupDisabled={isDisabled}
              showCheckmark={showCheckmark}
              onPress={handleSegmentPress}
              customAppearance={customAppearance}
            />
            {showDivider && !isLast && !isSelected && !nextSelected && (
              <View
                style={[
                  styles.divider,
                  { backgroundColor: variantStyles.containerBorderColor },
                ]}
              />
            )}
          </React.Fragment>
        )
      })}
    </View>
  )
}
