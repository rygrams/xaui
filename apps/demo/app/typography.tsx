import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Typography } from '@xaui/native/typography'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function TypographyScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.lg }]}
    >
      <View style={styles.section}>
        <Typography variant="subtitleLarge" style={styles.sectionTitle}>
          Variants
        </Typography>
        <View style={{ gap: theme.spacing.sm }}>
          <Typography variant="displayLarge">displayLarge</Typography>
          <Typography variant="displayMedium">displayMedium</Typography>
          <Typography variant="displaySmall">displaySmall</Typography>
          <Typography variant="headlineLarge">headlineLarge</Typography>
          <Typography variant="headlineMedium">headlineMedium</Typography>
          <Typography variant="headlineSmall">headlineSmall</Typography>
          <Typography variant="subtitleLarge">subtitleLarge</Typography>
          <Typography variant="subtitleMedium">subtitleMedium</Typography>
          <Typography variant="subtitleSmall">subtitleSmall</Typography>
          <Typography variant="bodyLarge">bodyLarge</Typography>
          <Typography variant="bodyMedium">bodyMedium</Typography>
          <Typography variant="bodySmall">bodySmall</Typography>
          <Typography variant="caption">caption</Typography>
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitleLarge" style={styles.sectionTitle}>
          Theme Colors
        </Typography>
        <View style={{ gap: theme.spacing.sm }}>
          <Typography themeColor="primary">primary</Typography>
          <Typography themeColor="secondary">secondary</Typography>
          <Typography themeColor="tertiary">tertiary</Typography>
          <Typography themeColor="success">success</Typography>
          <Typography themeColor="warning">warning</Typography>
          <Typography themeColor="danger">danger</Typography>
          <Typography themeColor="default">default</Typography>
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitleLarge" style={styles.sectionTitle}>
          Alignment
        </Typography>
        <View style={{ gap: theme.spacing.sm }}>
          <Typography align="left">Left aligned text</Typography>
          <Typography align="center">Center aligned text</Typography>
          <Typography align="right">Right aligned text</Typography>
          <Typography align="justify">
            Justified text that spans across multiple lines to demonstrate how
            justify alignment distributes spacing between words.
          </Typography>
        </View>
      </View>

      <View style={styles.section}>
        <Typography variant="subtitleLarge" style={styles.sectionTitle}>
          Truncation
        </Typography>
        <View style={{ gap: theme.spacing.md }}>
          <Typography variant="bodySmall" themeColor="secondary">
            {'maxLines=1 overflow="ellipsis"'}
          </Typography>
          <Typography maxLines={1} overflow="ellipsis">
            This is a very long text that will be truncated after one line with
            an ellipsis at the end.
          </Typography>
          <Typography variant="bodySmall" themeColor="secondary">
            {'maxLines=2 overflow="clip"'}
          </Typography>
          <Typography maxLines={2} overflow="clip">
            This is a very long text that will be clipped after two lines
            without any indicator that there is more content below this point.
          </Typography>
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
    fontWeight: 'bold',
    marginBottom: 12,
  },
})
