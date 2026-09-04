import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import Svg, { Path } from 'react-native-svg'
import { Button } from '@xaui/native/button'
import type { ButtonVariant } from '@xaui/native/button'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
  'danger',
  'danger-soft',
]

/**
 * The verification screen for P2. A component is verified here and in the docs preview,
 * in light and in dark — there is no test file for it.
 *
 * What each section is actually checking is in its subtitle: the seven variants name tokens
 * and nothing else, `size` moves the height and never the width, a raw `color` lands
 * where the variant put its tokens, and `asChild` hands the press to someone else's
 * element without losing it.
 */
export default function ButtonScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 64 }}
    >
      <OtherScreens />

      <Section
        title="The seven variants"
        note="One ladder, descending by how much accent is left: primary is the full accent, secondary its soft slice, default the neutral fill, tertiary a border, ghost nothing. No success and no warning: those are states something reports, not actions you press."
      >
        {VARIANTS.map(variant => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Section>

      <Section
        title="size — height, never width"
        note="A button with no width fills a column and hugs its content in a row. There is no fullWidth."
      >
        <Button size="xs">xs · 32</Button>
        <Button size="sm">sm · 40</Button>
        <Button size="md">md · 48</Button>
        <Button size="lg">lg · 56</Button>

        <Row>
          <Button size="sm">in a row</Button>
          <Button size="sm" variant="secondary">
            hugs its content
          </Button>
        </Row>
      </Section>

      <Section
        title="Icon and label"
        note="JSX order is screen order. The icon takes the variant's colour and the size's scale with no prop."
      >
        <Button>
          <Button.Icon as={TrashIcon} />
          <Button.Label>icon, then label</Button.Label>
        </Button>

        <Button variant="danger">
          <Button.Label>label, then icon</Button.Label>
          <Button.Icon as={TrashIcon} />
        </Button>

        <Row>
          <Button
            isIconOnly
            size="sm"
            variant="tertiary"
            accessibilityLabel="Supprimer"
          >
            <Button.Icon as={TrashIcon} />
          </Button>
          <Button isIconOnly variant="danger-soft" accessibilityLabel="Supprimer">
            <Button.Icon as={TrashIcon} />
          </Button>
          <Button
            isIconOnly
            size="lg"
            variant="ghost"
            accessibilityLabel="Supprimer"
          >
            <Button.Icon as={TrashIcon} />
          </Button>
          <Text style={{ color: theme.colors.foreground, alignSelf: 'center' }}>
            isIconOnly — square on the fixed height
          </Text>
        </Row>
      </Section>

      <Section
        title="isLoading"
        note="The spinner is inserted when none is composed; composing one is how you put it after the label."
      >
        <Button isLoading>Envoi…</Button>
        <Button isLoading variant="secondary">
          <Button.Label>composed after the label</Button.Label>
          <Button.Spinner />
        </Button>
        <Button isDisabled>isDisabled</Button>
        <Button isDisabled variant="tertiary">
          isDisabled, tertiary
        </Button>
      </Section>

      <Section
        title="color — one raw tint, placed by the variant"
        note="Background for primary, label for ghost, border and label for tertiary. Derived in OKLab, like accent."
      >
        <Button color="#7c3aed">primary — the tint is the background</Button>
        <Button variant="ghost" color="#7c3aed">
          ghost — the tint is the label
        </Button>
        <Button variant="tertiary" color="#7c3aed">
          tertiary — border and label
        </Button>
        <Button variant="danger-soft" color="#7c3aed">
          danger-soft — the tint, softened
        </Button>
      </Section>

      <Section
        title="Under the finger — the scale, and switching it off"
        note="A button scales and mounts no overlay. That is the rule, not an omission: the recipe already paints the variant's pressed colour, and a wash or a wave on top would darken it twice. That colour moves one way — towards the ink of the mode, so darker here in light and lighter in dark. The PressableFeedback screen has the overlays."
      >
        <Button>the scale, adjusted for the button&apos;s width</Button>
        <Button size="lg" variant="danger">
          <Button.Icon as={TrashIcon} />
          <Button.Label>wider, and it travels the same distance</Button.Label>
        </Button>
        <Button animation={false} variant="secondary">
          animation={'{false}'} — nothing moves, no worklet
        </Button>
        <Button animation="disable-all" variant="tertiary">
          &apos;disable-all&apos; — and for every descendant
        </Button>
      </Section>

      <Section
        title="radius — the shape its size implies, or one you name"
        note="Unset, the radius follows the size. Set, it wins."
      >
        <Row>
          <Button size="sm" radius="xs">
            xs
          </Button>
          <Button size="sm" radius="md">
            md
          </Button>
          <Button size="sm" radius="full">
            full
          </Button>
        </Row>
      </Section>

      <Section
        title="asChild — the press, handed to someone else's element"
        note="R12. The child receives the ref, the styles and the handlers; it is the button."
      >
        <Button asChild>
          <Pressable onPress={() => undefined}>
            <Text style={{ color: theme.colors.accentForeground }}>
              a bare Pressable, wearing the button
            </Text>
          </Pressable>
        </Button>
      </Section>

      <Section
        title="Style props — R14"
        note="Full React Native names, so full React Native values: padding={16} is 16 points, never a step on a scale. They resolve after the recipe and before the slot's own style."
      >
        <Button padding={24} marginTop={8}>
          padding={'{24}'} marginTop={'{8}'}
        </Button>
        <Button variant="secondary" width="60%">
          width=&quot;60%&quot; — what replaced fullWidth
        </Button>
        <Button variant="tertiary" height={72}>
          height={'{72}'} beats the height size chose
        </Button>
        <Button variant="ghost" backgroundColor={theme.colors.warningSoft}>
          backgroundColor — a raw fill, and it says so
        </Button>
        <Button>
          <Button.Label fontSize={18} letterSpacing={2} color={theme.colors.warning}>
            a label sizing and tinting itself
          </Button.Label>
        </Button>
        <Button variant="secondary" padding={40} style={{ padding: 12 }}>
          padding={'{40}'} with style={'{{ padding: 12 }}'} — style wins, and this
          one is tight
        </Button>
      </Section>

      <Section
        title="Escape hatches"
        note="A value has a prop; the rest is a slot's own style. It stays the last word for a transform, a per-platform shadow, or a computed object."
      >
        <Button alignSelf="flex-start">alignSelf, not fullWidth</Button>
        <Button variant="secondary">
          <Button.Label style={{ fontStyle: 'italic', letterSpacing: 1 }}>
            a label styling itself
          </Button.Label>
        </Button>
        <Button>
          a label far too long for the width it has been given, so it truncates
          instead of deforming the control
        </Button>
      </Section>

      <PressCounter />
    </ScrollView>
  )
}

