import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { SegmentButton, SegmentButtonItem } from '@xaui/native/segment-button'

export default function SegmentButtonsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [delivery, setDelivery] = useState('standard')
  const [filters, setFilters] = useState<string[]>(['new', 'popular'])

  return (
    <ScrollView
      style={[localStyles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[localStyles.content, { gap: theme.spacing.lg }]}
    >
      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Single Selection (Controlled)
        </Text>
        <SegmentButton
          selected={delivery}
          onSelectionChange={val => setDelivery(val as string)}
          fullWidth
        >
          <SegmentButtonItem itemKey="standard" label="Standard" />
          <SegmentButtonItem itemKey="express" label="Express" />
          <SegmentButtonItem itemKey="pickup" label="Pickup" />
        </SegmentButton>
        <Text style={[localStyles.label, { color: colors.foreground }]}>
          Selected: {delivery}
        </Text>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Multiple Selection (Controlled)
        </Text>
        <SegmentButton
          selected={filters}
          onSelectionChange={val => setFilters(val as string[])}
          selectionMode="multiple"
          variant="flat"
          fullWidth
        >
          <SegmentButtonItem itemKey="new" label="New" />
          <SegmentButtonItem itemKey="popular" label="Popular" />
          <SegmentButtonItem itemKey="sale" label="Sale" />
        </SegmentButton>
        <Text style={[localStyles.label, { color: colors.foreground }]}>
          Selected: {filters.join(', ')}
        </Text>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Uncontrolled
        </Text>
        <SegmentButton defaultSelected="week" fullWidth>
          <SegmentButtonItem itemKey="day" label="Day" />
          <SegmentButtonItem itemKey="week" label="Week" />
          <SegmentButtonItem itemKey="month" label="Month" />
          <SegmentButtonItem itemKey="year" label="Year" />
        </SegmentButton>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Outlined
          </Text>
          <SegmentButton defaultSelected="day" variant="outlined" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>Flat</Text>
          <SegmentButton defaultSelected="day" variant="flat" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Light
          </Text>
          <SegmentButton defaultSelected="day" variant="light" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Faded
          </Text>
          <SegmentButton defaultSelected="day" variant="faded" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Flat + Elevation
          </Text>
          <SegmentButton
            defaultSelected="day"
            variant="flat"
            elevation={2}
            fullWidth
          >
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>
        </View>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Extra Small
          </Text>
          <SegmentButton defaultSelected="day" size="xs" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Small
          </Text>
          <SegmentButton defaultSelected="day" size="sm" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Medium
          </Text>
          <SegmentButton defaultSelected="day" size="md" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Large
          </Text>
          <SegmentButton defaultSelected="day" size="lg" fullWidth>
            <SegmentButtonItem itemKey="day" label="Day" />
            <SegmentButtonItem itemKey="week" label="Week" />
            <SegmentButtonItem itemKey="month" label="Month" />
            <SegmentButtonItem itemKey="year" label="Year" />
          </SegmentButton>
        </View>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <SegmentButton defaultSelected="standard" themeColor="primary" fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>
          <SegmentButton defaultSelected="standard" themeColor="secondary" fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>
          <SegmentButton defaultSelected="standard" themeColor="success" fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>
          <SegmentButton defaultSelected="standard" themeColor="danger" fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>
          <SegmentButton defaultSelected="standard" themeColor="warning" fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>
        </View>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Disabled
          </Text>
          <SegmentButton defaultSelected="standard" isDisabled fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            No Checkmark
          </Text>
          <SegmentButton defaultSelected="standard" showCheckmark={false} fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Square Radius
          </Text>
          <SegmentButton defaultSelected="standard" radius="md" fullWidth>
            <SegmentButtonItem itemKey="standard" label="Standard" />
            <SegmentButtonItem itemKey="express" label="Express" />
            <SegmentButtonItem itemKey="pickup" label="Pickup" />
          </SegmentButton>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const localStyles = StyleSheet.create({
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
  label: {
    fontSize: 14,
    marginTop: 4,
  },
})
