import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Chip } from '@xaui/native/chip'
import type { ChipVariant } from '@xaui/native/chip'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ChipVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
  'success',
  'success-soft',
  'warning',
  'warning-soft',
  'danger',
  'danger-soft',
]

const FILTERS = ['Design', 'Mobile', 'Accessibilité', 'Perf']

/**
 * The verification screen for the `Chip`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the eleven variants name tokens and
 * nothing else, `size` moves the height and the type and never the width, the four slots
 * are spaced by the root alone, a raw `color` lands where the variant put its tokens, and
 * `isPressable` turns the token into a control without changing anything else about it.
 */
export default function ChipScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 64 }}
    >
      <Section
        title="The eleven variants"
        note="The Button's five-step ladder, plus the three status families it refused. A chip reports an outcome, so success, warning and danger are here — each with its soft slice, which is the pair a status is normally written in."
      >
        <Row>
          {VARIANTS.map(variant => (
            <Chip key={variant} variant={variant}>
              {variant}
            </Chip>
          ))}
        </Row>
      </Section>

      <Section
        title="size — height, never width"
        note="A chip hugs its label: alignSelf is flex-start, so a chip in a column stays the width of its text instead of stretching. The height is fixed, which is what keeps a row of chips lined up when one of them carries an avatar."
      >
        <Chip size="xs">xs · 20</Chip>
        <Chip size="sm">sm · 24</Chip>
        <Chip size="md">md · 28</Chip>
        <Chip size="lg">lg · 36</Chip>

        <Row>
          <Chip size="xs" variant="success-soft">
            <Chip.Dot />
            <Chip.Label>xs</Chip.Label>
          </Chip>
          <Chip size="sm" variant="success-soft">
            <Chip.Dot />
            <Chip.Label>sm</Chip.Label>
          </Chip>
          <Chip size="md" variant="success-soft">
            <Chip.Dot />
            <Chip.Label>md</Chip.Label>
          </Chip>
          <Chip size="lg" variant="success-soft">
            <Chip.Dot />
            <Chip.Label>lg</Chip.Label>
          </Chip>
        </Row>
      </Section>

      <Section
        title="Anatomy — dot, icon, avatar, label, close"
        note="Nothing is spaced by hand: the root's gap separates every slot, so JSX order is screen order. The dot and the cross take the variant's foreground, and the avatar's diameter always fits inside the chip's height."
      >
        <Row>
          <Chip variant="tertiary">
            <Chip.Dot />
            <Chip.Label>En cours</Chip.Label>
          </Chip>

          <Chip variant="warning-soft">
            <Chip.Icon as={AlertIcon} />
            <Chip.Label>Expire demain</Chip.Label>
          </Chip>

          <Chip variant="default">
            <Chip.Avatar source={{ uri: 'https://i.pravatar.cc/64?img=12' }} />
            <Chip.Label>Amina</Chip.Label>
          </Chip>

          <Chip variant="default">
            <Chip.Avatar backgroundColor={theme.colors.accent}>
              <Text
                style={{
                  color: theme.colors.accentForeground,
                  fontSize: theme.fontSizes.xs,
                  fontWeight: theme.fontWeights.semibold,
                }}
              >
                RG
              </Text>
            </Chip.Avatar>
            <Chip.Label>Rygrams</Chip.Label>
          </Chip>
        </Row>

        <Row>
          <Chip variant="primary">
            <Chip.Label>Leading cross</Chip.Label>
            <Chip.Close accessibilityLabel="Retirer" />
          </Chip>
          <Chip variant="ghost">
            <Chip.Close accessibilityLabel="Retirer" />
            <Chip.Label>…or a trailing one</Chip.Label>
          </Chip>
        </Row>
      </Section>

      <Dismissible />

      <Section
        title="color — a raw tint, landing where the variant puts its tokens"
        note="The fill of a primary, the border and text of a tertiary, the text of a ghost. The soft slice, the contrasted foreground and the pressed step are derived in OKLab, so the dot and the cross follow without being told a second colour."
      >
        <Row>
          <Chip color="#7c3aed">primary</Chip>
          <Chip variant="secondary" color="#7c3aed">
            secondary
          </Chip>
          <Chip variant="tertiary" color="#7c3aed">
            <Chip.Dot />
            <Chip.Label>tertiary</Chip.Label>
          </Chip>
          <Chip variant="ghost" color="#7c3aed">
            <Chip.Label>ghost</Chip.Label>
            <Chip.Close accessibilityLabel="Retirer" />
          </Chip>
        </Row>
      </Section>

      <Filters />

      <Section
        title="radius — the capsule, overridden"
        note="A chip is a pill at every size, which is what the name means. radius is the escape hatch for the tag that wants corners instead."
      >
        <Row>
          <Chip variant="default">full</Chip>
          <Chip variant="default" radius="sm">
            sm
          </Chip>
          <Chip variant="default" radius="md">
            md
          </Chip>
          <Chip variant="default" radius="xs">
            xs
          </Chip>
        </Row>
      </Section>

      <Section
        title="isDisabled"
        note="Dims the chip, stops a pressable one, and reaches the close inside it — a disabled chip that can still be dismissed is not disabled."
      >
        <Row>
          <Chip isDisabled>primary</Chip>
          <Chip isDisabled variant="danger-soft">
            <Chip.Dot />
            <Chip.Label>danger-soft</Chip.Label>
          </Chip>
          <Chip isDisabled variant="default">
            <Chip.Label>with a close</Chip.Label>
            <Chip.Close accessibilityLabel="Retirer" />
          </Chip>
        </Row>
      </Section>
    </ScrollView>
  )
}

/** A row of tags that removes its own entries — the `Chip.Close` case, end to end. */
function Dismissible() {
  const [tags, setTags] = useState(FILTERS)

  return (
    <Section
      title="Chip.Close — its own control, inside a chip that is not one"
      note="The cross owns its press state rather than reading the chip's: pressing it must not read as pressing the chip around it. hitSlop grows the target outwards, so a 16pt cross is still reachable."
    >
      <Row>
        {tags.map(tag => (
          <Chip key={tag} variant="default">
            <Chip.Label>{tag}</Chip.Label>
            <Chip.Close
              accessibilityLabel={`Retirer ${tag}`}
              onPress={() => setTags(rest => rest.filter(name => name !== tag))}
            />
          </Chip>
        ))}
      </Row>
      {tags.length === 0 ? <Note>tout est retiré — rechargez l’écran</Note> : null}
    </Section>
  )
}

/** The majority use of a pressable chip: a filter that is on or off. */
function Filters() {
  const [selected, setSelected] = useState<string[]>(['Design'])

  const toggle = (name: string) =>
    setSelected(current =>
      current.includes(name)
        ? current.filter(item => item !== name)
        : [...current, name]
    )

  return (
    <Section
      title="isPressable — the chip as a filter"
      note="The press is the variant's own pressed token, as on the Button and not as on the Card: a wash over something this small reads as a smudge. accessibilityState.selected is the caller's, and it is merged rather than dropped."
    >
      <Row>
        {FILTERS.map(name => {
          const isOn = selected.includes(name)

          return (
            <Chip
              key={name}
              isPressable
              variant={isOn ? 'primary' : 'tertiary'}
              accessibilityState={{ selected: isOn }}
              onPress={() => toggle(name)}
            >
              {name}
            </Chip>
          )
        })}
      </Row>
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
    <View style={{ gap: 10 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Note>{note}</Note>
      {children}
    </View>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {children}
    </Text>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      {children}
    </View>
  )
}

/** A third-party icon: it knows only `size` and `color`, and is told neither here. */
function AlertIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
