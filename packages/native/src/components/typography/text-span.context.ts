import { createContext, useContext } from 'react'
import type { TextStyle } from 'react-native'
import type { TypographyAlign } from './typography.type'

export type TextSpanInheritedTextStyle = {
  color?: TextStyle['color']
  fontWeight?: TextStyle['fontWeight']
  fontStyle?: TextStyle['fontStyle']
  textTransform?: TextStyle['textTransform']
  align?: TypographyAlign
}

export const TextSpanContext = createContext<TextSpanInheritedTextStyle>({})

export const useTextSpanInheritedStyle = () => {
  return useContext(TextSpanContext)
}
