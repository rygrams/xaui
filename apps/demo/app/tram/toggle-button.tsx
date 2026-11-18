import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import type { TramAccentName } from '@xaui/tram/theme'
import { ToggleButton } from '@xaui/tram/toggle-button'
import type { ToggleButtonSize } from '@xaui/tram/toggle-button'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: ToggleButtonSize[] = ['sm', 'md', 'lg']

/** The three that take black text on their fill, and one that does not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'cobalt']

const DAYS = ['lun', 'mar', 'mer', 'jeu', 'ven']

/** Milliseconds before the second toggle: the fade is on its way, not yet there. */
const INTERRUPT_AFTER = 120

function StarIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="miter"
      />
    </Svg>
  )
}

function StarFilledIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />
    </Svg>
  )
}

function bars(rows: [number, number][]) {
  return function BarsIcon({ size, color }: IconComponentProps) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {rows.map(([from, to], index) => (
          <Path
            key={index}
            d={`M${from} ${6 + index * 6}H${to}`}
            stroke={color}
            strokeWidth={2}
          />
        ))}
      </Svg>
    )
  }
}

const AlignStartIcon = bars([
  [3, 21],
  [3, 15],
  [3, 18],
])
const AlignCenterIcon = bars([
  [3, 21],
  [6, 18],
  [4.5, 19.5],
])
const AlignEndIcon = bars([
  [3, 21],
  [9, 21],
  [6, 21],
])

function GridIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

function ListIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

/**
 * Where the Tram `ToggleButton` is verified, in dark and in light: the three sizes,
 * controlled and not, text, icon and text, icon only, `outline` and `text`, both disabled
 * states, a glyph per state, accents and a raw `color`, `asChild`, style props — then the
 * group: of texts, of icons, vertical, controlled, with a disabled button, disabled,
 * stretched, of two and of five, in RTL. A button toggles a controlled one twice in a row,
 * to film the fade being interrupted.
 */
