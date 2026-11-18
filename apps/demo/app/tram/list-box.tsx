import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps, IconProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Checkbox } from '@xaui/tram/checkbox'
import { ListBox, ListBoxGroup } from '@xaui/tram/list-box'
import type { ListBoxSize } from '@xaui/tram/list-box'
import { Switch } from '@xaui/tram/switch'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: ListBoxSize[] = ['sm', 'md', 'lg']

/** The three that are pale on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const LONG = Array.from({ length: 24 }, (_, index) => `élément ${index + 1}`)

function WifiIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"
        stroke={color}
        strokeWidth={2}
      />
      <Circle cx={12} cy={19.5} r={1.5} fill={color} />
    </Svg>
  )
}

function BellIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

function LockIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

/** A chevron toward the end: flipped by the layout under RTL, as the row is. */
function NextIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="m9 5 7 7-7 7" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

/** A row that opens something: a square, a title, a description, a chevron. */
function SettingRow({
  icon,
  title,
  description,
}: {
  icon: NonNullable<IconProps['as']>
  title: string
  description?: string
}) {
  return (
    <ListBox.ItemButton onPress={() => {}}>
      <ListBox.ItemPrefix variant="square">
        <Icon as={icon} />
      </ListBox.ItemPrefix>
      <ListBox.ItemContent>
        <ListBox.ItemTitle>{title}</ListBox.ItemTitle>
        {description ? (
          <ListBox.ItemDescription>{description}</ListBox.ItemDescription>
        ) : null}
      </ListBox.ItemContent>
      <ListBox.ItemSuffix>
        <Icon as={NextIcon} />
      </ListBox.ItemSuffix>
    </ListBox.ItemButton>
  )
}

/**
 * Where the Tram `ListBox` is verified, in dark and in light: the Metro settings page —
 * the three sizes, plain and pressable rows, the prefixes and suffixes, separators, grey
 * rows and lists, a group in two sections, the accents, a raw colour, `asChild`, style
 * props, and a long list. The entrance can be replayed, and a row added and removed.
 */
