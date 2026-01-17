import React, { useMemo, useState } from 'react'
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native'
import { useXUITheme } from '@xaui/core'
import { CircularActivityIndicator } from '@xaui/progress'
import { colors } from '@xaui/colors'
import type { ButtonProps } from './button-types'
import { RippleEffect } from './ripple-effect'

type Ripple = {
  id: number
  x: number
  y: number
  size: number
}

export const Button: React.FC<ButtonProps> = ({
  children,
  themeColor = 'default',
  variant = 'solid',
  size = 'md',
  radius = 'md',
  startContent,
  endContent,
  spinnerType = 'spinner',
  spinnerPlacement = 'start',
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  enableRipple = false,
  textStyle,
  style,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
}) => {
  const theme = useXUITheme()
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [buttonLayout, setButtonLayout] = useState({ width: 0, height: 0 })
  const rippleIdRef = React.useRef(0)

  const colorScheme = theme.colors[themeColor]

  const sizeStyles = useMemo(() => {
    const sizes = {
      xs: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        minHeight: 28,
        fontSize: theme.fontSizes.xs,
      },
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        minHeight: 32,
        fontSize: theme.fontSizes.sm,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 40,
        fontSize: theme.fontSizes.md,
      },
      lg: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
        fontSize: theme.fontSizes.lg,
      },
    }
    return sizes[size]
  }, [size, theme])

  const radiusStyles = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: radii[radius] }
  }, [radius, theme])

  const variantStyles = useMemo(() => {
    const styles = {
      solid: {
        backgroundColor: colorScheme.main,
        borderWidth: 0,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: theme.borderWidth.md,
        borderColor: colorScheme.main,
      },
      flat: {
        backgroundColor: colorScheme.background,
        borderWidth: 0,
      },
      light: {
        backgroundColor: colors.transparent,
        borderWidth: 0,
      },
      elevated: {
        backgroundColor: colorScheme.main,
        borderWidth: 0,
        ...theme.shadows.md,
      },
      faded: {
        backgroundColor: `${colorScheme.background}90`,
        borderWidth: theme.borderWidth.md,
        borderColor: colorScheme.main,
      },
    }
    return styles[variant]
  }, [variant, colorScheme, theme])

  const textColor = useMemo(() => {
    if (variant === 'solid' || variant === 'elevated') {
      return colorScheme.foreground
    }
    return colorScheme.main
  }, [variant, colorScheme])

  const rippleColor = useMemo(() => {
    if (variant === 'solid' || variant === 'elevated') {
      return '#ffffff'
    }
    return colorScheme.main
  }, [variant, colorScheme])

  const spinnerSize = useMemo(() => {
    const sizes = {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
    }
    return sizes[size]
  }, [size])

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setButtonLayout({ width, height })
  }

  const handlePressIn = (event: GestureResponderEvent) => {
    if (enableRipple && !isDisabled && !isLoading) {
      const { locationX, locationY } = event.nativeEvent
      const rippleSize = Math.max(buttonLayout.width, buttonLayout.height) * 2

      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x: locationX,
        y: locationY,
        size: rippleSize,
      }

      setRipples((prev) => [...prev, newRipple])
    }
    onPressIn?.(event)
  }

  const handlePressOut = (event: GestureResponderEvent) => {
    onPressOut?.(event)
  }

  const handleRippleComplete = (rippleId: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== rippleId))
  }

  const spinner = (
    <CircularActivityIndicator
      variant={spinnerType}
      themeColor={variant === 'solid' || variant === 'elevated' ? undefined : themeColor}
      color={variant === 'solid' || variant === 'elevated' ? textColor : undefined}
      size={spinnerSize}
    />
  )

  return (
    <View style={[fullWidth && styles.fullWidth]}>
      <Pressable
        onPress={isDisabled || isLoading ? undefined : onPress}
        onLongPress={isDisabled || isLoading ? undefined : onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLayout={handleLayout}
        disabled={isDisabled || isLoading}
        style={({ pressed }) => [
          styles.button,
          sizeStyles,
          radiusStyles,
          variantStyles,
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          pressed && !isDisabled && !isLoading && !enableRipple && styles.pressed,
          style,
        ]}
      >
        {enableRipple && (
          <View style={[styles.rippleContainer, radiusStyles]}>
            {ripples.map((ripple) => (
              <RippleEffect
                key={ripple.id}
                x={ripple.x}
                y={ripple.y}
                size={ripple.size}
                color={rippleColor}
                onAnimationComplete={() => handleRippleComplete(ripple.id)}
              />
            ))}
          </View>
        )}

        <View style={styles.contentContainer}>
          {startContent && !isLoading && (
            <View style={styles.startContent}>{startContent}</View>
          )}

          {isLoading && spinnerPlacement === 'start' && (
            <View style={styles.spinner}>{spinner}</View>
          )}

          <Text
            style={[
              styles.text,
              { fontSize: sizeStyles.fontSize, color: textColor },
              isDisabled && styles.disabledText,
              textStyle,
            ]}
          >
            {children}
          </Text>

          {isLoading && spinnerPlacement === 'end' && (
            <View style={styles.spinner}>{spinner}</View>
          )}

          {endContent && !isLoading && (
            <View style={styles.endContent}>{endContent}</View>
          )}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  startContent: {
    marginRight: 4,
  },
  endContent: {
    marginLeft: 4,
  },
  spinner: {
    marginHorizontal: 4,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.8,
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
})
