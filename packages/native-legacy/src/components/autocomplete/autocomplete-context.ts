import { createContext } from 'react'
import type { Size, ThemeColor } from '../../types'

type AutocompleteContextValue = {
  size: Size
  themeColor: ThemeColor
  isDisabled: boolean
}

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  size: 'md',
  themeColor: 'default',
  isDisabled: false,
})