export default function TramListBoxScreen() {
  const theme = useXAUITheme()
  const [entrance, setEntrance] = useState(0)
  const [hasBluetooth, setHasBluetooth] = useState(false)
  const [isWifiOn, setIsWifiOn] = useState(true)
  const [isFlightOn, setIsFlightOn] = useState(false)
  const [isLocationOn, setIsLocationOn] = useState(true)
  const [isSyncing, setIsSyncing] = useState(true)
  const [presses, setPresses] = useState(0)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 40, paddingBottom: 96 }}
    >
      <TramSection
        title="réglages"
        note="Un ListBoxGroup en deux sections. En-têtes et lignes arrivent en une seule cascade, de haut en bas, à travers les sections."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <Button size="sm" onPress={() => setEntrance(count => count + 1)}>
            {"rejouer l'entrée"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setHasBluetooth(current => !current)}
          >
            {hasBluetooth ? 'retirer bluetooth' : 'ajouter bluetooth'}
          </Button>
        </View>

        <ListBoxGroup key={entrance}>
          <ListBoxGroup.Section>
            <ListBoxGroup.Header>réseau</ListBoxGroup.Header>
            <ListBox>
              <ListBox.Item>
                <ListBox.ItemPrefix variant="square">
                  <Icon as={WifiIcon} />
                </ListBox.ItemPrefix>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Wi-Fi</ListBox.ItemTitle>
                  <ListBox.ItemDescription>
                    {isWifiOn ? 'Maison' : 'désactivé'}
                  </ListBox.ItemDescription>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>
                  <Switch
                    isSelected={isWifiOn}
                    onSelectedChange={setIsWifiOn}
                    accessibilityLabel="Wi-Fi"
                  />
                </ListBox.ItemSuffix>
              </ListBox.Item>
              {hasBluetooth ? (
                <ListBox.ItemButton key="bluetooth" onPress={() => {}}>
                  <ListBox.ItemContent>
                    <ListBox.ItemTitle>Bluetooth</ListBox.ItemTitle>
                    <ListBox.ItemDescription>
                      {"ajouté après le montage : sa hauteur s'ouvre"}
                    </ListBox.ItemDescription>
                  </ListBox.ItemContent>
                </ListBox.ItemButton>
              ) : null}
              <ListBox.ItemButton onPress={() => setIsFlightOn(on => !on)}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>mode avion</ListBox.ItemTitle>
                  <ListBox.ItemDescription>
                    toute la ligne bascule le Switch
                  </ListBox.ItemDescription>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>
                  <Switch isSelected={isFlightOn} accessibilityElementsHidden />
                </ListBox.ItemSuffix>
              </ListBox.ItemButton>
              <ListBox.ItemButton onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>données cellulaires</ListBox.ItemTitle>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>4G</ListBox.ItemSuffix>
              </ListBox.ItemButton>
            </ListBox>
            <ListBoxGroup.Footer>
              {"Le Wi-Fi se coupe quand l'écran se met en veille."}
            </ListBoxGroup.Footer>
          </ListBoxGroup.Section>

          <ListBoxGroup.Section>
            <ListBoxGroup.Header>confidentialité</ListBoxGroup.Header>
            <ListBox>
              <ListBox.Item>
                <ListBox.ItemPrefix>
                  <Checkbox
                    isSelected={isLocationOn}
                    onSelectedChange={setIsLocationOn}
                    accessibilityLabel="localisation"
                  />
                </ListBox.ItemPrefix>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>localisation</ListBox.ItemTitle>
                  <ListBox.ItemDescription>
                    la case garde son rôle et sa pression
                  </ListBox.ItemDescription>
                </ListBox.ItemContent>
              </ListBox.Item>
              <SettingRow icon={LockIcon} title="écran de verrouillage" />
              <SettingRow
                icon={BellIcon}
                title="notifications"
                description="bannières, sons"
              />
            </ListBox>
          </ListBoxGroup.Section>
        </ListBoxGroup>
      </TramSection>

      <TramSection
        title="les tailles"
        note="Lignes de 52, 64 et 80 au moins ; titre en body, subtitle, title ; description en caption, caption, body ; vignettes de 32, 40, 48."
      >
        {SIZES.map(size => (
          <ListBox key={size} size={size}>
            <SettingRow
              icon={WifiIcon}
              title={`taille ${size}`}
              description="Maison"
            />
          </ListBox>
        ))}
      </TramSection>

      <TramSection
        title="item et itembutton"
        note={`Item est inerte : aucun mouvement. ItemButton penche vers le doigt. Pressions : ${presses}`}
      >
        <ListBox hasSeparator>
          <ListBox.Item>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>version</ListBox.ItemTitle>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>10.0.14393</ListBox.ItemSuffix>
          </ListBox.Item>
          <ListBox.ItemButton onPress={() => setPresses(count => count + 1)}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>presse-moi à start puis à end</ListBox.ItemTitle>
            </ListBox.ItemContent>
          </ListBox.ItemButton>
        </ListBox>
      </TramSection>

      <TramSection
        title="titre, description"
        note="Le titre dans l'encre de la page, la description en muted dessous."
      >
        <ListBox>
          <ListBox.Item>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>titre seul</ListBox.ItemTitle>
            </ListBox.ItemContent>
          </ListBox.Item>
          <ListBox.Item>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>titre et description</ListBox.ItemTitle>
              <ListBox.ItemDescription>
                une description assez longue pour passer à la ligne sans pousser le
                suffixe hors de la ligne
              </ListBox.ItemDescription>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>valeur</ListBox.ItemSuffix>
          </ListBox.Item>
        </ListBox>
      </TramSection>

      <TramSection
        title="préfixes et suffixes"
        note="Vignette, Checkbox, rien ; texte, Switch, glyphe. Un contrôle dans un Item garde son propre rôle et son animation."
      >
        <ListBox>
          <ListBox.Item>
            <ListBox.ItemPrefix variant="square">
              <Icon as={BellIcon} />
            </ListBox.ItemPrefix>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>vignette, suffixe texte</ListBox.ItemTitle>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>activé</ListBox.ItemSuffix>
          </ListBox.Item>
          <ListBox.Item>
            <ListBox.ItemPrefix>
              <Checkbox defaultSelected accessibilityLabel="synchroniser" />
            </ListBox.ItemPrefix>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>Checkbox, suffixe Switch</ListBox.ItemTitle>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>
              <Switch
                isSelected={isSyncing}
                onSelectedChange={setIsSyncing}
                accessibilityLabel="synchronisation"
              />
            </ListBox.ItemSuffix>
          </ListBox.Item>
          <ListBox.ItemButton onPress={() => {}}>
            <ListBox.ItemPrefix>
              <Icon as={LockIcon} />
            </ListBox.ItemPrefix>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>glyphe nu, suffixe glyphe</ListBox.ItemTitle>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>
              <Icon as={NextIcon} />
            </ListBox.ItemSuffix>
          </ListBox.ItemButton>
          <ListBox.ItemButton onPress={() => {}}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>sans préfixe</ListBox.ItemTitle>
            </ListBox.ItemContent>
          </ListBox.ItemButton>
        </ListBox>
      </TramSection>

      <TramSection
        title="hasSeparator"
        note="Un trait de 2 dans le gris doux entre deux lignes. Faux par défaut : une liste Metro se lit à ses blancs."
      >
        <ListBox hasSeparator>
          <SettingRow icon={WifiIcon} title="Wi-Fi" description="Maison" />
          <SettingRow icon={BellIcon} title="notifications" />
          <SettingRow icon={LockIcon} title="verrouillage" />
        </ListBox>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Une ligne grise — sa vignette aussi — qui ne répond pas ; puis toute la liste avec isDisabled."
      >
        <ListBox>
          <SettingRow icon={WifiIcon} title="active" />
          <ListBox.ItemButton isDisabled onPress={() => {}}>
            <ListBox.ItemPrefix variant="square">
              <Icon as={LockIcon} />
            </ListBox.ItemPrefix>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>désactivée</ListBox.ItemTitle>
              <ListBox.ItemDescription>ne répond pas</ListBox.ItemDescription>
            </ListBox.ItemContent>
          </ListBox.ItemButton>
        </ListBox>
        <ListBox isDisabled>
          <SettingRow
            icon={WifiIcon}
            title="liste désactivée"
            description="Maison"
          />
          <ListBox.Item>
            <ListBox.ItemContent>
              <ListBox.ItemTitle>un Item gris aussi</ListBox.ItemTitle>
            </ListBox.ItemContent>
            <ListBox.ItemSuffix>valeur</ListBox.ItemSuffix>
          </ListBox.Item>
        </ListBox>
      </TramSection>

      <TramSection
        title="accents"
        note="accent repeint les vignettes ; le glyphe est noir sur lime, ambre et jaune."
      >
        {ACCENTS.map(accent => (
          <ListBox key={accent} accent={accent}>
            <SettingRow icon={BellIcon} title={accent} />
          </ListBox>
        ))}
      </TramSection>

      <TramSection
        title="color brut"
        note="color l'emporte sur accent et n'est jamais corrigé."
      >
        <ListBox accent="lime" color="#7c3aed">
          <SettingRow icon={WifiIcon} title="#7c3aed sur lime" />
        </ListBox>
        <ListBox color="#ffe600">
          <SettingRow
            icon={WifiIcon}
            title="#ffe600"
            description="pâle : le glyphe passe au noir"
          />
        </ListBox>
      </TramSection>

      <TramSection
        title="asChild"
        note="La racine prête son rôle et son style à un View du caller ; une ligne devient un Pressable."
      >
        <ListBox asChild hasSeparator>
          <View
            style={{
              paddingStart: 16,
              borderStartWidth: 2,
              borderColor: theme.colors.default,
            }}
          >
            <ListBox.Item asChild>
              <View>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>Item sur un View</ListBox.ItemTitle>
                </ListBox.ItemContent>
              </View>
            </ListBox.Item>
            <ListBox.ItemButton
              asChild
              onPress={() => setPresses(count => count + 1)}
            >
              <Pressable>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>ItemButton sur un Pressable</ListBox.ItemTitle>
                </ListBox.ItemContent>
              </Pressable>
            </ListBox.ItemButton>
          </View>
        </ListBox>
      </TramSection>

      <TramSection
        title="props de style"
        note="paddingHorizontal sur la racine, minHeight sur une ligne, color sur un titre."
      >
        <ListBox paddingHorizontal={12}>
          <ListBox.ItemButton minHeight={96} onPress={() => {}}>
            <ListBox.ItemContent>
              <ListBox.ItemTitle color={theme.colors.accent}>
                ligne de 96
              </ListBox.ItemTitle>
            </ListBox.ItemContent>
          </ListBox.ItemButton>
        </ListBox>
      </TramSection>

      <TramSection
        title="longue liste"
        note="Dans un ScrollView de 320 : la cascade s'arrête à cascade.most rangs, et un défilement pendant une pression rend la ligne à plat."
      >
        <ScrollView style={{ height: 320 }} nestedScrollEnabled>
          <ListBox size="sm" hasSeparator>
            {LONG.map(label => (
              <ListBox.ItemButton key={label} onPress={() => {}}>
                <ListBox.ItemContent>
                  <ListBox.ItemTitle>{label}</ListBox.ItemTitle>
                </ListBox.ItemContent>
                <ListBox.ItemSuffix>
                  <Icon as={NextIcon} />
                </ListBox.ItemSuffix>
              </ListBox.ItemButton>
            ))}
          </ListBox>
        </ScrollView>
      </TramSection>
    </ScrollView>
  )
}
