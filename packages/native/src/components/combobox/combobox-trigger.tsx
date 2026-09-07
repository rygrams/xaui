import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { IconContext } from '../../system/icon'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useAutocomplete } from '../autocomplete'
import type { ComboboxTriggerProps } from './combobox.type'

/**
 * The field box: the input, and whatever sits beside it.
 *
 * **A `View`, not a `Pressable`.** The thing you press is the input inside it, and a
 * pressable wrapper around a text field is a second target laid over the one that already
 * takes the tap — on the same pixels, with a different effect. The autocomplete's trigger
 * is a pressable because it holds no field; this one holds nothing else.
 *
 * It measures itself in window coordinates, because that rectangle is what the panel
 * positions against, and it measures again **on every open**: `onLayout` fires when the
 * trigger is laid out and never after, so one inside a `ScrollView` would otherwise open
 * its panel against a rectangle that has since walked off the screen.
 */
export const ComboboxTrigger = forwardRef<View, ComboboxTriggerProps>(
  function ComboboxTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'combobox',
      accessibilityState,
      style,
      onLayout,
      ...props
    },
    ref
  ) {
    const { triggerStyle, glyph, isOpen, isDisabled, isInvalid, setAnchor } =
      useAutocomplete()

    const [styleProps, rest] = useStyleProps(props)
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

    const Root = asChild ? Slot : View

    return (
      <IconContext.Provider value={glyph}>
        <Root
          ref={refs}
          // `combobox` on the box rather than on the input: it is the box that expands,
          // and a screen reader reads the field inside it as the field it is.
          accessibilityRole={accessibilityRole}
          accessibilityState={{
            disabled: isDisabled,
            expanded: isOpen,
            ...accessibilityState,
          }}
          aria-invalid={isInvalid || undefined}
          {...rest}
          onLayout={handleLayout}
          style={[triggerStyle, styleProps, style]}
        >
          {children}
        </Root>
      </IconContext.Provider>
    )
  }
)

ComboboxTrigger.displayName = 'XAUI.Combobox.Trigger'
