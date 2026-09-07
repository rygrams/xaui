import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSegment, useSegmentItem } from './segment.context'
import type { SegmentLabelProps } from './segment.type'

/**
 * The word on an option.
 *
 * The chosen one takes the colour that reads against the pill; the rest stay muted, which
 * is the whole of what says which option is current once the pill has slid.
 */
export const SegmentLabel = forwardRef<Text, SegmentLabelProps>(
  function SegmentLabel({ children, style, ...props }, ref) {
    const { labelStyle, labelSelectedStyle } = useSegment()
    const { isSelected } = useSegmentItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        {...rest}
        style={[labelStyle, isSelected && labelSelectedStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

SegmentLabel.displayName = 'XAUI.Segment.Label'
