import { ScrollView, Text, View } from 'react-native'
import { Divider } from '@xaui/native/divider'
import type { DividerSize, DividerVariant } from '@xaui/native/divider'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: DividerVariant[] = ['default', 'secondary', 'tertiary']
const SIZES: DividerSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `Divider`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the three variants get more visible in
 * order, the four thicknesses start at one device pixel, a vertical rule takes its height
 * from the row it is in, and a horizontal one in a row collapses on purpose.
 */
export default function DividerScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="The three levels"
        note="separator, separatorSecondary, separatorTertiary — more visible in that order. No primary: a rule in the accent is a decision about the accent, and that is what color is for. No ghost: a rule with no ink is a gap on the parent."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 6 }}>
            <Caption>{variant}</Caption>
            <Divider variant={variant} />
          </View>
        ))}
      </Section>

      <Section
        title="size — the thickness, on the axis the orientation leaves free"
        note="xs is one device pixel, HeroUI's thin; lg is their thick, six points. xs is the default, and it is the one place in the library that does not default to md — a rule you notice is a rule that is too thick."
      >
        {SIZES.map(size => (
          <View key={size} style={{ gap: 6 }}>
            <Caption>{size}</Caption>
            <Divider size={size} variant="tertiary" />
          </View>
        ))}
      </Section>

      <Section
        title="A list, which is what it is for"
        note="Nothing sets a width. alignSelf: 'stretch' takes the column's, and the thickness holds the other axis."
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            paddingHorizontal: 16,
          }}
        >
          {['Notifications', 'Confidentialité', 'Stockage'].map((row, index) => (
            <View key={row}>
              {index > 0 ? <Divider /> : null}
              <Text
                style={{
                  color: theme.colors.surfaceForeground,
                  fontSize: theme.fontSizes.sm,
                  paddingVertical: 14,
                }}
              >
                {row}
              </Text>
            </View>
          ))}
        </View>
      </Section>

      <Section
        title="orientation='vertical' — the height comes from the row"
        note="The same one word. In a row the cross axis is vertical, so stretch makes the rule as tall as the tallest thing beside it — no height prop, and nothing to keep in sync."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Caption>Brouillon</Caption>
          <Divider orientation="vertical" />
          <Caption>Il y a deux minutes</Caption>
          <Divider orientation="vertical" size="sm" variant="tertiary" />
          <Caption>3 relecteurs</Caption>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 12,
            height: 56,
          }}
        >
          <Text style={{ color: theme.colors.foreground, alignSelf: 'center' }}>
            56pt
          </Text>
          <Divider orientation="vertical" size="md" variant="tertiary" />
          <Text style={{ color: theme.colors.muted, alignSelf: 'center' }}>
            the rule fills it
          </Text>
        </View>
      </Section>

      <Section
        title="A word across the line — two dividers, not a slot"
        note="A Divider.Label would put a layout inside a line. The composition the library already has does it: a row, two rules that flex, and a Typography between them."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Divider flex={1} />
          <Caption>ou</Caption>
          <Divider flex={1} />
        </View>
      </Section>

      <Section
        title="color — one raw tint (R7)"
        note="One thing to colour on a rule, so the tint lands on the rule. Hex only: the slices are derived in OKLab."
      >
        <Divider color="#7c3aed" size="sm" />
        <Divider color="#0f766e" size="md" />
      </Section>

      <Section
        title="asChild — the caller's element becomes the rule"
        note="R12. What it is for is the animated rule: the element takes the thickness and the ink from the recipe and whatever else it needs from its own props."
      >
        <View
          style={{
            backgroundColor: theme.colors.accentSoft,
            borderRadius: theme.radius.sm,
          }}
        >
          <Divider asChild size="md" variant="tertiary">
            <View style={{ opacity: 0.7 }} />
          </Divider>
        </View>
      </Section>

      <Section
        title="A horizontal rule inside a row collapses, on purpose"
        note="stretch has no width to take in a row, so the divider is zero wide rather than guessing. The fix is to say what you meant: width, or flex."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Caption>nothing between →</Caption>
          <Divider size="md" variant="tertiary" />
          <Caption>← these two</Caption>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Caption>width={'{64}'} →</Caption>
          <Divider size="md" variant="tertiary" width={64} />
          <Caption>← and there it is</Caption>
        </View>
      </Section>
    </ScrollView>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {children}
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
