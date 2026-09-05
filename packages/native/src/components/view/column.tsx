import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import type { ColumnProps } from './view.type'

/**
 * A vertical axis.
 *
 * ```tsx
 * <Column gap={16} padding={16}>
 *   <Typography variant="h3">Projets</Typography>
 *   <Typography variant="body-sm">Trois en cours, un archivé.</Typography>
 * </Column>
 * ```
 *
 * **It contributes one declaration**, `flexDirection: 'column'` — which is React Native's
 * default, so this component exists for what it *says* rather than for what it changes.
 * A column written as a column reads as a deliberate axis, and its siblings in a layout
 * are then all named the same way; a bare `View` leaves the reader to infer it.
 *
 * Everything else comes from R14: `gap`, `alignItems`, `justifyContent`, `padding` are
 * `ViewStyle` keys every node already exposes as props, under React Native's own names.
 */
export const Column = forwardRef<View, ColumnProps>(function Column(
  { children, asChild = false, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const Root = asChild ? Slot : View

  // Declared rather than left implicit: it is React Native's default, but a `Column`
  // that did not state its own axis would break the moment one were composed into a row.
  return (
    <Root ref={ref} style={[{ flexDirection: 'column' }, styleProps, style]} {...rest}>
      {children}
    </Root>
  )
})

Column.displayName = 'XAUI.Column'
