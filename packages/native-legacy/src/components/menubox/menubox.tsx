import React, { useMemo, Children, isValidElement } from 'react'
import { View } from 'react-native'
import { MenuBoxContext } from './menubox-context'
import type { MenuBoxProps, MenuBoxItemProps } from './menubox.type'
import { styles } from './menubox.style'
import { useXUITheme } from '../../core'

export const MenuBox: React.FC<MenuBoxProps> = ({
  children,
  size = 'md',
  radius = 'lg',
  themeColor = 'default',
  spacing = 0,
  style,
  backgroundColor,
}) => {
  const theme = useXUITheme()
  const itemCount = Children.count(children)

  const itemKeys = useMemo(() => {
    const keys: string[] = []
    Children.forEach(children, child => {
      if (isValidElement(child)) {
        const props = child.props as MenuBoxItemProps
        if (props.itemKey) {
          keys.push(props.itemKey)
        }
      }
    })
    return keys
  }, [children])

  const getItemIndex = (itemKey: string): number => {
    return itemKeys.indexOf(itemKey)
  }
  const bgColor = backgroundColor ?? theme.colors.default.container

  const contextValue = useMemo(
    () => ({
      size,
      radius,
      themeColor,
      backgroundColor: bgColor,
      itemCount,
      spacing,
      getItemIndex,
    }),
    [size, radius, themeColor, bgColor, itemCount, spacing, getItemIndex]
  )

  return (
    <MenuBoxContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>{children}</View>
    </MenuBoxContext.Provider>
  )
}
