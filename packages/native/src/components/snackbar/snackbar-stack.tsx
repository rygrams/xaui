import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Portal } from '../../system/portal'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { SnackbarStackProvider } from './snackbar-stack.context'
import type { SnackbarStackProps } from './snackbar.type'

const styles = StyleSheet.create({
  overlay: { position: 'absolute' },
  content: { width: '100%', alignSelf: 'center' },
})

/**
 * One screen anchor for several independently controlled snackbars. The last child stays
 * closest to the chosen edge, so appending a notification never moves the newest one away
 * from where it appeared.
 */
export const SnackbarStack = forwardRef<View, SnackbarStackProps>(
  function SnackbarStack(
    {
      children,
      position = 'bottom',
      spacing = 8,
      insetHorizontal = 16,
      insetVertical = 16,
      maxWidth = 640,
      isPortalled = true,
      asChild = false,
      style,
      ...props
    },
    ref
  ) {
    const [styleProps, rest] = useStyleProps(props)
    const Stack = asChild ? Slot : View
    const content = (
      <SnackbarStackProvider value>
        <View
          pointerEvents="box-none"
          style={[
            styles.overlay,
            { start: insetHorizontal, end: insetHorizontal },
            position === 'top' ? { top: insetVertical } : { bottom: insetVertical },
          ]}
        >
          <Stack
            ref={ref}
            pointerEvents="box-none"
            {...rest}
            style={[
              styles.content,
              {
                maxWidth,
                gap: spacing,
                flexDirection: position === 'top' ? 'column-reverse' : 'column',
              },
              styleProps,
              style,
            ]}
          >
            {children}
          </Stack>
        </View>
      </SnackbarStackProvider>
    )

    return isPortalled ? <Portal>{content}</Portal> : content
  }
)

SnackbarStack.displayName = 'XAUI.Snackbar.Stack'
