import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Badge } from '@xaui/native/badge'
import { Button } from '@xaui/native/button'

export default function BadgesScreen() {
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
          <Badge content="5" themeColor="default">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="10" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="99" themeColor="success">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="5" themeColor="warning">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="3" themeColor="danger">
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge content="5" variant="solid" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="10" variant="flat" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="99" variant="faded" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="5" variant="shadow" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge content="5" size="sm" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="10" size="md" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="99" size="lg" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Radius
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge content="5" radius="none" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="10" radius="sm" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="99" radius="md" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="5" radius="lg" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="9" radius="full" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Placements
        </Text>
        <View style={[styles.row, { gap: theme.spacing.xl }]}>
          <Badge content="1" placement="top-left" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="2" placement="top-right" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="3" placement="bottom-left" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="4" placement="bottom-right" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Dot Badges
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge isDot themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge isDot themeColor="success">
            <View style={styles.demoBox} />
          </Badge>
          <Badge isDot themeColor="danger">
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Without Outline
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge content="5" disableOutline themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="10" disableOutline themeColor="success">
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          With Components
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge content="5" themeColor="danger">
            <Button variant="flat" themeColor="primary">
              Messages
            </Button>
          </Badge>
          <Badge content="99+" themeColor="danger">
            <Button variant="flat" themeColor="primary">
              Notifications
            </Button>
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Custom Appearance
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge
            content="NEW"
            themeColor="primary"
            customAppearance={{
              badge: {
                borderWidth: 2,
                borderColor: colors.primary.main,
              },
              text: {
                fontSize: 10,
                fontWeight: 'bold',
              },
            }}
          >
            <View style={styles.demoBox} />
          </Badge>
          <Badge
            content="VIP"
            themeColor="warning"
            customAppearance={{
              badge: {
                transform: [{ scale: 1.2 }],
              },
              text: {
                fontSize: 12,
                fontWeight: 'bold',
                letterSpacing: 1,
              },
            }}
          >
            <View style={styles.demoBox} />
          </Badge>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Invisible Badge
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Badge content="5" isInvisible themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
          <Badge content="10" themeColor="primary">
            <View style={styles.demoBox} />
          </Badge>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  demoBox: {
    width: 50,
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
})
