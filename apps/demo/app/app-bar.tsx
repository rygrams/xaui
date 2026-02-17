import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  ArrowBackIcon,
  CloseCircleIcon,
  EllipsisVerticalIcon,
  SearchIcon,
} from '@xaui/icons'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import {
  AppBar,
  AppBarContent,
  AppBarEndContent,
  AppBarStartContent,
} from '@xaui/native/app-bar'

export default function AppBarScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.xl }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Docked AppBar
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Full-width AppBar with title only.
        </Text>

        <View style={styles.preview}>
          <View style={styles.stack}>
            <AppBar variant="docked" elevation={1}>
              <AppBarStartContent>
                <ArrowBackIcon size={18} color={colors.foreground} />
              </AppBarStartContent>
              <AppBarContent alignment="start">
                <Text style={[styles.title, { color: colors.foreground }]}>
                  XAUI
                </Text>
              </AppBarContent>
              <AppBarEndContent>
                <Text style={[styles.slotText, { color: colors.foreground }]}>
                  Menu
                </Text>
              </AppBarEndContent>
            </AppBar>

            <AppBar variant="docked" elevation={2}>
              <AppBarStartContent>
                <ArrowBackIcon size={22} color={colors.foreground} />
              </AppBarStartContent>
              <AppBarContent alignment="center">
                <Text style={[styles.title, { color: colors.foreground }]}>
                  XAUI
                </Text>
              </AppBarContent>
              <AppBarEndContent>
                <CloseCircleIcon size={22} color={colors.foreground} />
              </AppBarEndContent>
            </AppBar>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Floating AppBar
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Rounded AppBar with title only.
        </Text>

        <View style={styles.preview}>
          <View style={styles.stack}>
            <AppBar variant="floating" elevation={1}>
              <AppBarStartContent>
                <ArrowBackIcon size={22} color={colors.foreground} />
              </AppBarStartContent>
              <AppBarContent alignment="center">
                <Text style={[styles.title, { color: colors.foreground }]}>
                  XAUI
                </Text>
              </AppBarContent>
              <AppBarEndContent>
                <SearchIcon size={22} color={colors.foreground} />
              </AppBarEndContent>
            </AppBar>

            <AppBar variant="floating" themeColor="primary">
              <AppBarStartContent>
                <ArrowBackIcon size={22} color={theme.colors.primary.main} />
              </AppBarStartContent>
              <AppBarContent alignment="center">
                <Text style={[styles.title, { color: theme.colors.primary.main }]}>
                  XAUI
                </Text>
              </AppBarContent>
              <AppBarEndContent>
                <EllipsisVerticalIcon size={22} color={theme.colors.primary.main} />
              </AppBarEndContent>
            </AppBar>

            <AppBar variant="floating" elevation={1} themeColor="tertiary">
              <AppBarStartContent>
                <ArrowBackIcon size={22} color={theme.colors.tertiary.main} />
              </AppBarStartContent>
              <AppBarContent alignment="center">
                <Text style={[styles.title, { color: theme.colors.tertiary.main }]}>
                  XAUI
                </Text>
              </AppBarContent>
              <AppBarEndContent>
                <EllipsisVerticalIcon size={22} color={theme.colors.tertiary.main} />
              </AppBarEndContent>
            </AppBar>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    paddingVertical: 12,
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
    overflow: 'hidden',
    paddingVertical: 14,
  },
  stack: {
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  slotText: {
    fontSize: 13,
    fontWeight: '500',
  },
})
