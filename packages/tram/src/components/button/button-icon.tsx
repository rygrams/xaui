import { Icon } from '@xaui/native/system'
import { useButton } from './button.context'
import type { ButtonIconProps } from './button.type'

/**
 * An icon that takes the button's size and colour — the inverted one while pressed —
 * without being told either. An explicit `size` or `color` still wins.
 */
export function ButtonIcon({ size, color, ...rest }: ButtonIconProps) {
  const { icon } = useButton()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

ButtonIcon.displayName = 'XAUI.Tram.Button.Icon'
