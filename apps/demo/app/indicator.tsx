import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { ActivityIndicator } from '@xaui/native/indicator'

export default function IndicatorScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Circular Cases</Text>
        <View style={styles.row}>
          <View style={styles.itemCenter}>
            <ActivityIndicator variant="circular" size={24} />
            <Text style={[styles.label, { color: colors.foreground }]}>Small</Text>
          </View>
          <View style={styles.itemCenter}>
            <ActivityIndicator variant="circular" size={40} themeColor="secondary" />
            <Text style={[styles.label, { color: colors.foreground }]}>Medium</Text>
          </View>
          <View style={styles.itemCenter}>
            <ActivityIndicator variant="circular" size={56} themeColor="success" />
            <Text style={[styles.label, { color: colors.foreground }]}>Large</Text>
          </View>
          <View style={styles.itemCenter}>
            <ActivityIndicator variant="circular" size={56} themeColor="warning" disableAnimation />
            <Text style={[styles.label, { color: colors.foreground }]}>No Animation</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Linear Cases</Text>
        <View style={{ gap: theme.spacing.md }}>
          <ActivityIndicator variant="linear" size={4} themeColor="primary" />
          <ActivityIndicator variant="linear" size={8} themeColor="secondary" showTrack />
          <ActivityIndicator variant="linear" size={10} themeColor="success" borderRadius={999} showTrack />
          <ActivityIndicator variant="linear" size={10} themeColor="danger" disableAnimation showTrack />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Custom Colors</Text>
        <View style={{ gap: theme.spacing.md }}>
          <ActivityIndicator variant="linear" size={8} color="#0ea5e9" backgroundColor="#bae6fd" showTrack />
          <ActivityIndicator
            variant="circular"
            size={52}
            color="#f97316"
            backgroundColor="#fed7aa"
            showTrack
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  itemCenter: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
  },
})
