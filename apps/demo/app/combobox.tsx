import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Combobox } from '@xaui/native/combobox'
import type { ComboboxSize, ComboboxVariant } from '@xaui/native/combobox'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ComboboxVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: ComboboxSize[] = ['sm', 'md', 'lg']

const ANIMALS = [
  { value: 'cat', label: 'Chat' },
  { value: 'dog', label: 'Chien' },
  { value: 'bird', label: 'Oiseau' },
  { value: 'rabbit', label: 'Lapin' },
  { value: 'horse', label: 'Cheval' },
  { value: 'hedgehog', label: 'Hérisson' },
]

/**
 * The verification screen for the `Combobox`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * The two things to check are the two a table cannot show: that what the field displays
 * flips between the query and the chosen label as the panel opens and closes, and that the
 * chevron opens the list without raising the keyboard.
 */
export default function ComboboxScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 320 }}
      keyboardShouldPersistTaps="handled"
    >
      <Section
        title="A field you type in, over a list you must choose from"
        note="It is the Autocomplete with the search moved into the trigger. Type to narrow; the list is closed, so what you typed never becomes the value — close without choosing and the chosen label comes back."
      >
        <Field />
      </Section>

      <Section
        title="The chevron opens it without typing"
        note="It is a control here where the Autocomplete's is a decoration: that trigger is itself pressable, this one is a field that raises a keyboard, so the way into the list without typing has to be the chevron."
      >
        <Field defaultValue="dog" />
      </Section>

      <Section
        title="Nothing matched"
        note="Combobox.Empty is Autocomplete.Empty — the same object, so a row is a row whichever field opened it. Type zzz to see it."
      >
        <Field />
      </Section>

      <Section
        title="The four field levels"
        note="The box is the Select's field, exactly as the Autocomplete's trigger is: the same tokens, the same four levels, resolved through the same recipe rather than a second table half a shade off it."
      >
        {VARIANTS.map(variant => (
          <Field key={variant} variant={variant} placeholder={variant} />
        ))}
      </Section>

      <Section
        title="size, and the states"
        note="isInvalid paints the field, isDisabled stops it. Both are the Select's, for the same reason the levels are."
      >
        {SIZES.map(size => (
          <Field key={size} size={size} placeholder={size} />
        ))}
        <Field isInvalid placeholder="isInvalid" />
        <Field isDisabled placeholder="isDisabled" />
        <Field color="#7c3aed" placeholder="color=#7c3aed" />
      </Section>
    </ScrollView>
  )
}

function Field({
  placeholder = 'Chercher un animal…',
  ...props
}: {
  placeholder?: string
  variant?: ComboboxVariant
  size?: ComboboxSize
  color?: string
  defaultValue?: string
  isInvalid?: boolean
  isDisabled?: boolean
}) {
  const [value, setValue] = useState(props.defaultValue)

  return (
    <View style={{ gap: 8 }}>
      <Combobox {...props} value={value} onValueChange={setValue}>
        <Combobox.Trigger>
          <Combobox.Input placeholder={placeholder} />
          <Combobox.Indicator accessibilityLabel="Ouvrir la liste" />
        </Combobox.Trigger>
        <Combobox.Overlay />
        <Combobox.Content>
          {ANIMALS.map(animal => (
            <Combobox.Item key={animal.value} value={animal.value}>
              {animal.label}
            </Combobox.Item>
          ))}
          <Combobox.Empty>Aucun animal ne correspond</Combobox.Empty>
        </Combobox.Content>
      </Combobox>
      <Chosen value={value} />
    </View>
  )
}

/** What the control actually holds, beside what the field shows. */
function Chosen({ value }: { value: string | undefined }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {value === undefined ? 'value: —' : `value: ${value}`}
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
