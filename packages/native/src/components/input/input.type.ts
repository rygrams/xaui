import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type InputSlot =
  | 'root'
  | 'label'
  | 'field'
  | 'placeholder'
  | 'description'
  | 'error'

/**
 * The library's four emphasis levels, narrowed like the `Card`'s (§1 bis). A field
 * **reports nothing** — an error is `isInvalid`, which is a state and not a variant — so
 * `success`, `warning` and `danger` are absent here for the same reason they are there.
 *
 * This is where the theme's `field*` family is finally read, and the four names split
 * HeroUI's two-name `primary | secondary` by saying what each of their ends already is:
 *
 * - **`primary`** — the `fieldBackground` fill plus the theme's `field` shadow. HeroUI's
 *   `primary`, with the elevation their flat token only implies.
 * - **`secondary`** — the neutral `default` fill. HeroUI's `secondary`, and the default
 *   here: on a plain background a white field is its border and nothing else, while on a
 *   card the `fieldBackground` token *is* the card's own colour.
 * - **`tertiary`** — the border alone, no fill. The same drop the `Button`'s `tertiary`
 *   makes.
 * - **`ghost`** — neither. A bare field for a toolbar or an inline edit; it has no border
 *   to move, so its focus shows in the caret alone.
 *
 * The first three name the `fieldBorder` edge and `ghost` gives it up. Its width is the
 * theme's `borderWidth.field` — HeroUI's `--field-border-width`, which they ship at `0`
 * and we ship at `1`. That is the one shipped default where the two differ;
 * `createTheme({ borderWidth: { field: 0 } })` reproduces theirs.
 */
export type InputVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

/**
 * Where the label sits relative to the field's box.
 *
 * `outside` is the label above the box, in the column's flow. `inside` lifts it into the
 * box, above the text — the label is taken **out of flow** and placed against the box's
 * own padding, so the JSX is identical either way and nothing is reparented (R4).
 *
 * Because the inside label positions itself against the top of the root, it assumes the
 * field is the first thing in the column's flow: write `Input.Description` and
 * `Input.Error` after the field, which is where they belong anyway.
 */
export type InputLabelPlacement = 'outside' | 'inside'

export type InputSize = Size

/**
 * What the `Input` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the field's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type InputOwnProps = {
  variant?: InputVariant
  /** The field's height, its padding, the gaps and the type. Never width. */
  size?: InputSize
  /** Overrides the `field` radius the theme chose for every size. */
  radius?: RadiusKey
  /** Above the box, or lifted into it. @default 'outside' */
  labelPlacement?: InputLabelPlacement
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). It lands where the variant put its
   * tokens — the fill of a `default`, the border of a `tertiary` — and, because the focus
   * colour is a role like any other, it is also what the field borders on focus.
   */
  color?: string
  /**
   * Paints the border, the label and the description in `danger`, and takes the focus
   * treatment off: an error outranks focus, and a field that is both should read as
   * wrong rather than as busy.
   *
   * It does **not** mount or unmount `Input.Error`. That stays the caller's — a slot that
   * silently renders nothing is a slot you cannot debug.
   */
  isInvalid?: boolean
  /** Dims the field and makes it uneditable. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * R14 — the input's own props, the wrapper `View`'s, and every `ViewStyle` key neither
 * already claims. **`TextInputProps` are not here**: they belong to `Input.Field`, which
 * is the node that has them.
 */
export type InputProps = InputOwnProps &
  Omit<ViewProps, keyof InputOwnProps> &
  Omit<ViewStyleProps, keyof InputOwnProps | keyof ViewProps> & {
    /** R12 — merge into the single child instead of rendering a `View`. */
    asChild?: boolean
  }

/**
 * Everything `TextInput` accepts, plus the `TextStyle` keys as props (R14).
 *
 * `editable` is absent: it is `disabled` under another name, and R8 keeps that off the
 * public surface — `isDisabled` on the root is what stops the field.
 */
export type InputFieldProps = Omit<TextInputProps, 'editable'> &
  Omit<TextStyleProps, keyof TextInputProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
type InputTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type InputLabelProps = InputTextProps
export type InputDescriptionProps = InputTextProps
export type InputErrorProps = InputTextProps

/**
 * Read off `TextInput`'s own props rather than spelled out: React Native has renamed the
 * payload of these two more than once, and a hand-written `NativeSyntheticEvent<…>` here
 * would be a second declaration free to drift from the node that actually fires them.
 */
export type FieldFocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0]
export type FieldBlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0]

/**
 * R5 — resolved styles, not props for a slot to resolve a second time. Each entry is the
 * cached `StyleSheet` reference with the uncached tint pass layered over it, so a slot
 * merges its own `style` on top and does no work of its own.
 */
export type InputContextValue = {
  labelStyle: StyleProp<TextStyle>
  fieldStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  errorStyle: StyleProp<TextStyle>
  /**
   * A value and not a style: `placeholderTextColor` is a `TextInput` prop, so the root
   * flattens its placeholder slot once here rather than in the field.
   */
  placeholderTextColor?: string
  /**
   * The focus state lives on the **root**, because the root's recipe resolves on it (R5)
   * and it needs the value before it renders — but the node that hears the event is
   * `Input.Field`, three levels down. These are how it reports back. Their identity is
   * stable, so publishing them costs no re-render of a memoized slot.
   */
  onFieldFocus: (event: FieldFocusEvent) => void
  onFieldBlur: (event: FieldBlurEvent) => void
  /**
   * The id the label carries and the field points at, so a screen reader reads "Courriel,
   * champ de saisie" rather than just the placeholder.
   */
  labelId: string
  descriptionId: string
  isDisabled: boolean
  isInvalid: boolean
}
