import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarViewSlotProps } from './progress-bar.type'

/**
 * The line above the bar: what is happening, and how far along it is.
 *
 * ```tsx
 * <ProgressBar.Header>
 *   <ProgressBar.Label>téléchargement</ProgressBar.Label>
 *   <ProgressBar.Value />
 * </ProgressBar.Header>
 * ```
 *
 * A row of its own, since a label and a value pushed to opposite ends are spaced by what
 * holds them and not by a margin on either.
 */
export const ProgressBarHeader = forwardRef<View, ProgressBarViewSlotProps>(
  function ProgressBarHeader({ children, style, ...props }, ref) {
    const { headerStyle } = useProgressBar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[headerStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ProgressBarHeader.displayName = 'XAUI.Tram.ProgressBar.Header'
