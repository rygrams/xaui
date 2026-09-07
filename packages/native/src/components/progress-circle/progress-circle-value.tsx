import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { formatProgress } from '../../utils/progress'
import { useProgressCircle } from './progress-circle.context'
import type { ProgressCircleValueProps } from './progress-circle.type'

/**
 * How far along, written in the middle of the ring.
 *
 * It is positioned absolutely by the recipe so that it centres on the ring rather than
 * pushing it: the root is a box the size of the circle, and a text node in the flow would
 * make that box taller than the drawing in it.
 *
 * With no children it formats the fraction the root clamped, through the root's
 * `formatOptions`. Children replace it — an icon for a finished job, a count for a queue.
 */
export const ProgressCircleValue = forwardRef<Text, ProgressCircleValueProps>(
  function ProgressCircleValue({ children, style, ...props }, ref) {
    const { valueStyle, fraction, value, formatOptions } = useProgressCircle()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[valueStyle, styleProps, style]} {...rest}>
        {children ?? formatProgress(fraction, value, formatOptions)}
      </Text>
    )
  }
)

ProgressCircleValue.displayName = 'XAUI.ProgressCircle.Value'
