import React from 'react'
import { Pressable } from 'react-native'
import { useToolbarContext } from './toolbar-context'
import { styles } from './toolbar.style'
import type { ToolbarActionProps } from './toolbar.type'

export const ToolbarAction: React.FC<ToolbarActionProps> = ({
  icon,
  isDisabled = false,
  style,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: ToolbarActionProps) => {
  const context = useToolbarContext()

  const iconNode =
    typeof icon === 'function'
      ? icon({
          color: context?.actionColor ?? '#000000',
          size: context?.actionSize ?? 24,
        })
      : icon

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      onLongPress={isDisabled ? undefined : onLongPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={({ pressed }) => [
        styles.actionButton,
        {
          width: (context?.actionSize ?? 24) + 16,
          height: (context?.actionSize ?? 24) + 16,
          backgroundColor: pressed
            ? context?.actionPressedColor ?? 'transparent'
            : 'transparent',
        },
        isDisabled && styles.disabledAction,
        style,
      ]}
    >
      {iconNode}
    </Pressable>
  )
}
