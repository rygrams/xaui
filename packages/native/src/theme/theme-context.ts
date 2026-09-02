import { createContext } from 'react'
import type { XAUITheme } from './theme.type'

/** Bare context. `null` is what lets the hooks throw a named error outside the provider. */
export const ThemeContext = createContext<XAUITheme | null>(null)
