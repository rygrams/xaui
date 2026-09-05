import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '@xaui/native/button'
import { Menu } from '@xaui/native/menu'
import type { MenuPlacement } from '@xaui/native/menu'
import { useXAUITheme } from '@xaui/native/theme'

const PLACEMENTS: MenuPlacement[] = ['top', 'bottom', 'start', 'end']

/**
 * The verification screen for the `Menu`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it, only one for the placement
 * arithmetic it shares with the `Select` and the `Popover`.
 */
export default function MenuScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 240 }}
    >
      <Section
        title="A list of actions"
        note="Choosing a row closes the menu, after the caller's onPress has run — a handler that reads the menu's state has to run while there is still a menu. The positioning is the Popover's, hook for hook; only the offset differs, six points rather than nine, because a menu belongs to the control it drops out of."
      >
        <Actions />
      </Section>

      <Section
        title="One row can be the destructive one"
        note="variant='danger' on the row, not on the menu. It paints the title and any icon in it, and nothing else — a red row would read as an alert. The description stays muted whatever the intent: a danger row says what it does in red once, and a red sentence under it says it twice."
      >
        <Actions withDanger />
      </Section>

      <Section
        title="Headings and groups"
        note="Menu.Label is a header for a screen reader; Menu.Group announces the rows under it as a group. Neither draws anything — what separates two groups is the heading over the second one, and a rule as well would be saying it twice."
      >
        <Grouped />
      </Section>

      <Section
        title="Descriptions, and the indicator box"
        note="Menu.ItemIndicator is a fixed 20-point box at either end of a row. Its size does not depend on what is in it, so two rows whose indicators differ still line their titles up. It renders nothing on its own, unlike the Select's — a menu has no selected row to mark."
      >
        <Described />
      </Section>

      <Section
        title="The four sides"
        note="placement takes all four, as the Popover's does. Scroll so a trigger sits near an edge and open it: the panel flips to the opposite side, but only when that side has strictly more room."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {PLACEMENTS.map(placement => (
            <Actions key={placement} placement={placement} label={placement} />
          ))}
        </View>
      </Section>

      <Section
        title="A row that does not close"
        note="closesOnPress={false} for a row that toggles something the reader will want to toggle again. The count below goes up without the menu going away."
      >
        <Counter />
      </Section>
    </ScrollView>
  )
}

function Actions({
  withDanger,
  placement,
  label = 'Actions',
}: {
  withDanger?: boolean
  placement?: MenuPlacement
  label?: string
}) {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button variant="secondary" size="sm">
          {label}
        </Button>
      </Menu.Trigger>
      <Menu.Overlay />
      <Menu.Content placement={placement}>
        <Menu.Item>
          <Menu.ItemTitle>Renommer</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Item>
          <Menu.ItemTitle>Dupliquer</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Item>
          <Menu.ItemTitle>Partager</Menu.ItemTitle>
        </Menu.Item>
        {withDanger ? (
          <Menu.Item variant="danger">
            <Menu.ItemTitle>Supprimer</Menu.ItemTitle>
          </Menu.Item>
        ) : null}
      </Menu.Content>
    </Menu>
  )
}

function Grouped() {
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button variant="secondary" size="sm">
          Deux groupes
        </Button>
      </Menu.Trigger>
      <Menu.Overlay />
      <Menu.Content>
        <Menu.Label>Ce document</Menu.Label>
        <Menu.Group>
          <Menu.Item>
            <Menu.ItemTitle>Renommer</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item>
            <Menu.ItemTitle>Dupliquer</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
        <Menu.Label>Le dossier</Menu.Label>
        <Menu.Group>
          <Menu.Item>
            <Menu.ItemTitle>Tout sélectionner</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item variant="danger">
            <Menu.ItemTitle>Vider</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu>
  )
}

function Described() {
  const theme = useXAUITheme()

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button variant="secondary" size="sm">
          Avec descriptions
        </Button>
      </Menu.Trigger>
      <Menu.Overlay />
      <Menu.Content width={280}>
        <Menu.Item>
          <Menu.ItemIndicator>
            <Text style={{ color: theme.colors.overlayForeground }}>◆</Text>
          </Menu.ItemIndicator>
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
            <Menu.ItemTitle>Partager</Menu.ItemTitle>
            <Menu.ItemDescription>Un lien, valable sept jours</Menu.ItemDescription>
          </View>
        </Menu.Item>
        <Menu.Item>
          <Menu.ItemIndicator />
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
            <Menu.ItemTitle>Exporter</Menu.ItemTitle>
            <Menu.ItemDescription>PDF, Markdown ou texte brut</Menu.ItemDescription>
          </View>
        </Menu.Item>
        <Menu.Item variant="danger">
          <Menu.ItemIndicator />
          <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
            <Menu.ItemTitle>Supprimer</Menu.ItemTitle>
            <Menu.ItemDescription>Définitif, sans corbeille</Menu.ItemDescription>
          </View>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button variant="secondary" size="sm">
          {`Compté ${count} fois`}
        </Button>
      </Menu.Trigger>
      <Menu.Overlay />
      <Menu.Content>
        <Menu.Item closesOnPress={false} onPress={() => setCount(n => n + 1)}>
          <Menu.ItemTitle>Encore une</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Item onPress={() => setCount(0)}>
          <Menu.ItemTitle>Remettre à zéro, et fermer</Menu.ItemTitle>
        </Menu.Item>
      </Menu.Content>
    </Menu>
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
