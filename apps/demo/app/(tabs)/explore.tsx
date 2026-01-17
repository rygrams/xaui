import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { CircularActivityIndicator } from '@xaui/progress'
import { colors } from '@xaui/colors'
import { Button } from '@xaui/buttons'

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Button Components</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Variants</Text>
        <Button themeColor="primary" variant="solid" onPress={() => {}}>
          Solid
        </Button>
        <Button themeColor="primary" variant="outlined" onPress={() => {}}>
          Outlined
        </Button>
        <Button themeColor="primary" variant="flat" onPress={() => {}}>
          Flat
        </Button>
        <Button themeColor="primary" variant="light" onPress={() => {}}>
          Light
        </Button>
        <Button themeColor="primary" variant="elevated" onPress={() => {}}>
          Elevated
        </Button>
        <Button themeColor="primary" variant="faded" onPress={() => {}}>
          Faded
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Colors</Text>
        <Button themeColor="primary" onPress={() => {}}>
          Primary
        </Button>
        <Button themeColor="secondary" onPress={() => {}}>
          Secondary
        </Button>
        <Button themeColor="success" onPress={() => {}}>
          Success
        </Button>
        <Button themeColor="warning" onPress={() => {}}>
          Warning
        </Button>
        <Button themeColor="danger" onPress={() => {}}>
          Danger
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sizes</Text>
        <Button themeColor="primary" size="xs" onPress={() => {}}>
          Extra Small
        </Button>
        <Button themeColor="primary" size="sm" onPress={() => {}}>
          Small
        </Button>
        <Button themeColor="primary" size="md" onPress={() => {}}>
          Medium
        </Button>
        <Button themeColor="primary" size="lg" onPress={() => {}}>
          Large
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Loading States</Text>
        <Button
          themeColor="primary"
          isLoading
          spinnerPlacement="start"
          onPress={() => {}}
        >
          Loading Start
        </Button>
        <Button themeColor="primary" isLoading spinnerPlacement="end" onPress={() => {}}>
          Loading End
        </Button>
        <Button
          themeColor="secondary"
          variant="outlined"
          isLoading
          spinnerType="bullets"
          onPress={() => {}}
        >
          Dots Spinner
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>States</Text>
        <Button themeColor="primary" isDisabled onPress={() => {}}>
          Disabled
        </Button>
        <Button themeColor="primary" fullWidth onPress={() => {}}>
          Full Width
        </Button>
      </View>

      <Text style={[styles.title, { marginTop: 32 }]}>Progress Indicators</Text>
      <View style={styles.section}>
        <CircularActivityIndicator variant="spinner" themeColor="primary" />
        <CircularActivityIndicator variant="ticks" themeColor="secondary" />
        <CircularActivityIndicator variant="bullets" themeColor="tertiary" />
      </View>
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
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
