import { forwardRef, useMemo } from 'react'
import type { GestureResponderEvent, LayoutChangeEvent } from 'react-native'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import { PressableFeedback, useStyleProps, warnDev } from '@xaui/native/system'
import { discPaint } from '../../system/disc-paint'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { buttonPartsOf } from './app-bar.children'
import { AppBarButtonProvider, useAppBar } from './app-bar.context'
import { AppBarLabel } from './app-bar-label'
import { appBarSheet } from './app-bar.style'
import type { AppBarButtonProps } from './app-bar.type'

/**
 * One round button of the bar: a thin circle with its glyph, in the bar's ink — or the
 * accent read as ink, with `accent` on the bar — and its label under it while the bar is
 * open.
 *
 * ```tsx
 * <AppBar.Button onPress={compose}>
 *   <AppBar.Icon as={PlusIcon} />
 *   <AppBar.Label>nouveau</AppBar.Label>
 * </AppBar.Button>
 * ```
 *
 * A press leans the circle toward the finger, is felt through `TramProvider`'s
 * `onHaptic`, runs `onPress` and closes the bar. The label names the button; with none, it
 * needs an `accessibilityLabel`.
 */
export const AppBarButton = forwardRef<View, AppBarButtonProps>(
  function AppBarButton(
    {
      children,
      isDisabled = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      hitSlop,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const bar = useAppBar()
    const haptic = useTramHaptic()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({
      // Felt as the finger lands, with the tilt — not on release, when it is already over.
      onPressIn: event => {
        haptic('press')
        onPressIn?.(event)
      },
      onPressOut,
    })
    const { diameter, glyph, cell, ground, accent, color, close } = bar
    const paint = discPaint(
      { variant: 'outline', accent, color, isDisabled },
      ground
    )

    const value = useMemo(
      () => ({ icon: { size: glyph, color: paint.glyph }, labelColor: paint.label }),
      [glyph, paint.glyph, paint.label]
    )

    const parts = buttonPartsOf(children)
    const name =
      rest.accessibilityLabel ?? rest['aria-label'] ?? parts.name ?? undefined

    if (name === undefined) {
      warnDev(
        'Tram AppBar: an `AppBar.Button` with no label needs an `accessibilityLabel` — a ' +
          'glyph is not text, so a screen reader announces an unlabelled button.'
      )
    }

    const shelf = useShelf()

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      close()
    }

    // With motion reduced, or its animations off, the circle does not lean: Native's own
    // scale, highlight and ripple stay off either way.
    const Root = bar.isTilting ? PressTilt : PressableFeedback

    return (
      <AppBarButtonProvider value={value}>
        <View style={[appBarSheet.cell, { width: cell }]}>
          <Root
            ref={ref}
            isPressed={isPressed}
            isDisabled={isDisabled}
            animation={bar.isStill ? 'disable-all' : false}
            accessibilityRole={accessibilityRole}
            accessibilityLabel={name}
            // Merged, not spread over: a caller adding `selected` must not drop this one.
            accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
            {...rest}
            // The circle is smaller than a finger: the touch reaches past it to 48.
            hitSlop={hitSlop ?? touchReach(diameter)}
            style={[
              bar.styles.button,
              { borderColor: paint.line },
              appBarSheet.bare,
              styleProps,
              typeof style === 'function' ? style({ pressed: isPressed }) : style,
            ]}
            onPress={handlePress}
            // After `rest`, and composed: the caller's handlers run inside these.
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
          >
            {parts.glyph}
          </Root>

          {parts.label === null ? null : (
            <Animated.View style={[appBarSheet.shelf, shelf.room]}>
              <Animated.View
                onLayout={shelf.measure}
                style={[appBarSheet.label, shelf.arriving]}
              >
                {typeof parts.label === 'string' ? (
                  <AppBarLabel>{parts.label}</AppBarLabel>
                ) : (
                  parts.label
                )}
              </Animated.View>
            </Animated.View>
          )}
        </View>
      </AppBarButtonProvider>
    )
  }
)

AppBarButton.displayName = 'XAUI.Tram.AppBar.Button'

/**
 * The room for the label under the circle: as tall as the label times the bar's opening —
 * which is what lifts a `bottom` bar's circles — while the label fades in. With
 * `hasLabels` the room is always open and the label always there.
 */
function useShelf() {
  const { open, arrival, hasLabels } = useAppBar()
  const height = useSharedValue(0)

  const room = useAnimatedStyle(() => {
    'worklet'
    return { height: (hasLabels ? 1 : open.value) * height.value }
  }, [open, height, hasLabels])

  const arriving = useAnimatedStyle(() => {
    'worklet'
    return { opacity: hasLabels ? 1 : arrival.value }
  }, [arrival, hasLabels])

  const measure = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height
  }

  return { room, arriving, measure }
}
