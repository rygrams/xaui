import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarViewSlotProps } from './progress-bar.type'

/**
 * The rail — the whole of the distance, and the room left to go.
 *
 * It clips, which is what lets the fill be a child that grows rather than a layer over the
 * rail: one `radius` rounds both, and the fill cannot escape the corner at 100%.
 */
export const ProgressBarTrack = forwardRef<View, ProgressBarViewSlotProps>(
  function ProgressBarTrack({ children, style, ...props }, ref) {
    const { trackStyle } = useProgressBar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[trackStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ProgressBarTrack.displayName = 'XAUI.ProgressBar.Track'
