import React, { useEffect, useRef } from 'react'
import { Pressable, Text, View, Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { styles } from './segment-button.style'
import { useSegmentSizeStyles, useSegmentVariantStyles } from './segment-button.hook'
import { useSegmentButtonContext } from './segment-button-context'
import {
  runCheckmarkEnterAnimation,
  runCheckmarkExitAnimation,
} from './segment-button.animation'
import type { SegmentButtonItemProps } from './segment-button-item.type'

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

export const SegmentButtonItem: React.FC<SegmentButtonItemProps> = ({
  itemKey,
  label,
  startContent,
  icon,
  endContent,
  checkIndicator,
  isDisabled: itemDisabled = false,
  customAppearance,
}) => {
  const {
    selectedKeys,
    toggleItem,
    themeColor,
    variant,
    size,
    elevation,
    isDisabled: groupDisabled,
    showCheckmark,
  } = useSegmentButtonContext()

  const isSelected = selectedKeys.includes(itemKey)
  const disabled = groupDisabled || itemDisabled

  const checkmarkAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current
  const prevSelected = useRef(isSelected)

  useEffect(() => {
    if (isSelected && !prevSelected.current) {
      runCheckmarkEnterAnimation(checkmarkAnim)
    } else if (!isSelected && prevSelected.current) {
      runCheckmarkExitAnimation(checkmarkAnim)
    }
    prevSelected.current = isSelected
  }, [isSelected, checkmarkAnim])

  const sizeStyles = useSegmentSizeStyles(size)
  const variantStyles = useSegmentVariantStyles(themeColor, variant, elevation)

  const handlePress = () => {
    if (!disabled) {
      toggleItem(itemKey)
    }
  }

  const backgroundColor = isSelected
    ? variantStyles.selectedBackground
    : variantStyles.unselectedBackground

  const textColor = isSelected
    ? variantStyles.selectedTextColor
    : variantStyles.unselectedTextColor

  const showCheck = isSelected && showCheckmark
  const startNode = showCheck
    ? (checkIndicator ?? <CheckIcon size={sizeStyles.iconSize} color={textColor} />)
    : (startContent ?? icon)

  return (
    <Pressable
      style={[styles.segment, disabled && styles.disabled]}
      onPress={handlePress}
      disabled={disabled}
    >
      <View
        style={[
          styles.segmentInner,
          {
            paddingHorizontal: sizeStyles.paddingHorizontal,
            paddingVertical: sizeStyles.paddingVertical,
            minHeight: sizeStyles.minHeight,
            backgroundColor,
          },
          isSelected ? customAppearance?.selectedSegment : customAppearance?.segment,
        ]}
      >
        <View style={styles.segmentContent}>
          {startNode && (
            <Animated.View
              style={{
                opacity: showCheck ? checkmarkAnim : 1,
                transform: [{ scale: showCheck ? checkmarkAnim : 1 }],
              }}
            >
              {startNode}
            </Animated.View>
          )}
          <Text
            numberOfLines={1}
            style={[
              styles.segmentText,
              {
                fontSize: sizeStyles.fontSize,
                color: textColor,
              },
              isSelected ? customAppearance?.selectedText : customAppearance?.text,
            ]}
          >
            {label}
          </Text>
          {endContent}
        </View>
      </View>
    </Pressable>
  )
}

SegmentButtonItem.displayName = 'SegmentButtonItem'
