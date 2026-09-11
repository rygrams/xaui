import { useMemo } from 'react'
import { stableHash } from '../../utils/stable-hash'
import { splitStyleProps } from './style-props'
import type { RestPropsOf, StylePropsOf } from './style-props'

export function useStyleProps<Props extends object>(
  props: Props
): [StylePropsOf<Props>, RestPropsOf<Props>] {
  const [styleProps, rest] = splitStyleProps(props)
  const key = stableHash(styleProps)

  return [useMemo(() => styleProps, [key]), rest]
}
