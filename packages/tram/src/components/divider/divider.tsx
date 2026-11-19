import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { dividerRecipe } from './divider.recipe'
import type { DividerProps } from './divider.type'

/**
 * The line between two things, in the Tram grey: one point of `muted`, faded to half, so
 * the space around it still does most of the separating — Metro's way.
 *
 * ```tsx
 * <Row />
 * <Divider />
 * <Row />
 *
 * <View style={{ flexDirection: 'row', gap: 12 }}>
 *   <Typography>pivot</Typography>
 *   <Divider orientation="vertical" size="md" />
 *   <Typography>panorama</Typography>
 * </View>
 * ```
 *
 * One node, no slots, as in Native: it takes the axis it does not run along from its
 * parent, so it needs no width.
 */
export const Divider = forwardRef<View, DividerProps>(function Divider(
  { children, orientation, size, color, asChild = false, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = {
    orientation,
    size,
    isFaded: color ? undefined : ('true' as const),
  }
  const styles = dividerRecipe.resolve({ theme, selection })
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = color ? dividerRecipe.tint({ theme, color, selection }) : undefined

  const Root = asChild ? Slot : View

  return (
    <Root
      ref={ref}
      // Furniture: a screen reader reads the two groups, not the line between them.
      accessibilityElementsHidden
      importantForAccessibility="no"
      {...rest}
      // Most general to most specific: the cached recipe, the tint, the style props, `style`.
      style={[styles.root, tint?.root, styleProps, style]}
    >
      {asChild ? children : null}
    </Root>
  )
})

Divider.displayName = 'XAUI.Tram.Divider'
