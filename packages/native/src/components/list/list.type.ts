import type { ReactElement, ReactNode, RefAttributes } from 'react'
import type {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'

export type ListSlot =
  | 'root'
  | 'item'
  | 'separator'
  | 'leading'
  | 'content'
  | 'title'
  | 'description'
  | 'action'

type ListOwnProps<ItemT> = {
  /** Renders the compound row for one item. */
  renderItem: ListRenderItem<ItemT>
  /** Merge the list props into a custom `FlatList`-compatible root. */
  asChild?: boolean
  children?: ReactElement
}

type LockedFlatListProp =
  | 'ItemSeparatorComponent'
  | 'horizontal'
  | 'inverted'
  | 'numColumns'

export type ListProps<ItemT> = ListOwnProps<ItemT> &
  Omit<FlatListProps<ItemT>, keyof ListOwnProps<ItemT> | LockedFlatListProp> &
  Omit<ViewStyleProps, keyof ListOwnProps<ItemT> | keyof FlatListProps<ItemT>>

type ListItemOwnProps = { children?: ReactNode; asChild?: boolean }

export type ListItemProps = ListItemOwnProps &
  Omit<ViewProps, keyof ListItemOwnProps> &
  Omit<ViewStyleProps, keyof ListItemOwnProps | keyof ViewProps>

type ListViewSlotOwnProps = { children?: ReactNode }

export type ListLeadingProps = ListViewSlotOwnProps &
  Omit<ViewProps, keyof ListViewSlotOwnProps> &
  Omit<ViewStyleProps, keyof ListViewSlotOwnProps | keyof ViewProps>

export type ListContentProps = ListLeadingProps
export type ListActionProps = ListLeadingProps

type ListTextSlotOwnProps = { children?: ReactNode }

export type ListTitleProps = ListTextSlotOwnProps &
  Omit<TextProps, keyof ListTextSlotOwnProps> &
  Omit<TextStyleProps, keyof ListTextSlotOwnProps | keyof TextProps>

export type ListDescriptionProps = ListTitleProps

/** Resolved recipe values shared by every virtualized row. */
export type ListContextValue = {
  itemStyle: StyleProp<ViewStyle>
  separatorStyle: StyleProp<ViewStyle>
  leadingStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  actionStyle: StyleProp<ViewStyle>
  leadingIcon: IconContextValue
  actionIcon: IconContextValue
}

export type ListItemContextValue = { isLast: boolean }

export type ListRootComponent = {
  <ItemT>(
    props: ListProps<ItemT> & RefAttributes<FlatList<ItemT>>
  ): ReactElement | null
  displayName?: string
}
