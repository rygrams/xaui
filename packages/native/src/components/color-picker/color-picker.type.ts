import type { ReactNode } from 'react'
import type {
  PressableProps,
  ScrollViewProps,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { DummyFieldFieldProps, DummyFieldLabelPlacement } from '../dummy-field'

export type ColorPickerSlot =
  | 'preview'
  | 'grid'
  | 'group'
  | 'groupLabel'
  | 'swatches'
  | 'swatch'
  | 'swatchSelected'
  | 'swatchFill'

/**
 * The field's four levels, because the trigger **is** a field — the `DummyField`'s exactly,
 * which is the v1 name of the `InputTrigger` the legacy picker opened its sheet from.
 */
export type ColorPickerVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type ColorPickerSize = Size

/** Tailwind's step, kept as the label a screen reader reads: "Violet 600". */
export type ColorPickerShade =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'

export type ColorSwatch = {
  /** The step inside its ramp. Free text, so a palette of your own can name its own steps. */
  shade: string
  /** The colour itself, as a hex string. */
  value: string
}

export type ColorGroup = {
  /** The hue's name — "Violet". It labels the row and half of every swatch's label. */
  name: string
  swatches: readonly ColorSwatch[]
}

type ColorPickerOwnProps = {
  /** The **field**'s emphasis. It never reaches the grid, which is not a field. */
  variant?: ColorPickerVariant
  /** The field's height, its padding and the grid's cell. Never width. */
  size?: ColorPickerSize
  /** The field's corner, the chip's and the swatch's. The dialog keeps the `Dialog`'s. */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). It dresses the field, and it is the ring
   * around the chosen swatch — the legacy picker's `themeColor`, which drove the same two.
   */
  color?: string
  /** Above the box, or lifted into it. @default 'outside' */
  labelPlacement?: DummyFieldLabelPlacement
  /** The chosen colour, as a hex string. Controlled — leave it out and the picker holds its own. */
  value?: string
  defaultValue?: string
  /** Every choice, including one made in a grid that stays open. */
  onValueChange?: (color: string) => void
  /** Controlled open state of the dialog. Ignored by a grid with no dialog in it. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /**
   * What the grid draws. Defaults to `TAILWIND_PALETTE` — the seventeen hues plus Zinc, at
   * eight steps each.
   */
  colors?: readonly ColorGroup[]
  /**
   * Whether choosing a colour closes the dialog. On by default: a picker whose only job is
   * one colour has been answered the moment a swatch is pressed. Off for a grid on a page,
   * where there is nothing to close.
   */
  closeOnSelect?: boolean
  /** Paints the field's border, label and description in `danger`. */
  isInvalid?: boolean
  /** Dims the field and stops the dialog, the field and every swatch together. */
  isDisabled?: boolean
  children?: ReactNode
}

type ColorPickerRootOwnProps = ColorPickerOwnProps & { asChild?: boolean }

/**
 * The root **is the column**, the `DummyField`'s: a `View` that stacks the label, the field
 * and the hint. `ref`, `style` and R14's style props are the column's; the trigger keeps
 * its own inside `ColorPicker.Field`.
 */
export type ColorPickerProps = ColorPickerRootOwnProps &
  Omit<ViewProps, keyof ColorPickerRootOwnProps> &
  Omit<ViewStyleProps, keyof ColorPickerRootOwnProps | keyof ViewProps>

/**
 * Everything `DummyField.Field` accepts. `value` defaults to the chosen colour written in
 * upper case, and the press that opens the dialog is the root's.
 */
export type ColorPickerFieldProps = DummyFieldFieldProps

type ColorPickerPreviewOwnProps = {
  /** A colour of your own. Unset, it is the chosen one — which is the point of the chip. */
  color?: string
}

export type ColorPickerPreviewProps = ColorPickerPreviewOwnProps &
  Omit<ViewProps, keyof ColorPickerPreviewOwnProps> &
  Omit<ViewStyleProps, keyof ColorPickerPreviewOwnProps | keyof ViewProps>

/** The dialog's panel. Everything `Dialog.Content` accepts. */
export type ColorPickerContentProps = ViewProps &
  ViewStyleProps & { children?: ReactNode }

/** Everything a `ScrollView` accepts — `scrollEnabled={false}` for a grid on a page. */
export type ColorPickerGridProps = ScrollViewProps & ViewStyleProps

type ColorPickerGroupOwnProps = {
  /**
   * The hue's name, drawn above the row. A string is wrapped in the label's own `Text`
   * (R3); an element is rendered as it is. Unset, the row carries no label.
   */
  name?: ReactNode
  /** The swatches. */
  children?: ReactNode
}

export type ColorPickerGroupProps = ColorPickerGroupOwnProps &
  Omit<ViewProps, keyof ColorPickerGroupOwnProps> &
  Omit<ViewStyleProps, keyof ColorPickerGroupOwnProps | keyof ViewProps>

type ColorPickerSwatchOwnProps = {
  /** The colour this cell offers. */
  color: string
  /**
   * What a screen reader reads. Unset, it is the colour's own hex — pass the name a
   * designer would use ("Violet 600"), which is what `ColorPicker.Grid` does.
   */
  accessibilityLabel?: string
}

export type ColorPickerSwatchProps = ColorPickerSwatchOwnProps &
  Omit<PressableProps, keyof ColorPickerSwatchOwnProps | 'style'> &
  ViewStyleProps & {
    /** R9 — `Pressable`'s function form as much as an object or an array. */
    style?: PressableProps['style']
  }

/** R5 — resolved styles and the chosen colour, never props for a slot to resolve again. */
export type ColorPickerContextValue = {
  value: string | undefined
  select: (color: string) => void
  colors: readonly ColorGroup[]
  isDisabled: boolean
  previewStyle: StyleProp<ViewStyle>
  /** The dashed edge a chip wears while nothing is chosen. */
  previewEmptyStyle: StyleProp<ViewStyle>
  gridStyle: StyleProp<ViewStyle>
  groupStyle: StyleProp<ViewStyle>
  groupLabelStyle: StyleProp<TextStyle>
  swatchesStyle: StyleProp<ViewStyle>
  swatchStyle: StyleProp<ViewStyle>
  /** The ring the chosen cell draws **over** its colour — an inset edge, not a border. */
  swatchSelectedStyle: StyleProp<ViewStyle>
  swatchFillStyle: StyleProp<ViewStyle>
}
