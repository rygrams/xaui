import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { WheelPicker } from '@xaui/tram/wheel-picker'
import type { WheelPickerSize } from '@xaui/tram/wheel-picker'
import { TramSection } from '../../components/tram-section'

const SIZES: WheelPickerSize[] = ['sm', 'md', 'lg']

/** The three whose text is black, and two whose text is white. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const pad = (value: number) => String(value).padStart(2, '0')
const range = (from: number, count: number, by = 1) =>
  Array.from({ length: count }, (_, index) => pad(from + index * by))

const DAYS = range(1, 31)
const MONTHS = range(1, 12)
const MONTH_NAMES = [
  'janv.',
  'févr.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
]
const YEARS = Array.from({ length: 12 }, (_, index) => String(2020 + index))
const HOURS = range(0, 24)
const MINUTES = range(0, 12, 5)

/** Called, not mounted: a column counts its direct children, and only `Item`s. */
function squares(values: string[]) {
  return values.map(value => (
    <WheelPicker.Item key={value} value={value}>
      {value}
    </WheelPicker.Item>
  ))
}

/**
 * Where the Tram `WheelPicker` is verified, in dark and in light: the three sizes,
 * controlled and not, one to three columns, a date and a time, looping and not, three and
 * five squares, the `light` variant, the neighbours kept, disabled, one column disabled, named accents, a raw
 * `color`, `asChild`, the style props and a square of two lines.
 */
