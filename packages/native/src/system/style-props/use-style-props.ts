import { useMemo } from 'react'
import { stableHash } from '../../utils/stable-hash'
import { splitStyleProps } from '../../utils/style-props'
import type { RestPropsOf, StylePropsOf } from '../../utils/style-props'

/**
 * `splitStyleProps`, memoized on the values (R14). A component calls it on what is left
 * after destructuring its own props, applies the style half between the tint and its
 * `style`, and forwards the rest:
 *
 * ```tsx
 * const [styleProps, rest] = useStyleProps(props)
 * <Pressable style={[styles.root, tint, styleProps, style]} {...rest} />
 * ```
 *
 * The identity is stable while the values are, which is what a memoized child or an
 * animated style depends on. It is keyed on a hash rather than on the object, because the
 * object is a fresh rest-spread on every render and would never hit.
 */
export function useStyleProps<P extends object>(
  props: P
): [StylePropsOf<P>, RestPropsOf<P>] {
  const [styleProps, rest] = splitStyleProps(props)
  const key = stableHash(styleProps)

  return [useMemo(() => styleProps, [key]), rest]
}
