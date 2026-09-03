import { cloneElement, isValidElement } from 'react'
import type { ReactElement } from 'react'
import { Image } from 'react-native'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useStyleProps } from '../style-props'
import { useIconContext } from './icon-context'
import type { IconProps } from './icon.type'

/**
 * The gap nobody else closes: an icon is a third-party component, so a slot context does
 * not reach it and every call site ends up computing the colour by hand.
 *
 * ```tsx
 * <Button variant="danger">
 *   <Button.Icon as={TrashIcon} />   {/* colour and size inherited, nothing to pass *\/}
 *   <Button.Label>Supprimer</Button.Label>
 * </Button>
 * ```
 *
 * Three accepted forms — a component through `as`, a raw SVG as children, or an image
 * through `source` — and the resolution is the same for all three: an explicit prop, else
 * what the surrounding slot published, else the theme.
 */
export function Icon({
  as: Component,
  children,
  source,
  size,
  color,
  style,
  ...props
}: IconProps) {
  const inherited = useIconContext()
  const theme = useXAUITheme()
  const [styleProps] = useStyleProps(props)

  const resolvedSize = size ?? inherited.size ?? theme.fontSizes.md
  const resolvedColor = color ?? inherited.color ?? theme.colors.foreground

  if (Component) {
    return <Component size={resolvedSize} color={resolvedColor} />
  }

  if (isValidElement(children)) {
    // The resolved values win over the element's own `width`, `height` and `color`. An
    // SVG pasted from a design tool carries a baked-in size, and inheriting the slot's
    // instead is the entire point of putting it in an `Icon`.
    return cloneElement(children as ReactElement<Record<string, unknown>>, {
      width: resolvedSize,
      height: resolvedSize,
      color: resolvedColor,
    })
  }

  if (source) {
    return (
      <Image
        source={source}
        style={[
          { width: resolvedSize, height: resolvedSize, tintColor: resolvedColor },
          styleProps,
          style,
        ]}
      />
    )
  }

  throw new Error(
    'XAUI: Icon needs one of `as` (an icon component), a raw SVG element as its child, ' +
      'or `source` (an image). It renders nothing on its own.'
  )
}

Icon.displayName = 'XAUI.Icon'
