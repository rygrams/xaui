import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Avatar, AvatarGroup } from '@xaui/native/avatar'

export default function AvatarsScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar name="John Doe" themeColor="default" />
          <Avatar name="Jane Smith" themeColor="primary" />
          <Avatar name="Bob Wilson" themeColor="success" />
          <Avatar name="Alice Brown" themeColor="warning" />
          <Avatar name="Charlie Davis" themeColor="danger" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar name="XS" size="xs" themeColor="primary" />
          <Avatar name="SM" size="sm" themeColor="primary" />
          <Avatar name="MD" size="md" themeColor="primary" />
          <Avatar name="LG" size="lg" themeColor="primary" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Sizes
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar name="30" size={30} themeColor="primary" />
          <Avatar name="50" size={50} themeColor="primary" />
          <Avatar name="70" size={70} themeColor="primary" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Radius Options
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar name="None" radius="none" themeColor="primary" />
          <Avatar name="SM" radius="sm" themeColor="primary" />
          <Avatar name="MD" radius="md" themeColor="primary" />
          <Avatar name="LG" radius="lg" themeColor="primary" />
          <Avatar name="Full" radius="full" themeColor="primary" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Images
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar
            src="https://i.pravatar.cc/150?img=1"
            name="User 1"
            size="xs"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=2"
            name="User 2"
            size="sm"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=3"
            name="User 3"
            size="md"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=4"
            name="User 4"
            size="lg"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Images with Radius
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar
            src="https://i.pravatar.cc/150?img=5"
            name="User 5"
            radius="none"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=6"
            name="User 6"
            radius="sm"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=7"
            name="User 7"
            radius="md"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=8"
            name="User 8"
            radius="full"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Bordered
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar name="John Doe" isBordered themeColor="default" />
          <Avatar name="Jane Smith" isBordered themeColor="primary" />
          <Avatar
            src="https://i.pravatar.cc/150?img=9"
            name="User 9"
            isBordered
            themeColor="success"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=10"
            name="User 10"
            isBordered
            themeColor="warning"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Disabled State
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar name="Disabled" isDisabled themeColor="primary" />
          <Avatar
            src="https://i.pravatar.cc/150?img=11"
            name="Disabled Image"
            isDisabled
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Fallback Icon
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar
            showFallback
            icon={<Text style={{ fontSize: 24 }}>👤</Text>}
            themeColor="primary"
          />
          <Avatar
            showFallback
            icon={<Text style={{ fontSize: 24 }}>🎭</Text>}
            themeColor="success"
          />
          <Avatar
            showFallback
            icon={<Text style={{ fontSize: 24 }}>⭐</Text>}
            themeColor="warning"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Appearance
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Avatar
            name="Custom"
            themeColor="primary"
            customAppearance={{
              container: {
                borderWidth: 3,
                borderColor: colors.primary.main,
              },
              text: {
                fontWeight: 'bold',
                fontSize: 16,
              },
            }}
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=7"
            name="Custom Image"
            themeColor="primary"
            customAppearance={{
              container: {
                borderWidth: 2,
                borderColor: colors.warning.main,
              },
              image: {
                opacity: 0.8,
              },
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Avatar Group
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <AvatarGroup max={4}>
            <Avatar name="Alice" themeColor="primary" />
            <Avatar name="Bob" themeColor="success" />
            <Avatar name="Charlie" themeColor="warning" />
            <Avatar name="Diana" themeColor="danger" />
            <Avatar name="Eve" themeColor="primary" />
            <Avatar name="Frank" themeColor="success" />
          </AvatarGroup>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Avatar Group - Images
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <AvatarGroup max={3} isBordered>
            <Avatar
              src="https://i.pravatar.cc/150?img=20"
              name="User 20"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=21"
              name="User 21"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=22"
              name="User 22"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=23"
              name="User 23"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=24"
              name="User 24"
            />
          </AvatarGroup>

          <AvatarGroup max={5} isBordered size="sm">
            <Avatar
              src="https://i.pravatar.cc/150?img=30"
              name="User 30"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=31"
              name="User 31"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=32"
              name="User 32"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=33"
              name="User 33"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=34"
              name="User 34"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=35"
              name="User 35"
            />
            <Avatar
              src="https://i.pravatar.cc/150?img=36"
              name="User 36"
            />
          </AvatarGroup>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Avatar Group - Mixed
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <AvatarGroup max={4} isBordered>
            <Avatar
              src="https://i.pravatar.cc/150?img=40"
              name="User 40"
              themeColor="primary"
            />
            <Avatar name="Jane Smith" themeColor="success" />
            <Avatar
              src="https://i.pravatar.cc/150?img=41"
              name="User 41"
              themeColor="warning"
            />
            <Avatar name="Bob Wilson" themeColor="danger" />
            <Avatar
              src="https://i.pravatar.cc/150?img=42"
              name="User 42"
              themeColor="primary"
            />
            <Avatar name="Alice Brown" themeColor="primary" />
          </AvatarGroup>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Avatar Group - Grid Layout
        </Text>
        <AvatarGroup max={6} isGrid>
          <Avatar
            src="https://i.pravatar.cc/150?img=50"
            name="User 50"
            size="sm"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=51"
            name="User 51"
            size="sm"
          />
          <Avatar name="User 3" themeColor="primary" size="sm" />
          <Avatar name="User 4" themeColor="success" size="sm" />
          <Avatar
            src="https://i.pravatar.cc/150?img=52"
            name="User 52"
            size="sm"
          />
          <Avatar name="User 6" themeColor="warning" size="sm" />
          <Avatar
            src="https://i.pravatar.cc/150?img=53"
            name="User 53"
            size="sm"
          />
          <Avatar name="User 8" themeColor="danger" size="sm" />
        </AvatarGroup>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Avatar Group - Custom Total
        </Text>
        <AvatarGroup max={3} total={25} isBordered>
          <Avatar
            src="https://i.pravatar.cc/150?img=60"
            name="User 60"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=61"
            name="User 61"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=62"
            name="User 62"
          />
        </AvatarGroup>
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
