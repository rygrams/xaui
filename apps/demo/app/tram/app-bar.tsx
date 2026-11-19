import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { AppBar } from '@xaui/tram/app-bar'
import type {
  AppBarMode,
  AppBarPlacement,
  AppBarProps,
  AppBarSize,
} from '@xaui/tram/app-bar'
import { Button } from '@xaui/tram/button'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const PLACEMENTS: AppBarPlacement[] = ['bottom', 'top']

const MODES: AppBarMode[] = ['default', 'minimal']

const SIZES: AppBarSize[] = ['sm', 'md', 'lg']

/** The circles in the bar's ink, then in the ink of a light and of a dark accent. */
const SCREEN_ACCENTS: (TramAccentName | undefined)[] = [undefined, 'lime', 'magenta']

const RAW = '#7c3aed'

const ROWS = Array.from({ length: 40 }, (_, index) => `message ${index + 1}`)

type Glyph = (props: IconComponentProps) => ReactNode

function PlusIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4v16M4 12h16" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function SearchIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={10.5} cy={10.5} r={6} stroke={color} strokeWidth={2} />
      <Path d="M15 15l5 5" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function SyncIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12a7 7 0 0 1-12.3 4.6M5 12a7 7 0 0 1 12.3-4.6M17.5 3v4.6H13M6.5 21v-4.6H11"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

function ArchiveIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7h16v13H4zM3 4h18v3H3zM9.5 11h5" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

const BUTTONS: { glyph: Glyph; label: string }[] = [
  { glyph: PlusIcon, label: 'nouveau' },
  { glyph: SearchIcon, label: 'rechercher' },
  { glyph: SyncIcon, label: 'actualiser' },
  { glyph: ArchiveIcon, label: 'archiver' },
]

const ENTRIES = ['sélectionner', 'paramètres', 'comptes']

/**
 * Where the Tram `AppBar` is verified, in dark and in light. One bar is docked on the
 * whole screen, driven by the buttons of the first section — edge, mode, size, labels,
 * menu, accent, a disabled button, visible — over a long list; the sections under it
 * hold every still state, each in a positioned box of its own: a screen in miniature.
 */
