import { forwardRef } from 'react'
import { View } from 'react-native'
import { Icon } from '../../system/icon'
import { useStyleProps } from '../../system/style-props'
import { useAlert } from './alert.context'
import type { AlertIconProps } from './alert.type'

/**
 * The mark of what the message is — a check, a triangle, a cross.
 *
 * ```tsx
 * <Alert variant="warning-soft">
 *   <Alert.Icon as={TriangleIcon} />
 *   <Alert.Content>…</Alert.Content>
 * </Alert>
 * ```
 *
 * The size and the colour come from the root, which resolved them once; an explicit `size`
 * or `color` still wins, and that is the escape hatch for the alert whose icon has to
 * disagree with its variant — a neutral `default` surface with a green check, which is how
 * HeroUI colours its own.
 *
 * **This slot renders a box**, unlike `Button.Icon` and `Chip.Icon`, which hand their
 * props straight to a third-party component. It has to: an alert's icon sits beside a
 * block of text rather than on one line with it, and lining the glyph up with the first
 * line's cap-height means offsetting it by half the leading. That is a style, and a style
 * needs a node — which is also what lets this slot carry style props at all.
 *
 * **No default glyph**, where HeroUI ships three. XAUI publishes no icon set — `@xaui/icons`
 * was deleted in P0 — so an icon here is always the caller's, and the alert's job is to
 * size and colour it rather than to choose it.
 */
export const AlertIcon = forwardRef<View, AlertIconProps>(function AlertIcon(
  { as, children, source, size, color, style, ...props },
  ref
) {
  const { iconStyle, icon } = useAlert()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} style={[iconStyle, styleProps, style]} {...rest}>
      <Icon
        as={as}
        source={source}
        size={size ?? icon.size}
        color={color ?? icon.color}
      >
        {children}
      </Icon>
    </View>
  )
})

AlertIcon.displayName = 'XAUI.Alert.Icon'
