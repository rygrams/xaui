import type { MutableRefObject, ReactNode } from 'react'
import type {
  PressableProps,
  ScrollViewProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { CloseButtonProps } from '../close-button'
import type { DummyFieldFieldProps, DummyFieldProps } from '../dummy-field'

export type ColorPickerSlot =
  | 'preview'
  | 'previewEmpty'
  | 'page'
  | 'title'
  | 'close'
  | 'grid'
  | 'group'
  | 'groupLabel'
  | 'swatches'
  | 'mosaicRow'
  | 'cell'
  | 'swatch'
  | 'swatchFill'
  | 'swatchName'
  | 'swatchNameKept'
  | 'ring'
  | 'ringLine'

export type { DummyFieldSize as ColorPickerSize } from '../dummy-field'

/**
 * How the palette is laid out — Native's two words, given the two Windows Phone pages of
 * accents.
 *
 * - **`ramps`** — the Windows Phone 7 list: one row per colour, a square of 48 and its
 *   name beside it. The chosen one is read by its name, written in its own colour as ink.
 * - **`mosaic`** — the Windows Phone 8 grid: squares five to a row, 2 apart, filling the
 *   width, no names. The chosen one wears a ring.
 */
export type ColorPickerLayout = 'ramps' | 'mosaic'

export type ColorSwatch = {
  /**
   * The colour's name inside its group: Tailwind's step ("600"), or the colour's own name
   * ("cobalt") in a group that has none. Free text.
   */
  shade: string
  /** The colour itself, as a hex string. */
  value: string
}

export type ColorGroup = {
  /**
   * The group's name — "violet". It heads the group, and prefixes every swatch's name:
   * "violet 600". Unset, the group has no heading and each swatch is named by its `shade`
   * alone, which is how `TRAM_PALETTE` names the twenty accents.
   */
  name?: string
  swatches: readonly ColorSwatch[]
}

type ColorPickerOwnProps = {
  /**
   * The palette's arrangement: the WP7 list of names, or the WP8 grid of squares.
   * @default 'ramps'
   */
  layout?: ColorPickerLayout
  /** The chosen colour, as a hex string. Controlled — leave it out and the picker holds its own. */
  value?: string
  defaultValue?: string
  /** Every choice, including one made in a grid that stays open. Felt as a `selection`. */
  onValueChange?: (color: string) => void
  /** Controlled open state of the page. Ignored by a grid with no page in it. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /**
   * What the grid draws. Defaults to `TRAM_PALETTE` — the twenty Tram accents, named, with
   * no shades.
   */
  colors?: readonly ColorGroup[]
  /**
   * Whether choosing a colour closes the page. On by default: a picker whose only job is
   * one colour has been answered the moment a swatch is pressed.
   */
  closeOnSelect?: boolean
  children?: ReactNode
}

/**
 * The root **is the column** — the Tram `DummyField`'s, so the Tram `TextField`'s: `size`,
 * `radius`, `accent`, `color`, `isInvalid`, `isDisabled`, `isRequired`, `asChild` and the
 * style props are its. `accent` and `color` are the field's line under the finger; the
 * palette is not tinted by them.
 *
 * **No `variant` and no `labelPlacement`**, where Native has both: the Metro field has one
 * drawing, its label above it. `onPress` is the root's own — it opens the page.
 */
export type ColorPickerProps = ColorPickerOwnProps &
  Omit<DummyFieldProps, keyof ColorPickerOwnProps | 'onPress'>

/**
 * Everything `DummyField.Field` accepts. Left empty it draws the chip, the colour's name
 * and the chevron; `value` replaces the name.
 */
export type ColorPickerFieldProps = DummyFieldFieldProps

type ColorPickerPreviewOwnProps = {
  /** A colour of your own. Unset, it is the chosen one — which is the point of the chip. */
  color?: string
}

export type ColorPickerPreviewProps = ColorPickerPreviewOwnProps &
  Omit<ViewProps, keyof ColorPickerPreviewOwnProps> &
  Omit<ViewStyleProps, keyof ColorPickerPreviewOwnProps | keyof ViewProps>

/** The page. Its `View`'s props and the `ViewStyle` keys as props. */
export type ColorPickerContentProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

type ColorPickerOverlayOwnProps = {
  /** Whether the system's back closes the page. @default true */
  isDismissable?: boolean
}

/**
 * It draws nothing — the page takes the screen and there is no outside to touch — so
 * it takes only `isDismissable`.
 */
export type ColorPickerOverlayProps = ColorPickerOverlayOwnProps

/**
 * `Text`'s own props win over the `TextStyle` keys of the same name. No `nativeID`: the
 * title's id is the one the page is labelled by, and a second one would break the link.
 */
export type ColorPickerTitleProps = Omit<TextProps, 'nativeID'> &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/**
 * The Tram `CloseButton`'s props. `variant` defaults to `text`: the cross alone, in the
 * page's top-end corner.
 */
export type ColorPickerCloseProps = CloseButtonProps

/** Everything a `ScrollView` accepts — `scrollEnabled={false}` for a grid on a page. */
export type ColorPickerGridProps = ScrollViewProps &
  Omit<ViewStyleProps, keyof ScrollViewProps>

type ColorPickerGroupOwnProps = {
  /**
   * The group's heading, above its swatches. A string is wrapped in the heading's own
   * `Text` (R3); an element is rendered as it is. Unset, the group has none.
   */
  name?: ReactNode
  /** The swatches. */
  children?: ReactNode
}

export type ColorPickerGroupProps = ColorPickerGroupOwnProps &
  Omit<ViewProps, keyof ColorPickerGroupOwnProps> &
  Omit<ViewStyleProps, keyof ColorPickerGroupOwnProps | keyof ViewProps>

type ColorPickerSwatchOwnProps = {
  /** The colour this swatch offers. */
  color: string
  /**
   * The colour's name, written beside its square under `ramps`; a `mosaic` draws none. A
   * string is wrapped in the name's own `Text` (R3).
   */
  name?: ReactNode
  /**
   * What a screen reader reads. Unset, it is the `name` when that is a string, else the
   * colour's hex.
   */
  accessibilityLabel?: string
}

export type ColorPickerSwatchProps = ColorPickerSwatchOwnProps &
  Omit<PressableProps, keyof ColorPickerSwatchOwnProps | 'style'> &
  Omit<ViewStyleProps, keyof ColorPickerSwatchOwnProps | keyof PressableProps> & {
    /** R9 — `Pressable`'s function form as much as an object or an array. */
    style?: PressableProps['style']
  }

/** R5 — the resolved styles, the chosen colour and what to do with a new one. */
export type ColorPickerContextValue = {
  value: string | undefined
  select: (color: string) => void
  close: () => void
  colors: readonly ColorGroup[]
  layout: ColorPickerLayout
  /** The name the field shows for `color`: its name in `colors`, else its hex. */
  nameOf: (color: string) => string
  /** `color` written as a name on the ground: moved until it reads, 4.5:1. */
  inkOf: (color: string) => string
  isOpen: boolean
  isDisabled: boolean
  isStill: boolean
  /** Inside `ColorPicker.Content`: the swatches arrive in the page's cascade. */
  isPaged: boolean
  /** Whether the system's back closes the page — what `ColorPicker.Overlay` says. */
  dismissable: MutableRefObject<boolean>
  titleId: string
  /** Whether a `ColorPicker.Title` is mounted: the page is labelled by it only then. */
  hasTitle: boolean
  /** A `ColorPicker.Title` says it is there; what it is handed back says it has gone. */
  registerTitle: () => () => void
  /** The page's own inset at its top, under the safe area. */
  pageTop: number
  previewStyle: StyleProp<ViewStyle>
  previewEmptyStyle: StyleProp<ViewStyle>
  pageStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  closeStyle: StyleProp<ViewStyle>
  gridStyle: StyleProp<ViewStyle>
  groupStyle: StyleProp<ViewStyle>
  groupLabelStyle: StyleProp<TextStyle>
  swatchesStyle: StyleProp<ViewStyle>
  mosaicRowStyle: StyleProp<ViewStyle>
  cellStyle: StyleProp<ViewStyle>
  swatchStyle: StyleProp<ViewStyle>
  swatchFillStyle: StyleProp<ViewStyle>
  swatchNameStyle: StyleProp<TextStyle>
  /** The chosen name on a disabled picker: the page's ink, while the others go grey. */
  swatchNameKeptStyle: StyleProp<TextStyle>
  /** The ground band at the edge of the chosen square, then the line of ink inside it. */
  ringStyle: StyleProp<ViewStyle>
  ringLineStyle: StyleProp<ViewStyle>
}
