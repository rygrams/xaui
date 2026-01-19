import { Text, StyleSheet, ScrollView } from 'react-native'
import { colors } from '@xaui/colors'
import { Button } from '@xaui/button'

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Components</Text>
      <Button enableRipple variant="solid" themeColor="primary">
        Button
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.slate[950],
  },
  container: {
    padding: 20,
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
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
  },
})
