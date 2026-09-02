import Ionicons from '@expo/vector-icons/Ionicons'
import { useXUIColors, useXUITheme } from '@xaui/native-legacy/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Fab } from '@xaui/native-legacy/fab'
import { FabMenu, FabMenuItem } from '@xaui/native-legacy/fab-menu'

export default function FabScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [controlledExpanded, setControlledExpanded] = useState(false)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Variants
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.primary.onMain} />}
            variant="solid"
            themeColor="primary"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.primary.main} />}
            variant="flat"
            themeColor="primary"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.primary.main} />}
            variant="outlined"
            themeColor="primary"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.primary.main} />}
            variant="flat"
            elevation={2}
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Sizes
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md, alignItems: 'center' }]}>
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.secondary.onMain} />}
            size="sm"
            themeColor="secondary"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.secondary.onMain} />}
            size="md"
            themeColor="secondary"
          />
          <Fab
            icon={<Ionicons name="add" size={36} color={colors.secondary.onMain} />}
            size="lg"
            themeColor="secondary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Theme Colors
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.primary.onMain} />}
            themeColor="primary"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.secondary.onMain} />}
            themeColor="secondary"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.success.onMain} />}
            themeColor="success"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.danger.onMain} />}
            themeColor="danger"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Extended FAB
        </Text>
        <View style={{ gap: theme.spacing.md }}>
          <Fab
            icon={<Ionicons name="pencil" size={24} color={colors.primary.onMain} />}
            label="Compose"
            themeColor="primary"
          />
          <Fab
            icon={<Ionicons name="camera" size={24} color={colors.tertiary.main} />}
            label="Take Photo"
            themeColor="tertiary"
            variant="flat"
          />
          <Fab
            icon={<Ionicons name="share" size={24} color={colors.secondary.main} />}
            label="Share"
            themeColor="secondary"
            variant="outlined"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          States
        </Text>
        <View style={[styles.row, { gap: theme.spacing.md }]}>
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.primary.onMain} />}
            isDisabled
            themeColor="primary"
          />
          <Fab
            icon={<Ionicons name="add" size={24} color={colors.primary.onMain} />}
            isLoading
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          FAB Menu (Uncontrolled)
        </Text>
        <View style={styles.fabMenuContainer}>
          <FabMenu
            icon={<Ionicons name="add" size={24} color={colors.primary.onMain} />}
            expandedIcon={
              <Ionicons name="close" size={24} color={colors.primary.onMain} />
            }
            themeColor="primary"
            variant="solid"
            elevation={2}
          >
            <FabMenuItem
              icon={<Ionicons name="camera" size={20} />}
              label="Take Photo"
              themeColor="primary"
            />
            <FabMenuItem
              icon={<Ionicons name="image" size={20} />}
              label="Gallery"
              themeColor="secondary"
            />
            <FabMenuItem
              icon={<Ionicons name="share" size={20} />}
              label="Share"
              themeColor="default"
            />
          </FabMenu>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          FAB Menu (Controlled)
        </Text>
        <View style={styles.fabMenuContainer}>
          <FabMenu
            icon={
              <Ionicons name="pencil" size={24} color={colors.secondary.onMain} />
            }
            expandedIcon={
              <Ionicons name="close" size={24} color={colors.secondary.onMain} />
            }
            themeColor="secondary"
            variant="solid"
            label="Expand Menu"
            radius="full"
            isExpanded={controlledExpanded}
            onToggle={setControlledExpanded}
          >
            <FabMenuItem
              icon={<Ionicons name="star" size={20} />}
              label="Favorite"
              themeColor="warning"
            />
            <FabMenuItem
              icon={<Ionicons name="pencil" size={20} />}
              label="Edit"
              themeColor="secondary"
            />
            <FabMenuItem
              icon={<Ionicons name="share" size={20} />}
              label="Share"
              themeColor="default"
              isDisabled
            />
          </FabMenu>
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
    alignItems: 'flex-start',
  },
  fabMenuContainer: {
    height: 280,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})
