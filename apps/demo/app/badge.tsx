import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Badge } from '@xaui/native/badge'
import type { BadgePlacement, BadgeSize, BadgeVariant } from '@xaui/native/badge'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: BadgeVariant[] = [
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

const SIZES: BadgeSize[] = ['xs', 'sm', 'md', 'lg']

const PLACEMENTS: BadgePlacement[] = [
  'top-end',
  'top-start',
  'bottom-end',
  'bottom-start',
]

/**
 * The verification screen for the `Badge`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for the component; only
 * `placementInsets`, which computes a value, has one.
 *
 * What each section checks is in its subtitle: one digit is a circle and two are a capsule,
 * the label does not grow with the badge, `isDot` is its own diameter ladder, and
 * `placement` puts the badge on the corner of whatever contains it — the same four corners
 * mirroring in RTL, because the keys are `start` and `end`.
 */
export default function BadgeScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="One digit is a circle, two are a capsule"
        note="minWidth equals the height, so the width follows the count and nothing else. That is the line between this and a small Chip: a chip hugs a word, a badge is round unless the count is too wide to be."
      >
        <Row>
          <Badge>3</Badge>
          <Badge>12</Badge>
          <Badge>128</Badge>
          <Badge>99+</Badge>
        </Row>
      </Section>

      <Section
        title="The eleven variants — and danger is the default"
        note="The only component in the library whose default is not the first name in its ladder. A badge is overwhelmingly the count of something that wants attention, and a red one is what <Badge>3</Badge> means."
      >
        <Row>
          {VARIANTS.map(variant => (
            <Labelled key={variant} label={variant}>
              <Badge variant={variant}>7</Badge>
            </Labelled>
          ))}
        </Row>
      </Section>

      <Section
        title="size — the box, not the count"
        note="16, 18, 20, 24 — below the Chip's four. The label stays at 12pt through three of them, because a count that grows with its badge stops being a count."
      >
        <Row>
          {SIZES.map(size => (
            <Labelled key={size} label={size}>
              <Badge size={size}>9</Badge>
            </Labelled>
          ))}
        </Row>
        <Row>
          {SIZES.map(size => (
            <Labelled key={`${size}-wide`} label={size}>
              <Badge size={size} variant="default">
                128
              </Badge>
            </Labelled>
          ))}
        </Row>
      </Section>

      <Section
        title="isDot — the fact that there is something"
        note="No label, no padding, and its own diameter ladder (6, 8, 10, 12) rather than the height: a 20pt circle beside a 16pt icon is not a dot. Children are not rendered — a dot is the absence of a label."
      >
        <Row>
          {SIZES.map(size => (
            <Labelled key={size} label={size}>
              <Badge isDot size={size} />
            </Labelled>
          ))}
          <Labelled label="success">
            <Badge isDot variant="success" />
          </Labelled>
          <Labelled label="warning">
            <Badge isDot variant="warning" />
          </Labelled>
          <Labelled label="tertiary">
            <Badge isDot variant="tertiary" />
          </Labelled>
        </Row>
      </Section>

      <Section
        title="placement — the parent is whatever the badge decorates"
        note="Pulled out by half its own height on each axis, so its centre lands on the corner it marks. The keys are start and end (R13), so top-end is the trailing corner and it swaps in RTL."
      >
        <Row>
          {PLACEMENTS.map(placement => (
            <Labelled key={placement} label={placement}>
              <Anchor>
                <Badge
                  placement={placement}
                  accessibilityLabel={`12 · ${placement}`}
                >
                  12
                </Badge>
              </Anchor>
            </Labelled>
          ))}
        </Row>

        <Row>
          <Labelled label="a count">
            <Anchor>
              <Badge placement="top-end" accessibilityLabel="3 notifications">
                3
              </Badge>
            </Anchor>
          </Labelled>
          <Labelled label="a dot">
            <Anchor>
              <Badge isDot placement="top-end" accessibilityLabel="Non lu" />
            </Anchor>
          </Labelled>
          <Labelled label="sm · dot">
            <Anchor>
              <Badge
                isDot
                size="sm"
                placement="top-end"
                accessibilityLabel="Non lu"
              />
            </Anchor>
          </Labelled>
        </Row>
      </Section>

      <Section
        title="In flow, which is the other half of placement"
        note="Unset, the badge is laid out like any other node — no insets exist at all, which is why they are computed outside the style cache. A cached top: -10 would nudge this row."
      >
        {['Boîte de réception', 'Archivés', 'Corbeille'].map((row, index) => (
          <View
            key={row}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.lg,
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                color: theme.colors.surfaceForeground,
                fontSize: theme.fontSizes.sm,
              }}
            >
              {row}
            </Text>
            <Badge variant={index === 0 ? 'danger' : 'default'}>
              {index === 0 ? '12' : '128'}
            </Badge>
          </View>
        ))}
      </Section>

      <Section
        title="A word, when the count is a state"
        note="Two or three characters is the ceiling; past that it is a Chip. The soft variants are what a status badge on a card usually is."
      >
        <Row>
          <Badge variant="success-soft" size="lg">
            Payé
          </Badge>
          <Badge variant="warning-soft" size="lg">
            Dû
          </Badge>
          <Badge variant="tertiary" size="lg">
            Brouillon
          </Badge>
        </Row>
      </Section>

      <Section
        title="radius and color"
        note="A capsule at every size, unless radius says otherwise. The tint lands where the variant put its tokens: the fill of a primary, the border and label of a tertiary, the label of a ghost."
      >
        <Row>
          <Labelled label="capsule">
            <Badge size="lg">12</Badge>
          </Labelled>
          <Labelled label="radius='xs'">
            <Badge size="lg" radius="xs">
              12
            </Badge>
          </Labelled>
          <Labelled label="primary">
            <Badge color="#7c3aed">12</Badge>
          </Labelled>
          <Labelled label="tertiary">
            <Badge variant="tertiary" color="#0f766e">
              12
            </Badge>
          </Labelled>
          <Labelled label="ghost">
            <Badge variant="ghost" color="#f59e0b">
              12
            </Badge>
          </Labelled>
        </Row>
      </Section>
    </ScrollView>
  )
}

/** Something for a placed badge to hang off — the bell is the subject a reader cannot see. */
function Anchor({ children }: { children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <View style={{ padding: 4 }}>
      <Icon as={BellIcon} size={28} color={theme.colors.foreground} />
      {children}
    </View>
  )
}

/** A third-party icon: it knows only `size` and `color`. */
function BellIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function Labelled({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ alignItems: 'center', gap: 6, minWidth: 72 }}>
      {children}
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {label}
      </Text>
    </View>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {children}
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
