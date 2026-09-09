import { forwardRef, useCallback, useMemo } from 'react'
import type { ForwardedRef } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import type { ListRenderItemInfo, TextStyle } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { ListItemProvider, ListProvider } from './list.context'
import { listRecipe } from './list.recipe'
import type { ListProps, ListRootComponent } from './list.type'

function ListRootInner<ItemT>(
  {
    data,
    renderItem,
    asChild = false,
    children,
    accessibilityRole = 'list',
    style,
    ...props
  }: ListProps<ItemT>,
  ref: ForwardedRef<FlatList<ItemT>>
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const styles = listRecipe.resolve({ theme })
  const itemCount = data?.length ?? 0

  const context = useMemo(() => {
    const leading = StyleSheet.flatten<TextStyle>(styles.leading)
    const action = StyleSheet.flatten<TextStyle>(styles.action)

    return {
      itemStyle: styles.item,
      separatorStyle: styles.separator,
      leadingStyle: styles.leading,
      contentStyle: styles.content,
      titleStyle: styles.title,
      descriptionStyle: styles.description,
      actionStyle: styles.action,
      leadingIcon: {
        size: leading.fontSize,
        color: typeof leading.color === 'string' ? leading.color : undefined,
      },
      actionIcon: {
        size: action.fontSize,
        color: typeof action.color === 'string' ? action.color : undefined,
      },
    }
  }, [styles])

  const renderRow = useCallback(
    (info: ListRenderItemInfo<ItemT>) => (
      <ListItemProvider value={{ isLast: info.index === itemCount - 1 }}>
        {renderItem(info)}
      </ListItemProvider>
    ),
    [itemCount, renderItem]
  )

  const listProps = {
    accessibilityRole,
    ...rest,
    data,
    renderItem: renderRow,
    style: [styles.root, styleProps, style],
  }

  return (
    <ListProvider value={context}>
      {asChild ? (
        <Slot {...listProps} ref={ref as ForwardedRef<unknown>}>
          {children}
        </Slot>
      ) : (
        <FlatList ref={ref} {...listProps} />
      )}
    </ListProvider>
  )
}

export const ListRoot = forwardRef(ListRootInner) as ListRootComponent

ListRoot.displayName = 'XAUI.List.Root'
