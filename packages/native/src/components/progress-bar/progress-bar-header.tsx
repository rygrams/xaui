import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarViewSlotProps } from './progress-bar.type'

/**
 * The line above the rail: what is happening, and how far along it is.
 *
 * ```tsx
 * <ProgressBar.Header>
 *   <ProgressBar.Label>Téléchargement</ProgressBar.Label>
 *   <ProgressBar.Value />
 * </ProgressBar.Header>
 * ```
 *
 * It exists because R4 puts the gap and the alignment on a root rather than on the things
 * being spaced, and a label and a value pushed to opposite ends are a row of their own —
 * the alternative was a `justifyContent` on the bar's root that only made sense while
 * exactly those two slots were the first children.
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

ProgressBarHeader.displayName = 'XAUI.ProgressBar.Header'
