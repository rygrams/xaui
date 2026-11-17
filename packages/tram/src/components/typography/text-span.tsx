import { forwardRef } from 'react'
import { Text } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import type { TextSpanProps } from './typography.type'

/**
 * A fragment of text, styled apart from the text around it.
 *
 * ```tsx
 * <Typography>
 *   supprimer <TextSpan fontWeight="600">trois projets</TextSpan> définitivement
 * </Typography>
 * ```
 *
 * A bare `Text`: nested in a `Typography` it inherits the role's size, face and colour
 * from the platform, so there is nothing of Tram's to draw here — only the style props.
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

TextSpan.displayName = 'XAUI.Tram.TextSpan'
