import { useMemo } from 'react'
import { useXUITheme } from '../../core'
import type { Size, Radius } from '../../types'

type MenuBoxItemSizeStyles = {
  paddingVertical: number
  paddingHorizontal: number
  titleSize: number
  descriptionSize: number
}

type MenuBoxRadiusStyles = {
  borderTopLeftRadius: number
  borderTopRightRadius: number
  borderBottomLeftRadius: number
  borderBottomRightRadius: number
}

export const useMenuBoxItemSizeStyles = (size: Size): MenuBoxItemSizeStyles => {
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

export const useMenuBoxRadiusStyles = (
  radius: Radius,
  isFirst: boolean,
  isLast: boolean
): MenuBoxRadiusStyles => {
  const theme = useXUITheme()

  return useMemo(() => {
    const radiusMap = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.md,
      md: theme.borderRadius.lg,
      lg: theme.borderRadius.xl,
      full: theme.borderRadius.full,
    }

    const r = radiusMap[radius]

    return {
      borderTopLeftRadius: isFirst ? r : 0,
      borderTopRightRadius: isFirst ? r : 0,
      borderBottomLeftRadius: isLast ? r : 0,
      borderBottomRightRadius: isLast ? r : 0,
    }
  }, [radius, isFirst, isLast, theme])
}
