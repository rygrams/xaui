import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateViewProps } from './empty-state.type'

/**
 * The mark, the title and the sentence, as one block.
 *
 * Its gap is tighter than the root's, which is the whole reason it exists: three things that
 * say one thing belong closer together than they do to the button that acts on them.
 */
export const EmptyStateHeader = forwardRef<View, EmptyStateViewProps>(
  function EmptyStateHeader({ children, style, ...props }, ref) {
    const { headerStyle } = useEmptyState()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[headerStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

EmptyStateHeader.displayName = 'XAUI.EmptyState.Header'
