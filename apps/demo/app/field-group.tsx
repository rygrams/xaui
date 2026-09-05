import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { TextField } from '@xaui/native/text-field'
import type { TextFieldSize, TextFieldVariant } from '@xaui/native/text-field'
import { FieldGroup } from '@xaui/native/field-group'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: TextFieldVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: TextFieldSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `FieldGroup`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the decorators are laid over the field
 * rather than beside it, so the box is still the `TextInput` and every variant, size and
 * state of the `TextField` reaches it untouched; the field clears them by the width they
 * measured, whatever is in them; `isDecorative` decides whether a decorator takes touches
 * or hands them to the field; and a disabled group takes them from everything.
 */
export default function FieldGroupScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
    >
      <Section
        title="Prefix, field, suffix"
        note="JSX order is screen order, and the two decorators are out of flow: the prefix is pinned to the leading edge, the suffix to the trailing one, and the field clears each by the width it measured."
      >
        <TextField>
          <TextField.Label>Recherche</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={SearchIcon} />
            </FieldGroup.Prefix>
            <FieldGroup.Field placeholder="Rechercher un produit…" />
          </FieldGroup>
        </TextField>

        <TextField>
          <TextField.Label>Montant</TextField.Label>
          <FieldGroup>
            <FieldGroup.Field placeholder="0,00" keyboardType="decimal-pad" />
            <FieldGroup.Suffix isDecorative>
              <Text style={{ color: theme.colors.fieldPlaceholder }}>EUR</Text>
            </FieldGroup.Suffix>
          </FieldGroup>
          <TextField.Description>
            Le suffixe est du texte, pas un glyphe.
          </TextField.Description>
        </TextField>
      </Section>

      <Password />

      <Section
        title="Whatever is in it, the field clears it"
        note="Nobody is told a number: the decorator measures itself and the padding follows. A country code, two glyphs and a 16pt mark all land right."
      >
        <TextField>
          <TextField.Label>Téléphone</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <Text style={{ color: theme.colors.fieldForeground }}>+33</Text>
            </FieldGroup.Prefix>
            <FieldGroup.Field placeholder="6 12 34 56 78" keyboardType="phone-pad" />
          </FieldGroup>
        </TextField>

        <TextField>
          <TextField.Label>Deux glyphes dans un préfixe</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={SearchIcon} />
              <FieldGroup.Icon as={LockIcon} />
            </FieldGroup.Prefix>
            <FieldGroup.Field placeholder="le gap est le pas du padding" />
          </FieldGroup>
        </TextField>
      </Section>

      <Section
        title="It is a TextField — the four levels reach it untouched"
        note="The box is still the TextInput, so the fill, the border, the shadow and the focus are the ones the TextField resolved. Nothing here is the group's."
      >
        {VARIANTS.map(variant => (
          <TextField key={variant} variant={variant}>
            <TextField.Label>{variant}</TextField.Label>
            <FieldGroup>
              <FieldGroup.Prefix isDecorative>
                <FieldGroup.Icon as={SearchIcon} />
              </FieldGroup.Prefix>
              <FieldGroup.Field placeholder="Touchez pour voir le focus" />
            </FieldGroup>
          </TextField>
        ))}
      </Section>

      <Section
        title="size — the glyph and the inset follow it"
        note="The decorator is inset by the field's own padding and the icon sits one step above the field's type, as on the Button and the Chip."
      >
        {SIZES.map(size => (
          <TextField key={size} size={size}>
            <TextField.Label>{size}</TextField.Label>
            <FieldGroup>
              <FieldGroup.Prefix isDecorative>
                <FieldGroup.Icon as={SearchIcon} />
              </FieldGroup.Prefix>
              <FieldGroup.Field placeholder="Rechercher…" />
              <FieldGroup.Suffix isDecorative>
                <FieldGroup.Icon as={LockIcon} />
              </FieldGroup.Suffix>
            </FieldGroup>
          </TextField>
        ))}
      </Section>

      <Section
        title="isInvalid, isDisabled, labelPlacement, color"
        note="All four are the TextField's and none of them knows this group exists. A disabled group stops taking touches, so the suffix toggle below cannot be pressed either."
      >
        <TextField isInvalid>
          <TextField.Label>Courriel</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={MailIcon} />
            </FieldGroup.Prefix>
            <FieldGroup.Field defaultValue="pas-une-adresse" autoCapitalize="none" />
          </FieldGroup>
          <TextField.Error>Il manque un @ dans l’adresse.</TextField.Error>
        </TextField>

        <TextField isDisabled>
          <TextField.Label>Verrouillé</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={LockIcon} />
            </FieldGroup.Prefix>
            <FieldGroup.Field defaultValue="ne peut pas être modifié" />
            <FieldGroup.Suffix>
              <Pressable onPress={() => undefined} hitSlop={20}>
                <FieldGroup.Icon as={EyeIcon} />
              </Pressable>
            </FieldGroup.Suffix>
          </FieldGroup>
        </TextField>

        <TextField labelPlacement="inside">
          <TextField.Label>inside</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={SearchIcon} />
            </FieldGroup.Prefix>
            <FieldGroup.Field placeholder="le décorateur est centré sur la boîte entière" />
          </FieldGroup>
        </TextField>

        <TextField variant="tertiary" color="#7c3aed">
          <TextField.Label>color</TextField.Label>
          <FieldGroup>
            <FieldGroup.Prefix isDecorative>
              <FieldGroup.Icon as={SearchIcon} color="#7c3aed" />
            </FieldGroup.Prefix>
            <FieldGroup.Field placeholder="la teinte est la bordure ; l’icône se nomme" />
          </FieldGroup>
        </TextField>
      </Section>

      <Section
        title="Multiline — the decorator is centred unless you say otherwise"
        note="A decorator spans the whole box, so over several lines it lands in the middle. Style props pin it where it belongs. This is TextField.Field with multiline, not TextArea.Field: rows and maxRows are the TextArea's and do not reach here."
      >
        <TextField>
          <TextField.Label>Message</TextField.Label>
          <FieldGroup>
            <FieldGroup.Field
              multiline
              height={96}
              textAlignVertical="top"
              paddingTop={12}
              placeholder="Racontez-nous."
            />
            <FieldGroup.Suffix isDecorative alignItems="flex-start" paddingTop={12}>
              <FieldGroup.Icon as={MailIcon} />
            </FieldGroup.Suffix>
          </FieldGroup>
        </TextField>
      </Section>
    </ScrollView>
  )
}

