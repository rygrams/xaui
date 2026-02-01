import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { StyleSheet, View } from 'react-native'
import { Typography } from '@xaui/native/typography'

export default function HomeScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          gap: theme.spacing.md,
        },
      ]}
    >
      <Typography variant="headlineLarge">Typography</Typography>
      <Typography variant="subtitleLarge" themeColor="primary">
        Subtitle example with primary color
      </Typography>
      <Typography variant="bodyMedium">
        This is a bodyMedium example showing the default typography style.
      </Typography>
      <Typography variant="caption" themeColor="secondary">
        Caption example with secondary color
      </Typography>
      <Typography maxLines={1} overflow="ellipsis">
        This is a long line that will be truncated with ellipsis at one line.
      </Typography>
      <Typography maxLines={3} overflow="clip" variant="bodyMedium">
        This is a longer block of text that clips after three lines to demonstrate the
        clip overflow behavior in Typography.
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
  },
})
