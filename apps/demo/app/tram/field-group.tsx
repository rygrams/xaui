import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { FieldGroup } from '@xaui/tram/field-group'
import { TextField } from '@xaui/tram/text-field'
import type { TextFieldSize } from '@xaui/tram/text-field'
import { TramSection } from '../../components/tram-section'

const SIZES: TextFieldSize[] = ['sm', 'md', 'lg']

/**
 * A mark drawn with two views, so the screen needs no icon set: a square letter, the size
 * and colour `FieldGroup.Icon` hands it.
 */
function MailMark({ size = 20, color }: { size?: number; color?: string }) {
  return (
    <View
      style={{
        width: size,
        height: size * 0.75,
        borderWidth: 2,
        borderColor: color,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.5,
          height: size * 0.5,
          marginTop: -size * 0.28,
          borderEndWidth: 2,
          borderBottomWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  )
}

/**
 * Where the Tram `FieldGroup` is verified, in dark and in light: one box around a cell,
 * the text and a cell — a decorative mark that leans on the text, a control ruled off as a
 * key, both ends at once, the three sizes, invalid, disabled and a named accent.
 */
export default function TramFieldGroupScreen() {
  const theme = useXAUITheme()
  const [isShown, setShown] = useState(false)
  const unit = { color: theme.colors.muted, fontSize: 16 }
  const key = { color: theme.colors.foreground, fontSize: 16 }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — la boîte du TextField, 40, 48, 56 de haut. La marque prend la taille de la croix du CloseButton : 16, 20, 24."
      >
        {SIZES.map(size => (
          <TextField key={size} size={size}>
            <TextField.Label>{size}</TextField.Label>
            <FieldGroup>
              <FieldGroup.Prefix isDecorative>
                <FieldGroup.Icon as={MailMark} />
              </FieldGroup.Prefix>
              <FieldGroup.Field
                placeholder="nom@exemple.fr"
                keyboardType="email-address"
              />
            </FieldGroup>
          </TextField>
        ))}
      </TramSection>

      <TramSection
        title="une marque, une touche"
        note="Décorative, la cellule s'appuie sur le texte et un toucher donne le focus au champ. Contrôle, c'est une touche séparée du texte par le filet du NumberField."
      >
        <TextField>
          <TextField.Label>poids</TextField.Label>
          <FieldGroup>
            <FieldGroup.Field keyboardType="decimal-pad" defaultValue="12,5" />
            <FieldGroup.Suffix isDecorative>
              <Text style={unit}>kg</Text>
            </FieldGroup.Suffix>
          </FieldGroup>
        </TextField>
        <TextField>
          <TextField.Label>mot de passe</TextField.Label>
          <FieldGroup>
            <FieldGroup.Field secureTextEntry={!isShown} defaultValue="métro-1979" />
            <FieldGroup.Suffix>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={isShown ? 'masquer' : 'afficher'}
                hitSlop={8}
                onPress={() => setShown(shown => !shown)}
              >
                <Text style={key}>{isShown ? 'masquer' : 'afficher'}</Text>
              </Pressable>
            </FieldGroup.Suffix>
          </FieldGroup>
          <TextField.Description>douze caractères au moins.</TextField.Description>
        </TextField>
        <TextField>
          <TextField.Label>prix</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <Text style={unit}>€</Text>
            </FieldGroup.Prefix>
            <FieldGroup.Field keyboardType="decimal-pad" defaultValue="34" />
            <FieldGroup.Suffix>
              <Pressable accessibilityRole="button" hitSlop={8}>
                <Text style={key}>TTC</Text>
              </Pressable>
            </FieldGroup.Suffix>
          </FieldGroup>
        </TextField>
      </TramSection>

      <TramSection
        title="invalide, désactivé, accent"
        note="Invalide : la boîte en danger, focus compris. Désactivé : la boîte grise, les cellules ne prennent plus de toucher. lime : la ligne du focus en encre de l'accent."
      >
        <TextField isInvalid>
          <TextField.Label>courriel</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={MailMark} />
            </FieldGroup.Prefix>
            <FieldGroup.Field defaultValue="nom@" />
          </FieldGroup>
          <TextField.Error>il manque le domaine.</TextField.Error>
        </TextField>
        <TextField isDisabled>
          <TextField.Label>poids</TextField.Label>
          <FieldGroup>
            <FieldGroup.Field defaultValue="12,5" />
            <FieldGroup.Suffix isDecorative>
              <Text style={unit}>kg</Text>
            </FieldGroup.Suffix>
          </FieldGroup>
        </TextField>
        <TextField accent="lime">
          <TextField.Label>lime</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={MailMark} />
            </FieldGroup.Prefix>
            <FieldGroup.Field placeholder="le focus en lime" />
          </FieldGroup>
        </TextField>
      </TramSection>
    </ScrollView>
  )
}
