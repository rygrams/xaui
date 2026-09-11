import { forwardRef } from 'react'
import { toWebStyle, useStyleProps } from '../../system'
import { TextRoot, useTextHostProps } from '../../system/text-host'
import type { TextStyle } from '../../system'
import type { TextHostProps } from '../../system/text-host'
import type { TextSpanProps } from './typography.type'

export const TextSpan = forwardRef<HTMLElement, TextSpanProps>(function TextSpan(
  { children, asChild = false, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const { domProps, hostStyle } = useTextHostProps(rest as TextHostProps)
  const resolvedStyle = toWebStyle([styleProps as TextStyle, style])
  const xauiStyle = { ...hostStyle, ...resolvedStyle }

  return (
    <TextRoot ref={ref} asChild={asChild} xauiStyle={xauiStyle} {...domProps}>
      {children}
    </TextRoot>
  )
})

TextSpan.displayName = 'XAUI.TextSpan'
