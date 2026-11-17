import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { TextArea } from '@xaui/tram/text-area'
import type { TextFieldSize } from '@xaui/tram/text-field'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: TextFieldSize[] = ['sm', 'md', 'lg']

/** The three that are too light to read as a line on white. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow']

const SHORTEST = 10

/**
 * Where the Tram `TextArea` is verified, in dark and in light: the three sizes, `rows` and
 * `maxRows`, controlled and not, the label, the hint and the error, disabled, read-only,
 * named accents, a raw `color`, `asChild` and the style props.
 */
export default function TramTextAreaScreen() {
  const theme = useXAUITheme()
  const [message, setMessage] = useState('le tram de 8 h 12\nn’est pas passé.')
  const [reason, setReason] = useState('ok')
  const isTooShort = reason.trim().length < SHORTEST

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — trois lignes de 22, 26 et 32. Le texte part du haut."
      >
        {SIZES.map(size => (
          <TextArea key={size} size={size}>
            <TextArea.Label>{size}</TextArea.Label>
            <TextArea.Field placeholder="dis-nous ce qui se passe" />
            <TextArea.Description>500 caractères au plus.</TextArea.Description>
          </TextArea>
        ))}
      </TramSection>

      <TramSection
        title="rows et maxRows"
        note="Deux lignes au départ, cinq au plus : le champ grandit avec le texte, puis défile."
      >
        <TextArea rows={2} maxRows={5}>
          <TextArea.Label>commentaire</TextArea.Label>
          <TextArea.Field
            defaultValue={'une\ndeux\ntrois\nquatre\ncinq\nsix\nsept'}
          />
        </TextArea>
        <TextArea rows={1}>
          <TextArea.Label>une ligne, sans plafond</TextArea.Label>
          <TextArea.Field placeholder="grandit sans fin" />
        </TextArea>
      </TramSection>

      <TramSection
        title="non contrôlé"
        note="defaultValue : le champ garde son propre texte. Toucher le label donne le focus."
      >
        <TextArea>
          <TextArea.Label>adresse</TextArea.Label>
          <TextArea.Field defaultValue={'12 rue des Jardins\nAbidjan'} />
        </TextArea>
      </TramSection>

      <TramSection title="contrôlé" note={`${message.length} caractères sur 500.`}>
        <TextArea>
          <TextArea.Label>message</TextArea.Label>
          <TextArea.Field
            value={message}
            onChangeText={setMessage}
            maxLength={500}
          />
        </TextArea>
      </TramSection>

      <TramSection
        title="invalide"
        note="Bordure et message en danger, focus compris ; le label et la description gardent leur encre."
      >
        <TextArea isInvalid={isTooShort} isRequired>
          <TextArea.Label>motif</TextArea.Label>
          <TextArea.Field value={reason} onChangeText={setReason} />
          <TextArea.Description>lu par un agent.</TextArea.Description>
          {isTooShort ? (
            <TextArea.Error>écris au moins dix caractères.</TextArea.Error>
          ) : null}
        </TextArea>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Bordure, texte et label gris, sans accent ; le champ ne prend pas le focus."
      >
        <TextArea isDisabled>
          <TextArea.Label>note interne</TextArea.Label>
          <TextArea.Field defaultValue={'dossier clos\nle 12 mars.'} />
        </TextArea>
      </TramSection>

      <TramSection
        title="lecture seule"
        note="readOnly sur le champ : rien n’est grisé, le texte se sélectionne et ne se modifie pas."
      >
        <TextArea>
          <TextArea.Label>conditions</TextArea.Label>
          <TextArea.Field
            readOnly
            defaultValue={'valable un an,\nnon remboursable.'}
          />
        </TextArea>
      </TramSection>

      <TramSection
        title="accent"
        note="Au focus, la bordure est l’accent lu comme encre : assombri sur blanc, tel quel sur noir."
      >
        {ACCENTS.map(accent => (
          <TextArea key={accent} accent={accent} rows={2}>
            <TextArea.Label>{accent}</TextArea.Label>
            <TextArea.Field placeholder="touche pour voir la bordure" />
          </TextArea>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette, jamais corrigée — ici le succès du thème."
      >
        <TextArea color={theme.colors.success} rows={2}>
          <TextArea.Label>remerciement</TextArea.Label>
          <TextArea.Field placeholder="un mot pour l’équipe" />
        </TextArea>
      </TramSection>

      <TramSection
        title="asChild"
        note="La racine se fond dans l’élément donné : ici une View qui apporte sa propre mise en page."
      >
        <TextArea asChild rows={2}>
          <View style={{ padding: 16, backgroundColor: theme.colors.surface }}>
            <TextArea.Label>sur la surface discrète</TextArea.Label>
            <TextArea.Field placeholder="la colonne est la View" />
          </View>
        </TextArea>
      </TramSection>

      <TramSection
        title="props de style"
        note="Toute clé de style est une prop, sur la racine comme sur les slots."
      >
        <TextArea gap={12} maxWidth={260} rows={2}>
          <TextArea.Label letterSpacing={2}>étroit, espacé</TextArea.Label>
          <TextArea.Field
            textAlign="center"
            defaultValue={'centré\nsur deux lignes'}
          />
        </TextArea>
      </TramSection>
    </ScrollView>
  )
}
