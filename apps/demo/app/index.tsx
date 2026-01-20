import { useColorMode, useXUIColors, useXUITheme } from '@xaui/core/theme'
import { StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const mode = useColorMode()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={{
          backgroundColor: colors.primary.background,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          width: 100,
          height: 100,
        }}
      >
        <Text style={{ color: colors.primary.foreground }}>{mode}</Text>
        <Text style={{ color: colors.primary.foreground }}>{mode}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
