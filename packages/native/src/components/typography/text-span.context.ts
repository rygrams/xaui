import { createContext, useContext } from 'react'
import type { TextStyle } from 'react-native'

export type TextSpanInheritedTextStyle = {
  color?: TextStyle['color']
  fontWeight?: TextStyle['fontWeight']
  fontStyle?: TextStyle['fontStyle']
  textTransform?: TextStyle['textTransform']
}

export const TextSpanContext = createContext<TextSpanInheritedTextStyle>({})

export const useTextSpanInheritedStyle = () => {
  return useContext(TextSpanContext)
}