export default function TramAppBarScreen() {
  const theme = useXAUITheme()
  const [place, setPlace] = useState(0)
  const [mode, setMode] = useState(0)
  const [size, setSize] = useState(1)
  const [count, setCount] = useState(4)
  const [hasLabels, setHasLabels] = useState(false)
  const [hasMenu, setHasMenu] = useState(true)
  const [paint, setPaint] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [last, setLast] = useState('rien')

  const isTop = PLACEMENTS[place] === 'top'

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          gap: 32,
          paddingTop: isTop ? 120 : 24,
          paddingBottom: isTop ? 48 : 200,
        }}
      >
        <TramSection
          title="la barre de l'écran"
          note={`Collée au bord de l'écran, sur la liste, sous l'indicateur d'accueil ou la barre d'état. Ouverte : ${isOpen ? 'oui' : 'non'}. Dernier appui : ${last}.`}
        >
          <Row>
            <Toggle onPress={() => setPlace(value => (value + 1) % 2)}>
              {`placement : ${PLACEMENTS[place]}`}
            </Toggle>
            <Toggle onPress={() => setMode(value => (value + 1) % 2)}>
              {`mode : ${MODES[mode]}`}
            </Toggle>
            <Toggle onPress={() => setSize(value => (value + 1) % 3)}>
              {`size : ${SIZES[size]}`}
            </Toggle>
            <Toggle onPress={() => setCount(value => (value + 1) % 5)}>
              {`boutons : ${count}`}
            </Toggle>
            <Toggle onPress={() => setHasLabels(value => !value)}>
              {hasLabels ? 'libellés : toujours' : 'libellés : ouverte'}
            </Toggle>
            <Toggle onPress={() => setHasMenu(value => !value)}>
              {hasMenu ? 'sans menu' : 'avec menu'}
            </Toggle>
            <Toggle onPress={() => setPaint(value => (value + 1) % 3)}>
              {`accent : ${SCREEN_ACCENTS[paint] ?? 'encre de la barre'}`}
            </Toggle>
            <Toggle onPress={() => setIsDisabled(value => !value)}>
              {isDisabled ? 'activer archiver' : 'désactiver archiver'}
            </Toggle>
            <Toggle onPress={() => setIsVisible(value => !value)}>
              {isVisible ? 'cacher' : 'montrer'}
            </Toggle>
            <Toggle onPress={() => setIsOpen(value => !value)}>
              {isOpen ? 'fermer' : 'ouvrir'}
            </Toggle>
          </Row>
        </TramSection>

        <TramSection
          title="en bas"
          note="La place de l'App Bar Metro : quatre cercles au trait fin, centrés, dans l'encre de la barre ; « … » au bout du bord du haut."
        >
          <Stage>
            <Bar />
          </Stage>
        </TramSection>

        <TramSection
          title="en haut"
          note="placement top : le même dessin, dans le même ordre ; ouverte, elle s'allonge vers le bas, sur la page."
        >
          <Stage>
            <Bar placement="top" />
          </Stage>
          <Stage isTall>
            <Bar placement="top" defaultOpen />
          </Stage>
        </TramSection>

        <TramSection
          title="ouverte"
          note="Les libellés sous les cercles, le menu en dessous, la page voilée. Un appui sur le voile, un bouton, une entrée ou le retour système la referme."
        >
          <Stage isTall>
            <Bar defaultOpen />
          </Stage>
        </TramSection>

        <TramSection
          title="minimal"
          note="Repliée sur une bande fine et ses trois points ; « … » déplie les cercles, leurs libellés et le menu."
        >
          <Stage>
            <Bar mode="minimal" />
          </Stage>
          <Stage>
            <Bar mode="minimal" placement="top" />
          </Stage>
        </TramSection>

        <TramSection
          title="hasLabels"
          note="Les libellés restent sous les cercles, barre fermée. Sans menu, il n'y a plus rien à découvrir : pas de « … »."
        >
          <Stage>
            <Bar hasLabels hasMenu={false} />
          </Stage>
          <Stage>
            <Bar hasLabels />
          </Stage>
        </TramSection>

        <TramSection
          title="les tailles"
          note="32, 40 et 48 de diamètre, un glyphe de 16, 20 et 24 — ceux du Fab. Toutes se pressent comme 48."
        >
          {SIZES.map(value => (
            <Stage key={value}>
              <Bar size={value} hasLabels hasMenu={false} />
            </Stage>
          ))}
        </TramSection>

        <TramSection
          title="accent et color"
          note="accent : les cercles dans l'encre de l'accent, déplacée jusqu'à se lire sur la barre (lime, jaune). color : une teinte brute, jamais corrigée."
        >
          <Stage>
            <Bar accent="lime" hasLabels hasMenu={false} />
          </Stage>
          <Stage>
            <Bar accent="yellow" hasLabels hasMenu={false} />
          </Stage>
          <Stage>
            <Bar color={RAW} accent="lime" hasLabels hasMenu={false} />
          </Stage>
        </TramSection>

        <TramSection
          title="désactivé"
          note="Un trait, un glyphe et un libellé gris ; une entrée grise. Aucune opacité."
        >
          <Stage isTall>
            <AppBar hasSafeArea={false} defaultOpen>
              {BUTTONS.slice(0, 2).map(({ glyph, label }, index) => (
                <AppBar.Button key={label} isDisabled={index === 1}>
                  <AppBar.Icon as={glyph} />
                  <AppBar.Label>{label}</AppBar.Label>
                </AppBar.Button>
              ))}
              <AppBar.Menu>
                <AppBar.MenuItem>paramètres</AppBar.MenuItem>
                <AppBar.MenuItem isDisabled>comptes</AppBar.MenuItem>
              </AppBar.Menu>
            </AppBar>
          </Stage>
        </TramSection>

        <TramSection
          title="seulement un menu"
          note="Pas de cercle : la barre est la bande fine de « … », qui ouvre le menu."
        >
          <Stage>
            <AppBar hasSafeArea={false}>
              <AppBar.Menu>
                {ENTRIES.map(entry => (
                  <AppBar.MenuItem key={entry}>{entry}</AppBar.MenuItem>
                ))}
              </AppBar.Menu>
            </AppBar>
          </Stage>
        </TramSection>

        <TramSection
          title="une chaîne nue"
          note="Une chaîne à côté du glyphe est le libellé ; un bouton sans libellé prend un accessibilityLabel."
        >
          <Stage>
            <AppBar hasSafeArea={false} hasLabels>
              <AppBar.Button>
                <AppBar.Icon as={PlusIcon} />
                nouveau
              </AppBar.Button>
              <AppBar.Button accessibilityLabel="rechercher">
                <AppBar.Icon as={SearchIcon} />
              </AppBar.Button>
              <AppBar.Button>
                <AppBar.Icon as={SyncIcon} />
                <AppBar.Label>un libellé bien trop long</AppBar.Label>
              </AppBar.Button>
            </AppBar>
          </Stage>
        </TramSection>

        <TramSection
          title="RTL"
          note="« … » au bout, donc à gauche ; les cercles dans l'ordre de lecture."
        >
          <Stage isRtl>
            <Bar hasLabels />
          </Stage>
        </TramSection>

        <TramSection
          title="sans animation"
          note="disable-all : la barre s'ouvre et se ferme sans mouvement, les cercles ne penchent pas."
        >
          <Stage isTall>
            <Bar animation="disable-all" />
          </Stage>
        </TramSection>

        <TramSection
          title="une longue liste"
          note="Pour voir la barre passer au-dessus du contenu qui défile."
        >
          {ROWS.map((row, index) => (
            <View
              key={row}
              style={{
                padding: 16,
                backgroundColor:
                  index % 5 === 2 ? theme.colors.accent : theme.colors.surface,
              }}
            >
              <Typography
                color={index % 5 === 2 ? theme.colors.accentForeground : undefined}
              >
                {row}
              </Typography>
            </View>
          ))}
        </TramSection>
      </ScrollView>

      <AppBar
        placement={PLACEMENTS[place]}
        mode={MODES[mode]}
        size={SIZES[size]}
        accent={SCREEN_ACCENTS[paint]}
        hasLabels={hasLabels}
        isVisible={isVisible}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        moreLabel="plus d'actions"
      >
        {BUTTONS.slice(0, count).map(({ glyph, label }, index) => (
          <AppBar.Button
            key={label}
            isDisabled={isDisabled && index === 3}
            onPress={() => setLast(label)}
          >
            <AppBar.Icon as={glyph} />
            <AppBar.Label>{label}</AppBar.Label>
          </AppBar.Button>
        ))}
        {hasMenu ? (
          <AppBar.Menu>
            {ENTRIES.map(entry => (
              <AppBar.MenuItem key={entry} onPress={() => setLast(entry)}>
                {entry}
              </AppBar.MenuItem>
            ))}
          </AppBar.Menu>
        ) : null}
      </AppBar>
    </View>
  )
}

