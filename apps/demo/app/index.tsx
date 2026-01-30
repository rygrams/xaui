import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View } from 'react-native'
import { useState, useEffect } from 'react'
import { Select, SelectItem } from '@xaui/native/select'
import { Switch } from '@xaui/native/switch'
import { Button } from '@xaui/native/button'

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
      <Select
        placeholder="Select an option"
        size="lg"
        onSelectionChange={keys => console.log(keys)}
        fullWidth
        selectionMode="multiple"
        labelPlacement="outside-top"
        label="Select an option"
        variant="faded"
        themeColor="primary"
      >
        <SelectItem key="option-1" value="option-1" label="Option 1" />
        <SelectItem key="option-2" value="option-2" label="Option 2" />
        <SelectItem key="option-3" value="option-3" label="Option 3" />
      </Select>
      <Button size="lg" onPress={() => console.log('pressed')} variant="solid">
        Press me
      </Button>
      <Switch />
      <Switch label="Switch" />
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