/** The caller's `onPress` and `onPressIn` must survive the root composing its own. */
function PressCounter() {
  const theme = useXAUITheme()
  const [count, setCount] = useState(0)

  return (
    <Section
      title="Handlers compose, they do not replace"
      note="The root maintains its own pressed state on top of the caller's handlers."
    >
      <Button onPress={() => setCount(n => n + 1)}>
        <Button.Label>pressed {count} times</Button.Label>
      </Button>
      <Text style={{ color: theme.colors.foreground }}>
        the count moves, and so does the press colour
      </Text>
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
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {note}
      </Text>
      {children}
    </View>
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
function TrashIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

/**
 * The other v1 verification screens. The demo is one screen per primitive, and each one is
 * how that primitive is verified — there is no test file for any of them.
 */
function OtherScreens() {
  const router = useRouter()

  return (
    <Row>
      <Button variant="tertiary" size="sm" onPress={() => router.push('/alert')}>
        Alert →
      </Button>
      <Button variant="tertiary" size="sm" onPress={() => router.push('/chip')}>
        Chip →
      </Button>
      <Button variant="tertiary" size="sm" onPress={() => router.push('/input')}>
        Input →
      </Button>
      <Button
        variant="tertiary"
        size="sm"
        onPress={() => router.push('/pressable-feedback')}
      >
        PressableFeedback →
      </Button>
    </Row>
  )
}