type BarProps = Omit<AppBarProps, 'children' | 'hasSafeArea'> & {
  hasMenu?: boolean
}

/** The four buttons and the three entries, in a box that does not reach the screen's edge. */
function Bar({ hasMenu = true, ...props }: BarProps) {
  return (
    <AppBar hasSafeArea={false} moreLabel="plus d'actions" {...props}>
      {BUTTONS.map(({ glyph, label }) => (
        <AppBar.Button key={label}>
          <AppBar.Icon as={glyph} />
          <AppBar.Label>{label}</AppBar.Label>
        </AppBar.Button>
      ))}
      {hasMenu ? (
        <AppBar.Menu>
          {ENTRIES.map(entry => (
            <AppBar.MenuItem key={entry}>{entry}</AppBar.MenuItem>
          ))}
        </AppBar.Menu>
      ) : null}
    </AppBar>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 8,
      }}
    >
      {children}
    </View>
  )
}

function Toggle({ children, onPress }: { children: string; onPress: () => void }) {
  return (
    <Button variant="outline" size="sm" onPress={onPress}>
      {children}
    </Button>
  )
}

type StageProps = { children: ReactNode; isTall?: boolean; isRtl?: boolean }

/**
 * A positioned box one `AppBar` docks its band in: a screen in small, framed by a
 * hairline, with room over a closed bar — and for an open one when `isTall`. It clips, as
 * a screen does: a bar sent away is out of sight.
 */
function Stage({ children, isTall = false, isRtl = false }: StageProps) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        height: isTall ? 320 : 150,
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.muted,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </View>
  )
}
