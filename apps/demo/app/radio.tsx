import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Radio } from '@xaui/native/radio'
import type { RadioSize, RadioVariant } from '@xaui/native/radio'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: RadioVariant[] = ['primary', 'secondary', 'tertiary']
const SIZES: RadioSize[] = ['xs', 'sm', 'md', 'lg']
const PLANS = ['monthly', 'yearly', 'lifetime'] as const

/**
 * The verification screen for the `Radio`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: a press selects and never clears, the set
 * is a row of radios over one piece of state rather than a group component, and everything
 * else — the three levels, the four sizes, the tint, `isInvalid`, `isDisabled` — is the
 * `Checkbox`'s, on a circle.
 */
export default function RadioScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Choice />

      <Section
        title="A press selects, it never clears"
        note="Tap the chosen option again: nothing happens, and onSelectedChange does not fire. A set of options has no “none of these” unless one of them says so."
      >
        <Radio defaultSelected>Déjà choisi — tapez encore</Radio>
      </Section>

      <Section
        title="The three levels — the circle at rest"
        note="The Checkbox's three rows, unchanged: an option that looked different from a checkbox in the same form would be a second design language rather than a second control."
      >
        {VARIANTS.map(variant => (
          <Radio
            key={variant}
            variant={variant}
            defaultSelected={variant === 'primary'}
          >
            {variant}
          </Radio>
        ))}
      </Section>

      <Section
        title="size — the circle, the dot, the gap and the type"
        note="The same four boxes as the Checkbox, so a radio and a checkbox in one form line up. The dot keeps HeroUI's ratio — 10 in 24 — at every size."
      >
        {SIZES.map(size => (
          <Radio key={size} size={size} defaultSelected>
            {`${size} · ${BOXES[size]}pt`}
          </Radio>
        ))}
      </Section>

      <Section
        title="color — the colour the option takes once chosen"
        note="A raw tint (R7), on the selected fill, with the dot derived to read against it. It reaches there because the fill is a role rather than an axis."
      >
        <Radio color="#7c3aed" defaultSelected>
          #7c3aed
        </Radio>
        <Radio color="#0f766e" defaultSelected>
          #0f766e
        </Radio>
        <Radio color="#f59e0b" defaultSelected>
          #f59e0b — le point se contraste
        </Radio>
      </Section>

      <Section
        title="isInvalid — and it outranks color"
        note="The border, the fill and the label turn danger, and the resting fill is dropped so an option that is wrong reads as an outline."
      >
        <Radio isInvalid>Aucune option choisie</Radio>
        <Radio isInvalid defaultSelected color="#7c3aed">
          Choisie, et invalide — la teinte est ignorée
        </Radio>
      </Section>

      <Section
        title="isDisabled, radius, a mark of your own"
        note="radius is on the root like everywhere else, and full is only its default — a squared-off option in a segmented row is a real design."
      >
        <Radio isDisabled>Indisponible</Radio>
        <Radio isDisabled defaultSelected>
          Indisponible, et choisie
        </Radio>
        <Radio radius="sm" defaultSelected>
          radius=&quot;sm&quot;
        </Radio>
        <Radio defaultSelected size="lg">
          <Radio.Indicator>
            <Text style={{ color: theme.colors.accentForeground, fontSize: 10 }}>
              ✓
            </Text>
          </Radio.Indicator>
          <Radio.Label>Une marque écrite</Radio.Label>
        </Radio>
      </Section>
    </ScrollView>
  )
}

/** What each size measures, for the row's own label. */
const BOXES: Record<RadioSize, number> = { xs: 16, sm: 20, md: 24, lg: 28 }

/** The set: three radios over one piece of state. There is no group component. */
function Choice() {
  const [plan, setPlan] = useState<(typeof PLANS)[number]>('monthly')

  return (
    <Section
      title="A set is a row of radios over one value"
      note="RadioGroup is a P5 component with a context of its own, not a prop this one is missing. Until it lands, the wrapper carries the radiogroup role and each option compares the value it stands for."
    >
      <View accessibilityRole="radiogroup" style={{ gap: 12 }}>
        {PLANS.map(value => (
          <Radio
            key={value}
            isSelected={plan === value}
            onSelectedChange={() => setPlan(value)}
          >
            {LABELS[value]}
          </Radio>
        ))}
      </View>
    </Section>
  )
}

const LABELS: Record<(typeof PLANS)[number], string> = {
  monthly: 'Tous les mois',
  yearly: 'Tous les ans — deux mois offerts',
  lifetime: 'À vie',
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
