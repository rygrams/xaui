import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { usePivot } from './pivot.context'
import type { PivotTitleProps } from './pivot.type'

/**
 * The app's name above the titles, in the `caption` role and the page's ink, on the
 * margin. It does not move with the loop. Its case is the app's: Metro wrote it in
 * capitals, and so does the app that wants them.
 */
export const PivotTitle = forwardRef<Text, PivotTitleProps>(function PivotTitle(
  { children, style, ...props },
  ref
) {
  const { titleStyle } = usePivot()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      accessibilityRole="header"
      numberOfLines={1}
      {...rest}
      style={[titleStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

PivotTitle.displayName = 'XAUI.Tram.Pivot.Title'
