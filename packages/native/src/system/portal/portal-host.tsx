import { Fragment, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
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
    () => ({ addPortal, removePortal }),
    [addPortal, removePortal]
  )

  return (
    <PortalContext.Provider value={methods}>
      <View style={[styles.container, styleProps]}>
        {children}
        {Array.from(portals, ([key, element]) => (
          <Fragment key={key}>{element}</Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  )
}

PortalHost.displayName = 'XAUI.PortalHost'
