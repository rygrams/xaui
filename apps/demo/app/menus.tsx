import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Menu, MenuItem } from '@xaui/native/menu'
import { Button, IconButton } from '@xaui/native/button'
import { Margin } from '@xaui/native/view'
import { CloseIcon } from '@xaui/icons/close'
import { CheckmarkIcon } from '@xaui/icons/checkmark'
import { ArrowBackIcon } from '@xaui/icons/arrow-back'
import { EllipsisVerticalIcon } from '@xaui/icons/ellipsis-vertical'
import { useState } from 'react'

export default function MenusScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [basicMenuVisible, setBasicMenuVisible] = useState(false)
  const [positionTopVisible, setPositionTopVisible] = useState(false)
  const [positionBottomVisible, setPositionBottomVisible] = useState(false)
  const [withIconsVisible, setWithIconsVisible] = useState(false)
  const [denseMenuVisible, setDenseMenuVisible] = useState(false)
  const [disabledItemsVisible, setDisabledItemsVisible] = useState(false)
  const [customStylesVisible, setCustomStylesVisible] = useState(false)
  const [scrollableVisible, setScrollableVisible] = useState(false)
  const [complexMenuVisible, setComplexMenuVisible] = useState(false)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Basic Menu
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={basicMenuVisible}
              onDismiss={() => setBasicMenuVisible(false)}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="primary"
                  onPress={() => setBasicMenuVisible(true)}
                >
                  Open Menu
                </Button>
              }
            >
              <MenuItem
                title="Profile"
                onPress={() => {
                  setBasicMenuVisible(false)
                }}
              />
              <MenuItem
                title="Settings"
                onPress={() => {
                  setBasicMenuVisible(false)
                }}
              />
              <MenuItem
                title="Logout"
                onPress={() => {
                  setBasicMenuVisible(false)
                }}
              />
            </Menu>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Position
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={positionTopVisible}
              position="top"
              onDismiss={() => setPositionTopVisible(false)}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="primary"
                  onPress={() => setPositionTopVisible(true)}
                >
                  Open Top
                </Button>
              }
            >
              <MenuItem
                title="Item 1"
                onPress={() => setPositionTopVisible(false)}
              />
              <MenuItem
                title="Item 2"
                onPress={() => setPositionTopVisible(false)}
              />
              <MenuItem
                title="Item 3"
                onPress={() => setPositionTopVisible(false)}
              />
            </Menu>

            <Menu
              visible={positionBottomVisible}
              position="bottom"
              onDismiss={() => setPositionBottomVisible(false)}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="success"
                  onPress={() => setPositionBottomVisible(true)}
                >
                  Open Bottom
                </Button>
              }
            >
              <MenuItem
                title="Item 1"
                onPress={() => setPositionBottomVisible(false)}
              />
              <MenuItem
                title="Item 2"
                onPress={() => setPositionBottomVisible(false)}
              />
              <MenuItem
                title="Item 3"
                onPress={() => setPositionBottomVisible(false)}
              />
            </Menu>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            With Start/End Content
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={withIconsVisible}
              onDismiss={() => setWithIconsVisible(false)}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="primary"
                  onPress={() => setWithIconsVisible(true)}
                >
                  Menu with Icons
                </Button>
              }
            >
              <MenuItem
                title="Home"
                startContent={
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: colors.primary.main,
                      borderRadius: 10,
                    }}
                  />
                }
                onPress={() => setWithIconsVisible(false)}
              />
              <MenuItem
                title="Settings"
                startContent={
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: colors.success.main,
                      borderRadius: 10,
                    }}
                  />
                }
                endContent={
                  <Text style={{ color: colors.foreground, opacity: 0.5 }}>⌘,</Text>
                }
                onPress={() => setWithIconsVisible(false)}
              />
              <MenuItem
                title="Help"
                startContent={
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: colors.warning.main,
                      borderRadius: 10,
                    }}
                  />
                }
                endContent={
                  <Text style={{ color: colors.foreground, opacity: 0.5 }}>⌘H</Text>
                }
                onPress={() => setWithIconsVisible(false)}
              />
            </Menu>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Dense Menu
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={denseMenuVisible}
              onDismiss={() => setDenseMenuVisible(false)}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="primary"
                  onPress={() => setDenseMenuVisible(true)}
                >
                  Compact Menu
                </Button>
              }
            >
              <MenuItem
                title="Compact Item 1"
                dense
                onPress={() => setDenseMenuVisible(false)}
              />
              <MenuItem
                title="Compact Item 2"
                dense
                onPress={() => setDenseMenuVisible(false)}
              />
              <MenuItem
                title="Compact Item 3"
                dense
                onPress={() => setDenseMenuVisible(false)}
              />
              <MenuItem
                title="Compact Item 4"
                dense
                onPress={() => setDenseMenuVisible(false)}
              />
            </Menu>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Disabled Items
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={disabledItemsVisible}
              onDismiss={() => setDisabledItemsVisible(false)}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="primary"
                  onPress={() => setDisabledItemsVisible(true)}
                >
                  Menu with Disabled
                </Button>
              }
            >
              <MenuItem
                title="Active Item"
                onPress={() => setDisabledItemsVisible(false)}
              />
              <MenuItem title="Disabled Item" isDisabled />
              <MenuItem
                title="Another Active"
                onPress={() => setDisabledItemsVisible(false)}
              />
              <MenuItem title="Also Disabled" isDisabled />
            </Menu>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Custom Appearance
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={customStylesVisible}
              onDismiss={() => setCustomStylesVisible(false)}
              customAppearance={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                container: {
                  borderRadius: theme.borderRadius.lg,
                  borderWidth: 2,
                  borderColor: colors.primary.main,
                },
              }}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="primary"
                  onPress={() => setCustomStylesVisible(true)}
                >
                  Custom Styled
                </Button>
              }
            >
              <MenuItem
                title="Custom Item 1"
                customAppearance={{
                  container: {
                    backgroundColor: colors.primary.main,
                  },
                  title: {
                    fontSize: 18,
                    fontWeight: 'bold',
                  },
                }}
                onPress={() => setCustomStylesVisible(false)}
              />
              <MenuItem
                title="Custom Item 2"
                customAppearance={{
                  title: {
                    color: colors.success.main,
                  },
                }}
                onPress={() => setCustomStylesVisible(false)}
              />
              <MenuItem
                title="Custom Item 3"
                onPress={() => setCustomStylesVisible(false)}
              />
            </Menu>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Scrollable Content
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={scrollableVisible}
              onDismiss={() => setScrollableVisible(false)}
              maxHeight={200}
              trigger={
                <Button
                  size="sm"
                  variant="bordered"
                  themeColor="primary"
                  onPress={() => setScrollableVisible(true)}
                >
                  Long Menu
                </Button>
              }
            >
              {Array.from({ length: 15 }, (_, i) => (
                <MenuItem
                  key={i}
                  title={`Menu Item ${i + 1}`}
                  onPress={() => setScrollableVisible(false)}
                />
              ))}
            </Menu>
          </View>
        </View>
      </Margin>

      <Margin bottom={theme.spacing.lg}>
        <View
          style={[
            styles.section,
            { flexDirection: 'row', justifyContent: 'flex-end' },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Complex Example with IconButton
          </Text>
          <View style={[styles.row, { gap: theme.spacing.md }]}>
            <Menu
              visible={complexMenuVisible}
              onDismiss={() => setComplexMenuVisible(false)}
              trigger={
                <IconButton
                  size="md"
                  variant="light"
                  themeColor="secondary"
                  radius="md"
                  icon={<EllipsisVerticalIcon size={20} color="#333333" />}
                  onPress={() => setComplexMenuVisible(true)}
                />
              }
            >
              <MenuItem
                title="Edit"
                startContent={
                  <CheckmarkIcon size={20} color={colors.primary.main} />
                }
                endContent={
                  <Text style={{ color: colors.foreground, opacity: 0.5 }}>⌘E</Text>
                }
                onPress={() => setComplexMenuVisible(false)}
              />
              <MenuItem
                title="Duplicate"
                startContent={
                  <ArrowBackIcon size={20} color={colors.success.main} />
                }
                endContent={
                  <Text style={{ color: colors.foreground, opacity: 0.5 }}>⌘D</Text>
                }
                onPress={() => setComplexMenuVisible(false)}
              />
              <MenuItem
                title="Archive"
                startContent={
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: colors.warning.main,
                      borderRadius: 4,
                    }}
                  />
                }
                onPress={() => setComplexMenuVisible(false)}
              />
              <MenuItem title="Share" isDisabled />
              <MenuItem
                title="Delete"
                startContent={<CloseIcon size={20} color={colors.danger.main} />}
                customAppearance={{
                  title: {
                    color: colors.danger.main,
                  },
                }}
                onPress={() => setComplexMenuVisible(false)}
              />
            </Menu>
          </View>
        </View>
      </Margin>
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
