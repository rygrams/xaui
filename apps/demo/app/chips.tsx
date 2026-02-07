import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Chip, ChipGroup, ChipItem } from '@xaui/native/chip'

export default function ChipsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [showClosable, setShowClosable] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>(['react'])

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Basic Chips
        </Text>
        <View style={[styles.row, { gap: theme.spacing.sm }]}>
          <Chip>Default</Chip>
          <Chip themeColor="primary">Primary</Chip>
          <Chip themeColor="success" variant="faded">
            Success
          </Chip>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={[styles.row, { gap: theme.spacing.sm }]}>
          <Chip variant="solid" themeColor="secondary">
            Solid
          </Chip>
          <Chip variant="bordered" themeColor="secondary">
            Bordered
          </Chip>
          <Chip variant="light" themeColor="secondary">
            Light
          </Chip>
          <Chip variant="flat" themeColor="secondary">
            Flat
          </Chip>
          <Chip variant="faded" themeColor="secondary">
            Faded
          </Chip>
          <Chip variant="shadow" themeColor="secondary">
            Shadow
          </Chip>
          <Chip variant="dot" themeColor="secondary">
            Dot
          </Chip>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes + Radius
        </Text>
        <View style={[styles.row, { gap: theme.spacing.sm }]}>
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
          <Chip radius="none">None</Chip>
          <Chip radius="lg">Large R</Chip>
          <Chip radius="full">Full R</Chip>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Interactive
        </Text>
        <View style={[styles.row, { gap: theme.spacing.sm }]}>
          <Chip
            themeColor="warning"
            onPress={() => {
              setShowClosable(true)
            }}
          >
            Pressable
          </Chip>
          {showClosable ? (
            <Chip themeColor="danger" onClose={() => setShowClosable(false)}>
              Closable
            </Chip>
          ) : (
            <Chip themeColor="success">Closed</Chip>
          )}
          <Chip isDisabled themeColor="default">
            Disabled
          </Chip>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Selectable Group
        </Text>
        <ChipGroup
          isSelectable
          selectMode="multiple"
          variant="solid"
          themeColor="primary"
          selectedValues={selectedTags}
          onSelectionChange={setSelectedTags}
        >
          <ChipItem value="react">React</ChipItem>
          <ChipItem value="native">Native</ChipItem>
          <ChipItem value="typescript">TypeScript</ChipItem>
          <ChipItem value="xaui">XAUI</ChipItem>
        </ChipGroup>
        <Text style={{ color: colors.foreground, marginTop: theme.spacing.sm }}>
          Selected: {selectedTags.length > 0 ? selectedTags.join(', ') : 'none'}
        </Text>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
})
