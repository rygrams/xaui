import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  ArrowBackIcon,
  SearchIcon,
  StarIcon,
  EllipsisVerticalIcon,
  ShareIcon,
  DownloadIcon,
  PencilIcon,
  TrashIcon,
  AddIcon,
} from '@xaui/icons'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Button } from '@xaui/native/button'
import { Toolbar, ToolbarAction } from '@xaui/native/toolbar'

export default function ToolbarScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const [isFloatingBottomVisible, setIsFloatingBottomVisible] = useState(true)
  const [isDockedTopVisible, setIsDockedTopVisible] = useState(true)
  const [isVerticalVisible, setIsVerticalVisible] = useState(true)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.xl }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Floating Bottom (Material 3)
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Rounded floating toolbar at the bottom, elevated with shadow
        </Text>
        <Button
          size="sm"
          variant="outlined"
          themeColor="primary"
          onPress={() => setIsFloatingBottomVisible(prev => !prev)}
        >
          {isFloatingBottomVisible ? 'Hide' : 'Show'} Floating Bottom
        </Button>

        <View style={styles.preview}>
          <Text style={[styles.previewLabel, { color: colors.foreground }]}>
            Preview Container
          </Text>
          <Toolbar
            variant="floating"
            position="bottom"
            isVisible={isFloatingBottomVisible}
            themeColor="primary"
          >
            <ToolbarAction
              icon={({ color, size }) => <ShareIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <DownloadIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <PencilIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => (
                <EllipsisVerticalIcon size={size} color={color} />
              )}
            />
          </Toolbar>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Docked Top (Material 3)
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Fixed toolbar at the top without rounding
        </Text>
        <Button
          size="sm"
          variant="outlined"
          themeColor="secondary"
          onPress={() => setIsDockedTopVisible(prev => !prev)}
        >
          {isDockedTopVisible ? 'Hide' : 'Show'} Docked Top
        </Button>

        <View style={styles.preview}>
          <Text style={[styles.previewLabel, { color: colors.foreground }]}>
            Preview Container
          </Text>
          <Toolbar
            variant="docked"
            position="top"
            isVisible={isDockedTopVisible}
            themeColor="secondary"
            showDivider
          >
            <ToolbarAction
              icon={({ color, size }) => <ArrowBackIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <SearchIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <StarIcon size={size} color={color} />}
            />
          </Toolbar>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Floating Top (Material 3)
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Rounded floating toolbar at the top with elevation
        </Text>

        <View style={styles.preview}>
          <Text style={[styles.previewLabel, { color: colors.foreground }]}>
            Preview Container
          </Text>
          <Toolbar
            variant="floating"
            position="top"
            themeColor="tertiary"
            isElevated
          >
            <ToolbarAction
              icon={({ color, size }) => <ShareIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <PencilIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <AddIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => (
                <EllipsisVerticalIcon size={size} color={color} />
              )}
            />
          </Toolbar>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Docked Bottom (Material 3)
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Fixed toolbar at the bottom
        </Text>

        <View style={styles.preview}>
          <Text style={[styles.previewLabel, { color: colors.foreground }]}>
            Preview Container
          </Text>
          <Toolbar variant="docked" position="bottom" themeColor="warning" ra>
            <ToolbarAction
              icon={({ color, size }) => <DownloadIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <TrashIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <ShareIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => (
                <EllipsisVerticalIcon size={size} color={color} />
              )}
            />
          </Toolbar>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Vertical Left (Material 3)
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Vertical toolbar on the left, always centered
        </Text>
        <Button
          size="sm"
          variant="outlined"
          themeColor="success"
          onPress={() => setIsVerticalVisible(prev => !prev)}
        >
          {isVerticalVisible ? 'Hide' : 'Show'} Vertical
        </Button>

        <View style={[styles.preview, { height: 300 }]}>
          <Text style={[styles.previewLabel, { color: colors.foreground }]}>
            Preview Container
          </Text>
          <Toolbar
            variant="vertical"
            position="left"
            isVisible={isVerticalVisible}
            themeColor="success"
          >
            <ToolbarAction
              icon={({ color, size }) => <ShareIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <DownloadIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <PencilIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <TrashIcon size={size} color={color} />}
            />
          </Toolbar>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Vertical Right (Material 3)
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Vertical toolbar on the right, always centered
        </Text>

        <View style={[styles.preview, { height: 300 }]}>
          <Text style={[styles.previewLabel, { color: colors.foreground }]}>
            Preview Container
          </Text>
          <Toolbar variant="vertical" position="right" themeColor="error">
            <ToolbarAction
              icon={({ color, size }) => <AddIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <SearchIcon size={size} color={color} />}
            />
            <ToolbarAction
              icon={({ color, size }) => <StarIcon size={size} color={color} />}
            />
          </Toolbar>
        </View>
      </View>

      <View style={{ height: 120 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    width: '100%',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  preview: {
    height: 180,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  previewLabel: {
    fontSize: 15,
    opacity: 0.5,
  },
})
