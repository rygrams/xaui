import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarViewSlotProps } from './progress-bar.type'

/**
 * The bar — the whole of the distance, in a soft grey, and the room left to go.
 *
 * ```tsx
 * <ProgressBar.Track>
 *   <ProgressBar.Fill />
 * </ProgressBar.Track>
 * ```
 *
 * It clips, which is what lets the fill be a child that grows, and what hides the bubbles
 * of an indeterminate bar before its start and past its end. It is also the node that
 * knows how long the bar is, which the bubbles' run is measured on.
 */
export const ProgressBarTrack = forwardRef<View, ProgressBarViewSlotProps>(
  function ProgressBarTrack({ children, style, onLayout, ...props }, ref) {
    const { trackStyle, setTrackWidth } = useProgressBar()
    const [styleProps, rest] = useStyleProps(props)

    const measure = useCallback(
      (event: LayoutChangeEvent) => {
        onLayout?.(event)
        setTrackWidth(event.nativeEvent.layout.width)
      },
      [onLayout, setTrackWidth]
    )

    return (
      <View
        ref={ref}
        {...rest}
        onLayout={measure}
        style={[trackStyle, styleProps, style]}
      >
        {children}
      </View>
    )
  }
)

ProgressBarTrack.displayName = 'XAUI.Tram.ProgressBar.Track'
