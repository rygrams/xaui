import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '@xaui/native/button'
import { Progress } from '@xaui/native/progress'
import { ActivityIndicator } from '@xaui/native/indicator'
import { Checkbox } from '@xaui/native/checkbox'
import { Select, SelectItem } from '@xaui/native/select'
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
      <Progress value={0.5} variant="circular" />
      <ActivityIndicator variant="linear" showTrack />
      <ActivityIndicator showTrack />
      {/* <Checkbox
        label="Accept Terms and Conditions"
        themeColor="secondary"
        variant="light"
        fullWidth
      /> */}
      <Select placeholder="Select an option" size="md" label="les pays d'Afrique">
        <SelectItem label="Mali" value="option1" />
        <SelectItem label="Burkina Faso" value="option2" />
        <SelectItem label="Guinea" value="option3" />
      </Select>
      <View
        style={{ gap: theme.spacing.xs, flexDirection: 'row', alignItems: 'flex-start' }}
      >
        <Select placeholder="Select an option" size="md" label="les pays d'Afrique">
          <SelectItem label="Mali" value="option1" />
          <SelectItem label="Burkina Faso" value="option2" />
          <SelectItem label="Guinea" value="option3" />
        </Select>
        <Button
          variant="solid"
          size="md"
          fullWidth
          spinnerPlacement="end"
          themeColor="primary"
          startContent={<Text>🚀</Text>}
        >
          Azure
        </Button>
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
