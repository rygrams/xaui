import { forwardRef, useCallback, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { Portal } from '../../system/portal'
import { childrenToString, Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { snackbarEntering, snackbarExiting } from './snackbar.animation'
import { SnackbarProvider } from './snackbar.context'
import { SnackbarMessage } from './snackbar-message'
import { snackbarRecipe } from './snackbar.recipe'
import type { SnackbarProps } from './snackbar.type'

export const SnackbarRoot = forwardRef<View, SnackbarProps>(function Snackbar(
  {
    children,
    variant,
    color,
    radius,
    isVisible: controlledVisible,
    defaultVisible = true,
    duration = 4000,
    onVisibleChange,
    onClose,
    position = 'bottom',
    insetHorizontal = 16,
    insetVertical = 16,
    maxWidth = 640,
    isPortalled = true,
    asChild = false,
    accessibilityRole = 'alert',
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const [isVisible, setVisible] = useControllableState({
    value: controlledVisible,
    defaultValue: defaultVisible,
    onChange: onVisibleChange,
  })
  const dismiss = useCallback(() => {
    setVisible(false)
    onClose?.()
  }, [onClose, setVisible])

  useEffect(() => {
    if (!isVisible || duration <= 0) return
    const timer = setTimeout(dismiss, duration)
    return () => clearTimeout(timer)
  }, [dismiss, duration, isVisible])

  const styles = snackbarRecipe.resolve({ theme, selection: { variant, radius } })
  const tint = color
    ? snackbarRecipe.tint({ theme, color, selection: { variant, radius } })
    : undefined
  const context = useMemo(
    () => ({
      messageStyle: tint ? [styles.message, tint.message] : styles.message,
      actionsStyle: styles.actions,
      actionStyle: styles.action,
      actionLabelStyle: tint
        ? [styles.actionLabel, tint.actionLabel]
        : styles.actionLabel,
      dismiss,
    }),
    [dismiss, styles, tint]
  )
  if (!isVisible) return null
  const text = childrenToString(children)
  const content =
    text !== null ? <SnackbarMessage>{text}</SnackbarMessage> : children

  const surface = asChild ? (
    <Slot
      ref={ref}
      accessibilityRole={accessibilityRole}
      accessibilityLiveRegion="polite"
      {...rest}
      style={[styles.root, tint?.root, styleProps, style]}
    >
      {children}
    </Slot>
  ) : (
    <Animated.View
      ref={ref}
      entering={snackbarEntering}
      exiting={snackbarExiting}
      accessibilityRole={accessibilityRole}
      accessibilityLiveRegion="polite"
      {...rest}
      style={[styles.root, tint?.root, styleProps, style]}
    >
      {content}
    </Animated.View>
  )
  const node = (
    <SnackbarProvider value={context}>
      <View
        pointerEvents="box-none"
        style={[
          { position: 'absolute', start: insetHorizontal, end: insetHorizontal },
          position === 'top' ? { top: insetVertical } : { bottom: insetVertical },
        ]}
      >
        <View style={{ width: '100%', maxWidth, alignSelf: 'center' }}>
          {surface}
        </View>
      </View>
    </SnackbarProvider>
  )
  return isPortalled ? <Portal>{node}</Portal> : node
})

SnackbarRoot.displayName = 'XAUI.Snackbar.Root'
