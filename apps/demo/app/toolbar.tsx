import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  ArrowBackIcon,
  SearchIcon,
  StarIcon,
  EllipsisVerticalIcon,
} from '@xaui/icons'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Button } from '@xaui/native/button'
import { Toolbar, ToolbarAction } from '@xaui/native/toolbar'

export default function ToolbarScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [isVisible, setIsVisible] = useState(true)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Small</Text>
        <Toolbar
          title="Inbox"
          variant="small"
          navigationIcon={<ArrowBackIcon size={24} color={colors.foreground} />}
          themeColor="primary"
        >
          <ToolbarAction
            icon={({ color, size }) => <SearchIcon size={size} color={color} />}
          />
          <ToolbarAction
            icon={({ color, size }) => <EllipsisVerticalIcon size={size} color={color} />}
          />
        </Toolbar>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Centered</Text>
        <Toolbar
          title="Messages"
          variant="centered"
          navigationIcon={<ArrowBackIcon size={24} color={colors.foreground} />}
          themeColor="secondary"
        >
          <ToolbarAction
            icon={({ color, size }) => <SearchIcon size={size} color={color} />}
          />
          <ToolbarAction
            icon={({ color, size }) => <StarIcon size={size} color={color} />}
          />
        </Toolbar>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Medium</Text>
        <Toolbar
          title="Library"
          subtitle="8 collections"
          variant="medium"
          navigationIcon={<ArrowBackIcon size={24} color={colors.foreground} />}
          themeColor="tertiary"
          isElevated
        >
          <ToolbarAction
            icon={({ color, size }) => <SearchIcon size={size} color={color} />}
          />
          <ToolbarAction
            icon={({ color, size }) => <EllipsisVerticalIcon size={size} color={color} />}
          />
        </Toolbar>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Large</Text>
        <Toolbar
          title="Projects"
          subtitle="12 active"
          variant="large"
          navigationIcon={<ArrowBackIcon size={24} color={colors.foreground} />}
          themeColor="warning"
        >
          <ToolbarAction
            icon={({ color, size }) => <SearchIcon size={size} color={color} />}
          />
          <ToolbarAction
            icon={({ color, size }) => <EllipsisVerticalIcon size={size} color={color} />}
          />
        </Toolbar>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Position + isVisible</Text>
        <Button
          size="sm"
          variant="outlined"
          themeColor="primary"
          onPress={() => setIsVisible(prev => !prev)}
        >
          {isVisible ? 'Hide toolbar' : 'Show toolbar'}
        </Button>

        <View style={styles.positionPreview}>
          <Text style={styles.previewLabel}>Container content</Text>
          <Toolbar
            title="Pinned"
            variant="small"
            position="absolute-top"
            isVisible={isVisible}
            navigationIcon={<ArrowBackIcon size={24} color={colors.foreground} />}
            themeColor="success"
            showDivider={false}
            style={{ borderRadius: 12 }}
          >
            <ToolbarAction
              icon={({ color, size }) => <SearchIcon size={size} color={color} />}
            />
          </Toolbar>
        </View>
      </View>

      <View style={{ height: 40 }} />
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
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  positionPreview: {
    height: 140,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  previewLabel: {
    fontSize: 15,
    opacity: 0.75,
  },
})
