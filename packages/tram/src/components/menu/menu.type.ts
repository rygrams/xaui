import type { MutableRefObject, ReactNode, RefObject } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type {
  IconContextValue,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramPageStage } from '../../theme/tram-pages'
import type { NodeSlot } from '../../system/node-slot'
import type { MenuOffset, MenuRect, MenuSide } from './menu.place'

export type MenuSlot =
  | 'trigger'
  | 'triggerLabel'
  | 'overlay'
  | 'content'
  | 'label'
  | 'separator'
  | 'group'
  | 'item'
  | 'itemTitle'
  | 'itemDescription'
  | 'itemIndicator'

/**
 * The side of its trigger the panel unfolds on, when there is room — Native's `top` and
 * `bottom`. No `start` or `end`: the panel runs the width of the screen.
 */
export type MenuPlacement = MenuSide

/** The row's intent: `danger` writes its title in the danger ink, nothing else changes. */
export type MenuItemVariant = 'default' | 'danger'

/**
 * What opens the menu from its trigger: a `press`, as in Native, or a `longPress` — the
 * Metro context menu, held on a row whose own press still does what it did.
 */
export type MenuOpensOn = 'press' | 'longPress'

type MenuOwnProps = {
  children?: ReactNode
  /**
   * Native's prop, kept so the two roots take the same props. It draws nothing here: the
   * panel runs from one edge of the screen to the other and has no corner to round.
   */
  radius?: RadiusKey
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** The trigger opens nothing — and, opened on a press, it is grey. */
  isDisabled?: boolean
}

/**
 * The root renders **no node** — `ref` and `style` live on the parts that draw.
 *
 * No `accent` and no `color`: the panel is the theme's contrast — its `foreground` as a
 * ground — and carries no accent.
 */
export type MenuProps = MenuOwnProps

type MenuTriggerOwnProps = {
  children?: ReactNode
  asChild?: boolean
  /**
   * `press` by default, as in Native. `longPress` leaves the press to the element — a row
   * still opens what it opens — and opens the menu on a hold, felt as a `longPress`. A
   * screen reader is offered it as an action.
   */
  opensOn?: MenuOpensOn
}

/**
 * What opens the menu. It paints nothing of its own: `asChild` makes it the caller's
 * element; a string is set in `body`.
 *
 * It is wrapped in one view, the one that stays in front, in place and at its size, while
 * the page behind recedes.
 */
export type MenuTriggerProps = MenuTriggerOwnProps &
  Omit<PressableProps, keyof MenuTriggerOwnProps> &
  Omit<ViewStyleProps, keyof MenuTriggerOwnProps | keyof PressableProps>

type MenuOverlayOwnProps = {
  children?: ReactNode
  /** Off for a menu that must be answered: no touch outside, and no back, closes it. */
  isDismissable?: boolean
}

/**
 * The page behind, dimmed everywhere but over the trigger — and stepped back, when it is
 * a `Page`. Optional, as in Native: omitted, nothing is dimmed and nothing recedes.
 */
export type MenuOverlayProps = MenuOverlayOwnProps &
  Omit<ViewProps, keyof MenuOverlayOwnProps> &
  Omit<ViewStyleProps, keyof MenuOverlayOwnProps | keyof ViewProps>

type MenuContentOwnProps = {
  children?: ReactNode
  /**
   * The side of the trigger asked for — `bottom` by default. The panel takes the other
   * one when it only fits there, and the roomier one, scrolled, when it fits on neither.
   */
  placement?: MenuPlacement
}

/**
 * The panel: the width of the screen, against its trigger. Native's `align`, `width`,
 * `offset`, `alignOffset`, `avoidCollisions` and `insets` are not taken — a panel the
 * width of the screen has no across, touches its trigger, always avoids the edges, and
 * keeps clear of the safe area handed to `TramProvider`.
 *
 * Each child is one step of the cascade, in the order written.
 */
