import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { TextField } from '@xaui/tram/text-field'
import type { TextFieldSize } from '@xaui/tram/text-field'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: TextFieldSize[] = ['sm', 'md', 'lg']

/** The three that are too light to read as a line on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

function isEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value)
}

/**
 * Where the Tram `TextField` is verified, in dark and in light: the three sizes,
 * controlled and not, the label, the hint and the error, disabled, read-only, a password,
 * a number pad, named accents, a raw `color`, `asChild` and the style props.
 */
export default function TramTextFieldScreen() {
  const theme = useXAUITheme()
  const [name, setName] = useState('ada')
  const [email, setEmail] = useState('ada@exemple')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — 40, 48, 56 de haut. Le texte tapé reste centré ; sm atteint 48 par son hitSlop."
      >
        {SIZES.map(size => (
          <TextField key={size} size={size}>
            <TextField.Label>{size}</TextField.Label>
            <TextField.Field placeholder="nom@exemple.fr" />
            <TextField.Description>on ne le partage jamais.</TextField.Description>
          </TextField>
        ))}
      </TramSection>

      <TramSection
        title="non contrôlé"
        note="defaultValue : le champ garde son propre texte. Toucher le label donne le focus."
      >
        <TextField>
          <TextField.Label>ville</TextField.Label>
          <TextField.Field defaultValue="abidjan" />
        </TextField>
      </TramSection>

      <TramSection
        title="contrôlé"
        note={`Deux champs sur le même état. Valeur : « ${name} »`}
      >
        <TextField>
          <TextField.Label>prénom</TextField.Label>
          <TextField.Field value={name} onChangeText={setName} />
        </TextField>
        <TextField size="sm">
          <TextField.Label>le même état</TextField.Label>
          <TextField.Field value={name} onChangeText={setName} />
        </TextField>
      </TramSection>

      <TramSection
        title="invalide"
        note="Bordure et message en danger, focus compris ; le label et la description gardent leur encre."
      >
        <TextField isInvalid={!isEmail(email)} isRequired>
          <TextField.Label>courriel</TextField.Label>
          <TextField.Field
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextField.Description>pour la confirmation.</TextField.Description>
          {isEmail(email) ? null : (
            <TextField.Error>cette adresse est incomplète.</TextField.Error>
          )}
        </TextField>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Bordure, texte et label gris, sans accent ; le champ ne prend pas le focus."
      >
        <TextField isDisabled>
          <TextField.Label>identifiant</TextField.Label>
          <TextField.Field defaultValue="ada-lovelace" />
          <TextField.Description>
            attribué à la création du compte.
          </TextField.Description>
        </TextField>
        <TextField isDisabled>
          <TextField.Label>vide</TextField.Label>
          <TextField.Field placeholder="rien à saisir" />
        </TextField>
      </TramSection>

      <TramSection
        title="lecture seule"
        note="readOnly sur le champ : rien n'est grisé, et le texte ne se modifie pas."
      >
        <TextField>
          <TextField.Label>référence</TextField.Label>
          <TextField.Field readOnly defaultValue="XA-2026-0042" />
        </TextField>
      </TramSection>

      <TramSection
        title="mot de passe et pavé numérique"
        note="Les props de TextInput vont sur TextField.Field."
      >
        <TextField>
          <TextField.Label>mot de passe</TextField.Label>
          <TextField.Field secureTextEntry placeholder="huit caractères" />
        </TextField>
        <TextField>
          <TextField.Label>code postal</TextField.Label>
          <TextField.Field keyboardType="number-pad" maxLength={5} />
        </TextField>
      </TramSection>

      <TramSection
        title="accent"
        note="Au focus, la bordure est l'accent lu comme encre : assombri sur blanc, tel quel sur noir."
      >
        {ACCENTS.map(accent => (
          <TextField key={accent} accent={accent}>
            <TextField.Label>{accent}</TextField.Label>
            <TextField.Field placeholder="touche pour voir la bordure" />
          </TextField>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette, jamais corrigée — ici le succès du thème."
      >
        <TextField color={theme.colors.success}>
          <TextField.Label>montant</TextField.Label>
          <TextField.Field keyboardType="decimal-pad" placeholder="0,00" />
        </TextField>
      </TramSection>

      <TramSection
        title="asChild"
        note="La racine se fond dans l'élément donné : ici une View qui apporte sa propre mise en page."
      >
        <TextField asChild>
          <View style={{ padding: 16, backgroundColor: theme.colors.surface }}>
            <TextField.Label>sur la surface discrète</TextField.Label>
            <TextField.Field placeholder="la colonne est la View" />
          </View>
        </TextField>
      </TramSection>

      <TramSection
        title="props de style"
        note="Toute clé de style est une prop, sur la racine comme sur les slots."
      >
        <TextField gap={12} maxWidth={260}>
          <TextField.Label letterSpacing={2}>étroit, espacé</TextField.Label>
          <TextField.Field textAlign="center" defaultValue="centré" />
        </TextField>
      </TramSection>
    </ScrollView>
  )
}
