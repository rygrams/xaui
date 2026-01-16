import { View, Text, StyleSheet } from 'react-native'
import { CircularActivityIndicator } from '@xaui/progress'
import { colors } from '@xaui/colors'

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Indicators</Text>

      <CircularActivityIndicator variant="spinner" themeColor="primary" />
      <CircularActivityIndicator variant="ticks" themeColor="secondary" />
      <CircularActivityIndicator variant="bullets" themeColor="tertiary" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.slate[950],
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.slate[900],
    borderRadius: 12,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  note: {
    fontSize: 12,
    color: colors.slate[400],
  },
})
