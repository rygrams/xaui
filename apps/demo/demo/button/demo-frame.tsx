import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The app chrome every video scene shares: the screen's own title under the status bar,
 * instead of the demo navigator's header and its theme toggle, which would be in shot.
 */
export function DemoFrame({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}) {
  const theme = useXAUITheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      testID="scene-ready"
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top + 12,
        paddingBottom: insets.bottom + 12,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ gap: 4, marginBottom: 20 }}>
        <Text
          style={{
            color: theme.colors.foreground,
            fontSize: theme.fontSizes['3xl'],
            fontWeight: theme.fontWeights.bold,
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={{ flex: 1, gap: 16 }}>{children}</View>
      {footer ? <View style={{ gap: 12 }}>{footer}</View> : null}
    </View>
  )
}

export function DemoCard({ children }: { children: ReactNode }) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius['2xl'],
        padding: 20,
        gap: 14,
        ...theme.shadows.surface,
      }}
    >
      {children}
    </View>
  )
}
