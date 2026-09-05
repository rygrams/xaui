import { forwardRef } from 'react'
import { Text } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import type { TextSpanProps } from './typography.type'

/**
 * A fragment of text, styled apart from the text around it.
 *
 * ```tsx
 * <Typography>
 *   Supprimer <TextSpan fontWeight="600">trois projets</TextSpan> définitivement.
 * </Typography>
 * ```
 *
 * **It is a bare React Native `Text`, and that is the whole design.** Nesting a `Text`
 * inside a `Text` already inherits the parent's font, size, weight and colour on both
 * platforms — so a span needs no context to read, no role to resolve and no provider
 * above it. The legacy component published a `TextSpanContext` to carry that inheritance
 * by hand; it was reimplementing the platform, and it is gone.
 *
 * What is left is R14 and nothing else: every `TextStyle` key as a prop, and `style` after
 * them. There is no `variant` here on purpose — a span that names a role would be a
 * `Typography`, and nesting one of those is how you change role mid-sentence.
 */
export const TextSpan = forwardRef<Text, TextSpanProps>(function TextSpan(
  { children, asChild = false, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const Root = asChild ? Slot : Text

  return (
    <Root ref={ref} style={[styleProps, style]} {...rest}>
      {children}
    </Root>
  )
})

TextSpan.displayName = 'XAUI.TextSpan'
