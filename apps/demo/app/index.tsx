import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '@xaui/native/button'
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
      <View style={{ flexDirection: 'row', gap: theme.spacing.xs }}>
        <Button
          variant="solid"
          size="md"
          spinnerPlacement="end"
          themeColor="tertiary"
          startContent={<Text>🚀</Text>}
        >
          Azure limpide
        </Button>
        <Button
          variant="elevated"
          size="md"
          spinnerPlacement="end"
          themeColor="default"
          startContent={<Text>🚀</Text>}
        >
          Azure limpide
        </Button>
      </View>

      <Button
        variant="outlined"
        size="md"
        spinnerPlacement="end"
        themeColor="primary"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
      </Button>
      <Button
        variant="flat"
        size="md"
        spinnerPlacement="end"
        themeColor="primary"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
      </Button>
      <Button
        variant="faded"
        size="md"
        spinnerPlacement="end"
        themeColor="primary"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
      </Button>
      <Button
        variant="light"
        size="md"
        spinnerPlacement="end"
        themeColor="primary"
        startContent={<Text>🚀</Text>}
        fullWidth
      >
        Azure limpide
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
