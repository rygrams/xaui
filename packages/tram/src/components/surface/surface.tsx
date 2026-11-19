import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { groundPaint } from '../../system/ground-paint'
import { DEFAULT_VARIANT, surfaceRecipe } from './surface.recipe'
import type { SurfaceProps } from './surface.type'

/**
 * A ground for other things to sit on — the Native `Surface`'s API, drawn flat: the
 * discreet grey of the Tram design, never a shadow.
 *
 * ```tsx
 * <Surface>
 *   <Typography>sur la surface discrète</Typography>
 *   <Surface variant="secondary">et un cran dedans, tracé par son trait</Surface>
 * </Surface>
 *
 * <Surface variant="secondary" accent="magenta">…</Surface>
 * ```
 *
 * One node and no slots: a fill, a corner and some padding. What goes on it is yours —
 * Metro laid its content on the ground, and a surface is the exception, not the frame.
 */
export const Surface = forwardRef<View, SurfaceProps>(function Surface(
  {
    children,
    variant = DEFAULT_VARIANT,
    size,
    radius,
    accent,
    color,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size, radius }
  const styles = surfaceRecipe.resolve({ theme, selection })
  const paint = groundPaint({
    accent,
    color,
    isLine: variant === 'secondary',
    page: theme.colors.background,
  })
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? surfaceRecipe.tint({ theme, color: paint, selection })
    : undefined

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  const Node = asChild ? Slot : View

  return (
    <Node ref={ref} {...rest} style={rootStyle}>
      {children}
    </Node>
  )
})

Surface.displayName = 'XAUI.Tram.Surface'
