import React from 'react'
import { Animated, Easing, Pressable, View } from 'react-native'
import { styles } from './chip.style'
import type { ChipProps } from './chip.type'
import {
  useChipSizeStyles,
  useChipRadiusStyles,
  useChipVariantStyles,
  useChipDotSize,
  useChipCloseSize,
} from './chip.hook'

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'solid',
  themeColor = 'default',
  size = 'md',
  radius = 'full',
  avatar,
  startContent,
  endContent,
  isDisabled = false,
  customAppearance,
  onClose,
  onPress,
}: ChipProps) => {
  const [isClosed, setIsClosed] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const sizeStyles = useChipSizeStyles(size)
  const radiusStyles = useChipRadiusStyles(radius, sizeStyles.height)
  const variantStyles = useChipVariantStyles(themeColor, variant)
  const dotSize = useChipDotSize(size)
  const closeSize = useChipCloseSize(size)

  const isDotVariant = variant === 'dot'
  const hasClose = onClose !== undefined
  const isInteractive = onPress !== undefined || hasClose
  const scale = React.useRef(new Animated.Value(1)).current
  const opacity = React.useRef(new Animated.Value(1)).current
  const isClosingRef = React.useRef(false)
  const colorProgress = React.useRef(new Animated.Value(1)).current

  const targetBackgroundColor = variantStyles.backgroundColor ?? 'transparent'
  const targetBorderColor = variantStyles.borderColor ?? 'transparent'
  const targetTextColor = variantStyles.color ?? '#000000'
  const targetDotColor = variantStyles.dotColor ?? targetTextColor

  const previousColorsRef = React.useRef({
    backgroundColor: targetBackgroundColor,
    borderColor: targetBorderColor,
    textColor: targetTextColor,
    dotColor: targetDotColor,
  })

  React.useEffect(() => {
    if (
      previousColorsRef.current.backgroundColor === targetBackgroundColor &&
      previousColorsRef.current.borderColor === targetBorderColor &&
      previousColorsRef.current.textColor === targetTextColor &&
      previousColorsRef.current.dotColor === targetDotColor
    ) {
      return
    }

    colorProgress.setValue(0)
    Animated.timing(colorProgress, {
      toValue: 1,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      previousColorsRef.current = {
        backgroundColor: targetBackgroundColor,
        borderColor: targetBorderColor,
        textColor: targetTextColor,
        dotColor: targetDotColor,
      }
    })
  }, [
    colorProgress,
    targetBackgroundColor,
    targetBorderColor,
    targetTextColor,
    targetDotColor,
  ])

  const animatedBackgroundColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [previousColorsRef.current.backgroundColor, targetBackgroundColor],
  })

  const animatedBorderColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [previousColorsRef.current.borderColor, targetBorderColor],
  })

  const animatedTextColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [previousColorsRef.current.textColor, targetTextColor],
  })

  const animatedDotColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [previousColorsRef.current.dotColor, targetDotColor],
  })

  const handlePressIn = React.useCallback(() => {
    if (!isInteractive || isDisabled || isClosing || hasClose) return
    Animated.timing(scale, {
      toValue: 0.97,
      duration: 90,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [hasClose, isInteractive, isClosing, isDisabled, scale])

  const handlePressOut = React.useCallback(() => {
    if (!isInteractive || isDisabled || isClosing || hasClose) return
    Animated.timing(scale, {
      toValue: 1,
      duration: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [hasClose, isInteractive, isClosing, isDisabled, scale])

  const handleChipPress = React.useCallback(() => {
    if (isDisabled || isClosing || isClosingRef.current) return

    if (hasClose && onClose) {
      isClosingRef.current = true
      setIsClosing(true)
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.88,
          duration: 180,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsClosed(true)
        onClose()
        setIsClosing(false)
        isClosingRef.current = false
      })
      return
    }

    onPress?.()
  }, [hasClose, isClosing, isDisabled, onClose, onPress, opacity, scale])

  if (isClosed) {
    return null
  }

  const chipContent = (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <Animated.View
        style={[
          styles.chip,
          {
            height: sizeStyles.height,
            paddingHorizontal: sizeStyles.paddingHorizontal,
            backgroundColor: animatedBackgroundColor,
            borderWidth: variantStyles.borderWidth,
            borderColor: animatedBorderColor,
          },
          radiusStyles,
          variantStyles.shadow,
          isDisabled && styles.disabled,
          customAppearance?.container,
        ]}
        accessible
        accessibilityRole="text"
      >
        {isDotVariant && (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                backgroundColor: animatedDotColor,
              },
              customAppearance?.dot,
            ]}
          />
        )}

        {avatar && <View style={styles.avatar}>{avatar}</View>}

        {startContent && !avatar && (
          <View style={styles.startContent}>{startContent}</View>
        )}

        <Animated.Text
          style={[
            styles.text,
            { fontSize: sizeStyles.fontSize, color: animatedTextColor },
            customAppearance?.text,
          ]}
        >
          {children}
        </Animated.Text>

        {endContent && !hasClose && (
          <View style={styles.endContent}>{endContent}</View>
        )}

        {hasClose && (
          <View
            style={[
              styles.closeButton,
              { width: closeSize, height: closeSize },
              customAppearance?.closeButton,
            ]}
          >
            <Animated.Text
              style={{
                fontSize: closeSize - 2,
                color: animatedTextColor,
                lineHeight: closeSize,
              }}
            >
              ✕
            </Animated.Text>
          </View>
        )}
      </Animated.View>
    </Animated.View>
  )

  if (isInteractive) {
    return (
      <Pressable
        onPress={isDisabled || isClosing ? undefined : handleChipPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled || isClosing}
      >
        {chipContent}
      </Pressable>
    )
  }

  return chipContent
}
