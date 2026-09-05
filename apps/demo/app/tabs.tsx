import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Tabs } from '@xaui/native/tabs'
import type { TabsSize, TabsVariant } from '@xaui/native/tabs'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: TabsVariant[] = ['primary', 'secondary']
const SIZES: TabsSize[] = ['sm', 'md', 'lg']

const PANELS = [
  {
    value: 'all',
    label: 'Tout',
    body: 'Les quarante-deux messages, du plus récent au plus ancien.',
  },
  {
    value: 'unread',
    label: 'Non lus',
    body: 'Sept messages, dont trois de la même personne.',
  },
  { value: 'archived', label: 'Archivés', body: 'Rien depuis mars.' },
]

/**
 * The verification screen for the `Tabs`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the indicator slides rather than appearing,
 * the two shapes are two affordances rather than one louder, and a panel is mounted only
 * while its tab is chosen.
 */
export default function TabsScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="The indicator slides"
        note="One node moving between the triggers' measured rectangles, on a spring, on the UI thread — so it keeps travelling while whatever the new tab shows is mounting. Its first placement jumps rather than springing: animating it would slide the pill in from the start of the row on mount, which reads as the tab bar arranging itself rather than as a control at rest."
      >
        <Panels />
      </Section>

      <Section
        title="Two shapes, not two emphases"
        note="primary is the segmented control — a pill inside a filled track. secondary is the underline, a two-point rule along the bottom edge. They are different affordances rather than the same one louder, which is why the union is two rather than the usual four."
      >
        {VARIANTS.map(variant => (
          <Panels key={variant} variant={variant} />
        ))}
      </Section>

      <Section
        title="Sizes"
        note="size moves the trigger's padding, its gap and the type. The track's three-point inset does not scale: it is the gap between the pill and the track's edge, and at half a spacing step it would be two points and the pill would touch."
      >
        {SIZES.map(size => (
          <Panels key={size} size={size} hidePanels />
        ))}
      </Section>

      <Section
        title="The list hugs its tabs"
        note="alignSelf: 'flex-start' on the list, not a full-width row. A tab bar as wide as the screen with three tabs in it is a segmented control pretending to be a navigation bar. Widen it with alignSelf: 'stretch' on your side."
      >
        <Tabs defaultValue="all">
          <Tabs.List style={{ alignSelf: 'stretch' }}>
            <Tabs.Indicator />
            {PANELS.map(({ value, label }) => (
              <Tabs.Trigger key={value} value={value} style={{ flex: 1 }}>
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs>
      </Section>

      <Section
        title="A tint (R7)"
        note="color is a raw value, never a token. It lands where the shape says: the pill of a primary bar, the rule under a secondary one. The track keeps the theme's neutral, because tinting both would leave the chosen tab with nothing to stand out against."
      >
        <Panels color="#7c3aed" hidePanels />
        <Panels variant="secondary" color="#7c3aed" hidePanels />
      </Section>

      <Section
        title="No indicator at all"
        note="Tabs.Indicator is written by you, inside the list. Leave it out and the label's colour is the only thing saying which tab is chosen — which is a legitimate bar, and the reason the indicator is a slot rather than something the list conjures."
      >
        <Tabs defaultValue="all" variant="secondary">
          <Tabs.List>
            {PANELS.map(({ value, label }) => (
              <Tabs.Trigger key={value} value={value}>
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs>
      </Section>

      <Section
        title="Controlled, and disabled"
        note="Pass value and onValueChange and the root stops owning the selection. A single trigger takes isDisabled too — press it and nothing moves, including the indicator."
      >
        <Controlled />
      </Section>
    </ScrollView>
  )
}

function Panels({
  variant,
  size,
  color,
  hidePanels,
}: {
  variant?: TabsVariant
  size?: TabsSize
  color?: string
  hidePanels?: boolean
}) {
  const theme = useXAUITheme()

  return (
    <Tabs defaultValue="all" variant={variant} size={size} color={color}>
      <Tabs.List>
        <Tabs.Indicator />
        {PANELS.map(({ value, label }) => (
          <Tabs.Trigger key={value} value={value}>
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {hidePanels
        ? null
        : PANELS.map(({ value, body }) => (
            <Tabs.Content key={value} value={value}>
              <Text
                style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}
              >
                {body}
              </Text>
            </Tabs.Content>
          ))}
    </Tabs>
  )
}

function Controlled() {
  const theme = useXAUITheme()
  const [value, setValue] = useState('unread')

  return (
    <View style={{ gap: 12 }}>
      <Tabs value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Indicator />
          <Tabs.Trigger value="all">Tout</Tabs.Trigger>
          <Tabs.Trigger value="unread">Non lus</Tabs.Trigger>
          <Tabs.Trigger value="archived" isDisabled>
            Archivés
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <Text
        onPress={() => setValue('all')}
        style={{ color: theme.colors.accent, fontSize: theme.fontSizes.sm }}
      >
        {`Choisi : ${value} — remettre sur Tout`}
      </Text>
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
