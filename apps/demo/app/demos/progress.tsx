import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { CircularActivityIndicator } from '@xaui/progress'

export default function ProgressDemoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.description}>
        Activity indicators in different styles and sizes.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variants</Text>
        <View style={styles.row}>
          <CircularActivityIndicator variant="spinner" themeColor="primary" />
          <CircularActivityIndicator variant="ticks" themeColor="success" />
          <CircularActivityIndicator variant="bullets" themeColor="warning" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes</Text>
        <View style={styles.row}>
          <CircularActivityIndicator variant="spinner" size={24} themeColor="secondary" />
          <CircularActivityIndicator variant="spinner" size={40} themeColor="secondary" />
          <CircularActivityIndicator variant="spinner" size={56} themeColor="secondary" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Overrides</Text>
        <View style={styles.row}>
          <CircularActivityIndicator variant="spinner" color="#111827" />
          <CircularActivityIndicator variant="ticks" color="#2563EB" />
          <CircularActivityIndicator variant="bullets" color="#DC2626" />
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B5563',
  },
  section: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    backgroundColor: '#F6F7FB',
    borderColor: '#E2E6EA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
  },
})
