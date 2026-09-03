import { Icon } from '../../system/icon'
import { useButton } from './button.context'
import type { ButtonIconProps } from './button.type'

/**
 * An icon that takes the button's size and colour without being told either:
 *
 * ```tsx
 * <Button variant="danger">
 *   <Button.Icon as={TrashIcon} />
 *   <Button.Label>Supprimer</Button.Label>
 * </Button>
 * ```
 *
 * The values come from the root, which resolved them once; an explicit `size` or `color`
 * still wins, which is what `Icon` promises everywhere else in the library.
 */
export function ButtonIcon({ size, color, ...rest }: ButtonIconProps) {
  const { icon } = useButton()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

ButtonIcon.displayName = 'XAUI.Button.Icon'
