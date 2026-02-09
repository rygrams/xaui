import { useMemo } from 'react'
import { useXUITheme } from '../../core'

const resolveShadowStyle = (elevation: number, shadows: ReturnType<typeof useXUITheme>['shadows']) => {
  if (elevation <= 1) {
    return shadows.sm
  }

  if (elevation <= 2) {
    return shadows.md
  }

  if (elevation <= 3) {
    return shadows.lg
  }

  return shadows.xl
}

export const useAppBarElevationStyles = (elevation: number = 0) => {
  const theme = useXUITheme()

  return useMemo(() => {
    if (elevation <= 0) {
      return {}
    }

    return {
      ...resolveShadowStyle(elevation, theme.shadows),
      elevation,
    }
  }, [elevation, theme.shadows])
}
