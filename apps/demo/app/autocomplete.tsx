import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Autocomplete } from '@xaui/native/autocomplete'
import type {
  AutocompleteSize,
  AutocompleteVariant,
} from '@xaui/native/autocomplete'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: AutocompleteVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: AutocompleteSize[] = ['sm', 'md', 'lg']

const STATES = [
  { value: 'ca', label: 'Californie' },
  { value: 'tx', label: 'Texas' },
  { value: 'fl', label: 'Floride' },
  { value: 'ny', label: 'New York' },
  { value: 'ge', label: 'Genève' },
  { value: 'qc', label: 'Québec' },
]

/**
 * The verification screen for the `Autocomplete`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 */
export default function AutocompleteScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 240 }}
    >
      <Section
        title="A field that opens a list you search"
        note="Not a Select. A select is for a list you read — a dozen options, all visible, and choosing is recognising one. An autocomplete is for a list you cannot read, where choosing is finding, and the field you type in is the control rather than an extra row in a menu. Same trigger, same panel, same rows; a different thing to do with them."
      >
        <Field />
      </Section>

      <Section
        title="The search folds accents"
        note="geneve finds Genève and quebec finds Québec, both ways. It matches any word rather than the first: a prefix match on New York refuses york, and a long list is searched by whichever word someone remembers."
      >
        <Field defaultQuery="" />
      </Section>

      <Section
        title="Nothing matched"
        note="Autocomplete.Empty renders instead of the results, and only then. A panel that filtered its last row away and showed an empty box reads as a control that has broken rather than as a search that found nothing. Type zzz to see it."
      >
        <Field />
      </Section>

      <Section
        title="The four field levels"
        note="The trigger is a field, so it takes the same four levels the TextField and the Select take — and it takes them from the Select's own recipe rather than from a second table, so the two never drift apart in a form."
      >
        {VARIANTS.map(variant => (
          <Field key={variant} variant={variant} />
        ))}
      </Section>

      <Section
        title="Sizes move the control, not the panel"
        note="size is the control's scale, and the panel is not the control — a lg trigger opening lg rows is a menu that fills the screen. Only the type in the search box follows, so what you type reads at the size of what you will pick."
      >
        {SIZES.map(size => (
          <Field key={size} size={size} />
        ))}
      </Section>

      <Section
        title="A tint, and disabled"
        note="color is a raw value, never a token. It repaints the trigger and the search box, and takes the placeholder with it — fieldPlaceholder was chosen against the theme's field colour, and on a purple trigger it is unreadable."
      >
        <Field color="#7c3aed" />
        <Field isDisabled />
      </Section>
    </ScrollView>
  )
}

function Field({
  variant,
  size,
  color,
  isDisabled,
  defaultQuery,
}: {
  variant?: AutocompleteVariant
  size?: AutocompleteSize
  color?: string
  isDisabled?: boolean
  defaultQuery?: string
}) {
  const [value, setValue] = useState<string>()

  return (
    <Autocomplete
      value={value}
      onValueChange={setValue}
      variant={variant}
      size={size}
      color={color}
      isDisabled={isDisabled}
      defaultQuery={defaultQuery}
    >
      <Autocomplete.Trigger>
        <Autocomplete.Value placeholder="Choisir un état" />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Overlay />
      <Autocomplete.Content>
        <Autocomplete.Search placeholder="Rechercher un état…" />
        {STATES.map(state => (
          <Autocomplete.Item key={state.value} value={state.value}>
            {state.label}
          </Autocomplete.Item>
        ))}
        <Autocomplete.Empty>Aucun état ne correspond</Autocomplete.Empty>
      </Autocomplete.Content>
    </Autocomplete>
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
