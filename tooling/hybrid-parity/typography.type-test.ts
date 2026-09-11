import type {
  TextSpanProps as NativeTextSpanProps,
  TypographyProps as NativeTypographyProps,
  TypographySlot as NativeTypographySlot,
  TypographyVariant as NativeTypographyVariant,
} from '../../packages/native/src/components/typography'
import type {
  TextSpanProps as HybridTextSpanProps,
  TypographyProps as HybridTypographyProps,
  TypographySlot as HybridTypographySlot,
  TypographyVariant as HybridTypographyVariant,
} from '../../packages/hybrid/src/components/typography'

type AssertNever<Difference extends never> = Difference

type _MissingTypographyProps = AssertNever<
  Exclude<keyof NativeTypographyProps, keyof HybridTypographyProps>
>
type _ExtraTypographyProps = AssertNever<
  Exclude<keyof HybridTypographyProps, keyof NativeTypographyProps>
>
type _MissingTextSpanProps = AssertNever<
  Exclude<keyof NativeTextSpanProps, keyof HybridTextSpanProps>
>
type _ExtraTextSpanProps = AssertNever<
  Exclude<keyof HybridTextSpanProps, keyof NativeTextSpanProps>
>
type _MissingVariants = AssertNever<
  Exclude<NativeTypographyVariant, HybridTypographyVariant>
>
type _ExtraVariants = AssertNever<
  Exclude<HybridTypographyVariant, NativeTypographyVariant>
>
type _MissingSlots = AssertNever<Exclude<NativeTypographySlot, HybridTypographySlot>>
type _ExtraSlots = AssertNever<Exclude<HybridTypographySlot, NativeTypographySlot>>
