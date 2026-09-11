import type {
  IconComponentProps as NativeIconComponentProps,
  IconContextValue as NativeIconContextValue,
  IconProps as NativeIconProps,
} from '../../packages/native/src/system/icon'
import type {
  IconComponentProps as HybridIconComponentProps,
  IconContextValue as HybridIconContextValue,
  IconProps as HybridIconProps,
} from '../../packages/hybrid/src/system/icon'

type AssertNever<Difference extends never> = Difference

type _MissingIconProps = AssertNever<
  Exclude<keyof NativeIconProps, keyof HybridIconProps>
>
type _ExtraIconProps = AssertNever<
  Exclude<keyof HybridIconProps, keyof NativeIconProps>
>
type _MissingComponentProps = AssertNever<
  Exclude<keyof NativeIconComponentProps, keyof HybridIconComponentProps>
>
type _ExtraComponentProps = AssertNever<
  Exclude<keyof HybridIconComponentProps, keyof NativeIconComponentProps>
>
type _MissingContextKeys = AssertNever<
  Exclude<keyof NativeIconContextValue, keyof HybridIconContextValue>
>
type _ExtraContextKeys = AssertNever<
  Exclude<keyof HybridIconContextValue, keyof NativeIconContextValue>
>
