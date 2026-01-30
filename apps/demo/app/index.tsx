import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import { Grid, GridItem } from '@xaui/native/view'
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
      <Grid columns={3} rowSpacing={theme.spacing.xs} columnSpacing={theme.spacing.xs}>
        <GridItem>
          <Button variant="faded" size="lg">
            Button
          </Button>
        </GridItem>
        <GridItem>
          <View
            style={{
              width: '100%',
              height: 100,
              backgroundColor: theme.colors.secondary.background,
            }}
          />
        </GridItem>
        <GridItem>
          <View
            style={{
              width: '100%',
              height: 100,
              backgroundColor: theme.colors.tertiary.background,
            }}
          />
        </GridItem>

        <GridItem span={2}>
          <View
            style={{
              width: '100%',
              height: 100,
              backgroundColor: theme.colors.danger.background,
            }}
          />
        </GridItem>
        <GridItem>
          <View
            style={{
              width: '100%',
              height: 100,
              backgroundColor: theme.colors.warning.background,
            }}
          />
        </GridItem>
      </Grid>
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
