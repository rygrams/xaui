import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, Text } from 'react-native'
import { useState } from 'react'
import { GridBuilder } from '@xaui/native/view'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [gridItems, setGridItems] = useState(() =>
    Array.from({ length: 20 }, (_, index) => index)
  )

  const palette = [
    theme.colors.primary.main,
    theme.colors.secondary.main,
    theme.colors.tertiary.background,
    theme.colors.success.background,
    theme.colors.warning.background,
  ]

  return (
    <GridBuilder
      data={gridItems}
      columns={3}
      spacing={theme.spacing.xs}
      onEndReached={() => {
        console.log('End reached, loading more items...')
      }}
      header={
        <View style={{ height: 100 }}>
          <Text
            style={{
              color: colors.primary.main,
              fontSize: 24,
              textAlign: 'center',
              lineHeight: 100,
            }}
          >
            Grid Header
          </Text>
        </View>
      }
      footer={
        <View style={{ height: 100 }}>
          <Text
            style={{
              color: colors.primary.main,
              fontSize: 24,
              textAlign: 'center',
              lineHeight: 100,
            }}
          >
            Grid footer
          </Text>
        </View>
      }
      style={styles.container}
      onEndReachedThreshold={0.4}
      renderItem={({ index }) => (
        <View
          style={[
            styles.tile,
            {
              backgroundColor: palette[index % palette.length],
              height: 100,
            },
          ]}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 16,
  },
  tile: {
    width: '100%',
    borderRadius: 8,
  },
})
