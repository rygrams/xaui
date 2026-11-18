import { useState } from 'react'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Fab } from '@xaui/tram/fab'
import type { FabPlacement, FabSize, FabVariant } from '@xaui/tram/fab'
import { tramAccents } from '@xaui/tram/theme'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: FabSize[] = ['sm', 'md', 'lg']

const VARIANTS: FabVariant[] = ['contained', 'outline']

const PLACEMENTS: FabPlacement[] = ['bottom-start', 'bottom-center', 'bottom-end']

/** The three accents that take a black glyph, and three that take a white one. */
const ACCENTS: TramAccentName[] = [
  'lime',
  'amber',
  'yellow',
  'magenta',
  'violet',
  'emerald',
]

/** The accents the screen's own `Fab` goes through: the theme's, then light and dark ones. */
const SCREEN_ACCENTS: (TramAccentName | undefined)[] = [
  undefined,
  'lime',
  'magenta',
  'yellow',
]

const RAW = '#7c3aed'

const ROWS = Array.from({ length: 40 }, (_, index) => `message ${index + 1}`)

/** How long the screen's `Fab` stays extended before it is folded mid-way, in ms. */
const INTERRUPT_AFTER = 140

function PlusIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4v16M4 12h16" stroke={color} strokeWidth={2.5} />
    </Svg>
  )
}

/**
 * Where the Tram `Fab` is verified, in dark and in light. One `Fab` floats over the whole
 * screen, driven by the buttons of the first section — variant, extended, busy, visible,
 * placement, and an extend-then-fold with no wait — over a long list; the sections under
 * them hold every still state. A `Fab` is always pinned to the bottom of its positioned
 * ancestor, so each one below sits in a `Cell` of its own: a screen in miniature.
 */
