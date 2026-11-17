import type { ComponentType, ReactNode, RefObject } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type {
  IconComponentProps,
  IconContextValue,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { ListPickerMode, RowSpan } from '../../system/list-picker'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type SelectSlot =
  | 'trigger'
  | 'value'
  | 'placeholder'
  | 'indicator'
  | 'overlay'
  | 'content'
  | 'page'
  | 'title'
  | 'groupLabel'
  | 'item'
  | 'itemLabel'
  | 'itemDescription'
  | 'itemIndicator'
  | 'current'
  | 'itemDisabled'

export type SelectSize = TramSize

/**
 * How the list opens: unfolding inside the field and pushing what is under it, or as a
 * page of its own. Unset, the number of choices decides — five at most unfold in place.
 */
export type SelectMode = ListPickerMode

type SelectOwnProps = {
  children?: ReactNode
  /** The field's height, its padding, the gaps and the type. Never width. */
  size?: SelectSize
  /** Overrides the field's corner. Every key stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents, for a select that is not in the theme's accent. It
   * is the colour of the border while the list is open and of the current choice in it,
   * read as ink. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw `#RRGGBB` tint, never a token: the open border and the current choice. */
  color?: string
  /** Controlled selection. Leave unset and the root owns it. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Controlled open state. Leave unset and the root owns it. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** Greys the border, the value and the label. A disabled select does not open. */
  isDisabled?: boolean
  /**
   * Draws the border in `danger`, open or not, and `Select.Error` with it. The label and
   * the description keep their ink.
   */
  isInvalid?: boolean
  /** Merge into the single child instead of rendering a `View`. */
  asChild?: boolean
}

/**
 * The root is the column — `Select.Label`, the field, `Select.Description` / `.Error` —
 * so `ref`, `style` and the style props dress that column. The control is
 * `Select.Trigger`.
 *
 * **No `variant`**, where Native has four: they are four fills of the box, and the Metro
 * box has one — the ground, inside a line.
 */
export type SelectProps = SelectOwnProps &
  Omit<ViewProps, keyof SelectOwnProps> &
  Omit<ViewStyleProps, keyof SelectOwnProps | keyof ViewProps>

type SelectTriggerOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

/**
 * The row of the field — the value and the chevron — and the control a screen reader
 * stops on. The line around it is the select's own: it also holds the list once that
 * unfolds, so `style` here dresses the row, and `radius` on the root rounds the box.
 */
export type SelectTriggerProps = SelectTriggerOwnProps &
  Omit<PressableProps, keyof SelectTriggerOwnProps> &
  Omit<ViewStyleProps, keyof SelectTriggerOwnProps | keyof PressableProps>

type SelectValueOwnProps = {
  /** Shown until something is chosen, in the placeholder's ink. */
  placeholder?: string
  /**
   * The chosen value's label, when the root cannot read it off the items — a row wrapped
   * in a component of the caller's. Unset, it is the label of the matching item.
   */
  children?: ReactNode
}

export type SelectValueProps = SelectValueOwnProps &
  Omit<TextProps, keyof SelectValueOwnProps> &
  Omit<TextStyleProps, keyof SelectValueOwnProps | keyof TextProps>

/** The chevron at the end of the field. It turns as the list opens. */
export type SelectIndicatorProps = {
  /** The glyph. Defaults to a chevron. */
  as?: ComponentType<IconComponentProps>
  size?: number
  /** A raw value, never a token. Overrides the field's ink. */
  color?: string
}

type SelectOverlayOwnProps = {
  children?: ReactNode
  /**
   * A touch outside an unfolded list closes it, and so does the system's back on a list
   * that took the screen. Set false and only a choice closes it.
   */
  isDismissable?: boolean
}

export type SelectOverlayProps = SelectOverlayOwnProps &
  Omit<ViewProps, keyof SelectOverlayOwnProps> &
  Omit<ViewStyleProps, keyof SelectOverlayOwnProps | keyof ViewProps>

type SelectContentOwnProps = {
  children?: ReactNode
  /** Forces how the list opens, whatever the number of choices. */
  mode?: SelectMode
}

/**
 * The list. `style` dresses the list inside the field, or the page.
 *
 * **No placement props**, where Native has eight (`placement`, `align`, `offset`,
 * `alignOffset`, `avoidCollisions`, `insets`, `width`, `minWidth`): the list is part of
 * its field or it is the whole screen, and neither is placed.
 *
 * A page starts at the very top of the screen. Tram reads no safe area: pad it with the
 * app's own inset — `<Select.Content paddingTop={insets.top + 24}>`.
 */
export type SelectContentProps = SelectContentOwnProps &
  Omit<ViewProps, keyof SelectContentOwnProps> &
  Omit<ViewStyleProps, keyof SelectContentOwnProps | keyof ViewProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
type SelectTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** What the field is for. A touch on it opens the list. */
export type SelectLabelProps = SelectTextProps
export type SelectDescriptionProps = SelectTextProps
export type SelectErrorProps = SelectTextProps
/** A heading over a run of choices, inside the list. */
export type SelectGroupLabelProps = SelectTextProps
export type SelectItemLabelProps = SelectTextProps
export type SelectItemDescriptionProps = SelectTextProps

/** What an item's render function is handed, so it can draw its own chosen state. */
export type SelectItemRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type SelectItemOwnProps = {
  value: string
  /** The label the field shows once this item is chosen. */
  label?: string
  /** Grey, and not to be chosen. */
  isDisabled?: boolean
  children?: ReactNode | ((state: SelectItemRenderState) => ReactNode)
  asChild?: boolean
}

export type SelectItemProps = SelectItemOwnProps &
  Omit<PressableProps, keyof SelectItemOwnProps> &
  Omit<ViewStyleProps, keyof SelectItemOwnProps | keyof PressableProps>

/**
 * A mark beside the chosen item. **It draws nothing unless given a glyph**, where Native
 * draws a check: in Metro the current choice is read by its colour.
 */
export type SelectItemIndicatorProps = {
  as?: ComponentType<IconComponentProps>
  size?: number
  /** A raw value, never a token. The current choice's ink by default. */
  color?: string
}

/** Where the inline list is handed from `Select.Content` to the box that draws it. */
export type SelectListSlot = {
  get: () => ReactNode
  set: (list: ReactNode) => void
  subscribe: (listener: () => void) => () => void
}

/** What `Select.Content` read off its children: how it opens, and its values in order. */
export type SelectListing = { mode: SelectMode; order: string }

/** The shared values the box, the list and the chevron move on. */
export type SelectMotion = {
  /** 0 folded, 1 unfolded in place. It stays at 0 for a list that takes the screen. */
  unfold: SharedValue<number>
  /** 0 closed, 1 open: the border between the page's ink and the accent's. */
  line: SharedValue<number>
  /** How much of the inline list is to be seen, the field's row being the rest. */
  shown: SharedValue<number>
  /** Where the current choice lies in the inline list. */
  current: SharedValue<RowSpan>
}

/** Resolved styles, and the values a slot cannot compute for itself. */
export type SelectContextValue = {
  boxStyle: StyleProp<ViewStyle>
  triggerStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  pageStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  groupLabelStyle: StyleProp<TextStyle>
  labelStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  errorStyle: StyleProp<TextStyle>
  itemStyle: StyleProp<ViewStyle>
  itemLabelStyle: StyleProp<TextStyle>
  itemDescriptionStyle: StyleProp<TextStyle>
  itemIndicatorStyle: StyleProp<ViewStyle>
  /** Layered over an item's label: the current choice, and an item not to be chosen. */
  currentStyle: StyleProp<TextStyle>
  itemDisabledStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands them to a third-party component. */
  glyph: IconContextValue
  /** The current choice's ink, for a mark drawn beside it. */
  currentInk?: string
  /** The two ends the border moves between as the list opens and closes. */
  border: { rest: string; open: string }
  /** The box's line, in points: what it adds above and below what it holds. */
  lineWidth: number
  /** How far the trigger's `hitSlop` reaches for a box drawn under 48. */
  reach: number
  value?: string
  isOpen: boolean
  isDisabled: boolean
  isInvalid: boolean
  /** An ancestor asked for no animation at all. */
  isStill: boolean
  mode: SelectMode
  open: () => void
  close: () => void
  toggle: () => void
  select: (value: string, label?: string) => void
  labelFor: (value: string) => string | undefined
  registerLabel: (value: string, label: string) => void
  /** The label's text, which heads the list once it takes the screen. */
  title?: string
  setTitle: (title: string | undefined) => void
  setListing: (listing: SelectListing) => void
  /** An item's turn in the cascade. */
  rankOf: (value: string) => number
  /** Milliseconds the cascade waits for — the page's swivel, or nothing. */
  cascadeAfter: number
  /** An item tells where it lies in its list. */
  reportSpan: (value: string, span: RowSpan) => void
  inlineList: SelectListSlot
  motion: SelectMotion
  /** The trigger's row and the inline list, in points, once they are laid out. */
  rowHeight: number
  setRowHeight: (height: number) => void
  listHeight: number
  setListHeight: (height: number) => void
  /** The box's top in the window, measured as the list opens. */
  boxTop: number | null
  setBoxTop: (top: number) => void
  /** `Select.Overlay`'s word on whether anything but a choice closes the list. */
  dismissable: RefObject<boolean>
  labelId: string
  descriptionId: string
  errorId: string
  listId: string
}

/** What one item publishes to its own slots. */
export type SelectItemContextValue = SelectItemRenderState
