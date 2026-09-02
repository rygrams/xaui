import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { PortalContext } from './portal-context'
import type { ReactNode } from 'react'

const hostStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const PortalHost: React.FC<{ children: ReactNode }> = ({ children }) => {
  const portals = useRef(new Map<string, ReactNode>())
  const [, forceUpdate] = useState(0)

  const addPortal = useCallback((key: string, element: ReactNode) => {
    portals.current.set(key, element)
    forceUpdate(n => n + 1)
  }, [])

  const removePortal = useCallback((key: string) => {
    portals.current.delete(key)
    forceUpdate(n => n + 1)
  }, [])

  const contextValue = useMemo(
    () => ({ addPortal, removePortal }),
    [addPortal, removePortal]
  )

  return (
    <PortalContext.Provider value={contextValue}>
      <View style={hostStyles.container}>
        {children}
        {Array.from(portals.current.entries()).map(([key, element]) => (
          <React.Fragment key={key}>{element}</React.Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  )
}
