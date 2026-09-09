import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ListBox, ListBoxGroup } from '@xaui/native/list-box'
import type { ListBoxSize, ListBoxVariant } from '@xaui/native/list-box'
import { Switch } from '@xaui/native/switch'
import { ChevronDownIcon, Icon } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ListBoxVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: ListBoxSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `ListBox`. A component is verified here and in the docs
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
        <ListBox>
          <ListBox.ItemButton onPress={() => {}}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Informations personnelles</ListBox.ItemTitle>
              <ListBox.ItemDescription>
                Nom, e-mail, téléphone
              </ListBox.ItemDescription>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>
              <Chevron />
            </ListBox.ItemSuffix>
          </ListBox.ItemButton>
          <ListBox.ItemButton onPress={() => {}}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Moyens de paiement</ListBox.ItemTitle>
              <ListBox.ItemDescription>
                Visa se terminant par 4829
              </ListBox.ItemDescription>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>
              <Chevron />
            </ListBox.ItemSuffix>
          </ListBox.ItemButton>
          <ListBox.ItemButton onPress={() => {}}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Sécurité</ListBox.ItemTitle>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>
              <Chevron />
            </ListBox.ItemSuffix>
          </ListBox.ItemButton>
        </ListBox>
      </Section>

      <Section
        title="A plain row does nothing, and shows nothing"
        note="A list is not necessarily a list of buttons. The Wi-Fi row below is a ListBox.Item — a View, with no press state and no wash, because a row that lights up under a finger it never responds to is a promise the component does not keep. The row under it is a ListBox.ItemButton, used in its place. The suffix draws nothing of its own either: the trailing end of a settings row is a Switch at least as often as a chevron."
      >
        <ListBox>
          <ListBox.Item>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Wi-Fi</ListBox.ItemTitle>
              <ListBox.ItemDescription>
                {isOn ? 'Maison' : 'Désactivé'}
              </ListBox.ItemDescription>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>
              <Switch isSelected={isOn} onSelectedChange={setOn} size="sm" />
            </ListBox.ItemSuffix>
          </ListBox.Item>
          <ListBox.ItemButton onPress={() => {}}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Bluetooth</ListBox.ItemTitle>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>
              <Value>Activé</Value>
            </ListBox.ItemSuffix>
          </ListBox.ItemButton>
        </ListBox>
      </Section>

      <Section
        title="A ladder, and ghost runs to the edge"
        note="The Accordion's four, because a list is that container with rows that do not open. ghost has no edge for its separators to be inset from, so its rows run the full width and the hairline runs with them — the difference between a list in a box and a list on a page."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 8 }}>
            <Value>{variant}</Value>
            <ListBox variant={variant}>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Première ligne</ListBox.ItemTitle>
                </ListBox.ItemContent>
              </ListBox.ItemButton>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Seconde ligne</ListBox.ItemTitle>
                </ListBox.ItemContent>
              </ListBox.ItemButton>
            </ListBox>
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
            <ListBox size={size} variant="secondary">
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Notifications</ListBox.ItemTitle>
                  <ListBox.ItemDescription>
                    Sons, badges, aperçus
                  </ListBox.ItemDescription>
                </ListBox.ItemContent>
              </ListBox.ItemButton>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Confidentialité</ListBox.ItemTitle>
                </ListBox.ItemContent>
              </ListBox.ItemButton>
            </ListBox>
          </View>
        ))}
      </Section>

      <Section
        title="A tint, no separators, a disabled row"
        note="color is a raw value, never a token — it paints the ground and the press wash with it. hasSeparator={false} leaves the rows to run together, and isDisabled on a row stops it alone."
      >
        <ListBox color="#7c3aed" hasSeparator={false}>
          <ListBox.ItemButton onPress={() => {}}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Teintée</ListBox.ItemTitle>
            </ListBox.ItemContent>
          </ListBox.ItemButton>
          <ListBox.ItemButton onPress={() => {}} isDisabled>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Désactivée</ListBox.ItemTitle>
              <ListBox.ItemDescription>Ne répond pas</ListBox.ItemDescription>
            </ListBox.ItemContent>
          </ListBox.ItemButton>
        </ListBox>
      </Section>
      <Section
        title="ListBoxGroup — sections, each under what its rows have in common"
        note="It is a group of Lists rather than a ListBox with headings inside it: our ListBox draws its container and its separators between its own children, so a heading among the rows would get a hairline above and below it and would sit inside the card it names."
      >
        <ListBoxGroup>
          <ListBoxGroup.Section>
            <ListBoxGroup.Header>Réseau</ListBoxGroup.Header>
            <ListBox>
              <ListBox.Item>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Wi-Fi</ListBox.ItemTitle>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>
                  <Switch isSelected={isOn} onSelectedChange={setOn} />
                </ListBox.ItemSuffix>
              </ListBox.Item>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Bluetooth</ListBox.ItemTitle>
                  <ListBox.ItemDescription>
                    Deux appareils connectés
                  </ListBox.ItemDescription>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>
                  <Chevron />
                </ListBox.ItemSuffix>
              </ListBox.ItemButton>
            </ListBox>
            <ListBoxGroup.Footer>
              Le Wi-Fi se coupe en veille pour économiser la batterie.
            </ListBoxGroup.Footer>
          </ListBoxGroup.Section>

          <ListBoxGroup.Section>
            <ListBoxGroup.Header>Confidentialité</ListBoxGroup.Header>
            <ListBox>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Localisation</ListBox.ItemTitle>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>
                  <Chevron />
                </ListBox.ItemSuffix>
              </ListBox.ItemButton>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Suivi</ListBox.ItemTitle>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>
                  <Chevron />
                </ListBox.ItemSuffix>
              </ListBox.ItemButton>
            </ListBox>
          </ListBoxGroup.Section>
        </ListBoxGroup>
      </Section>

      <Section
        title="The group hands its lists their appearance"
        note="variant, size, radius, color and hasSeparator are defaults — the second section names its own variant and keeps it. The header is inset by the row's own padding, so the heading and the text it heads share a left edge."
      >
        <ListBoxGroup variant="tertiary" size="sm" color="#7c3aed">
          <ListBoxGroup.Section>
            <ListBoxGroup.Header>Du groupe</ListBoxGroup.Header>
            <ListBox>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>
                    tertiary, sm, teinte violette
                  </ListBox.ItemTitle>
                </ListBox.ItemContent>
              </ListBox.ItemButton>
            </ListBox>
          </ListBoxGroup.Section>
          <ListBoxGroup.Section>
            <ListBoxGroup.Header>À elle</ListBoxGroup.Header>
            <ListBox variant="primary" hasSeparator={false}>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>variant=&quot;primary&quot;</ListBox.ItemTitle>
                </ListBox.ItemContent>
              </ListBox.ItemButton>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>et sans filet</ListBox.ItemTitle>
                </ListBox.ItemContent>
              </ListBox.ItemButton>
            </ListBox>
          </ListBoxGroup.Section>
        </ListBoxGroup>
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