export type MenuContentProps = MenuContentOwnProps &
  Omit<ViewProps, keyof MenuContentOwnProps> &
  Omit<ViewStyleProps, keyof MenuContentOwnProps | keyof ViewProps>

type MenuTextOwnProps = { children?: ReactNode }

export type MenuLabelProps = MenuTextOwnProps &
  Omit<TextProps, keyof MenuTextOwnProps> &
  Omit<TextStyleProps, keyof MenuTextOwnProps | keyof TextProps>

export type MenuItemDescriptionProps = MenuLabelProps

/** The title takes the row's intent, so it is the one text that is not written by hand. */
export type MenuItemTitleProps = MenuLabelProps

export type MenuSeparatorProps = Omit<ViewProps, 'children'> & ViewStyleProps

type MenuGroupOwnProps = { children?: ReactNode }

export type MenuGroupProps = MenuGroupOwnProps &
  Omit<ViewProps, keyof MenuGroupOwnProps> &
  Omit<ViewStyleProps, keyof MenuGroupOwnProps | keyof ViewProps>

export type MenuItemIndicatorProps = MenuGroupProps

export type MenuItemRenderState = {
  isPressed: boolean
  isDisabled: boolean
}

type MenuItemOwnProps = {
  variant?: MenuItemVariant
  isDisabled?: boolean
  /** On by default: the menu closes once `onPress` has run. */
  closesOnPress?: boolean
  children?: ReactNode | ((state: MenuItemRenderState) => ReactNode)
  asChild?: boolean
}

export type MenuItemProps = MenuItemOwnProps &
  Omit<PressableProps, keyof MenuItemOwnProps> &
  Omit<ViewStyleProps, keyof MenuItemOwnProps | keyof PressableProps>

/** Where the trigger was when the menu opened, and the page that recedes behind it. */
export type MenuAnchor = {
  rect: MenuRect
  /** The page that recedes, or `null` when the menu is not on a focused `Page`. */
  stage: TramPageStage | null
}

/** The menu's shared values: what the swivel, the ground and the trigger read. */
export type MenuMotion = {
  /** How far the page behind has stepped back, 0 to 1 — the trigger's counterweight. */
  depth: SharedValue<number>
  /** The trigger's centre less the page's, set as the menu opens. */
  offset: SharedValue<MenuOffset>
}

/** Resolved style ids and the state the slots read. */
export type MenuContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  triggerLabelStyle: StyleProp<TextStyle>
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  separatorStyle: StyleProp<ViewStyle>
  groupStyle: StyleProp<ViewStyle>
  itemStyle: StyleProp<ViewStyle>
  /** A row's title, by intent — and the grey one of a disabled row. */
  itemTitleStyle: Record<MenuItemVariant | 'grey', StyleProp<TextStyle>>
  itemDescriptionStyle: StyleProp<TextStyle>
  itemIndicatorStyle: StyleProp<ViewStyle>
  /** What an `Icon` in a row is drawn at, by the row's intent. */
  glyph: Record<MenuItemVariant | 'grey', IconContextValue>
  isOpen: boolean
  isDisabled: boolean
  /** An ancestor said `disable-all`: everything is set without animation. */
  isStill: boolean
  open: () => void
  close: () => void
  toggle: () => void
  /** Measured as the menu opens; `null` until it has been. */
  anchor: MenuAnchor | null
  motion: MenuMotion
  /** `Menu.Overlay`'s word. True without one. */
  isDismissable: boolean
  setDismissable: (isDismissable: boolean) => void
  /** Where `Menu.Overlay` hands its ground to the panel's `Modal`. */
  backdrop: NodeSlot
  /** The view around the trigger: what is measured, and what stays in front. */
  holder: RefObject<View | null>
  /** The trigger's own box inside that view, from its layout. */
  bounds: MutableRefObject<MenuRect | null>
  /** The trigger's own node: where the focus goes back to. */
  trigger: RefObject<View | null>
}

/** One row's own state, for the slots inside it. */
export type MenuItemContextValue = MenuItemRenderState & {
  variant: MenuItemVariant
}
