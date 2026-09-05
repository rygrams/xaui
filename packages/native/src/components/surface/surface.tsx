import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { surfaceRecipe } from './surface.recipe'
import type { SurfaceProps } from './surface.type'

/**
 * A ground for other things to sit on.
 *
 * ```tsx
 * <Surface>
 *   <Typography>Sur le fond de la page</Typography>
 *   <Surface variant="secondary">Et un cran dedans</Surface>
 * </Surface>
 * ```
 *
 * **One node and no slots**, which is the point: a surface is a fill, a corner and some
 * padding, and every other component in this library that needed those three has been
 * writing them out again. It is the smallest thing here and the most reused.
 *
 * It is **not** a `Card`. A card is a surface that has decided things for you — it is
 * always lifted, it has a header and a footer, and its levels carry an emphasis. A surface
 * has decided nothing: the levels are a ladder, the shadow is asked for, and what goes on
 * it is entirely yours.
 */
export const Surface = forwardRef<View, SurfaceProps>(function Surface(
  {
    children,
    variant,
    size,
    radius,
    color,
    isElevated,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = {
    variant,
    size,
    radius,
    // Lifted by default only where there is enough fill to lift: a shadow under a ground
    // that barely differs from the page reads as dirt rather than as height.
    isElevated:
      (isElevated ?? (variant ?? 'primary') === 'primary')
        ? ('true' as const)
        : undefined,
  }

  const styles = surfaceRecipe.resolve({ theme, selection })
  const tint = color ? surfaceRecipe.tint({ theme, color, selection }) : undefined

  // The resolution order of §2 ter, most general to most specific: the cached recipe, the
  // uncached tint, the style props, then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  const Node = asChild ? Slot : View

  return (
    <Node ref={ref} {...rest} style={rootStyle}>
      {children}
    </Node>
  )
})

Surface.displayName = 'XAUI.Surface'
