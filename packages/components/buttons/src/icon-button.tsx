import React, { useMemo, useState } from 'react'
import {
  Pressable,
  View,
  StyleSheet,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native'
import { useXUITheme } from '@xaui/core'
import { CircularActivityIndicator } from '@xaui/progress'
import { colors } from '@xaui/colors'
import type { IconButtonProps } from './icon-button-types'
import { RippleEffect } from './ripple-effect'

type Ripple = {
  id: number
  x: number
  y: number
  size: number
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  themeColor = 'default',
  variant = 'light',
  size = 'md',
  radius = 'md',
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  enableRipple = false,
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
        width: 28,
        height: 28,
        iconSize: 16,
      },
      sm: {
        width: 32,
        height: 32,
        iconSize: 18,
      },
      md: {
        width: 40,
        height: 40,
        iconSize: 20,
      },
      lg: {
        width: 48,
        height: 48,
        iconSize: 24,
      },
    }
    return sizes[size]
  }, [size])

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
      faded: {
        backgroundColor: `${colorScheme.background}90`,
        borderWidth: theme.borderWidth.md,
        borderColor: colorScheme.main,
      },
    }
    return styles[variant]
  }, [variant, colorScheme, theme])

  const iconColor = useMemo(() => {
    if (variant === 'solid') {
      return colorScheme.foreground
    }
    return colorScheme.main
  }, [variant, colorScheme])

  const rippleColor = useMemo(() => {
    if (variant === 'solid') {
      return '#ffffff'
    }
    return colorScheme.main
  }, [variant, colorScheme])

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

  return (
    <View style={[fullWidth && buttonStyles.fullWidth]}>
      <Pressable
        onPress={isDisabled || isLoading ? undefined : onPress}
        onLongPress={isDisabled || isLoading ? undefined : onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLayout={handleLayout}
        disabled={isDisabled || isLoading}
        style={({ pressed }) => [
          buttonStyles.button,
          sizeStyles,
          radiusStyles,
          variantStyles,
          fullWidth && buttonStyles.fullWidth,
          isDisabled && buttonStyles.disabled,
          pressed && !isDisabled && !isLoading && !enableRipple && buttonStyles.pressed,
          style,
        ]}
      >
        {enableRipple && (
          <View style={[buttonStyles.rippleContainer, radiusStyles]}>
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

        {isLoading ? (
          <CircularActivityIndicator
            variant="spinner"
            themeColor={variant === 'solid' ? undefined : themeColor}
            color={variant === 'solid' ? iconColor : undefined}
            size={sizeStyles.iconSize}
          />
        ) : (
          <View style={buttonStyles.iconContainer}>{icon}</View>
        )}
      </Pressable>
    </View>
  )
}

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
})
