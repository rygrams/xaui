import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateViewProps } from './empty-state.type'

/**
 * What to do about it: a button or two, in a row from the start. Optional — an empty
 * state with nothing to do leaves it out rather than draw an empty row.
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

EmptyStateContent.displayName = 'XAUI.Tram.EmptyState.Content'
