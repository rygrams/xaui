import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useChart } from './chart.context'
import type { ChartTextSlotProps } from './chart.type'

/** The three text slots of a frame, which differ only in which resolved style they read. */
function textSlot(
  key: 'titleStyle' | 'descriptionStyle' | 'valueStyle',
  name: string,
  role?: 'header'
) {
  const Component = forwardRef<Text, ChartTextSlotProps>(function ChartText(
    { children, accessibilityRole, style, ...props },
    ref
  ) {
    const context = useChart()
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

/** What the figure is, on the `title` role in Light. A `header` to a screen reader. */
export const ChartTitle = textSlot('titleStyle', 'XAUI.Tram.Chart.Title', 'header')

/** What it is measuring — the unit, the period — on `caption`, in the muted ink. */
export const ChartDescription = textSlot(
  'descriptionStyle',
  'XAUI.Tram.Chart.Description'
)

/** The one number the figure is about: `section` Light, the big Metro figure, tabular. */
export const ChartValue = textSlot('valueStyle', 'XAUI.Tram.Chart.Value')
