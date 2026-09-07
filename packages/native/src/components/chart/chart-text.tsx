import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChart } from './chart.context'
import type { ChartFrameContextValue } from './chart.context'
import type { ChartTextSlotProps } from './chart.type'

/**
 * The three text slots of a frame, which differ only in which resolved style they read.
 *
 * Written once and named three times rather than copied: a slot that reads one style off a
 * context and merges the caller's is four lines, and three copies of four lines is three
 * places for the merge order to drift.
 */
function textSlot(
  key: 'titleStyle' | 'descriptionStyle' | 'valueStyle',
  name: string,
  role?: 'header'
) {
  const Component = forwardRef<Text, ChartTextSlotProps>(function ChartText(
    { children, accessibilityRole, style, ...props },
    ref
  ) {
    const context: ChartFrameContextValue = useChart()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole ?? role}
        style={[context[key], styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  })

  Component.displayName = name
  return Component
}

/** What the figure is. A `header`, which is what a screen reader jumps between. */
export const ChartTitle = textSlot('titleStyle', 'XAUI.Chart.Title', 'header')

/** What it is measuring — the unit, the period, the caveat. */
export const ChartDescription = textSlot(
  'descriptionStyle',
  'XAUI.Chart.Description'
)

/**
 * The one number the figure is about, when it is about one — a balance, a total, a count.
 * In `tabular-nums`, so a number that grows a digit does not shift the words beside it.
 */
export const ChartValue = textSlot('valueStyle', 'XAUI.Chart.Value')
