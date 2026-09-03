import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { Portal, PortalHost } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for P1.4. The point of a portal is that it escapes a clipping,
 * stacking parent — so the trigger below sits inside one deliberately.
 */
export default function PortalScreen() {
  const theme = useXAUITheme()

  return (
    <PortalHost>
      <ScrollView
        style={{ backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: 16, gap: 24, paddingBottom: 48 }}
      >
        <Text style={{ color: theme.colors.foreground }}>
          The card below clips its children and sits under a sibling. An overlay
          rendered inside it would be cut off and painted beneath; through a portal
          it covers everything.
        </Text>

        <View
          style={{
            height: 120,
            padding: 12,
            overflow: 'hidden',
            borderRadius: theme.radius.lg,
            borderWidth: theme.borderWidth.default,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          }}
        >
          <Trigger />
        </View>

        <View
          style={{
            height: 80,
            borderRadius: theme.radius.lg,
            backgroundColor: theme.colors.accentSoft,
            justifyContent: 'center',
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: theme.colors.foreground }}>
            A sibling painted after the card — the overlay must cover this too.
          </Text>
        </View>
      </ScrollView>
    </PortalHost>
  )
}

function Trigger() {
  const theme = useXAUITheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Pressable
        accessibilityRole="button"
        onPress={() => setIsOpen(true)}
        style={{
          height: theme.controlHeights.md,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.accent,
        }}
      >
        <Text style={{ color: theme.colors.accentForeground }}>
          Open through a portal
        </Text>
      </Pressable>

      {isOpen && (
        <Portal>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close"
            onPress={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              start: 0,
              end: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.backdrop,
            }}
          >
            <View
              style={{
                padding: 24,
                borderRadius: theme.radius.xl,
                backgroundColor: theme.colors.overlay,
              }}
            >
              <Text style={{ color: theme.colors.overlayForeground }}>
                Rendered at the host. Tap to close.
              </Text>
            </View>
          </Pressable>
        </Portal>
      )}
    </>
  )
}
