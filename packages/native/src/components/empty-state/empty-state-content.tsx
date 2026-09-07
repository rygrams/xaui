import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateViewProps } from './empty-state.type'

/**
 * What to do about it: a button, or two.
 *
 * A row, because two actions in an empty state are a primary and a way out of it, and those
 * belong side by side. A column of buttons is a `style` away and is what a narrow phone with
 * two long labels wants.
 *
 * **It is optional and it is separate**, which is the point: an empty state with nothing to
 * do about it leaves this out entirely rather than rendering an empty row with a gap above it.
 */
export const EmptyStateContent = forwardRef<View, EmptyStateViewProps>(
  function EmptyStateContent({ children, style, ...props }, ref) {
    const { contentStyle } = useEmptyState()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

EmptyStateContent.displayName = 'XAUI.EmptyState.Content'
