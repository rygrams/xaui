import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { progressText } from '../../system/progress'
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
 * With no children it formats the progress through the root's `formatOptions` — a
 * percentage by default. Children replace it. An indeterminate bar has no number to
 * give, so it writes only the children it is handed.
 *
 * In `tabular-nums`, so a number going from 9 % to 10 % does not push the label.
 */
export const ProgressBarValue = forwardRef<Text, ProgressBarTextSlotProps>(
  function ProgressBarValue({ children, style, ...props }, ref) {
    const { valueStyle, place, value, formatOptions, isIndeterminate } =
      useProgressBar()
    const [styleProps, rest] = useStyleProps(props)

    const text = isIndeterminate ? null : progressText(place, value, formatOptions)

    return (
      <Text ref={ref} style={[valueStyle, styleProps, style]} {...rest}>
        {children ?? text}
      </Text>
    )
  }
)

ProgressBarValue.displayName = 'XAUI.Tram.ProgressBar.Value'
