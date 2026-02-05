import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { PortalContext } from './portal-context'
import type { ReactNode } from 'react'

let portalId = 0

export const Portal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const context = useContext(PortalContext)
  const keyRef = useRef(`portal-${++portalId}`)

  useLayoutEffect(() => {
    if (!context) return
    context.addPortal(keyRef.current, children)
  }, [children, context])

  useEffect(() => {
    if (!context) return

    const key = keyRef.current
    return () => {
      context.removePortal(key)
    }
  }, [context])

  return null
}
