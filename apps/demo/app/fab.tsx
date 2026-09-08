import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Fab, useFab } from '@xaui/native/fab'
import type { FabProps } from '@xaui/native/fab'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<FabProps['variant']>
type FabScale = NonNullable<FabProps['size']>

const VARIANTS: Variant[] = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'success',
  'success-soft',
  'warning',
  'warning-soft',
  'danger',
  'danger-soft',
]
const SIZES: FabScale[] = ['sm', 'md', 'lg']

/** A plus, drawn from two bars, so the screen needs no icon set. */
function Plus() {
  // What an `Icon` does: the size and the colour come from the FAB, not from here.
  const { icon } = useFab()
  const size = icon.size ?? 24
  const bar = Math.max(2, Math.round(size / 10))

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: size * 0.72,
          height: bar,
          borderRadius: bar,
          backgroundColor: icon.color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: bar,
          height: size * 0.72,
          borderRadius: bar,
          backgroundColor: icon.color,
        }}
      />
    </View>
  )
}

/**
 * The verification screen for the `Fab`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function FabScreen() {
  const theme = useXAUITheme()
  const [busy, setBusy] = useState(false)
  const [chosen, setChosen] = useState<string | null>(null)

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 140 }}
      >
        <Fab.Menu>
          <Fab.Menu.Trigger placement="bottom-end" accessibilityLabel="Nouveau">
            <Fab.Icon as={Plus} />
          </Fab.Menu.Trigger>
          <Fab.Menu.Overlay />
          <Fab.Menu.Content>
            <Fab.Menu.Item>Nouveau message</Fab.Menu.Item>
            <Fab.Menu.Item>Nouveau libellé</Fab.Menu.Item>
            <Fab.Menu.Item>Nouveau dossier</Fab.Menu.Item>
          </Fab.Menu.Content>
        </Fab.Menu>
      </ScrollView>
    </View>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 12 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {note}
      </Text>
      {children}
    </View>
  )
}
