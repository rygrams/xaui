import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Switch } from '@xaui/tram/switch'
import { tramTileColumns } from '@xaui/tram/theme'
import type { TramAccentName } from '@xaui/tram/theme'
import { Tile, useTile, useTileFace } from '@xaui/tram/tile'
import type { TileVariant } from '@xaui/tram/tile'
import { Typography } from '@xaui/tram/typography'
import type { TypographyProps } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const VARIANTS: TileVariant[] = ['contained', 'flat', 'surface']

/** Fixed seeds: the same photos on every run, so a screenshot can be compared. */
const photo = (seed: string, width: number, height: number) => ({
  uri: `https://picsum.photos/seed/${seed}/${width}/${height}`,
})

/** Three too light to carry white text, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

function MailIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 6h18v12H3zM3 6l9 7 9-7" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function PhoneIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4l-2 2C10 20 4 14 4 5z"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

function AlarmIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={13} r={8} stroke={color} strokeWidth={2} />
      <Path d="M12 9v4l3 2M5 4 3 6M19 4l2 2" stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function SunIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={2} />
      <Path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

/** The app's own text on a tile, in the colour that reads on that tile's fill. */
function TileText(props: TypographyProps) {
  const { foreground } = useTile()

  return <Typography color={foreground} {...props} />
}

/**
 * Where the Tram `Tile` is verified, in dark and in light: the grid and its three sizes,
 * the flip and the slide, the three variants, the tilted press, named accents, a raw
 * `color`, disabled, and the 6-column grid of a tablet.
 */
export default function TramTileScreen() {
  const theme = useXAUITheme()
  const [isLive, setIsLive] = useState(true)
  const [mail, setMail] = useState(7)
  const [opened, setOpened] = useState('aucune')
  const weather = useTileFace(4000, !isLive)
  const calendar = useTileFace(5300, !isLive)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="l'accueil"
        note="4 colonnes. Les petites tuiles s'empilent à côté de la moyenne ; l'appui incline la tuile vers le doigt."
      >
        <Tile.Grid>
          <Tile
            size="medium"
            face={weather}
            accessibilityLabel="Météo"
            onPress={() => setOpened('météo')}
          >
            <Tile.Front>
              <Tile.Icon as={SunIcon} size={40} />
              <TileText variant="pivot">29°</TileText>
              <Tile.Label>Météo</Tile.Label>
            </Tile.Front>
            <Tile.Back>
              <TileText variant="subtitle">Abidjan</TileText>
              <TileText variant="caption">Orages vers 17 h</TileText>
              <TileText variant="caption">jeu. 30° · ven. 28°</TileText>
            </Tile.Back>
          </Tile>

          <Tile
            size="small"
            accessibilityLabel="Téléphone, 2 appels manqués"
            onPress={() => setOpened('téléphone')}
          >
            <Row>
              <Tile.Icon as={PhoneIcon} />
              <Tile.Count>2</Tile.Count>
            </Row>
          </Tile>

          <Tile
            size="small"
            accessibilityLabel={`Courrier, ${mail} non lus`}
            onPress={() => setOpened('courrier')}
          >
            <Row>
              <Tile.Icon as={MailIcon} />
              <Tile.Count>{mail}</Tile.Count>
            </Row>
          </Tile>

          <Tile
            size="small"
            variant="surface"
            accessibilityLabel="Réveil, 6 h 30"
            onPress={() => setOpened('réveil')}
          >
            <Tile.Icon as={AlarmIcon} />
            <Tile.Label>06:30</Tile.Label>
          </Tile>

          <Tile
            size="small"
            variant="flat"
            accessibilityLabel="Agenda, le 18"
            onPress={() => setOpened('agenda')}
          >
            <Tile.Count>18</Tile.Count>
            <Tile.Label>mer.</Tile.Label>
          </Tile>

          <Tile
            size="wide"
            variant="flat"
            transition="slide"
            face={calendar}
            accessibilityLabel="Calendrier"
            onPress={() => setOpened('calendrier')}
          >
            <Tile.Front>
              <TileText variant="subtitle">Revue de la Tile Tram</TileText>
              <TileText variant="caption">14:00 – 14:45 · salle Lagune</TileText>
              <Tile.Label>Calendrier</Tile.Label>
            </Tile.Front>
            <Tile.Back>
              <TileText variant="pivot">18</TileText>
              <TileText variant="caption">mercredi · novembre</TileText>
            </Tile.Back>
          </Tile>
        </Tile.Grid>

        <Typography variant="caption" color={theme.colors.muted}>
          dernière tuile ouverte : {opened}
        </Typography>
        <Row>
          <Switch isSelected={isLive} onSelectedChange={setIsLive}>
            tuiles vivantes
          </Switch>
        </Row>
        <Row>
          <Button variant="outline" size="sm" onPress={() => setMail(mail + 1)}>
            un courrier de plus
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="les images"
        note="Tile.Image remplace l'aplat : ce qui est écrit dessus passe en blanc, sur une bande noire. Une image par face — le recto peut rester un aplat. hasBand={false} retire la bande (le 3)."
      >
        <Pictures isLive={isLive} />
      </TramSection>

      <TramSection
        title="les variantes"
        note="contained : l'accent plein. flat : sa tranche douce. surface : la surface discrète."
      >
        <Tile.Grid>
          {VARIANTS.map(variant => (
            <Tile key={variant} size="medium" variant={variant}>
              <Tile.Count>12</Tile.Count>
              <Tile.Label>{variant}</Tile.Label>
            </Tile>
          ))}
        </Tile.Grid>
      </TramSection>

      <TramSection
        title="les deux passages"
        note="flip : la tuile se retourne. slide : la face monte, l'autre la suit. Animations réduites : un fondu."
      >
        <Passages />
      </TramSection>

      <TramSection
        title="accent et color"
        note="Le texte posé sur un aplat se lit toujours : noir sur lime, ambre et jaune."
      >
        <Tile.Grid>
          {ACCENTS.map(accent => (
            <Tile key={accent} size="small" accent={accent}>
              <Tile.Label>{accent}</Tile.Label>
            </Tile>
          ))}
          <Tile size="small" color="#7A3E9D">
            <Tile.Label>color</Tile.Label>
          </Tile>
          <Tile size="small" variant="flat" accent="magenta">
            <Tile.Label>flat</Tile.Label>
          </Tile>
          <Tile size="small" variant="flat" accent="yellow">
            <Tile.Label>flat</Tile.Label>
          </Tile>
        </Tile.Grid>
      </TramSection>

      <TramSection
        title="désactivée, et hors grille"
        note="Une tuile seule est un carré de la largeur qu'on lui donne ; la large est deux fois plus longue."
      >
        <Row>
          <Tile size="small" isDisabled width={72}>
            <Tile.Label>off</Tile.Label>
          </Tile>
          <Tile size="medium" width={120} variant="surface">
            <Tile.Label>120</Tile.Label>
          </Tile>
          <Tile size="wide" width={160} variant="flat">
            <Tile.Label>160 × 80</Tile.Label>
          </Tile>
        </Row>
      </TramSection>

      <TramSection
        title="une tablette"
        note="6 colonnes : la large et la moyenne tiennent sur une ligne."
      >
        <Tile.Grid columns={tramTileColumns.tablet}>
          <Tile size="wide">
            <Tile.Label>large</Tile.Label>
          </Tile>
          <Tile size="medium" variant="flat">
            <Tile.Label>moyenne</Tile.Label>
          </Tile>
          <Tile size="small" variant="surface" />
          <Tile size="small" variant="surface" />
          <Tile size="small" />
        </Tile.Grid>
      </TramSection>
    </ScrollView>
  )
}

