import { forwardRef, useCallback, useEffect } from 'react'
import type { ComponentType } from 'react'
import { Modal, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import type { IconComponentProps } from '@xaui/native/system'
import { PressableFeedback, useStyleProps } from '@xaui/native/system'
import { PressTilt } from '../../system/press-tilt'
import { useSwivel } from '../../system/use-swivel'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useTramSafeArea } from '../../theme/tram-safe-area'
import { ToastOutlet } from '../toast/toast.outlet'
import { CheckGlyph, CrossGlyph } from './wheel-field-glyphs'
import { useWheelField } from './wheel-field.context'
import type {
  WheelFieldContentProps,
  WheelFieldOverlayProps,
} from './wheel-field.type'

/**
 * The page the field opens — the Metro date and time pickers' own: the label as a
 * caption, the wheels under it from the start, and the App Bar along the bottom with
 * its ✓ and its ✕.
 *
 * It swivels in on its top edge, as the `Select`'s page and the `Dialog`'s banner do. A
 * `Modal`, so it covers the navigation, keeps the theme it was written under, and hears
 * the system's back — which cancels, unless `.Overlay` said `isDismissable={false}`.
 *
 * The page's top and its bar's bottom add the app's safe area, from the hook handed to
 * `TramProvider`.
 */
export function makeContent(name: string, Wheel: ComponentType) {
  const Content = forwardRef<View, WheelFieldContentProps>(function Content(
    { children, confirmLabel = 'done', cancelLabel = 'cancel', style, ...props },
    ref
  ) {
    const {
      pageStyle,
      titleStyle,
      bodyStyle,
      barStyle,
      pageInset,
      title,
      isOpen,
      isStill,
      cancel,
      confirm,
      dismissable,
      labelId,
      pageId,
    } = useWheelField()
    const [styleProps, rest] = useStyleProps(props)
    const insets = useTramSafeArea()
    const swivel = useSwivel(isOpen, isStill)

    const back = useCallback(() => {
      if (dismissable.current) cancel()
    }, [dismissable, cancel])

    if (!swivel.isMounted) return null

    return (
      <Modal
        visible
        transparent
        animationType="none"
        statusBarTranslucent
        navigationBarTranslucent
        onRequestClose={back}
      >
        <Animated.View
          ref={ref}
          nativeID={pageId}
          role="dialog"
          aria-modal
          aria-labelledby={labelId}
          accessibilityViewIsModal
          onAccessibilityEscape={back}
          {...rest}
          style={[
            pageStyle,
            { paddingTop: insets.top + pageInset.top },
            styleProps,
            style,
            // The turn comes last: it is the one transform the swivel owns.
            swivel.style,
          ]}
        >
          {title ? (
            <Text accessibilityRole="header" style={titleStyle}>
              {title}
            </Text>
          ) : null}
          <View style={bodyStyle}>{children ?? <Wheel />}</View>
          <View
            style={[barStyle, { paddingBottom: insets.bottom + pageInset.bottom }]}
          >
            <BarButton label={confirmLabel} glyph={CheckGlyph} onPress={confirm} />
            <BarButton label={cancelLabel} glyph={CrossGlyph} onPress={cancel} />
          </View>
        </Animated.View>
        {/* A `Modal` covers the app's pile of toasts: while the page is up, it is drawn here. */}
        <ToastOutlet />
      </Modal>
    )
  })

  Content.displayName = `XAUI.Tram.${name}.Content`

  return Content
}

type BarButtonProps = {
  label: string
  glyph: ComponentType<IconComponentProps>
  onPress: () => void
}

/**
 * One button of the App Bar: a thin circle in the bar's ink, its glyph inside and its
 * name under it. A press leans the circle toward the finger and changes no colour.
 */
function BarButton({ label, glyph: Glyph, onPress }: BarButtonProps) {
  const {
    barItemStyle,
    barButtonStyle,
    barLabelStyle,
    barGlyph,
    barReach,
    isStill,
  } = useWheelField()
  const haptic = useTramHaptic()
  const [isPressed, press] = usePressState({ onPressIn: () => haptic('press') })
  // Under an ancestor's `disable-all` the circle does not lean either.
  const Circle = isStill ? PressableFeedback : PressTilt

  return (
    <View style={barItemStyle}>
      <Circle
        isPressed={isPressed}
        animation={isStill ? 'disable-all' : false}
        accessibilityRole="button"
        accessibilityLabel={label}
        hitSlop={barReach}
        style={barButtonStyle}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <Glyph {...barGlyph} />
      </Circle>
      {/* The button is named already: its caption is not read a second time. */}
      <Text
        style={barLabelStyle}
        accessibilityElementsHidden
        importantForAccessibility="no"
        aria-hidden
      >
        {label}
      </Text>
    </View>
  )
}

/**
 * What else closes the page: the system's back, unless `isDismissable={false}`. It draws
 * nothing — the page takes the screen and there is no outside to touch. Optional:
 * omitted, the back cancels.
 */
export function makeOverlay(name: string) {
  function Overlay({ isDismissable = true }: WheelFieldOverlayProps) {
    const { dismissable } = useWheelField()

    useEffect(() => {
      dismissable.current = isDismissable

      return () => {
        dismissable.current = true
      }
    }, [dismissable, isDismissable])

    return null
  }

  Overlay.displayName = `XAUI.Tram.${name}.Overlay`

  return Overlay
}
