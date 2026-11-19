import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import type { TramAccentName } from '@xaui/tram/theme'
import { TimePicker } from '@xaui/tram/time-picker'
import type { TimePickerSize } from '@xaui/tram/time-picker'
import { TramSection } from '../../components/tram-section'

const SIZES: TimePickerSize[] = ['sm', 'md', 'lg']

/** Two whose squares carry black text, two white. */
const ACCENTS: TramAccentName[] = ['lime', 'yellow', 'crimson', 'teal']

const LOCALES = ['fr-FR', 'en-US', 'ko-KR'] as const

const WAKE_UP = new Date(2026, 10, 18, 6, 45)
const NOON = new Date(2026, 10, 18, 12, 0)

const readTime = (date?: Date) =>
  date
    ? date.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
    : 'rien'

/**
 * Where the Tram `TimePicker` is verified, in dark and in light: the three sizes,
 * controlled and not, the placeholder, the label and the hint, both clocks, three
 * locales and their orders, a minute step that does not divide the hour, a controlled
 * opening, invalid, disabled, named accents, a `light` wheel and the style props.
 */
export default function TramTimePickerScreen() {
  const theme = useXAUITheme()
  const [alarm, setAlarm] = useState<Date | undefined>(WAKE_UP)
  const [isOpen, setOpen] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="une heure"
        note={`Contrôlé, sur cinq minutes : ${readTime(alarm)}. Le jour est gardé, les secondes tombent ; ✕ laisse la valeur.`}
      >
        <TimePicker
          value={alarm}
          onValueChange={setAlarm}
          minuteStep={5}
          locale="fr-FR"
        >
          <TimePicker.Label>réveil</TimePicker.Label>
          <TimePicker.Field placeholder="choisir une heure" />
          <TimePicker.Content confirmLabel="ok" cancelLabel="annuler" />
          <TimePicker.Description>
            tous les jours de la semaine.
          </TimePicker.Description>
        </TimePicker>
        <View style={{ flexDirection: 'row' }}>
          <Button variant="outline" size="sm" onPress={() => setAlarm(undefined)}>
            vider
          </Button>
        </View>
      </TramSection>

      <TramSection
        title="tailles"
        note="sm, md, lg : le champ du TextField et les carrés de la page."
      >
        {SIZES.map(size => (
          <TimePicker key={size} size={size} locale="fr-FR">
            <TimePicker.Label>{size}</TimePicker.Label>
            <TimePicker.Field placeholder="choisir une heure" />
            <TimePicker.Content />
          </TimePicker>
        ))}
      </TramSection>

      <TramSection
        title="horloges et locales"
        note="24 heures en français ; 12 heures et une colonne AM / PM en anglais, la demi-journée en tête en coréen. Puis 12 heures forcées en français."
      >
        {LOCALES.map(locale => (
          <TimePicker key={locale} locale={locale} defaultValue={NOON}>
            <TimePicker.Label>{locale}</TimePicker.Label>
            <TimePicker.Field />
            <TimePicker.Content />
          </TimePicker>
        ))}
        <TimePicker locale="fr-FR" hourCycle={12} defaultValue={NOON}>
          <TimePicker.Label>fr-FR, hourCycle 12</TimePicker.Label>
          <TimePicker.Field />
          <TimePicker.Content />
        </TimePicker>
      </TramSection>

      <TramSection
        title="pas des minutes"
        note="minuteStep={7} devient 6 : dix carrés qui reviennent à 00 sans trou. 9 h 59 tombe sur 9 h 54."
      >
        <TimePicker
          locale="fr-FR"
          minuteStep={7}
          defaultValue={new Date(2026, 10, 18, 9, 59)}
        >
          <TimePicker.Label>toutes les six minutes</TimePicker.Label>
          <TimePicker.Field />
          <TimePicker.Content />
        </TimePicker>
      </TramSection>

      <TramSection
        title="ouverture contrôlée"
        note="Le bouton ouvre la page, ✓ ou ✕ la ferment."
      >
        <TimePicker isOpen={isOpen} onOpenChange={setOpen} locale="fr-FR">
          <TimePicker.Label>départ</TimePicker.Label>
          <TimePicker.Field placeholder="choisir une heure" />
          <TimePicker.Content />
        </TimePicker>
        <View style={{ flexDirection: 'row' }}>
          <Button variant="outline" size="sm" onPress={() => setOpen(true)}>
            ouvrir la page
          </Button>
        </View>
      </TramSection>

      <TramSection
        title="accents"
        note="L'aplat des carrés courants et la ligne du champ ouvert : noir sur lime et jaune, blanc sur cramoisi et sarcelle."
      >
        {ACCENTS.map(accent => (
          <TimePicker key={accent} accent={accent} locale="fr-FR">
            <TimePicker.Label>{accent}</TimePicker.Label>
            <TimePicker.Field placeholder="choisir une heure" />
            <TimePicker.Content />
          </TimePicker>
        ))}
      </TramSection>

      <TramSection
        title="états"
        note="Invalide, puis désactivé : gris, et la page ne s'ouvre pas. Puis une roue light écrite à la main, et les style props."
      >
        <TimePicker isInvalid locale="fr-FR">
          <TimePicker.Label>invalide</TimePicker.Label>
          <TimePicker.Field placeholder="choisir une heure" />
          <TimePicker.Content />
          <TimePicker.Error>une heure est demandée.</TimePicker.Error>
        </TimePicker>
        <TimePicker isDisabled defaultValue={NOON} locale="fr-FR">
          <TimePicker.Label>désactivé</TimePicker.Label>
          <TimePicker.Field />
          <TimePicker.Content />
        </TimePicker>
        <TimePicker locale="en-US" defaultValue={WAKE_UP} marginTop={8}>
          <TimePicker.Label>light</TimePicker.Label>
          <TimePicker.Field />
          <TimePicker.Content>
            <TimePicker.Wheel variant="light" isAwake />
          </TimePicker.Content>
        </TimePicker>
      </TramSection>
    </ScrollView>
  )
}
