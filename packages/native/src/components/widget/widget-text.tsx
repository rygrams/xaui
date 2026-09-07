import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useWidget } from './widget.context'
import type { WidgetContextValue, WidgetTextSlotProps } from './widget.type'

/**
 * The three text slots, which differ only in which resolved style they read.
 *
 * Written once and named three times rather than copied: three copies of a four-line merge
 * is three places for the order to drift.
 */
function textSlot(
  key: 'titleStyle' | 'descriptionStyle' | 'footerStyle',
  name: string,
  role?: 'header'
) {
  const Component = forwardRef<Text, WidgetTextSlotProps>(function WidgetText(
    { children, accessibilityRole, style, ...props },
    ref
  ) {
    const context: WidgetContextValue = useWidget()
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

/** What the widget is. A `header`, which is what a screen reader jumps between. */
export const WidgetTitle = textSlot('titleStyle', 'XAUI.Widget.Title', 'header')

/** What it is showing — the period, the unit, the caveat. Under the title. */
export const WidgetDescription = textSlot(
  'descriptionStyle',
  'XAUI.Widget.Description'
)

/**
 * The line under the well: when it was last updated, over what range, what it excludes.
 *
 * A `Text` rather than a row, because that is what it almost always is. A footer that needs
 * a control in it is a `View` the caller writes, and this slot is what they put in it.
 */
export const WidgetFooter = textSlot('footerStyle', 'XAUI.Widget.Footer')
