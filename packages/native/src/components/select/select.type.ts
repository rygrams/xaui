import type { ReactNode } from 'react'
import type { ComponentType } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconComponentProps, IconContextValue } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type {
  Align,
  Anchor,
  AnchoredWidth,
  Insets,
  Placement,
} from '../../utils/placement'

export type SelectSlot =
  | 'trigger'
  | 'value'
  | 'placeholder'
  | 'indicator'
  | 'overlay'
  | 'content'
  | 'label'
  | 'item'
  | 'itemLabel'
  | 'itemDescription'
  | 'itemIndicator'

/**
 * The trigger **is** a field, so it takes the field's four emphasis levels rather than
 * the button's ten. A select that offers `danger` would be offering an intent to a
 * control whose intent is always the same: pick one of these.
 */
export type SelectVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

/**
 * No `xs`. A trigger that small has to hold a value, a chevron and the gap between them,
 * and at that height the value gets nothing — the control reads as a chip that lies about
 * being pressable. The `TextField` keeps its `xs` because a field only has to hold text.
 */
export type SelectSize = Exclude<Size, 'xs'>

/**
 * Which side of the trigger the list opens on. Two of the four a `Popover` takes: a
 * select's list is as wide as the field it belongs to, and one hanging off the side of
 * its own field reads as a menu rather than as that field's values.
 */
export type SelectPlacement = Extract<Placement, 'top' | 'bottom'>

/** Where the list lines up along the trigger's cross axis. */
export type SelectAlign = Align

/**
 * `trigger` matches the field exactly, which is the default because a list wider than the
 * control it drops out of reads as a different surface. `content-fit` lets it hug the
 * longest label instead, bounded by the screen.
 */
export type SelectWidth = AnchoredWidth

/** Screen edges the list refuses to cross, in points. */
export type SelectInsets = Insets

