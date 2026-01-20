import { useColorMode, useXUIColors, useXUITheme } from '@xaui/core/theme'
import { StyleSheet, Text, View } from 'react-native'
import { Progress } from '@xaui/mobile/progress'
import { useState, useEffect } from 'react'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const mode = useColorMode()

  const [value, setValue] = useState(0.1)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => prevValue + 0.05)
    }, 100)
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
      <View
        style={{
          backgroundColor: colors.primary.background,
          borderRadius: theme.borderRadius.md,
          gap: theme.spacing.md,
          width: 300,
          height: 100,
        }}
      >
        <Text style={{ color: colors.foreground }}>{mode}</Text>
        <Text style={{ color: colors.foreground }}>{value}</Text>
      </View>
      <Progress value={value} size={6} />
      <Progress variant="circular" value={value} size={50} />
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
