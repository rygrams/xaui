import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { DateTimePicker } from '@xaui/tram/date-time-picker'
import type {
  DateTimePickerSize,
  DateTimePickerStep,
} from '@xaui/tram/date-time-picker'
import { Tabs } from '@xaui/tram/tabs'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: DateTimePickerSize[] = ['sm', 'md', 'lg']

/** Two whose squares carry black text, two white. */
const ACCENTS: TramAccentName[] = ['lime', 'yellow', 'crimson', 'teal']

const LOCALES = ['fr-FR', 'en-US', 'ja-JP'] as const

const LABELS = { date: 'date', time: 'heure' }

const MEETING = new Date(2026, 10, 18, 14, 30)
const OPENS = new Date(2026, 10, 18, 9, 0)
const CLOSES = new Date(2026, 10, 20, 18, 0)

const readMoment = (date?: Date) =>
  date
    ? date.toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })
    : 'rien'

/**
 * Where the Tram `DateTimePicker` is verified, in dark and in light: a controlled moment
 * and its steps, the three sizes, three locales and both clocks, bounds to the minute, a
 * controlled step, a controlled opening, named accents, invalid, disabled, `light`
 * wheels written by hand and the style props.
 */
export default function TramDateTimePickerScreen() {
  const theme = useXAUITheme()
  const [meeting, setMeeting] = useState<Date | undefined>(MEETING)
  const [step, setStep] = useState<DateTimePickerStep>('date')
  const [isOpen, setOpen] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="un moment"
        note={`Contrôlé, sur cinq minutes : ${readMoment(meeting)}. La page s'ouvre sur la date ; chaque titre lit sa moitié, un jour tourné garde l'heure, une heure tournée garde le jour. ✓ prend les deux, ✕ laisse la valeur.`}
      >
        <DateTimePicker
          value={meeting}
          onValueChange={setMeeting}
          minuteStep={5}
          locale="fr-FR"
        >
          <DateTimePicker.Label>rendez-vous</DateTimePicker.Label>
          <DateTimePicker.Field placeholder="choisir un moment" />
          <DateTimePicker.Content confirmLabel="ok" cancelLabel="annuler">
            <DateTimePicker.Steps labels={LABELS} />
          </DateTimePicker.Content>
          <DateTimePicker.Description>
            le jour, puis l&apos;heure.
          </DateTimePicker.Description>
        </DateTimePicker>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button variant="outline" size="sm" onPress={() => setMeeting(undefined)}>
            vider
          </Button>
          <Button variant="outline" size="sm" onPress={() => setMeeting(MEETING)}>
            18 nov., 14 h 30
          </Button>
        </View>
      </TramSection>

      <TramSection
        title="tailles"
        note="sm, md, lg : le champ du TextField et les carrés de la page ; les titres restent sm."
      >
        {SIZES.map(size => (
          <DateTimePicker key={size} size={size} locale="fr-FR">
            <DateTimePicker.Label>{size}</DateTimePicker.Label>
            <DateTimePicker.Field placeholder="choisir un moment" />
            <DateTimePicker.Content />
          </DateTimePicker>
        ))}
      </TramSection>

      <TramSection
        title="locales et horloges"
        note="Le champ et les colonnes dans l'ordre de la locale : 24 heures en français, 12 heures et AM / PM en anglais, l'année en tête en japonais. Puis 12 heures forcées en français."
      >
        {LOCALES.map(locale => (
          <DateTimePicker key={locale} locale={locale} defaultValue={MEETING}>
            <DateTimePicker.Label>{locale}</DateTimePicker.Label>
            <DateTimePicker.Field />
            <DateTimePicker.Content />
          </DateTimePicker>
        ))}
        <DateTimePicker locale="fr-FR" hourCycle={12} defaultValue={MEETING}>
          <DateTimePicker.Label>fr-FR, hourCycle 12</DateTimePicker.Label>
          <DateTimePicker.Field />
          <DateTimePicker.Content />
        </DateTimePicker>
      </TramSection>

      <TramSection
        title="bornes"
        note="Du 18 nov. 9 h au 20 nov. 18 h, au quart d'heure : avant 9 h le 18, la roue revient à 9 h ; après 18 h le 20, à 18 h."
      >
        <DateTimePicker
          locale="fr-FR"
          minValue={OPENS}
          maxValue={CLOSES}
          minuteStep={15}
          defaultValue={OPENS}
        >
          <DateTimePicker.Label>créneau</DateTimePicker.Label>
          <DateTimePicker.Field />
          <DateTimePicker.Content />
        </DateTimePicker>
      </TramSection>

      <TramSection
        title="étape et ouverture contrôlées"
        note={`Étape : ${step}. Le bouton ouvre la page directement sur l'heure ; elle se rouvre toujours sur la date une fois fermée.`}
      >
        <DateTimePicker
          isOpen={isOpen}
          onOpenChange={setOpen}
          step={step}
          onStepChange={setStep}
          locale="fr-FR"
        >
          <DateTimePicker.Label>départ</DateTimePicker.Label>
          <DateTimePicker.Field placeholder="choisir un moment" />
          <DateTimePicker.Content>
            <DateTimePicker.Steps labels={LABELS} />
          </DateTimePicker.Content>
        </DateTimePicker>
        <View style={{ flexDirection: 'row' }}>
          <Button
            variant="outline"
            size="sm"
            onPress={() => {
              setStep('time')
              setOpen(true)
            }}
          >
            ouvrir sur l&apos;heure
          </Button>
        </View>
      </TramSection>

      <TramSection
        title="accents"
        note="L'aplat des carrés courants et la ligne du champ ouvert : noir sur lime et jaune, blanc sur cramoisi et sarcelle."
      >
        {ACCENTS.map(accent => (
          <DateTimePicker key={accent} accent={accent} locale="fr-FR">
            <DateTimePicker.Label>{accent}</DateTimePicker.Label>
            <DateTimePicker.Field placeholder="choisir un moment" />
            <DateTimePicker.Content />
          </DateTimePicker>
        ))}
      </TramSection>

      <TramSection
        title="états"
        note="Invalide, puis désactivé : gris, et la page ne s'ouvre pas. Puis des roues light écrites à la main, et les style props."
      >
        <DateTimePicker isInvalid locale="fr-FR">
          <DateTimePicker.Label>invalide</DateTimePicker.Label>
          <DateTimePicker.Field placeholder="choisir un moment" />
          <DateTimePicker.Content />
          <DateTimePicker.Error>un moment est demandé.</DateTimePicker.Error>
        </DateTimePicker>
        <DateTimePicker isDisabled defaultValue={MEETING} locale="fr-FR">
          <DateTimePicker.Label>désactivé</DateTimePicker.Label>
          <DateTimePicker.Field />
          <DateTimePicker.Content />
        </DateTimePicker>
        <DateTimePicker locale="fr-FR" defaultValue={MEETING} marginTop={8}>
          <DateTimePicker.Label>light</DateTimePicker.Label>
          <DateTimePicker.Field />
          <DateTimePicker.Content>
            <DateTimePicker.Steps labels={LABELS}>
              <Tabs.Content value="date">
                <DateTimePicker.DateWheel variant="light" isAwake />
              </Tabs.Content>
              <Tabs.Content value="time">
                <DateTimePicker.TimeWheel variant="light" isAwake />
              </Tabs.Content>
            </DateTimePicker.Steps>
          </DateTimePicker.Content>
        </DateTimePicker>
      </TramSection>
    </ScrollView>
  )
}
