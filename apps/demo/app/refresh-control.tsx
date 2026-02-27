import { PullToRefresh } from '@xaui/native/refresh-control'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { useCallback, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function RefreshControlScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [refreshing, setRefreshing] = useState(false)
  const [seed, setSeed] = useState(1)

  const items = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => ({
      id: `${seed}-${index + 1}`,
      title: `Item ${index + 1}`,
    }))
  }, [seed])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 900))
    setSeed(value => value + 1)
    setRefreshing(false)
  }, [])

  return (
    <PullToRefresh
      refreshing={refreshing}
      onRefresh={handleRefresh}
      title="Updating..."
      themeColor="primary"
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.content, { gap: theme.spacing.sm }]}
      >
        <Text style={[styles.header, { color: colors.foreground }]}>
          Pull to refresh
        </Text>
        {items.map(item => (
          <View
            key={item.id}
            style={[
              styles.item,
              {
                backgroundColor: theme.colors.default.container,
              },
            ]}
          >
            <Text style={{ color: colors.foreground }}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </PullToRefresh>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  item: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
})
