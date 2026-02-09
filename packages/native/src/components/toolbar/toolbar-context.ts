import { createContext, useContext } from 'react'

type ToolbarContextValue = {
  actionColor: string
  actionPressedColor: string
  iconSize: number
  actionButtonSize: number
}

export const ToolbarContext = createContext<ToolbarContextValue | null>(null)

export const useToolbarContext = () => {
  return useContext(ToolbarContext)
}
