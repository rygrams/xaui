import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '@xaui/native/button'
import { Checkbox } from '@xaui/native/checkbox'
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
      <Checkbox
        label="Demo Checkbox"
        variant="filled"
        themeColor="primary"
        labelAlignment="justify-left"
        fullWidth
      />
      <Checkbox
        label="Demo Checkbox"
        variant="light"
        themeColor="danger"
        labelAlignment="justify-left"
        fullWidth
      />
      <Button onPress={() => {}} themeColor="primary" variant="solid">
        Demo Button
      </Button>
      <Text style={{ color: colors.foreground }}>Hello, XUI!</Text>
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
