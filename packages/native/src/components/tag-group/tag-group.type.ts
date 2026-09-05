import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'
import type { TagSelectionMode } from './tag-group.utils'

export type { TagSelectionMode } from './tag-group.utils'

export type TagGroupSlot =
  | 'root'
  | 'list'
  | 'item'
  | 'itemLabel'
  | 'close'
  | 'closeGlyph'

/**
 * Two grounds, not two emphases. `default` is the theme's neutral fill; `surface` is the
 * card colour, for a group sitting **on** the page rather than on a card — the two swap
 * so a tag never disappears into whatever is behind it.
 */
export type TagGroupVariant = 'default' | 'surface'

export type TagGroupSize = 'sm' | 'md' | 'lg'

type TagGroupOwnProps = {
  children?: ReactNode
  variant?: TagGroupVariant
  size?: TagGroupSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. Paints a selected tag. */
  color?: string
  selectionMode?: TagSelectionMode
  selectedKeys?: readonly string[]
  defaultSelectedKeys?: readonly string[]
  onSelectionChange?: (keys: readonly string[]) => void
  /** Present is what makes a `TagGroup.ItemRemoveButton` do anything. */
  onRemove?: (id: string) => void
  /** Ids that take no press. The group's own `isDisabled` covers all of them. */
  disabledKeys?: readonly string[]
  isDisabled?: boolean
  /**
   * Whether pressing the selected tag clears it. Off, a `single` group always has one.
   *
   * @default true
   */
  isDeselectable?: boolean
}

export type TagGroupProps = TagGroupOwnProps &
  Omit<ViewProps, keyof TagGroupOwnProps> &
  Omit<ViewStyleProps, keyof TagGroupOwnProps | keyof ViewProps>

type ListOwnProps = { children?: ReactNode }

export type TagGroupListProps = ListOwnProps &
  Omit<ViewProps, keyof ListOwnProps> &
  Omit<ViewStyleProps, keyof ListOwnProps | keyof ViewProps>

/** What an item's render function is handed. */
export type TagItemRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type ItemOwnProps = {
  id: string
  isDisabled?: boolean
  children?: ReactNode | ((state: TagItemRenderState) => ReactNode)
  asChild?: boolean
}

export type TagGroupItemProps = ItemOwnProps &
  Omit<PressableProps, keyof ItemOwnProps> &
  Omit<ViewStyleProps, keyof ItemOwnProps | keyof PressableProps>

type ItemLabelOwnProps = { children?: ReactNode }

export type TagGroupItemLabelProps = ItemLabelOwnProps &
  Omit<TextProps, keyof ItemLabelOwnProps> &
  Omit<TextStyleProps, keyof ItemLabelOwnProps | keyof TextProps>

type RemoveOwnProps = {
  children?: ReactNode
  asChild?: boolean
  /** An explicit value wins over the tag's own. */
  isDisabled?: boolean
}

export type TagGroupItemRemoveButtonProps = RemoveOwnProps &
  Omit<PressableProps, keyof RemoveOwnProps> &
  Omit<ViewStyleProps, keyof RemoveOwnProps | keyof PressableProps>

/** R5 — resolved style ids and the state the slots read. */
export type TagGroupContextValue = {
  listStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  itemSelectedStyle: StyleProp<ViewStyle>
  itemLabelStyle: StyleProp<TextStyle>
  itemLabelSelectedStyle: StyleProp<TextStyle>
  closeStyle: StyleProp<ViewStyle>
  closeGlyphStyle: StyleProp<ViewStyle>
  closeGlyphSelectedStyle: StyleProp<ViewStyle>
  glyph: { size?: number; color?: string }
  isDisabled: boolean
  isSelected: (id: string) => boolean
  isKeyDisabled: (id: string) => boolean
  select: (id: string) => void
  remove: ((id: string) => void) | undefined
}

/** One tag's own state, for the slots inside it. */
export type TagGroupItemContextValue = TagItemRenderState & { id: string }
