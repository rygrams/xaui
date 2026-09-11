import { forwardRef } from 'react'
import { toWebStyle, useStyleProps } from '../../system'
import { TextRoot, useTextHostProps } from '../../system/text-host'
import { useXAUITheme } from '../../theme/theme-hooks'
import { typographyRecipe } from './typography.recipe'
import type { TextStyle } from '../../system'
import type { TextHostProps } from '../../system/text-host'
import type { TypographyProps } from './typography.type'

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    { children, variant, color, asChild = false, style, ...props },
    ref
  ) {
    const theme = useXAUITheme()
    const [styleProps, rest] = useStyleProps(props)
    const { domProps, hostStyle } = useTextHostProps(rest as TextHostProps)
    const selection = { variant }
    const styles = typographyRecipe.resolve({ theme, selection })
    const tint = color
      ? typographyRecipe.tint({ theme, color, selection })
      : undefined
    const resolvedStyle = toWebStyle([
      styles.root,
      tint?.root,
      styleProps as TextStyle,
      style,
    ])
    const xauiStyle = { ...hostStyle, ...resolvedStyle }

    return (
      <TextRoot ref={ref} asChild={asChild} xauiStyle={xauiStyle} {...domProps}>
        {children}
      </TextRoot>
    )
  }
)

Typography.displayName = 'XAUI.Typography'