export default function TramToggleButtonScreen() {
  const theme = useXAUITheme()
  const [isBold, setBold] = useState(false)
  const [isFlashing, setFlashing] = useState(false)
  const [view, setView] = useState('liste')

  const toggleTwice = () => {
    setFlashing(current => !current)
    setTimeout(() => setFlashing(current => !current), INTERRUPT_AFTER)
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="40, 48 et 56 de haut ; le texte et les paddings du Button. sm atteint 48 par son hitSlop."
      >
        {SIZES.map(size => (
          <View key={size} style={{ flexDirection: 'row', gap: 12 }}>
            <ToggleButton size={size}>{size}</ToggleButton>
            <ToggleButton size={size} defaultSelected>
              choisi
            </ToggleButton>
          </View>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé et non contrôlé"
        note={`isSelected et onSelectedChange : ${isBold ? 'gras' : 'normal'}. À côté, defaultSelected.`}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ToggleButton isSelected={isBold} onSelectedChange={setBold}>
            gras
          </ToggleButton>
          <ToggleButton defaultSelected>italique</ToggleButton>
        </View>
      </TramSection>

      <TramSection
        title="interruption"
        note="Le bouton bascule le ToggleButton contrôlé deux fois, à 120 ms d'écart : le second fondu repart de la couleur courante."
      >
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <ToggleButton isSelected={isFlashing} onSelectedChange={setFlashing}>
            fondu
          </ToggleButton>
          <Button variant="text" onPress={toggleTwice}>
            basculer deux fois
          </Button>
        </View>
      </TramSection>

      <TramSection
        title="texte, icône et texte, icône seule"
        note="isIconOnly : une boîte carrée de 48 de côté, avec son accessibilityLabel."
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ToggleButton>texte</ToggleButton>
          <ToggleButton defaultSelected>
            <ToggleButton.Icon as={StarIcon} />
            <ToggleButton.Label>favori</ToggleButton.Label>
          </ToggleButton>
          <ToggleButton isIconOnly accessibilityLabel="favori">
            <ToggleButton.Icon as={StarIcon} />
          </ToggleButton>
        </View>
      </TramSection>

      <TramSection
        title="outline et text"
        note="En text, pas de boîte : le choisi s'écrit dans l'accent lu comme encre."
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ToggleButton variant="outline" defaultSelected>
            outline
          </ToggleButton>
          <ToggleButton variant="text">text</ToggleButton>
          <ToggleButton variant="text" defaultSelected>
            text choisi
          </ToggleButton>
        </View>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Relâché : trait et texte gris. Choisi : un aplat gris, le texte dans la couleur du sol. Pas d'opacité."
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ToggleButton isDisabled>relâché</ToggleButton>
          <ToggleButton isDisabled defaultSelected>
            choisi
          </ToggleButton>
          <ToggleButton isDisabled variant="text" defaultSelected>
            text
          </ToggleButton>
        </View>
      </TramSection>

      <TramSection
        title="fonction de rendu"
        note="Un glyphe par état : l'étoile vide, puis pleine. L'icône ne change rien d'elle-même."
      >
        <ToggleButton>
          {({ isSelected }) => (
            <>
              <ToggleButton.Icon as={isSelected ? StarFilledIcon : StarIcon} />
              <ToggleButton.Label>
                {isSelected ? 'suivi' : 'suivre'}
              </ToggleButton.Label>
            </>
          )}
        </ToggleButton>
      </TramSection>

      <TramSection
        title="accents et color"
        note="Le texte en onAccent : noir sur lime, ambre et jaune. Un color brut l'emporte et n'est jamais corrigé."
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {ACCENTS.map(accent => (
            <ToggleButton key={accent} accent={accent} defaultSelected>
              {accent}
            </ToggleButton>
          ))}
          <ToggleButton color="#7C3AED" defaultSelected>
            #7C3AED
          </ToggleButton>
          <ToggleButton accent="yellow" variant="text" defaultSelected>
            jaune en text
          </ToggleButton>
        </View>
      </TramSection>

      <TramSection
        title="asChild"
        note="Le ToggleButton donne son rôle, son état et ses couleurs à l'élément du caller."
      >
        <ToggleButton asChild>
          <Pressable testID="as-child-toggle">
            <ToggleButton.Label>à moi</ToggleButton.Label>
          </Pressable>
        </ToggleButton>
      </TramSection>

      <TramSection
        title="props de style"
        note="marginStart, paddingHorizontal et style passent après la recette."
      >
        <ToggleButton
          marginStart={24}
          paddingHorizontal={32}
          style={{ minWidth: 200 }}
        >
          large
        </ToggleButton>
      </TramSection>

      <TramSection
        title="un Group de textes"
        note="Une seule boîte : le cadre et les barres dans l'encre, l'aplat jusqu'au cadre et aux barres."
      >
        <ToggleButton.Group defaultValue="semaine">
          <ToggleButton value="jour">jour</ToggleButton>
          <ToggleButton value="semaine">semaine</ToggleButton>
          <ToggleButton value="mois">mois</ToggleButton>
        </ToggleButton.Group>
        {SIZES.map(size => (
          <ToggleButton.Group key={size} size={size} defaultValue="b">
            <ToggleButton value="a">{size}</ToggleButton>
            <ToggleButton value="b">choisi</ToggleButton>
            <ToggleButton value="c">autre</ToggleButton>
          </ToggleButton.Group>
        ))}
      </TramSection>

      <TramSection
        title="un Group d'icônes"
        note="Des cases carrées, chacune nommée."
      >
        <ToggleButton.Group defaultValue="start">
          <ToggleButton
            value="start"
            isIconOnly
            accessibilityLabel="aligner au début"
          >
            <ToggleButton.Icon as={AlignStartIcon} />
          </ToggleButton>
          <ToggleButton value="center" isIconOnly accessibilityLabel="centrer">
            <ToggleButton.Icon as={AlignCenterIcon} />
          </ToggleButton>
          <ToggleButton value="end" isIconOnly accessibilityLabel="aligner à la fin">
            <ToggleButton.Icon as={AlignEndIcon} />
          </ToggleButton>
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="un Group vertical"
        note="Les barres sont horizontales, les labels alignés à start."
      >
        <ToggleButton.Group orientation="vertical" defaultValue="wifi">
          <ToggleButton value="wifi">wi-fi seulement</ToggleButton>
          <ToggleButton value="all">tous les réseaux</ToggleButton>
          <ToggleButton value="never">jamais</ToggleButton>
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="un Group contrôlé"
        note={`value et onValueChange. Vue : ${view}. Toucher la case choisie ne la relâche pas.`}
      >
        <ToggleButton.Group value={view} onValueChange={setView}>
          <ToggleButton value="liste">
            <ToggleButton.Icon as={ListIcon} />
            <ToggleButton.Label>liste</ToggleButton.Label>
          </ToggleButton>
          <ToggleButton value="grille">
            <ToggleButton.Icon as={GridIcon} />
            <ToggleButton.Label>grille</ToggleButton.Label>
          </ToggleButton>
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="désactivés dans un Group"
        note="Un bouton désactivé : son texte en gris, le cadre reste dans l'encre. Un Group désactivé : cadre, barres et textes gris."
      >
        <ToggleButton.Group defaultValue="a">
          <ToggleButton value="a">actif</ToggleButton>
          <ToggleButton value="b" isDisabled>
            désactivé
          </ToggleButton>
          <ToggleButton value="c">actif</ToggleButton>
        </ToggleButton.Group>
        <ToggleButton.Group defaultValue="b" isDisabled>
          <ToggleButton value="a">un</ToggleButton>
          <ToggleButton value="b">deux</ToggleButton>
          <ToggleButton value="c">trois</ToggleButton>
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="un Group étiré"
        note="alignSelf stretch : les cases se partagent la largeur à parts égales. Le Group, large, penche de tilt.wideDegrees."
      >
        <ToggleButton.Group defaultValue="tous" alignSelf="stretch">
          <ToggleButton value="tous">tous</ToggleButton>
          <ToggleButton value="lus">lus</ToggleButton>
          <ToggleButton value="non lus">non lus</ToggleButton>
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="deux et cinq"
        note="Une barre entre chaque paire, aucune au bout."
      >
        <ToggleButton.Group defaultValue="oui">
          <ToggleButton value="oui">oui</ToggleButton>
          <ToggleButton value="non">non</ToggleButton>
        </ToggleButton.Group>
        <ToggleButton.Group defaultValue="mer" size="sm">
          {DAYS.map(day => (
            <ToggleButton key={day} value={day}>
              {day}
            </ToggleButton>
          ))}
        </ToggleButton.Group>
      </TramSection>

      <TramSection
        title="accents dans un Group"
        note="Le Group transmet accent et color ; celui d'un bouton l'emporte."
      >
        {(['lime', 'amber', 'yellow'] as const).map(accent => (
          <ToggleButton.Group key={accent} accent={accent} defaultValue="b">
            <ToggleButton value="a">{accent}</ToggleButton>
            <ToggleButton value="b">choisi</ToggleButton>
            <ToggleButton value="c" color="#7C3AED">
              color
            </ToggleButton>
          </ToggleButton.Group>
        ))}
      </TramSection>

      <TramSection
        title="RTL"
        note="Le Group part de la droite ; les flèches suivent l'écran."
      >
        <View style={{ direction: 'rtl', alignItems: 'flex-start' }}>
          <ToggleButton.Group defaultValue="un">
            <ToggleButton value="un">un</ToggleButton>
            <ToggleButton value="deux">deux</ToggleButton>
            <ToggleButton value="trois">trois</ToggleButton>
          </ToggleButton.Group>
        </View>
        <Typography variant="caption" color={theme.colors.muted}>
          « un » est au début, à droite.
        </Typography>
      </TramSection>
    </ScrollView>
  )
}
