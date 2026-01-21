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
      setValue(prevValue => prevValue + 0.01)
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
      <View
        style={{
          backgroundColor: colors.primary.background,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          gap: theme.spacing.md,
          width: '100%',
          height: 100,
        }}
      >
        <Text style={{ color: colors.foreground }}>{mode}</Text>
        <Text style={{ color: colors.foreground }}>{value}</Text>
      </View>
      <Progress
        themeColor="danger"
        value={value}
        size={6}
        borderRadius={theme.borderRadius.md}
      />
      <Progress themeColor="default" value={value} size={6} />
      <Progress themeColor="primary" value={value} size={6} />
      <Progress themeColor="secondary" value={value} size={6} />
      <Progress themeColor="success" value={value} size={6} />
      <Progress themeColor="tertiary" value={value} size={6} />

      <View
        style={{
          flexDirection: 'row',
          gap: theme.spacing.sm,
        }}
      >
        <Progress
          themeColor="danger"
          variant="circular"
          value={value}
          size={50}
          borderRadius={theme.borderRadius.md}
        />
        <Progress themeColor="default" variant="circular" value={value} size={50} />
        <Progress themeColor="primary" variant="circular" value={value} size={25} />
        <Progress themeColor="secondary" variant="circular" value={value} size={50} />
        <Progress themeColor="success" variant="circular" value={value} size={50} />
        <Progress themeColor="tertiary" variant="circular" value={value} size={50} />
      </View>
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
