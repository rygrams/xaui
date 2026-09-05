import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TextField } from '@xaui/native/text-field'
import type { TextFieldVariant } from '@xaui/native/text-field'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: TextFieldVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']

/**
 * The verification screen for the `TextField`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the four levels read the theme's `field*`
 * family and nothing else, focus darkens the border without moving anything, `isInvalid`
 * outranks focus, `size` moves the field's minimum height and the type, and every
 * `TextInput` prop still works because the field *is* a `TextInput`.
 */
export default function TextFieldScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
    >
      <Section
        title="The four levels"
        note="primary is HeroUI's field fill plus the theme's field shadow; secondary is their neutral one, and the default here. Tap each: the border darkens towards the mode's ink — fieldBorderFocus, no ring and no accent. ghost has no border to move, so its focus is the caret alone."
      >
        {VARIANTS.map(variant => (
          <TextField key={variant} variant={variant}>
            <TextField.Label>{variant}</TextField.Label>
            <TextField.Field placeholder="Touchez pour voir le focus" />
          </TextField>
        ))}
      </Section>

      <Section
        title="Anatomy — label, field, description, error"
        note="A column with one gap. The label and the help text are inset by half the field's padding, so the three read as one block rather than as a label, a box and a stray line."
      >
        <TextField>
          <TextField.Label>Courriel</TextField.Label>
          <TextField.Field
            placeholder="nom@exemple.fr"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextField.Description>On ne le partage jamais.</TextField.Description>
        </TextField>
      </Section>

      <Validated />

      <Section
        title="labelPlacement — outside, or lifted into the box"
        note="The JSX is identical either way: inside takes the label out of flow and places it against the box's own padding, so nothing is reparented. The field pays for the room, and the box grows by the same amount."
      >
        <TextField labelPlacement="outside">
          <TextField.Label>outside · au-dessus de la boîte</TextField.Label>
          <TextField.Field placeholder="nom@exemple.fr" />
        </TextField>

        <TextField labelPlacement="inside">
          <TextField.Label>inside · dans la boîte</TextField.Label>
          <TextField.Field placeholder="nom@exemple.fr" />
          <TextField.Description>
            La description reste après le champ.
          </TextField.Description>
        </TextField>

        <TextField labelPlacement="inside" variant="primary">
          <TextField.Label>inside · primary</TextField.Label>
          <TextField.Field placeholder="fond du champ, plus l’ombre field" />
        </TextField>

        <TextField labelPlacement="inside" size="lg" variant="tertiary">
          <TextField.Label>inside · lg · tertiary</TextField.Label>
          <TextField.Field placeholder="le label passe à 14/20 en lg" />
        </TextField>
      </Section>

      <Section
        title="size — the field's minimum height, never its width"
        note="A minimum and not a fixed height, which is where this component departs from the Button: a multiline field holds the user's own text and has to grow. md is HeroUI's input exactly — 48 minimum, 12 of padding, a 16/24 label, a 14/20 line below."
      >
        <TextField size="xs">
          <TextField.Label>xs · 32</TextField.Label>
          <TextField.Field placeholder="14pt" />
        </TextField>
        <TextField size="sm">
          <TextField.Label>sm · 40</TextField.Label>
          <TextField.Field placeholder="16pt" />
        </TextField>
        <TextField size="md">
          <TextField.Label>md · 48</TextField.Label>
          <TextField.Field placeholder="16pt" />
        </TextField>
        <TextField size="lg">
          <TextField.Label>lg · 56</TextField.Label>
          <TextField.Field placeholder="18pt" />
        </TextField>
      </Section>

      <Section
        title="The field is a TextInput"
        note="secureTextEntry, keyboardType, autoComplete, maxLength — they are written on TextField.Field because that is the node that has them. multiline works here too; TextField.TextArea below is the same field with the three things several lines actually need."
      >
        <TextField>
          <TextField.Label>Mot de passe</TextField.Label>
          <TextField.Field secureTextEntry placeholder="••••••••" />
        </TextField>

        <TextField>
          <TextField.Label>Message</TextField.Label>
          <TextField.Field
            multiline
            placeholder="multiline brut : à vous la hauteur et l’alignement. Voir l’écran TextArea."
          />
        </TextField>
      </Section>

      <Section
        title="isDisabled"
        note="Dims the whole column and makes the field uneditable. editable is not a public prop — isDisabled on the root is what stops it (R8)."
      >
        <TextField isDisabled>
          <TextField.Label>Identifiant</TextField.Label>
          <TextField.Field value="ne peut pas être modifié" />
          <TextField.Description>
            Défini à la création du compte.
          </TextField.Description>
        </TextField>
      </Section>

      <Section
        title="Style as props, and radius"
        note="Every node takes its own style keys. radius overrides the theme's field radius, which every size shares."
      >
        <TextField radius="sm">
          <TextField.Label letterSpacing={0.4}>
            radius=&quot;sm&quot;
          </TextField.Label>
          <TextField.Field placeholder="coins carrés" />
        </TextField>
        <TextField variant="tertiary">
          <TextField.Label>Recherche</TextField.Label>
          <TextField.Field placeholder="borderWidth 2" borderWidth={2} />
        </TextField>
      </Section>

      <Section
        title="color — a raw tint, landing where the variant puts its tokens"
        note="On a tertiary or a ghost the tint is the border and the focus. On a primary or a secondary it is the fill, like a tinted Button — consistent, and rarely what a form wants."
      >
        <TextField variant="tertiary" color="#7c3aed">
          <TextField.Label>tertiary · la teinte est la bordure</TextField.Label>
          <TextField.Field placeholder="touchez pour voir le focus violet" />
        </TextField>
        <TextField color="#7c3aed">
          <TextField.Label>secondary · la teinte est le fond</TextField.Label>
          <TextField.Field placeholder="cohérent, mais rarement voulu" />
        </TextField>
      </Section>
    </ScrollView>
  )
}

/** `isInvalid` drives the colours; the caller decides whether the message is mounted. */
function Validated() {
  const [value, setValue] = useState('pas-une-adresse')
  const isInvalid = value.length > 0 && !value.includes('@')

  return (
    <Section
      title="isInvalid — and it outranks focus"
      note="Type an @ and the red clears. Focus the field while it is wrong: the border stays red, because a field that is both should read as wrong rather than as busy. The message is mounted by the caller — a slot that silently renders nothing is a slot you cannot debug."
    >
      <TextField isInvalid={isInvalid}>
        <TextField.Label>Courriel</TextField.Label>
        <TextField.Field
          value={value}
          onChangeText={setValue}
          placeholder="nom@exemple.fr"
          autoCapitalize="none"
        />
        {isInvalid ? (
          <TextField.Error>Il manque un @ dans l’adresse.</TextField.Error>
        ) : (
          <TextField.Description>L’adresse a l’air correcte.</TextField.Description>
        )}
      </TextField>
    </Section>
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