export default function TramWheelPickerScreen() {
  const theme = useXAUITheme()
  const [day, setDay] = useState('18')
  const [month, setMonth] = useState('11')
  const [year, setYear] = useState('2026')
  const [hour, setHour] = useState('09')
  const [minute, setMinute] = useState('30')
  const [reports, setReports] = useState(0)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="une date"
        note={`Contrôlé, trois colonnes en boucle : ${day}/${month}/${year}. Glisser, lancer, toucher un voisin ; au repos il ne reste que les carrés courants.`}
      >
        <WheelPicker>
          <WheelPicker.Column
            accessibilityLabel="jour"
            value={day}
            onValueChange={setDay}
            isLooping
          >
            {squares(DAYS)}
          </WheelPicker.Column>
          <WheelPicker.Column
            accessibilityLabel="mois"
            value={month}
            onValueChange={setMonth}
            isLooping
          >
            {squares(MONTHS)}
          </WheelPicker.Column>
          <WheelPicker.Column
            accessibilityLabel="année"
            value={year}
            onValueChange={setYear}
            isLooping
          >
            {squares(YEARS)}
          </WheelPicker.Column>
        </WheelPicker>
        <Row>
          <Button
            variant="outline"
            size="sm"
            onPress={() => {
              setDay('01')
              setMonth('01')
              setYear('2027')
            }}
          >
            1er janvier 2027
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => {
              setDay('18')
              setMonth('11')
              setYear('2026')
            }}
          >
            {"aujourd'hui"}
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="light"
        note="Aucun carré : ni aplat ni ligne, sur le courant comme sur les voisins. Seule la couleur du texte dit lequel est choisi. Puis un accent nommé, lu comme encre, et désactivé."
      >
        <WheelPicker variant="light" isAwake>
          <WheelPicker.Column accessibilityLabel="jour" defaultValue="18" isLooping>
            {squares(DAYS)}
          </WheelPicker.Column>
          <WheelPicker.Column accessibilityLabel="mois" defaultValue="11" isLooping>
            {squares(MONTHS)}
          </WheelPicker.Column>
          <WheelPicker.Column
            accessibilityLabel="année"
            defaultValue="2026"
            isLooping
          >
            {squares(YEARS)}
          </WheelPicker.Column>
        </WheelPicker>
        <Row>
          <WheelPicker
            variant="light"
            accent="yellow"
            size="sm"
            visibleCount={3}
            isAwake
          >
            <WheelPicker.Column
              accessibilityLabel="jaune"
              defaultValue="15"
              isLooping
            >
              {squares(MINUTES)}
            </WheelPicker.Column>
          </WheelPicker>
          <WheelPicker variant="light" size="sm" visibleCount={3} isAwake isDisabled>
            <WheelPicker.Column accessibilityLabel="désactivé" defaultValue="15">
              {squares(MINUTES)}
            </WheelPicker.Column>
          </WheelPicker>
          <WheelPicker variant="light" size="sm" visibleCount={3}>
            <WheelPicker.Column
              accessibilityLabel="au repos"
              defaultValue="15"
              isLooping
            >
              {squares(MINUTES)}
            </WheelPicker.Column>
          </WheelPicker>
        </Row>
      </TramSection>

      <TramSection
        title="une heure"
        note={`Deux colonnes, les minutes par 5, toujours éveillé : ${hour}:${minute}. Le bouton avance la valeur de l'extérieur.`}
      >
        <WheelPicker isAwake visibleCount={3}>
          <WheelPicker.Column
            accessibilityLabel="heures"
            value={hour}
            onValueChange={setHour}
            isLooping
          >
            {squares(HOURS)}
          </WheelPicker.Column>
          <WheelPicker.Column
            accessibilityLabel="minutes"
            value={minute}
            onValueChange={setMinute}
            isLooping
          >
            {squares(MINUTES)}
          </WheelPicker.Column>
        </WheelPicker>
        <Row>
          <Button
            variant="outline"
            size="sm"
            onPress={() => setMinute(after(MINUTES, minute, 1))}
          >
            + 5 min
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => setHour(after(HOURS, hour, 7))}
          >
            + 7 h
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — des carrés de 64, 84 et 104, non contrôlés, sans boucle."
      >
        <Row>
          {SIZES.map(size => (
            <WheelPicker key={size} size={size} visibleCount={3} isAwake>
              <WheelPicker.Column accessibilityLabel={size} defaultValue="05">
                {squares(MINUTES)}
              </WheelPicker.Column>
            </WheelPicker>
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="non contrôlé"
        note={`Une colonne, defaultValue, sans boucle : elle s'arrête à ses deux bouts. onValueChange ne part qu'à l'arrêt — ${reports} fois.`}
      >
        <WheelPicker>
          <WheelPicker.Column
            accessibilityLabel="mois"
            defaultValue="06"
            onValueChange={() => setReports(count => count + 1)}
          >
            {squares(MONTHS)}
          </WheelPicker.Column>
        </WheelPicker>
      </TramSection>

      <TramSection
        title="visibleCount"
        note="3 puis 5 — le courant au milieu. Un compte pair est arrondi à l'impair au-dessus."
      >
        <Row>
          <WheelPicker visibleCount={3} isAwake>
            <WheelPicker.Column
              accessibilityLabel="trois"
              defaultValue="12"
              isLooping
            >
              {squares(DAYS)}
            </WheelPicker.Column>
          </WheelPicker>
          <WheelPicker visibleCount={5} size="sm" isAwake>
            <WheelPicker.Column
              accessibilityLabel="cinq"
              defaultValue="12"
              isLooping
            >
              {squares(DAYS)}
            </WheelPicker.Column>
          </WheelPicker>
        </Row>
      </TramSection>

      <TramSection
        title="trop court pour boucler"
        note="isLooping sur cinq carrés pour cinq visibles, puis sur six : il en faut un de plus que de visibles. La première colonne garde ses bouts, la seconde tourne."
      >
        <WheelPicker size="sm" isAwake>
          <WheelPicker.Column
            accessibilityLabel="cinq carrés"
            defaultValue="02"
            isLooping
          >
            {squares(range(0, 5))}
          </WheelPicker.Column>
          <WheelPicker.Column
            accessibilityLabel="six carrés"
            defaultValue="02"
            isLooping
          >
            {squares(range(0, 6))}
          </WheelPicker.Column>
        </WheelPicker>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Le carré courant est gris, sans accent, et la roue ne tourne pas. Puis une seule colonne désactivée : les autres tournent."
      >
        <Row>
          <WheelPicker isDisabled visibleCount={3} size="sm" isAwake>
            <WheelPicker.Column accessibilityLabel="heures" defaultValue="09">
              {squares(HOURS)}
            </WheelPicker.Column>
            <WheelPicker.Column accessibilityLabel="minutes" defaultValue="30">
              {squares(MINUTES)}
            </WheelPicker.Column>
          </WheelPicker>
          <WheelPicker visibleCount={3} size="sm" isAwake>
            <WheelPicker.Column
              accessibilityLabel="heures"
              defaultValue="09"
              isLooping
            >
              {squares(HOURS)}
            </WheelPicker.Column>
            <WheelPicker.Column
              accessibilityLabel="minutes"
              defaultValue="30"
              isDisabled
            >
              {squares(MINUTES)}
            </WheelPicker.Column>
          </WheelPicker>
        </Row>
      </TramSection>

      <TramSection
        title="accent"
        note="L'aplat est la vraie couleur ; le texte est noir sur lime, ambre et jaune, blanc sur les autres."
      >
        <Row>
          {ACCENTS.map(accent => (
            <WheelPicker key={accent} accent={accent} size="sm" visibleCount={3}>
              <WheelPicker.Column
                accessibilityLabel={accent}
                defaultValue="15"
                isLooping
              >
                {squares(MINUTES)}
              </WheelPicker.Column>
            </WheelPicker>
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — elle l'emporte sur accent et n'est jamais corrigée."
      >
        <WheelPicker
          color={theme.colors.danger}
          accent="lime"
          visibleCount={3}
          isAwake
        >
          <WheelPicker.Column
            accessibilityLabel="minutes"
            defaultValue="45"
            isLooping
          >
            {squares(MINUTES)}
          </WheelPicker.Column>
        </WheelPicker>
      </TramSection>

      <TramSection
        title="deux lignes"
        note="Un Item à deux lignes est une composition : une Typography imbriquée, même avec un variant, prend la couleur du carré."
      >
        <WheelPicker size="lg" visibleCount={3} isAwake>
          <WheelPicker.Column accessibilityLabel="mois" defaultValue="11" isLooping>
            {MONTHS.map((value, index) => (
              <WheelPicker.Item key={value} value={value}>
                {value}
                {'\n'}
                <Typography variant="caption">{MONTH_NAMES[index]}</Typography>
              </WheelPicker.Item>
            ))}
          </WheelPicker.Column>
        </WheelPicker>
      </TramSection>

      <TramSection
        title="asChild et props de style"
        note="La racine est l'élément du caller ; padding, alignSelf et opacity en props de style sur la racine, la colonne et un carré."
      >
        <WheelPicker
          asChild
          visibleCount={3}
          isAwake
          padding={12}
          alignSelf="flex-start"
        >
          <View
            accessibilityLabel="le wheel picker, rendu par une View du caller"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <WheelPicker.Column
              accessibilityLabel="étage"
              defaultValue="02"
              isLooping
              opacity={0.9}
            >
              {DAYS.map(value => (
                <WheelPicker.Item
                  key={value}
                  value={value}
                  paddingStart={value === '02' ? 16 : undefined}
                >
                  {value}
                </WheelPicker.Item>
              ))}
            </WheelPicker.Column>
          </View>
        </WheelPicker>
      </TramSection>

      <Typography variant="caption" color={theme.colors.muted}>
        {"fin de l'écran"}
      </Typography>
    </ScrollView>
  )
}

/** The value `by` squares after `current`, round the end. */
function after(values: string[], current: string, by: number): string {
  return values[(values.indexOf(current) + by) % values.length] ?? current
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {children}
    </View>
  )
}
