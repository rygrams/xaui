import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { Size } from '../../types'

export const useIconButtonSizeStyles = (size: Size) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizeMap = {
      xs: { width: 34, height: 34 },
      sm: { width: 38, height: 38 },
      md: { width: 42, height: 42 },
      lg: { width: 50, height: 50 },
    }
    return sizeMap[size]
  }, [size, theme])
}
