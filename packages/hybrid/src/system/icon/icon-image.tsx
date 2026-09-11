import styled from '@emotion/styled'
import type { CSSObject } from '@emotion/react'
import { flatStyle, splitStyleProps, toWebStyle } from '../style-props'
import type { ImageStyle } from '../style-props'
import { maskStyle } from './icon.utils'
import type { IconSourceProps } from './icon.type'

const Box = styled('span', {
  shouldForwardProp: property => property !== '$xauiStyle',
})<{ $xauiStyle: CSSObject }>(({ $xauiStyle }) => $xauiStyle)

type IconImageProps = IconSourceProps & {
  resolved: { size: number; color: string }
}

/**
 * Its own component because it is the only form with style props to split, and because a
 * hook cannot be called inside a branch. Which is the shape of the rule rather than a
 * workaround: R14 belongs to the form that renders a node.
 */
export function IconImage({
  source,
  style,
  resolved,
  size: _size,
  color: _color,
  ...props
}: IconImageProps) {
  const [styleProps] = splitStyleProps(props)
  const declared = [styleProps as ImageStyle, style]
  // Read before conversion: `toWebStyle` has already renamed `resizeMode` to `objectFit`
  // by the time it returns, and neither key survives on a masked box.
  const raw = flatStyle(declared)
  const tint = (raw.tintColor as string | undefined) ?? resolved.color
  const fit = raw.resizeMode as string | undefined

  const declaredStyle = toWebStyle(declared)
  delete declaredStyle.tintColor
  delete declaredStyle.objectFit

  return (
    <Box
      $xauiStyle={{
        ...maskStyle({ source, size: resolved.size, tint, resizeMode: fit }),
        // The caller's own width, height or margin lands after the resolved geometry, the
        // order Native's style array already gave them.
        ...declaredStyle,
      }}
    />
  )
}

IconImage.displayName = 'XAUI.Icon.Image'
