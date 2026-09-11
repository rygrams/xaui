import { createContext } from 'react'
import type { XAUITheme } from './theme.type'

export const ThemeContext = createContext<XAUITheme | null>(null)
