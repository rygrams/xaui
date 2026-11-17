import type { ReactNode } from 'react'
import { View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Typography } from '@xaui/tram/typography'

type TramSectionProps = { title: string; note: string; children: ReactNode }

/** A block of a Tram demo screen: a `section` title, a muted `caption`, the samples. */
export function TramSection({ title, note, children }: TramSectionProps) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 12 }}>
      <View style={{ gap: 2 }}>
        <Typography variant="section" accessibilityRole="header">
          {title}
        </Typography>
        <Typography variant="caption" color={theme.colors.muted}>
          {note}
        </Typography>
      </View>
      {children}
    </View>
  )
}
