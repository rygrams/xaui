import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { Size } from '../../types'

export const useIconButtonSizeStyles = (size: Size) => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizeMap = {
      xs: { width: theme.componentSizes.xs, height: theme.componentSizes.xs },
      sm: { width: theme.componentSizes.sm, height: theme.componentSizes.sm },
      md: { width: theme.componentSizes.md, height: theme.componentSizes.md },
      lg: { width: theme.componentSizes.lg, height: theme.componentSizes.md },
    }
    return sizeMap[size]
  }, [size, theme])
}
