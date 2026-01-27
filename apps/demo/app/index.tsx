import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '@xaui/native/button'
import { Progress } from '@xaui/native/progress'
import { ActivityIndicator } from '@xaui/native/indicator'
import { Select, SelectItem } from '@xaui/native/select'
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
      <Progress value={0.5} variant="circular" />
      <ActivityIndicator variant="linear" showTrack />
      <ActivityIndicator showTrack />
      {/* <Checkbox
        label="Accept Terms and Conditions"
        themeColor="secondary"
        variant="light"
        fullWidth
      /> */}
      <Select
        fullWidth
        placeholder="Select an option"
        size="md"
        label="les pays d'Afrique"
      >
        <SelectItem label="Mali" value="option1" />
        <SelectItem label="Burkina Faso" value="option2" />
        <SelectItem label="Guinea" value="option3" />
      </Select>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: theme.spacing.xs,
        }}
      >
        <Select
          placeholder="Select"
          size="md"
          label="les pays d'Afrique"
          labelPlacement="outside"
          fullWidth
        >
          <SelectItem label="Mali" value="option1" />
          <SelectItem label="Burkina Faso" value="option2" />
          <SelectItem label="Guinea" value="option3" />
        </Select>
        <Button
          fullWidth
          variant="solid"
          size="md"
          spinnerPlacement="end"
          themeColor="primary"
        >
          Azure
        </Button>
      </View>
      <Checkbox
        labelAlignment="justify-left"
        label="Accept Terms and Conditions"
        themeColor="secondary"
        fullWidth
      />
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
