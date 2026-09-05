import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Input } from '@xaui/native/input'
import type { InputVariant } from '@xaui/native/input'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: InputVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']

/**
 * The verification screen for the `Input`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the four levels read the theme's `field*`
 * family and nothing else, focus darkens the border without moving anything, `isInvalid`
 * outranks focus, `size` moves the field's minimum height and the type, and every
 * `TextInput` prop still works because the field *is* a `TextInput`.
 */
export default function InputScreen() {
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
          <Input key={variant} variant={variant}>
            <Input.Label>{variant}</Input.Label>
            <Input.Field placeholder="Touchez pour voir le focus" />
          </Input>
        ))}
      </Section>

      <Section
        title="Anatomy — label, field, description, error"
        note="A column with one gap. The label and the help text are inset by half the field's padding, so the three read as one block rather than as a label, a box and a stray line."
      >
        <Input>
          <Input.Label>Courriel</Input.Label>
          <Input.Field
            placeholder="nom@exemple.fr"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <Input.Description>On ne le partage jamais.</Input.Description>
        </Input>
      </Section>

      <Validated />

      <Section
        title="labelPlacement — outside, or lifted into the box"
        note="The JSX is identical either way: inside takes the label out of flow and places it against the box's own padding, so nothing is reparented. The field pays for the room, and the box grows by the same amount."
      >
        <Input labelPlacement="outside">
          <Input.Label>outside · au-dessus de la boîte</Input.Label>
          <Input.Field placeholder="nom@exemple.fr" />
        </Input>

        <Input labelPlacement="inside">
          <Input.Label>inside · dans la boîte</Input.Label>
          <Input.Field placeholder="nom@exemple.fr" />
          <Input.Description>La description reste après le champ.</Input.Description>
        </Input>

        <Input labelPlacement="inside" variant="primary">
          <Input.Label>inside · primary</Input.Label>
          <Input.Field placeholder="fond du champ, plus l’ombre field" />
        </Input>

        <Input labelPlacement="inside" size="lg" variant="tertiary">
          <Input.Label>inside · lg · tertiary</Input.Label>
          <Input.Field placeholder="le label passe à 14/20 en lg" />
        </Input>
      </Section>

      <Section
        title="size — the field's minimum height, never its width"
        note="A minimum and not a fixed height, which is where this component departs from the Button: a multiline field holds the user's own text and has to grow. md is HeroUI's input exactly — 48 minimum, 12 of padding, a 16/24 label, a 14/20 line below."
      >
        <Input size="xs">
          <Input.Label>xs · 32</Input.Label>
          <Input.Field placeholder="14pt" />
        </Input>
        <Input size="sm">
          <Input.Label>sm · 40</Input.Label>
          <Input.Field placeholder="16pt" />
        </Input>
        <Input size="md">
          <Input.Label>md · 48</Input.Label>
          <Input.Field placeholder="16pt" />
        </Input>
        <Input size="lg">
          <Input.Label>lg · 56</Input.Label>
          <Input.Field placeholder="18pt" />
        </Input>
      </Section>

      <Section
        title="The field is a TextInput"
        note="secureTextEntry, keyboardType, autoComplete, maxLength — they are written on Input.Field because that is the node that has them. multiline works here too; Input.TextArea below is the same field with the three things several lines actually need."
      >
        <Input>
          <Input.Label>Mot de passe</Input.Label>
          <Input.Field secureTextEntry placeholder="••••••••" />
        </Input>

        <Input>
          <Input.Label>Message</Input.Label>
          <Input.Field
            multiline
            placeholder="multiline brut : à vous la hauteur et l’alignement. Voir l’écran TextArea."
          />
        </Input>
      </Section>

      <Section
        title="isDisabled"
        note="Dims the whole column and makes the field uneditable. editable is not a public prop — isDisabled on the root is what stops it (R8)."
      >
        <Input isDisabled>
          <Input.Label>Identifiant</Input.Label>
          <Input.Field value="ne peut pas être modifié" />
          <Input.Description>Défini à la création du compte.</Input.Description>
        </Input>
      </Section>

      <Section
        title="Style as props, and radius"
        note="Every node takes its own style keys. radius overrides the theme's field radius, which every size shares."
      >
        <Input radius="sm">
          <Input.Label letterSpacing={0.4}>radius=&quot;sm&quot;</Input.Label>
          <Input.Field placeholder="coins carrés" />
        </Input>
        <Input variant="tertiary">
          <Input.Label>Recherche</Input.Label>
          <Input.Field placeholder="borderWidth 2" borderWidth={2} />
        </Input>
      </Section>

      <Section
        title="color — a raw tint, landing where the variant puts its tokens"
        note="On a tertiary or a ghost the tint is the border and the focus. On a primary or a secondary it is the fill, like a tinted Button — consistent, and rarely what a form wants."
      >
        <Input variant="tertiary" color="#7c3aed">
          <Input.Label>tertiary · la teinte est la bordure</Input.Label>
          <Input.Field placeholder="touchez pour voir le focus violet" />
        </Input>
        <Input color="#7c3aed">
          <Input.Label>secondary · la teinte est le fond</Input.Label>
          <Input.Field placeholder="cohérent, mais rarement voulu" />
        </Input>
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
      <Input isInvalid={isInvalid}>
        <Input.Label>Courriel</Input.Label>
        <Input.Field
          value={value}
          onChangeText={setValue}
          placeholder="nom@exemple.fr"
          autoCapitalize="none"
        />
        {isInvalid ? (
          <Input.Error>Il manque un @ dans l’adresse.</Input.Error>
        ) : (
          <Input.Description>L’adresse a l’air correcte.</Input.Description>
        )}
      </Input>
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
