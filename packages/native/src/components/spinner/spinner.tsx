import { forwardRef } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useRotation } from '../../hooks'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { spinnerRecipe } from './spinner.recipe'
import type { SpinnerProps } from './spinner.type'

/**
 * The wait, drawn.
 *
 * ```tsx
 * <Spinner />
 * <Spinner variant="danger" size="sm" />
 * <Spinner color="#7c3aed" accessibilityLabel="Chargement des projets" />
 * ```
 *
 * **Two rings and no slots.** The root is the track — the full circle, in the variant's
 * ink at a fraction of its opacity — and its one child is the arc that turns over it,
 * the same circle with a quarter missing. There is nothing between them for a slot to
 * name, and the two are one figure rather than two parts.
 *
 * It is HeroUI's spinner drawn with borders instead of a gradient stroke. Theirs fades a
 * single arc from opaque to 55%, which needs an SVG `linearGradient` and therefore
 * `react-native-svg` — an optional peer, which a component in the fifteen-component core
 * cannot require. Two circles of one ink at two opacities read as the same figure and
 * cost two views.
 *
 * **`size` is the diameter**, and the only measurement a circle has. A spinner that filled
 * its parent would be a progress bar, so R14's `width` is available and deliberately not
 * what `size` means.
 */
export const Spinner = forwardRef<View, SpinnerProps>(function Spinner(
  { variant, size, color, animation = true, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  // R14, after the component's own vocabulary is destructured: that is what keeps `size`
  // the spinner's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size }
  const styles = spinnerRecipe.resolve({ theme, selection })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours callers invent.
  const tint = color ? spinnerRecipe.tint({ theme, color, selection }) : undefined

  const arcStyle = [styles.arc, tint?.arc]

  return (
    <View
      ref={ref}
      // A spinner is what a screen reader announces as busy. No `accessibilityLabel`
      // default: only the caller knows what is loading, and "loading" alone is what the
      // role already says.
      accessibilityRole="progressbar"
      accessibilityState={{ busy: animation }}
      {...rest}
      // The order of §2 ter, most general to most specific: the cached recipe, the
      // uncached tint, the style props, then `style` — the last word.
      style={[styles.root, tint?.root, styleProps, style]}
    >
      {animation ? <SpinningArc style={arcStyle} /> : <View style={arcStyle} />}
    </View>
  )
})

Spinner.displayName = 'XAUI.Spinner'

/**
 * Two components rather than a branch inside one: hooks cannot be conditional, and
 * `animation={false}` is only true if the Reanimated hooks are never reached.
 */
function SpinningArc({ style }: { style: StyleProp<ViewStyle> }) {
  const rotation = useRotation()

  return <Animated.View style={[style, rotation]} />
}
