import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import type { RowProps } from './view.type'

/**
 * A horizontal axis.
 *
 * ```tsx
 * <Row gap={8} alignItems="center">
 *   <Button.Icon as={Trash2} />
 *   <Typography variant="h6">Supprimer</Typography>
 * </Row>
 * ```
 *
 * **It contributes one declaration**, `flexDirection: 'row'`, and everything else it looks
 * like it offers comes from R14: `gap`, `alignItems`, `justifyContent`, `padding` and the
 * rest are `ViewStyle` keys every node already exposes as props. That is deliberate — the
 * legacy component invented `mainAxisAlignment`, `crossAxisAlignment` and `mainAxisSize`,
 * a vocabulary to learn for saying what React Native already says.
 *
 * There is no `reversed` prop either. `row` already flips in an RTL layout, which is the
 * case that matters, and a genuine reversal is `style={{ flexDirection: 'row-reverse' }}`.
 */
export const Row = forwardRef<View, RowProps>(function Row(
  { children, asChild = false, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const Root = asChild ? Slot : View

  // The direction first, so nothing the caller writes can be shadowed by it — and last
  // in intent, since `flexDirection` is not among the style props this component exposes.
  return (
    <Root ref={ref} style={[{ flexDirection: 'row' }, styleProps, style]} {...rest}>
      {children}
    </Root>
  )
})

Row.displayName = 'XAUI.Row'
