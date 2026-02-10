import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { List, ListItem } from '@xaui/native/list'
import { Margin } from '@xaui/native/view'
import { useState } from 'react'

export default function ListScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [singleSelected, setSingleSelected] = useState<string[]>(['1'])
  const [multiSelected, setMultiSelected] = useState<string[]>(['1', '3'])
  const cardBackground = colors.background === '#ffffff' ? '#f5f5f5' : '#2a2a2a'

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Basic List
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List>
              <ListItem itemKey="1" title="Item 1" />
              <ListItem itemKey="2" title="Item 2" />
              <ListItem itemKey="3" title="Item 3" />
            </List>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            List with Dividers
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List showDivider>
              <ListItem itemKey="1" title="First Item" />
              <ListItem itemKey="2" title="Second Item" />
              <ListItem itemKey="3" title="Third Item" />
              <ListItem itemKey="4" title="Fourth Item" />
            </List>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            List with Descriptions
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List showDivider>
              <ListItem
                itemKey="1"
                title="Wi-Fi"
                description="Connected to Home Network"
              />
              <ListItem
                itemKey="2"
                title="Bluetooth"
                description="On - 3 devices connected"
              />
              <ListItem itemKey="3" title="Airplane Mode" description="Off" />
            </List>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            List with Start/End Content
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List showDivider>
              <ListItem
                itemKey="1"
                title="Notifications"
                description="Manage your alerts"
                startContent={
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: colors.primary.main,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 16 }}>🔔</Text>
                  </View>
                }
                endContent={
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: colors.danger.main,
                      borderRadius: 4,
                    }}
                  />
                }
              />
              <ListItem
                itemKey="2"
                title="Privacy"
                description="Control your data"
                startContent={
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: colors.success.main,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 16 }}>🔒</Text>
                  </View>
                }
              />
              <ListItem
                itemKey="3"
                title="Storage"
                description="45% used"
                startContent={
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: colors.warning.main,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 16 }}>💾</Text>
                  </View>
                }
                endContent={
                  <Text style={{ color: colors.foreground, opacity: 0.5 }}>
                    45GB
                  </Text>
                }
              />
            </List>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Single Selection
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
            Selected: {singleSelected.join(', ') || 'None'}
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List
              selectionMode="single"
              isSelectable
              selectedKeys={singleSelected}
              onSelectionChange={setSingleSelected}
              showDivider
            >
              <ListItem itemKey="1" title="Option 1" description="First option" />
              <ListItem itemKey="2" title="Option 2" description="Second option" />
              <ListItem itemKey="3" title="Option 3" description="Third option" />
            </List>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Multiple Selection
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
            Selected: {multiSelected.join(', ') || 'None'}
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List
              selectionMode="multiple"
              isSelectable
              selectedKeys={multiSelected}
              onSelectionChange={setMultiSelected}
              showDivider
              themeColor="secondary"
            >
              <ListItem itemKey="1" title="Item A" />
              <ListItem itemKey="2" title="Item B" />
              <ListItem itemKey="3" title="Item C" />
              <ListItem itemKey="4" title="Item D" />
            </List>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Disabled Items
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List showDivider>
              <ListItem itemKey="1" title="Active Item" />
              <ListItem itemKey="2" title="Disabled Item" isDisabled />
              <ListItem itemKey="3" title="Another Active" />
              <ListItem itemKey="4" title="Also Disabled" isDisabled />
            </List>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Different Sizes
          </Text>
          <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
            Extra Small
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List size="xs" showDivider>
              <ListItem itemKey="1" title="Small Item 1" />
              <ListItem itemKey="2" title="Small Item 2" />
            </List>
          </View>
          <Margin top={theme.spacing.md}>
            <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
              Large
            </Text>
            <View style={[styles.card, { backgroundColor: cardBackground }]}>
              <List size="lg" showDivider>
                <ListItem itemKey="1" title="Large Item 1" />
                <ListItem itemKey="2" title="Large Item 2" />
              </List>
            </View>
          </Margin>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Non-Pressable List
          </Text>
          <View style={[styles.card, { backgroundColor: cardBackground }]}>
            <List isPressable={false} showDivider>
              <ListItem
                itemKey="1"
                title="Read Only 1"
                description="Cannot be pressed"
              />
              <ListItem
                itemKey="2"
                title="Read Only 2"
                description="Cannot be pressed"
              />
              <ListItem
                itemKey="3"
                title="Read Only 3"
                description="Cannot be pressed"
              />
            </List>
          </View>
        </View>
      </Margin>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          ListBuilder with FlatList
        </Text>
        <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
          Efficient for large datasets (not in ScrollView)
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
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
})
