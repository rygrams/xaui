import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { useState } from 'react'
import { Fab } from '@xaui/native/fab'
import { FabMenu, FabMenuItem } from '@xaui/native/fab-menu'
import {
  AddIcon,
  PencilIcon,
  ShareIcon,
  CameraIcon,
  CloseIcon,
  ImageIcon,
  StarIcon,
} from '@xaui/icons'

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
            icon={<AddIcon size={24} color={colors.primary.foreground} />}
            variant="solid"
            themeColor="primary"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.primary.main} />}
            variant="flat"
            themeColor="primary"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.primary.main} />}
            variant="outlined"
            themeColor="primary"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.primary.main} />}
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
            icon={<AddIcon size={24} color={colors.secondary.foreground} />}
            size="sm"
            themeColor="secondary"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.secondary.foreground} />}
            size="md"
            themeColor="secondary"
          />
          <Fab
            icon={<AddIcon size={36} color={colors.secondary.foreground} />}
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
            icon={<AddIcon size={24} color={colors.primary.foreground} />}
            themeColor="primary"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.secondary.foreground} />}
            themeColor="secondary"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.success.foreground} />}
            themeColor="success"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.danger.foreground} />}
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
            icon={<PencilIcon size={24} color={colors.primary.foreground} />}
            label="Compose"
            themeColor="primary"
          />
          <Fab
            icon={<CameraIcon size={24} color={colors.tertiary.main} />}
            label="Take Photo"
            themeColor="tertiary"
            variant="flat"
          />
          <Fab
            icon={<ShareIcon size={24} color={colors.secondary.main} />}
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
            icon={<AddIcon size={24} color={colors.primary.foreground} />}
            isDisabled
            themeColor="primary"
          />
          <Fab
            icon={<AddIcon size={24} color={colors.primary.foreground} />}
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
            icon={<AddIcon size={24} color={colors.primary.foreground} />}
            expandedIcon={<CloseIcon size={24} color={colors.primary.foreground} />}
            themeColor="primary"
            variant="solid"
            elevation={2}
          >
            <FabMenuItem
              icon={<CameraIcon size={20} />}
              label="Take Photo"
              themeColor="primary"
            />
            <FabMenuItem
              icon={<ImageIcon size={20} />}
              label="Gallery"
              themeColor="secondary"
            />
            <FabMenuItem
              icon={<ShareIcon size={20} />}
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
            icon={<PencilIcon size={24} color={colors.secondary.foreground} />}
            expandedIcon={
              <CloseIcon size={24} color={colors.secondary.foreground} />
            }
            themeColor="secondary"
            variant="solid"
            label="Expand Menu"
            radius="full"
            isExpanded={controlledExpanded}
            onToggle={setControlledExpanded}
          >
            <FabMenuItem
              icon={<StarIcon size={20} />}
              label="Favorite"
              themeColor="warning"
            />
            <FabMenuItem
              icon={<PencilIcon size={20} />}
              label="Edit"
              themeColor="secondary"
            />
            <FabMenuItem
              icon={<ShareIcon size={20} />}
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
