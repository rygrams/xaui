import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { Size } from '../../types'

type ListItemSizeStyles = {
  paddingVertical: number
  paddingHorizontal: number
  titleSize: number
  descriptionSize: number
}

export const useListItemSizeStyles = (size: Size): ListItemSizeStyles => {
  const theme = useXUITheme()

  return useMemo(() => {
    const sizes = {
      xs: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        titleSize: theme.fontSizes.xs,
        descriptionSize: theme.fontSizes.xs,
      },
      sm: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        titleSize: theme.fontSizes.sm,
        descriptionSize: theme.fontSizes.xs,
      },
      md: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        titleSize: theme.fontSizes.md,
        descriptionSize: theme.fontSizes.sm,
      },
      lg: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        titleSize: theme.fontSizes.lg,
        descriptionSize: theme.fontSizes.md,
      },
    }

    return sizes[size]
  }, [size, theme])
}
