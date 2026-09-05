import { forwardRef, useCallback, useEffect, useRef } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { IconContext } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectTriggerProps } from './select.type'

/**
 * The control. It is the field the user sees, and the only node of this component that a
 * caller can hold a ref to — the root has none.
 *
 * It measures itself in window coordinates on every layout, because that rectangle is
 * what the list positions against. `measureInWindow` rather than the layout event's own
 * `x`/`y`: those are relative to the parent, and an overlay lives in a portal that shares
 * no parent with the trigger.
 *
 * The measurement goes through a ref of its own rather than the event's `currentTarget`.
 * That field is a node handle on the old architecture and a host instance on the new one,
 * and only one of the two answers `measureInWindow` — which is a crash on Android and
 * nowhere else, the worst shape a bug can take.
 *
 * **It measures again every time the list opens**, and that is the load-bearing one.
 * `onLayout` fires when the trigger is laid out and never again — not on scroll — so a
 * trigger inside a `ScrollView` reports the position it had before the user moved, and
 * the list opens against a rectangle that has since walked off. Far enough down a screen
 * it opens past the bottom of the window and looks like nothing happened at all.
 */
export const SelectTrigger = forwardRef<View, SelectTriggerProps>(
  function SelectTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onLayout,
      onPressIn,
      onPressOut,
      onPress,
      ...props
    },
    ref
  ) {
    const {
      triggerStyle,
      triggerPressedStyle,
      glyph,
      isOpen,
      isDisabled,
      isInvalid,
      toggle,
      setAnchor,
    } = useSelect()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const node = useRef<View | null>(null)
    const refs = useMergedRef(node, ref)

    const measure = useCallback(() => {
      node.current?.measureInWindow((x, y, width, height) => {
        setAnchor({ x, y, width, height })
      })
    }, [setAnchor])

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        measure()
      },
      [measure, onLayout]
    )

    // On every open, and not only on the press: a caller driving `isOpen` themselves gets
    // the same fresh rectangle as one who tapped.
    useEffect(() => {
      if (isOpen) measure()
    }, [isOpen, measure])

    const handlePress = useCallback(
      (event: Parameters<NonNullable<SelectTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        // Before the toggle, so the panel's first pass already has the right rectangle
        // rather than positioning once against the stale one and jumping.
        measure()
        toggle()
      },
      [measure, onPress, toggle]
    )

    return (
      <IconContext.Provider value={glyph}>
        <PressableFeedback
          ref={refs}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          accessibilityRole={accessibilityRole}
          // Merged rather than spread over: a caller adding `selected` must not drop the
          // expanded state a screen reader uses to announce that the list is open.
          accessibilityState={{
            disabled: isDisabled,
            expanded: isOpen,
            ...accessibilityState,
          }}
          aria-invalid={isInvalid || undefined}
          {...rest}
          onLayout={handleLayout}
          style={[
            triggerStyle,
            isPressed && triggerPressedStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          // After `rest`, and composed rather than replacing: a caller's handlers run, and
          // the states their own styles depend on still happen.
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {children}
        </PressableFeedback>
      </IconContext.Provider>
    )
  }
)

SelectTrigger.displayName = 'XAUI.Select.Trigger'