type SelectOwnProps = {
  children?: ReactNode
  variant?: SelectVariant
  size?: SelectSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  /** Controlled selection. Leave unset and the root owns it. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Controlled open state. Leave unset and the root owns it. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  isDisabled?: boolean
  isInvalid?: boolean
}

/**
 * The root renders **no node**. It is state and resolved style around a trigger and a
 * list, and the trigger is the control — which is why `ref`, `style`, `testID`, the a11y
 * props and R14's style props are all on `Select.Trigger` rather than here. A wrapper
 * view would exist only to receive them, and it would put a second box around a field
 * that already is one.
 */
export type SelectProps = SelectOwnProps

type SelectTriggerOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

export type SelectTriggerProps = SelectTriggerOwnProps &
  Omit<PressableProps, keyof SelectTriggerOwnProps> &
  Omit<ViewStyleProps, keyof SelectTriggerOwnProps | keyof PressableProps>

type SelectValueOwnProps = {
  /** Shown until something is selected, in the placeholder colour. */
  placeholder?: string
  /**
   * The selected value's label, when the caller renders items lazily and the root has
   * never seen them. Unset, the value falls back to the label of the matching item.
   */
  children?: ReactNode
}

export type SelectValueProps = SelectValueOwnProps &
  Omit<TextProps, keyof SelectValueOwnProps> &
  Omit<TextStyleProps, keyof SelectValueOwnProps | keyof TextProps>

/**
 * The chevron. It rotates on a spring rather than a timing curve, which is what makes the
 * turn read as the list pushing it round instead of as a separate animation playing.
 */
export type SelectIndicatorProps = {
  /** The glyph. Defaults to the chevron this component ships. */
  as?: ComponentType<IconComponentProps>
  size?: number
  /** A raw value (R7), never a token. Overrides what the trigger asked for. */
  color?: string
}

type SelectOverlayOwnProps = {
  children?: ReactNode
  /** Pressing the backdrop closes the list. Set false and only a choice closes it. */
  isDismissable?: boolean
}

export type SelectOverlayProps = SelectOverlayOwnProps &
  Omit<ViewProps, keyof SelectOverlayOwnProps> &
  Omit<ViewStyleProps, keyof SelectOverlayOwnProps | keyof ViewProps>

type SelectContentOwnProps = {
  children?: ReactNode
  placement?: SelectPlacement
  align?: SelectAlign
  width?: SelectWidth
  /** Distance from the trigger, in points. */
  offset?: number
  /** Shift along the alignment axis, in points. */
  alignOffset?: number
  /** Flip to the other side when the chosen one does not fit. */
  avoidCollisions?: boolean
  insets?: SelectInsets
}

export type SelectContentProps = SelectContentOwnProps &
  Omit<ViewProps, keyof SelectContentOwnProps> &
  Omit<ViewStyleProps, keyof SelectContentOwnProps | keyof ViewProps>

type SelectLabelOwnProps = { children?: ReactNode }

export type SelectLabelProps = SelectLabelOwnProps &
  Omit<TextProps, keyof SelectLabelOwnProps> &
  Omit<TextStyleProps, keyof SelectLabelOwnProps | keyof TextProps>

/** What an item's render function is handed, so it can paint its own selected state. */
export type SelectItemRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type SelectItemOwnProps = {
  value: string
  /** The label the trigger shows once this item is chosen. */
  label?: string
  isDisabled?: boolean
  children?: ReactNode | ((state: SelectItemRenderState) => ReactNode)
  asChild?: boolean
}

export type SelectItemProps = SelectItemOwnProps &
  Omit<PressableProps, keyof SelectItemOwnProps> &
  Omit<ViewStyleProps, keyof SelectItemOwnProps | keyof PressableProps>

type SelectItemTextOwnProps = { children?: ReactNode }

export type SelectItemLabelProps = SelectItemTextOwnProps &
  Omit<TextProps, keyof SelectItemTextOwnProps> &
  Omit<TextStyleProps, keyof SelectItemTextOwnProps | keyof TextProps>

export type SelectItemDescriptionProps = SelectItemLabelProps

/** The check. Its box always renders; the glyph inside it only when the row is chosen. */
export type SelectItemIndicatorProps = {
  /** The glyph. Defaults to the check this component ships. */
  as?: ComponentType<IconComponentProps>
  size?: number
  /** A raw value (R7), never a token. */
  color?: string
}

/**
 * R5 — resolved style ids and the state the slots read. Nothing here is re-resolved by a
 * slot, and nothing in it is a raw prop.
 */
export type SelectContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  /**
   * Resolved alongside the resting one rather than by the trigger: R5 keeps resolution on
   * the root, and the trigger owns the press state the root cannot see.
   */
  triggerPressedStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  itemStyle: StyleProp<ViewStyle>
  /** The same split as the trigger's, for the row a finger happens to be on. */
  itemPressedStyle: StyleProp<ViewStyle>
  itemLabelStyle: StyleProp<TextStyle>
  itemDescriptionStyle: StyleProp<TextStyle>
  itemIndicatorStyle: StyleProp<ViewStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so
   * the root flattens its indicator slot once here rather than in every icon it contains.
   */
  glyph: IconContextValue
  /** The check's colour — the row's own, because the check belongs to the list. */
  checkColor?: string
  value?: string
  isOpen: boolean
  isDisabled: boolean
  isInvalid: boolean
  open: () => void
  close: () => void
  toggle: () => void
  select: (value: string, label?: string) => void
  /** The trigger publishes its measured rectangle here; the content positions off it. */
  anchor: SelectAnchor | null
  setAnchor: (anchor: SelectAnchor) => void
  /** Labels registered by the items, so `Select.Value` can name the chosen one. */
  labelFor: (value: string) => string | undefined
  registerLabel: (value: string, label: string) => void
}

/** The trigger's rectangle in window coordinates. */
export type SelectAnchor = Anchor

/** What one item publishes to its own slots. */
export type SelectItemContextValue = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}
