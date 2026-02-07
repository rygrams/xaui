import React from 'react'
import { Pressable, Text } from 'react-native'
import { useFabMenuItemStyles } from './fab-menu.hook'
import { styles } from './fab-menu.style'
import type { FabMenuItemProps } from './fab-menu.type'

export const FabMenuItem: React.FC<FabMenuItemProps> = ({
  icon,
  label,
  themeColor = 'default',
  onPress,
  isDisabled,
  _onClose,
}) => {
  const itemStyles = useFabMenuItemStyles(themeColor)

  const renderIcon = (menuIcon: React.ReactNode) => {
    if (!React.isValidElement(menuIcon)) return menuIcon

    return React.cloneElement(
      menuIcon as React.ReactElement<Record<string, unknown>>,
      { color: itemStyles.iconColor }
    )
  }

  return (
    <Pressable
      style={[
        styles.menuItemChip,
        {
          backgroundColor: itemStyles.chipStyles.backgroundColor,
          borderRadius: itemStyles.chipStyles.borderRadius,
        },
      ]}
      onPress={(event) => {
        if (isDisabled) return
        onPress?.(event)
        _onClose?.()
      }}
      disabled={isDisabled}
    >
      {renderIcon(icon)}
      <Text
        style={[
          styles.menuItemLabel,
          {
            color: itemStyles.chipStyles.color,
            fontSize: itemStyles.chipStyles.fontSize,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}
