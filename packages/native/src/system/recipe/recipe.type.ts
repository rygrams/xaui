import type { TextStyle, ViewStyle } from 'react-native'
import type { XAUIColors, XAUITheme } from '../../theme/theme.type'

/**
 * A slot is a view or a text node, and a recipe writes one object per slot, so the two
 * RN style shapes are merged rather than discriminated per slot.
 */
export type SlotStyle = ViewStyle & TextStyle

export type SlotStyles<Slot extends string> = Partial<Record<Slot, SlotStyle>>

/**
 * The roles a variant consumes. The variant names tokens; `paint` says where they land.
 *
 * A role exists once a *state* needs the variant's own colour rather than a token named
 * in the state function — `bgPressed` is what makes a pressed `Button` darken its own
 * fill instead of taking a neutral wash, and `borderFocus` is the same thing for a field
 * that has focus. Both also mean a raw `color` follows into that state, because
 * `resolveTint` maps every declared role.
 *
 * **A state that reads a role must find it declared on every variant.** The merge is a
 * shallow spread, so a `borderColor: colors.borderFocus` on a variant that names no
 * `borderFocus` writes `undefined` over the colour `paint` had set.
 */
export type VariantRole = 'bg' | 'bgPressed' | 'fg' | 'border' | 'borderFocus'

/** Token names per role — no colour value ever appears in a recipe. */
export type VariantTokens = Partial<Record<VariantRole, keyof XAUIColors>>

/** The same roles resolved: theme colours, or the slices of a raw `color`. */
export type VariantColors = Partial<Record<VariantRole, string>>

/**
 * `disabled` is applied last of the three: a control that is both pressed and disabled
 * has to read disabled.
 */
export type StateName = 'focused' | 'pressed' | 'disabled'

export type States = Partial<Record<StateName, boolean>>

/** Reads the theme and the variant's resolved colours; returns one style per slot. */
export type StyleFn<Slot extends string> = (
  theme: XAUITheme,
  colors: VariantColors
) => SlotStyles<Slot>

/** Named axes of finite token values — `{ size: { sm: fn, md: fn } }`. */
export type Axes<Slot extends string> = Record<string, Record<string, StyleFn<Slot>>>

/** One value per axis, plus the variant. Missing keys fall back to `defaultVariants`. */
export type Selection<Variant extends string, A extends Axes<string>> = {
  variant?: Variant
} & { [Axis in keyof A]?: Extract<keyof A[Axis], string> }

export type CompoundVariant<
  Slot extends string,
  Variant extends string,
  A extends Axes<Slot>,
> = {
  when: Selection<Variant, A>
  style: StyleFn<Slot>
}

export type RecipeConfig<
  Slot extends string,
  Variant extends string,
  A extends Axes<Slot>,
> = {
  /** Every slot the component publishes. Slots a recipe never styles resolve to `{}`. */
  slots: readonly Slot[]
  base?: StyleFn<Slot>
  variantTokens?: Record<Variant, VariantTokens>
  /** Where the variant's colours land — written once, and it holds for every variant. */
  paint?: StyleFn<Slot>
  variants?: A
  /**
   * `NoInfer` for the same reason `defaultVariants` needs it: a `when` clause **selects**
   * from the variants `variantTokens` declared, it does not declare one. Without it a
   * recipe whose only compound is `{ when: { variant: 'default' } }` narrows `Variant` to
   * that single literal, and every other variant becomes a type error at the call site.
   */
  compoundVariants?: ReadonlyArray<CompoundVariant<Slot, NoInfer<Variant>, A>>
  states?: Partial<Record<StateName, StyleFn<Slot>>>
  /**
   * `NoInfer`, because this is the one place a single variant name appears on its own:
   * without it, inference reads `Variant` off `{ variant: 'primary' }` and narrows the
   * whole recipe to that one value, so every other variant becomes a type error at the
   * call site. `variantTokens` is the declaration; this only picks a default from it.
   */
  defaultVariants?: Selection<NoInfer<Variant>, A>
}

/** Stable references: the same object for the same tokens, for the app's lifetime. */
export type ResolvedStyles<Slot extends string> = Readonly<Record<Slot, SlotStyle>>

/** A selection with `defaultVariants` already folded in, keyed by axis name. */
export type ResolvedSelection = Readonly<Record<string, string | undefined>>