/**
 * A picture as the fill: a cover in full, two photos turned over, a count on a photo, and
 * a plain front whose back is a photo.
 */
function Pictures({ isLive }: { isLive: boolean }) {
  const photos = useTileFace(4600, !isLive)
  const people = useTileFace(3700, !isLive)

  return (
    <Tile.Grid>
      <Tile size="wide" accessibilityLabel="Musique, Lagune">
        <Tile.Image source={photo('tram-lagune', 800, 400)} />
        <TileText variant="subtitle">Lagune</TileText>
        <Tile.Label>Musique</Tile.Label>
      </Tile>

      <Tile
        size="medium"
        face={photos}
        transition="slide"
        accessibilityLabel="Photos"
      >
        <Tile.Front>
          <Tile.Image source={photo('tram-plage', 400, 400)} />
          <Tile.Label>Photos</Tile.Label>
        </Tile.Front>
        <Tile.Back>
          <Tile.Image source={photo('tram-marche', 400, 400)} />
          <Tile.Label>Photos</Tile.Label>
        </Tile.Back>
      </Tile>

      <Tile size="small" accessibilityLabel="Messages, 3 non lus">
        <Tile.Image source={photo('tram-nuit', 200, 200)} hasBand={false} />
        <Tile.Count>3</Tile.Count>
      </Tile>

      <Tile size="small" variant="surface" accessibilityLabel="Contacts">
        <Tile.Image source={photo('tram-visage', 200, 200)} />
        <Tile.Label>Contacts</Tile.Label>
      </Tile>

      <Tile size="medium" variant="flat" face={people} accessibilityLabel="Contacts">
        <Tile.Front>
          <Tile.Count>12</Tile.Count>
          <Tile.Label>Contacts</Tile.Label>
        </Tile.Front>
        <Tile.Back>
          <Tile.Image source={photo('tram-portrait', 400, 400)} />
          <TileText variant="subtitle">Awa</TileText>
          <Tile.Label>a changé sa photo</Tile.Label>
        </Tile.Back>
      </Tile>

      <Tile size="small" isDisabled accessibilityLabel="Galerie">
        <Tile.Image source={photo('tram-galerie', 200, 200)} />
        <Tile.Label>off</Tile.Label>
      </Tile>
    </Tile.Grid>
  )
}

/** The two transitions side by side, turned by hand rather than on a cadence. */
function Passages() {
  const [isTurned, setIsTurned] = useState(false)
  const face = isTurned ? 'back' : 'front'

  return (
    <>
      <Tile.Grid>
        <Tile size="medium" face={face} onPress={() => setIsTurned(!isTurned)}>
          <Tile.Front>
            <Tile.Label>flip · recto</Tile.Label>
          </Tile.Front>
          <Tile.Back>
            <Tile.Label>flip · verso</Tile.Label>
          </Tile.Back>
        </Tile>
        <Tile
          size="medium"
          transition="slide"
          accent="emerald"
          face={face}
          onPress={() => setIsTurned(!isTurned)}
        >
          <Tile.Front>
            <Tile.Label>slide · recto</Tile.Label>
          </Tile.Front>
          <Tile.Back>
            <Tile.Label>slide · verso</Tile.Label>
          </Tile.Back>
        </Tile>
      </Tile.Grid>
      <Row>
        <Button variant="outline" size="sm" onPress={() => setIsTurned(!isTurned)}>
          retourner
        </Button>
      </Row>
    </>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
      {children}
    </View>
  )
}
