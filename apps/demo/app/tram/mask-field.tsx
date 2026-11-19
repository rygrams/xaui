import { useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { parseMaskedDate } from '@xaui/native/mask-field'
import { useXAUITheme } from '@xaui/native/theme'
import { FieldGroup } from '@xaui/tram/field-group'
import { MaskField } from '@xaui/tram/mask-field'
import type { MaskFieldProps } from '@xaui/tram/mask-field'
import { TramSection } from '../../components/tram-section'

const SIZES: NonNullable<MaskFieldProps['size']>[] = ['sm', 'md', 'lg']

const FR_LABELS = { day: 'JJ', month: 'MM', year: 'AAAA' }

const LONG_DATE = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/**
 * Where the Tram `MaskField` is verified, in dark and in light: the four presets and two
 * patterns, the rest of the shape behind the typed text and the field without it, the
 * three sizes, controlled with `convert`, a shape too wide to draw under the text,
 * invalid, disabled, a named accent and the style props.
 */
export default function TramMaskFieldScreen() {
  const theme = useXAUITheme()
  const [day, setDay] = useState<Date | null>(null)
  const [card, setCard] = useState('')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <TramSection
        title="les presets"
        note="date, time, datetime, credit-card. Les séparateurs se remettent à mesure ; le reste du masque attend en gris derrière le texte tapé."
      >
        <MaskField mask="date" locale="fr-FR" segmentLabels={FR_LABELS}>
          <MaskField.Label>date</MaskField.Label>
          <MaskField.Field />
          <MaskField.Description>
            jour, mois, année ; le 31 février devient le 28.
          </MaskField.Description>
        </MaskField>
        <MaskField mask="time">
          <MaskField.Label>heure</MaskField.Label>
          <MaskField.Field />
          <MaskField.Description>24 heures ; un 9 se lit 09.</MaskField.Description>
        </MaskField>
        <MaskField mask="datetime" locale="fr-FR" segmentLabels={FR_LABELS}>
          <MaskField.Label>date et heure</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <MaskField mask="credit-card">
          <MaskField.Label>numéro de carte</MaskField.Label>
          <MaskField.Field />
        </MaskField>
      </TramSection>

      <TramSection
        title="un motif"
        note="# un chiffre, A une lettre, * l'un ou l'autre ; le reste est écrit tel quel."
      >
        <MaskField mask="AA-###-AA">
          <MaskField.Label>immatriculation</MaskField.Label>
          <MaskField.Field autoCapitalize="characters" />
        </MaskField>
        <MaskField mask="+33 # ## ## ## ##">
          <MaskField.Label>téléphone</MaskField.Label>
          <MaskField.Field />
        </MaskField>
      </TramSection>

      <TramSection
        title="avec et sans le reste"
        note="showMask, vrai par défaut. Faux, le masque n'est que le placeholder, comme dans Native : il part à la première touche."
      >
        <MaskField
          mask="date"
          locale="fr-FR"
          segmentLabels={FR_LABELS}
          defaultValue="0412"
        >
          <MaskField.Label>showMask</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <MaskField
          mask="date"
          locale="fr-FR"
          segmentLabels={FR_LABELS}
          defaultValue="0412"
          showMask={false}
        >
          <MaskField.Label>showMask={'{false}'}</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <MaskField
          mask="date"
          locale="fr-FR"
          segmentLabels={{ day: 'jour', month: 'mois', year: 'année' }}
          defaultValue="0412"
        >
          <MaskField.Label>des libellés trop larges</MaskField.Label>
          <MaskField.Field />
          <MaskField.Description>
            « jour/mois/année » ne tient pas sous huit chiffres : le reste ne se
            dessine pas.
          </MaskField.Description>
        </MaskField>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut ; le reste du masque suit le corps du texte."
      >
        {SIZES.map(size => (
          <MaskField key={size} size={size} mask="time" defaultValue="9">
            <MaskField.Label>{size}</MaskField.Label>
            <MaskField.Field />
          </MaskField>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé, et converti"
        note={`convert lit une Date dans le texte. Valeur : ${day ? LONG_DATE.format(day) : 'pas encore une date'}`}
      >
        <MaskField
          mask="date"
          locale="fr-FR"
          segmentLabels={FR_LABELS}
          convert={text => parseMaskedDate(text, 'fr-FR')}
          onValueChange={(_, value) => setDay(value as Date | null)}
        >
          <MaskField.Label>date de livraison</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <MaskField mask="credit-card" value={card} onValueChange={setCard}>
          <MaskField.Label>carte, tenue par l’écran</MaskField.Label>
          <MaskField.Field />
          <MaskField.Description>{card || 'vide'}</MaskField.Description>
        </MaskField>
      </TramSection>

      <TramSection
        title="invalide et désactivé"
        note="Invalide : la ligne en danger, focus compris. Désactivé : la ligne, le texte et le reste du masque en gris."
      >
        <MaskField mask="credit-card" isInvalid defaultValue="4242 4242 4242 4241">
          <MaskField.Label>numéro de carte</MaskField.Label>
          <MaskField.Field />
          <MaskField.Error>ce numéro ne passe pas la clé de Luhn.</MaskField.Error>
        </MaskField>
        <MaskField mask="time" isDisabled defaultValue="14">
          <MaskField.Label>créneau</MaskField.Label>
          <MaskField.Field />
        </MaskField>
      </TramSection>

      <TramSection
        title="accent et props de style"
        note="Au focus, la ligne est l'accent lu comme encre. Une marge ou une largeur placent la boîte et son masque ensemble."
      >
        <MaskField accent="lime" mask="time">
          <MaskField.Label>lime</MaskField.Label>
          <MaskField.Field />
        </MaskField>
        <MaskField mask="##/##" maxWidth={160}>
          <MaskField.Label>expiration</MaskField.Label>
          <MaskField.Field marginTop={4} placeholder="MM/AA" />
        </MaskField>
      </TramSection>

      <TramSection
        title="dans un FieldGroup"
        note="Le champ masqué tient dans la boîte du groupe, comme FieldGroup.Field : la ligne est celle du groupe, le reste du masque suit le texte après la cellule."
      >
        <MaskField mask="+223 ## ## ## ##">
          <MaskField.Label>téléphone au Mali</MaskField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <Text style={{ color: theme.colors.muted, fontSize: 16 }}>ML</Text>
            </FieldGroup.Prefix>
            <MaskField.Field />
          </FieldGroup>
        </MaskField>
      </TramSection>
    </ScrollView>
  )
}
