import { forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FieldGroupSuffix } from '../field-group'
import { useTextField } from '../text-field'
import { warnDev } from '../../utils/warn-dev'
import { useTimeField } from './time-field.context'
import type { TimeFieldPeriodProps } from './time-field.type'

/** A two-letter word is the right size to read and the wrong size to hit. */
const HIT_SLOP = 12

/**
 * AM or PM, on the trailing edge, and pressing it swaps them.
 *
 * ```tsx
 * <FieldGroup>
 *   <TimeField.Field />
 *   <TimeField.Period accessibilityLabel="Morning or afternoon" />
 * </FieldGroup>
 * ```
 *
 * **A toggle rather than two letters typed into the box.** The keyboard a time field opens
 * is a number pad, which cannot produce them — the legacy field asked for exactly that and
 * the letters never arrived. Two halves of a day is also a choice between two things, which
 * is a control rather than a value.
 *
 * **It renders nothing on a twenty-four-hour field**, so the same JSX serves both and a
 * locale that switches cycle does not need a branch at the call site.
 *
 * It goes in a `FieldGroup`, like `DateField.Trigger`: that is the thing that lays a
 * decorator over a field and measures it, and the field reads the same measurement to leave
 * it room.
 */
export const TimeFieldPeriod = forwardRef<View, TimeFieldPeriodProps>(
  function TimeFieldPeriod({ accessibilityLabel, ...props }, ref) {
    const { period, periodLabels, onPeriodChange, hasPeriod } = useTimeField()
    const { isDisabled, labelStyle } = useTextField()

    if (hasPeriod && !accessibilityLabel) {
      warnDev(
        'TimeField.Period: the toggle needs an `accessibilityLabel` — "AM" read on its ' +
          'own says the value, not that pressing it changes which half of the day it is.'
      )
    }

    if (!hasPeriod) return null

    return (
      <FieldGroupSuffix ref={ref} {...props}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ disabled: isDisabled }}
          accessibilityValue={{ text: periodLabels[period] }}
          disabled={isDisabled}
          hitSlop={HIT_SLOP}
          onPress={() => onPeriodChange(period === 'am' ? 'pm' : 'am')}
        >
          {/* The label's own style, because that is the type in a field that is *about* the
              field rather than in it — the same weight the label above the box carries. */}
          <Text style={labelStyle}>{periodLabels[period]}</Text>
        </Pressable>
      </FieldGroupSuffix>
    )
  }
)

TimeFieldPeriod.displayName = 'XAUI.TimeField.Period'
