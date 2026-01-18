import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Checkbox } from '@xaui/checkboxes'

export default function CheckboxesDemoScreen() {
  const [checked, setChecked] = useState({
    marketing: true,
    updates: false,
    terms: false,
  })
  const [alignmentChecked, setAlignmentChecked] = useState(true)
  const [variantChecked, setVariantChecked] = useState(true)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkboxes</Text>
      <Text style={styles.description}>
        Pick multiple options and align labels as needed.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selections</Text>
        <View style={styles.column}>
          <Checkbox
            label="Product updates"
            isChecked={checked.updates}
            onValueChange={(value) => setChecked({ ...checked, updates: value })}
          />
          <Checkbox
            label="Marketing emails"
            isChecked={checked.marketing}
            onValueChange={(value) => setChecked({ ...checked, marketing: value })}
            themeColor="success"
          />
          <Checkbox
            label="Agree to terms"
            isChecked={checked.terms}
            onValueChange={(value) => setChecked({ ...checked, terms: value })}
            themeColor="danger"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alignment</Text>
        <View style={styles.column}>
          <Checkbox
            label="Label on the left"
            labelAlignment="left"
            isChecked={alignmentChecked}
            onValueChange={setAlignmentChecked}
          />
          <Checkbox
            label="Justified right"
            labelAlignment="justify-right"
            fullWidth
            isChecked={!alignmentChecked}
            onValueChange={(value) => setAlignmentChecked(!value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variants</Text>
        <View style={styles.column}>
          <Checkbox
            label="Filled (primary)"
            variant="filled"
            themeColor="primary"
            isChecked={variantChecked}
            onValueChange={setVariantChecked}
          />
          <Checkbox
            label="Light (warning)"
            variant="light"
            themeColor="warning"
            isChecked={!variantChecked}
            onValueChange={(value) => setVariantChecked(!value)}
          />
          <Checkbox label="Disabled" isChecked={false} isDisabled />
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
