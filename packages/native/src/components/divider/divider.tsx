import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { dividerRecipe } from './divider.recipe'
import type { DividerProps } from './divider.type'

/**
 * The line between two things.
 *
 * ```tsx
 * <Column gap={12}>
 *   <Row>…</Row>
 *   <Divider />
 *   <Row>…</Row>
 * </Column>
 *
 * <Row gap={12}>
 *   <Typography>Brouillon</Typography>
 *   <Divider orientation="vertical" />
 *   <Typography>Il y a deux minutes</Typography>
 * </Row>
 * ```
 *
 * **One node and no slots.** A rule is a filled box one point thick; there is nothing
 * inside it. A divider with a word in the middle of it is a `Row` holding two of these
 * and a `Typography`, which is the composition the library already has — inventing a
 * `Divider.Label` would put a layout inside a line.
 *
 * **It takes the axis it does not run along from its parent.** `alignSelf: 'stretch'` is
 * the whole mechanism: in a `Column` that is full width, in a `Row` it is full height, and
 * on the axis the thickness fixes it is ignored. So a divider needs no width prop, and a
 * horizontal one written inside a `Row` collapses on purpose rather than guessing.
 */
export const Divider = forwardRef<View, DividerProps>(function Divider(
  { children, variant, orientation, size, color, asChild = false, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  // R14, after the component's own vocabulary is destructured: that is what keeps `size`
  // the divider's thickness and `color` R7's tint rather than style props of the name.
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, orientation, size }
  const styles = dividerRecipe.resolve({ theme, selection })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours callers invent.
  const tint = color ? dividerRecipe.tint({ theme, color, selection }) : undefined

  // R12 — the caller's element becomes the rule and keeps the recipe's thickness and ink.
  const Root = asChild ? Slot : View

  return (
    <Root
      ref={ref}
      // A rule is furniture: it separates for the eye and says nothing to a screen reader,
      // which reads the two groups it sits between rather than the line itself. React
      // Native has no `separator` role to announce, and inventing one would add a stop to
      // every list. Both stay overridable (R9) for the divider that really is content.
      accessibilityElementsHidden
      importantForAccessibility="no"
      {...rest}
      // The order of §2 ter, most general to most specific: the cached recipe, the
      // uncached tint, the style props, then `style` — the last word.
      style={[styles.root, tint?.root, styleProps, style]}
    >
      {/* Only under `asChild`, where the child is the rule. A `Divider` in its own right
          has nothing inside it, and rendering children in one would put content in a line. */}
      {asChild ? children : null}
    </Root>
  )
})

Divider.displayName = 'XAUI.Divider'
