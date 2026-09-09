import { Icon } from '../../system/icon'
import { useToggleButton } from './toggle-button.context'
import type { ToggleButtonIconProps } from './toggle-button.type'

export function ToggleButtonIcon({ size, color, ...rest }: ToggleButtonIconProps) {
  const { icon } = useToggleButton()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

ToggleButtonIcon.displayName = 'XAUI.ToggleButton.Icon'
