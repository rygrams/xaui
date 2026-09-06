import { forwardRef } from 'react'
import { Pressable, View } from 'react-native'
import { FieldGroupSuffix } from '../field-group'
import { useTextField } from '../text-field'
import { warnDev } from '../../utils/warn-dev'
import { DateFieldGlyph } from './date-field-glyph'
import { useDateField } from './date-field.context'
import type { DateFieldTriggerProps } from './date-field.type'

/** A glyph is the right size to look at and the wrong size to hit. */
const HIT_SLOP = 12

/**
 * The calendar on the trailing edge, which opens `DateField.Sheet`.
 *
 * ```tsx
 * <FieldGroup>
 *   <DateField.Field />
 *   <DateField.Trigger accessibilityLabel="Ouvrir le calendrier" />
 * </FieldGroup>
 * <DateField.Sheet />
 * ```
 *
 * **It goes in a `FieldGroup`**, because that is the thing that lays a decorator over a
 * field and measures it — this is a `FieldGroup.Suffix` with a press and a glyph in it, and
 * `DateField.Field` reads the same measurement to leave it room. Writing the group out is
 * what keeps the trigger optional: a date that is only ever typed has no calendar beside it.
 *
 * With no children it draws the built-in calendar. An `Icon` as children replaces it, and
 * takes the field's own size and colour like every other glyph in a field.
 *
 * It needs an `accessibilityLabel`: a calendar mark is not text, and the label above the
 * field names the date rather than the action. There is no default, because which language
 * it would be in is not this library's to decide.
 */
export const DateFieldTrigger = forwardRef<View, DateFieldTriggerProps>(
  function DateFieldTrigger({ children, accessibilityLabel, ...props }, ref) {
    const { isOpen, setOpen } = useDateField()
    const { isDisabled } = useTextField()

    if (!accessibilityLabel) {
      warnDev(
        'DateField.Trigger: the calendar needs an `accessibilityLabel` — the mark is not ' +
          'text, and the label above the field names the date rather than the action.'
      )
    }

    return (
      <FieldGroupSuffix ref={ref} {...props}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
          disabled={isDisabled}
          hitSlop={HIT_SLOP}
          onPress={() => setOpen(true)}
        >
          {children ?? <DateFieldGlyph />}
        </Pressable>
      </FieldGroupSuffix>
    )
  }
)

DateFieldTrigger.displayName = 'XAUI.DateField.Trigger'
