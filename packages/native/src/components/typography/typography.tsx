import { forwardRef } from 'react'
import { Text } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { typographyRecipe } from './typography.recipe'
import type { TypographyProps } from './typography.type'

/**
 * Text, by the role it plays.
 *
 * ```tsx
 * <Typography variant="heading-lg">Projets</Typography>
 * <Typography>Trois en cours, un archivé.</Typography>
 * <Typography variant="caption">Mis à jour il y a deux minutes</Typography>
 * ```
 *
 * **One node, and no slots.** A paragraph is a `Text`; there is nothing inside it for the
 * component to publish. Styling a fragment of it is `TextSpan`'s job, not a slot of this
 * one — React Native already makes a nested `Text` inherit from its parent, so a span
 * needs no context, no resolved style and nothing from here. This component would only be
 * duplicating a mechanism the platform ships.
 *
 * **The role fixes size, line height, weight and family together**, which is why there is
 * no `size` and no `weight` prop: those axes are not free to combine. A one-off deviation
 * is a style prop — `fontSize={17}` — said plainly rather than dressed as vocabulary.
 *
 * Alignment likewise has no prop of its own: `textAlign` is a `TextStyle` key, so R14
 * already exposes it, and the caller writes the value React Native understands instead of
 * a translation layer this component would have to keep honest.
 */
export const Typography = forwardRef<Text, TypographyProps>(function Typography(
  { children, variant, color, asChild = false, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  // R14, after the component's own vocabulary is destructured: that is what keeps `color`
  // R7's tint rather than the `TextStyle` key of the same name.
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant }
  const styles = typographyRecipe.resolve({ theme, selection })
  // Never cached: a raw tint takes arbitrary values, and letting one into the key would
  // grow the table with the colours callers invent rather than with the ten roles.
  const tint = color
    ? typographyRecipe.tint({ theme, color, selection })
    : undefined

  // The order of §2 ter, most general to most specific: the cached role, the uncached
  // tint, the style props, then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // R12 — the caller's element becomes the text node and keeps the role's style. No
  // `accessibilityRole` default: a `Text` announces as text already, and naming one here
  // would override whatever the caller's element brought with it.
  const Root = asChild ? Slot : Text

  return (
    <Root ref={ref} style={rootStyle} {...rest}>
      {children}
    </Root>
  )
})

Typography.displayName = 'XAUI.Typography'
