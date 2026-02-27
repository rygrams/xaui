import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { NumberInput } from '@xaui/native/input'

const variants = ['colored', 'light', 'bordered', 'underlined'] as const
const themeColors = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'success',
  'warning',
  'danger',
] as const

export default function NumberInputScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [basic, setBasic] = useState<number | undefined>(0)
  const [minMax, setMinMax] = useState<number | undefined>(50)
  const [stepped, setStepped] = useState<number | undefined>(0)
  const [currency, setCurrency] = useState<number | undefined>(99.99)
  const [percent, setPercent] = useState<number | undefined>(0.25)
  const [hidden, setHidden] = useState<number | undefined>(10)
  const [validNum, setValidNum] = useState<number | undefined>(undefined)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic
        </Text>
        <NumberInput
          label="Quantity"
          value={basic}
          onValueChange={setBasic}
          description="Default step of 1"
          variant="bordered"
          themeColor="primary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Min / Max
        </Text>
        <NumberInput
          label="Value (0 - 100)"
          value={minMax}
          onValueChange={setMinMax}
          minValue={0}
          maxValue={100}
          description="Clamped between 0 and 100"
          variant="bordered"
          themeColor="secondary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Step
        </Text>
        <NumberInput
          label="Step by 5"
          value={stepped}
          onValueChange={setStepped}
          step={5}
          description="Increments/decrements by 5"
          variant="bordered"
          themeColor="tertiary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Currency Formatting
        </Text>
        <NumberInput
          label="Price"
          value={currency}
          onValueChange={setCurrency}
          formatOptions={{ style: 'currency', currency: 'USD' }}
          step={0.01}
          minValue={0}
          description="Formatted as USD"
          variant="bordered"
          themeColor="success"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Percentage
        </Text>
        <NumberInput
          label="Discount"
          value={percent}
          onValueChange={setPercent}
          formatOptions={{ style: 'percent' }}
          step={0.05}
          minValue={0}
          maxValue={1}
          description="Formatted as percentage"
          variant="bordered"
          themeColor="warning"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Hidden Stepper
        </Text>
        <NumberInput
          label="Amount"
          value={hidden}
          onValueChange={setHidden}
          hideStepper
          description="Stepper buttons hidden"
          variant="bordered"
          themeColor="primary"
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Per Variant
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {variants.map(variant => (
            <NumberInput
              key={variant}
              label={variant}
              defaultValue={0}
              variant={variant}
              themeColor="primary"
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Per Color
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          {themeColors.map(themeColor => (
            <NumberInput
              key={themeColor}
              label={themeColor}
              defaultValue={0}
              themeColor={themeColor}
              variant="light"
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Validation
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <NumberInput
            label="Required"
            value={validNum}
            onValueChange={setValidNum}
            isInvalid={validNum === undefined}
            errorMessage="Value is required"
            variant="bordered"
            themeColor="danger"
          />
          <NumberInput
            label="Disabled"
            defaultValue={42}
            isDisabled
            variant="colored"
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
})
