import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { DatePicker } from '@xaui/native/datepicker'

export default function DatePickerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [controlledDate, setControlledDate] = useState<Date | null>(null)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Default"
            themeColor="default"
            placeholder="Pick a date"
          />
          <DatePicker
            label="Primary"
            themeColor="primary"
            placeholder="Pick a date"
          />
          <DatePicker
            label="Success"
            themeColor="success"
            placeholder="Pick a date"
          />
          <DatePicker
            label="Warning"
            themeColor="warning"
            placeholder="Pick a date"
          />
          <DatePicker
            label="Danger"
            themeColor="danger"
            placeholder="Pick a date"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Outlined"
            variant="outlined"
            themeColor="primary"
          />
          <DatePicker
            label="Flat"
            variant="flat"
            themeColor="primary"
          />
          <DatePicker
            label="Light"
            variant="light"
            themeColor="primary"
          />
          <DatePicker
            label="Faded"
            variant="faded"
            themeColor="primary"
          />
          <DatePicker
            label="Underlined"
            variant="underlined"
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker label="Extra Small" size="xs" themeColor="primary" />
          <DatePicker label="Small" size="sm" themeColor="primary" />
          <DatePicker label="Medium" size="md" themeColor="primary" />
          <DatePicker label="Large" size="lg" themeColor="primary" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Radius
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker label="None" radius="none" themeColor="primary" />
          <DatePicker label="Small" radius="sm" themeColor="primary" />
          <DatePicker label="Medium" radius="md" themeColor="primary" />
          <DatePicker label="Large" radius="lg" themeColor="primary" />
          <DatePicker label="Full" radius="full" themeColor="primary" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Controlled Value
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Controlled DatePicker"
            themeColor="primary"
            value={controlledDate}
            onChange={setControlledDate}
          />
          <Text style={{ color: colors.foreground }}>
            Selected: {controlledDate ? controlledDate.toLocaleDateString() : 'None'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Min / Max Date
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Limited Range"
            themeColor="primary"
            minDate={new Date(2024, 0, 1)}
            maxDate={new Date(2025, 11, 31)}
            description="Between Jan 2024 and Dec 2025"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Locale
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="English (default)"
            themeColor="primary"
            locale="en"
          />
          <DatePicker
            label="French"
            themeColor="primary"
            locale="fr"
            placeholder="Choisir une date"
          />
          <DatePicker
            label="German"
            themeColor="primary"
            locale="de"
            placeholder="Datum auswählen"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Disabled"
            themeColor="primary"
            isDisabled
            defaultValue={new Date()}
          />
          <DatePicker
            label="Read Only"
            themeColor="primary"
            isReadOnly
            defaultValue={new Date()}
          />
          <DatePicker
            label="Invalid"
            themeColor="primary"
            isInvalid
            errorMessage="Please select a valid date"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Label Placements
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Outside Label"
            labelPlacement="outside"
            themeColor="primary"
          />
          <DatePicker
            label="Inside Label"
            labelPlacement="inside"
            themeColor="primary"
          />
          <DatePicker
            label="Outside Left"
            labelPlacement="outside-left"
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Appearance
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Custom Styled"
            themeColor="primary"
            customAppearance={{
              container: { marginBottom: 8 },
              trigger: {
                borderWidth: 2,
                borderColor: colors.primary.main,
              },
              text: {
                fontWeight: '600',
              },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Default Value
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Pre-selected Date"
            themeColor="success"
            defaultValue={new Date(2024, 11, 25)}
            isClearable
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Full Width
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <DatePicker
            label="Full Width DatePicker"
            themeColor="primary"
            fullWidth
          />
        </View>
      </View>
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
