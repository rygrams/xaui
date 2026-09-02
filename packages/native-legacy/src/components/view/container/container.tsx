import React from 'react'
import { View, Pressable } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { ContainerProps } from './container.type'
import {
  resolveEdgeInsets,
  resolveAlignment,
  resolveBorderRadius,
  resolveBorder,
  resolveShadow,
  resolveTransform,
} from './container.utils'

const buildStyle = (props: ContainerProps): ViewStyle => ({
  ...(props.width !== undefined && { width: props.width }),
  ...(props.height !== undefined && { height: props.height }),
  ...(props.minWidth !== undefined && { minWidth: props.minWidth }),
  ...(props.maxWidth !== undefined && { maxWidth: props.maxWidth }),
  ...(props.minHeight !== undefined && { minHeight: props.minHeight }),
  ...(props.maxHeight !== undefined && { maxHeight: props.maxHeight }),
  ...(props.aspectRatio !== undefined && { aspectRatio: props.aspectRatio }),
  ...(props.flex !== undefined && { flex: props.flex }),
  ...(props.color !== undefined && { backgroundColor: props.color }),
  ...(props.clip && { overflow: 'hidden' as const }),
  ...(props.opacity !== undefined && { opacity: props.opacity }),
  ...(props.padding !== undefined && resolveEdgeInsets(props.padding, 'padding')),
  ...(props.margin !== undefined && resolveEdgeInsets(props.margin, 'margin')),
  ...(props.alignment !== undefined && resolveAlignment(props.alignment)),
  ...(props.borderRadius !== undefined && resolveBorderRadius(props.borderRadius)),
  ...(props.border !== undefined && resolveBorder(props.border)),
  ...(props.shadow !== undefined && resolveShadow(props.shadow)),
  ...(props.transform !== undefined && {
    transform: resolveTransform(props.transform),
  }),
})

export const Container: React.FC<ContainerProps> = props => {
  const {
    children,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    disabled = false,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    accessible,
    testID,
    style,
  } = props

  const containerStyle = buildStyle(props)
  const isInteractive = !!(onPress ?? onLongPress ?? onPressIn ?? onPressOut)

  if (isInteractive) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        onLongPress={disabled ? undefined : onLongPress}
        onPressIn={disabled ? undefined : onPressIn}
        onPressOut={disabled ? undefined : onPressOut}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
        accessible={accessible}
        testID={testID}
        style={[containerStyle, style]}
      >
        {children}
      </Pressable>
    )
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessible={accessible}
      testID={testID}
      style={[containerStyle, style]}
    >
      {children}
    </View>
  )
}

Container.displayName = 'Container'