export default function TramFabScreen() {
  const theme = useXAUITheme()
  const [isExtended, setIsExtended] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [place, setPlace] = useState(1)
  const [drawing, setDrawing] = useState(0)
  const [paint, setPaint] = useState(0)
  const [count, setCount] = useState(0)

  const interrupt = () => {
    setIsExtended(true)
    setTimeout(() => setIsExtended(false), INTERRUPT_AFTER)
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 160 }}
      >
        <TramSection
          title="le Fab de l'écran"
          note={`Sa barre discrète est collée au bas de l'écran, sur la liste, et descend d'elle-même sous l'indicateur d'accueil. Appuis : ${count}`}
        >
          <Row>
            <Toggle onPress={() => setDrawing(value => (value + 1) % 2)}>
              {VARIANTS[drawing]}
            </Toggle>
            <Toggle onPress={() => setIsExtended(value => !value)}>
              {isExtended ? 'replier' : 'étendre'}
            </Toggle>
            <Toggle onPress={() => setIsLoading(value => !value)}>
              {isLoading ? 'fini' : 'charger'}
            </Toggle>
            <Toggle onPress={() => setIsVisible(value => !value)}>
              {isVisible ? 'cacher' : 'montrer'}
            </Toggle>
            <Toggle onPress={() => setPlace(value => (value + 1) % 3)}>
              {PLACEMENTS[place]}
            </Toggle>
            <Toggle onPress={interrupt}>étendre puis replier</Toggle>
            <Toggle onPress={() => setIsDisabled(value => !value)}>
              {isDisabled ? 'activer' : 'désactiver'}
            </Toggle>
            <Toggle onPress={() => setPaint(value => (value + 1) % 4)}>
              {`accent : ${SCREEN_ACCENTS[paint] ?? 'thème'}`}
            </Toggle>
          </Row>
        </TramSection>

        <TramSection
          title="les variantes"
          note="contained : un aplat du vrai accent. outline : le cercle de l'App Bar, un trait de 2 et le glyphe dans l'encre de l'accent, sans fond. Même taille."
        >
          {VARIANTS.map(variant => (
            <Row key={variant}>
              <Cell>
                <Fab
                  hasSafeArea={false}
                  variant={variant}
                  accessibilityLabel={`${variant}, thème`}
                >
                  <Fab.Icon as={PlusIcon} />
                </Fab>
              </Cell>
              {ACCENTS.map(accent => (
                <Cell key={accent} isTall>
                  <Fab
                    hasSafeArea={false}
                    variant={variant}
                    accent={accent}
                    isExtended
                  >
                    <Fab.Icon as={PlusIcon} />
                    <Fab.Label>{accent}</Fab.Label>
                  </Fab>
                </Cell>
              ))}
            </Row>
          ))}
        </TramSection>

        <TramSection
          title="les tailles"
          note="32, 40 et 48 de diamètre, un glyphe de 16, 20 et 24. Toutes se pressent comme 48 : le hitSlop fait le reste."
        >
          {VARIANTS.map(variant => (
            <Row key={variant}>
              {SIZES.map(size => (
                <Cell key={size}>
                  <Fab
                    hasSafeArea={false}
                    variant={variant}
                    size={size}
                    accessibilityLabel={`ajouter, ${size}`}
                  >
                    <Fab.Icon as={PlusIcon} />
                  </Fab>
                </Cell>
              ))}
            </Row>
          ))}
        </TramSection>

        <TramSection
          title="les placements"
          note="La barre est toujours en bas, d'un bord à l'autre ; le cercle s'y pose au début, au milieu (par défaut) ou à la fin."
        >
          {PLACEMENTS.map((placement, index) => (
            <Stage key={placement}>
              <Fab
                hasSafeArea={false}
                placement={placement}
                variant={VARIANTS[index % 2]}
                accessibilityLabel={placement}
              >
                <Fab.Icon as={PlusIcon} />
              </Fab>
            </Stage>
          ))}
        </TramSection>

        <TramSection
          title="offset"
          note="Le rembourrage de la barre sous le cercle : 0, puis 32."
        >
          <Stage>
            <Fab
              hasSafeArea={false}
              placement="bottom-start"
              offset={0}
              accessibilityLabel="offset 0"
            >
              <Fab.Icon as={PlusIcon} />
            </Fab>
          </Stage>
          <Stage>
            <Fab
              hasSafeArea={false}
              placement="bottom-end"
              offset={32}
              accessibilityLabel="offset 32"
            >
              <Fab.Icon as={PlusIcon} />
            </Fab>
          </Stage>
        </TramSection>

        <TramSection
          title="étendu"
          note="Le cercle ne s'allonge pas : le libellé se pose dessous, dans l'encre de la barre, et la barre monte d'autant. Une chaîne nue est un libellé."
        >
          <Row>
            <Cell isTall>
              <Fab hasSafeArea={false} accessibilityLabel="nouveau">
                <Fab.Icon as={PlusIcon} />
                <Fab.Label>nouveau</Fab.Label>
              </Fab>
            </Cell>
            <Cell isTall>
              <Fab hasSafeArea={false} isExtended>
                <Fab.Icon as={PlusIcon} />
                <Fab.Label>nouveau</Fab.Label>
              </Fab>
            </Cell>
            <Cell isTall>
              <Fab hasSafeArea={false} isExtended variant="outline">
                <Fab.Icon as={PlusIcon} />
                nouveau
              </Fab>
            </Cell>
            <Cell isTall>
              <Fab hasSafeArea={false} isExtended size="lg">
                <Fab.Icon as={PlusIcon} />
                <Fab.Label>un libellé bien trop long pour sa place</Fab.Label>
              </Fab>
            </Cell>
          </Row>
          <Stage>
            <Fab
              hasSafeArea={false}
              isExtended
              placement="bottom-end"
              variant="outline"
            >
              <Fab.Icon as={PlusIcon} />
              <Fab.Label>nouveau message</Fab.Label>
            </Fab>
          </Stage>
        </TramSection>

        <TramSection
          title="en charge"
          note="Fab.Spinner prend la place du glyphe, dans son encre ; le Fab ne répond plus et ne grise pas."
        >
          {VARIANTS.map(variant => (
            <Row key={variant}>
              {SIZES.map(size => (
                <Cell key={size}>
                  <Fab
                    hasSafeArea={false}
                    variant={variant}
                    size={size}
                    isLoading
                    accessibilityLabel="envoi"
                  >
                    <Fab.Icon as={PlusIcon} />
                  </Fab>
                </Cell>
              ))}
              <Cell isTall>
                <Fab
                  hasSafeArea={false}
                  variant={variant}
                  isLoading
                  isExtended
                  accent="lime"
                >
                  <Fab.Icon as={PlusIcon} />
                  <Fab.Label>envoi…</Fab.Label>
                </Fab>
              </Cell>
            </Row>
          ))}
        </TramSection>

        <TramSection
          title="désactivé"
          note="contained : un aplat gris, le glyphe dans la couleur du sol. outline : un trait et un glyphe gris. Le libellé gris. Aucune opacité."
        >
          {VARIANTS.map(variant => (
            <Row key={variant}>
              <Cell isTall>
                <Fab
                  hasSafeArea={false}
                  variant={variant}
                  isDisabled
                  accessibilityLabel="ajouter"
                >
                  <Fab.Icon as={PlusIcon} />
                </Fab>
              </Cell>
              <Cell isTall>
                <Fab
                  hasSafeArea={false}
                  variant={variant}
                  isDisabled
                  accent="lime"
                  accessibilityLabel="ajouter"
                >
                  <Fab.Icon as={PlusIcon} />
                </Fab>
              </Cell>
              <Cell isTall>
                <Fab hasSafeArea={false} variant={variant} isDisabled isExtended>
                  <Fab.Icon as={PlusIcon} />
                  <Fab.Label>nouveau</Fab.Label>
                </Fab>
              </Cell>
            </Row>
          ))}
        </TramSection>

        <TramSection
          title="sur sa propre couleur"
          note="Aucune ombre : c'est la barre discrète qui le sépare d'un contenu, même de son propre accent."
        >
          <Stage color={theme.colors.accent}>
            <Fab hasSafeArea={false} accessibilityLabel="sur l'accent du thème">
              <Fab.Icon as={PlusIcon} />
            </Fab>
          </Stage>
          <Stage color={tramAccents.lime}>
            <Fab hasSafeArea={false} accent="lime" isExtended placement="bottom-end">
              <Fab.Icon as={PlusIcon} />
              <Fab.Label>lime</Fab.Label>
            </Fab>
          </Stage>
        </TramSection>

        <TramSection
          title="color"
          note="Une teinte brute : elle l'emporte sur accent et n'est jamais corrigée — le fond du plein, le trait et le glyphe du contour."
        >
          {VARIANTS.map(variant => (
            <Row key={variant}>
              <Cell isTall>
                <Fab
                  hasSafeArea={false}
                  variant={variant}
                  color={RAW}
                  accessibilityLabel="violet brut"
                >
                  <Fab.Icon as={PlusIcon} />
                </Fab>
              </Cell>
              <Cell isTall>
                <Fab
                  hasSafeArea={false}
                  variant={variant}
                  color={RAW}
                  accent="lime"
                  isExtended
                >
                  <Fab.Icon as={PlusIcon} />
                  <Fab.Label>color</Fab.Label>
                </Fab>
              </Cell>
              <Cell isTall>
                <Fab
                  hasSafeArea={false}
                  variant={variant}
                  color="rgb(250, 240, 200)"
                  accessibilityLabel="rgb clair, non mesuré"
                >
                  <Fab.Icon as={PlusIcon} />
                </Fab>
              </Cell>
            </Row>
          ))}
        </TramSection>

        <TramSection
          title="asChild"
          note={`L'enfant est le cercle : ici un Pressable du caller. Appuis : ${count}`}
        >
          <Row>
            {VARIANTS.map(variant => (
              <Cell key={variant}>
                <Fab
                  hasSafeArea={false}
                  asChild
                  variant={variant}
                  accessibilityLabel="compter"
                >
                  <Pressable onPress={() => setCount(value => value + 1)}>
                    <Fab.Icon as={PlusIcon} />
                  </Pressable>
                </Fab>
              </Cell>
            ))}
          </Row>
        </TramSection>

        <TramSection
          title="props de style"
          note="marginStart en prop, une opacité par style : le style du caller a le dernier mot."
        >
          <Stage>
            <Fab
              hasSafeArea={false}
              placement="bottom-start"
              marginStart={32}
              style={{ opacity: 0.6 }}
              accessibilityLabel="stylé"
            >
              <Fab.Icon as={PlusIcon} />
            </Fab>
          </Stage>
        </TramSection>

        <TramSection
          title="RTL"
          note="bottom-start est à droite, bottom-end à gauche."
        >
          <Stage isRtl>
            <Fab hasSafeArea={false} isExtended placement="bottom-start">
              <Fab.Icon as={PlusIcon} />
              <Fab.Label>start</Fab.Label>
            </Fab>
          </Stage>
          <Stage isRtl>
            <Fab
              hasSafeArea={false}
              isExtended
              placement="bottom-end"
              accent="magenta"
              variant="outline"
            >
              <Fab.Icon as={PlusIcon} />
              <Fab.Label>end</Fab.Label>
            </Fab>
          </Stage>
        </TramSection>

        <TramSection
          title="sans animation"
          note="disable-all : tout est posé, l'anneau de charge est un état fixe."
        >
          <Row>
            <Cell isTall>
              <Fab
                hasSafeArea={false}
                animation="disable-all"
                isExtended={isExtended}
                accessibilityLabel="posé"
              >
                <Fab.Icon as={PlusIcon} />
                <Fab.Label>posé</Fab.Label>
              </Fab>
            </Cell>
            <Cell isTall>
              <Fab
                hasSafeArea={false}
                animation="disable-all"
                variant="outline"
                isLoading
                accessibilityLabel="envoi, fixe"
              >
                <Fab.Icon as={PlusIcon} />
              </Fab>
            </Cell>
          </Row>
        </TramSection>

        <TramSection
          title="une longue liste"
          note="Pour voir le Fab passer au-dessus du contenu qui défile."
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

      <Fab
        placement={PLACEMENTS[place]}
        variant={VARIANTS[drawing]}
        accent={SCREEN_ACCENTS[paint]}
        isExtended={isExtended}
        isLoading={isLoading}
        isVisible={isVisible}
        isDisabled={isDisabled}
        accessibilityLabel="nouveau message"
        onPress={() => setCount(value => value + 1)}
      >
        <Fab.Icon as={PlusIcon} />
        <Fab.Label>nouveau</Fab.Label>
      </Fab>
    </View>
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

type CellProps = { children: ReactNode; isTall?: boolean }

/**
 * A positioned box one `Fab` docks its bar in, along the bottom edge: room above the bar,
 * and for a label under the circle when `isTall`. One `Fab` per box — two bars would lie
 * one over the other.
 */
function Cell({ children, isTall = false }: CellProps) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        width: 104,
        height: isTall ? 120 : 96,
        // The page's ground, framed by a hairline: the bar is the discreet surface.
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.muted,
      }}
    >
      {children}
    </View>
  )
}

type StageProps = { children: ReactNode; color?: string; isRtl?: boolean }

/** A positioned box one `Fab` docks its bar in: a screen in small. */
function Stage({ children, color, isRtl = false }: StageProps) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        height: 140,
        backgroundColor: color ?? theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.muted,
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </View>
  )
}
