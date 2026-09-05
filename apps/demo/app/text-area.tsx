import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { TextArea } from '@xaui/native/text-area'
import type { InputVariant } from '@xaui/native/input'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: InputVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']

/**
 * The verification screen for the `TextArea`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: it is an `Input`, so every one of the
 * `Input`'s props still works on it; `rows` is a height in lines rather than in points;
 * `maxRows` is what turns scrolling on; and the label placement composes with all of it.
 */
export default function TextAreaScreen() {
  const theme = useXAUITheme()
  const [message, setMessage] = useState('')

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
      keyboardShouldPersistTaps="handled"
    >
      <Section
        title="rows — a height in lines"
        note="Three by default. It is a raw value like color, resolved outside the style cache from the line height the size chose, so rows={7} costs no cache entry."
      >
        <TextArea>
          <TextArea.Label>Message</TextArea.Label>
          <TextArea.Field
            value={message}
            onChangeText={setMessage}
            placeholder="rows=3 par défaut · 88pt en md"
          />
          <TextArea.Description>Trois lignes suffisent.</TextArea.Description>
        </TextArea>

        <TextArea rows={2}>
          <TextArea.Label>rows={'{2}'}</TextArea.Label>
          <TextArea.Field />
        </TextArea>

        <TextArea rows={6}>
          <TextArea.Label>rows={'{6}'}</TextArea.Label>
          <TextArea.Field />
        </TextArea>
      </Section>

      <Section
        title="maxRows — the ceiling, and the only reason to scroll"
        note="Unset, the field grows for as long as the text does and has nothing to scroll. With a ceiling it stops there and scrollEnabled follows."
      >
        <TextArea rows={3} maxRows={6}>
          <TextArea.Label>De 3 à 6 lignes</TextArea.Label>
          <TextArea.Field placeholder="Écrivez plus de six lignes : le champ arrête de grandir et défile." />
        </TextArea>

        <TextArea rows={2}>
          <TextArea.Label>Sans plafond</TextArea.Label>
          <TextArea.Field placeholder="Grandit indéfiniment avec le texte." />
        </TextArea>
      </Section>

      <Section
        title="It is an Input — every one of its props still works"
        note="The root is the Input's root: the same recipe, the same resolved context, the same four levels. Label, Description and Error are literally the Input's slots, re-exported rather than wrapped."
      >
        {VARIANTS.map(variant => (
          <TextArea key={variant} rows={2} variant={variant}>
            <TextArea.Label>{variant}</TextArea.Label>
            <TextArea.Field placeholder="Touchez pour voir le focus" />
          </TextArea>
        ))}
      </Section>

      <Section
        title="isInvalid, isDisabled, labelPlacement, size, color"
        note="Nothing here is the TextArea's own — it inherits all of it by being an Input. The inside label keeps its room at the top and the first line starts below it."
      >
        <TextArea rows={2} isInvalid>
          <TextArea.Label>Trop court</TextArea.Label>
          <TextArea.Field defaultValue="ok" />
          <TextArea.Error>Au moins vingt caractères.</TextArea.Error>
        </TextArea>

        <TextArea rows={2} isDisabled>
          <TextArea.Label>Verrouillé</TextArea.Label>
          <TextArea.Field defaultValue="ne peut pas être modifié" />
        </TextArea>

        <TextArea rows={3} labelPlacement="inside">
          <TextArea.Label>inside</TextArea.Label>
          <TextArea.Field placeholder="le label garde sa place en haut" />
        </TextArea>

        <TextArea rows={2} size="sm">
          <TextArea.Label>size=&quot;sm&quot;</TextArea.Label>
          <TextArea.Field />
        </TextArea>

        <TextArea rows={2} size="lg">
          <TextArea.Label>size=&quot;lg&quot;</TextArea.Label>
          <TextArea.Field />
        </TextArea>

        <TextArea rows={2} variant="tertiary" color="#7c3aed">
          <TextArea.Label>color</TextArea.Label>
          <TextArea.Field placeholder="la teinte est la bordure, et le focus" />
        </TextArea>
      </Section>

      <Section
        title="height — HeroUI's fixed text area"
        note="Theirs is a fixed 128 that scrolls rather than one that grows. A style prop reproduces it exactly, which is the escape hatch rather than a second API."
      >
        <TextArea>
          <TextArea.Label>height={'{128}'}</TextArea.Label>
          <TextArea.Field height={128} />
        </TextArea>
      </Section>
    </ScrollView>
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
