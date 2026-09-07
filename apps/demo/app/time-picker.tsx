import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TimePicker } from '@xaui/native/time-picker'
import type { TimePickerProps } from '@xaui/native/time-picker'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<TimePickerProps['variant']>
type PickerSize = NonNullable<TimePickerProps['size']>

const VARIANTS: Variant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: PickerSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `TimePicker`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function TimePickerScreen() {
  const theme = useXAUITheme()
  const [chosen, setChosen] = useState<Date | undefined>()
  const [twelve, setTwelve] = useState<Date | undefined>(
    new Date(2024, 0, 1, 14, 30)
  )
  const [quarters, setQuarters] = useState<Date | undefined>()
  const [inline, setInline] = useState<Date | undefined>(
    new Date(2024, 0, 1, 21, 40)
  )
  const [inlineTwelve, setInlineTwelve] = useState<Date | undefined>(
    new Date(2024, 0, 1, 9, 5)
  )

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Vingt-quatre heures, deux anneaux"
        note="1–12 à l'extérieur et 13–00 à l'intérieur : c'est la seule façon de faire tenir vingt-quatre nombres sur un cercle sans que les étiquettes se touchent. On appuie sur la marque, pas sur le cadran — un glissement demanderait un reconnaisseur de geste et un test de collision contre un angle mobile, et une pression sur un nombre ne demande ni l'un ni l'autre."
      >
        <TimePicker locale="fr-FR" value={chosen} onValueChange={setChosen}>
          <TimePicker.Trigger>
            <TimePicker.Value placeholder="Choisir une heure" />
            <TimePicker.Indicator />
          </TimePicker.Trigger>
          <TimePicker.Sheet />
        </TimePicker>

        <Read label="value" value={chosen} />
      </Section>

      <Section
        title="Douze heures, et les deux moitiés du jour"
        note="Ici la période est un contrôle à deux moitiés plutôt qu'une bascule, contrairement au TimeField : il y a la place, et un lecteur qui choisit une heure à partir de rien doit voir les deux options plutôt qu'appuyer sur l'une pour trouver l'autre."
      >
        <TimePicker locale="en-US" value={twelve} onValueChange={setTwelve}>
          <TimePicker.Trigger>
            <TimePicker.Value placeholder="Pick a time" />
            <TimePicker.Indicator />
          </TimePicker.Trigger>
          <TimePicker.Sheet />
        </TimePicker>

        <Read label="value" value={twelve} />
      </Section>

      <Section
        title="Un pas sur les minutes"
        note="minuteStep grossit l'anneau des minutes, pour un sélecteur qui ne veut que des quarts d'heure. Les minutes montrent soixante marques et douze étiquettes par défaut : un nombre à chaque minute est une bavure, une marque à chaque minute est ce qui fait croire au lecteur qu'il peut choisir 07 aussi bien que 05."
      >
        <TimePicker
          locale="fr-FR"
          minuteStep={15}
          value={quarters}
          onValueChange={setQuarters}
        >
          <TimePicker.Trigger>
            <TimePicker.Value placeholder="Par quart d’heure" />
            <TimePicker.Indicator />
          </TimePicker.Trigger>
          <TimePicker.Sheet />
        </TimePicker>

        <Read label="value" value={quarters} />
      </Section>

      <Section
        title="Le cadran, sans la feuille"
        note="Display et Clock sont deux pièces composables : la feuille sans enfants les assemble, et les écrire soi-même permet un titre au-dessus ou une rangée de confirmation en dessous. Ici elles sont posées à même l'écran, ce qui est aussi la façon de vérifier le cadran sans ouvrir quoi que ce soit."
      >
        <TimePicker
          locale="fr-FR"
          value={inline}
          onValueChange={setInline}
          closeOnSelect={false}
        >
          <View style={{ alignItems: 'center', gap: 16 }}>
            <TimePicker.Display />
            <TimePicker.Clock />
          </View>
        </TimePicker>

        <Read label="value" value={inline} />
      </Section>

      <Section
        title="Douze heures, sans la feuille non plus"
        note="Les deux moitiés du jour à droite des deux nombres, et l'anneau intérieur qui disparaît : sur douze heures il n'y a que douze nombres à placer."
      >
        <TimePicker
          locale="en-US"
          value={inlineTwelve}
          onValueChange={setInlineTwelve}
          closeOnSelect={false}
        >
          <View style={{ alignItems: 'center', gap: 16 }}>
            <TimePicker.Display />
            <TimePicker.Clock />
          </View>
        </TimePicker>

        <Read label="value" value={inlineTwelve} />
      </Section>

      <Section
        title="Le champ est un déclencheur de Select"
        note="Les mêmes jetons, les mêmes quatre niveaux de champ, le même traitement du focus et de l'invalide — par construction et non par ressemblance, donc un select et un champ d'heure dans un même formulaire ne peuvent pas diverger. variant habille le champ et n'atteint jamais le cadran, qui n'est pas un champ."
      >
        {VARIANTS.map(variant => (
          <TimePicker key={variant} variant={variant} locale="fr-FR">
            <TimePicker.Trigger>
              <TimePicker.Value placeholder={variant} />
              <TimePicker.Indicator />
            </TimePicker.Trigger>
            <TimePicker.Sheet />
          </TimePicker>
        ))}
      </Section>

      <Section
        title="Les tailles"
        note="La hauteur du champ, et la boîte du cadran."
      >
        {SIZES.map(size => (
          <TimePicker key={size} size={size} locale="fr-FR">
            <TimePicker.Trigger>
              <TimePicker.Value placeholder={size} />
              <TimePicker.Indicator />
            </TimePicker.Trigger>
            <TimePicker.Sheet />
          </TimePicker>
        ))}
      </Section>

      <Section
        title="Teinté, invalide, désactivé"
        note="color est une valeur brute (R7) et va sur la marque choisie, l'aiguille et le moyeu."
      >
        <TimePicker
          color="#e11d48"
          locale="fr-FR"
          defaultValue={new Date(2024, 0, 1, 9, 40)}
        >
          <TimePicker.Trigger>
            <TimePicker.Value />
            <TimePicker.Indicator />
          </TimePicker.Trigger>
          <TimePicker.Sheet />
        </TimePicker>

        <TimePicker isInvalid locale="fr-FR">
          <TimePicker.Trigger>
            <TimePicker.Value placeholder="Heure requise" />
            <TimePicker.Indicator />
          </TimePicker.Trigger>
          <TimePicker.Sheet />
        </TimePicker>

        <TimePicker
          isDisabled
          locale="fr-FR"
          defaultValue={new Date(2024, 0, 1, 9, 0)}
        >
          <TimePicker.Trigger>
            <TimePicker.Value />
            <TimePicker.Indicator />
          </TimePicker.Trigger>
          <TimePicker.Sheet />
        </TimePicker>
      </Section>
    </ScrollView>
  )
}

function Read({ label, value }: { label: string; value: Date | undefined }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {label} :{' '}
      {value === undefined ? 'undefined' : value.toTimeString().slice(0, 5)}
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
