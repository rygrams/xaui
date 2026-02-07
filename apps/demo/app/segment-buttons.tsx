import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SegmentButton } from '@xaui/native/segment-button'
import { useXUIColors, useXUITheme } from '@xaui/native/core'

export default function SegmentButtonsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [delivery, setDelivery] = useState<string | string[]>('standard')
  const [filters, setFilters] = useState<string | string[]>(['new', 'popular'])

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Single Selection
        </Text>
        <SegmentButton
          selected={delivery}
          onSelectionChange={setDelivery}
          selectionMode="single"
          variant="outlined"
          themeColor="primary"
          fullWidth
        />
        <Text style={[styles.caption, { color: colors.foreground }]}>
          Selected: {String(delivery)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Multiple Selection
        </Text>
        <SegmentButton
          selected={filters}
          onSelectionChange={setFilters}
          selectionMode="multiple"
          variant="faded"
          themeColor="secondary"
          showCheckmark={false}
          fullWidth
        />
        <Text style={[styles.caption, { color: colors.foreground }]}>
          Selected: {Array.isArray(filters) ? filters.join(', ') : filters}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    width: '100%',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
  },
})
