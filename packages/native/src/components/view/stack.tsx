import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import type { StackProps } from './view.type'

/**
 * Things on top of each other.
 *
 * ```tsx
 * <Stack>
 *   <Image source={cover} />
 *   <Stack.Item bottom={0} start={0} end={0} padding={12}>
 *     <Typography variant="h5" color="#fff">Titre en surimpression</Typography>
 *   </Stack.Item>
 * </Stack>
 * ```
 *
 * **The first child in flow decides the size; `Stack.Item` overlays.** Unlike `Row` and
 * `Column`, this one is real mechanics rather than a name: absolute positioning needs a
 * containing block, and that is what the root provides.
 *
 * Overlaying is **composed**, not inferred — a `Stack` that absolutely positioned every
 * child but the first would have to guess which one sets the size, and would silently
 * change meaning the day a caller reordered them. `Stack.Item` says it instead.
 */
export const StackRoot = forwardRef<View, StackProps>(function Stack(
  { children, asChild = false, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const Root = asChild ? Slot : View

  // `relative` is React Native's default, and it is declared anyway: it is the containing
  // block every `Stack.Item` inside depends on, so it belongs in the code that promises it
  // rather than in the reader's memory of Yoga's defaults.
  return (
    <Root ref={ref} style={[{ position: 'relative' }, styleProps, style]} {...rest}>
      {children}
    </Root>
  )
})

StackRoot.displayName = 'XAUI.Stack'
