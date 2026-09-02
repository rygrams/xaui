export const DEFAULT_CHART_BACKGROUND = '#6a6a6a30'

export const resolveElevationStyles = (elevation: number) => {
  if (elevation <= 0) {
    return {
      shadowOpacity: 0,
      elevation: 0,
    }
  }

  return {
    shadowColor: '#000000',
    shadowOpacity: Math.min(0.18 + elevation * 0.04, 0.34),
    shadowOffset: {
      width: 0,
      height: elevation * 2,
    },
    shadowRadius: 6 + elevation * 2,
    elevation,
  }
}

export const formatAxisValue = (value: number) => {
  if (Number.isInteger(value)) {
    return `${value}`
  }

  return value.toFixed(1)
}

export const abbreviateLabel = (label: string, length: number) => {
  const compact = label.trim()
  if (compact.length <= length) {
    return compact
  }

  return `${compact.slice(0, length)}.`
}

export const isLegendHorizontal = (position: 'top' | 'left' | 'right' | 'bottom') =>
  position === 'left' || position === 'right'
