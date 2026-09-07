import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { MaskField, parseMaskedDate, parseMaskedTime } from '@xaui/native/mask-field'
import { FieldGroup } from '@xaui/native/field-group'
import type { MaskFieldProps } from '@xaui/native/mask-field'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<MaskFieldProps['variant']>
type FieldSize = NonNullable<MaskFieldProps['size']>

const VARIANTS: Variant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: FieldSize[] = ['xs', 'sm', 'md', 'lg']

const FRENCH = { day: 'JJ', month: 'MM', year: 'AAAA' }

/**
 * The verification screen for the `MaskField`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function MaskFieldScreen() {
  const theme = useXAUITheme()

  const [card, setCard] = useState('')
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [time, setTime] = useState<{ hours: number; minutes: number } | null>(null)
  const [phone, setPhone] = useState('')
  const [driven, setDriven] = useState('04/07/1995')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Les quatre presets"
        note="Une seule représentation — les caractères acceptés, dans l'ordre — et le masque est la seule chose qui en fait du texte. Ce qui lui permet de survivre à un collage, à un clavier qui propose sa propre ponctuation, et à un retour arrière par-dessus un séparateur."
      >
        <MaskField mask="date" locale="fr-FR" segmentLabels={FRENCH}>
          <MaskField.Label>date — JJ/MM/AAAA</MaskField.Label>
          <MaskField.Field />
        </MaskField>

        <MaskField mask="time">
          <MaskField.Label>time — HH:MM</MaskField.Label>
          <MaskField.Field />
        </MaskField>

        <MaskField mask="datetime" locale="fr-FR" segmentLabels={FRENCH}>
          <MaskField.Label>datetime</MaskField.Label>
          <MaskField.Field />
        </MaskField>

        <MaskField mask="credit-card" value={card} onValueChange={setCard}>
          <MaskField.Label>credit-card</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <Read label="onValueChange" value={card} />
      </Section>

      <Section
        title="Un pattern à soi"
        note="Tout ce qui n'est pas un preset est un gabarit : # un chiffre, A une lettre, * l'un ou l'autre, tout autre caractère un littéral réinjecté au fil du remplissage. Un gabarit est une forme, pas une plage — il ne plafonne pas."
      >
        <MaskField mask="+33 # ## ## ## ##" value={phone} onValueChange={setPhone}>
          <MaskField.Label>Téléphone</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <Read label="onValueChange" value={phone} />

        <MaskField mask="AA## ####">
          <MaskField.Label>Plaque — AA## ####</MaskField.Label>
          <MaskField.Field />
        </MaskField>
      </Section>

      <Section
        title="convert — le seul branchement"
        note="Le champ reste sur la chaîne. convert la transforme en une valeur à soi : parseMaskedDate et parseMaskedTime sont exportés pour les formes date et time, et le second argument de onValueChange devient le résultat."
      >
        <MaskField
          mask="date"
          locale="fr-FR"
          segmentLabels={FRENCH}
          convert={text => parseMaskedDate(text, 'fr-FR')}
          onValueChange={(_text, value) => setBirthday(value as Date | null)}
        >
          <MaskField.Label>Date de naissance</MaskField.Label>
          <MaskField.Field />
          <MaskField.Description>
            Tapez 31/02/1995 : la valeur reste null.
          </MaskField.Description>
        </MaskField>
        <Read
          label="convert"
          value={birthday === null ? 'null' : birthday.toISOString().slice(0, 10)}
        />

        <MaskField
          mask="time"
          convert={parseMaskedTime}
          onValueChange={(_text, value) =>
            setTime(value as { hours: number; minutes: number } | null)
          }
        >
          <MaskField.Label>Heure</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <Read
          label="convert"
          value={time === null ? 'null' : `${time.hours}h${time.minutes}`}
        />
      </Section>

      <Section
        title="L'ordre et le séparateur viennent de la locale"
        note="Lus dans Intl plutôt que sur une table de pays. On les donne quand c'est une décision et non une locale : un champ ISO est en YMD partout où on le lit."
      >
        <MaskField mask="date" locale="en-US">
          <MaskField.Label>en-US — MM/DD/YYYY</MaskField.Label>
          <MaskField.Field />
        </MaskField>

        <MaskField
          mask="date"
          locale="de-DE"
          segmentLabels={{ day: 'TT', month: 'MM', year: 'JJJJ' }}
        >
          <MaskField.Label>de-DE — TT.MM.JJJJ</MaskField.Label>
          <MaskField.Field />
        </MaskField>

        <MaskField mask="date" order="YMD" separator="-">
          <MaskField.Label>ISO — YYYY-MM-DD</MaskField.Label>
          <MaskField.Field />
        </MaskField>
      </Section>

      <Section
        title="Contrôlé"
        note="La valeur est la chaîne masquée, donc un champ contrôlé est un champ contrôlé ordinaire : value est le texte, re-masqué au cas où on lui passe une chaîne brute."
      >
        <MaskField
          mask="date"
          locale="fr-FR"
          segmentLabels={FRENCH}
          value={driven}
          onValueChange={setDriven}
        >
          <MaskField.Label>Date du contrat</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <Read label="value" value={driven || '(vide)'} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Poke label="4 juillet 1995" onPress={() => setDriven('04/07/1995')} />
          <Poke label="Chaîne brute" onPress={() => setDriven('4-7-1995')} />
          <Poke label="Vider" onPress={() => setDriven('')} />
        </View>
      </Section>

      <Section
        title="C'est un TextField"
        note="La même racine, les mêmes quatre variantes, les mêmes tailles, la même teinte, le même isInvalid. Seul le champ diffère. FieldGroup fonctionne aussi — un préfixe, un bouton d'effacement."
      >
        {VARIANTS.map(variant => (
          <MaskField key={variant} variant={variant} mask="credit-card">
            <MaskField.Label>{variant}</MaskField.Label>
            <MaskField.Field />
          </MaskField>
        ))}

        <MaskField mask="date" locale="fr-FR" segmentLabels={FRENCH}>
          <MaskField.Label>Dans un FieldGroup</MaskField.Label>
          <FieldGroup>
            <FieldGroup.Prefix>
              <Text style={{ color: theme.colors.muted }}>📅</Text>
            </FieldGroup.Prefix>
            <MaskField.Field />
          </FieldGroup>
        </MaskField>
      </Section>

      <Section
        title="Les tailles"
        note="La hauteur, l'inset, les écarts et la typo. Jamais la largeur."
      >
        {SIZES.map(size => (
          <MaskField key={size} size={size} mask="time">
            <MaskField.Label>{size}</MaskField.Label>
            <MaskField.Field />
          </MaskField>
        ))}
      </Section>

      <Section
        title="L'étiquette dedans, l'erreur, l'état désactivé"
        note="isInvalid peint la bordure et l'étiquette en danger et coupe le traitement du focus : une erreur prime sur le focus, et un champ qui est les deux doit se lire comme faux plutôt que comme occupé."
      >
        <MaskField
          labelPlacement="inside"
          mask="date"
          locale="fr-FR"
          segmentLabels={FRENCH}
        >
          <MaskField.Label>Échéance</MaskField.Label>
          <MaskField.Field />
        </MaskField>

        <MaskField isInvalid mask="date" locale="fr-FR" segmentLabels={FRENCH}>
          <MaskField.Label>Date de début</MaskField.Label>
          <MaskField.Field />
          <MaskField.Error>Cette date est passée.</MaskField.Error>
        </MaskField>

        <MaskField
          isDisabled
          defaultValue="04/07/1995"
          mask="date"
          locale="fr-FR"
          segmentLabels={FRENCH}
        >
          <MaskField.Label>Verrouillée</MaskField.Label>
          <MaskField.Field />
        </MaskField>

        <MaskField color="#e11d48" mask="credit-card">
          <MaskField.Label>Teintée</MaskField.Label>
          <MaskField.Field />
        </MaskField>
      </Section>
    </ScrollView>
  )
}

function Read({ label, value }: { label: string; value: string }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {label} : {value === '' ? '(vide)' : value}
    </Text>
  )
}

function Poke({ label, onPress }: { label: string; onPress: () => void }) {
  const theme = useXAUITheme()

  return (
    <Text
      onPress={onPress}
      style={{
        color: theme.colors.accent,
        fontSize: theme.fontSizes.xs,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: theme.radius.field,
        backgroundColor: theme.colors.default,
      }}
    >
      {label}
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
