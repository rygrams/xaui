import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'
import type {
  Align,
  Anchor,
  AnchoredWidth,
  Insets,
  Placement,
} from '../../utils/placement'

export type MenuSlot =
  | 'trigger'
  | 'overlay'
  | 'content'
  | 'label'
  | 'group'
  | 'item'
  | 'itemTitle'
  | 'itemDescription'
  | 'itemIndicator'

export type MenuPlacement = Placement
export type MenuAlign = Align
export type MenuWidth = AnchoredWidth
export type MenuInsets = Insets
export type MenuAnchor = Anchor

/**
 * A row's intent, and the only place a menu carries one. `danger` is not decoration: a
 * list where "Supprimer" reads like "Renommer" is the list that gets misread.
 */
export type MenuItemVariant = 'default' | 'danger'

type MenuOwnProps = {
  children?: ReactNode
  radius?: RadiusKey
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  isDisabled?: boolean
}

/** The root renders **no node** — see `Menu.Trigger` for where `ref` and `style` live. */
export type MenuProps = MenuOwnProps

type MenuTriggerOwnProps = { children?: ReactNode; asChild?: boolean }

export type MenuTriggerProps = MenuTriggerOwnProps &
  Omit<PressableProps, keyof MenuTriggerOwnProps> &
  Omit<ViewStyleProps, keyof MenuTriggerOwnProps | keyof PressableProps>

type MenuOverlayOwnProps = { children?: ReactNode; isDismissable?: boolean }

export type MenuOverlayProps = MenuOverlayOwnProps &
  Omit<ViewProps, keyof MenuOverlayOwnProps> &
  Omit<ViewStyleProps, keyof MenuOverlayOwnProps | keyof ViewProps>

type MenuContentOwnProps = {
  children?: ReactNode
  placement?: MenuPlacement
  align?: MenuAlign
  width?: MenuWidth
  offset?: number
  alignOffset?: number
  avoidCollisions?: boolean
  insets?: MenuInsets
}

export type MenuContentProps = MenuContentOwnProps &
  Omit<ViewProps, keyof MenuContentOwnProps> &
  Omit<ViewStyleProps, keyof MenuContentOwnProps | keyof ViewProps>

type MenuTextOwnProps = { children?: ReactNode }

export type MenuLabelProps = MenuTextOwnProps &
  Omit<TextProps, keyof MenuTextOwnProps> &
  Omit<TextStyleProps, keyof MenuTextOwnProps | keyof TextProps>

export type MenuItemDescriptionProps = MenuLabelProps

type MenuGroupOwnProps = { children?: ReactNode }

export type MenuGroupProps = MenuGroupOwnProps &
  Omit<ViewProps, keyof MenuGroupOwnProps> &
  Omit<ViewStyleProps, keyof MenuGroupOwnProps | keyof ViewProps>

/** What a row's render function is handed, so it can paint its own state. */
export type MenuItemRenderState = {
  isPressed: boolean
  isDisabled: boolean
}

type MenuItemOwnProps = {
  variant?: MenuItemVariant
  isDisabled?: boolean
  /**
   * Whether choosing this row closes the menu.
   *
   * @default true
   */
  closesOnPress?: boolean
  children?: ReactNode | ((state: MenuItemRenderState) => ReactNode)
  asChild?: boolean
}

export type MenuItemProps = MenuItemOwnProps &
  Omit<PressableProps, keyof MenuItemOwnProps> &
  Omit<ViewStyleProps, keyof MenuItemOwnProps | keyof PressableProps>

/** The title takes the row's intent, so it is the one text that is not written by hand. */
export type MenuItemTitleProps = MenuLabelProps

export type MenuItemIndicatorProps = MenuGroupProps

/** R5 — resolved style ids and the state the slots read. */
export type MenuContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  groupStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  itemPressedStyle: StyleProp<ViewStyle>
  itemTitleStyle: Record<MenuItemVariant, StyleProp<TextStyle>>
  itemDescriptionStyle: StyleProp<TextStyle>
  itemIndicatorStyle: StyleProp<ViewStyle>
  glyph: Record<MenuItemVariant, IconContextValue>
  isOpen: boolean
  isDisabled: boolean
  open: () => void
  close: () => void
  toggle: () => void
  anchor: MenuAnchor | null
  setAnchor: (anchor: MenuAnchor) => void
}

/** One row's own state, for the slots inside it. */
export type MenuItemContextValue = MenuItemRenderState & { variant: MenuItemVariant }
