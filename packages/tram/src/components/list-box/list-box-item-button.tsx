import { forwardRef, useMemo, useRef } from 'react'
import { I18nManager } from 'react-native'
import type { GestureResponderEvent, LayoutChangeEvent, View } from 'react-native'
import { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import { useTramHaptic } from '../../theme/tram-haptics'
import { ListBoxCheck } from './list-box-check'
import { ListBoxRowProvider, useListBox, useListBoxOrder } from './list-box.context'
import type { ListBoxItemButtonProps } from './list-box.type'

/**
 * A row you can press, used **in place of** `ListBox.Item`. It is the same row — same
 * height, same slots — and the press is the Metro one: the row leans toward the finger
 * and shrinks a little, its colours unchanged. A row is wide, so it leans by the wide
 * angle. Felt as the finger lands, through `TramProvider`'s `onHaptic`, as a `press`.
 *
 * The touch lands on the row, never on what is inside it: a `Switch` in its suffix is
 * moved by the row's `onPress`, and springs once, for its new value. A control that must
 * keep its own press and its own role goes in a `ListBox.Item`.
 *
 * With an `id`, it takes part in the list's selection. In `single`, a press chooses it —
 * its title in the accent — and `onPress` still runs. In `multiple`, a box slides in at
 * its start while the list is selecting; a press on the row's first 48 points puts the
 * boxes out and ticks it, and while selecting every press ticks or unticks it and
 * `onPress` does not run. Under `asChild` the row is the caller's element and draws no
 * box.
 *
 * Disabled — by its own prop or by the list's — it is grey, its square too, it does not
 * move and it is never chosen. With motion reduced, or under `disable-all`, it does not
 * lean.
 */
export const ListBoxItemButton = forwardRef<View, ListBoxItemButtonProps>(
  function ListBoxItemButton(
    {
      children,
      id,
      isDisabled = false,
      asChild = false,
      accessibilityRole,
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      onLayout,
      ...props
    },
    ref
  ) {
    const { live, grey, isDisabled: isListDisabled, selection } = useListBox()
    const order = useListBoxOrder()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const isStill = useAnimationDisabled()
    const isReduced = useReducedMotion()
    const width = useRef(0)
    const isAtStart = useRef(false)
    const [isPressed, press] = usePressState({
      onPressIn: event => {
        haptic('press')
        isAtStart.current = isStartEdge(event, width.current)
        onPressIn?.(event)
      },
      onPressOut,
    })

    const disabled = isListDisabled || isDisabled
    const isSelectable = id !== undefined && selection.mode !== 'none' && !disabled
    const isTicked = id !== undefined && selection.isSelected(id)
    const isMultiple = selection.mode === 'multiple'
    const isChosen = selection.mode === 'single' && isTicked

    const base = disabled ? grey : live
    // A chosen row's title is written in the accent; nothing else on it changes.
    const row = useMemo(
      () => (isChosen ? { ...base, titleStyle: base.selectedTitleStyle } : base),
      [base, isChosen]
    )

    const handlePress = (event: GestureResponderEvent) => {
      if (isSelectable && selection.press(id, isAtStart.current)) return
      onPress?.(event)
    }

    const handleLayout = (event: LayoutChangeEvent) => {
      width.current = event.nativeEvent.layout.width
      onLayout?.(event)
    }

    const isFlat = isStill || isReduced
    const Row = isFlat ? PressableFeedback : PressTilt
    const lean = isFlat ? undefined : { depth: scale.row }
    const isChecking = isMultiple && selection.isSelecting

    return (
      <ListBoxRowProvider value={row}>
        <Row
          ref={ref}
          isPressed={isPressed}
          isDisabled={disabled}
          asChild={asChild}
          // Native's scale, highlight and ripple stay off: the press is the tilt alone.
          animation={isStill ? 'disable-all' : false}
          accessibilityRole={
            accessibilityRole ?? (isChecking ? 'checkbox' : 'button')
          }
          // Merged, not spread over: a caller naming another state keeps this one.
          accessibilityState={{
            disabled,
            ...(selection.mode === 'single' && id !== undefined
              ? { selected: isChosen }
              : null),
            ...(isChecking && id !== undefined ? { checked: isTicked } : null),
            ...accessibilityState,
          }}
          {...lean}
          {...rest}
          style={[
            row.itemStyle,
            // The touch is the row's, so where it landed is measured from the row.
            BOX_ONLY,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          onPress={handlePress}
          onLayout={handleLayout}
        >
          {/* Under `asChild` the one child is the caller's element, merged into: no box. */}
          {isMultiple && !asChild ? (
            <>
              <ListBoxCheck
                isSelecting={selection.isSelecting}
                isTicked={isTicked}
                span={selection.checkSpan}
                order={order}
              />
              {children}
            </>
          ) : (
            children
          )}
        </Row>
      </ListBoxRowProvider>
    )
  }
)

ListBoxItemButton.displayName = 'XAUI.Tram.ListBox.ItemButton'

const BOX_ONLY = { pointerEvents: 'box-only' } as const

/** Whether a touch landed on the row's start edge: its first 48 points, mirrored in RTL. */
function isStartEdge(event: GestureResponderEvent, width: number): boolean {
  const { locationX } = event.nativeEvent

  return I18nManager.isRTL
    ? locationX > width - TRAM_TOUCH_TARGET
    : locationX < TRAM_TOUCH_TARGET
}
