import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [, setValue] = useState(0.1)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => prevValue + 0.06)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          gap: theme.spacing.md,
        },
      ]}
    ></View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
})
