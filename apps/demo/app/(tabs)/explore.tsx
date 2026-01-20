import { StyleSheet, ScrollView } from 'react-native'

export default function ExploreScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    ></ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  swatch: {
    padding: 14,
    borderRadius: 10,
    gap: 4,
  },
  swatchTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  swatchValue: {
    fontSize: 12,
    letterSpacing: 1,
  },
  surface: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  surfaceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
  },
  captionText: {
    fontSize: 12,
  },
})
