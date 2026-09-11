import { cloneElement, isValidElement } from 'react'
import type { ReactElement } from 'react'
import { useXAUITheme } from '../../theme/theme-hooks'
import { IconImage } from './icon-image'
import { useIconContext } from './icon-context'
import type { IconProps } from './icon.type'

/**
 * The gap nobody else closes: an icon is a third-party component, so a slot context does
 * not reach it and every call site ends up computing the colour by hand.
 *
 * ```tsx
 * <Button variant="danger">
 *   <Button.Icon as={TrashIcon} />
 *   <Button.Label>Supprimer</Button.Label>
 * </Button>
 * ```
 *
 * Three accepted forms — a component through `as`, a raw `<svg>` as children, or an image
 * through `source` — and the resolution is the same for all three: an explicit prop, else
 * what the surrounding slot published, else the theme.
 *
 * The props are taken whole rather than destructured, because they are a union: which keys
 * exist depends on the form, and narrowing is what lets `style` be reachable in the one
 * branch that renders a node and unwritable in the two that do not.
 */
export function Icon(props: IconProps) {
  const inherited = useIconContext()
  const theme = useXAUITheme()

  const size = props.size ?? inherited.size ?? theme.fontSizes.md
  const color = props.color ?? inherited.color ?? theme.colors.foreground

  if (props.as) {
    const Component = props.as
    return <Component size={size} color={color} />
  }

  if (isValidElement(props.children)) {
    // The resolved values win over the element's own `width`, `height` and `color`. An SVG
    // pasted from a design tool carries a baked-in size, and inheriting the slot's instead
    // is the entire point of putting it in an `Icon`. `color` is an SVG presentation
    // attribute, so a `stroke="currentColor"` inside the element follows it.
    return cloneElement(props.children as ReactElement<Record<string, unknown>>, {
      width: size,
      height: size,
      color,
    })
  }

  if (props.source) return <IconImage {...props} resolved={{ size, color }} />

  throw new Error(
    'XAUI: Icon needs one of `as` (an icon component), a raw <svg> element as its child, ' +
      'or `source` (an image URL). It renders nothing on its own.'
  )
}

Icon.displayName = 'XAUI.Icon'
