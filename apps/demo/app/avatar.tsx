import { ScrollView, Text, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { Avatar } from '@xaui/native/avatar'
import type { AvatarSize, AvatarVariant } from '@xaui/native/avatar'
import { Icon } from '@xaui/native/system'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: AvatarVariant[] = [
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

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg']

/** A real remote image, so the fade and the fallback-underneath are actually exercised. */
const PHOTO = { uri: 'https://i.pravatar.cc/160?img=32' }

/** A URL that will not resolve. The initials must stay, with nothing to handle. */
const BROKEN = { uri: 'https://example.invalid/nope.png' }

/**
 * The verification screen for the `Avatar`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: the eleven variants colour the frame, the
 * four sizes set both sides, the fallback is a layer rather than a state — so a broken URL
 * leaves the initials in place — and a glyph inside the fallback takes the frame's size and
 * colour with no props.
 */
export default function AvatarScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="The whole component, most of the time"
        note="R3 — a stringifiable tree becomes the initials, so <Avatar>AT</Avatar> is all there is to write."
      >
        <Row>
          <Avatar>AT</Avatar>
          <Avatar variant="secondary">MK</Avatar>
          <Avatar variant="primary">JD</Avatar>
        </Row>
      </Section>

      <Section
        title="The eleven variants — they colour the frame"
        note="The Chip's eleven, meaning here what they mean there. The status families are present because an avatar reports as often as it identifies: red for the account that failed to sync, green for the person who is online."
      >
        <Row>
          {VARIANTS.map(variant => (
            <Labelled key={variant} label={variant}>
              <Avatar variant={variant} size="sm">
                AT
              </Avatar>
            </Labelled>
          ))}
        </Row>
      </Section>

      <Section
        title="size — one measurement, both sides"
        note="32, 40, 48, 64: HeroUI's three steps plus the xs our ladder adds below them. The glyph runs ahead of the initials at the top of the scale, because two letters fill a circle that one icon has to sit inside with air around it."
      >
        <Row>
          {SIZES.map(size => (
            <Labelled key={size} label={size}>
              <Avatar size={size}>AT</Avatar>
            </Labelled>
          ))}
        </Row>
        <Row>
          {SIZES.map(size => (
            <Labelled key={`${size}-glyph`} label={size}>
              <Avatar size={size} variant="tertiary">
                <Avatar.Fallback>
                  <Icon as={PersonIcon} />
                </Avatar.Fallback>
              </Avatar>
            </Labelled>
          ))}
        </Row>
      </Section>

      <Section
        title="A photo, with initials underneath it"
        note="Avatar.Image is absolutely positioned over Avatar.Fallback, so the initials show while the photo loads and it fades in over them at 200ms. Pull to reload the screen and watch the fade."
      >
        <Row>
          <Labelled label="loads">
            <Avatar size="lg">
              <Avatar.Image source={PHOTO} />
              <Avatar.Fallback>AT</Avatar.Fallback>
            </Avatar>
          </Labelled>
          <Labelled label="no fade">
            <Avatar size="lg">
              <Avatar.Image source={PHOTO} animation={false} />
              <Avatar.Fallback>AT</Avatar.Fallback>
            </Avatar>
          </Labelled>
        </Row>
      </Section>

      <Section
        title="A broken URL leaves the initials in place"
        note="The fallback is a layer, not a state. There is no load-state machine and no onError to handle: an Image with nothing decoded draws nothing, so what was underneath stays visible."
      >
        <Row>
          <Labelled label="initials">
            <Avatar size="lg" variant="danger-soft">
              <Avatar.Image source={BROKEN} />
              <Avatar.Fallback>AT</Avatar.Fallback>
            </Avatar>
          </Labelled>
          <Labelled label="a glyph">
            <Avatar size="lg" variant="default">
              <Avatar.Image source={BROKEN} />
              <Avatar.Fallback>
                <Icon as={PersonIcon} />
              </Avatar.Fallback>
            </Avatar>
          </Labelled>
          <Labelled label="nothing">
            <Avatar size="lg" variant="default">
              <Avatar.Image source={BROKEN} />
            </Avatar>
          </Labelled>
        </Row>
      </Section>

      <Section
        title="radius — a circle at every size, unless you say otherwise"
        note="Where HeroUI fixes one large radius for all three sizes, which makes their small avatars round and their large ones squircles. full says the shape the name means once."
      >
        <Row>
          <Labelled label="full">
            <Avatar size="lg" variant="secondary">
              AT
            </Avatar>
          </Labelled>
          <Labelled label="lg">
            <Avatar size="lg" radius="lg" variant="secondary">
              AT
            </Avatar>
          </Labelled>
          <Labelled label="xs">
            <Avatar size="lg" radius="xs" variant="secondary">
              AT
            </Avatar>
          </Labelled>
          <Labelled label="lg · photo">
            <Avatar size="lg" radius="lg">
              <Avatar.Image source={PHOTO} />
              <Avatar.Fallback>AT</Avatar.Fallback>
            </Avatar>
          </Labelled>
        </Row>
      </Section>

      <Section
        title="color — one raw tint, placed by the variant (R7)"
        note="The fill of a primary, the border of a tertiary, the letters of a ghost. Derived in OKLab, like accent — and the initials take the contrasted slice, so they stay readable on any tint."
      >
        <Row>
          <Labelled label="primary">
            <Avatar color="#7c3aed">AT</Avatar>
          </Labelled>
          <Labelled label="secondary">
            <Avatar variant="secondary" color="#7c3aed">
              AT
            </Avatar>
          </Labelled>
          <Labelled label="tertiary">
            <Avatar variant="tertiary" color="#0f766e">
              AT
            </Avatar>
          </Labelled>
          <Labelled label="ghost">
            <Avatar variant="ghost" color="#f59e0b">
              AT
            </Avatar>
          </Labelled>
        </Row>
      </Section>

      <Section
        title="A glyph needs no props"
        note="Avatar.Fallback publishes the frame's resolved size and colour to IconContext, so an Icon written inside it inherits both. XAUI ships no icon set, so the mark is always the caller's — which is why there is no default person icon where HeroUI has one."
      >
        <Row>
          <Avatar variant="primary">
            <Avatar.Fallback>
              <Icon as={PersonIcon} />
            </Avatar.Fallback>
          </Avatar>
          <Avatar variant="success-soft">
            <Avatar.Fallback>
              <Icon as={PersonIcon} />
            </Avatar.Fallback>
          </Avatar>
          <Avatar variant="tertiary" size="lg" color="#7c3aed">
            <Avatar.Fallback>
              <Icon as={PersonIcon} />
            </Avatar.Fallback>
          </Avatar>
        </Row>
      </Section>

      <Section
        title="A stack, which is what a row of faces usually is"
        note="No stacking prop: a negative marginStart on every avatar but the first is the whole thing, and R14 already has marginStart. R13 keeps it mirroring in RTL."
      >
        <View style={{ flexDirection: 'row' }}>
          {['AT', 'MK', 'JD', 'SL'].map((initials, index) => (
            <Avatar
              key={initials}
              variant="secondary"
              marginStart={index === 0 ? 0 : -12}
              borderWidth={2}
              borderColor={theme.colors.background}
            >
              {initials}
            </Avatar>
          ))}
        </View>
      </Section>

      <Section
        title="Style props and escape hatches — R14"
        note="Full React Native names and values, resolved after the recipe and before style. size stays the avatar's diameter, so width means what it says."
      >
        <Row>
          <Avatar opacity={0.5}>AT</Avatar>
          <Avatar borderWidth={2} borderColor={theme.colors.accent}>
            AT
          </Avatar>
          <Avatar>
            <Avatar.Fallback>
              <Avatar.Initials fontWeight="700" letterSpacing={1}>
                AT
              </Avatar.Initials>
            </Avatar.Fallback>
          </Avatar>
        </Row>
      </Section>
    </ScrollView>
  )
}

/** A third-party icon: it knows only `size` and `color`, and is told neither here. */
function PersonIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
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
    <View style={{ alignItems: 'center', gap: 6, minWidth: 64 }}>
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
