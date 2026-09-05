import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Checkbox } from '@xaui/native/checkbox'
import type { CheckboxSize, CheckboxVariant } from '@xaui/native/checkbox'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: CheckboxVariant[] = ['primary', 'secondary', 'tertiary']
const SIZES: CheckboxSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `Checkbox`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the root is the row, so the label toggles
 * the box; the variant describes the box at rest and the accent is what it checks in;
 * `color` follows the tick because the selected fill is a role rather than an axis; and
 * the built-in check is drawn rather than imported, so none of this needs an icon set.
 */
export default function CheckboxScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <ShortForm />

      <Section
        title="The three levels — the box at rest"
        note="The TextField's field family on a 24pt box: primary is the field fill plus the field shadow, secondary the neutral one and the default here, tertiary the border alone. There is no ghost: a box with no border and no fill is nothing at all. All three check in the accent."
      >
        {VARIANTS.map(variant => (
          <Toggle key={variant} variant={variant} label={variant} />
        ))}
      </Section>

      <Section
        title="size — the box, the glyph, the gap and the type"
        note="The check is derived from the box — half its width, a quarter its height — so it is the same glyph at every size rather than four drawings of one."
      >
        {SIZES.map(size => (
          <Toggle key={size} size={size} label={`${size} · ${BOXES[size]}pt`} />
        ))}
      </Section>

      <Section
        title="color — the colour it checks in"
        note="A raw tint (R7). It lands on the selected fill because that fill is a role the tint pass repaints, not an axis it would have skipped — and the mark is derived to read against it."
      >
        <Toggle color="#7c3aed" label="#7c3aed" defaultSelected />
        <Toggle color="#0f766e" label="#0f766e" defaultSelected />
        <Toggle
          color="#f59e0b"
          label="#f59e0b — la marque se contraste"
          defaultSelected
        />
      </Section>

      <SelectAll />

      <Invalid />

      <Section
        title="isDisabled — the row dims and the press stops"
        note="On the row, not the box: what is disabled is the control, and the label is part of it."
      >
        <Toggle isDisabled label="Verrouillé, non coché" />
        <Toggle isDisabled defaultSelected label="Verrouillé, coché" />
      </Section>

      <Section
        title="A label that wraps"
        note="The box centres on the row by default. A paragraph wants it against the first line instead — alignItems is a style prop (R14), not a second API."
      >
        <Checkbox alignItems="flex-start" defaultSelected maxWidth={300}>
          <Checkbox.Indicator />
          <Checkbox.Label>
            J’accepte que ces informations soient conservées le temps du traitement
            de ma demande, et pas une minute de plus.
          </Checkbox.Label>
        </Checkbox>
      </Section>

      <Section
        title="animation={false} — the mark without the fade"
        note="Two components rather than a branch: with it off, the Reanimated hooks are never reached at all."
      >
        <Checkbox defaultSelected>
          <Checkbox.Indicator animation={false} />
          <Checkbox.Label>Sans animation</Checkbox.Label>
        </Checkbox>
      </Section>

      <Section
        title="A mark of your own"
        note="Children replace the built-in check and ride the same fade. The built-in one exists so that a checkbox works in a project with no icon set — not to stop you having your own."
      >
        <Checkbox defaultSelected size="lg">
          <Checkbox.Indicator>
            <Text style={{ color: theme.colors.accentForeground, fontSize: 12 }}>
              OK
            </Text>
          </Checkbox.Indicator>
          <Checkbox.Label>Une marque écrite</Checkbox.Label>
        </Checkbox>
      </Section>
    </ScrollView>
  )
}

/** What each size measures, for the row's own label. */
const BOXES: Record<CheckboxSize, number> = { sm: 20, md: 24, lg: 28 }

/** The short form: text children become the label, and the box comes with them. */
function ShortForm() {
  const [accepted, setAccepted] = useState(false)

  return (
    <Section
      title="The whole component, most of the time"
      note="Text children become the label (R3) and the root supplies the box. Tap the words: the root is the row, so the label toggles it too. Controlled here; leave isSelected out and it keeps its own state."
    >
      <Checkbox isSelected={accepted} onSelectedChange={setAccepted}>
        J’accepte les conditions
      </Checkbox>
    </Section>
  )
}

/** The reason `isIndeterminate` exists: a header that speaks for rows it cannot see. */
function SelectAll() {
  const [rows, setRows] = useState([true, false, false])
  const all = rows.every(Boolean)
  const some = rows.some(Boolean)

  return (
    <Section
      title="isIndeterminate — the third state"
      note="A dash rather than a check, mixed rather than checked in the accessibility tree, and a press resolves it to selected rather than toggling into it — which is what a browser's own indeterminate checkbox does."
    >
      <Checkbox
        isSelected={all}
        isIndeterminate={some && !all}
        onSelectedChange={value => setRows(rows.map(() => value))}
      >
        Tout sélectionner
      </Checkbox>

      <View style={{ gap: 8, paddingStart: 32 }}>
        {rows.map((isOn, index) => (
          <Checkbox
            key={index}
            size="sm"
            isSelected={isOn}
            onSelectedChange={value =>
              setRows(rows.map((row, at) => (at === index ? value : row)))
            }
          >
            {`Ligne ${index + 1}`}
          </Checkbox>
        ))}
      </View>
    </Section>
  )
}

/** `isInvalid` drives the colours; nothing here mounts or unmounts a message. */
function Invalid() {
  const [accepted, setAccepted] = useState(false)

  return (
    <Section
      title="isInvalid — and it outranks color"
      note="The border, the fill and the label turn danger, and the resting fill is dropped so a box that is wrong reads as an outline. Tick it: the mark is danger too. The tint below is ignored while it is invalid — an error outranks a brand colour."
    >
      <Checkbox
        isSelected={accepted}
        onSelectedChange={setAccepted}
        isInvalid={!accepted}
        color="#7c3aed"
      >
        Il faut accepter pour continuer
      </Checkbox>
    </Section>
  )
}

/** One uncontrolled checkbox, so every row of the screen is tappable on its own. */
function Toggle({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Checkbox>) {
  return <Checkbox {...props}>{label}</Checkbox>
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
