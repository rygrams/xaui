import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useFab } from './fab.context'
import type { FabLabelProps } from './fab.type'

/**
 * The word beside the mark, on an extended FAB.
 *
 * Single-line by default: an extended FAB is a control with a height, and a label too long
 * for it should truncate rather than deform the box — the `Button.Label`'s rule.
 */
export const FabLabel = forwardRef<Text, FabLabelProps>(function FabLabel(
  { children, numberOfLines = 1, style, ...props },
  ref
) {
  const { labelStyle } = useFab()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      {...rest}
      style={[labelStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

FabLabel.displayName = 'XAUI.Fab.Label'
