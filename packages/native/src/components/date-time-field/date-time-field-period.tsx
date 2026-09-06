import { forwardRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FieldGroupSuffix } from '../field-group'
import { useTextField } from '../text-field'
import { warnDev } from '../../utils/warn-dev'
import { useDateTimeField } from './date-time-field.context'
import type { DateTimeFieldPeriodProps } from './date-time-field.type'

/** A two-letter word is the right size to read and the wrong size to hit. */
const HIT_SLOP = 12

/**
 * AM or PM, on the trailing edge, and pressing it swaps them.
 *
 * `TimeField.Period` on the field that carries a date as well — a toggle rather than two
 * letters typed into the box, because the keyboard a masked field opens is a number pad and
 * cannot produce them. It renders nothing on a twenty-four-hour field, so the same JSX
 * serves both cycles.
 */
export const DateTimeFieldPeriod = forwardRef<View, DateTimeFieldPeriodProps>(
  function DateTimeFieldPeriod({ accessibilityLabel, ...props }, ref) {
    const { period, periodLabels, onPeriodChange, hasPeriod } = useDateTimeField()
    const { isDisabled, labelStyle } = useTextField()

    if (hasPeriod && !accessibilityLabel) {
      warnDev(
        'DateTimeField.Period: the toggle needs an `accessibilityLabel` — "AM" read on ' +
          'its own says the value, not that pressing it changes which half of the day it is.'
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
          <Text style={labelStyle}>{periodLabels[period]}</Text>
        </Pressable>
      </FieldGroupSuffix>
    )
  }
)

DateTimeFieldPeriod.displayName = 'XAUI.DateTimeField.Period'
