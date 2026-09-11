import styled from '@emotion/styled'
import type { CSSObject } from '@emotion/react'
import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Slot } from '../slot'

type StyledTextProps = { $xauiStyle: CSSObject }

const shouldForwardProp = (property: string) => property !== '$xauiStyle'

export const StyledText = styled('span', { shouldForwardProp })<StyledTextProps>(
  ({ $xauiStyle }) => $xauiStyle
)

export const StyledTextSlot = styled(Slot, {
  shouldForwardProp,
})<StyledTextProps>(({ $xauiStyle }) => $xauiStyle)

type TextRootProps = HTMLAttributes<HTMLElement> & {
  asChild: boolean
  children?: ReactNode
  xauiStyle: CSSObject
}

export const TextRoot = forwardRef<HTMLElement, TextRootProps>(function TextRoot(
  { asChild, children, xauiStyle, ...props },
  ref
) {
  if (asChild) {
    return (
      <StyledTextSlot ref={ref} $xauiStyle={xauiStyle} {...props}>
        {children}
      </StyledTextSlot>
    )
  }

  return (
    <StyledText ref={ref} $xauiStyle={xauiStyle} {...props}>
      {children}
    </StyledText>
  )
})

TextRoot.displayName = 'XAUI.TextRoot'
