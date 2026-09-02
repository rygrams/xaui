import { createContext, useContext } from 'react'
import type { SegmentButtonVariant, ElevationLevel } from './segment-button.type'
import type { Size, ThemeColor } from '../../types'

export type SegmentButtonContextValue = {
  selectedKeys: string[]
  toggleItem: (key: string) => void
  themeColor: ThemeColor
  variant: SegmentButtonVariant
  size: Size
  elevation: ElevationLevel
  isDisabled: boolean
  showCheckmark: boolean
}

export const SegmentButtonContext = createContext<
  SegmentButtonContextValue | undefined
>(undefined)

export const useSegmentButtonContext = () => {
  const context = useContext(SegmentButtonContext)
  if (!context) {
    throw new Error(
      'SegmentButtonItem must be used within a SegmentButton component'
    )
  }
  return context
}
