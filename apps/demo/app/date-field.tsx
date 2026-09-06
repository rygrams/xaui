import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DateField } from '@xaui/native/date-field'
import { FieldGroup } from '@xaui/native/field-group'
import type { DateFieldProps } from '@xaui/native/date-field'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<DateFieldProps['variant']>
type FieldSize = NonNullable<DateFieldProps['size']>

const VARIANTS: Variant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: FieldSize[] = ['xs', 'sm', 'md', 'lg']

const FRENCH = { day: 'JJ', month: 'MM', year: 'AAAA' }

/**
 * The verification screen for the `DateField`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function DateFieldScreen() {
  const theme = useXAUITheme()
  const [typed, setTyped] = useState<Date | null>(null)
  const [driven, setDriven] = useState<Date | null>(new Date(1995, 6, 4))
  const [picked, setPicked] = useState<Date | null>(null)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Le cas par défaut"
        note="Une seule représentation — les chiffres, dans l'ordre — et le masque est la seule chose qui en fait du texte. Ce qui lui permet de survivre à un collage, à un clavier qui propose sa propre ponctuation, et à un retour arrière par-dessus un séparateur."
      >
        <DateField locale="fr-FR" segmentLabels={FRENCH} onValueChange={setTyped}>
          <DateField.Label>Date de naissance</DateField.Label>
          <DateField.Field />
          <DateField.Description>Jour, mois, année.</DateField.Description>
        </DateField>

        <Read label="onValueChange" value={typed} />
      </Section>

      <Section
        title="Le calendrier, en bottom sheet"
        note="Le déclencheur est un FieldGroup.Suffix : c'est le groupe qui pose un décorateur par-dessus un champ et le mesure, et DateField.Field lit la même mesure pour lui laisser sa place. L'écrire, c'est ce qui garde le calendrier facultatif — une date qui ne se tape que n'a rien à côté d'elle. Une feuille plutôt qu'un popover : un mois fait trois cents points de large, ce qui sur un téléphone est l'écran."
      >
        <DateField
          locale="fr-FR"
          segmentLabels={FRENCH}
          value={picked}
          onValueChange={setPicked}
        >
          <DateField.Label>Date de l’événement</DateField.Label>
          <FieldGroup>
            <DateField.Field />
            <DateField.Trigger accessibilityLabel="Ouvrir le calendrier" />
          </FieldGroup>
          <DateField.Description>
            Tapez-la, ou choisissez-la dans le mois.
          </DateField.Description>
          <DateField.Sheet previousLabel="Mois précédent" nextLabel="Mois suivant" />
        </DateField>

        <Read label="onValueChange" value={picked} />
      </Section>

      <Section
        title="L'ordre et le séparateur viennent de la locale"
        note="Lus dans Intl plutôt que sur une table de pays. On les donne quand c'est une décision et non une locale : un champ ISO est en YMD partout où on le lit."
      >
        <DateField locale="fr-FR" segmentLabels={FRENCH}>
          <DateField.Label>fr-FR — JJ/MM/AAAA</DateField.Label>
          <DateField.Field />
        </DateField>

        <DateField locale="en-US">
          <DateField.Label>en-US — MM/DD/YYYY</DateField.Label>
          <DateField.Field />
        </DateField>

        <DateField
          locale="de-DE"
          segmentLabels={{ day: 'TT', month: 'MM', year: 'JJJJ' }}
        >
          <DateField.Label>de-DE — TT.MM.JJJJ</DateField.Label>
          <DateField.Field />
        </DateField>

        <DateField order="YMD" separator="-">
          <DateField.Label>ISO — YYYY-MM-DD</DateField.Label>
          <DateField.Field />
        </DateField>
      </Section>

      <Section
        title="Contrôlé"
        note="value ne remplace pas le texte, il le prime — et seulement quand les deux ne désignent pas le même jour. Sans ce test, un champ contrôlé effacerait la frappe du lecteur à chaque rendu ; avec, l'appelant peut toujours poser la date de l'extérieur et être obéi."
      >
        <DateField
          locale="fr-FR"
          segmentLabels={FRENCH}
          value={driven}
          onValueChange={setDriven}
        >
          <DateField.Label>Date du contrat</DateField.Label>
          <DateField.Field />
        </DateField>

        <Read label="value" value={driven} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Poke label="Aujourd'hui" onPress={() => setDriven(new Date())} />
          <Poke
            label="4 juillet 1995"
            onPress={() => setDriven(new Date(1995, 6, 4))}
          />
          <Poke label="Vider" onPress={() => setDriven(null)} />
        </View>
      </Section>

      <Section
        title="Ce qui ne peut pas exister vaut null"
        note="Le 31 février se tape — le masque ne peut pas le refuser tant que le mois n'est pas connu — mais il ne se lit pas : la valeur est null plutôt qu'un 3 mars, ce que new Date ferait et que personne n'a voulu. Le masque, lui, plafonne le jour dès que le mois est là : essayez 02 puis 31 en MM/DD/YYYY."
      >
        <DateField locale="fr-FR" segmentLabels={FRENCH}>
          <DateField.Label>Essayez 31/02/1995</DateField.Label>
          <DateField.Field />
          <DateField.Description>
            Puis 99/99/9999, plafonné à 31/12/9999.
          </DateField.Description>
        </DateField>

        <DateField locale="en-US">
          <DateField.Label>Et 02 puis 31 ici</DateField.Label>
          <DateField.Field />
          <DateField.Description>
            Le mois vient d’abord, donc le jour est plafonné à 29 tout de suite.
          </DateField.Description>
        </DateField>
      </Section>

      <Section
        title="C'est un TextField"
        note="La même racine, les mêmes quatre variantes, les mêmes tailles, la même teinte, le même isInvalid. Seul le champ diffère."
      >
        {VARIANTS.map(variant => (
          <DateField
            key={variant}
            variant={variant}
            locale="fr-FR"
            segmentLabels={FRENCH}
          >
            <DateField.Label>{variant}</DateField.Label>
            <DateField.Field />
          </DateField>
        ))}
      </Section>

      <Section
        title="Les tailles"
        note="La hauteur, l'inset, les écarts et la typo. Jamais la largeur."
      >
        {SIZES.map(size => (
          <DateField key={size} size={size} locale="fr-FR" segmentLabels={FRENCH}>
            <DateField.Label>{size}</DateField.Label>
            <DateField.Field />
          </DateField>
        ))}
      </Section>

      <Section
        title="L'étiquette dedans, l'erreur, l'état désactivé"
        note="isInvalid peint la bordure et l'étiquette en danger et coupe le traitement du focus : une erreur prime sur le focus, et un champ qui est les deux doit se lire comme faux plutôt que comme occupé."
      >
        <DateField labelPlacement="inside" locale="fr-FR" segmentLabels={FRENCH}>
          <DateField.Label>Échéance</DateField.Label>
          <DateField.Field />
        </DateField>

        <DateField isInvalid locale="fr-FR" segmentLabels={FRENCH}>
          <DateField.Label>Date de début</DateField.Label>
          <DateField.Field />
          <DateField.Error>Cette date est passée.</DateField.Error>
        </DateField>

        <DateField
          isDisabled
          defaultValue={new Date(1995, 6, 4)}
          locale="fr-FR"
          segmentLabels={FRENCH}
        >
          <DateField.Label>Verrouillée</DateField.Label>
          <DateField.Field />
        </DateField>

        <DateField color="#e11d48" locale="fr-FR" segmentLabels={FRENCH}>
          <DateField.Label>Teintée</DateField.Label>
          <DateField.Field />
        </DateField>
      </Section>
    </ScrollView>
  )
}

function Read({ label, value }: { label: string; value: Date | null }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {label} : {value === null ? 'null' : value.toISOString().slice(0, 10)}
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
