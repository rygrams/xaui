import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue, IconProps } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'
import type {
  Align,
  Anchor,
  AnchoredWidth,
  Insets,
  Placement,
} from '../../utils/placement'
import type { FabProps, FabSize } from './fab.type'

/** The pills follow the trigger's three steps, because they come out of it. */
export type FabMenuSize = FabSize

export type FabMenuSlot = 'overlay' | 'content' | 'item' | 'itemLabel'

export type FabMenuPlacement = Placement
export type FabMenuAlign = Align
export type FabMenuWidth = AnchoredWidth
export type FabMenuInsets = Insets
export type FabMenuAnchor = Anchor

type FabMenuOwnProps = {
  /**
   * The trigger's square **and** the pills' scale.
   *
   * It is the root's rather than the trigger's because both of them read it, and a menu
   * whose pills were sized apart from the FAB they come out of would read as two controls.
   * `FabMenu.Trigger` takes everything else a `Fab` takes.
   *
   * @default 'md'
   */
  size?: FabMenuSize
  /** The pills' corner. `full` is the default, and what makes them pills. */
  radius?: RadiusKey
  /**
   * A raw tint (R7), never a token. It paints the **pills**, not the trigger — the FAB has
   * its own `color`, and a menu whose actions were the same colour as the button they came
   * out of would read as one shape that had grown.
   */
  color?: string
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** Stops the trigger and every action with it. */
  isDisabled?: boolean
  children?: ReactNode
}

/** The root renders **no node** — `FabMenu.Trigger` is where `ref` and `style` live. */
export type FabMenuProps = FabMenuOwnProps

/**
 * Everything a `Fab` takes, minus `size`, which the root owns because the pills read it
 * too. The press toggles the menu **after** a caller's own `onPress` has run.
 */
export type FabMenuTriggerProps = Omit<FabProps, 'size'>

type FabMenuOverlayOwnProps = { children?: ReactNode; isDismissable?: boolean }

export type FabMenuOverlayProps = FabMenuOverlayOwnProps &
  Omit<ViewProps, keyof FabMenuOverlayOwnProps> &
  Omit<ViewStyleProps, keyof FabMenuOverlayOwnProps | keyof ViewProps>

type FabMenuContentOwnProps = {
  children?: ReactNode
  /** Which side of the trigger the actions stack on. @default 'top' */
  placement?: FabMenuPlacement
  /** How they line up along that side. @default 'end' */
  align?: FabMenuAlign
  /** @default 'content-fit' */
  width?: FabMenuWidth
  /** Between the trigger and the nearest action, in points. @default 12 */
  offset?: number
  alignOffset?: number
  /** @default true */
  avoidCollisions?: boolean
  insets?: FabMenuInsets
}

export type FabMenuContentProps = FabMenuContentOwnProps &
  Omit<ViewProps, keyof FabMenuContentOwnProps> &
  Omit<ViewStyleProps, keyof FabMenuContentOwnProps | keyof ViewProps>

type FabMenuItemOwnProps = {
  isDisabled?: boolean
  /** Whether choosing this action closes the menu. @default true */
  closesOnPress?: boolean
  children?: ReactNode
  asChild?: boolean
}

export type FabMenuItemProps = FabMenuItemOwnProps &
  Omit<PressableProps, keyof FabMenuItemOwnProps> &
  Omit<ViewStyleProps, keyof FabMenuItemOwnProps | keyof PressableProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type FabMenuLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type FabMenuIconProps = IconProps

/** R5 — resolved style ids and the state the slots read. */
export type FabMenuContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  /** Layered over `itemStyle` by an action that is spent, or by all of them at once. */
  itemDisabledStyle: StyleProp<ViewStyle>
  itemLabelStyle: StyleProp<TextStyle>
  /**
   * Values, not a style: an icon is a third party's component and takes `size` and `color`
   * as props. Flattened once here, the way the `Menu` and the `Fab` publish theirs.
   */
  glyph: IconContextValue
  /** The trigger's own scale, handed to the `Fab` it renders. */
  size: FabMenuSize
  isOpen: boolean
  isDisabled: boolean
  open: () => void
  close: () => void
  toggle: () => void
  anchor: FabMenuAnchor | null
  setAnchor: (anchor: FabMenuAnchor) => void
}
