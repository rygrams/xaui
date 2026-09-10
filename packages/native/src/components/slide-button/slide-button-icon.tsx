import { Icon } from '../../system/icon'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonIconProps } from './slide-button.type'

/**
 * The mark in the thumb. Written inside `SlideButton.Thumb`, it inherits the handle's glyph
 * size and — because the handle is the surface colour whatever the pill does — the theme's
 * foreground. `size` and `color` override both.
 */
export function SlideButtonIcon({ size, color, ...rest }: SlideButtonIconProps) {
  const { icon } = useSlideButton()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

SlideButtonIcon.displayName = 'XAUI.SlideButton.Icon'
