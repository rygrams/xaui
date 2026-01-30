import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { GridBuilder, MasonryGridBuilder } from '@xaui/native/view'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [masonryItems, setMasonryItems] = useState(() =>
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
    <MasonryGridBuilder
      data={masonryItems}
      columns={2}
      rowSpacing={theme.spacing.xs}
      columnSpacing={theme.spacing.xs}
      onEndReached={() => {
        setMasonryItems(prev => [
          ...prev,
          ...Array.from({ length: 10 }, (_, index) => prev.length + index),
        ])
      }}
      header={
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary.main }]}>
            GridBuilder (Flutter-style)
          </Text>
          <GridBuilder
            itemCount={12}
            columns={3}
            spacing={theme.spacing.xs}
            scrollEnabled={false}
            itemBuilder={({ index }) => (
              <View
                style={[
                  styles.tile,
                  {
                    backgroundColor: palette[index % palette.length],
                    height: 64,
                  },
                ]}
              />
            )}
          />
          <Text style={[styles.title, { color: colors.primary.main }]}>
            MasonryGridBuilder (infinite)
          </Text>
        </View>
      }
      scrollViewProps={{
        contentContainerStyle: [
          styles.container,
          { backgroundColor: colors.background, gap: theme.spacing.md },
        ],
      }}
      renderItem={({ index }) => (
        <View
          style={{
            width: '100%',
            height: 120 + (index % 5) * 30,
            backgroundColor: palette[index % palette.length],
          }}
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
  header: {
    width: '100%',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  tile: {
    width: '100%',
    borderRadius: 8,
  },
})
