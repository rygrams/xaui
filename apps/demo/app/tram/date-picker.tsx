import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { DatePicker } from '@xaui/tram/date-picker'
import type { DatePickerSize } from '@xaui/tram/date-picker'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: DatePickerSize[] = ['sm', 'md', 'lg']

/** Two whose squares carry black text, two white. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'magenta', 'cobalt']

const LOCALES = ['fr-FR', 'en-US', 'ja-JP'] as const

const BIRTHDAY = new Date(1994, 2, 31)
const FIRST = new Date(2026, 10, 1)
const LAST = new Date(2026, 11, 31)

const readDay = (date?: Date) =>
  date ? date.toLocaleDateString('fr-FR', { dateStyle: 'full' }) : 'rien'

/**
 * Where the Tram `DatePicker` is verified, in dark and in light: the three sizes,
 * controlled and not, the placeholder, the label and the hint, a controlled opening,
 * three locales and their orders, bounds, the end of a month, invalid, disabled, a back
 * that does not close, named accents, a raw `color`, a `light` wheel kept awake, a field
 * written by hand, `asChild` and the style props.
 */
export default function TramDatePickerScreen() {
  const theme = useXAUITheme()
  const [birthday, setBirthday] = useState<Date | undefined>(BIRTHDAY)
  const [deadline, setDeadline] = useState<Date>()
  const [isOpen, setOpen] = useState(false)
  const [reports, setReports] = useState(0)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="une date"
        note={`Contrôlé : ${readDay(birthday)}, ${reports} ✓. Le 31 mars tourné vers février tombe sur son dernier jour ; ✕ et le retour laissent la valeur.`}
      >
        <DatePicker
          value={birthday}
          onValueChange={next => {
            setBirthday(next)
            setReports(count => count + 1)
          }}
          locale="fr-FR"
        >
          <DatePicker.Label>naissance</DatePicker.Label>
          <DatePicker.Field placeholder="choisir une date" />
          <DatePicker.Content confirmLabel="ok" cancelLabel="annuler" />
          <DatePicker.Description>jour, mois, année.</DatePicker.Description>
        </DatePicker>
        <Row>
          <Button variant="outline" size="sm" onPress={() => setBirthday(undefined)}>
            vider
          </Button>
          <Button variant="outline" size="sm" onPress={() => setBirthday(BIRTHDAY)}>
            31 mars 1994
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="tailles"
        note="sm, md, lg : le champ du TextField et, sur la page, les carrés 64 / 84 / 104."
      >
        {SIZES.map(size => (
          <DatePicker key={size} size={size} locale="fr-FR">
            <DatePicker.Label>{size}</DatePicker.Label>
            <DatePicker.Field placeholder="choisir une date" />
            <DatePicker.Content />
          </DatePicker>
        ))}
      </TramSection>

      <TramSection
        title="locales"
        note="Les colonnes dans l'ordre de la locale : jour-mois-année, mois-jour-année, année-mois-jour. Le champ suit la même locale."
      >
        {LOCALES.map(locale => (
          <DatePicker key={locale} locale={locale} defaultValue={FIRST}>
            <DatePicker.Label>{locale}</DatePicker.Label>
            <DatePicker.Field />
            <DatePicker.Content />
          </DatePicker>
        ))}
      </TramSection>

      <TramSection
        title="bornes"
        note={`Du 1er novembre au 31 décembre 2026 : une seule année, et un jour hors bornes revient au plus proche. ${readDay(deadline)}.`}
      >
        <DatePicker
          value={deadline}
          onValueChange={setDeadline}
          minValue={FIRST}
          maxValue={LAST}
          locale="fr-FR"
          isInvalid={deadline === undefined}
        >
          <DatePicker.Label>échéance</DatePicker.Label>
          <DatePicker.Field placeholder="avant la fin de l'année" />
          <DatePicker.Content />
          {deadline === undefined ? (
            <DatePicker.Error>une échéance est demandée.</DatePicker.Error>
          ) : null}
        </DatePicker>
      </TramSection>

      <TramSection
        title="ouverture contrôlée"
        note="Le bouton ouvre la page ; le retour système ne la ferme pas (isDismissable={false}), seuls ✓ et ✕ le font."
      >
        <DatePicker isOpen={isOpen} onOpenChange={setOpen} locale="fr-FR">
          <DatePicker.Label>départ</DatePicker.Label>
          <DatePicker.Field placeholder="choisir une date" />
          <DatePicker.Overlay isDismissable={false} />
          <DatePicker.Content />
        </DatePicker>
        <Row>
          <Button variant="outline" size="sm" onPress={() => setOpen(true)}>
            ouvrir la page
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="accents"
        note="Un accent nommé : la ligne du champ ouvert, lue comme encre, et l'aplat des carrés courants, le texte en noir sur lime et ambre. Puis une couleur brute."
      >
        {ACCENTS.map(accent => (
          <DatePicker key={accent} accent={accent} locale="fr-FR">
            <DatePicker.Label>{accent}</DatePicker.Label>
            <DatePicker.Field placeholder="choisir une date" />
            <DatePicker.Content />
          </DatePicker>
        ))}
        <DatePicker color="#8E44AD" locale="fr-FR">
          <DatePicker.Label>#8E44AD</DatePicker.Label>
          <DatePicker.Field placeholder="choisir une date" />
          <DatePicker.Content />
        </DatePicker>
      </TramSection>

      <TramSection
        title="roue light, éveillée"
        note="La roue de la page s'écrit à la main : variant light, voisins gardés, trois carrés visibles."
      >
        <DatePicker locale="fr-FR" defaultValue={FIRST}>
          <DatePicker.Label>rendez-vous</DatePicker.Label>
          <DatePicker.Field />
          <DatePicker.Content>
            <DatePicker.Wheel variant="light" isAwake visibleCount={3} />
          </DatePicker.Content>
        </DatePicker>
      </TramSection>

      <TramSection
        title="états"
        note="Désactivé : gris, sans s'atténuer, et la page ne s'ouvre pas. Puis un champ écrit à la main, et asChild."
      >
        <DatePicker isDisabled defaultValue={FIRST} locale="fr-FR">
          <DatePicker.Label>désactivé</DatePicker.Label>
          <DatePicker.Field />
          <DatePicker.Content />
        </DatePicker>
        <DatePicker locale="fr-FR" defaultValue={LAST}>
          <DatePicker.Label>à la main</DatePicker.Label>
          <DatePicker.Trigger>
            <DatePicker.Value placeholder="choisir une date" />
            <Typography variant="caption" color={theme.colors.muted}>
              modifier
            </Typography>
          </DatePicker.Trigger>
          <DatePicker.Content />
        </DatePicker>
        <DatePicker asChild locale="fr-FR" marginTop={8}>
          <View style={{ gap: 4 }}>
            <DatePicker.Label>asChild, style props</DatePicker.Label>
            <DatePicker.Field placeholder="choisir une date" />
            <DatePicker.Content />
          </View>
        </DatePicker>
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {children}
    </View>
  )
}