/** The reason `isDecorative` is a prop: a suffix that swallowed its taps is a dead toggle. */
function Password() {
  const [value, setValue] = useState('correct horse battery staple')
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Section
      title="isDecorative — touches pass through, or they do not"
      note="The lock is decorative: tapping it focuses the field under it, and a screen reader never stops on it. The eye is not: it is a control, so it keeps its touches and its place in the accessibility tree."
    >
      <TextField>
        <TextField.Label>Mot de passe</TextField.Label>
        <FieldGroup>
          <FieldGroup.Prefix isDecorative>
            <FieldGroup.Icon as={LockIcon} />
          </FieldGroup.Prefix>
          <FieldGroup.Field
            value={value}
            onChangeText={setValue}
            secureTextEntry={!isVisible}
            autoCapitalize="none"
          />
          <FieldGroup.Suffix>
            <Pressable
              onPress={() => setIsVisible(!isVisible)}
              hitSlop={20}
              accessibilityRole="button"
              accessibilityLabel={isVisible ? 'Masquer' : 'Afficher'}
            >
              <FieldGroup.Icon as={isVisible ? EyeOffIcon : EyeIcon} />
            </Pressable>
          </FieldGroup.Suffix>
        </FieldGroup>
        <TextField.Description>Douze caractères au moins.</TextField.Description>
      </TextField>
    </Section>
  )
}

function SearchIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={2} />
      <Path
        d="M20 20l-3.5-3.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

function LockIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 10h12v10H6zM9 10V7a3 3 0 016 0v3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function MailIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6h18v12H3zM3 7l9 6 9-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function EyeIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={2} />
    </Svg>
  )
}

function EyeOffIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM4 4l16 16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
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
