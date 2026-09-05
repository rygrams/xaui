import { cloneElement, isValidElement } from 'react'
import type { ReactElement } from 'react'
import { Image } from 'react-native'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useStyleProps } from '../style-props'
import { useIconContext } from './icon-context'
import type { IconProps, IconSourceProps } from './icon.type'

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
 *
 * The props are taken whole rather than destructured, because they are a union: which
 * keys exist depends on the form, and narrowing is what lets `style` be reachable in the
 * one branch that renders a node and unwritable in the two that do not.
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
    // The resolved values win over the element's own `width`, `height` and `color`. An
    // SVG pasted from a design tool carries a baked-in size, and inheriting the slot's
    // instead is the entire point of putting it in an `Icon`.
    return cloneElement(props.children as ReactElement<Record<string, unknown>>, {
      width: size,
      height: size,
      color,
    })
  }

  // Its own component, because it is the only form with style props to split and a hook
  // cannot be called in a branch. Which is the shape of the rule rather than a workaround:
  // R14 belongs to the form that renders a node.
  if (props.source) return <IconImage {...props} resolved={{ size, color }} />

  throw new Error(
    'XAUI: Icon needs one of `as` (an icon component), a raw SVG element as its child, ' +
      'or `source` (an image). It renders nothing on its own.'
  )
}

Icon.displayName = 'XAUI.Icon'

function IconImage({
  source,
  style,
  resolved,
  size: _size,
  color: _color,
  ...props
}: IconSourceProps & { resolved: { size: number; color: string } }) {
  const [styleProps] = useStyleProps(props)

  return (
    <Image
      source={source}
      style={[
        { width: resolved.size, height: resolved.size, tintColor: resolved.color },
        styleProps,
        style,
      ]}
    />
  )
}
