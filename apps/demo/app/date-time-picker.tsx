import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DateTimePicker } from '@xaui/native/date-time-picker'
import type { DateTimePickerStep } from '@xaui/native/date-time-picker'
import { useXAUITheme } from '@xaui/native/theme'

const STEP_LABELS: Record<DateTimePickerStep, string> = {
  date: 'Date',
  time: 'Heure',
}

/**
 * The verification screen for the `DateTimePicker`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 */
export default function DateTimePickerScreen() {
  const theme = useXAUITheme()
  const [moment, setMoment] = useState<Date | undefined>()
  const [twelve, setTwelve] = useState<Date | undefined>(
    new Date(2026, 8, 17, 14, 30)
  )
  const [inline, setInline] = useState<Date | undefined>(
    new Date(2026, 8, 17, 9, 40)
  )
  const [step, setStep] = useState<DateTimePickerStep>('date')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Deux étapes, pas deux champs"
        note="Un moment est une seule valeur, donc une seule commande — et un calendrier et une horloge ne tiennent pas ensemble sur un téléphone, d'où le tour de rôle. Choisir un jour passe à l'horloge, exactement comme les heures passent aux minutes dans le TimePicker, et choisir les minutes referme la feuille."
      >
        <DateTimePicker locale="fr-FR" value={moment} onValueChange={setMoment}>
          <DateTimePicker.Trigger>
            <DateTimePicker.Value placeholder="Choisir un moment" />
            <DateTimePicker.Indicator />
          </DateTimePicker.Trigger>
          <DateTimePicker.Sheet
            stepLabels={STEP_LABELS}
            previousLabel="Mois précédent"
            nextLabel="Mois suivant"
          />
        </DateTimePicker>

        <Read label="value" value={moment} />
      </Section>

      <Section
        title="Chaque moitié garde l'autre"
        note="Un jour choisi après une heure garde l'heure, et une heure choisie après un jour garde le jour : la valeur est un moment qu'on resserre, pas deux valeurs qu'on collecte. Celui-ci part du 17 septembre à 14 h 30 — changez le jour et regardez l'heure rester."
      >
        <DateTimePicker locale="en-US" value={twelve} onValueChange={setTwelve}>
          <DateTimePicker.Trigger>
            <DateTimePicker.Value placeholder="Pick a moment" />
            <DateTimePicker.Indicator />
          </DateTimePicker.Trigger>
          <DateTimePicker.Sheet
            stepLabels={{ date: 'Date', time: 'Time' }}
            previousLabel="Previous month"
            nextLabel="Next month"
          />
        </DateTimePicker>

        <Read label="value" value={twelve} />
      </Section>

      <Section
        title="Les trois pièces, sans la feuille"
        note="Steps, Calendar et Clock sont ce que la feuille assemble quand on ne lui donne pas d'enfants. Les écrire soi-même permet un titre au-dessus ou une rangée de confirmation en dessous — et c'est aussi la façon de vérifier les deux étapes sans rien ouvrir. La barre d'onglets est un Tabs et non un stepper : chaque moitié se change à tout moment."
      >
        <DateTimePicker
          locale="fr-FR"
          value={inline}
          onValueChange={setInline}
          step={step}
          onStepChange={setStep}
          closeOnSelect={false}
        >
          <View style={{ gap: 16, alignItems: 'center' }}>
            <DateTimePicker.Steps labels={STEP_LABELS} />
            {step === 'date' ? (
              <DateTimePicker.Calendar
                previousLabel="Mois précédent"
                nextLabel="Mois suivant"
              />
            ) : (
              <DateTimePicker.Clock />
            )}
          </View>
        </DateTimePicker>

        <Read label="value" value={inline} />
      </Section>

      <Section
        title="Le champ est un déclencheur de Select"
        note="Il ne possède rien du tout : le déclencheur est celui d'un Select, les deux étapes sont un Tabs, le mois est un Calendar et le cadran est un TimePicker — quatre composants rendus tels quels plutôt que quatre tables redites. Il n'a aucune recette à lui."
      >
        {(['primary', 'secondary', 'tertiary', 'ghost'] as const).map(variant => (
          <DateTimePicker key={variant} variant={variant} locale="fr-FR">
            <DateTimePicker.Trigger>
              <DateTimePicker.Value placeholder={variant} />
              <DateTimePicker.Indicator />
            </DateTimePicker.Trigger>
            <DateTimePicker.Sheet stepLabels={STEP_LABELS} />
          </DateTimePicker>
        ))}

        <DateTimePicker isInvalid locale="fr-FR">
          <DateTimePicker.Trigger>
            <DateTimePicker.Value placeholder="Moment requis" />
            <DateTimePicker.Indicator />
          </DateTimePicker.Trigger>
          <DateTimePicker.Sheet stepLabels={STEP_LABELS} />
        </DateTimePicker>

        <DateTimePicker
          isDisabled
          defaultValue={new Date(2026, 8, 17, 9, 0)}
          locale="fr-FR"
        >
          <DateTimePicker.Trigger>
            <DateTimePicker.Value />
            <DateTimePicker.Indicator />
          </DateTimePicker.Trigger>
          <DateTimePicker.Sheet stepLabels={STEP_LABELS} />
        </DateTimePicker>
      </Section>
    </ScrollView>
  )
}

function Read({ label, value }: { label: string; value: Date | undefined }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {label} :{' '}
      {value === undefined
        ? 'undefined'
        : value.toISOString().slice(0, 16).replace('T', ' ')}
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
