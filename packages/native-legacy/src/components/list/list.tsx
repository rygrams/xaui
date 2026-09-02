import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ListContext } from './list-context'
import type { ListProps } from './list.type'
import { styles } from './list.style'
import { ListChildren } from './list-divider'

export const List: React.FC<ListProps> = ({
  children,
  selectionMode = 'none',
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  showDivider = false,
  isPressable = true,
  isSelectable = false,
  themeColor = 'primary',
  size = 'md',
  onSelectionChange,
  style,
}) => {
  const isControlled = controlledSelectedKeys !== undefined
  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState<string[]>(defaultSelectedKeys)

  const selectedKeys = isControlled ? controlledSelectedKeys : internalSelectedKeys

  const isSelected = useCallback(
    (key: string) => {
      return selectedKeys.includes(key)
    },
    [selectedKeys]
  )

  const toggleSelection = useCallback(
    (key: string) => {
      if (selectionMode === 'none' || !isSelectable) {
        return
      }

      let newSelectedKeys: string[]

      if (selectionMode === 'single') {
        newSelectedKeys = isSelected(key) ? [] : [key]
      } else {
        newSelectedKeys = isSelected(key)
          ? selectedKeys.filter(k => k !== key)
          : [...selectedKeys, key]
      }

      if (!isControlled) {
        setInternalSelectedKeys(newSelectedKeys)
      }

      onSelectionChange?.(newSelectedKeys)
    },
    [
      selectionMode,
      isSelectable,
      isSelected,
      selectedKeys,
      isControlled,
      onSelectionChange,
    ]
  )

  const contextValue = useMemo(
    () => ({
      selectionMode,
      selectedKeys,
      isPressable,
      isSelectable,
      themeColor,
      size,
      showDivider,
      toggleSelection,
      isSelected,
    }),
    [
      selectionMode,
      selectedKeys,
      isPressable,
      isSelectable,
      themeColor,
      size,
      showDivider,
      toggleSelection,
      isSelected,
    ]
  )

  return (
    <ListContext.Provider value={contextValue}>
      <View style={[styles.list, style]}>
        <ListChildren showDivider={showDivider}>{children}</ListChildren>
      </View>
    </ListContext.Provider>
  )
}
