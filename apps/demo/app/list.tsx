import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { List } from '@xaui/native/list'
import type { ListSize, ListVariant } from '@xaui/native/list'
import { Switch } from '@xaui/native/switch'
import { ChevronDownIcon, Icon } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ListVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: ListSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `List`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function ListScreen() {
  const theme = useXAUITheme()
  const [isOn, setOn] = useState(true)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 96 }}
    >
      <Section
        title="Rows on a ground"
        note="The separators are the root's, drawn between the children rather than by them — a row that drew its own would draw one under the last one too, and every list would start by hiding it. The fill is the root's for the same reason: a row painting its own would stack two where the hairline sits."
      >
        <List>
          <List.Item onPress={() => {}}>
            <List.ItemContent>
              <List.ItemTitle>Informations personnelles</List.ItemTitle>
              <List.ItemDescription>Nom, e-mail, téléphone</List.ItemDescription>
            </List.ItemContent>
            <List.ItemSuffix>
              <Chevron />
            </List.ItemSuffix>
          </List.Item>
          <List.Item onPress={() => {}}>
            <List.ItemContent>
              <List.ItemTitle>Moyens de paiement</List.ItemTitle>
              <List.ItemDescription>Visa se terminant par 4829</List.ItemDescription>
            </List.ItemContent>
            <List.ItemSuffix>
              <Chevron />
            </List.ItemSuffix>
          </List.Item>
          <List.Item onPress={() => {}}>
            <List.ItemContent>
              <List.ItemTitle>Sécurité</List.ItemTitle>
            </List.ItemContent>
            <List.ItemSuffix>
              <Chevron />
            </List.ItemSuffix>
          </List.Item>
        </List>
      </Section>

      <Section
        title="The suffix draws nothing of its own"
        note="HeroUI puts a chevron there by default. The trailing end of a settings row is a Switch at least as often, and a slot that guesses makes you pass a child in order to render nothing. A row that toggles carries the control that toggles it — which is also why this list has no selectionMode."
      >
        <List>
          <List.Item>
            <List.ItemContent>
              <List.ItemTitle>Wi-Fi</List.ItemTitle>
              <List.ItemDescription>
                {isOn ? 'Maison' : 'Désactivé'}
              </List.ItemDescription>
            </List.ItemContent>
            <List.ItemSuffix>
              <Switch isSelected={isOn} onSelectedChange={setOn} size="sm" />
            </List.ItemSuffix>
          </List.Item>
          <List.Item onPress={() => {}}>
            <List.ItemContent>
              <List.ItemTitle>Bluetooth</List.ItemTitle>
            </List.ItemContent>
            <List.ItemSuffix>
              <Value>Activé</Value>
            </List.ItemSuffix>
          </List.Item>
        </List>
      </Section>

      <Section
        title="A ladder, and ghost runs to the edge"
        note="The Accordion's four, because a list is that container with rows that do not open. ghost has no edge for its separators to be inset from, so its rows run the full width and the hairline runs with them — the difference between a list in a box and a list on a page."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 8 }}>
            <Value>{variant}</Value>
            <List variant={variant}>
              <List.Item onPress={() => {}}>
                <List.ItemContent>
                  <List.ItemTitle>Première ligne</List.ItemTitle>
                </List.ItemContent>
              </List.Item>
              <List.Item onPress={() => {}}>
                <List.ItemContent>
                  <List.ItemTitle>Seconde ligne</List.ItemTitle>
                </List.ItemContent>
              </List.Item>
            </List>
          </View>
        ))}
      </Section>

      <Section
        title="Sizes move the inset, the type and the corner"
        note="The corner sits one level below the Card's at every step: a card wraps its content with padding on all four sides so a large corner curves through empty space, where a list's rows run edge to edge and the same corner would curve through the first row's own text."
      >
        {SIZES.map(size => (
          <View key={size} style={{ gap: 8 }}>
            <Value>{size}</Value>
            <List size={size} variant="secondary">
              <List.Item onPress={() => {}}>
                <List.ItemContent>
                  <List.ItemTitle>Notifications</List.ItemTitle>
                  <List.ItemDescription>Sons, badges, aperçus</List.ItemDescription>
                </List.ItemContent>
              </List.Item>
              <List.Item onPress={() => {}}>
                <List.ItemContent>
                  <List.ItemTitle>Confidentialité</List.ItemTitle>
                </List.ItemContent>
              </List.Item>
            </List>
          </View>
        ))}
      </Section>

      <Section
        title="A tint, no separators, a disabled row"
        note="color is a raw value, never a token — it paints the ground and the press wash with it. hasSeparator={false} leaves the rows to run together, and isDisabled on a row stops it alone."
      >
        <List color="#7c3aed" hasSeparator={false}>
          <List.Item onPress={() => {}}>
            <List.ItemContent>
              <List.ItemTitle>Teintée</List.ItemTitle>
            </List.ItemContent>
          </List.Item>
          <List.Item onPress={() => {}} isDisabled>
            <List.ItemContent>
              <List.ItemTitle>Désactivée</List.ItemTitle>
              <List.ItemDescription>Ne répond pas</List.ItemDescription>
            </List.ItemContent>
          </List.Item>
        </List>
      </Section>
    </ScrollView>
  )
}

/**
 * The chevron the library ships, turned to point along the row. The turn is on a wrapper
 * because `Icon` renders the caller's own node and takes no style of its own.
 */
function Chevron() {
  return (
    <View style={{ transform: [{ rotate: '-90deg' }] }}>
      <Icon as={ChevronDownIcon} />
    </View>
  )
}

function Value({ children }: { children: string }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
      {children}
    </Text>
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
