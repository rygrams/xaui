import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '@xaui/native/button'
import { Progress } from '@xaui/native/progress'
import { ActivityIndicator } from '@xaui/native/indicator'
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
      <Button
        variant="solid"
        size="xs"
        spinnerPlacement="end"
        themeColor="primary"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
      </Button>
      <Button
        variant="solid"
        size="sm"
        spinnerPlacement="end"
        isLoading
        themeColor="secondary"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
      </Button>
      <Button
        variant="solid"
        size="md"
        spinnerPlacement="end"
        isLoading
        themeColor="success"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
      </Button>
      <Button
        variant="solid"
        size="lg"
        spinnerPlacement="end"
        themeColor="warning"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
      </Button>
      <Progress value={0.5} />
      <Progress value={0.5} variant="circular" />
      <ActivityIndicator variant="linear" showTrack />
      <ActivityIndicator showTrack />
      <Checkbox label="Accept Terms and Conditions" themeColor="primary" />
      <Checkbox
        label="Accept Terms and Conditions"
        themeColor="secondary"
        variant="light"
        labelAlignment="justify-right"
      />
      <Checkbox
        fullWidth
        label="Accept Terms and Conditions"
        labelAlignment="justify-left"
        themeColor="success"
      />
      <Checkbox label="Accept Terms and Conditions" themeColor="warning" />
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
