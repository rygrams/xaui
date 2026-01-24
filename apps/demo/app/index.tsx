import { useXUIColors, useXUITheme } from '@xaui/mobile/core'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from '@xaui/mobile/indicator'
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
    >
      <ActivityIndicator variant="linear" size={2} showTrack themeColor="secondary" />
      <ActivityIndicator variant="circular" size={40} themeColor="danger" />
      <ActivityIndicator variant="linear" size={3} themeColor="danger" />
    </View>
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
