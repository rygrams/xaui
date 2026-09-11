import type { TextStyle } from '../style-props'
import type { XAUIColors, XAUITheme } from '../../theme/theme.type'

export type SlotStyle = TextStyle
export type SlotStyles<Slot extends string> = Partial<Record<Slot, SlotStyle>>

export type VariantRole =
  | 'bg'
  | 'bgPressed'
  | 'bgSelected'
  | 'fg'
  | 'fgSelected'
  | 'border'
  | 'borderFocus'

export type VariantTokens = Partial<Record<VariantRole, keyof XAUIColors>>
export type VariantColors = Partial<Record<VariantRole, string>>
export type StateName = 'focused' | 'pressed' | 'disabled'
export type States = Partial<Record<StateName, boolean>>

export type StyleFn<Slot extends string> = (
  theme: XAUITheme,
  colors: VariantColors
) => SlotStyles<Slot>

export type Axes<Slot extends string> = Record<string, Record<string, StyleFn<Slot>>>

export type Selection<Variant extends string, AxesType extends Axes<string>> = {
  variant?: Variant
} & {
  [Axis in keyof AxesType]?: Extract<keyof AxesType[Axis], string>
}

export type CompoundVariant<
  Slot extends string,
  Variant extends string,
  AxesType extends Axes<Slot>,
> = {
  when: Selection<Variant, AxesType>
  style: StyleFn<Slot>
}

export type RecipeConfig<
  Slot extends string,
  Variant extends string,
  AxesType extends Axes<Slot>,
> = {
  slots: readonly Slot[]
  base?: StyleFn<Slot>
  variantTokens?: Record<Variant, VariantTokens>
  paint?: StyleFn<Slot>
  variants?: AxesType
  compoundVariants?: ReadonlyArray<CompoundVariant<Slot, NoInfer<Variant>, AxesType>>
  states?: Partial<Record<StateName, StyleFn<Slot>>>
  defaultVariants?: Selection<NoInfer<Variant>, AxesType>
}

export type ResolvedStyles<Slot extends string> = Readonly<Record<Slot, SlotStyle>>
export type ResolvedSelection = Readonly<Record<string, string | undefined>>
