import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useEmptyState } from './empty-state.context'
import type { EmptyStateTextProps } from './empty-state.type'

/** The two text slots differ only in the resolved style they read: written once. */
function textSlot(
  key: 'titleStyle' | 'descriptionStyle',
  name: string,
  role?: 'header'
) {
  const Component = forwardRef<Text, EmptyStateTextProps>(function EmptyStateText(
    { children, accessibilityRole, style, ...props },
    ref
  ) {
    const context = useEmptyState()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole ?? role}
        {...rest}
        style={[context[key], styleProps, style]}
      >
        {children}
      </Text>
    )
  })

  Component.displayName = name
  return Component
}

/** What is missing, on the Tram role the size chose. A `header`, for a screen reader. */
export const EmptyStateTitle = textSlot(
  'titleStyle',
  'XAUI.Tram.EmptyState.Title',
  'header'
)

/** Why, or what to do about it: the title's ink, faded as the `Card`'s detail is. */
export const EmptyStateDescription = textSlot(
  'descriptionStyle',
  'XAUI.Tram.EmptyState.Description'
)
