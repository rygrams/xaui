import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import type { StackItemProps } from './view.type'

/**
 * A layer inside a `Stack`, taken out of the flow.
 *
 * ```tsx
 * <Stack.Item bottom={0} start={0} end={0} padding={12}>
 *   <Typography variant="h5" color="#fff">Titre</Typography>
 * </Stack.Item>
 * ```
 *
 * It contributes `position: 'absolute'` and nothing else. Where the layer sits is R14 —
 * `top`, `bottom`, `start`, `end` and `zIndex` are `ViewStyle` keys already exposed as
 * props on every node, under React Native's own names. Note `start` and `end` rather than
 * `left` and `right`: R13 bans the physical pair, and these two flip with the writing
 * direction, which is what a caption over an image should do.
 *
 * There is no context between this and `Stack`, and no error when it is used outside one.
 * An absolutely positioned view is meaningful under any positioned ancestor, so a strict
 * context here would refuse arrangements that work.
 */
export const StackItem = forwardRef<View, StackItemProps>(function StackItem(
  { children, asChild = false, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const Root = asChild ? Slot : View

  return (
    <Root ref={ref} style={[{ position: 'absolute' }, styleProps, style]} {...rest}>
      {children}
    </Root>
  )
})

StackItem.displayName = 'XAUI.Stack.Item'
