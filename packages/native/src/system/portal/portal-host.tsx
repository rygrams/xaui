import { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { PortalContext } from './portal-context'
import { useStyleProps } from '../style-props'
import type { ViewStyleProps } from '../style-props'

/** R14 — it renders a view of its own, so it takes that view's style keys as props. */
export type PortalHostProps = ViewStyleProps & {
  children: ReactNode
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

/**
 * Where every `Portal` in the tree below renders. Mounted once, at the root of the app,
 * above navigation — an overlay that renders inside a screen is clipped by it.
 */
export function PortalHost({ children, ...props }: PortalHostProps) {
  const [styleProps] = useStyleProps(props)
  const [portals, setPortals] = useState<ReadonlyMap<string, ReactNode>>(new Map())
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const node = useRef<View | null>(null)

  // Re-read on every layout rather than once on mount: a rotation, a keyboard, or a
  // navigation header appearing all move this view without remounting it.
  const measure = useCallback((_event: LayoutChangeEvent) => {
    node.current?.measureInWindow((x, y) => {
      setOrigin(current => (current.x === x && current.y === y ? current : { x, y }))
    })
  }, [])

  // A new Map per change rather than a mutated ref with a forced re-render: the rendered
  // list is then derived from state the way React expects, and a portal added during a
  // commit cannot be read before the render that includes it.
  const addPortal = useCallback((key: string, element: ReactNode) => {
    setPortals(current => new Map(current).set(key, element))
  }, [])

  const removePortal = useCallback((key: string) => {
    setPortals(current => {
      if (!current.has(key)) return current
      const next = new Map(current)
      next.delete(key)
      return next
    })
  }, [])

  const methods = useMemo(
    () => ({ addPortal, removePortal, origin }),
    [addPortal, removePortal, origin]
  )

  return (
    <PortalContext.Provider value={methods}>
      <View ref={node} onLayout={measure} style={[styles.container, styleProps]}>
        {children}
        {Array.from(portals, ([key, element]) => (
          <Fragment key={key}>{element}</Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  )
}

PortalHost.displayName = 'XAUI.PortalHost'
