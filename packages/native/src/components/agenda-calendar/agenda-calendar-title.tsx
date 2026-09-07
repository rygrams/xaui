import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { monthLabel } from '../../utils/dates'
import { useAgendaCalendar } from './agenda-calendar.context'
import type { AgendaCalendarTextSlotProps } from './agenda-calendar.type'

/** The fourth of seven. Whichever month owns it owns at least four of the days. */
const MIDDLE = 3

/**
 * The month the week is in.
 *
 * A week can straddle two of them, and it is named after the month **its middle day** falls
 * in — which is always the majority month of a seven-day window, and is the only rule that
 * does not call a week with six September days in it "August".
 *
 * It is a `Text` and not a button. The chevron beside it in most designs opens a full
 * `Calendar`, and what that opens into — a sheet, a popover, a screen — is the caller's, so
 * the pressable around it is theirs too.
 */
export const AgendaCalendarTitle = forwardRef<Text, AgendaCalendarTextSlotProps>(
  function AgendaCalendarTitle(
    { children, accessibilityRole, style, ...props },
    ref
  ) {
    const { titleStyle, days, locale } = useAgendaCalendar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole ?? 'header'}
        style={[titleStyle, styleProps, style]}
        {...rest}
      >
        {children ?? monthLabel(days[MIDDLE], locale)}
      </Text>
    )
  }
)

AgendaCalendarTitle.displayName = 'XAUI.AgendaCalendar.Title'
