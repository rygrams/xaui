import type { CSSObject } from '@emotion/react'
import { toWebUnit } from '../style-props'
import type { ImageSource } from './icon.type'

const MASK_SIZE: Record<string, string> = {
  contain: 'contain',
  cover: 'cover',
  stretch: '100% 100%',
  center: 'auto',
  repeat: 'auto',
}

export function uriOf(source: ImageSource): string {
  return typeof source === 'string' ? source : source.uri
}

type Mask = {
  source: ImageSource
  size: number
  tint: string
  resizeMode?: string
}

/**
 * React Native's `tintColor` recolours an image; CSS has no such property, and a `filter`
 * only approximates it. A mask is the exact equivalent: the image becomes the stencil and
 * the colour is painted through it, so any glyph comes out in the resolved colour rather
 * than near it.
 *
 * It is also why this form renders a box and not an `<img>` — an `<img>` would show its
 * own pixels through the paint.
 */
export function maskStyle({ source, size, tint, resizeMode }: Mask): CSSObject {
  const length = toWebUnit(size)

  return {
    display: 'inline-block',
    width: length,
    height: length,
    backgroundColor: tint,
    maskImage: `url("${uriOf(source)}")`,
    maskSize: MASK_SIZE[resizeMode ?? 'cover'] ?? 'cover',
    maskRepeat: resizeMode === 'repeat' ? 'repeat' : 'no-repeat',
    maskPosition: 'center',
  }
}
