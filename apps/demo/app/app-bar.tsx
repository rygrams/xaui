import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  ArrowBackIcon,
  SearchIcon,
  EllipsisVerticalIcon,
  StarIcon,
  AddIcon,
} from '@xaui/icons'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Button } from '@xaui/native/button'
import {
  AppBar,
  AppBarContent,
  AppBarEndContent,
  AppBarStartContent,
} from '@xaui/native/app-bar'

export default function AppBarScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()
  const floatingThemeColor = theme.colors.primary
  const [floatingElevation, setFloatingElevation] = useState(3)
  const [dockedElevation, setDockedElevation] = useState(1)

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.xl }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Docked AppBar
        </Text>
        <Text style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}>
          Full-width app bar with `variant=docked` and configurable `elevation`.
        </Text>
        <View style={styles.controlsRow}>
          <Button
            size="sm"
            variant="outlined"
            onPress={() => setDockedElevation(prev => Math.max(prev - 1, 0))}
          >
            Elevation -
          </Button>
          <Button
            size="sm"
            variant="outlined"
            onPress={() => setDockedElevation(prev => Math.min(prev + 1, 12))}
          >
            Elevation +
          </Button>
        </View>
        <Text style={[styles.valueLabel, { color: colors.foreground }]}>
          elevation: {dockedElevation}
        </Text>

        <View style={styles.preview}>
          <AppBar variant="docked" elevation={dockedElevation}>
            <AppBarStartContent>
              <ArrowBackIcon size={22} color={colors.foreground} />
            </AppBarStartContent>
            <AppBarContent>
              <Text style={[styles.title, { color: colors.foreground }]}>
                AppBar Docked
              </Text>
            </AppBarContent>
            <AppBarEndContent>
              <SearchIcon size={22} color={colors.foreground} />
              <EllipsisVerticalIcon size={22} color={colors.foreground} />
            </AppBarEndContent>
          </AppBar>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Floating AppBar
        </Text>
        <Text style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}>
          Rounded app bar with `variant=floating` that does not take the full screen
          width. This example also uses `themeColor=&quot;primary&quot;`.
        </Text>
        <View style={styles.controlsRow}>
          <Button
            size="sm"
            variant="outlined"
            onPress={() => setFloatingElevation(prev => Math.max(prev - 1, 0))}
          >
            Elevation -
          </Button>
          <Button
            size="sm"
            variant="outlined"
            onPress={() => setFloatingElevation(prev => Math.min(prev + 1, 12))}
          >
            Elevation +
          </Button>
        </View>
        <Text style={[styles.valueLabel, { color: colors.foreground }]}>
          elevation: {floatingElevation}
        </Text>

        <View style={styles.preview}>
          <AppBar variant="floating" elevation={floatingElevation} themeColor="primary">
            <AppBarStartContent>
              <StarIcon size={22} color={floatingThemeColor.main} />
            </AppBarStartContent>
            <AppBarContent>
              <Text style={[styles.title, { color: floatingThemeColor.main }]}>
                AppBar Floating
              </Text>
            </AppBarContent>
            <AppBarEndContent>
              <AddIcon size={22} color={floatingThemeColor.main} />
              <SearchIcon size={22} color={floatingThemeColor.main} />
            </AppBarEndContent>
          </AppBar>
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
  controlsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  valueLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
  preview: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 16,
    overflow: 'hidden',
    paddingVertical: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
})
