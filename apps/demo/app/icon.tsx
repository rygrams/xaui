import { ScrollView, Text as RNText, View } from 'react-native'
import type { ReactNode } from 'react'
import Svg, { Path } from 'react-native-svg'
import { Button } from '@xaui/native/button'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for `Icon`. The three forms and, above all, the cascade: an
 * explicit prop, else what the surrounding slot published, else the theme.
 *
 * The forms are the point of the screen. `as` and the raw SVG both have to come out the
 * same size and the same colour without either being told, which is the whole reason the
 * primitive exists — and the reason it had no screen until now is why its R14 boundary
 * went unchecked for so long.
 */
export default function IconScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 64 }}
    >
      <Section
        title="Three forms, one result"
        note="A component through `as`, a raw SVG as children, an image through `source`. Given the same size and colour, the three are indistinguishable — which is what makes them interchangeable at a call site."
      >
        <Row>
          <Icon as={TrashIcon} size={28} color={theme.colors.foreground} />
          <Icon size={28} color={theme.colors.foreground}>
            <TrashSvg />
          </Icon>
        </Row>
      </Section>

      <Section
        title="Inherited from the slot — nothing passed"
        note="The button's root resolves size and colour once and publishes them. Change the variant and the glyph follows the label; change the size and it follows the scale."
      >
        <Button variant="danger">
          <Button.Icon as={TrashIcon} />
          <Button.Label>the glyph takes the variant</Button.Label>
        </Button>
        <Button variant="ghost">
          <Button.Icon as={TrashIcon} />
          <Button.Label>and here it takes the ghost</Button.Label>
        </Button>
        <Button size="lg" variant="tertiary">
          <Button.Icon as={TrashIcon} />
          <Button.Label>lg — one step up the scale</Button.Label>
        </Button>
      </Section>

      <Section
        title="A raw SVG inherits too — its baked-in size is overridden"
        note="An SVG pasted from a design tool carries its own width, height and colour. Inside an Icon they are replaced by the slot's, which is the entire point of wrapping it."
      >
        <Button variant="secondary">
          <Button.Icon>
            <TrashSvg />
          </Button.Icon>
          <Button.Label>a 24px SVG, wearing the button&apos;s scale</Button.Label>
        </Button>
      </Section>

      <Section
        title="An explicit prop still wins"
        note="The cascade in order: the prop, then the slot, then the theme. This is the escape hatch on the two forms that carry no style props."
      >
        <Button variant="secondary">
          <Button.Icon as={TrashIcon} color={theme.colors.danger} />
          <Button.Label>a danger glyph on a secondary button</Button.Label>
        </Button>
        <Button variant="secondary">
          <Button.Icon as={TrashIcon} size={28} />
          <Button.Label>and a larger one</Button.Label>
        </Button>
      </Section>

      <Section
        title="Outside any slot — the theme answers"
        note="No parent published anything, so size falls back to fontSizes.md and colour to the foreground of the mode. Both follow light and dark on their own."
      >
        <Row>
          <Icon as={TrashIcon} />
          <Icon as={TrashIcon} size={24} />
          <Icon as={TrashIcon} size={32} color="#7c3aed" />
        </Row>
      </Section>
    </ScrollView>
  )
}

/** The `as` form: the props Lucide, Ionicons and vector-icons all accept. */
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

/** The children form: a bare SVG, with a size and a colour of its own to be overridden. */
function TrashSvg() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" color="#ff00ff">
      <Path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: ReactNode
}) {
  return (
    <View style={{ gap: 10 }}>
      <Text bold>{title}</Text>
      <Text muted>{note}</Text>
      {children}
    </View>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      {children}
    </View>
  )
}

function Text({
  children,
  bold,
  muted,
}: {
  children: ReactNode
  bold?: boolean
  muted?: boolean
}) {
  const theme = useXAUITheme()

  return (
    <RNText
      style={{
        color: muted ? theme.colors.muted : theme.colors.foreground,
        fontSize: muted ? theme.fontSizes.xs : theme.fontSizes.md,
        fontWeight: bold ? theme.fontWeights.semibold : theme.fontWeights.regular,
      }}
    >
      {children}
    </RNText>
  )
}
