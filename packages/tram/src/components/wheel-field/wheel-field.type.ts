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
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

/**
 * A field that opens a page of wheels — what the Tram `DatePicker` and `TimePicker` are
 * both made of. Not a subpath: each picker names these types after itself.
 */
export type WheelFieldSlot =
  | 'trigger'
  | 'value'
  | 'placeholder'
  | 'indicator'
  | 'page'
  | 'title'
  | 'body'
  | 'bar'
  | 'barItem'
  | 'barButton'
  | 'barLabel'

/** The field's height, its type and the wheel's squares. */
export type WheelFieldSize = TramSize

/** What both pickers take, apart from their own options. */
export type WheelFieldOwnProps = {
  children?: ReactNode
  /** The field's height and type, and the side of the squares on the page. */
  size?: WheelFieldSize
  /** Overrides the field's corner. Every key stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents, for a picker that is not in the theme's accent: the
   * field's line while the page is open, read as ink, and the current squares' fill.
   * `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw `#RRGGBB` tint, never a token — the same two places as `accent`. */
  color?: string
  /** The chosen moment. Controlled — leave it out and the picker holds its own. */
  value?: Date
  defaultValue?: Date
  /** Fired once, on the page's ✓ — never while a wheel turns. */
  onValueChange?: (value: Date) => void
  /** Controlled open state. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** The field's words and the squares' names come from here. @default the device's */
  locale?: string
  /** How the field reads the chosen moment. Anything `Intl.DateTimeFormat` takes. */
  formatOptions?: Intl.DateTimeFormatOptions
  /** Greys the line, the value and the label. A disabled picker does not open. */
  isDisabled?: boolean
  /** Draws the line in `danger`, and `.Error` with it. The label keeps its ink. */
  isInvalid?: boolean
  /** Merge into the single child instead of rendering a `View`. */
  asChild?: boolean
}

/** The root is the column: the label, the field, the description or the error. */
export type WheelFieldRootProps<Own> = Own &
  WheelFieldOwnProps &
  Omit<ViewProps, keyof WheelFieldOwnProps | keyof Own> &
  Omit<ViewStyleProps, keyof WheelFieldOwnProps | keyof Own | keyof ViewProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
export type WheelFieldTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

type WheelFieldTriggerOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

/**
 * The field: the box and its row, and the control a screen reader stops on. `ref`,
 * `style` and the pressable props are the row's; the line around it is the picker's.
 */
export type WheelFieldTriggerProps = WheelFieldTriggerOwnProps &
  Omit<PressableProps, keyof WheelFieldTriggerOwnProps> &
  Omit<ViewStyleProps, keyof WheelFieldTriggerOwnProps | keyof PressableProps>

type WheelFieldFieldOwnProps = {
  /** The line the field shows while nothing is chosen. */
  placeholder?: string
  /** Replaces the value inside the trigger. */
  children?: ReactNode
}

/** The trigger and its value in one tag. Everything the trigger takes lands on it. */
export type WheelFieldFieldProps = WheelFieldFieldOwnProps &
  Omit<PressableProps, keyof WheelFieldFieldOwnProps> &
  Omit<ViewStyleProps, keyof WheelFieldFieldOwnProps | keyof PressableProps>

type WheelFieldValueOwnProps = {
  /** Shown until something is chosen, in the placeholder's ink. */
  placeholder?: string
  /** Replaces the moment as the root reads it. */
  children?: ReactNode
}

export type WheelFieldValueProps = WheelFieldValueOwnProps &
  Omit<TextProps, keyof WheelFieldValueOwnProps> &
  Omit<TextStyleProps, keyof WheelFieldValueOwnProps | keyof TextProps>

/**
 * A glyph at the end of the field, in its ink. **It draws nothing unless given one**:
 * the Metro field was a box and its value.
 */
export type WheelFieldIndicatorProps = {
  as?: ComponentType<IconComponentProps>
  size?: number
  /** A raw value, never a token. Overrides the field's ink. */
  color?: string
}

/**
 * What else closes the page: the system's back. It draws nothing — the page takes the
 * screen, and there is no outside to touch.
 */
export type WheelFieldOverlayProps = {
  /** Set false and only ✓ and ✕ close the page. @default true */
  isDismissable?: boolean
}

type WheelFieldContentOwnProps = {
  /** The wheels. Unset, the picker's own `.Wheel`. */
  children?: ReactNode
  /** What the ✓ is called, under it and to a screen reader. @default 'done' */
  confirmLabel?: string
  /** What the ✕ is called. @default 'cancel' */
  cancelLabel?: string
}

/**
 * The page: the label as its title, the wheels, and the App Bar's ✓ and ✕ at the bottom.
 * `ref`, `style` and the view's props are the page's.
 */
export type WheelFieldContentProps = WheelFieldContentOwnProps &
  Omit<ViewProps, keyof WheelFieldContentOwnProps> &
  Omit<ViewStyleProps, keyof WheelFieldContentOwnProps | keyof ViewProps>

/** What a picker hands its wheel: its size, its colour, and whether it answers. */
export type WheelFieldWheel = {
  size: WheelFieldSize
  accent?: TramAccentName
  color?: string
  isDisabled: boolean
}

/** Resolved styles, the state, and the moment the wheels stand on while the page is up. */
export type WheelFieldContextValue = {
  boxStyle: StyleProp<ViewStyle>
  triggerStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  labelStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  errorStyle: StyleProp<TextStyle>
  pageStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  bodyStyle: StyleProp<ViewStyle>
  barStyle: StyleProp<ViewStyle>
  barItemStyle: StyleProp<ViewStyle>
  barButtonStyle: StyleProp<ViewStyle>
  barLabelStyle: StyleProp<TextStyle>
  /** Values, not a style: `Icon` hands them to a third-party component. */
  glyph: IconContextValue
  /** The ✓ and the ✕, in the bar's ink. */
  barGlyph: { size: number; color: string }
  /** What the page adds above its title and under its bar, over the safe area. */
  pageInset: { top: number; bottom: number }
  /** The two ends the field's line moves between as the page opens and closes. */
  border: { rest: string; open: string }
  /** 0 closed, 1 open: the line between the page's ink and the accent's. */
  line: SharedValue<number>
  /** How far the trigger's `hitSlop` reaches for a box drawn under 48. */
  reach: number
  /** The same for a circle of the bar. */
  barReach: number
  /** The chosen moment as the field reads it, or `undefined` while none is. */
  label?: string
  /** What the wheels stand on: the moment being chosen, not yet the value. */
  draft: Date
  setDraft: (next: Date) => void
  wheel: WheelFieldWheel
  isOpen: boolean
  isDisabled: boolean
  isInvalid: boolean
  /** An ancestor asked for no animation at all. */
  isStill: boolean
  open: () => void
  /** Closes the page and drops the draft: ✕, and the system's back. */
  cancel: () => void
  /** Takes the draft as the value and closes the page: ✓. */
  confirm: () => void
  /** The label's text, which titles the page. */
  title?: string
  setTitle: (title: string | undefined) => void
  /** `.Overlay`'s word on whether the system's back closes the page. */
  dismissable: RefObject<boolean>
  labelId: string
  descriptionId: string
  errorId: string
  pageId: string
}
