import { useMemo } from 'react'
import type { RoundedViewProps } from './rounded-view.type'

type BorderRadiusStyle = {
  borderTopLeftRadius: number
  borderTopRightRadius: number
  borderBottomLeftRadius: number
  borderBottomRightRadius: number
}

export const useRoundedViewStyle = (
  props: Pick<
    RoundedViewProps,
    'all' | 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  >
): BorderRadiusStyle => {
  const { all = 0, top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight } = props

  return useMemo(() => {
    return {
      borderTopLeftRadius: topLeft ?? top ?? left ?? all,
      borderTopRightRadius: topRight ?? top ?? right ?? all,
      borderBottomLeftRadius: bottomLeft ?? bottom ?? left ?? all,
      borderBottomRightRadius: bottomRight ?? bottom ?? right ?? all,
    }
  }, [all, top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight])
}
