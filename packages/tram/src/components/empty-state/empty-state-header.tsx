import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateViewProps } from './empty-state.type'

/**
 * The square, the title and the sentence, as one block to the start — closer together
 * than they are to the button that acts on them.
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

EmptyStateHeader.displayName = 'XAUI.Tram.EmptyState.Header'
