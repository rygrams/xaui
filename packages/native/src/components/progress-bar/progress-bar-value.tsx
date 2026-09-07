import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { formatProgress } from '../../utils/progress'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarTextSlotProps } from './progress-bar.type'

/**
 * How far along, as text.
 *
 * ```tsx
 * <ProgressBar.Value />
 * <ProgressBar.Value>{`${done} sur ${total}`}</ProgressBar.Value>
 * ```
 *
 * With no children it formats the fraction the root clamped, through the root's
 * `formatOptions` — a percentage by default, and a currency or a unit if that is what the
 * bar is counting. Children replace it outright, for the cases `Intl` has no opinion on.
 *
 * It is in `tabular-nums`, so a number ticking from 9% to 10% does not shift the label
 * beside it.
 */
export const ProgressBarValue = forwardRef<Text, ProgressBarTextSlotProps>(
  function ProgressBarValue({ children, style, ...props }, ref) {
    const { valueStyle, fraction, value, formatOptions } = useProgressBar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[valueStyle, styleProps, style]} {...rest}>
        {children ?? formatProgress(fraction, value, formatOptions)}
      </Text>
    )
  }
)

ProgressBarValue.displayName = 'XAUI.ProgressBar.Value'
