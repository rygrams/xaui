import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { ListContext } from './list-context'
import type { ListBuilderProps } from './list.type'
import { styles } from './list.style'
import { useXUITheme } from '../../core'

export function ListBuilder<T>({
  data,
  keyExtractor,
  renderItem,
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
  flatListProps,
}: ListBuilderProps<T>) {
  const theme = useXUITheme()
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

  const renderListItem = useCallback(
    (item: T, index: number): React.ReactElement => {
      const element = renderItem(item, index)

      if (!showDivider || index === data.length - 1) {
        return (
          <React.Fragment key={keyExtractor(item, index)}>{element}</React.Fragment>
        )
      }

      return (
        <View key={keyExtractor(item, index)}>
          {element}
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.colors.foreground + '15' },
            ]}
          />
        </View>
      )
    },
    [data.length, keyExtractor, renderItem, showDivider, theme.colors.foreground]
  )

  return (
    <ListContext.Provider value={contextValue}>
      <View style={[styles.list, style]}>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => renderListItem(item, index)}
          {...flatListProps}
        />
      </View>
    </ListContext.Provider>
  )
}
