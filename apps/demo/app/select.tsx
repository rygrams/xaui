import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Select } from '@xaui/native/select'
import type { SelectSize, SelectVariant } from '@xaui/native/select'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: SelectVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: SelectSize[] = ['sm', 'md', 'lg']

const LANGUAGES = [
  { value: 'fr', label: 'Français', description: 'La langue par défaut' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'de', label: 'Deutsch' },
]

/**
 * The verification screen for the `Select`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it, only one for the
 * placement arithmetic.
 *
 * What each section checks is in its subtitle: the four levels are the `TextField`'s
 * field family so the two line up in a form, the chevron turns on a spring, the panel
 * grows out of the trigger and flips when the room runs out, and the list's own
 * measurements do not scale with `size`.
 */
export default function SelectScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="The four levels"
        note="The TextField's field family, token for token — put one of each next to a TextField and they are the same control. Open one: the border moves to fieldBorderFocus, the same place the field's focus goes, because to the eye 'open' and 'focused' mean the same thing."
      >
        {VARIANTS.map(variant => (
          <Picker key={variant} variant={variant} placeholder={variant} />
        ))}
      </Section>

      <Section
        title="The chevron turns on a spring"
        note="HeroUI's numbers: damping 140 against stiffness 1000 at mass 4. Heavy enough not to overshoot, which is what a 180-degree turn needs — an oscillating chevron reads as a bug. It runs on the UI thread, so it keeps turning while the rows mount."
      >
        <Picker placeholder="Ouvrir, puis fermer" />
      </Section>

      <Section
        title="Sizes — the control scales, the list does not"
        note="size moves the trigger's height, padding and type. The rows keep their own measurements: a lg select opening lg rows is a menu that fills the screen, and HeroUI takes the same position."
      >
        {SIZES.map(size => (
          <Picker key={size} size={size} placeholder={size} />
        ))}
      </Section>

      <Section
        title="Descriptions, and a group heading"
        note="Select.Label is a heading, not a row: no press, and a screen reader announces it as one. Select.ItemIndicator keeps its 20-point box whether or not the row is chosen, so choosing never shifts a label."
      >
        <Select defaultValue="fr">
          <Select.Trigger>
            <Select.Value placeholder="Choisir une langue" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Overlay />
          <Select.Content>
            <Select.Label>Langues</Select.Label>
            {LANGUAGES.map(({ value, label, description }) => (
              <Select.Item key={value} value={value} label={label}>
                <View style={{ flexShrink: 1 }}>
                  <Select.ItemLabel>{label}</Select.ItemLabel>
                  {description ? (
                    <Select.ItemDescription>{description}</Select.ItemDescription>
                  ) : null}
                </View>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </Section>

      <Section
        title="It flips when the room runs out"
        note="The panel measures itself invisibly, then places itself. Scroll so this trigger sits near the bottom and open it: the list opens upwards, and the entrance animation points back at the trigger either way. That is the one thing the measuring pass buys."
      >
        <Picker placeholder="Ouvrir près du bas de l'écran" />
      </Section>

      <Section
        title="content-fit, and the alignments"
        note="width='trigger' is the default — a list wider than the control it drops out of reads as a different surface. content-fit hugs the longest label instead, bounded by the screen insets, and align says which edge it lines up on."
      >
        <Picker
          placeholder="content-fit · start"
          width="content-fit"
          align="start"
        />
        <Picker
          placeholder="content-fit · center"
          width="content-fit"
          align="center"
        />
        <Picker placeholder="content-fit · end" width="content-fit" align="end" />
      </Section>

      <Section
        title="Invalid, and disabled"
        note="isInvalid moves the border to danger and outranks the open border. isDisabled dims the trigger and stops the press, and the list cannot be opened at all."
      >
        <Picker placeholder="isInvalid" isInvalid />
        <Picker placeholder="isDisabled" isDisabled />
      </Section>

      <Section
        title="A tint (R7)"
        note="color is a raw value, never a token. It lands where the variant says: the fill of a primary trigger, the border of a tertiary one. The panel is not tinted — it is the theme's floating surface, and it stays that whatever the control is."
      >
        <Picker placeholder="primary tinted" color="#7c3aed" />
        <Picker placeholder="tertiary tinted" variant="tertiary" color="#7c3aed" />
      </Section>

      <Section
        title="Controlled"
        note="Pass value and onValueChange and the root stops owning the selection. The trigger below is reset from outside, which is what proves it."
      >
        <ControlledPicker />
      </Section>
    </ScrollView>
  )
}

type PickerProps = {
  variant?: SelectVariant
  size?: SelectSize
  placeholder: string
  isInvalid?: boolean
  isDisabled?: boolean
  color?: string
  width?: 'trigger' | 'content-fit'
  align?: 'start' | 'center' | 'end'
}

function Picker({ placeholder, width, align, ...props }: PickerProps) {
  return (
    <Select {...props}>
      <Select.Trigger>
        <Select.Value placeholder={placeholder} />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Overlay />
      <Select.Content width={width} align={align} elevation={1}>
        {LANGUAGES.map(({ value, label }) => (
          <Select.Item key={value} value={value} label={label}>
            <Select.ItemLabel>{label}</Select.ItemLabel>
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}

function ControlledPicker() {
  const theme = useXAUITheme()
  const [value, setValue] = useState<string>('en')

  return (
    <View style={{ gap: 12 }}>
      <Select value={value} onValueChange={setValue}>
        <Select.Trigger>
          <Select.Value placeholder="Choisir" />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Overlay />
        <Select.Content>
          {LANGUAGES.map(({ value: v, label }) => (
            <Select.Item key={v} value={v} label={label}>
              <Select.ItemLabel>{label}</Select.ItemLabel>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      <Text
        onPress={() => setValue('fr')}
        style={{ color: theme.colors.accent, fontSize: theme.fontSizes.sm }}
      >
        Remettre sur Français, depuis l’extérieur
      </Text>
    </View>
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
