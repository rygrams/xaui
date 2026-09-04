import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Switch } from '@xaui/native/switch'
import type { SwitchSize, SwitchVariant } from '@xaui/native/switch'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: SwitchVariant[] = ['primary', 'secondary']
const SIZES: SwitchSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `Switch`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the two variants are a shape rather than a
 * palette, the knob and the track arrive together on one timing, the tint moves the "on"
 * colour and leaves the resting track alone, and the row is the control so the label flips
 * it.
 */
export default function SwitchScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Setting />

      <Section
        title="The two shapes"
        note="primary rides the knob inside the track; secondary stands it over a thinner bar, overhanging above and below. The legacy component called them inside and overlap; they are the same two shapes under the library's own names."
      >
        {VARIANTS.map(variant => (
          <Switch key={variant} variant={variant} defaultSelected>
            {variant}
          </Switch>
        ))}

        {VARIANTS.map(variant => (
          <Switch key={`${variant}-off`} variant={variant}>
            {`${variant} — éteint`}
          </Switch>
        ))}
      </Section>

      <Section
        title="size — the track, the knob and the type"
        note="The width is part of the control here, unlike everywhere else in the library: a switch is a fixed shape, and a track that stretched with its parent would be a progress bar."
      >
        {SIZES.map(size => (
          <Switch key={size} size={size} defaultSelected>
            {size}
          </Switch>
        ))}
        {SIZES.map(size => (
          <Switch
            key={`${size}-overlap`}
            size={size}
            variant="secondary"
            defaultSelected
          >
            {`${size} · secondary`}
          </Switch>
        ))}
      </Section>

      <Section
        title="color — the colour it turns on to"
        note="A raw tint (R7) on the on-state alone: the track at rest keeps its neutral, because a switch that is off is off in every brand. Flip each one and back."
      >
        <Switch color="#7c3aed">#7c3aed</Switch>
        <Switch color="#0f766e" defaultSelected>
          #0f766e
        </Switch>
        <Switch color="#f59e0b" variant="secondary" defaultSelected>
          #f59e0b · secondary
        </Switch>
      </Section>

      <Section
        title="isDisabled, radius, a glyph on the knob"
        note="radius is the track's corner and full is only its default. The knob's children travel with it."
      >
        <Switch isDisabled>Indisponible</Switch>
        <Switch isDisabled defaultSelected>
          Indisponible, et allumé
        </Switch>
        <Switch radius="sm" defaultSelected>
          radius=&quot;sm&quot;
        </Switch>
        <Switch size="lg" defaultSelected>
          <Switch.Track>
            <Switch.Thumb>
              <Text style={{ color: theme.colors.accent, fontSize: 12 }}>✓</Text>
            </Switch.Thumb>
          </Switch.Track>
          <Switch.Label>Un signe sur le bouton</Switch.Label>
        </Switch>
      </Section>

      <Section
        title="animation={false} — no slide, no crossfade"
        note="On the two slots rather than the root, and each drops its own worklet: with it off, the Reanimated hooks are never reached at all."
      >
        <Switch defaultSelected>
          <Switch.Track animation={false}>
            <Switch.Thumb animation={false} />
          </Switch.Track>
          <Switch.Label>Sans animation</Switch.Label>
        </Switch>
      </Section>
    </ScrollView>
  )
}

/** The switch as it is actually used: a setting that applies the moment it is flipped. */
function Setting() {
  const [isOn, setIsOn] = useState(false)

  return (
    <Section
      title="The whole component, most of the time"
      note="Text children become the label (R3) and the root supplies the track and the knob. Tap the words: the root is the row, so the label flips it too. There is no isInvalid — a setting that has already taken effect has no later moment at which it can be wrong."
    >
      <Switch isSelected={isOn} onSelectedChange={setIsOn}>
        Mode sombre
      </Switch>
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
