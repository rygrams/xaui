import { createContext, useContext } from 'react'

const SnackbarStackContext = createContext(false)

export const SnackbarStackProvider = SnackbarStackContext.Provider

export function useIsInsideSnackbarStack() {
  return useContext(SnackbarStackContext)
}
