import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateContextValue, EmptyStateTextProps } from './empty-state.type'

/**
 * The two text slots, which differ only in which resolved style they read.
 *
 * Written once and named twice rather than copied: two copies of a four-line merge is two
 * places for the order to drift.
 */
function textSlot(
  key: 'titleStyle' | 'descriptionStyle',
  name: string,
  role?: 'header'
) {
  const Component = forwardRef<Text, EmptyStateTextProps>(function EmptyStateText(
    { children, accessibilityRole, style, ...props },
    ref
  ) {
    const context: EmptyStateContextValue = useEmptyState()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole ?? role}
        style={[context[key], styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  })

  Component.displayName = name
  return Component
}

/** What is missing. A `header`, which is what a screen reader jumps between. */
export const EmptyStateTitle = textSlot(
  'titleStyle',
  'XAUI.EmptyState.Title',
  'header'
)

/** Why, or what to do about it. Under the title, and quieter. */
export const EmptyStateDescription = textSlot(
  'descriptionStyle',
  'XAUI.EmptyState.Description'
)
