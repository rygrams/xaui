import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Switch } from '@xaui/switches'

export default function SwitchesDemoScreen() {
  const [insideEnabled, setInsideEnabled] = useState(true)
  const [overlapEnabled, setOverlapEnabled] = useState(false)
  const [quietMode, setQuietMode] = useState(true)
  const [sizeStates, setSizeStates] = useState({
    sm: true,
    md: false,
    lg: true,
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Switches</Text>
      <Text style={styles.description}>
        Toggle quick settings with inside or overlap styles.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variants</Text>
        <View style={styles.column}>
          <Switch
            label="Inside (default)"
            isSelected={insideEnabled}
            onValueChange={setInsideEnabled}
            themeColor="primary"
          />
          <Switch
            label="Overlap"
            variant="overlap"
            isSelected={overlapEnabled}
            onValueChange={setOverlapEnabled}
            themeColor="secondary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Label Alignment</Text>
        <View style={styles.column}>
          <Switch
            label="Quiet mode"
            labelAlignment="left"
            isSelected={quietMode}
            onValueChange={setQuietMode}
          />
          <Switch
            label="Justified right"
            labelAlignment="justify-right"
            fullWidth
            isSelected={!quietMode}
            onValueChange={(value) => setQuietMode(!value)}
            themeColor="success"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes</Text>
        <View style={styles.column}>
          <Switch
            label="Small"
            size="sm"
            isSelected={sizeStates.sm}
            onValueChange={(value) =>
              setSizeStates((prev) => ({ ...prev, sm: value }))
            }
            themeColor="primary"
          />
          <Switch
            label="Medium"
            size="md"
            isSelected={sizeStates.md}
            onValueChange={(value) =>
              setSizeStates((prev) => ({ ...prev, md: value }))
            }
            themeColor="secondary"
          />
          <Switch
            label="Large"
            size="lg"
            isSelected={sizeStates.lg}
            onValueChange={(value) =>
              setSizeStates((prev) => ({ ...prev, lg: value }))
            }
            themeColor="danger"
          />
          <Switch label="Disabled" isSelected={false} isDisabled />
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
  column: {
    gap: 12,
  },
})
