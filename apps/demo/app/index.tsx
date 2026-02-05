import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from '@xaui/native/button'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const router = useRouter()

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
      <Button
        size="lg"
        onPress={() => router.push('/alerts')}
        variant="outlined"
        themeColor="primary"
      >
        View Alert Examples
      </Button>
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
