import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { SegmentButton } from '@xaui/native/segment-button'

const deliverySegments = [
  { key: 'standard', label: 'Standard' },
  { key: 'express', label: 'Express' },
  { key: 'pickup', label: 'Pickup' },
]

const filterSegments = [
  { key: 'new', label: 'New' },
  { key: 'popular', label: 'Popular' },
  { key: 'sale', label: 'Sale' },
]

const viewSegments = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
]

export default function SegmentButtonsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [delivery, setDelivery] = useState('standard')
  const [filters, setFilters] = useState<string[]>(['new', 'popular'])
  const [outlinedVal, setOutlinedVal] = useState('day')
  const [solidVal, setSolidVal] = useState('day')
  const [flatVal, setFlatVal] = useState('day')
  const [lightVal, setLightVal] = useState('day')
  const [fadedVal, setFadedVal] = useState('day')
  const [elevatedVal, setElevatedVal] = useState('day')
  const [sizeXs, setSizeXs] = useState('day')
  const [sizeSm, setSizeSm] = useState('day')
  const [sizeMd, setSizeMd] = useState('day')
  const [sizeLg, setSizeLg] = useState('day')

  return (
    <ScrollView
      style={[localStyles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[localStyles.content, { gap: theme.spacing.lg }]}
    >
      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Single Selection
        </Text>
        <SegmentButton
          segments={deliverySegments}
          selected={delivery}
          onSelectionChange={val => setDelivery(val as string)}
          fullWidth
        />
        <Text style={[localStyles.label, { color: colors.foreground }]}>
          Selected: {delivery}
        </Text>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Multiple Selection
        </Text>
        <SegmentButton
          segments={filterSegments}
          selected={filters}
          onSelectionChange={val => setFilters(val as string[])}
          selectionMode="multiple"
          variant="solid"
          fullWidth
        />
        <Text style={[localStyles.label, { color: colors.foreground }]}>
          Selected: {filters.join(', ')}
        </Text>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Outlined
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={outlinedVal}
            onSelectionChange={val => setOutlinedVal(val as string)}
            variant="outlined"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Solid
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={solidVal}
            onSelectionChange={val => setSolidVal(val as string)}
            variant="solid"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>Flat</Text>
          <SegmentButton
            segments={viewSegments}
            selected={flatVal}
            onSelectionChange={val => setFlatVal(val as string)}
            variant="flat"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Light
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={lightVal}
            onSelectionChange={val => setLightVal(val as string)}
            variant="light"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Faded
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={fadedVal}
            onSelectionChange={val => setFadedVal(val as string)}
            variant="faded"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Solid + Elevation
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={elevatedVal}
            onSelectionChange={val => setElevatedVal(val as string)}
            variant="solid"
            elevation={2}
            fullWidth
          />
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
          <SegmentButton
            segments={viewSegments}
            selected={sizeXs}
            onSelectionChange={val => setSizeXs(val as string)}
            size="xs"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Small
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={sizeSm}
            onSelectionChange={val => setSizeSm(val as string)}
            size="sm"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Medium
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={sizeMd}
            onSelectionChange={val => setSizeMd(val as string)}
            size="md"
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Large
          </Text>
          <SegmentButton
            segments={viewSegments}
            selected={sizeLg}
            onSelectionChange={val => setSizeLg(val as string)}
            size="lg"
            fullWidth
          />
        </View>
      </View>

      <View style={localStyles.section}>
        <Text style={[localStyles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            themeColor="primary"
            fullWidth
          />
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            themeColor="secondary"
            fullWidth
          />
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            themeColor="success"
            fullWidth
          />
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            themeColor="danger"
            fullWidth
          />
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            themeColor="warning"
            fullWidth
          />
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
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            isDisabled
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            No Checkmark
          </Text>
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            showCheckmark={false}
            fullWidth
          />

          <Text style={[localStyles.label, { color: colors.foreground }]}>
            Square Radius
          </Text>
          <SegmentButton
            segments={deliverySegments}
            selected="standard"
            onSelectionChange={() => {}}
            radius="md"
            fullWidth
          />
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
