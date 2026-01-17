import { ScrollView, StyleSheet, View } from 'react-native'
import { CircularActivityIndicator } from '@xaui/progress'

import { ThemedText } from '@/components/themed-text'
import { useThemeColor } from '@/hooks/use-theme-color'

export default function ProgressDemoScreen() {
  const cardBackground = useThemeColor(
    { light: '#F6F7FB', dark: '#1D2126' },
    'background'
  )
  const cardBorder = useThemeColor({ light: '#E2E6EA', dark: '#2B3138' }, 'background')
  const descriptionText = useThemeColor({ light: '#374151', dark: '#9AA3AD' }, 'text')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="title">Progress</ThemedText>
      <ThemedText style={[styles.description, { color: descriptionText }]}>
        Activity indicators in different styles and sizes.
      </ThemedText>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Variants</ThemedText>
        <View style={styles.row}>
          <CircularActivityIndicator variant="spinner" themeColor="primary" />
          <CircularActivityIndicator variant="ticks" themeColor="success" />
          <CircularActivityIndicator variant="bullets" themeColor="warning" />
        </View>
      </View>

      <View
        style={[styles.section, { backgroundColor: cardBackground, borderColor: cardBorder }]}
      >
        <ThemedText type="subtitle">Sizes</ThemedText>
        <View style={styles.row}>
          <CircularActivityIndicator variant="spinner" size={24} themeColor="secondary" />
          <CircularActivityIndicator variant="spinner" size={40} themeColor="secondary" />
          <CircularActivityIndicator variant="spinner" size={56} themeColor="secondary" />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
  },
})
