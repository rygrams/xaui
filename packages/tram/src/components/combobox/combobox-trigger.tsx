import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext, Slot, useStyleProps } from '@xaui/native/system'
import { SelectBox } from '../select/select-box'
import { useSelect } from '../select/select.context'
import type { ComboboxTriggerProps } from './combobox.type'

/**
 * The field's row in the `TextField`'s box — the `Select`'s box, whose list unfolds under
 * this row rather than over it, so the field stays to be typed into. The border is the
 * accent read as ink while the list is open.
 *
 * `ref`, `style` and the view's props are the row's.
 */
export const ComboboxTrigger = forwardRef<View, ComboboxTriggerProps>(
  function ComboboxTrigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'combobox',
      accessibilityState,
      style,
      ...props
    },
    ref
  ) {
    const { triggerStyle, glyph, isOpen, isDisabled, isInvalid } = useSelect()
    const [styleProps, rest] = useStyleProps(props)

    const Row = asChild ? Slot : View

    return (
      <SelectBox>
        <IconContext.Provider value={glyph}>
          <Row
            ref={ref}
            accessibilityRole={accessibilityRole}
            // Merged, not spread over: a caller naming another state must not drop these.
            accessibilityState={{
              disabled: isDisabled,
              expanded: isOpen,
              ...accessibilityState,
            }}
            aria-invalid={isInvalid || undefined}
            {...rest}
            style={[triggerStyle, styleProps, style]}
          >
            {children}
          </Row>
        </IconContext.Provider>
      </SelectBox>
    )
  }
)

ComboboxTrigger.displayName = 'XAUI.Tram.Combobox.Trigger'
