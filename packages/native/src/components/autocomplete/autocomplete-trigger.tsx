import { forwardRef, useCallback, useEffect, useRef } from 'react'
import type { LayoutChangeEvent, View } from 'react-native'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { usePressState } from '../../hooks/use-press-state'
import { IconContext } from '../../system/icon'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from './autocomplete.context'
import type { AutocompleteTriggerProps } from './autocomplete.type'

/**
 * The control: the field the user sees, and the only node of this component a caller can
 * hold a ref to — the root has none.
 *
 * It measures itself in window coordinates, because that rectangle is what the panel
 * positions against, and it measures again **on every open**: `onLayout` fires when the
 * trigger is laid out and never after, so one inside a `ScrollView` would otherwise open
 * its panel against a rectangle that has since walked off the screen.
 *
 * `accessibilityRole` is `combobox` rather than `button` — the control opens a list you
 * type into, and that is the role that says so.
 */
export const AutocompleteTrigger = forwardRef<View, AutocompleteTriggerProps>(
  function AutocompleteTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'combobox',
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
    } = useAutocomplete()

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

    useEffect(() => {
      if (isOpen) measure()
    }, [isOpen, measure])

    const handlePress = useCallback(
      (event: Parameters<NonNullable<AutocompleteTriggerProps['onPress']>>[0]) => {
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

AutocompleteTrigger.displayName = 'XAUI.Autocomplete.Trigger'
